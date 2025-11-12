# Enhanced README for Portfolio

## What I Will Change

* Rewrite the title and elevator pitch for a professional tone

* Add tech badges and a clear feature overview

* Document the tech stack and project structure

* Provide quick start instructions to run locally

* Link to your resume (`curriculum.pdf`) and featured project pages

* Include screenshots references from `imgs/` and a roadmap section

## Notes from Audit

* Current `README.md` is minimal and has a typo (“habilities”).

* The site includes: particle background, custom cursor, skills matrix, project carousel with filters, CV button.

* `index.html` references `styles/loading.css` and `js/loading.js` which are not in the repo; I will avoid promising a loading animation until assets exist.

## Draft README (ready to apply)

```md
# CYBERDEV Portfolio — Alejandro

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat&logo=javascript&logoColor=black)

A modern, vanilla JavaScript portfolio showcasing practical projects across Python, Java, JavaScript, hardware and AI tooling. Designed with a clean visual identity and interactive elements to highlight problem‑solving, craftsmanship and breadth of skills.

## Live Preview
- Open `index.html` directly in your browser, or serve the folder using any static server:
  - Python: `python -m http.server 8000`
  - Node: `npx serve`

## Highlights
- Particle background on a full‑screen canvas
- Custom cursor with contextual behavior
- Skills Matrix with categories and animated proficiency bars
- Project Showcase with category filters and an infinite carousel
- Keyboard navigation for projects
- “Read CV” button that opens `curriculum.pdf`
- Responsive layout and smooth navigation

## Tech Stack
- HTML5, CSS3
- JavaScript (ES6+), no frameworks or build tools

## Project Structure
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
