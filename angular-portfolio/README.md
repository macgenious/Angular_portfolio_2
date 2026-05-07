# CyberDev Portfolio - Angular Edition

A modern, cyberpunk-themed portfolio website built with Angular.js, showcasing technical skills and creative projects.

## 🚀 Features

- **Modern Framework**: Built with Angular.js and TypeScript
- **Cyberpunk Design**: Neon colors, particle animations, and futuristic aesthetics
- **Responsive Layout**: Mobile-first design with CSS Grid and Flexbox
- **Interactive Components**: 3D project carousel, skills matrix, and smooth navigation
- **Performance Optimized**: Lazy loading, change detection optimization, and asset compression
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support
- **SEO Ready**: Meta tags, structured data, and semantic HTML

## 🛠️ Technology Stack

- **Frontend Framework**: Angular.js (Latest)
- **Language**: TypeScript
- **Styling**: SCSS with CSS custom properties
- **Animations**: CSS animations and Canvas API
- **State Management**: RxJS and Angular services
- **Build Tool**: Angular CLI
- **Testing**: Jasmine and Karma

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd angular-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   ng serve
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200`

## 🎯 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── header/          # Navigation component
│   │   ├── home/            # Hero section
│   │   ├── skills/          # Skills matrix
│   │   ├── projects/        # Project showcase
│   │   └── footer/          # Footer component
│   ├── services/
│   │   ├── particles.service.ts    # Particle animation
│   │   ├── projects.service.ts   # Project data management
│   │   └── skills.service.ts     # Skills data management
│   ├── models/
│   │   ├── project.interface.ts  # Project data types
│   │   └── skill.interface.ts    # Skills data types
│   └── app.component.*          # Main application component
├── assets/              # Static assets
└── environments/        # Environment configurations
```

## 🎨 Design System

### Colors
- **Primary**: `#00ffff` (Cyan)
- **Secondary**: `#ff00ff` (Magenta)
- **Background**: `#0a0a23` (Dark blue/purple)
- **Text**: `#e0e0e0` (Light gray)

### Typography
- **Primary Font**: 'Orbitron' (Headers)
- **Secondary Font**: 'Roboto' (Body text)

### Animations
- Particle background system
- 3D carousel effects
- Smooth scroll navigation
- Hover effects and transitions

## 🔧 Development

### Available Scripts

- `ng serve` - Start development server
- `ng build` - Build for production
- `ng test` - Run unit tests
- `ng e2e` - Run end-to-end tests
- `ng lint` - Run code linting

### Building for Production

```bash
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `cd angular-portfolio && npm run build`
   - Output Directory: `angular-portfolio/dist/angular-portfolio`
3. Deploy automatically on push to main branch

### Netlify

1. Connect your repository to Netlify
2. Configure build settings:
   - Build Command: `cd angular-portfolio && npm run build`
   - Publish Directory: `angular-portfolio/dist/angular-portfolio`
3. Set up redirects for SPA routing

### GitHub Pages

1. Build the project: `ng build --configuration production`
2. Deploy the `dist/angular-portfolio` folder to GitHub Pages
3. Configure base href in `index.html`

## 📱 Browser Support

- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🧪 Testing

### Unit Tests
```bash
ng test
```

### End-to-End Tests
```bash
ng e2e
```

### Code Coverage
```bash
ng test --code-coverage
```

## 🔍 Performance

- **Bundle Size**: Optimized with tree shaking
- **Loading Speed**: Lazy loading for components
- **Runtime Performance**: Change detection optimization
- **Images**: WebP format with fallbacks
- **Fonts**: System fonts with web font fallbacks

## ♿ Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Focus management
- ARIA labels and roles

## 📊 Analytics

The application is ready for analytics integration:

- Google Analytics 4
- Matomo
- Plausible Analytics
- Custom analytics solutions

## 🔄 Future Enhancements

- [ ] Progressive Web App (PWA) features
- [ ] Internationalization (i18n)
- [ ] Dark/Light theme toggle
- [ ] Advanced animations
- [ ] Contact form integration
- [ ] Blog section
- [ ] Project case studies
- [ ] Testimonials section

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Contact

Alejandro - [Your Contact Information]

Project Link: [https://github.com/yourusername/angular-portfolio](https://github.com/yourusername/angular-portfolio)

---

**Built with ❤️ and Angular.js**