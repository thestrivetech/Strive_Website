// Chatbot Iframe Communication Utility
// Handles secure postMessage communication between parent site and chatbot iframe

export interface ChatbotMessage {
  type: 'resize' | 'navigate' | 'analytics' | 'ready' | 'close' | 'minimize' | 'error' | 'ping' | 'visibility' | 'mode';
  data?: {
    height?: number;
    url?: string;
    event?: string;
    properties?: Record<string, any>;
    error?: string;
    visible?: boolean;
    mode?: string;
    timestamp?: number;
  };
  timestamp: number;
  source?: string;
}

export class ChatbotIframeManager {
  private chatbotOrigin: string;
  private eventHandlers: Map<string, (data: any, event?: MessageEvent) => void> = new Map();
  private iframes: Set<HTMLIFrameElement> = new Set();
  private isListening: boolean = false;
  private messageLog: Array<{
    time: string;
    origin: string;
    data: any;
  }> = [];

  constructor() {
    // Use environment variable or default to production
    this.chatbotOrigin = import.meta.env.VITE_CHATBOT_URL || 'https://chatbot.strivetech.ai';

    // Start listening immediately
    this.startListening();
  }

  startListening() {
    if (this.isListening) return;

    window.addEventListener('message', this.handleMessage.bind(this));
    this.isListening = true;

    console.log('ChatbotIframeManager: Listening for messages from', this.chatbotOrigin);
  }

  stopListening() {
    if (!this.isListening) return;

    window.removeEventListener('message', this.handleMessage.bind(this));
    this.isListening = false;
  }

  handleMessage(event: MessageEvent) {
    // Security: validate origin
    const allowedOrigins = [
      this.chatbotOrigin,
      'https://chatbot.strivetech.ai',
      'http://localhost:5173', // Chatbot dev server
      'http://localhost:3001'  // Alternative port
    ];

    if (!allowedOrigins.includes(event.origin)) {
      console.warn('Ignored message from untrusted origin:', event.origin);
      return;
    }

    // Log message for debugging
    if (import.meta.env.DEV) {
      console.log('Received message:', event.data);
      this.messageLog.push({
        time: new Date().toISOString(),
        origin: event.origin,
        data: event.data
      });
    }

    const { type, data, source } = event.data || {};

    // Verify it's from our chatbot
    if (source !== 'sai-chatbot') {
      return;
    }

    // Call registered handlers
    const handler = this.eventHandlers.get(type);
    if (handler) {
      handler(data, event);
    }

    // Call global handler if exists
    const globalHandler = this.eventHandlers.get('*');
    if (globalHandler) {
      globalHandler({ type, data }, event);
    }
  }

  registerIframe(iframe: HTMLIFrameElement) {
    this.iframes.add(iframe);
    return () => this.iframes.delete(iframe);
  }

  onMessage(type: string, handler: (data: any, event?: MessageEvent) => void) {
    this.eventHandlers.set(type, handler);
    return () => this.eventHandlers.delete(type);
  }

  offMessage(type: string) {
    this.eventHandlers.delete(type);
  }

  sendMessage(type: string, data = {}, targetIframe: HTMLIFrameElement | null = null) {
    const message = {
      type,
      data,
      timestamp: Date.now(),
      source: 'strivetech-website'
    };

    if (targetIframe && targetIframe.contentWindow) {
      // Send to specific iframe
      targetIframe.contentWindow.postMessage(message, this.chatbotOrigin);
    } else {
      // Send to all registered iframes
      this.iframes.forEach(iframe => {
        if (iframe.contentWindow) {
          iframe.contentWindow.postMessage(message, this.chatbotOrigin);
        }
      });
    }
  }

  // Utility methods
  ping(iframe?: HTMLIFrameElement) {
    this.sendMessage('ping', { timestamp: Date.now() }, iframe);
  }

  getMessageLog() {
    return this.messageLog;
  }

  clearMessageLog() {
    this.messageLog = [];
  }

  destroy() {
    this.stopListening();
    this.eventHandlers.clear();
    this.iframes.clear();
    this.messageLog = [];
  }
}

// Utility functions for iframe management
export const createSecureIframe = (src: string, className?: string): HTMLIFrameElement => {
  const iframe = document.createElement('iframe');

  // Security attributes
  iframe.src = src;
  iframe.sandbox.add(
    'allow-scripts',
    'allow-same-origin',
    'allow-forms',
    'allow-popups',
    'allow-popups-to-escape-sandbox'
  );
  iframe.allow = 'microphone; camera; clipboard-write';
  iframe.referrerPolicy = 'strict-origin';

  // Styling
  iframe.style.border = 'none';
  iframe.style.width = '100%';
  iframe.style.height = '100%';

  if (className) {
    iframe.className = className;
  }

  return iframe;
};

export const preconnectToChatbot = (origin: string = 'https://chat.strivetech.ai') => {
  // Create preconnect link to improve loading performance
  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = origin;
  link.crossOrigin = 'anonymous';

  // Avoid duplicate preconnects
  const existing = document.querySelector(`link[rel="preconnect"][href="${origin}"]`);
  if (!existing) {
    document.head.appendChild(link);
  }
};

export const createIframeWithFallback = (
  src: string,
  fallbackContent: HTMLElement,
  timeout: number = 10000
): Promise<HTMLIFrameElement> => {
  return new Promise((resolve, reject) => {
    const iframe = createSecureIframe(src);
    let isResolved = false;

    // Set up load handler
    const handleLoad = () => {
      if (!isResolved) {
        isResolved = true;
        resolve(iframe);
      }
    };

    // Set up error handler
    const handleError = () => {
      if (!isResolved) {
        isResolved = true;
        reject(new Error('Failed to load chatbot iframe'));
      }
    };

    // Set up timeout
    const timeoutId = setTimeout(() => {
      if (!isResolved) {
        isResolved = true;
        reject(new Error('Iframe loading timeout'));
      }
    }, timeout);

    iframe.addEventListener('load', () => {
      clearTimeout(timeoutId);
      handleLoad();
    });

    iframe.addEventListener('error', () => {
      clearTimeout(timeoutId);
      handleError();
    });
  });
};

// Create singleton instance
const chatbotManager = new ChatbotIframeManager();

// Export for use in components
export default chatbotManager;
export { chatbotManager };