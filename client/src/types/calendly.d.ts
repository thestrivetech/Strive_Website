declare global {
  interface Window {
    Calendly?: {
      initializeInlineWidgets: () => void;
    };
  }
}

export {};