/**
 * Phase 3: Advanced IndexedDB Caching Layer
 * Provides sophisticated caching with expiration, versioning, and background sync
 */

import { openDB, IDBPDatabase, IDBPTransaction } from 'idb';

// Cache configuration
const CACHE_DB_NAME = 'Strivetech_Cache';
const CACHE_DB_VERSION = 1;
const DEFAULT_TTL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Object stores
const OBJECT_STORES = {
  API_CACHE: 'api_cache',
  ASSETS_CACHE: 'assets_cache',
  USER_DATA: 'user_data',
  PREFERENCES: 'preferences',
  OFFLINE_QUEUE: 'offline_queue'
} as const;

interface CacheEntry<T = any> {
  id: string;
  data: T;
  timestamp: number;
  ttl: number;
  version: string;
  tags?: string[];
  compressed?: boolean;
}

interface OfflineQueueItem {
  id: string;
  url: string;
  method: string;
  body: any;
  headers: Record<string, string>;
  timestamp: number;
  retryCount: number;
  maxRetries: number;
}

class IndexedDBCache {
  private db: IDBPDatabase | null = null;
  private initialized = false;
  private version = '1.0.0';

  async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      this.db = await openDB(CACHE_DB_NAME, CACHE_DB_VERSION, {
        upgrade(db, oldVersion, newVersion, transaction) {
          console.log('🔄 Upgrading IndexedDB cache schema...');

          // API Cache Store
          if (!db.objectStoreNames.contains(OBJECT_STORES.API_CACHE)) {
            const apiStore = db.createObjectStore(OBJECT_STORES.API_CACHE, {
              keyPath: 'id'
            });
            apiStore.createIndex('timestamp', 'timestamp');
            apiStore.createIndex('tags', 'tags', { multiEntry: true });
          }

          // Assets Cache Store
          if (!db.objectStoreNames.contains(OBJECT_STORES.ASSETS_CACHE)) {
            const assetsStore = db.createObjectStore(OBJECT_STORES.ASSETS_CACHE, {
              keyPath: 'id'
            });
            assetsStore.createIndex('timestamp', 'timestamp');
          }

          // User Data Store
          if (!db.objectStoreNames.contains(OBJECT_STORES.USER_DATA)) {
            const userStore = db.createObjectStore(OBJECT_STORES.USER_DATA, {
              keyPath: 'id'
            });
            userStore.createIndex('timestamp', 'timestamp');
          }

          // Preferences Store
          if (!db.objectStoreNames.contains(OBJECT_STORES.PREFERENCES)) {
            db.createObjectStore(OBJECT_STORES.PREFERENCES, {
              keyPath: 'id'
            });
          }

          // Offline Queue Store
          if (!db.objectStoreNames.contains(OBJECT_STORES.OFFLINE_QUEUE)) {
            const queueStore = db.createObjectStore(OBJECT_STORES.OFFLINE_QUEUE, {
              keyPath: 'id'
            });
            queueStore.createIndex('timestamp', 'timestamp');
          }
        }
      });

      this.initialized = true;
      console.log('✅ IndexedDB cache initialized successfully');

      // Start background cleanup
      this.startBackgroundCleanup();

    } catch (error) {
      console.error('❌ Failed to initialize IndexedDB cache:', error);
      throw error;
    }
  }

  /**
   * Store data in cache with TTL and tags
   */
  async set<T>(
    store: keyof typeof OBJECT_STORES,
    id: string,
    data: T,
    options: {
      ttl?: number;
      tags?: string[];
      compress?: boolean;
    } = {}
  ): Promise<void> {
    if (!this.db) await this.initialize();

    const entry: CacheEntry<T> = {
      id,
      data: options.compress ? await this.compress(data) : data,
      timestamp: Date.now(),
      ttl: options.ttl || DEFAULT_TTL,
      version: this.version,
      tags: options.tags,
      compressed: options.compress
    };

    await this.db!.put(OBJECT_STORES[store], entry);
  }

  /**
   * Get data from cache with automatic expiration check
   */
  async get<T>(store: keyof typeof OBJECT_STORES, id: string): Promise<T | null> {
    if (!this.db) await this.initialize();

    const entry: CacheEntry<T> | undefined = await this.db!.get(OBJECT_STORES[store], id);

    if (!entry) return null;

    // Check expiration
    if (Date.now() - entry.timestamp > entry.ttl) {
      await this.delete(store, id);
      return null;
    }

    // Decompress if needed
    return entry.compressed ? await this.decompress(entry.data) : entry.data;
  }

  /**
   * Delete specific cache entry
   */
  async delete(store: keyof typeof OBJECT_STORES, id: string): Promise<void> {
    if (!this.db) await this.initialize();
    await this.db!.delete(OBJECT_STORES[store], id);
  }

  /**
   * Clear all entries in a store
   */
  async clear(store: keyof typeof OBJECT_STORES): Promise<void> {
    if (!this.db) await this.initialize();
    await this.db!.clear(OBJECT_STORES[store]);
  }

  /**
   * Get all cache entries by tags
   */
  async getByTags<T>(store: keyof typeof OBJECT_STORES, tags: string[]): Promise<T[]> {
    if (!this.db) await this.initialize();

    const results: T[] = [];
    const transaction = this.db!.transaction(OBJECT_STORES[store], 'readonly');
    const objectStore = transaction.objectStore(OBJECT_STORES[store]);

    for (const tag of tags) {
      const index = objectStore.index('tags');
      const entries = await index.getAll(tag);

      for (const entry of entries) {
        if (Date.now() - entry.timestamp <= entry.ttl) {
          const data = entry.compressed ? await this.decompress(entry.data) : entry.data;
          results.push(data);
        }
      }
    }

    return results;
  }

  /**
   * Cache API responses with stale-while-revalidate pattern
   */
  async cacheAPIResponse(
    url: string,
    data: any,
    options: { ttl?: number; tags?: string[] } = {}
  ): Promise<void> {
    const id = this.generateCacheKey(url);
    await this.set('API_CACHE', id, {
      url,
      data,
      headers: {},
      status: 200
    }, {
      ttl: options.ttl || 60 * 60 * 1000, // 1 hour default for API
      tags: options.tags,
      compress: true
    });
  }

  /**
   * Get cached API response
   */
  async getCachedAPIResponse(url: string): Promise<any> {
    const id = this.generateCacheKey(url);
    const cached = await this.get('API_CACHE', id);
    return cached?.data || null;
  }

  /**
   * Implement stale-while-revalidate pattern
   */
  async staleWhileRevalidate<T>(
    key: string,
    fetchFunction: () => Promise<T>,
    options: { ttl?: number; staleTtl?: number } = {}
  ): Promise<T> {
    const ttl = options.ttl || DEFAULT_TTL;
    const staleTtl = options.staleTtl || ttl * 2;

    // Try to get from cache first
    const cached = await this.get('API_CACHE', key);

    if (cached) {
      const age = Date.now() - cached.timestamp;

      // If fresh, return cached data
      if (age < ttl) {
        return cached.data;
      }

      // If stale but not expired, return stale data and revalidate in background
      if (age < staleTtl) {
        // Background revalidation
        fetchFunction().then(freshData => {
          this.set('API_CACHE', key, freshData, { ttl });
        }).catch(error => {
          console.warn('Background revalidation failed:', error);
        });

        return cached.data;
      }
    }

    // No cache or expired - fetch fresh data
    const freshData = await fetchFunction();
    await this.set('API_CACHE', key, freshData, { ttl });
    return freshData;
  }

  /**
   * Queue requests for offline handling
   */
  async queueOfflineRequest(
    url: string,
    method: string,
    body: any,
    headers: Record<string, string> = {}
  ): Promise<void> {
    const queueItem: OfflineQueueItem = {
      id: this.generateCacheKey(`${method}:${url}:${Date.now()}`),
      url,
      method,
      body,
      headers,
      timestamp: Date.now(),
      retryCount: 0,
      maxRetries: 3
    };

    await this.set('OFFLINE_QUEUE', queueItem.id, queueItem);
  }

  /**
   * Process offline queue when back online
   */
  async processOfflineQueue(): Promise<void> {
    if (!this.db) return;

    const transaction = this.db.transaction(OBJECT_STORES.OFFLINE_QUEUE, 'readwrite');
    const store = transaction.objectStore(OBJECT_STORES.OFFLINE_QUEUE);
    const allItems = await store.getAll();

    for (const item of allItems) {
      try {
        await fetch(item.url, {
          method: item.method,
          body: item.body,
          headers: item.headers
        });

        // Success - remove from queue
        await this.delete('OFFLINE_QUEUE', item.id);
        console.log('✅ Processed offline request:', item.url);

      } catch (error) {
        // Increment retry count
        if (item.retryCount < item.maxRetries) {
          await this.set('OFFLINE_QUEUE', item.id, {
            ...item,
            retryCount: item.retryCount + 1
          });
        } else {
          // Max retries reached - remove from queue
          await this.delete('OFFLINE_QUEUE', item.id);
          console.error('❌ Max retries reached for offline request:', item.url);
        }
      }
    }
  }

  /**
   * Get cache statistics
   */
  async getStats(): Promise<Record<string, { count: number; size: number }>> {
    if (!this.db) await this.initialize();

    const stats: Record<string, { count: number; size: number }> = {};

    for (const [key, storeName] of Object.entries(OBJECT_STORES)) {
      const transaction = this.db!.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const allEntries = await store.getAll();

      stats[key] = {
        count: allEntries.length,
        size: JSON.stringify(allEntries).length
      };
    }

    return stats;
  }

  /**
   * Clean up expired entries
   */
  private async cleanup(): Promise<void> {
    if (!this.db) return;

    const now = Date.now();
    const stores = Object.values(OBJECT_STORES);

    for (const storeName of stores) {
      const transaction = this.db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const allEntries = await store.getAll();

      for (const entry of allEntries) {
        if (now - entry.timestamp > entry.ttl) {
          await store.delete(entry.id);
        }
      }
    }

    console.log('🧹 IndexedDB cache cleanup completed');
  }

  /**
   * Start background cleanup process
   */
  private startBackgroundCleanup(): void {
    // Clean up every hour
    setInterval(() => {
      this.cleanup().catch(console.error);
    }, 60 * 60 * 1000);

    // Also cleanup when page becomes visible
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        this.cleanup().catch(console.error);
      }
    });
  }

  /**
   * Generate cache key from URL
   */
  private generateCacheKey(input: string): string {
    // Simple hash function for generating cache keys
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return `cache_${Math.abs(hash)}`;
  }

  /**
   * Compress data for storage
   */
  private async compress<T>(data: T): Promise<string> {
    // Simple JSON stringification - could be enhanced with actual compression
    return JSON.stringify(data);
  }

  /**
   * Decompress data from storage
   */
  private async decompress<T>(data: string): Promise<T> {
    return JSON.parse(data);
  }
}

// Global cache instance
export const indexedDBCache = new IndexedDBCache();

// Convenience functions
export async function cacheData<T>(
  store: keyof typeof OBJECT_STORES,
  key: string,
  data: T,
  ttl?: number
): Promise<void> {
  return indexedDBCache.set(store, key, data, { ttl });
}

export async function getCachedData<T>(
  store: keyof typeof OBJECT_STORES,
  key: string
): Promise<T | null> {
  return indexedDBCache.get(store, key);
}

export async function clearCache(store?: keyof typeof OBJECT_STORES): Promise<void> {
  if (store) {
    return indexedDBCache.clear(store);
  } else {
    // Clear all stores
    for (const storeName of Object.keys(OBJECT_STORES)) {
      await indexedDBCache.clear(storeName as keyof typeof OBJECT_STORES);
    }
  }
}

// React hook for using IndexedDB cache
export function useIndexedDBCache() {
  return {
    cache: indexedDBCache,
    cacheData,
    getCachedData,
    clearCache,
    staleWhileRevalidate: indexedDBCache.staleWhileRevalidate.bind(indexedDBCache),
    queueOfflineRequest: indexedDBCache.queueOfflineRequest.bind(indexedDBCache),
    processOfflineQueue: indexedDBCache.processOfflineQueue.bind(indexedDBCache),
    getStats: indexedDBCache.getStats.bind(indexedDBCache)
  };
}

// Initialize cache when network comes back online
window.addEventListener('online', () => {
  indexedDBCache.processOfflineQueue().catch(console.error);
});

// Export types
export type { CacheEntry, OfflineQueueItem };
export { OBJECT_STORES };