/// <reference lib="webworker" />

declare const self: ServiceWorkerGlobalScope;
declare const clients: Clients;
declare const __WB_MANIFEST: Array<{url: string; revision?: string} | string>;

// Add any custom types for your service worker
interface BuildInfo {
  version: string;
  timestamp: string;
  buildTime: string;
}

// Extend Window interface for version info
declare global {
  interface Window {
    __BUILD_VERSION__?: string;
    __BUILD_TIMESTAMP__?: string;
  }
}

// Message types for SW communication
export interface SWMessage {
  type: 'SKIP_WAITING' | 'GET_VERSION' | 'CHECK_VERSION' | 'CLEAR_CACHE' | 'CLEAR_ALL_CACHE';
  payload?: any;
}

export interface SWVersionResponse {
  type: 'VERSION';
  version: string;
  timestamp: string;
}

export {};