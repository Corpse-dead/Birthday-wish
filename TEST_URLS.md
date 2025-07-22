# Birthday Greeting Microsite - Test URLs

## Test the application with these sample URLs:

### Basic greeting (default)
```
http://localhost:3000/
```
Shows: "Happy Birthday, Friend!" with "Happy Birthday!" message

### Personal greeting
```
http://localhost:3000/?name=Krrish
```
Shows: "Happy Birthday, Krrish!" with default message

### Custom message
```
http://localhost:3000/?name=Sarah&msg=Hope+you+have+an+amazing+day
```
Shows: "Happy Birthday, Sarah!" with custom message

### Complex example
```
http://localhost:3000/?name=Alex&msg=Wishing+you+joy+happiness+and+lots+of+cake+today
```

### URL encoding examples
- Spaces: Use `+` or `%20`
- Special characters: Use URL encoding
- Emojis: Should work directly in modern browsers

## Features to test:
1. ✅ Confetti animation on page load
2. ✅ Floating balloon animations
3. ✅ Responsive design (mobile/desktop)
4. ✅ Smooth entrance animations
5. ✅ Sparkle effects
6. ✅ URL parameter parsing

## Deployment ready!
This project is ready to deploy to:
- Vercel (recommended)
- Netlify  
- GitHub Pages
- Any static hosting service
