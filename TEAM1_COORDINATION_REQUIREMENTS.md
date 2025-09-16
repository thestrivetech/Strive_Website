# Team 1 Coordination Requirements for Website Integration

**Date:** 2025-09-15  
**Status:** Team 2 Integration Complete - Awaiting Team 1 PostMessage Implementation

## Overview

Team 2 has successfully completed all website integration tasks. The Strive Tech website is now fully prepared to embed the chatbot via iframe with proper PostMessage communication. Team 1 needs to implement specific PostMessage protocol requirements for full integration.

## Current Status

### ✅ Team 2 Completed
- [x] ChatbotIframeManager with secure PostMessage handling
- [x] FloatingChat component with iframe embedding
- [x] Full-page chat component with iframe embedding  
- [x] Performance monitoring and error handling
- [x] Test integration page for debugging
- [x] Environment configuration (VITE_CHATBOT_URL)
- [x] Documentation and deployment readiness

### ⏳ Team 1 Required
- [ ] PostMessage communication protocol implementation
- [ ] CORS headers configuration for website origins
- [ ] Widget mode endpoint optimization
- [ ] Full-page mode endpoint optimization

## PostMessage Protocol Requirements

Team 1's chatbot must implement the following PostMessage communication:

### 1. Outgoing Messages (Chatbot → Website)

#### Ready Message
```javascript
// Send when chatbot is fully loaded and ready
window.parent.postMessage({
  type: 'ready',
  data: {
    version: '1.0',
    capabilities: ['chat', 'voice', 'files'],
    timestamp: Date.now()
  },
  source: 'sai-chatbot',
  timestamp: Date.now()
}, '*');
```

#### Error Message
```javascript
// Send when chatbot encounters errors
window.parent.postMessage({
  type: 'error',
  data: {
    error: 'Connection failed',
    code: 'CONN_ERROR',
    recoverable: true
  },
  source: 'sai-chatbot',
  timestamp: Date.now()
}, '*');
```

#### Analytics Message
```javascript
// Send analytics events to parent
window.parent.postMessage({
  type: 'analytics',
  data: {
    event: 'message_sent',
    properties: {
      conversation_id: 'abc123',
      message_length: 50,
      user_type: 'new'
    }
  },
  source: 'sai-chatbot',
  timestamp: Date.now()
}, '*');
```

#### Close/Minimize Messages
```javascript
// Request parent to close chat
window.parent.postMessage({
  type: 'close',
  data: {},
  source: 'sai-chatbot',
  timestamp: Date.now()
}, '*');

// Request parent to minimize chat
window.parent.postMessage({
  type: 'minimize',
  data: {},
  source: 'sai-chatbot',
  timestamp: Date.now()
}, '*');
```

#### Navigation Message
```javascript
// Request parent to navigate to URL
window.parent.postMessage({
  type: 'navigate',
  data: {
    url: '/contact',
    target: '_self' // or '_blank'
  },
  source: 'sai-chatbot',
  timestamp: Date.now()
}, '*');
```

#### Resize Message (Widget Mode)
```javascript
// Request parent to resize iframe
window.parent.postMessage({
  type: 'resize',
  data: {
    height: 400,
    width: 350
  },
  source: 'sai-chatbot',
  timestamp: Date.now()
}, '*');
```

### 2. Incoming Messages (Website → Chatbot)

Team 1's chatbot should listen for and handle these messages:

```javascript
window.addEventListener('message', (event) => {
  // Validate origin
  const allowedOrigins = [
    'https://www.strivetech.ai',
    'https://strivetech.ai', 
    'http://localhost:5000',
    'http://localhost:3000'
  ];
  
  if (!allowedOrigins.includes(event.origin)) return;
  
  const { type, data, source } = event.data;
  
  // Only handle messages from website
  if (source !== 'strivetech-website') return;
  
  switch (type) {
    case 'ping':
      // Respond to ping with pong
      event.source.postMessage({
        type: 'pong', 
        data: { timestamp: Date.now() },
        source: 'sai-chatbot',
        timestamp: Date.now()
      }, event.origin);
      break;
      
    case 'visibility':
      // Handle visibility changes
      if (data.visible === false) {
        // Pause/minimize chatbot
      } else {
        // Resume/restore chatbot
      }
      break;
      
    case 'mode':
      // Handle mode changes
      if (data.mode === 'widget') {
        // Switch to widget mode
      } else if (data.mode === 'fullpage') {
        // Switch to full-page mode
      }
      break;
  }
});
```

## CORS Configuration

Team 1 must configure CORS headers to allow iframe embedding from:

```javascript
// Express.js example
app.use((req, res, next) => {
  const allowedOrigins = [
    'https://www.strivetech.ai',
    'https://strivetech.ai',
    'http://localhost:5000',    // Website dev server
    'http://localhost:3000'     // Alternative dev server
  ];
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Content-Security-Policy', 
    "frame-ancestors 'self' https://www.strivetech.ai https://strivetech.ai http://localhost:*"
  );
  
  next();
});
```

## Endpoint Requirements

### Widget Endpoint: `/widget`
- **Purpose:** Embedded floating chat widget
- **Size:** 384px width, flexible height (300-500px)
- **Features:** Minimize/maximize, close button
- **PostMessage:** Must send 'ready' when loaded

### Full-page Endpoint: `/full`  
- **Purpose:** Dedicated full-page chat experience
- **Size:** Full viewport
- **Features:** Enhanced UI, file uploads, voice chat
- **PostMessage:** Must send 'ready' when loaded

## Testing Coordination

### Test URLs
- **Website:** http://localhost:5000
- **Test Page:** http://localhost:5000/test-integration.html
- **Chatbot Page:** http://localhost:5000/chatbot-sai
- **Team 1 Endpoints:** 
  - https://chatbot.strivetech.ai/widget
  - https://chatbot.strivetech.ai/full

### Testing Protocol
1. Team 1 implements PostMessage protocol in development
2. Team 1 provides development URL for testing
3. Team 2 updates VITE_CHATBOT_URL to point to Team 1's dev instance
4. Joint testing of PostMessage communication
5. Cross-browser compatibility testing
6. Performance and error handling validation
7. Production deployment coordination

### Debug Tools
- Use `/test-integration.html` for PostMessage debugging
- Browser console shows all communication logs
- Performance monitor tracks loading times
- Error handlers provide fallback experiences

## Environment Variables

Team 2 uses these environment variables:

```bash
# Production (default)
VITE_CHATBOT_URL=https://chatbot.strivetech.ai

# Development - update to Team 1's dev URL when ready
# VITE_CHATBOT_URL=http://localhost:5173
# VITE_CHATBOT_URL=https://dev-chatbot.strivetech.ai
```

## Error Handling

The website integration includes robust error handling:

- **Loading timeouts:** 10-second timeout for full-page, retry logic for widget
- **Communication failures:** Graceful fallbacks when PostMessage fails
- **CORS errors:** Clear error messages and contact options
- **Network issues:** Retry mechanisms with exponential backoff

## Next Steps

1. **Team 1:** Implement PostMessage protocol in development environment
2. **Team 1:** Provide development URL for joint testing
3. **Team 2:** Update environment variables to point to Team 1's dev instance
4. **Both Teams:** Conduct joint testing of PostMessage communication
5. **Both Teams:** Validate error scenarios and edge cases
6. **Both Teams:** Production deployment coordination

## Contact

For coordination questions:
- Team 2 integration is complete and ready for Team 1's PostMessage implementation
- All website components support both development and production URLs
- Ready for immediate testing once Team 1 provides development endpoint

---

**Last Updated:** 2025-09-15  
**Team 2 Status:** COMPLETE ✅  
**Waiting For:** Team 1 PostMessage Implementation