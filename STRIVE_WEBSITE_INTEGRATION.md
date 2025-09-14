# Strive Tech Website - Chatbot Integration Guide

**Version:** 2.0
**Date:** September 14, 2025
**Purpose:** Complete integration guide for Sai AI Chatbot with Strive Tech website

## Executive Summary

This document provides complete specifications for integrating your 5,000+ line Sai AI Chatbot with the Strive Tech website. The integration uses a **secure iframe-based approach** with subdomain deployment (`chat.strivetech.ai` or `sai.strivetech.ai`) that provides zero performance impact on the main website while maintaining perfect visual consistency.

### Key Integration Points:
- **Two Integration Modes**: Floating widget (384×500px) and full-page experience
- **Zero Main Site Impact**: Chatbot runs on separate subdomain with iframe embedding
- **Complete UI Matching**: Dark theme with orange accents, Inter font, shadcn/ui components
- **Secure Communication**: PostMessage API with origin validation
- **Professional Error Handling**: Graceful fallbacks and retry mechanisms

---

## Website Design System & UI Specifications

### Color Palette & Theme
The Strive Tech website uses a **dark theme** with **orange primary accent**. Your chatbot must match these exact colors:

```css
/* Primary Color System - MUST MATCH EXACTLY */
:root {
  /* Core Theme Colors */
  --background: hsl(222, 84%, 4.9%);           /* Main background - very dark blue */
  --foreground: hsl(210, 40%, 98%);            /* Text color - near white */
  --card: hsl(222, 84%, 5.9%);                 /* Card backgrounds - slightly lighter */
  --card-foreground: hsl(210, 40%, 98%);       /* Card text */

  /* Primary Orange Accent - KEY BRAND COLOR */
  --primary: hsl(18, 100%, 60%);               /* Orange #FF9966 - buttons, links, CTAs */
  --primary-foreground: hsl(222, 84%, 4.9%);   /* Dark text on orange backgrounds */

  /* Secondary Colors */
  --secondary: hsl(217, 32%, 17%);             /* Darker blue for secondary elements */
  --secondary-foreground: hsl(210, 40%, 98%);  /* White text on secondary */

  /* Interactive Elements */
  --border: hsl(217, 32%, 17%);                /* Border color for inputs/cards */
  --input: hsl(217, 32%, 17%);                 /* Input background */
  --ring: hsl(18, 100%, 60%);                  /* Focus ring color (orange) */

  /* Status Colors */
  --destructive: hsl(0, 62%, 55%);             /* Error red */
  --muted: hsl(217, 32%, 17%);                 /* Muted backgrounds */
  --muted-foreground: hsl(215, 20%, 65%);      /* Muted text */
}
```

### Typography System
```css
/* Font Configuration - MUST USE THESE FONTS */
font-family: {
  --font-sans: 'Inter', sans-serif;           /* Primary font for all text */
  --font-serif: 'Inter', sans-serif;          /* Fallback (also Inter) */
  --font-mono: 'JetBrains Mono', monospace;   /* Code/technical text */
}

/* Font Loading - Include in your HTML head */
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

### Component Styling Standards

#### Chat Message Bubbles
```css
/* User Messages (right-aligned) */
.user-message {
  background-color: hsl(18, 100%, 60%);        /* Orange primary */
  color: hsl(222, 84%, 4.9%);                  /* Dark text on orange */
  border-radius: 12px 12px 4px 12px;           /* Rounded with speech tail */
  padding: 12px 16px;
  margin-left: auto;
  max-width: 70%;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
}

/* AI Messages (left-aligned) */
.ai-message {
  background-color: hsl(222, 84%, 5.9%);       /* Card background */
  color: hsl(210, 40%, 98%);                   /* White text */
  border: 1px solid hsl(217, 32%, 17%);        /* Subtle border */
  border-radius: 12px 12px 12px 4px;           /* Rounded with speech tail */
  padding: 12px 16px;
  margin-right: auto;
  max-width: 70%;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
}

/* System Messages */
.system-message {
  background-color: hsl(217, 32%, 17%);        /* Muted background */
  color: hsl(215, 20%, 65%);                   /* Muted text */
  border-radius: 8px;
  padding: 8px 12px;
  text-align: center;
  font-size: 0.875rem;
  margin: 8px 0;
}
```

#### Input Areas & Buttons
```css
/* Chat Input Field */
.chat-input {
  background-color: hsl(217, 32%, 17%);        /* Input background */
  border: 1px solid hsl(217, 32%, 17%);        /* Border */
  border-radius: 12px;
  padding: 12px 16px;
  color: hsl(210, 40%, 98%);                   /* White text */
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  transition: all 0.2s ease;
}

.chat-input:focus {
  outline: none;
  border-color: hsl(18, 100%, 60%);            /* Orange focus border */
  box-shadow: 0 0 0 2px hsl(18, 100%, 60%);    /* Orange focus ring */
}

/* Send Button */
.send-button {
  background-color: hsl(18, 100%, 60%);        /* Orange primary */
  color: hsl(222, 84%, 4.9%);                  /* Dark text */
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.send-button:hover {
  background-color: hsl(18, 100%, 65%);        /* Slightly lighter on hover */
  transform: translateY(-1px);
}

.send-button:disabled {
  background-color: hsl(217, 32%, 17%);        /* Muted when disabled */
  color: hsl(215, 20%, 65%);
  cursor: not-allowed;
}
```

#### Loading & Status Indicators
```css
/* Loading Spinner */
.loading-spinner {
  border: 2px solid hsl(217, 32%, 17%);        /* Base color */
  border-top: 2px solid hsl(18, 100%, 60%);    /* Orange accent */
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

/* Typing Indicator */
.typing-indicator {
  background-color: hsl(222, 84%, 5.9%);       /* Card background */
  border: 1px solid hsl(217, 32%, 17%);
  border-radius: 12px 12px 12px 4px;
  padding: 16px;
  margin: 8px 0;
  display: flex;
  gap: 4px;
  align-items: center;
}

.typing-dot {
  width: 8px;
  height: 8px;
  background-color: hsl(18, 100%, 60%);        /* Orange dots */
  border-radius: 50%;
  animation: pulse 1.5s infinite;
}
```

---

## Sai AI Chatbot - Product Specifications

Based on the session analysis, your Sai AI Chatbot should embody these characteristics:

### Core Capabilities
- **24/7 Support System**: Always available when the Strive Tech team is not
- **Company-Specific Training**: Trained on all Strive Tech projects and services
- **Comprehensive Product Knowledge**: Understands every product/service ever created by Strive Tech
- **Adaptive Learning**: Can be trained on existing client software and future projects
- **Real-time Development Awareness**: Alongside architect team during entire development process
- **Expert Troubleshooting**: Step-by-step guides for any issues that arise

### Personality & Tone
- **Professional but Friendly**: Matches Strive Tech's innovative, client-focused approach
- **Technical Expert**: Deep understanding of software development and business solutions
- **Proactive Helper**: Anticipates needs and provides comprehensive guidance
- **Educational**: Helps clients understand products beyond basic troubleshooting

### Knowledge Base Areas
1. **Custom Software Development**
2. **AI Integration Solutions**
3. **Business Process Automation**
4. **Cloud Infrastructure**
5. **Database Design & Management**
6. **Mobile App Development**
7. **E-commerce Platforms**
8. **Security Implementation**

---

## Technical Integration Requirements

### Required Endpoints on Your Chatbot Subdomain

#### 1. Widget Endpoint: `GET /widget`
**Purpose**: Compact chat interface for floating widget (384×500px container)

**Response Requirements**:
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sai AI Assistant - Widget</title>
  <style>
    /* Apply Strive Tech styling system from above */
    body {
      margin: 0;
      padding: 0;
      font-family: 'Inter', sans-serif;
      background-color: hsl(222, 84%, 4.9%);
      color: hsl(210, 40%, 98%);
      overflow-x: hidden;
    }
    .widget-container {
      max-width: 384px;
      max-height: 500px;
      height: 100vh;
      display: flex;
      flex-direction: column;
    }
    /* Hide elements not needed in widget mode */
    .chat-header { display: none; }
    .full-branding { display: none; }
  </style>
</head>
<body>
  <div class="widget-container">
    <!-- Your compact chat interface -->
    <div class="chat-messages" id="messages"></div>
    <div class="chat-input-area">
      <input type="text" class="chat-input" placeholder="Ask Sai anything...">
      <button class="send-button">Send</button>
    </div>
  </div>

  <!-- REQUIRED: PostMessage Communication -->
  <script>
    // Notify parent when ready
    window.addEventListener('load', () => {
      parent.postMessage({ type: 'ready', timestamp: Date.now() }, '*');
    });

    // Auto-resize communication
    function notifyResize() {
      const height = document.body.scrollHeight;
      parent.postMessage({
        type: 'resize',
        data: { height },
        timestamp: Date.now()
      }, '*');
    }

    // Call on content changes
    new ResizeObserver(notifyResize).observe(document.body);
  </script>
</body>
</html>
```

#### 2. Full Page Endpoint: `GET /full`
**Purpose**: Complete chat experience for dedicated page (full viewport)

**Response Requirements**:
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Chat with Sai - Strive Tech AI Assistant</title>
  <style>
    /* Apply Strive Tech styling system */
    body {
      margin: 0;
      padding: 0;
      font-family: 'Inter', sans-serif;
      background-color: hsl(222, 84%, 4.9%);
      color: hsl(210, 40%, 98%);
      min-height: 100vh;
    }
    .fullpage-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    /* Show all elements in full mode */
    .chat-header { display: block; }
    .full-branding { display: block; }
  </style>
</head>
<body>
  <div class="fullpage-container">
    <!-- Full chat interface with header/branding -->
    <div class="chat-header">
      <h1>Chat with Sai</h1>
      <p>Your 24/7 Strive Tech AI Assistant</p>
    </div>
    <div class="chat-messages" id="messages"></div>
    <div class="chat-input-area">
      <!-- Full-featured input area -->
    </div>
  </div>

  <!-- REQUIRED: PostMessage Communication -->
  <script>
    window.addEventListener('load', () => {
      parent.postMessage({ type: 'ready', timestamp: Date.now() }, '*');
    });

    // Handle full-page specific messages
    window.addEventListener('message', (event) => {
      if (event.data.type === 'mode' && event.data.data?.type === 'fullpage') {
        document.body.classList.add('fullpage-mode');
        enableFullPageFeatures();
      }
    });
  </script>
</body>
</html>
```

### Required CORS Configuration
```javascript
// On your chatbot server (Express.js example)
const cors = require('cors');

// Development CORS (more permissive)
if (process.env.NODE_ENV === 'development') {
  app.use(cors({
    origin: [
      'http://localhost:5000',    // Main website dev
      'http://localhost:3000',    // Alternative dev port
      'http://127.0.0.1:5000'     // IP-based access
    ],
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
}

// Production CORS (strict)
if (process.env.NODE_ENV === 'production') {
  app.use(cors({
    origin: [
      'https://strivetech.ai',
      'https://www.strivetech.ai',
      // Add any additional production domains
    ],
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: false,
    optionsSuccessStatus: 204
  }));
}

// Handle preflight requests
app.options('*', cors());
```

### PostMessage Communication Protocol

#### Messages Your Chatbot MUST Send to Parent Website

```javascript
// Required Events
const parentEvents = {
  // CRITICAL: Notify when chatbot is ready
  ready: () => {
    parent.postMessage({
      type: 'ready',
      timestamp: Date.now()
    }, getParentOrigin());
  },

  // CRITICAL: Handle errors gracefully
  error: (errorMessage) => {
    parent.postMessage({
      type: 'error',
      data: { error: errorMessage },
      timestamp: Date.now()
    }, getParentOrigin());
  },

  // RECOMMENDED: Dynamic height adjustment
  resize: (height) => {
    parent.postMessage({
      type: 'resize',
      data: { height },
      timestamp: Date.now()
    }, getParentOrigin());
  },

  // OPTIONAL: Navigate parent website
  navigate: (url) => {
    parent.postMessage({
      type: 'navigate',
      data: { url },
      timestamp: Date.now()
    }, getParentOrigin());
  },

  // OPTIONAL: Control widget state
  close: () => {
    parent.postMessage({
      type: 'close',
      timestamp: Date.now()
    }, getParentOrigin());
  },

  // OPTIONAL: Analytics tracking
  analytics: (event, properties) => {
    parent.postMessage({
      type: 'analytics',
      data: { event, properties },
      timestamp: Date.now()
    }, getParentOrigin());
  }
};

function getParentOrigin() {
  return process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : 'https://strivetech.ai';
}
```

#### Messages Your Chatbot Should LISTEN For

```javascript
// Listen for parent website commands
window.addEventListener('message', (event) => {
  // SECURITY: Validate origin
  const allowedOrigins = [
    'https://strivetech.ai',
    'https://www.strivetech.ai',
    'http://localhost:5000'  // Development
  ];

  if (!allowedOrigins.includes(event.origin)) {
    console.warn('Ignored message from untrusted origin:', event.origin);
    return;
  }

  // Handle different message types
  switch(event.data.type) {
    case 'visibility':
      handleVisibilityChange(event.data.visible);
      break;

    case 'container_resize':
      handleContainerResize(event.data.width, event.data.height);
      break;

    case 'mode':
      handleModeChange(event.data.mode); // 'widget' or 'fullpage'
      break;

    case 'user_info':
      // Parent can share user context (if available)
      handleUserContext(event.data.user);
      break;
  }
});

// Implementation examples
function handleVisibilityChange(isVisible) {
  if (isVisible) {
    // Resume chat updates, enable real-time features
    resumeChatUpdates();
  } else {
    // Pause non-essential updates to save resources
    pauseBackgroundTasks();
  }
}

function handleModeChange(mode) {
  if (mode === 'fullpage') {
    // Enable full features: file uploads, voice chat, etc.
    enableFullPageFeatures();
    document.body.classList.add('fullpage-mode');
  } else {
    // Compact mode: simplified UI
    enableCompactMode();
    document.body.classList.add('widget-mode');
  }
}
```

---

## Step-by-Step Implementation Guide

### Phase 1: Environment Setup

#### A. Create Subdomain Structure
```bash
# Choose one of these subdomain approaches:
# Option 1: chat.strivetech.ai (recommended)
# Option 2: sai.strivetech.ai (more branded)

# 1. Configure DNS
# Create CNAME record pointing to your hosting provider
# chat.strivetech.ai -> your-hosting-platform.com

# 2. SSL Certificate
# Ensure SSL is configured for your subdomain
# Test: https://chat.strivetech.ai should show valid certificate

# 3. Verify HTTPS Access
curl -I https://chat.strivetech.ai
# Should return 200 OK with valid SSL
```

#### B. Development Environment Configuration
```javascript
// Add to your chatbot's environment variables
// .env file
NODE_ENV=development
PORT=3001
PARENT_ORIGIN_DEV=http://localhost:5000
PARENT_ORIGIN_PROD=https://strivetech.ai
ALLOWED_ORIGINS=https://strivetech.ai,https://www.strivetech.ai,http://localhost:5000

// Development server setup
const allowedOrigins = process.env.NODE_ENV === 'development'
  ? ['http://localhost:5000', 'http://localhost:3000']
  : ['https://strivetech.ai', 'https://www.strivetech.ai'];
```

### Phase 2: Chatbot Code Integration

#### A. Add Required Route Handlers
```javascript
// Express.js route setup
const express = require('express');
const app = express();

// Widget route - compact interface
app.get('/widget', (req, res) => {
  const parentOrigin = req.get('origin') || 'https://strivetech.ai';

  res.render('widget', {
    mode: 'widget',
    parentOrigin: parentOrigin,
    features: {
      compactMode: true,
      showHeader: false,
      showFooter: false,
      maxHeight: '500px',
      maxWidth: '384px'
    },
    styling: {
      theme: 'strive-dark',
      primaryColor: 'hsl(18, 100%, 60%)',
      backgroundColor: 'hsl(222, 84%, 4.9%)'
    }
  });
});

// Full page route - complete interface
app.get('/full', (req, res) => {
  const parentOrigin = req.get('origin') || 'https://strivetech.ai';

  res.render('full', {
    mode: 'fullpage',
    parentOrigin: parentOrigin,
    features: {
      compactMode: false,
      showHeader: true,
      showFooter: true,
      fullFeatures: true
    },
    styling: {
      theme: 'strive-dark',
      primaryColor: 'hsl(18, 100%, 60%)',
      backgroundColor: 'hsl(222, 84%, 4.9%)'
    }
  });
});
```

#### B. Implement PostMessage Communication
```javascript
// Create: chatbot-communication.js
class StriveTechCommunication {
  constructor() {
    this.parentOrigin = this.getParentOrigin();
    this.setupEventListeners();
    this.notifyReady();
  }

  getParentOrigin() {
    // Check URL parameters first
    const urlParams = new URLSearchParams(window.location.search);
    const parentParam = urlParams.get('parent');
    if (parentParam) return parentParam;

    // Environment-based fallback
    return window.location.hostname === 'localhost'
      ? 'http://localhost:5000'
      : 'https://strivetech.ai';
  }

  setupEventListeners() {
    // Listen for parent messages
    window.addEventListener('message', this.handleParentMessage.bind(this));

    // Auto-resize detection
    if (window.ResizeObserver) {
      const resizeObserver = new ResizeObserver(() => {
        this.notifyResize();
      });
      resizeObserver.observe(document.body);
    }

    // Cleanup on unload
    window.addEventListener('beforeunload', () => {
      this.notifyEvent('close');
    });
  }

  notifyReady() {
    this.sendToParent('ready', {
      chatbotVersion: '2.0',
      capabilities: ['text', 'files', 'troubleshooting'],
      mode: this.getMode()
    });
  }

  notifyResize() {
    const height = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );

    this.sendToParent('resize', { height });
  }

  sendToParent(type, data = {}) {
    if (window.parent && window.parent !== window) {
      try {
        window.parent.postMessage({
          type,
          data,
          timestamp: Date.now(),
          source: 'sai-chatbot'
        }, this.parentOrigin);
      } catch (error) {
        console.error('Failed to communicate with parent:', error);
      }
    }
  }

  handleParentMessage(event) {
    // Security check
    const allowedOrigins = [
      'https://strivetech.ai',
      'https://www.strivetech.ai',
      'http://localhost:5000'
    ];

    if (!allowedOrigins.includes(event.origin)) {
      console.warn('Ignored message from:', event.origin);
      return;
    }

    // Handle message types
    switch(event.data.type) {
      case 'visibility':
        this.handleVisibilityChange(event.data.visible);
        break;
      case 'mode':
        this.handleModeChange(event.data.mode);
        break;
      case 'container_resize':
        this.handleContainerResize(event.data.width, event.data.height);
        break;
    }
  }

  getMode() {
    return window.location.pathname.includes('/widget') ? 'widget' : 'fullpage';
  }
}

// Initialize communication
const striveComm = new StriveTechCommunication();

// Export for use in your chatbot code
window.striveComm = striveComm;
```

### Phase 3: UI Styling Implementation

#### A. Create Strive Tech Theme CSS
```css
/* Create: strive-theme.css */

/* Import required fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap');

/* Strive Tech CSS Variables */
:root {
  /* Exact color matches */
  --strive-background: hsl(222, 84%, 4.9%);
  --strive-foreground: hsl(210, 40%, 98%);
  --strive-card: hsl(222, 84%, 5.9%);
  --strive-primary: hsl(18, 100%, 60%);
  --strive-primary-foreground: hsl(222, 84%, 4.9%);
  --strive-secondary: hsl(217, 32%, 17%);
  --strive-border: hsl(217, 32%, 17%);
  --strive-muted: hsl(215, 20%, 65%);

  /* Typography */
  --strive-font-sans: 'Inter', sans-serif;
  --strive-font-mono: 'JetBrains Mono', monospace;

  /* Spacing & Sizing */
  --strive-radius: 12px;
  --strive-radius-sm: 8px;
}

/* Base Styling */
body {
  font-family: var(--strive-font-sans);
  background-color: var(--strive-background);
  color: var(--strive-foreground);
  margin: 0;
  padding: 0;
  line-height: 1.6;
}

/* Chat Container */
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--strive-background);
}

/* Header Styling */
.chat-header {
  padding: 16px 20px;
  border-bottom: 1px solid var(--strive-border);
  background-color: var(--strive-card);
}

.chat-header h1 {
  margin: 0 0 4px 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--strive-primary);
}

.chat-header p {
  margin: 0;
  font-size: 14px;
  color: var(--strive-muted);
}

/* Messages Area */
.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 16px 20px;
  scroll-behavior: smooth;
}

/* Message Bubbles */
.message {
  margin-bottom: 16px;
  display: flex;
  gap: 12px;
}

.message.user {
  flex-direction: row-reverse;
}

.message-bubble {
  max-width: 70%;
  padding: 12px 16px;
  border-radius: var(--strive-radius);
  font-size: 14px;
  line-height: 1.5;
}

.message.user .message-bubble {
  background-color: var(--strive-primary);
  color: var(--strive-primary-foreground);
  border-radius: 12px 12px 4px 12px;
}

.message.assistant .message-bubble {
  background-color: var(--strive-card);
  color: var(--strive-foreground);
  border: 1px solid var(--strive-border);
  border-radius: 12px 12px 12px 4px;
}

/* Typing Indicator */
.typing-indicator {
  display: flex;
  gap: 4px;
  padding: 12px 16px;
  background-color: var(--strive-card);
  border: 1px solid var(--strive-border);
  border-radius: 12px 12px 12px 4px;
  margin-bottom: 16px;
  align-items: center;
}

.typing-dot {
  width: 8px;
  height: 8px;
  background-color: var(--strive-primary);
  border-radius: 50%;
  animation: typing-pulse 1.5s ease-in-out infinite;
}

.typing-dot:nth-child(2) { animation-delay: 0.2s; }
.typing-dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes typing-pulse {
  0%, 60%, 100% { opacity: 0.3; }
  30% { opacity: 1; }
}

/* Input Area */
.input-container {
  padding: 16px 20px;
  border-top: 1px solid var(--strive-border);
  background-color: var(--strive-background);
}

.input-wrapper {
  display: flex;
  gap: 8px;
  align-items: end;
}

.chat-input {
  flex: 1;
  background-color: var(--strive-secondary);
  border: 1px solid var(--strive-border);
  border-radius: var(--strive-radius);
  padding: 12px 16px;
  color: var(--strive-foreground);
  font-family: var(--strive-font-sans);
  font-size: 14px;
  resize: none;
  min-height: 44px;
  max-height: 120px;
  transition: all 0.2s ease;
}

.chat-input:focus {
  outline: none;
  border-color: var(--strive-primary);
  box-shadow: 0 0 0 2px hsla(18, 100%, 60%, 0.2);
}

.chat-input::placeholder {
  color: var(--strive-muted);
}

/* Send Button */
.send-button {
  background-color: var(--strive-primary);
  color: var(--strive-primary-foreground);
  border: none;
  border-radius: var(--strive-radius-sm);
  padding: 12px 20px;
  font-family: var(--strive-font-sans);
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 60px;
  height: 44px;
}

.send-button:hover:not(:disabled) {
  background-color: hsl(18, 100%, 65%);
  transform: translateY(-1px);
}

.send-button:disabled {
  background-color: var(--strive-secondary);
  color: var(--strive-muted);
  cursor: not-allowed;
  transform: none;
}

/* Loading States */
.loading-spinner {
  border: 2px solid var(--strive-border);
  border-top: 2px solid var(--strive-primary);
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Widget-specific styles */
.widget-mode {
  max-width: 384px;
  max-height: 500px;
  height: 100vh;
}

.widget-mode .chat-header {
  display: none; /* Hide header in widget mode */
}

/* Fullpage-specific styles */
.fullpage-mode {
  min-height: 100vh;
}

.fullpage-mode .chat-container {
  min-height: 100vh;
}

/* Error States */
.error-message {
  background-color: hsl(0, 62%, 55%);
  color: white;
  padding: 12px 16px;
  border-radius: var(--strive-radius-sm);
  margin: 8px 0;
  font-size: 14px;
}

/* Success States */
.success-message {
  background-color: hsl(120, 60%, 50%);
  color: white;
  padding: 12px 16px;
  border-radius: var(--strive-radius-sm);
  margin: 8px 0;
  font-size: 14px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .messages-container {
    padding: 12px 16px;
  }

  .input-container {
    padding: 12px 16px;
  }

  .chat-header {
    padding: 12px 16px;
  }

  .message-bubble {
    max-width: 85%;
    font-size: 14px;
  }
}

/* Accessibility */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Focus indicators */
button:focus,
input:focus,
textarea:focus {
  outline: 2px solid var(--strive-primary);
  outline-offset: 2px;
}
```

### Phase 4: Testing & Validation

#### A. Local Development Testing
```bash
# 1. Start your chatbot server (should run on port 3001)
cd /path/to/your/chatbot
npm run dev  # or your development command

# 2. Verify endpoints are accessible
curl http://localhost:3001/widget
curl http://localhost:3001/full

# 3. Test CORS configuration
curl -H "Origin: http://localhost:5000" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     http://localhost:3001/widget

# Should return CORS headers allowing localhost:5000
```

#### B. Integration Testing Checklist
```javascript
// Testing checklist - verify each item works:

// ✅ Basic Loading
- [ ] Widget loads in floating chat button
- [ ] Full page loads at /chatbot-sai
- [ ] No console errors during load
- [ ] Proper styling matches Strive Tech theme

// ✅ Communication
- [ ] Parent receives 'ready' message
- [ ] Resize messages work correctly
- [ ] Error messages are handled
- [ ] Navigation messages work (if implemented)

// ✅ User Interface
- [ ] Chat input accepts text
- [ ] Send button works
- [ ] Messages display correctly
- [ ] Typing indicators appear
- [ ] Scrolling works smoothly

// ✅ Responsive Design
- [ ] Widget works on mobile (384px max width)
- [ ] Full page is responsive
- [ ] Touch interactions work on mobile
- [ ] Keyboard navigation works

// ✅ Error Handling
- [ ] Network errors display gracefully
- [ ] Server errors show retry options
- [ ] Timeout handling works
- [ ] Offline state is handled

// ✅ Performance
- [ ] Initial load under 2 seconds
- [ ] Smooth scrolling and animations
- [ ] No memory leaks during long sessions
- [ ] Efficient message rendering
```

#### C. Cross-Browser Testing
```bash
# Test these browsers/devices:
- Chrome Desktop (latest)
- Firefox Desktop (latest)
- Safari Desktop (latest)
- Edge Desktop (latest)
- Chrome Mobile (Android)
- Safari Mobile (iOS)
- Samsung Internet (Android)

# Specific tests for each:
- Initial page load
- Chat functionality
- PostMessage communication
- Responsive design
- Touch interactions (mobile)
- Keyboard accessibility
```

### Phase 5: Production Deployment

#### A. Environment Configuration
```javascript
// Production environment variables
NODE_ENV=production
PORT=3001  // or your production port
PARENT_ORIGIN=https://strivetech.ai
ALLOWED_ORIGINS=https://strivetech.ai,https://www.strivetech.ai
SUBDOMAIN_URL=https://chat.strivetech.ai

// Security headers for production
const helmet = require('helmet');
app.use(helmet({
  frameOptions: false, // Allow iframe embedding
  contentSecurityPolicy: {
    directives: {
      frameSrc: ["'self'", "https://strivetech.ai"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"]
    }
  }
}));
```

#### B. Final Production Checklist
```bash
# Pre-deployment verification
- [ ] SSL certificate valid for subdomain
- [ ] CORS configured correctly for production
- [ ] All environment variables set
- [ ] Error logging configured
- [ ] Performance monitoring enabled
- [ ] Health check endpoint working
- [ ] CDN configured (if applicable)

# Post-deployment verification
- [ ] https://chat.strivetech.ai/widget loads
- [ ] https://chat.strivetech.ai/full loads
- [ ] Integration works on live Strive Tech site
- [ ] Mobile responsiveness confirmed
- [ ] Performance metrics within targets
- [ ] Error tracking operational
```

---

## Troubleshooting Guide

### Common Issues & Solutions

#### Issue 1: CORS Errors
**Symptoms:** "blocked by CORS policy" in browser console
**Root Cause:** Incorrect origin configuration

**Solution:**
```javascript
// Verify your CORS configuration includes exact origins
app.use(cors({
  origin: [
    'https://strivetech.ai',      // ✅ Production
    'https://www.strivetech.ai',  // ✅ WWW subdomain
    'http://localhost:5000'       // ✅ Development
  ],
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS']
}));

// Add OPTIONS handler for preflight requests
app.options('*', cors());
```

#### Issue 2: PostMessage Communication Failure
**Symptoms:** No communication between iframe and parent

**Debugging Steps:**
```javascript
// Add debug logging to your communication code
window.addEventListener('message', (event) => {
  console.log('🔍 Message received:', {
    origin: event.origin,
    data: event.data,
    source: event.source
  });

  // Your existing handler code
});

// Verify parent origin matches exactly
const expectedOrigins = ['https://strivetech.ai', 'http://localhost:5000'];
console.log('✅ Allowed origins:', expectedOrigins);
console.log('📨 Received from:', event.origin);
```

#### Issue 3: Styling Doesn't Match
**Symptoms:** Colors, fonts, or layout differ from main website

**Solution:**
```css
/* Verify these exact CSS variables are used */
:root {
  --strive-background: hsl(222, 84%, 4.9%);    /* Dark blue background */
  --strive-primary: hsl(18, 100%, 60%);        /* Orange #FF9966 */
  --strive-foreground: hsl(210, 40%, 98%);     /* Near white text */
}

/* Check font loading */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

/* Verify font application */
body {
  font-family: 'Inter', sans-serif; /* Must match exactly */
}
```

#### Issue 4: Performance Issues
**Symptoms:** Slow loading, high memory usage

**Optimization Steps:**
```javascript
// 1. Implement lazy loading
iframe.loading = 'lazy';

// 2. Optimize bundle size
// Remove unnecessary dependencies
// Use production builds
// Enable gzip compression

// 3. Monitor performance
performance.mark('chatbot-start');
// ... your code ...
performance.mark('chatbot-end');
performance.measure('chatbot-init', 'chatbot-start', 'chatbot-end');
```

#### Issue 5: Mobile Responsiveness Problems
**Symptoms:** Layout breaks on mobile devices

**Solution:**
```css
/* Ensure viewport meta tag in HTML */
<meta name="viewport" content="width=device-width, initial-scale=1.0">

/* Mobile-first responsive design */
.chat-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Widget mode mobile handling */
@media (max-width: 480px) {
  .widget-mode {
    max-width: 100vw;
    width: 100vw;
    height: 100vh;
  }
}
```

---

## Performance Requirements & Expectations

### Loading Performance Targets
- **Initial iframe load**: < 2 seconds
- **First message display**: < 1 second
- **Message response time**: < 500ms average
- **Memory usage**: < 50MB after 1 hour of usage

### User Experience Standards
- **Smooth scrolling**: 60fps during message scrolling
- **Responsive input**: < 100ms input lag
- **Error recovery**: < 5 seconds for retry attempts
- **Mobile performance**: Same targets on mobile devices

### Monitoring & Analytics
```javascript
// Implement performance tracking
const performance = {
  loadStart: Date.now(),

  trackEvent(event, data) {
    // Send to parent for analytics
    window.striveComm.sendToParent('analytics', {
      event,
      data,
      timestamp: Date.now(),
      loadTime: Date.now() - this.loadStart
    });
  }
};

// Track key metrics
performance.trackEvent('chatbot_loaded');
performance.trackEvent('first_message_sent');
performance.trackEvent('session_duration', { duration: sessionTime });
```

---

## Security Considerations

### iframe Security Configuration
```html
<!-- Recommended iframe attributes -->
<iframe
  src="https://chat.strivetech.ai/widget"
  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
  allow="microphone; camera; clipboard-write"
  referrerpolicy="strict-origin"
  title="Sai AI Assistant Chat"
  loading="lazy"
></iframe>
```

### Content Security Policy
```javascript
// CSP headers for your chatbot
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', [
    "frame-ancestors 'self' https://strivetech.ai https://*.strivetech.ai",
    "script-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com"
  ].join('; '));
  next();
});
```

### Data Privacy & Compliance
- **User Data**: Implement proper data handling for chat conversations
- **Session Management**: Secure session storage and cleanup
- **Logging**: Avoid logging sensitive user information
- **GDPR Compliance**: Implement data deletion and export capabilities

---

## Success Metrics & KPIs

### Technical Metrics
- **Uptime**: > 99.9% availability
- **Load Time**: < 2 seconds average
- **Error Rate**: < 0.1% of user interactions
- **Response Time**: < 500ms for chatbot responses

### User Experience Metrics
- **Engagement Rate**: % of users who send a message
- **Session Duration**: Average time spent chatting
- **Problem Resolution**: % of issues resolved by chatbot
- **Satisfaction Score**: User feedback ratings

### Business Impact Metrics
- **Support Deflection**: Reduction in human support tickets
- **Lead Generation**: Qualified leads from chat interactions
- **User Retention**: Impact on overall site engagement
- **Cost Savings**: Support cost reduction metrics

---

## Conclusion

This comprehensive guide provides everything needed to integrate your Sai AI Chatbot with the Strive Tech website while maintaining perfect visual consistency and optimal performance. The iframe-based approach ensures zero impact on the main website while providing a seamless user experience.

### Key Success Factors:
1. **Exact Color Matching**: Use the provided HSL values precisely
2. **Font Consistency**: Inter font for all text elements
3. **Secure Communication**: Implement all PostMessage handlers
4. **Error Resilience**: Handle all failure modes gracefully
5. **Performance Focus**: Meet all loading time requirements
6. **Mobile Optimization**: Ensure responsive design works perfectly

### Next Steps:
1. Deploy chatbot to chosen subdomain (chat.strivetech.ai recommended)
2. Implement required endpoints (/widget and /full)
3. Configure CORS for production domains
4. Test integration thoroughly across all devices/browsers
5. Monitor performance and user engagement metrics

The current Strive Tech website is already configured and ready for your chatbot integration. Once deployed with these specifications, Sai will provide seamless 24/7 support that perfectly matches the website's professional design and user experience standards.