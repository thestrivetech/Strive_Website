import { WebVitalsMetric } from "./web-vitals";

// Session and user tracking
let sessionId: string | null = null;
let userId: string | null = null;
let pageStartTime: number = Date.now();
let isTrackingEnabled = true;
let consentGiven = false;

// Device and browser detection
function getDeviceType(): string {
  const width = window.innerWidth;
  if (width <= 768) return 'mobile';
  if (width <= 1024) return 'tablet';
  return 'desktop';
}

function getBrowserInfo(): { browser: string; os: string } {
  const userAgent = navigator.userAgent.toLowerCase();
  
  let browser = 'unknown';
  if (userAgent.includes('chrome')) browser = 'chrome';
  else if (userAgent.includes('firefox')) browser = 'firefox';
  else if (userAgent.includes('safari')) browser = 'safari';
  else if (userAgent.includes('edge')) browser = 'edge';
  else if (userAgent.includes('opera')) browser = 'opera';

  let os = 'unknown';
  if (userAgent.includes('windows')) os = 'windows';
  else if (userAgent.includes('mac')) os = 'macos';
  else if (userAgent.includes('linux')) os = 'linux';
  else if (userAgent.includes('android')) os = 'android';
  else if (userAgent.includes('ios')) os = 'ios';

  return { browser, os };
}

// UTM parameter extraction
function getUtmParams(): { source?: string; medium?: string; campaign?: string } {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    source: urlParams.get('utm_source') || undefined,
    medium: urlParams.get('utm_medium') || undefined,
    campaign: urlParams.get('utm_campaign') || undefined,
  };
}

// Session management
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function getOrCreateSessionId(): string {
  if (sessionId) return sessionId;
  
  // Try to get from sessionStorage first
  const stored = sessionStorage.getItem('analytics_session_id');
  if (stored) {
    sessionId = stored;
    return sessionId;
  }
  
  // Create new session
  sessionId = generateSessionId();
  sessionStorage.setItem('analytics_session_id', sessionId);
  
  // Start session tracking
  startSession();
  
  return sessionId;
}

// API communication
async function sendAnalyticsData(endpoint: string, data: any): Promise<void> {
  if (!isTrackingEnabled || !consentGiven) return;
  
  try {
    await fetch(`/api/analytics/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      keepalive: true, // Important for page unload events
    });
  } catch (error) {
    console.debug('Analytics tracking error:', error);
    // Fail silently to not affect user experience
  }
}

// Session tracking
async function startSession(): Promise<void> {
  const { browser, os } = getBrowserInfo();
  const utmParams = getUtmParams();
  
  await sendAnalyticsData('session', {
    sessionId: getOrCreateSessionId(),
    userId,
    userAgent: navigator.userAgent,
    device: getDeviceType(),
    browser,
    os,
    referrer: document.referrer || undefined,
    entryPage: window.location.pathname,
    utmSource: utmParams.source,
    utmMedium: utmParams.medium,
    utmCampaign: utmParams.campaign,
  });
}

async function updateSession(updates: any): Promise<void> {
  await sendAnalyticsData('session', {
    sessionId: getOrCreateSessionId(),
    ...updates,
  });
}

// Page view tracking
export async function trackPageView(additionalData?: any): Promise<void> {
  if (!isTrackingEnabled || !consentGiven) return;
  
  const { browser, os } = getBrowserInfo();
  const utmParams = getUtmParams();
  
  // Calculate time on previous page
  const viewDuration = Math.round((Date.now() - pageStartTime) / 1000);
  pageStartTime = Date.now();
  
  const pageViewData = {
    sessionId: getOrCreateSessionId(),
    userId,
    url: window.location.href,
    path: window.location.pathname,
    title: document.title,
    referrer: document.referrer || undefined,
    device: getDeviceType(),
    browser,
    os,
    utmSource: utmParams.source,
    utmMedium: utmParams.medium,
    utmCampaign: utmParams.campaign,
    viewDuration: viewDuration > 0 ? viewDuration : undefined,
    ...additionalData,
  };
  
  await sendAnalyticsData('pageview', pageViewData);
}

// Event tracking
export async function trackEvent(
  eventType: string,
  eventName: string,
  properties?: any,
  element?: HTMLElement
): Promise<void> {
  if (!isTrackingEnabled || !consentGiven) return;
  
  const eventData = {
    sessionId: getOrCreateSessionId(),
    userId,
    eventType,
    eventName,
    url: window.location.href,
    path: window.location.pathname,
    elementId: element?.id || undefined,
    elementClass: element?.className || undefined,
    elementText: element?.textContent?.slice(0, 100) || undefined, // Limit text length
    properties: properties ? JSON.stringify(properties) : undefined,
  };
  
  await sendAnalyticsData('event', eventData);
}

// Specific event tracking functions
export async function trackClick(element: HTMLElement, eventName?: string): Promise<void> {
  await trackEvent('click', eventName || 'click', {
    tag: element.tagName.toLowerCase(),
    href: element.getAttribute('href'),
  }, element);
}

export async function trackFormSubmit(form: HTMLFormElement, eventName?: string): Promise<void> {
  await trackEvent('form_submit', eventName || 'form_submit', {
    formId: form.id,
    formAction: form.action,
    formMethod: form.method,
  }, form);
}

export async function trackScroll(depth: number): Promise<void> {
  await trackEvent('scroll', 'scroll_depth', {
    depth,
    maxDepth: Math.max(depth, parseInt(sessionStorage.getItem('max_scroll_depth') || '0')),
  });
  
  // Store max scroll depth for this session
  const currentMax = parseInt(sessionStorage.getItem('max_scroll_depth') || '0');
  if (depth > currentMax) {
    sessionStorage.setItem('max_scroll_depth', depth.toString());
  }
}

// Web Vitals integration
export async function trackWebVitals(metric: WebVitalsMetric): Promise<void> {
  if (!isTrackingEnabled || !consentGiven) return;
  
  const { browser, os } = getBrowserInfo();
  
  const webVitalsData = {
    sessionId: getOrCreateSessionId(),
    userId,
    url: window.location.href,
    path: window.location.pathname,
    metricName: metric.name,
    metricValue: metric.value,
    metricRating: metric.rating,
    metricId: metric.id,
    device: getDeviceType(),
    browser,
    connectionType: (navigator as any).connection?.effectiveType || undefined,
  };
  
  await sendAnalyticsData('web-vitals', webVitalsData);
}

// Scroll depth tracking
let maxScrollDepth = 0;
let scrollDepthMarkers = [25, 50, 75, 90, 100];
let trackedDepths = new Set<number>();

function calculateScrollDepth(): number {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  
  const scrollPercent = Math.round((scrollTop + windowHeight) / documentHeight * 100);
  return Math.min(scrollPercent, 100);
}

function setupScrollTracking(): void {
  let ticking = false;
  
  function updateScrollDepth() {
    const currentDepth = calculateScrollDepth();
    
    if (currentDepth > maxScrollDepth) {
      maxScrollDepth = currentDepth;
      
      // Track milestone depths
      for (const marker of scrollDepthMarkers) {
        if (currentDepth >= marker && !trackedDepths.has(marker)) {
          trackedDepths.add(marker);
          trackScroll(marker);
        }
      }
    }
    
    ticking = false;
  }
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateScrollDepth);
      ticking = true;
    }
  });
}

// Auto-tracking setup
function setupAutoTracking(): void {
  // Track clicks on important elements
  document.addEventListener('click', (event) => {
    const element = event.target as HTMLElement;
    
    // Track button clicks
    if (element.tagName === 'BUTTON' || element.role === 'button') {
      trackClick(element, 'button_click');
    }
    
    // Track link clicks
    else if (element.tagName === 'A' || element.closest('a')) {
      const link = element.tagName === 'A' ? element : element.closest('a')!;
      trackClick(link as HTMLElement, 'link_click');
    }
    
    // Track CTA clicks (elements with specific classes)
    else if (element.classList.contains('cta') || 
             element.classList.contains('btn-primary') ||
             element.closest('.cta, .btn-primary')) {
      trackClick(element, 'cta_click');
    }
  });
  
  // Track form submissions
  document.addEventListener('submit', (event) => {
    const form = event.target as HTMLFormElement;
    trackFormSubmit(form);
  });
  
  // Setup scroll tracking
  setupScrollTracking();
  
  // Track page visibility changes
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      // Page became hidden - update session
      updateSession({
        endTime: new Date(),
        duration: Math.round((Date.now() - pageStartTime) / 1000),
      });
    }
  });
  
  // Track page unload
  window.addEventListener('beforeunload', () => {
    const sessionDuration = Math.round((Date.now() - pageStartTime) / 1000);
    const scrollDepth = maxScrollDepth;
    
    // Update session with final data
    updateSession({
      endTime: new Date(),
      duration: sessionDuration,
      exitPage: window.location.pathname,
      bounced: sessionDuration < 10 && scrollDepth < 25, // Basic bounce detection
    });
  });
}

// Privacy and consent management
export function setTrackingConsent(consent: boolean): void {
  consentGiven = consent;
  localStorage.setItem('analytics_consent', consent.toString());
  
  if (consent) {
    // Initialize tracking if consent is given
    initializeAnalytics();
  } else {
    // Clear stored data if consent is withdrawn
    sessionStorage.removeItem('analytics_session_id');
    sessionStorage.removeItem('max_scroll_depth');
  }
}

export function hasTrackingConsent(): boolean {
  const stored = localStorage.getItem('analytics_consent');
  return stored === 'true';
}

export function setUserId(id: string): void {
  userId = id;
}

export function getUserId(): string | null {
  return userId;
}

export function getSessionId(): string | null {
  return sessionId;
}

// Main initialization
export function initializeAnalytics(options: {
  enableAutoTracking?: boolean;
  requireConsent?: boolean;
  userId?: string;
} = {}): void {
  const {
    enableAutoTracking = true,
    requireConsent = true,
    userId: initialUserId
  } = options;
  
  // Set user ID if provided
  if (initialUserId) {
    setUserId(initialUserId);
  }
  
  // Check consent
  if (requireConsent) {
    consentGiven = hasTrackingConsent();
    if (!consentGiven) {
      console.debug('Analytics tracking disabled - consent required');
      return;
    }
  } else {
    consentGiven = true;
  }
  
  // Initialize session
  getOrCreateSessionId();
  
  // Track initial page view
  trackPageView();
  
  // Setup auto-tracking if enabled
  if (enableAutoTracking) {
    setupAutoTracking();
  }
  
  console.debug('Analytics tracking initialized', {
    sessionId: getSessionId(),
    userId: getUserId(),
    consent: consentGiven,
    autoTracking: enableAutoTracking,
  });
}

// Export utility functions
export const analytics = {
  init: initializeAnalytics,
  trackPageView,
  trackEvent,
  trackClick,
  trackFormSubmit,
  trackScroll,
  trackWebVitals,
  setConsent: setTrackingConsent,
  hasConsent: hasTrackingConsent,
  setUserId,
  getUserId,
  getSessionId,
};