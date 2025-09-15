/**
 * Browser Detection Utility
 * Provides utilities for detecting specific browsers and their capabilities
 */

export interface BrowserInfo {
  name: string;
  version: string;
  isComet: boolean;
  isDia: boolean;
  isSigmaOS: boolean;
  isWavebox: boolean;
  isChrome: boolean;
  isSafari: boolean;
  isFirefox: boolean;
  isEdge: boolean;
  isBrave: boolean;
  isOpera: boolean;
  isVivaldi: boolean;
  isArc: boolean;
  isSamsungInternet: boolean;
  isAIBrowser: boolean;
  userAgent: string;
}

/**
 * Detects if the current browser is Perplexity's Comet browser
 */
export function isCometBrowser(): boolean {
  if (typeof navigator === 'undefined') return false;
  
  const userAgent = navigator.userAgent.toLowerCase();
  
  // Perplexity Comet browser detection patterns
  const cometPatterns = [
    'comet',
    'perplexity',
    'perplexity-comet',
    'comet-browser'
  ];
  
  return cometPatterns.some(pattern => userAgent.includes(pattern));
}

/**
 * Detects if the current browser is Dia AI browser
 */
export function isDiaBrowser(): boolean {
  if (typeof navigator === 'undefined') return false;
  
  const userAgent = navigator.userAgent.toLowerCase();
  
  // Dia AI browser detection patterns
  const diaPatterns = [
    'dia',
    'dia-browser',
    'diabrowser'
  ];
  
  return diaPatterns.some(pattern => userAgent.includes(pattern));
}

/**
 * Detects if the current browser is an AI-powered browser
 */
export function isAIBrowser(): boolean {
  if (typeof navigator === 'undefined') return false;
  
  const userAgent = navigator.userAgent.toLowerCase();
  
  // AI browser detection patterns
  const aiPatterns = [
    'comet',
    'perplexity',
    'dia',
    'sigmaos',
    'wavebox'
  ];
  
  return aiPatterns.some(pattern => userAgent.includes(pattern));
}

/**
 * Gets comprehensive browser information
 */
export function getBrowserInfo(): BrowserInfo {
  if (typeof navigator === 'undefined') {
    return {
      name: 'Unknown',
      version: '0',
      isComet: false,
      isDia: false,
      isSigmaOS: false,
      isWavebox: false,
      isChrome: false,
      isSafari: false,
      isFirefox: false,
      isEdge: false,
      isBrave: false,
      isOpera: false,
      isVivaldi: false,
      isArc: false,
      isSamsungInternet: false,
      isAIBrowser: false,
      userAgent: 'server-side-rendering'
    };
  }

  const userAgent = navigator.userAgent;
  const userAgentLower = userAgent.toLowerCase();

  // Detect AI browsers first (most specific)
  const isComet = isCometBrowser();
  const isDia = isDiaBrowser();
  const isSigmaOS = userAgentLower.includes('sigmaos');
  const isWavebox = userAgentLower.includes('wavebox');

  // Overall AI browser detection
  const isAIBrowserDetected = isAIBrowser();

  // Detect other browsers (order matters - more specific first)
  const isBrave = userAgentLower.includes('brave') || !!(navigator as any).brave;
  const isVivaldi = userAgentLower.includes('vivaldi') && !isWavebox; // Wavebox sometimes includes vivaldi
  const isArc = userAgentLower.includes('arc') && !isComet && !isDia;
  const isOpera = (userAgentLower.includes('opr') || userAgentLower.includes('opera')) && !isAIBrowserDetected;
  const isSamsungInternet = userAgentLower.includes('samsungbrowser');
  const isEdge = userAgentLower.includes('edg') && !isAIBrowserDetected;
  const isFirefox = userAgentLower.includes('firefox') && !isAIBrowserDetected;
  const isSafari = userAgentLower.includes('safari') && !userAgentLower.includes('chrome') && !userAgentLower.includes('chromium') && !isAIBrowserDetected;
  const isChrome = userAgentLower.includes('chrome') && !isEdge && !isBrave && !isVivaldi && !isOpera && !isSamsungInternet && !isAIBrowserDetected;

  // Determine browser name (most specific first - AI browsers first)
  let name = 'Unknown';
  if (isComet) name = 'Perplexity Comet';
  else if (isDia) name = 'Dia';
  else if (isSigmaOS) name = 'SigmaOS';
  else if (isWavebox) name = 'Wavebox';
  else if (isBrave) name = 'Brave';
  else if (isVivaldi) name = 'Vivaldi';
  else if (isArc) name = 'Arc';
  else if (isOpera) name = 'Opera';
  else if (isSamsungInternet) name = 'Samsung Internet';
  else if (isEdge) name = 'Microsoft Edge';
  else if (isFirefox) name = 'Firefox';
  else if (isSafari) name = 'Safari';
  else if (isChrome) name = 'Chrome';

  // Extract version (simplified)
  let version = '0';
  try {
    if (isComet) {
      // Try to extract Comet version if available
      const cometMatch = userAgent.match(/comet[\/\s](\d+(?:\.\d+)*)/i);
      version = cometMatch?.[1] || '1.0';
    } else if (isDia) {
      // Try to extract Dia version if available
      const diaMatch = userAgent.match(/dia[\/\s](\d+(?:\.\d+)*)/i);
      version = diaMatch?.[1] || '1.0';
    } else if (isSigmaOS) {
      const sigmaMatch = userAgent.match(/sigmaos[\/\s](\d+(?:\.\d+)*)/i);
      version = sigmaMatch?.[1] || '1.0';
    } else if (isWavebox) {
      const waveboxMatch = userAgent.match(/wavebox[\/\s](\d+(?:\.\d+)*)/i);
      version = waveboxMatch?.[1] || '1.0';
    } else if (isBrave) {
      // Brave uses Chrome version number
      const braveMatch = userAgent.match(/chrome[\/\s](\d+(?:\.\d+)*)/i);
      version = braveMatch?.[1] || '0';
    } else if (isVivaldi) {
      const vivaldiMatch = userAgent.match(/vivaldi[\/\s](\d+(?:\.\d+)*)/i);
      version = vivaldiMatch?.[1] || '0';
    } else if (isOpera) {
      const operaMatch = userAgent.match(/(?:opr|opera)[\/\s](\d+(?:\.\d+)*)/i);
      version = operaMatch?.[1] || '0';
    } else if (isSamsungInternet) {
      const samsungMatch = userAgent.match(/samsungbrowser[\/\s](\d+(?:\.\d+)*)/i);
      version = samsungMatch?.[1] || '0';
    } else if (isEdge) {
      const edgeMatch = userAgent.match(/edg[\/\s](\d+(?:\.\d+)*)/i);
      version = edgeMatch?.[1] || '0';
    } else if (isChrome) {
      const chromeMatch = userAgent.match(/chrome[\/\s](\d+(?:\.\d+)*)/i);
      version = chromeMatch?.[1] || '0';
    } else if (isSafari) {
      const safariMatch = userAgent.match(/version[\/\s](\d+(?:\.\d+)*)/i);
      version = safariMatch?.[1] || '0';
    } else if (isFirefox) {
      const firefoxMatch = userAgent.match(/firefox[\/\s](\d+(?:\.\d+)*)/i);
      version = firefoxMatch?.[1] || '0';
    }
  } catch (error) {
    console.warn('[BrowserDetection] Version parsing failed:', error);
  }

  return {
    name,
    version,
    isComet,
    isDia,
    isSigmaOS,
    isWavebox,
    isChrome,
    isSafari,
    isFirefox,
    isEdge,
    isBrave,
    isOpera,
    isVivaldi,
    isArc,
    isSamsungInternet,
    isAIBrowser: isAIBrowserDetected,
    userAgent
  };
}

/**
 * Determines if the browser has known Calendly compatibility issues
 */
export function hasCalendlyCompatibilityIssues(): boolean {
  const browserInfo = getBrowserInfo();
  
  // Comet browser has known issues with Calendly iframe embedding due to strict security policies
  if (browserInfo.isComet) {
    console.log('[BrowserDetection] Comet browser detected - using direct calendar fallback');
    return true;
  }
  
  // For now, only Comet has confirmed issues
  // Dia and other AI browsers may work fine, but we can add them here if issues are discovered
  // if (browserInfo.isDia) {
  //   console.log('[BrowserDetection] Dia browser detected - using direct calendar fallback');
  //   return true;
  // }
  
  // Note: Other browsers like Brave, Vivaldi, Opera, Arc work fine with Calendly
  // They are Chromium-based and have compatible iframe handling
  // Most AI browsers are also Chromium-based and should work fine
  
  return false;
}

/**
 * Gets browser-specific configuration for Calendly integration
 */
export function getCalendlyConfig() {
  const browserInfo = getBrowserInfo();
  
  return {
    shouldUseFallback: hasCalendlyCompatibilityIssues(),
    browserInfo,
    preferredMethod: browserInfo.isComet ? 'direct-link' : 'iframe',
    logBrowserInfo: () => {
      console.log('[BrowserDetection] Browser Info:', {
        name: browserInfo.name,
        version: browserInfo.version,
        isComet: browserInfo.isComet,
        userAgent: browserInfo.userAgent.substring(0, 100) + '...'
      });
    }
  };
}