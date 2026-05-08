# Design System

This system focuses on a hyper-minimalist design aesthetic, and prioritizes space and an intentional "noir" palette.

## Core Aesthetic

- **Theme**: Optimized for dark mode as default.
- **Vibe**: Quiet, confident, intentional, and high-performance.
- **Key Elements**: Centered layouts, generous letter spacing, Oklch gradients, and refined micro-interactions.

## Color Palette

Tokens are defined in `src/globals.css` via CSS custom properties consumed by Tailwind CSS v4.

### Dark mode (default)

- **Background**: `oklch(0.145 0 0)` — near-black neutral.
- **Foreground**: `oklch(0.985 0 0)` — crisp off-white.
- **Card**: `oklch(0.205 0 0)` — slightly lifted surface.
- **Muted foreground**: `oklch(0.708 0 0)` — secondary text.
- **Destructive**: `oklch(0.704 0.191 22.216)` — warm red for destructive actions.

### Light mode

- **Background**: `oklch(1 0 0)` — pure white.
- **Foreground**: `oklch(0.145 0 0)` — near-black.
- **Muted foreground**: `oklch(0.556 0 0)` — secondary text.

## Typography

- **Headings**: [Outfit](https://fonts.google.com/specimen/Outfit) (Medium to Bold, tracked slightly tight)
- **Body**: [Inter](https://fonts.google.com/specimen/Inter) (Light to Regular weight for a "designer" feel)
- **Action**: Small, underlined links or buttons to minimize visual weight.

## Spacing & Layout

- **Symmetry**: Completely centered hero layouts for maximum focus.
- **Compression**: Stripping all non-essential UI elements to keep the core message clear.
- **Margins**: Generous surrounding space to allow the content to "breathe".

## Components

- **The Underlined Action**: Instead of bulky buttons, core actions use small, underlined typography with subtle hover transitions.
- **Gradient Text**: Subtle transitions from the foreground color to the accent sky blue to add depth.
- **Input Fields**: Minimalist borders or just underlines to maintain the clean aesthetic.
