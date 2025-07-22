<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Birthday Greeting Microsite - Copilot Instructions

This is a React-based birthday greeting microsite built with:

## Tech Stack
- **React 18** with Vite for fast development
- **Tailwind CSS** for styling and responsive design
- **Framer Motion** for smooth animations and transitions
- **canvas-confetti** for confetti effects
- **JavaScript/JSX** (not TypeScript)

## Project Structure
- `src/App.jsx` - Main application component with URL parameter handling
- `src/components/MessageCard.jsx` - Main birthday message display component
- `src/components/Confetti.jsx` - Confetti animation component using canvas-confetti
- `src/components/BalloonAnimation.jsx` - Floating balloon animations
- `src/utils/urlUtils.js` - Utility functions for URL parameter handling

## Key Features
- **URL Parameters**: Supports `?name=John&msg=Happy+Birthday` for personalization
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Animations**: Framer Motion for component animations, CSS for decorative elements
- **Performance**: Optimized for fast loading and smooth animations

## Styling Guidelines
- Use Tailwind CSS classes exclusively
- Custom colors defined in tailwind.config.js under `birthday` theme
- Mobile-responsive breakpoints: sm (640px), md (768px), lg (1024px)
- Custom animations for balloons, sparkles, and floating elements

## Component Patterns
- Use functional components with hooks
- Framer Motion for entrance animations and interactive elements
- Props destructuring for clean component interfaces
- Consistent naming: PascalCase for components, camelCase for functions

## Animation Best Practices
- Stagger animations for better UX using Framer Motion variants
- Use `ease-in-out` for natural feeling animations
- Infinite animations for decorative elements
- Performance-optimized with proper cleanup in useEffect

When suggesting code changes:
1. Maintain the festive, joyful theme
2. Ensure mobile responsiveness
3. Keep animations smooth and performant
4. Follow the established component structure
5. Use the custom color palette from tailwind.config.js
