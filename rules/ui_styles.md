---
alwaysApply: true
---

# Technology Implementation Notes

## Component Selection Guidelines

### Always use MUI for:

- **Form inputs** (TextField, Select, Autocomplete, Checkbox, Radio)
- **Buttons** (Button, IconButton, Fab)
- **Feedback components** (Snackbar, Alert, Dialog, Drawer)
- **Navigation** (Drawer, AppBar, BottomNavigation)
- **Data display** (Table, List, Card, Typography)
- **Loading states** (CircularProgress, LinearProgress, Skeleton)
- **Progress indicators** (LinearProgress for progress bars)

### Always use Tailwind for:

- **Layout structure** (flex, grid, positioning)
- **Spacing** (margins, padding)
- **Colors** (text, background, border)
- **Typography utilities**
- **Responsive breakpoints**
- **Utility classes** (shadows, borders, rounded corners)

### Use Emotion when:

- MUI component needs deep customization beyond theme
- Creating custom styled components that need CSS-in-JS
- Need to access MUI theme in styled components
- Tailwind cannot achieve the required styling

### Use Framer Motion for:

- Any component that needs smooth entrance/exit animations
- Dropdown open/close transitions (MUI Select, Autocomplete)
- Modal/Drawer slide animations (MUI Dialog, Drawer)
- Page transitions between steps
- Interactive element animations (hover, click feedback)
- Form step transitions
- Progress bar value changes
- Button hover/press animations (optional)

## Component Reusability & Wrapper Abstraction (DRY Principle)

To prevent code duplication and simplify future refactoring (e.g., if we decide to swap underlying UI libraries from MUI to another library), **always build custom wrapper components** for core interactive and feedback elements. Do not import raw MUI components directly into feature pages. Instead, import our own custom-defined wrappers.

### Key Abstractions to Build and Reuse:

1. **Custom Drawer (`/components/ui/CustomDrawer.tsx`)**
   * Built on top of MUI `Drawer`.
   * High level of customization through props (title, anchor, open state, onClose, actions).
   * Centralizes layout, transition animation, and close behaviors.
2. **Custom Modal/Dialog (`/components/ui/CustomModal.tsx`)**
   * Built on top of MUI `Dialog`.
   * Provides consistent header, body, footer, and close buttons.
3. **Custom Buttons**
   * **`CustomButton`**: Standard button with hover animations.
   * **`LoadingButton`**: Standard button that encapsulates loading states (showing a `CircularProgress` spinner and disabling interaction while loading).
   * **`ActionPromptButton` / `DeletePromptButton`**: A button that automatically displays a confirmation modal (or popover) before executing the primary callback action.
4. **Custom Snackbar/Notification (`/components/ui/CustomNotification.tsx`)**
   * Wraps MUI `Snackbar` and `Alert`.
   * Handles success, info, warning, and error states uniformly.
5. **Custom Tooltip (`/components/ui/CustomTooltip.tsx`)**
   * Wraps MUI `Tooltip`.
   * **Important**: We will use tooltips extensively throughout the app to guide the user on navigating the portal. All key actions, metrics, and complex terms should have a descriptive tooltip.

By encapsulating these elements, if we ever need to switch a drawer to a Bootstrap sidebar or a notification to a hot-toast library, we only edit the wrapper component's internal code rather than dozens of files.

## Example Component Structure

```typescript
// MUI Component with Tailwind layout + Framer Motion animation
import { Button } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';

// Styled with Emotion if needed
const StyledButton = styled(Button)(({ theme }) => ({
  // Custom MUI theme-based styling
}));

// Animated with Framer Motion
const AnimatedButton = motion(StyledButton);

// Usage with Tailwind classes for layout
<div className="flex justify-center p-4">
  <AnimatedButton
    className="bg-primary text-white"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    whileHover={{ scale: 1.05 }}
  >
    Click me
  </AnimatedButton>
</div>
```

## Component-Specific Implementation

### Form Fields

- Use MUI TextField, Select, Autocomplete for all inputs
- Use MUI FormHelperText for validation errors
- Use Tailwind for layout and spacing
- Use Framer Motion for dropdown animations

### Buttons

- Use MUI Button for all buttons
- Use MUI CircularProgress for loading spinners in buttons
- Use Tailwind for layout and spacing
- Use Framer Motion for hover/press animations (optional)

### Modals/Drawers

- Use MUI Dialog for modals
- Use MUI Drawer for sidebars and bottom sheets
- Use Tailwind for layout and spacing
- Use Framer Motion for open/close slide animations

### Progress Indicators

- Use MUI LinearProgress for progress bars
- Use MUI CircularProgress for loading spinners
- Use Tailwind for layout and spacing
- Use Framer Motion for smooth progress value transitions

### Notifications

- Use MUI Snackbar for all notifications (success, error, info)
- Use Tailwind for layout and spacing
- Use Framer Motion for snackbar entrance/exit animations
