# Chatbot iFrame Integration Guide

## Overview

This document provides comprehensive instructions for integrating the STRIVE AI chatbot into external websites using iframes. The chatbot supports two distinct modes: **full-page** and **widget** mode, each optimized for different use cases.

## Integration Modes

### 1. Full Page Mode (`/full`)
- **URL**: `https://your-domain.com/full`
- **Use Case**: Dedicated chat pages, full-screen integrations
- **Features**: Complete interface with header, branding, service cards, call-to-action buttons

### 2. Widget Mode (`/widget`)
- **URL**: `https://your-domain.com/widget`
- **Use Case**: Small embedded chat widgets, sidebar integrations
- **Features**: Compact interface, minimal UI, optimized for small spaces
- **Dimensions**: 384px × 500px (recommended)

## Implementation Examples

### Basic iFrame Integration

```html
<!-- Full Page Mode -->
<iframe
  src="https://your-chatbot-domain.com/full"
  width="100%"
  height="600px"
  frameborder="0"
  allow="microphone; camera"
  title="STRIVE AI Assistant - Full">
</iframe>

<!-- Widget Mode -->
<iframe
  src="https://your-chatbot-domain.com/widget"
  width="384px"
  height="500px"
  frameborder="0"
  allow="microphone; camera"
  title="STRIVE AI Assistant - Widget">
</iframe>
```

### Advanced Widget Integration

```html
<!-- Fixed widget in bottom-right corner -->
<div style="
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 384px;
  height: 500px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  z-index: 1000;
">
  <iframe
    src="https://your-chatbot-domain.com/widget"
    width="100%"
    height="100%"
    frameborder="0"
    allow="microphone; camera"
    title="STRIVE AI Assistant">
  </iframe>
</div>
```

### Responsive Widget

```html
<div class="chatbot-widget">
  <iframe
    src="https://your-chatbot-domain.com/widget"
    frameborder="0"
    allow="microphone; camera"
    title="STRIVE AI Assistant">
  </iframe>
</div>

<style>
.chatbot-widget {
  width: 384px;
  height: 500px;
  max-width: 100vw;
  max-height: 100vh;
}

@media (max-width: 480px) {
  .chatbot-widget {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
  }
}
</style>
```

## Configuration

### Environment Variables
Ensure these environment variables are set for proper operation:

```bash
# Production (Vercel)
GROQ_API_KEY=your_production_api_key

# Development
VITE_GROQ_API_KEY=your_development_api_key
```

### CORS and Security Headers
The chatbot is configured with the following security settings in `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "ALLOWALL"
        },
        {
          "key": "Content-Security-Policy",
          "value": "frame-ancestors 'self' https://strivetech.ai https://www.strivetech.ai http://localhost:* http://127.0.0.1:*;"
        }
      ]
    }
  ]
}
```

**Important**: Update the `Content-Security-Policy` to include your website's domain.

## Technical Changes Made

### Files Modified

#### 1. `src/App.jsx`
**Changes**:
- Fixed mode detection initialization issue
- Removed circular dependency in useEffect
- Mode now determined directly from URL path

**Before**:
```javascript
const [mode, setMode] = useState('full');
useEffect(() => {
  // ... mode detection logic
}, [mode]); // ❌ Circular dependency
```

**After**:
```javascript
const getMode = () => {
  const urlPath = window.location.pathname;
  return urlPath.includes('/widget') ? 'widget' : 'full';
};
const mode = getMode();
useEffect(() => {
  // ... initialization logic
}, []); // ✅ No dependencies
```

#### 2. `src/components/Chat/ChatContainer.jsx`
**Changes**:
- Added proper CSS classes for widget mode
- Hidden service cards and CTAs in widget mode
- Wrapped input in container with widget-specific styling
- Added responsive padding based on mode
- Passed mode prop to ChatMessage components

**Key Updates**:
```javascript
// Service cards only shown in full mode
{messages.length === 1 && mode === 'full' && (
  <ServiceCard />
)}

// Bottom CTA hidden in widget mode
{messages.length > 1 && mode === 'full' && (
  <BottomCTA />
)}

// Mode prop passed to messages
<ChatMessage mode={mode} />
```

#### 3. `src/components/Chat/ChatMessage.jsx`
**Changes**:
- Added mode prop support
- Reduced avatar spacing in widget mode
- Smaller avatar size for widget mode
- Compact message layout

**Key Updates**:
```javascript
// Dynamic spacing based on mode
className={`flex items-start ${mode === 'widget' ? 'space-x-1' : 'md:space-x-4 space-x-2'}`}

// Smaller avatars in widget mode
<MessageSaiAvatar size={mode === 'widget' ? 60 : 80} />
```

#### 4. `src/index.css`
**Changes**:
- Complete widget mode layout overhaul
- Mobile-responsive design improvements
- Reduced spacing and padding for widget mode
- Fixed input box positioning

**Key Additions**:
```css
/* Widget Mode Styles */
.widget-mode {
  max-width: 384px;
  max-height: 500px;
  overflow: hidden;
}

.widget-mode .flex.items-start {
  gap: 0.25rem !important;
}

.widget-mode .message-bubble {
  max-width: 90%;
  font-size: 14px;
}
```

#### 5. `vercel.json`
**Configuration**:
- Route handling for `/widget` and `/full` paths
- CORS headers for iframe compatibility
- Security policies for cross-origin embedding

## Testing

### Local Testing

1. **Start Development Server**:
   ```bash
   npm run dev
   ```

2. **Test Both Modes**:
   - Full page: `http://localhost:5173/full`
   - Widget: `http://localhost:5173/widget`

3. **Test iFrame Integration**:
   - Open: `http://localhost:5173/public/test-iframe.html`
   - Verify both modes load correctly
   - Confirm input box is visible in widget mode

### Production Testing

1. **Deploy to Vercel**:
   ```bash
   npm run build
   vercel --prod
   ```

2. **Update Website Integration**:
   - Replace localhost URLs with production domain
   - Test on actual website pages
   - Verify responsive behavior

## Troubleshooting

### Common Issues

#### 1. iFrame Not Loading
- **Cause**: CORS restrictions
- **Solution**: Ensure your domain is added to `Content-Security-Policy` in `vercel.json`

#### 2. Input Box Missing in Widget
- **Cause**: CSS overflow or height constraints
- **Solution**: Ensure widget container has minimum height of 400px

#### 3. Mode Not Detected Correctly
- **Cause**: URL path issues
- **Solution**: Verify iframe src includes `/widget` or `/full` path

#### 4. Styling Issues
- **Cause**: Parent page CSS interference
- **Solution**: Use iframe sandbox or ensure proper CSS isolation

### Debugging Steps

1. **Check Console Errors**:
   ```javascript
   // Open browser console in iframe
   window.addEventListener('error', console.error);
   ```

2. **Verify Mode Detection**:
   ```javascript
   // In browser console
   console.log('Current mode:', window.location.pathname);
   ```

3. **Test PostMessage Communication**:
   ```javascript
   // Listen for iframe messages
   window.addEventListener('message', (event) => {
     console.log('Received:', event.data);
   });
   ```

## Communication API

### PostMessage Events

The chatbot can communicate with the parent window using postMessage:

```javascript
// Parent window listener
window.addEventListener('message', (event) => {
  if (event.origin !== 'https://your-chatbot-domain.com') return;

  const { type, data } = event.data;

  switch(type) {
    case 'chat_opened':
      console.log('Chat opened in mode:', data.mode);
      break;
    case 'message_sent':
      console.log('Message sent:', data.messageLength);
      break;
    case 'resize':
      // Resize widget if needed
      break;
  }
});
```

### Available Events

- `chat_opened`: Fired when chat interface loads
- `message_sent`: Fired when user sends a message
- `resize`: Fired when widget needs to resize
- `navigate`: Fired when external navigation is requested

## Performance Optimization

### Loading Optimization

1. **Lazy Loading**:
   ```html
   <iframe
     src="about:blank"
     data-src="https://your-chatbot-domain.com/widget"
     loading="lazy">
   </iframe>
   ```

2. **Preload Resources**:
   ```html
   <link rel="preload" href="https://your-chatbot-domain.com" as="document">
   ```

### Mobile Optimization

- Widget automatically adapts to mobile screens
- Font sizes adjusted for readability
- Touch-friendly interface
- iOS zoom prevention on inputs

## Security Considerations

1. **Content Security Policy**: Update CSP to include your domains
2. **HTTPS Only**: Ensure all iframe sources use HTTPS
3. **Data Privacy**: Review data handling in accordance with privacy policies
4. **API Keys**: Secure API keys are handled server-side in production

## Support

For technical support or questions about integration:

1. Check this documentation first
2. Review console errors and network requests
3. Test in isolation before integrating
4. Contact technical team with specific error messages

## Changelog

### Version 1.2.0 (Current)
- ✅ Fixed iframe loading issues
- ✅ Fixed missing input box in widget mode
- ✅ Added responsive widget design
- ✅ Improved mobile support
- ✅ Reduced avatar spacing in widget mode
- ✅ Added comprehensive CSS overrides

### Version 1.1.0
- Added widget mode support
- Implemented mode detection
- Added postMessage communication

### Version 1.0.0
- Initial iframe integration
- Full page mode only
- Basic CORS configuration


# Additional steps after update is completed (might need to see if anything else within the project needs updating with the changes listed below) #

### React Version Compatibility
**Important**: The chatbot uses **React 19.1.1**. For optimal compatibility and to avoid potential conflicts:

- **Recommended**: Upgrade your website to React 19.1.1
- **React 18 → 19 Migration**: Generally smooth with minimal breaking changes
- **Benefits**: Better performance, latest features, future-proofing

#### Quick React 19 Upgrade for Website:
```bash
npm install react@^19.1.1 react-dom@^19.1.1
npm install --save-dev @types/react@^19.1.10 @types/react-dom@^19.1.7
```