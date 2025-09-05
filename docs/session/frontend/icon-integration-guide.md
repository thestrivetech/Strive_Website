# Icon Integration Guide - Session 2 Frontend Documentation

## Lucide React Installation & Setup

### Installation
```bash
# Using pnpm (recommended for this project)
pnpm install lucide-react

# Alternative package managers
npm install lucide-react
yarn add lucide-react
```

### Basic Usage
```tsx
import { Camera } from 'lucide-react';

const App = () => {
  return <Camera color="red" size={48} />;
};
```

## Icon Component Props

### Available Props
```tsx
// All Lucide React icons support these props:
interface IconProps {
  size?: number;           // Default: 24 (pixels)
  color?: string;          // Default: currentColor
  strokeWidth?: number;    // Default: 2
  absoluteStrokeWidth?: boolean; // Default: false
}

// Usage examples
<Camera size={32} color="#3e9392" strokeWidth={1.5} />
<Search size={20} absoluteStrokeWidth={true} />
<Menu className="h-6 w-6 text-blue-500" /> // Using Tailwind classes
```

## Common Icon Patterns

### Navigation Icons
```tsx
import { 
  Menu, 
  X, 
  Home, 
  User, 
  Settings, 
  Search,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

export function NavigationIcons() {
  return (
    <nav className="flex items-center gap-4">
      <button className="p-2 hover:bg-gray-100 rounded-md">
        <Menu className="h-5 w-5" />
      </button>
      
      <div className="flex items-center gap-6">
        <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
          <Home className="h-4 w-4" />
          <span>Home</span>
        </a>
        
        <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
          <User className="h-4 w-4" />
          <span>Profile</span>
        </a>
        
        <div className="relative group">
          <button className="flex items-center gap-1 text-gray-700 hover:text-gray-900">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
            <ChevronDown className="h-3 w-3" />
          </button>
        </div>
      </div>
      
      <button className="p-2 hover:bg-gray-100 rounded-md ml-auto">
        <Search className="h-5 w-5" />
      </button>
    </nav>
  );
}
```

### Button Icons
```tsx
import { 
  Download, 
  Share, 
  Heart, 
  Plus,
  Edit,
  Trash2,
  Save,
  Upload
} from 'lucide-react';

export function ButtonWithIcons() {
  return (
    <div className="flex flex-wrap gap-2">
      {/* Icon before text */}
      <Button>
        <Download className="h-4 w-4" />
        Download
      </Button>
      
      {/* Icon after text */}
      <Button variant="outline">
        Upload
        <Upload className="h-4 w-4" />
      </Button>
      
      {/* Icon only buttons */}
      <Button variant="ghost" size="icon">
        <Heart className="h-4 w-4" />
      </Button>
      
      <Button variant="ghost" size="icon">
        <Share className="h-4 w-4" />
      </Button>
      
      {/* Floating action button */}
      <Button 
        size="icon"
        className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-lg"
      >
        <Plus className="h-5 w-5" />
      </Button>
    </div>
  );
}
```

### Form Icons
```tsx
import { 
  Eye, 
  EyeOff, 
  Search, 
  Mail,
  Lock,
  User,
  Calendar,
  Clock
} from 'lucide-react';

export function FormWithIcons() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className="space-y-4">
      {/* Search input with icon */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input 
          className="pl-9" 
          placeholder="Search..." 
        />
      </div>
      
      {/* Email input with icon */}
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input 
          type="email"
          className="pl-9" 
          placeholder="Enter your email" 
        />
      </div>
      
      {/* Password input with toggle visibility */}
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input 
          type={showPassword ? "text" : "password"}
          className="pl-9 pr-9" 
          placeholder="Enter password" 
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
      
      {/* Date/time inputs */}
      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input 
            type="date"
            className="pl-9" 
          />
        </div>
        
        <div className="relative">
          <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input 
            type="time"
            className="pl-9" 
          />
        </div>
      </div>
    </form>
  );
}
```

## Icon Sizing & Positioning

### Responsive Icon Sizes
```tsx
import { Star } from 'lucide-react';

export function ResponsiveIcons() {
  return (
    <div className="space-y-4">
      {/* Using size prop */}
      <div className="flex items-center gap-2">
        <Star size={16} /> {/* Small - 16px */}
        <Star size={20} /> {/* Medium - 20px */}
        <Star size={24} /> {/* Default - 24px */}
        <Star size={32} /> {/* Large - 32px */}
      </div>
      
      {/* Using Tailwind classes */}
      <div className="flex items-center gap-2">
        <Star className="h-3 w-3" />   {/* 12px */}
        <Star className="h-4 w-4" />   {/* 16px */}
        <Star className="h-5 w-5" />   {/* 20px */}
        <Star className="h-6 w-6" />   {/* 24px */}
        <Star className="h-8 w-8" />   {/* 32px */}
        <Star className="h-12 w-12" /> {/* 48px */}
      </div>
      
      {/* Responsive sizing */}
      <div className="flex items-center gap-2">
        <Star className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
        <span className="text-sm sm:text-base lg:text-lg">Responsive icon and text</span>
      </div>
    </div>
  );
}
```

### Icon Alignment & Positioning
```tsx
import { Info, AlertTriangle, CheckCircle } from 'lucide-react';

export function IconAlignment() {
  return (
    <div className="space-y-4">
      {/* Vertically centered with text */}
      <div className="flex items-center gap-2">
        <Info className="h-4 w-4 text-blue-500" />
        <span>Information message</span>
      </div>
      
      {/* Top aligned for multi-line text */}
      <div className="flex gap-2">
        <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
        <div>
          <p>Warning message that might span</p>
          <p>multiple lines of text</p>
        </div>
      </div>
      
      {/* Absolutely positioned */}
      <div className="relative p-4 border rounded-lg">
        <CheckCircle className="absolute top-2 right-2 h-5 w-5 text-green-500" />
        <h3>Success Card</h3>
        <p>Your action was completed successfully.</p>
      </div>
      
      {/* Floating icons */}
      <div className="relative">
        <img src="/placeholder.jpg" alt="Profile" className="w-16 h-16 rounded-full" />
        <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
          <CheckCircle className="h-3 w-3 text-white" />
        </div>
      </div>
    </div>
  );
}
```

## Custom SVG Icon Components

### Creating Reusable Icon Components
```tsx
// Custom icon wrapper component
interface CustomIconProps {
  icon: React.ElementType;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
  className?: string;
}

export function CustomIcon({ 
  icon: Icon, 
  size = 'md', 
  color = 'primary', 
  className 
}: CustomIconProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
    xl: 'h-8 w-8'
  };

  const colorClasses = {
    primary: 'text-blue-600',
    secondary: 'text-gray-600',
    success: 'text-green-600',
    danger: 'text-red-600',
    warning: 'text-yellow-600'
  };

  return (
    <Icon 
      className={cn(
        sizeClasses[size],
        colorClasses[color],
        className
      )} 
    />
  );
}

// Usage
import { Heart, Star, Bookmark } from 'lucide-react';

export function CustomIconExample() {
  return (
    <div className="flex gap-2">
      <CustomIcon icon={Heart} size="lg" color="danger" />
      <CustomIcon icon={Star} size="md" color="warning" />
      <CustomIcon icon={Bookmark} size="sm" color="primary" />
    </div>
  );
}
```

### Custom SVG Icons
```tsx
// For icons not available in Lucide, create custom SVG components
export function CustomSVGIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2L2 7v10c0 5.55 3.84 10 10 10s10-4.45 10-10V7L12 2z" />
      <path d="M12 22s8-4 8-10V7l-8-5-8 5v5c0 6 8 10 8 10z" />
    </svg>
  );
}

// Usage with consistent styling
export function CustomSVGExample() {
  return (
    <div className="flex gap-2">
      <CustomSVGIcon className="h-5 w-5 text-blue-600" />
      <CustomSVGIcon className="h-6 w-6 text-green-600" />
    </div>
  );
}
```

## Icon States & Animations

### Interactive Icon States
```tsx
import { Heart, Star, Bookmark } from 'lucide-react';

export function InteractiveIcons() {
  const [liked, setLiked] = useState(false);
  const [starred, setStarred] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <div className="flex gap-4">
      {/* Like button with state */}
      <button
        onClick={() => setLiked(!liked)}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
      >
        <Heart 
          className={cn(
            "h-5 w-5 transition-colors",
            liked ? "text-red-500 fill-red-500" : "text-gray-400 hover:text-red-400"
          )} 
        />
      </button>
      
      {/* Star with animation */}
      <button
        onClick={() => setStarred(!starred)}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
      >
        <Star 
          className={cn(
            "h-5 w-5 transition-all duration-200",
            starred 
              ? "text-yellow-500 fill-yellow-500 scale-110" 
              : "text-gray-400 hover:text-yellow-400"
          )} 
        />
      </button>
      
      {/* Bookmark with slide effect */}
      <button
        onClick={() => setBookmarked(!bookmarked)}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
      >
        <Bookmark 
          className={cn(
            "h-5 w-5 transition-all duration-200",
            bookmarked 
              ? "text-blue-500 fill-blue-500 transform rotate-12" 
              : "text-gray-400 hover:text-blue-400"
          )} 
        />
      </button>
    </div>
  );
}
```

### Loading & Animated Icons
```tsx
import { Loader2, RotateCw, RefreshCw } from 'lucide-react';

export function LoadingIcons() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="space-y-4">
      {/* Spinner icons */}
      <div className="flex gap-4">
        <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
        <RotateCw className="h-6 w-6 animate-spin text-green-500" />
        <RefreshCw className="h-6 w-6 animate-spin text-purple-500" />
      </div>
      
      {/* Loading button */}
      <Button 
        onClick={() => {
          setLoading(true);
          setTimeout(() => setLoading(false), 2000);
        }}
        disabled={loading}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {loading ? "Processing..." : "Start Process"}
      </Button>
      
      {/* Pulse effect */}
      <div className="flex gap-4">
        <div className="relative">
          <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
          <div className="absolute inset-0 h-3 w-3 bg-green-500 rounded-full animate-ping"></div>
        </div>
        <span>Online status</span>
      </div>
    </div>
  );
}
```

## Dynamic Icon Loading

### Icon by Name
```tsx
import { icons, LucideIcon } from 'lucide-react';

interface DynamicIconProps {
  name: keyof typeof icons;
  size?: number;
  color?: string;
  className?: string;
}

export function DynamicIcon({ name, size = 24, color, className }: DynamicIconProps) {
  const IconComponent = icons[name] as LucideIcon;

  if (!IconComponent) {
    return null; // or a fallback icon
  }

  return <IconComponent size={size} color={color} className={className} />;
}

// Usage
export function DynamicIconExample() {
  const iconNames = ['Home', 'User', 'Settings', 'Heart'] as const;

  return (
    <div className="flex gap-2">
      {iconNames.map((name) => (
        <DynamicIcon 
          key={name}
          name={name}
          size={24}
          className="text-blue-600"
        />
      ))}
    </div>
  );
}
```

### Icon Menu Component
```tsx
import { 
  Home, 
  User, 
  Settings, 
  Mail, 
  Bell,
  type LucideIcon 
} from 'lucide-react';

interface MenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
  href: string;
}

const menuItems: MenuItem[] = [
  { id: 'home', label: 'Home', icon: Home, href: '/' },
  { id: 'profile', label: 'Profile', icon: User, href: '/profile' },
  { id: 'messages', label: 'Messages', icon: Mail, href: '/messages' },
  { id: 'notifications', label: 'Notifications', icon: Bell, href: '/notifications' },
  { id: 'settings', label: 'Settings', icon: Settings, href: '/settings' },
];

export function IconMenu() {
  return (
    <nav className="flex flex-col gap-1">
      {menuItems.map((item) => {
        const IconComponent = item.icon;
        return (
          <a
            key={item.id}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            <IconComponent className="h-5 w-5 text-gray-600" />
            <span className="text-gray-700">{item.label}</span>
          </a>
        );
      })}
    </nav>
  );
}
```

## Accessibility Best Practices

### Accessible Icons
```tsx
import { Search, X, Info } from 'lucide-react';

export function AccessibleIcons() {
  return (
    <div className="space-y-4">
      {/* Decorative icons (no aria-label needed when text is present) */}
      <button className="flex items-center gap-2">
        <Search className="h-4 w-4" />
        <span>Search</span>
      </button>
      
      {/* Icon-only buttons need aria-label */}
      <button 
        aria-label="Close dialog"
        className="p-2 rounded-md hover:bg-gray-100"
      >
        <X className="h-4 w-4" />
      </button>
      
      {/* Informational icons with screen reader text */}
      <div className="flex items-start gap-2">
        <Info className="h-4 w-4 text-blue-500 mt-0.5" aria-hidden="true" />
        <div>
          <span className="sr-only">Information:</span>
          <p>This is an informational message.</p>
        </div>
      </div>
      
      {/* Using Radix UI's AccessibleIcon component */}
      <AccessibleIcon label="Next item">
        <ArrowRightIcon />
      </AccessibleIcon>
    </div>
  );
}
```

## Performance Optimization

### Tree Shaking & Bundle Size
```tsx
// ✅ Good - Only imports what you need
import { Search, Menu, User } from 'lucide-react';

// ❌ Avoid - Imports entire library
import { icons } from 'lucide-react';

// For dynamic imports, use direct imports
import Search from 'lucide-react/icons/search';
import Menu from 'lucide-react/icons/menu';

// Lazy loading for large icon sets
const DynamicIcon = lazy(() => import('./DynamicIconComponent'));
```

### Icon Sprite Generation
```tsx
// For frequently used icons, consider creating an icon sprite
export function IconSprite() {
  return (
    <svg style={{ display: 'none' }}>
      <defs>
        <symbol id="search" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </symbol>
        <symbol id="menu" viewBox="0 0 24 24">
          <line x1="3" x2="21" y1="6" y2="6"/>
          <line x1="3" x2="21" y1="12" y2="12"/>
          <line x1="3" x2="21" y1="18" y2="18"/>
        </symbol>
      </defs>
    </svg>
  );
}

// Usage
export function SpriteIcon({ id, className }: { id: string; className?: string }) {
  return (
    <svg className={className}>
      <use href={`#${id}`} />
    </svg>
  );
}
```

## Best Practices

1. **Consistent Sizing**: Use consistent icon sizes throughout the app
2. **Color Inheritance**: Use `currentColor` to inherit text color
3. **Accessibility**: Provide appropriate labels for icon-only buttons
4. **Performance**: Import only the icons you need for better bundle size
5. **Alignment**: Properly align icons with text using flexbox
6. **States**: Provide visual feedback for interactive icons
7. **Responsive**: Consider different icon sizes for different screen sizes
8. **Semantic Usage**: Use icons that clearly represent their function