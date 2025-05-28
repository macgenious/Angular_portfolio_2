document.addEventListener('DOMContentLoaded', () => {
    // Particle animation
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];
    const numberOfParticles = 20; // Reduced for lower density

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 5 + 1;
            this.speedX = Math.random() * 1 - 0.5; // Reduced speed
            this.speedY = Math.random() * 1 - 0.5; // Reduced speed
            this.color = `hsl(${Math.random() * 360}, 70%, 70%)`; // Neon-like colors
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.size > 0.2) {
                this.size -= 0.05;
            } else {
                // Re-initialize particle
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 5 + 1;
                this.speedX = Math.random() * 1.5 - 0.75; // Reduced speed on re-initialize
                this.speedY = Math.random() * 1.5 - 0.75; // Reduced speed on re-initialize
                this.color = `hsl(${Math.random() * 360}, 70%, 70%)`;
            }

            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particlesArray = [];
        for (let i = 0; i < numberOfParticles; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            particlesArray.push(new Particle(x, y));
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        // Connect particles with lines
        for (let i = 0; i < particlesArray.length; i++) {
            for (let j = i; j < particlesArray.length; j++) {
                const dx = particlesArray[i].x - particlesArray[j].x;
                const dy = particlesArray[i].y - particlesArray[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(${particlesArray[i].color.match(/\d+/g).join(',')}, ${1 - distance / 100})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                    ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles(); // Re-initialize particles on resize for better distribution
    });
});

// Make sure to call initParticles and animateParticles if they are not called elsewhere
// or if they are not inside a DOMContentLoaded listener that runs after these new elements are processed.
// For safety, let's assume they are called at the end of the script or within an existing DOMContentLoaded.
// If not, they should be called here or within the new DOMContentLoaded listener.

// Example: If not already called and canvas exists:
// if (typeof canvas !== 'undefined' && canvas) {
//     initParticles();
//     animateParticles();
// }