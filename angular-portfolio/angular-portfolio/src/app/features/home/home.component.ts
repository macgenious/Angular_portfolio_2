import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule],
    template: `
    <section id="home">
        <div class="hero-content">
            <p class="comment">// Hello World</p>
            <h1>Software<br>Engineer<br>Cybernetic<br>Problem<br>Solver</h1>
            <p class="tech-stack">Python | Java | Web Development | Hardware | AI Tools</p>
            <p class="description">Crafting cutting-edge solutions with a fusion of code and creativity, building tomorrow's technology with today's tools.</p>
            <div class="buttons">
                <button class="btn-primary" (click)="openCv()">Read CV &rarr;</button>
            </div>
        </div>
        <div class="hero-image">
            <div class="code-icon">&lt;/&gt;</div>
        </div>
    </section>
  `,
    styles: [`
    #home {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        min-height: calc(100vh - 80px);
        text-align: left;
        padding-top: 80px;
    }

    .hero-content {
        max-width: 600px;
    }

    .hero-content .comment {
        font-family: 'Courier New', Courier, monospace;
        color: #888;
        margin-bottom: 0.5rem;
    }

    .hero-content h1 {
        font-family: 'Orbitron', sans-serif;
        font-size: 4rem;
        line-height: 1.2;
        margin-bottom: 1rem;
        background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .hero-content .tech-stack {
        font-size: 1.1rem;
        color: var(--primary-color);
        margin-bottom: 1.5rem;
        letter-spacing: 1px;
    }

    .hero-content .description {
        margin-bottom: 2rem;
        font-size: 1rem;
    }

    .buttons button {
        padding: 0.8rem 1.5rem;
        border: none;
        border-radius: 8px;
        font-family: 'Orbitron', sans-serif;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-right: 1rem;
        position: relative;
        overflow: hidden;
    }

    .btn-primary {
        background-color: var(--primary-color);
        color: var(--background-color);
        box-shadow: var(--neon-glow-cyan);
    }

    .btn-primary:hover {
        background-color: #00dede;
        box-shadow: 0 0 10px var(--primary-color), 0 0 20px var(--primary-color), 0 0 30px var(--primary-color);
        transform: translateY(-2px);
    }

    .hero-image .code-icon {
        font-size: 10rem;
        color: var(--primary-color);
        text-shadow: var(--neon-glow-cyan);
        animation: pulseCodeIcon 3s infinite ease-in-out;
    }

    @media (max-width: 768px) {
        #home {
            flex-direction: column;
            text-align: center;
            padding-top: 100px;
            padding-bottom: 20px;
        }
        .hero-content h1 {
            font-size: 2.5rem;
        }
        .hero-image .code-icon {
            font-size: 6rem;
            margin-top: 2rem;
        }
    }
  `]
})
export class HomeComponent {
    openCv() {
        window.open('assets/curriculum.pdf', '_blank');
    }
}
