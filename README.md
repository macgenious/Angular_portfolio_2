# CYBERDEV Portfolio — Alejandro (Angular 19)

![Angular](https://img.shields.io/badge/Angular-19.0.0-DD0031?style=flat&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat&logo=typescript&logoColor=white)

A modern, cyber-inspired portfolio migrated to **Angular 19**. Showcasing projects across Python, Java, JavaScript, hardware, and AI tooling with a clean, interactive design.

## 🚀 Features

- **Particle Background**: Interactive canvas animation
- **Custom Cursor**: Context-aware cursor behavior
- **Skills Matrix**: Categorized skills with animated proficiency bars
- **Project Showcase**: 3D infinite carousel with touch/swipe support
- **Responsive Design**: Optimized for all devices
- **Single Page Navigation**: Smooth scroll to sections

## 🛠️ Tech Stack

- **Framework**: Angular 19 (Standalone Components)
- **Styling**: CSS3 (Variables, Animations)
- **State Management**: Angular Signals
- **Build Tool**: Angular CLI

## 📂 Project Structure

The project is located in `angular-portfolio/angular-portfolio/`.

```
src/
├── app/
│   ├── core/           # Services and models
│   ├── shared/         # Reusable components (particles, cursor, nav)
│   └── features/       # Feature components (home, skills, projects)
├── assets/             # Images and PDF
└── styles/             # Global styles and animations
```

## 🏃‍♂️ Running Locally

1. Navigate to the project directory:
   ```bash
   cd angular-portfolio/angular-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   ng serve
   ```

4. Open `http://localhost:4200` in your browser.

## 📦 Building for Production

```bash
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

## 📄 Original Projects

The original project folders (`pokedex`, `java`, `arduino`, `deepseek_api`) are preserved in the root directory and linked from the portfolio.
