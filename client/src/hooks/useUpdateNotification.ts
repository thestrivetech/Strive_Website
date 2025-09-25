import { useState, useEffect, useCallback } from 'react';

export interface UpdateNotificationState {
  hasUpdate: boolean;
  isChecking: boolean;
  currentVersion: string;
  newVersion: string;
  error: string | null;
  showNotification: boolean;
}

export interface UpdateNotificationActions {
  checkForUpdate: () => void;
  applyUpdate: () => void;
  dismissNotification: () => void;
  enableAutoCheck: (enabled: boolean) => void;
}

export interface UseUpdateNotificationReturn extends UpdateNotificationState, UpdateNotificationActions {}

/**
 * Custom hook for managing application update notifications
 * Works with service worker to detect new versions and notify users
 */
export function useUpdateNotification(): UseUpdateNotificationReturn {
  const [state, setState] = useState<UpdateNotificationState>({
    hasUpdate: false,
    isChecking: false,
    currentVersion: '',
    newVersion: '',
    error: null,
    showNotification: false,
  });

  const [autoCheckEnabled, setAutoCheckEnabled] = useState(true);
  const [checkInterval, setCheckInterval] = useState<NodeJS.Timeout | null>(null);

  // Get current version from service worker
  const getCurrentVersion = useCallback(async (): Promise<string> => {
    if (!('serviceWorker' in navigator)) {
      return 'no-sw';
    }

    return new Promise((resolve) => {
      const messageChannel = new MessageChannel();
      messageChannel.port1.onmessage = (event) => {
        const { version, timestamp } = event.data;
        resolve(`${version}-${timestamp}`);
      };

      navigator.serviceWorker.ready.then((registration) => {
        if (registration.active) {
          registration.active.postMessage({ type: 'GET_VERSION' }, [messageChannel.port2]);
        }
      });

      // Fallback timeout
      setTimeout(() => resolve('unknown'), 1000);
    });
  }, []);

  // Check for updates by fetching server version
  const checkForUpdate = useCallback(async () => {
    setState(prev => ({ ...prev, isChecking: true, error: null }));

    try {
      // Get current client version
      const currentVersion = await getCurrentVersion();

      // Fetch server version
      const response = await fetch('/api/version', {
        cache: 'no-cache',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
        }
      });

      if (!response.ok) {
        throw new Error(`Version check failed: ${response.statusText}`);
      }

      const serverInfo = await response.json();
      const serverVersion = `v2-${serverInfo.timestamp}`;

      setState(prev => ({
        ...prev,
        isChecking: false,
        currentVersion,
        newVersion: serverVersion,
        hasUpdate: serverVersion !== currentVersion,
        showNotification: serverVersion !== currentVersion,
      }));

    } catch (error) {
      setState(prev => ({
        ...prev,
        isChecking: false,
        error: error instanceof Error ? error.message : 'Update check failed',
      }));
    }
  }, [getCurrentVersion]);

  // Apply update by forcing reload after clearing caches
  const applyUpdate = useCallback(() => {
    setState(prev => ({ ...prev, showNotification: false }));

    if ('serviceWorker' in navigator) {
      // Request service worker to clear caches and force reload
      navigator.serviceWorker.ready.then((registration) => {
        if (registration.active) {
          registration.active.postMessage({ type: 'CHECK_UPDATE' });
        }
      });
    }

    // Fallback: force reload after a short delay
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }, []);

  // Dismiss notification without applying update
  const dismissNotification = useCallback(() => {
    setState(prev => ({ ...prev, showNotification: false }));
  }, []);

  // Enable/disable automatic update checking
  const enableAutoCheck = useCallback((enabled: boolean) => {
    setAutoCheckEnabled(enabled);

    if (enabled && !checkInterval) {
      // Check every 5 minutes
      const interval = setInterval(checkForUpdate, 5 * 60 * 1000);
      setCheckInterval(interval);
    } else if (!enabled && checkInterval) {
      clearInterval(checkInterval);
      setCheckInterval(null);
    }
  }, [checkForUpdate, checkInterval]);

  // Listen for service worker messages about forced reloads
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    const handleServiceWorkerMessage = (event: MessageEvent) => {
      if (event.data?.type === 'FORCE_RELOAD') {
        const { oldVersion, newVersion } = event.data;

        setState(prev => ({
          ...prev,
          currentVersion: oldVersion,
          newVersion: newVersion,
          hasUpdate: true,
          showNotification: true,
        }));

        // Auto-apply update after a short delay to show notification
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    };

    navigator.serviceWorker.addEventListener('message', handleServiceWorkerMessage);

    return () => {
      navigator.serviceWorker.removeEventListener('message', handleServiceWorkerMessage);
    };
  }, []);

  // Setup automatic checking on mount
  useEffect(() => {
    // Initial check
    checkForUpdate();

    // Setup automatic checking
    enableAutoCheck(true);

    return () => {
      if (checkInterval) {
        clearInterval(checkInterval);
      }
    };
  }, [checkForUpdate, enableAutoCheck]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (checkInterval) {
        clearInterval(checkInterval);
      }
    };
  }, [checkInterval]);

  return {
    // State
    hasUpdate: state.hasUpdate,
    isChecking: state.isChecking,
    currentVersion: state.currentVersion,
    newVersion: state.newVersion,
    error: state.error,
    showNotification: state.showNotification,

    // Actions
    checkForUpdate,
    applyUpdate,
    dismissNotification,
    enableAutoCheck,
  };
}