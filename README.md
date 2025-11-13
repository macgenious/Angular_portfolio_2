# CYBERDEV Portfolio — Alejandro

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat&logo=javascript&logoColor=black)

A modern, vanilla JavaScript portfolio showcasing practical projects across Python, Java, JavaScript, hardware and AI tooling. Built to highlight problem‑solving, craftsmanship and breadth of skills with a clean, cyber‑inspired design.

**Live Preview**
- Open `index.html` directly in your browser, or serve the folder with any static server:
  - Python: `python -m http.server 8000`
  - Node: `npx serve`

**Highlights**
- Particle background rendered on a full‑screen canvas
- Custom cursor with contextual behavior
- Skills Matrix with categories and animated proficiency bars
- Project Showcase with category filters and infinite carousel
- Keyboard navigation for projects
- “Read CV” button opening `curriculum.pdf`
- Responsive layout and smooth section navigation

**Tech Stack**
- HTML5, CSS3
- JavaScript (ES6+), no frameworks or build tools

**Project Structure**
```
.
├─ index.html
├─ styles/
│  ├─ style.css
│  ├─ projects.css
│  └─ cursor.css
├─ js/
│  ├─ script.js
│  ├─ particles.js
│  ├─ cursor.js
│  ├─ projects.js
│  └─ skills.js
├─ imgs/
│  ├─ python.png, java.png, javascript.png, arduino.png, gemini.png, ...
├─ arduino/
│  ├─ index.html, main.js, style.css
├─ java/
│  ├─ index.html, main.js, style.css
├─ pokedex/
│  ├─ index.html, main.js, style.css
├─ deepseek_api/
│  ├─ index.html, main.js, style.css
└─ curriculum.pdf
```

**Featured Projects**
- Pokedex API: `pokedex/index.html` — interactive Pokédex UI consuming an API
- Java Game: `java/index.html` — simple game demo built in Java
- Arduino Car: `arduino/index.html` — hardware project with Arduino
- AI Chatbot Assistant: `deepseek_api/index.html` — conversational assistant using an AI API

**Screenshots**
![Arduino Car](imgs/arduino_car.jpg)
![Java Banner](imgs/java_banner.jpg)

**Resume**
- Read my CV: [`curriculum.pdf`](./curriculum.pdf)

**Roadmap**
- Deploy to GitHub Pages for a public live demo
- Add Contact/Reach‑out section
- Finalize loading screen assets and animations
- Add project write‑ups and code links per card

**Frontend Enhancements (Nov 2025)**
- Unified theming and accessibility across `arduino/`, `deepseek_api/`, `java/`, `pokedex`
- Moved Google Fonts from CSS `@import` to HTML with `preconnect` for faster rendering
- Added skip‑to‑content links and focus styles; improved semantic nav with `aria-label`
- Optimized backgrounds (removed missing image references), added `prefers-reduced-motion`
- Lazy‑loaded banner images with `loading="lazy"` and `decoding="async"`
- Fixed asset paths and script tag mismatches (`script.js` → `main.js`, cursor.css path)
