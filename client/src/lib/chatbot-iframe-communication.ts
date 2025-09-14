// Chatbot Iframe Communication Utility
// Handles secure postMessage communication between parent site and chatbot iframe

export interface ChatbotMessage {
  type: 'resize' | 'navigate' | 'analytics' | 'ready' | 'close' | 'minimize' | 'error';
  data?: {
    height?: number;
    url?: string;
    event?: string;
    properties?: Record<string, any>;
    error?: string;
  };
  timestamp: number;
}

export class ChatbotIframeManager {
  private iframe: HTMLIFrameElement | null = null;
  private chatbotOrigin: string;
  private messageHandlers: Map<string, (data: any) => void> = new Map();
  private isReady: boolean = false;

  constructor(chatbotOrigin: string = 'https://chat.strivetech.ai') {
    this.chatbotOrigin = chatbotOrigin;
    this.setupMessageListener();
  }

  private setupMessageListener() {
    window.addEventListener('message', (event) => {
      // Security: Only accept messages from trusted chatbot origin
      if (event.origin !== this.chatbotOrigin) {
        console.warn('Ignored message from untrusted origin:', event.origin);
        return;
      }

      try {
        const message: ChatbotMessage = event.data;
        this.handleMessage(message);
      } catch (error) {
        console.error('Error processing chatbot message:', error);
      }
    });
  }

  private handleMessage(message: ChatbotMessage) {
    const { type, data } = message;

    switch (type) {
      case 'ready':
        this.isReady = true;
        this.executeHandler('ready', data);
        break;

      case 'resize':
        if (data?.height && this.iframe) {
          this.iframe.style.height = `${data.height}px`;
        }
        this.executeHandler('resize', data);
        break;

      case 'navigate':
        if (data?.url) {
          // Handle navigation requests from chatbot
          window.location.href = data.url;
        }
        this.executeHandler('navigate', data);
        break;

      case 'analytics':
        // Handle analytics events from chatbot
        this.trackAnalytics(data?.event, data?.properties);
        this.executeHandler('analytics', data);
        break;

      case 'close':
        // Handle chatbot close request
        this.executeHandler('close', data);
        break;

      case 'minimize':
        // Handle chatbot minimize request
        this.executeHandler('minimize', data);
        break;

      case 'error':
        console.error('Chatbot error:', data?.error);
        this.executeHandler('error', data);
        break;

      default:
        console.warn('Unknown chatbot message type:', type);
    }
  }

  private executeHandler(type: string, data: any) {
    const handler = this.messageHandlers.get(type);
    if (handler) {
      try {
        handler(data);
      } catch (error) {
        console.error(`Error executing handler for ${type}:`, error);
      }
    }
  }

  private trackAnalytics(event?: string, properties?: Record<string, any>) {
    // Integrate with your analytics service (Google Analytics, Mixpanel, etc.)
    if (event) {
      console.log('Chatbot Analytics:', event, properties);
      // Example: gtag('event', event, properties);
    }
  }

  // Public API methods
  public setIframe(iframe: HTMLIFrameElement) {
    this.iframe = iframe;
  }

  public sendMessage(type: string, data?: any) {
    if (!this.iframe?.contentWindow) {
      console.warn('Cannot send message: iframe not ready');
      return;
    }

    const message: ChatbotMessage = {
      type: type as any,
      data,
      timestamp: Date.now()
    };

    this.iframe.contentWindow.postMessage(message, this.chatbotOrigin);
  }

  public onMessage(type: string, handler: (data: any) => void) {
    this.messageHandlers.set(type, handler);
  }

  public offMessage(type: string) {
    this.messageHandlers.delete(type);
  }

  public isIframeReady(): boolean {
    return this.isReady;
  }

  public notifyVisibilityChange(isVisible: boolean) {
    this.sendMessage('visibility', { visible: isVisible });
  }

  public notifyResize(width: number, height: number) {
    this.sendMessage('container_resize', { width, height });
  }

  public destroy() {
    this.messageHandlers.clear();
    this.iframe = null;
    this.isReady = false;
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

// Export singleton instance for global use
export const chatbotManager = new ChatbotIframeManager();

// Development mode configuration
const devManager = process.env.NODE_ENV === 'development'
  ? new ChatbotIframeManager('http://localhost:3001')
  : chatbotManager;

export { devManager as chatbotManagerDev };