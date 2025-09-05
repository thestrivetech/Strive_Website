# Button Styling Guide - Session 2 Frontend Documentation

## shadcn/ui Button Component

### Base Button Structure
```tsx
import { Button, buttonVariants } from "@/components/ui/button"

// The button component supports multiple variants and sizes
export function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button>Default Button</Button>
      <Button variant="outline">Outline Button</Button>
      <Button variant="ghost">Ghost Button</Button>
      <Button variant="link">Link Button</Button>
    </div>
  )
}
```

### Button Variants
```tsx
// Available button variants from shadcn/ui
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
```

## Gradient Button Styles

### Outline Buttons with Gradients
```tsx
// Custom outline button with gradient border
export function GradientOutlineButton({ children, ...props }) {
  return (
    <Button
      variant="outline"
      className="relative border-0 bg-gradient-to-r from-blue-500 to-purple-600 p-[1px] hover:from-blue-600 hover:to-purple-700"
      {...props}
    >
      <span className="flex h-full w-full items-center justify-center rounded-md bg-background px-4 py-2 text-foreground hover:bg-accent">
        {children}
      </span>
    </Button>
  )
}
```

### Gradient Background Buttons
```tsx
// Solid gradient background buttons
export function GradientButton({ children, className, ...props }) {
  return (
    <Button
      className={cn(
        "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700",
        "text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  )
}

// Usage examples
export function GradientButtonExamples() {
  return (
    <div className="flex gap-4">
      <GradientButton>Primary Action</GradientButton>
      <GradientButton className="from-green-500 to-blue-500">
        Success Action
      </GradientButton>
      <GradientButton className="from-red-500 to-pink-500">
        Danger Action
      </GradientButton>
    </div>
  )
}
```

## Icon Button Formatting

### Icon Buttons (Removing Backgrounds)
```tsx
import { X, Search, Menu } from "lucide-react"

// Ghost variant for icon buttons (no background)
export function IconButtons() {
  return (
    <div className="flex gap-2">
      <Button variant="ghost" size="icon">
        <Search className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon">
        <Menu className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600">
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}

// Completely transparent icon buttons
export function TransparentIconButtons() {
  return (
    <div className="flex gap-2">
      <Button 
        variant="ghost" 
        size="icon"
        className="hover:bg-transparent hover:opacity-70 transition-opacity"
      >
        <Search className="h-5 w-5" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon"
        className="hover:bg-transparent hover:opacity-70 transition-opacity"
      >
        <Menu className="h-5 w-5" />
      </Button>
    </div>
  )
}
```

### Icon with Text Buttons
```tsx
import { Download, Share, Heart } from "lucide-react"

export function IconTextButtons() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline">
        <Download className="h-4 w-4" />
        Download
      </Button>
      <Button variant="ghost">
        <Share className="h-4 w-4" />
        Share
      </Button>
      <Button variant="outline" className="text-red-500 border-red-200 hover:bg-red-50">
        <Heart className="h-4 w-4" />
        Like
      </Button>
    </div>
  )
}
```

## Responsive Button Sizing

### Screen Size Adjustments
```tsx
// Responsive button sizes using Tailwind breakpoints
export function ResponsiveButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <Button 
        size="sm" 
        className="sm:size-default lg:size-lg w-full sm:w-auto"
      >
        Responsive Button
      </Button>
      <Button 
        variant="outline"
        className="h-8 px-2 text-xs sm:h-10 sm:px-4 sm:text-sm lg:h-11 lg:px-8"
      >
        Custom Responsive
      </Button>
    </div>
  )
}
```

### Mobile-First Button Design
```tsx
// Mobile-optimized buttons with larger touch targets
export function MobileOptimizedButtons() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:gap-2">
      {/* Larger buttons on mobile for better touch experience */}
      <Button 
        className="h-12 px-6 text-base sm:h-10 sm:px-4 sm:text-sm min-w-[120px]"
      >
        Primary Action
      </Button>
      <Button 
        variant="outline"
        className="h-12 px-6 text-base sm:h-10 sm:px-4 sm:text-sm min-w-[120px]"
      >
        Secondary
      </Button>
      
      {/* Icon buttons with larger touch targets on mobile */}
      <Button 
        variant="ghost" 
        size="icon"
        className="h-12 w-12 sm:h-10 sm:w-10"
      >
        <Menu className="h-5 w-5 sm:h-4 sm:w-4" />
      </Button>
    </div>
  )
}
```

## Advanced Button Styling

### Loading States
```tsx
import { Loader2 } from "lucide-react"

export function LoadingButton({ loading, children, ...props }) {
  return (
    <Button disabled={loading} {...props}>
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </Button>
  )
}

// Usage
export function LoadingButtonExample() {
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setLoading(false)
  }

  return (
    <LoadingButton loading={loading} onClick={handleClick}>
      {loading ? "Processing..." : "Submit"}
    </LoadingButton>
  )
}
```

### Floating Action Buttons
```tsx
import { Plus } from "lucide-react"

export function FloatingActionButton() {
  return (
    <Button
      size="icon"
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
    >
      <Plus className="h-6 w-6" />
    </Button>
  )
}
```

### Button Groups
```tsx
export function ButtonGroup() {
  const [selected, setSelected] = useState("left")

  return (
    <div className="flex rounded-md border border-input">
      <Button
        variant={selected === "left" ? "default" : "ghost"}
        className="rounded-none rounded-l-md border-0"
        onClick={() => setSelected("left")}
      >
        Left
      </Button>
      <Button
        variant={selected === "center" ? "default" : "ghost"}
        className="rounded-none border-0 border-x border-input"
        onClick={() => setSelected("center")}
      >
        Center
      </Button>
      <Button
        variant={selected === "right" ? "default" : "ghost"}
        className="rounded-none rounded-r-md border-0"
        onClick={() => setSelected("right")}
      >
        Right
      </Button>
    </div>
  )
}
```

## Custom Button Styles with CSS

### Using @layer components
```css
@layer components {
  .btn-primary {
    @apply inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md;
    @apply bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2;
    @apply font-semibold text-white shadow-md transition-all duration-200;
    @apply hover:from-blue-600 hover:to-purple-700 hover:shadow-lg;
    @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500;
    @apply disabled:pointer-events-none disabled:opacity-50;
  }

  .btn-secondary {
    @apply inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md;
    @apply border border-gray-300 bg-white px-4 py-2;
    @apply font-semibold text-gray-700 transition-colors duration-200;
    @apply hover:bg-gray-50 hover:border-gray-400;
    @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500;
  }

  .btn-ghost {
    @apply inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md;
    @apply px-4 py-2 font-semibold text-gray-700 transition-colors duration-200;
    @apply hover:bg-gray-100 hover:text-gray-900;
    @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500;
  }
}
```

### Button Animation Classes
```css
/* Hover effects */
.btn-hover-lift {
  @apply transition-transform duration-200 hover:scale-105;
}

.btn-hover-glow {
  @apply transition-shadow duration-200;
  box-shadow: 0 0 0 rgba(59, 130, 246, 0);
}

.btn-hover-glow:hover {
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
}

/* Ripple effect */
.btn-ripple {
  @apply relative overflow-hidden;
}

.btn-ripple::after {
  content: '';
  @apply absolute inset-0 opacity-0 bg-white rounded-md;
  transform: scale(0);
  transition: transform 0.6s, opacity 0.6s;
}

.btn-ripple:active::after {
  @apply opacity-20;
  transform: scale(2);
  transition: 0s;
}
```

## State Management for Buttons

### Button State Hook
```tsx
export function useButtonState(initialState = false) {
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(initialState)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const reset = () => {
    setLoading(false)
    setDisabled(false)
    setSuccess(false)
    setError(null)
  }

  const startLoading = () => {
    setLoading(true)
    setDisabled(true)
    setError(null)
  }

  const setSuccessState = () => {
    setLoading(false)
    setSuccess(true)
    setDisabled(false)
    // Auto reset success state after 2 seconds
    setTimeout(reset, 2000)
  }

  const setErrorState = (errorMessage: string) => {
    setLoading(false)
    setError(errorMessage)
    setDisabled(false)
  }

  return {
    loading,
    disabled,
    success,
    error,
    startLoading,
    setSuccessState,
    setErrorState,
    reset
  }
}

// Usage
export function StatefulButton() {
  const buttonState = useButtonState()

  const handleClick = async () => {
    buttonState.startLoading()
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      buttonState.setSuccessState()
    } catch (error) {
      buttonState.setErrorState("Something went wrong")
    }
  }

  return (
    <Button
      onClick={handleClick}
      disabled={buttonState.disabled}
      className={cn(
        buttonState.success && "bg-green-600 hover:bg-green-700",
        buttonState.error && "bg-red-600 hover:bg-red-700"
      )}
    >
      {buttonState.loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {buttonState.success && <Check className="h-4 w-4" />}
      {buttonState.error && <AlertCircle className="h-4 w-4" />}
      {buttonState.loading ? "Processing..." : 
       buttonState.success ? "Success!" :
       buttonState.error ? "Error" : "Click me"}
    </Button>
  )
}
```

## Tailwind CSS Button Utilities

### Common Button Classes
```html
<!-- Responsive button sizing -->
<button class="px-3 py-1 text-sm md:px-4 md:py-2 md:text-base lg:px-6 lg:py-3 lg:text-lg">
  Responsive Button
</button>

<!-- Outline button with gradient border -->
<button class="relative border-0 bg-gradient-to-r from-blue-500 to-purple-600 p-[1px] rounded-md">
  <span class="flex h-full w-full items-center justify-center rounded-md bg-white px-4 py-2 text-gray-900 hover:bg-gray-50">
    Gradient Outline
  </span>
</button>

<!-- Ghost button with hover effects -->
<button class="px-4 py-2 rounded-md transition-colors hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500">
  Ghost Button
</button>

<!-- Icon button -->
<button class="flex items-center justify-center w-10 h-10 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500">
  <svg class="w-5 h-5"><!-- icon --></svg>
</button>
```

## Best Practices

1. **Accessibility**: Always include focus states and proper ARIA labels
2. **Touch Targets**: Use minimum 44px height for mobile touch targets
3. **Loading States**: Show loading indicators for async operations
4. **Consistent Spacing**: Use consistent padding and margins
5. **Color Contrast**: Ensure sufficient contrast for text readability
6. **Icon Sizing**: Keep icons proportional to text size
7. **Hover Effects**: Use subtle hover animations for better UX
8. **Disabled States**: Provide clear visual feedback for disabled buttons