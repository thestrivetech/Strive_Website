# Modal & Dialog Patterns - Session 2 Frontend Documentation

## shadcn/ui Dialog Component

### Basic Dialog Structure
```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function BasicDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            Dialog description goes here. This provides context about the dialog's purpose.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Dialog content */}
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
```

### Dialog with Form Integration
```tsx
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function FormDialog() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Process form data
    console.log(formData)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
```

### Dialog with Custom Close Button
```tsx
import { DialogClose } from "@/components/ui/dialog"

export function DialogWithCustomClose() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Share Link</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue="https://ui.shadcn.com/docs/installation"
              readOnly
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
```

### Responsive Dialog/Drawer Pattern
```tsx
"use client"

import * as React from "react"
import { useMediaQuery } from "@/hooks/use-media-query"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

export function ResponsiveDialog() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit profile</DrawTitle>
          <DrawerDescription>
            Make changes to your profile here.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
```

## Alert Dialog Component

### Confirmation Dialog
```tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function ConfirmationDialog() {
  const handleDelete = () => {
    // Perform delete action
    console.log("Item deleted")
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete Item</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the item
            and remove it from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
```

## Context Menu Integration

### Dialog Triggered from Context Menu
```tsx
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

export function ContextMenuDialog() {
  return (
    <Dialog>
      <ContextMenu>
        <ContextMenuTrigger>Right click me</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Open</ContextMenuItem>
          <ContextMenuItem>Download</ContextMenuItem>
          <DialogTrigger asChild>
            <ContextMenuItem>
              <span>Delete</span>
            </ContextMenuItem>
          </DialogTrigger>
        </ContextMenuContent>
      </ContextMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure you want to permanently
            delete this file from our servers?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit">Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
```

## Custom Modal Hook

### useModal Hook
```tsx
import { useState } from 'react'

export function useModal(initialOpen = false) {
  const [isOpen, setIsOpen] = useState(initialOpen)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  const toggle = () => setIsOpen(prev => !prev)

  return {
    isOpen,
    open,
    close,
    toggle,
    setIsOpen
  }
}

// Usage
function MyComponent() {
  const modal = useModal()

  return (
    <>
      <Button onClick={modal.open}>Open Modal</Button>
      <Dialog open={modal.isOpen} onOpenChange={modal.setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modal Title</DialogTitle>
          </DialogHeader>
          <div>Modal content</div>
          <DialogFooter>
            <Button onClick={modal.close}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
```

## Modal State Management

### Complex Modal State
```tsx
interface ModalState {
  isOpen: boolean
  type: 'create' | 'edit' | 'delete' | null
  data?: any
}

export function useModalState() {
  const [state, setState] = useState<ModalState>({
    isOpen: false,
    type: null,
    data: null
  })

  const openModal = (type: ModalState['type'], data?: any) => {
    setState({ isOpen: true, type, data })
  }

  const closeModal = () => {
    setState({ isOpen: false, type: null, data: null })
  }

  return {
    ...state,
    openModal,
    closeModal
  }
}

// Usage in component
function DataTable() {
  const modal = useModalState()

  const handleEdit = (item: any) => {
    modal.openModal('edit', item)
  }

  const handleDelete = (item: any) => {
    modal.openModal('delete', item)
  }

  return (
    <>
      {/* Table content */}
      
      <Dialog open={modal.isOpen} onOpenChange={() => modal.closeModal()}>
        <DialogContent>
          {modal.type === 'edit' && (
            <EditForm data={modal.data} onClose={modal.closeModal} />
          )}
          {modal.type === 'delete' && (
            <DeleteConfirmation data={modal.data} onClose={modal.closeModal} />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
```

## Content Overlay Best Practices

### Accessible Modal
```tsx
import { useEffect } from 'react'

export function AccessibleModal({ isOpen, onClose, children }) {
  // Trap focus within modal
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg">
        {children}
      </div>
    </div>
  )
}
```

### Portal-based Modal
```tsx
import { createPortal } from 'react-dom'

export function PortalModal({ isOpen, children }) {
  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        {children}
      </div>
    </div>,
    document.body
  )
}
```

## Styling Guidelines

### Modal Overlay Classes
```css
/* Backdrop blur and overlay */
.modal-overlay {
  @apply fixed inset-0 z-50 bg-black/80 backdrop-blur-sm;
  @apply data-[state=open]:animate-in data-[state=closed]:animate-out;
  @apply data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0;
}

/* Modal content positioning */
.modal-content {
  @apply fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg;
  @apply translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background;
  @apply p-6 shadow-lg duration-200;
  @apply data-[state=open]:animate-in data-[state=closed]:animate-out;
  @apply data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0;
  @apply data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95;
  @apply data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%];
  @apply data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%];
  @apply sm:rounded-lg;
}
```

### Animation Classes
```css
/* Custom modal animations */
@keyframes modal-in {
  from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

@keyframes modal-out {
  from {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  to {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.95);
  }
}

.modal-animate-in {
  animation: modal-in 200ms ease-out;
}

.modal-animate-out {
  animation: modal-out 150ms ease-in;
}
```

## Best Practices

1. **State Management**: Use controlled components with `open` and `onOpenChange` props
2. **Accessibility**: Include proper ARIA attributes and focus management
3. **Keyboard Navigation**: Handle Escape key to close modal
4. **Body Scroll**: Prevent background scrolling when modal is open
5. **Z-Index Management**: Use consistent z-index values for layering
6. **Responsive Design**: Consider drawer pattern for mobile devices
7. **Animation**: Use smooth enter/exit animations for better UX
8. **Portal Rendering**: Render modals at document root to avoid z-index issues