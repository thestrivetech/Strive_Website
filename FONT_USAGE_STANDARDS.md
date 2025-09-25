# 🎨 Font Usage Standards - Strive Tech Website

**Version**: 1.0
**Last Updated**: 2025-09-25
**Purpose**: Prevent font inconsistencies and establish clear typography standards

---

## 🎯 Typography Hierarchy Standards

### **Hero Sections (Primary Headlines)**
```css
/* ✅ STANDARD: Hero titles should command attention */
className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-white"

/* ❌ AVOID: Small hero text lacks impact */
className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight"
```

**Rationale**: Hero titles are the first impression and should project confidence and authority for an AI solutions company.

### **Hero Subtitles**
```css
/* ✅ STANDARD: Hero subtitles should be prominent but secondary */
className="text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed"

/* ❌ AVOID: Too small for hero context */
className="text-sm sm:text-base lg:text-lg xl:text-xl"
```

### **Page Headers (H1)**
```css
/* ✅ STANDARD: Page-level headers */
className="text-3xl md:text-4xl lg:text-5xl font-bold"

/* Special case: Professional brochure */
className="text-4xl md:text-5xl font-black"
```

### **Section Headers (H2)**
```css
/* ✅ STANDARD: Section headers */
className="text-2xl md:text-3xl font-bold"

/* Professional contexts */
className="text-3xl font-black text-center text-gray-900"
```

### **Subsection Headers (H3)**
```css
/* ✅ STANDARD: Subsection headers */
className="text-xl md:text-2xl font-semibold"
```

### **Component Headers (H4)**
```css
/* ✅ STANDARD: Component-level headers */
className="text-lg font-semibold"
```

---

## 📏 Font Weight Guidelines

### **Weight Scale (Lightest to Heaviest)**
1. `font-normal` (400) - Body text, descriptions
2. `font-medium` (500) - Emphasized body text, labels
3. `font-semibold` (600) - Subsection headers, important text
4. `font-bold` (700) - Main headers, primary buttons
5. `font-black` (900) - Hero titles, premium branding

### **Component-Specific Weights**

**Professional Brochure**:
- Title: `font-black` (maximum impact)
- Subtitles: `font-bold`
- Body text: `font-medium`
- Section headers: `font-black`

**Website Headers**:
- Hero title: `font-bold`
- Page headers: `font-bold`
- Section headers: `font-bold`
- Subsection headers: `font-semibold`

**UI Components**:
- Button text: `font-medium` or `font-semibold`
- Form labels: `font-medium`
- Navigation: `font-medium`
- Body text: `font-normal`

---

## 🎨 Text Contrast & Shadows

### **Text Shadows for Better Readability**
```css
/* ✅ Use for white text on gradient/image backgrounds */
style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}  // Strong shadow for titles
style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}  // Medium shadow for subtitles
style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}  // Light shadow for body text
```

### **Color Standards**
```css
/* ✅ High contrast combinations */
text-white          // White text on dark backgrounds
text-gray-900       // Dark text on light backgrounds
text-muted-foreground // Secondary text (appropriate for theme)
```

---

## 📱 Responsive Typography Patterns

### **Scaling Pattern Examples**
```css
/* ✅ HERO TITLE PATTERN: Progressive scaling for maximum impact */
text-4xl sm:text-5xl lg:text-6xl xl:text-7xl

/* ✅ PAGE HEADER PATTERN: Strong presence across devices */
text-3xl md:text-4xl lg:text-5xl

/* ✅ SECTION HEADER PATTERN: Consistent hierarchy */
text-2xl md:text-3xl

/* ✅ BODY TEXT PATTERN: Readable on all devices */
text-base md:text-lg

/* ✅ LARGE BODY PATTERN: Prominent descriptions */
text-lg sm:text-xl lg:text-2xl
```

### **Breakpoint Strategy**
- **Mobile First**: Start with readable mobile sizes
- **Tablet (md)**: Increase for better presence
- **Desktop (lg)**: Further increase for impact
- **Large Desktop (xl)**: Maximum impact for hero elements

---

## ⚠️ Common Mistakes to Avoid

### **❌ Font Size Reduction Mistakes**
```css
/* DON'T: Reducing hero impact */
text-2xl sm:text-3xl // Too small for hero titles

/* DON'T: Inconsistent scaling */
text-sm md:text-2xl // Skips too many sizes
```

### **❌ Font Weight Inconsistencies**
```css
/* DON'T: Insufficient contrast */
font-normal for headers  // Headers need font-semibold minimum

/* DON'T: Excessive weight */
font-black for body text // Reserve font-black for titles only
```

### **❌ Breaking Hierarchy**
```css
/* DON'T: Inverted hierarchy */
H2 larger than H1  // Breaks visual hierarchy
Body text bolder than headers  // Confuses importance
```

---

## 🔄 Change Management Process

### **Before Making Font Changes**
1. **Check Current Standards**: Reference this document
2. **Identify Component Type**: Hero, header, body, etc.
3. **Consider Context**: Professional brochure vs website
4. **Test Across Devices**: Ensure responsive behavior
5. **Document Changes**: Update this standards document

### **Approved Change Process**
1. **Create Branch**: `feature/typography-updates`
2. **Make Changes**: Following standards above
3. **Test Locally**: Verify on multiple screen sizes
4. **Update Documentation**: If introducing new patterns
5. **Commit with Context**: Clear commit message explaining typography changes

### **Font Change Commit Message Format**
```
font: increase hero title impact on home page

- Change from text-3xl to text-4xl for better first impression
- Maintains responsive scaling across devices
- Aligns with professional branding standards

Ref: FONT_USAGE_STANDARDS.md
```

---

## 📊 Typography Performance Guidelines

### **Loading Performance**
- **Use System Fonts First**: Fallback to web fonts
- **Limit Font Weights**: Only load necessary weights
- **Optimize Font Loading**: Use `font-display: swap`

### **Accessibility Standards**
- **Minimum Contrast**: 4.5:1 for normal text, 3:1 for large text
- **Readable Sizes**: Minimum 16px (text-base) for body text
- **Clear Hierarchy**: Consistent size/weight progression

---

## 🧪 Testing Checklist

### **Before Committing Font Changes**
- [ ] **Mobile (375px)**: Text readable, appropriate sizing
- [ ] **Tablet (768px)**: Proper scaling, no overflow
- [ ] **Desktop (1024px)**: Adequate presence, good proportions
- [ ] **Large Desktop (1440px+)**: Maximum impact achieved
- [ ] **Contrast Check**: All text meets accessibility standards
- [ ] **Hierarchy Check**: Visual importance matches content importance
- [ ] **Brand Alignment**: Professional, confident presentation

---

## 📚 Component Reference

### **Current Font Usage by Component**

**Hero Section** (`client/src/components/ui/hero-section.tsx`):
- Title: `text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold`
- Subtitle: `text-lg sm:text-xl lg:text-2xl text-muted-foreground`

**Professional Brochure** (`client/src/components/ui/professional-brochure.tsx`):
- Main title: `text-4xl md:text-5xl font-black` + text-shadow
- Tagline: `text-xl md:text-2xl font-bold` + text-shadow
- Body: `text-lg font-medium` + text-shadow
- Section headers: `text-3xl font-black text-center`

**Navigation**: Standard medium weights for readability
**Buttons**: Medium to semibold weights for clickability
**Forms**: Medium weights for labels, normal for inputs

---

## 🎯 Quick Decision Tree

**Choosing Font Sizes**:
```
Is this a hero title?
├── YES: Use text-4xl sm:text-5xl lg:text-6xl xl:text-7xl
└── NO: Is this a page header?
    ├── YES: Use text-3xl md:text-4xl lg:text-5xl
    └── NO: Is this a section header?
        ├── YES: Use text-2xl md:text-3xl
        └── NO: Use appropriate smaller sizes
```

**Choosing Font Weights**:
```
Is this branding/title text?
├── YES: Use font-black for maximum impact
└── NO: Is this a header?
    ├── YES: Use font-bold
    └── NO: Is this emphasized text?
        ├── YES: Use font-semibold or font-medium
        └── NO: Use font-normal
```

---

**Remember**: Typography is the voice of the brand. For an AI solutions company, fonts should project confidence, expertise, and innovation while maintaining excellent readability across all devices.