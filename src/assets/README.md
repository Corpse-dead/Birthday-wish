# Assets Directory

This directory is for storing static assets like images, icons, or other media files that you want to import into your components.

## Suggested romantic assets you could add:

1. **Background Images**:
   - Romantic landscape photos
   - Soft texture patterns
   - Heart-shaped patterns

2. **Icons**:
   - Custom heart icons
   - Romance-themed SVGs
   - Birthday celebration icons

3. **Images**:
   - Photos of you and Tanni together
   - Romantic illustrations
   - Birthday-themed graphics

## Usage:

```jsx
import heartIcon from '../assets/heart-icon.svg'
import romanticBg from '../assets/romantic-background.jpg'

function MyComponent() {
  return (
    <div 
      style={{% raw %}{{ backgroundImage: `url(${romanticBg})` }}{% endraw %}}
      className="..."
    >
      <img src={heartIcon} alt="Heart" />
    </div>
  )
}
```
