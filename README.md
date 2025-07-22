# 🎉 Birthday Greeting Microsite 🎂

A beautiful, animated React-based birthday greeting microsite that allows you to send personalized birthday wishes through custom URLs. Built with React, Vite, Tailwind CSS, and Framer Motion.

![Birthday Microsite Preview](https://via.placeholder.com/800x400/FF6B9D/FFFFFF?text=Happy+Birthday+Microsite)

## ✨ Features

- 🎈 **Personalized Messages**: Custom birthday messages via URL parameters
- 🎊 **Beautiful Animations**: Confetti, floating balloons, and smooth transitions
- 📱 **Mobile Responsive**: Optimized for all screen sizes
- 🚀 **Fast Loading**: Built with Vite for optimal performance
- 🎨 **Festive Design**: Colorful gradient backgrounds and playful animations
- 🔗 **Shareable URLs**: Easy to share personalized birthday wishes

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd birthday-greeting-microsite
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🎯 Usage

### Basic URL
```
https://your-domain.com/
```
Shows: "Happy Birthday, Friend!" with default message

### Personalized URL
```
https://your-domain.com/?name=Krrish&msg=Have+a+wonderful+day
```
Shows: "Happy Birthday, Krrish!" with custom message

### URL Parameters

| Parameter | Description | Example |
|-----------|-------------|---------|
| `name` | Recipient's name | `?name=Sarah` |
| `msg` | Custom message | `?msg=Hope+your+day+is+amazing` |

**Note**: Use `+` for spaces in URLs or encode them as `%20`

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion + canvas-confetti
- **Build Tool**: Vite
- **Deployment**: Vercel (recommended)

## 📁 Project Structure

```
birthday-greeting-microsite/
├── public/
├── src/
│   ├── components/
│   │   ├── MessageCard.jsx       # Main birthday message component
│   │   ├── Confetti.jsx          # Confetti animation component
│   │   └── BalloonAnimation.jsx  # Floating balloon animations
│   ├── utils/
│   │   └── urlUtils.js           # URL parameter utilities
│   ├── App.jsx                   # Main app component
│   ├── main.jsx                  # React entry point
│   └── index.css                 # Global styles with Tailwind
├── index.html                    # HTML template
├── tailwind.config.js            # Tailwind configuration
├── vite.config.js               # Vite configuration
└── package.json
```

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to modify the color scheme:

```javascript
colors: {
  birthday: {
    pink: '#FF6B9D',
    purple: '#C44569',
    blue: '#546DE5',
    yellow: '#FFA726',
    green: '#26C6DA'
  }
}
```

### Animations
- **Confetti**: Modify `src/components/Confetti.jsx`
- **Balloons**: Customize `src/components/BalloonAnimation.jsx`
- **Text animations**: Edit Framer Motion variants in `MessageCard.jsx`

### Messages
Default messages can be changed in `src/utils/urlUtils.js`:

```javascript
const name = urlParams.get('name') || 'Your Default Name'
const message = urlParams.get('msg') || 'Your Default Message'
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Build the project**
   ```bash
   npm run build
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Deploy to Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Drag and drop the `dist` folder** to Netlify dashboard

### Deploy to GitHub Pages

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json scripts**
   ```json
   {
     "homepage": "https://yourusername.github.io/repository-name",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🎁 Example URLs

```bash
# Basic greeting
https://your-site.com/

# Personal greeting
https://your-site.com/?name=John

# Custom message
https://your-site.com/?name=Sarah&msg=Hope+you+have+an+amazing+day

# Longer message
https://your-site.com/?name=Alex&msg=Wishing+you+joy+happiness+and+lots+of+cake
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📱 Browser Support

- ✅ Chrome 88+
- ✅ Firefox 85+
- ✅ Safari 14+
- ✅ Edge 88+

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [canvas-confetti](https://github.com/catdad/canvas-confetti) for amazing confetti effects
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Vite](https://vitejs.dev/) for lightning-fast development

---

Made with ❤️ for spreading birthday joy! 🎉

## 🐛 Troubleshooting

**Q: The confetti isn't showing**
A: Make sure canvas-confetti is properly installed: `npm install canvas-confetti`

**Q: Animations are choppy**
A: Check if hardware acceleration is enabled in your browser settings

**Q: URL parameters aren't working**
A: Ensure you're using `+` for spaces or proper URL encoding (`%20`)

**Q: Build fails**
A: Run `npm install` to ensure all dependencies are installed

For more help, [open an issue](https://github.com/yourusername/birthday-greeting-microsite/issues) on GitHub.
