document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    
    // Add event listeners
    addEventListeners();
    
    // Initialize game demo if canvas exists
    initGameDemo();
});

function initAnimations() {
    // Animate elements with fade-in class
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Initialize code highlighting if prism.js is available
    if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
    }
}

function addEventListeners() {
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add hover effects for feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 255, 255, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Add tech badge click event to filter content (if applicable)
    const techBadges = document.querySelectorAll('.tech-badge');
    techBadges.forEach(badge => {
        badge.addEventListener('click', function() {
            const technology = this.textContent.toLowerCase();
            console.log(`Filter by technology: ${technology}`);
            // Implement filtering logic here if needed
        });
    });
    
    // Add back to top button functionality
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.style.display = 'block';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Add game control buttons functionality
    const startBtn = document.getElementById('start-game');
    const pauseBtn = document.getElementById('pause-game');
    const resetBtn = document.getElementById('reset-game');
    
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            if (window.gameDemo) {
                window.gameDemo.start();
            }
        });
    }
    
    if (pauseBtn) {
        pauseBtn.addEventListener('click', function() {
            if (window.gameDemo) {
                window.gameDemo.pause();
            }
        });
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            if (window.gameDemo) {
                window.gameDemo.reset();
            }
        });
    }
}

// Initialize a simple game demo to showcase the game engine
function initGameDemo() {
    const canvas = document.getElementById('game-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Game state
    const gameState = {
        running: false,
        entities: [],
        player: null,
        lastTime: 0,
        score: 0
    };
    
    // Entity class
    class Entity {
        constructor(x, y, width, height, color) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.color = color;
            this.velocityX = 0;
            this.velocityY = 0;
        }
        
        update(deltaTime) {
            this.x += this.velocityX * deltaTime;
            this.y += this.velocityY * deltaTime;
            
            // Keep within canvas bounds
            if (this.x < 0) this.x = 0;
            if (this.x + this.width > canvas.width) this.x = canvas.width - this.width;
            if (this.y < 0) this.y = 0;
            if (this.y + this.height > canvas.height) this.y = canvas.height - this.height;
        }
        
        render(ctx) {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        
        intersects(other) {
            return !(this.x + this.width < other.x || 
                    this.x > other.x + other.width || 
                    this.y + this.height < other.y || 
                    this.y > other.y + other.height);
        }
    }
    
    // Player class
    class Player extends Entity {
        constructor(x, y) {
            super(x, y, 30, 30, '#00ffff');
            this.speed = 200;
            this.keys = {};
            
            // Add keyboard controls
            window.addEventListener('keydown', e => {
                this.keys[e.key] = true;
            });
            
            window.addEventListener('keyup', e => {
                this.keys[e.key] = false;
            });
        }
        
        update(deltaTime) {
            // Handle movement
            this.velocityX = 0;
            this.velocityY = 0;
            
            if (this.keys['ArrowLeft'] || this.keys['a']) this.velocityX = -this.speed;
            if (this.keys['ArrowRight'] || this.keys['d']) this.velocityX = this.speed;
            if (this.keys['ArrowUp'] || this.keys['w']) this.velocityY = -this.speed;
            if (this.keys['ArrowDown'] || this.keys['s']) this.velocityY = this.speed;
            
            super.update(deltaTime);
        }
        
        render(ctx) {
            // Draw player with a glow effect
            ctx.shadowColor = '#00ffff';
            ctx.shadowBlur = 10;
            super.render(ctx);
            ctx.shadowBlur = 0;
        }
    }
    
    // Collectible class
    class Collectible extends Entity {
        constructor(x, y) {
            super(x, y, 15, 15, '#ff00ff');
            this.pulseValue = 0;
            this.pulseDirection = 1;
        }
        
        update(deltaTime) {
            // Pulse animation
            this.pulseValue += deltaTime * this.pulseDirection;
            if (this.pulseValue > 1) this.pulseDirection = -1;
            if (this.pulseValue < 0) this.pulseDirection = 1;
            
            super.update(deltaTime);
        }
        
        render(ctx) {
            // Draw with pulse effect
            ctx.shadowColor = '#ff00ff';
            ctx.shadowBlur = 5 + this.pulseValue * 5;
            super.render(ctx);
            ctx.shadowBlur = 0;
        }
    }
    
    // Initialize game
    function initGame() {
        // Create player
        gameState.player = new Player(canvas.width / 2 - 15, canvas.height / 2 - 15);
        gameState.entities.push(gameState.player);
        
        // Create collectibles
        for (let i = 0; i < 5; i++) {
            spawnCollectible();
        }
    }
    
    // Spawn a collectible at a random position
    function spawnCollectible() {
        const x = Math.random() * (canvas.width - 15);
        const y = Math.random() * (canvas.height - 15);
        gameState.entities.push(new Collectible(x, y));
    }
    
    // Game loop
    function gameLoop(timestamp) {
        if (!gameState.running) return;
        
        // Calculate delta time
        const deltaTime = (timestamp - gameState.lastTime) / 1000;
        gameState.lastTime = timestamp;
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw background
        ctx.fillStyle = 'rgba(10, 10, 35, 0.9)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Update and render entities
        for (let i = 0; i < gameState.entities.length; i++) {
            const entity = gameState.entities[i];
            entity.update(deltaTime);
            entity.render(ctx);
            
            // Check for collectible collision
            if (entity !== gameState.player && entity instanceof Collectible) {
                if (gameState.player.intersects(entity)) {
                    // Remove collectible
                    gameState.entities.splice(i, 1);
                    i--;
                    
                    // Increase score
                    gameState.score += 10;
                    
                    // Spawn a new collectible
                    spawnCollectible();
                }
            }
        }
        
        // Draw score
        ctx.fillStyle = '#00ffff';
        ctx.font = '20px Orbitron, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(`Score: ${gameState.score}`, 20, 30);
        
        // Draw controls info
        ctx.font = '14px Orbitron, sans-serif';
        ctx.fillText('Use arrow keys or WASD to move', 20, canvas.height - 20);
        
        // Continue game loop
        requestAnimationFrame(gameLoop);
    }
    
    // Game controls
    const gameDemo = {
        start: function() {
            if (!gameState.running) {
                gameState.running = true;
                gameState.lastTime = performance.now();
                requestAnimationFrame(gameLoop);
                
                // Update button states
                const startBtn = document.getElementById('start-game');
                const pauseBtn = document.getElementById('pause-game');
                if (startBtn) startBtn.disabled = true;
                if (pauseBtn) pauseBtn.disabled = false;
            }
        },
        
        pause: function() {
            gameState.running = false;
            
            // Update button states
            const startBtn = document.getElementById('start-game');
            const pauseBtn = document.getElementById('pause-game');
            if (startBtn) startBtn.disabled = false;
            if (pauseBtn) pauseBtn.disabled = true;
        },
        
        reset: function() {
            gameState.running = false;
            gameState.entities = [];
            gameState.score = 0;
            
            initGame();
            
            // Update button states
            const startBtn = document.getElementById('start-game');
            const pauseBtn = document.getElementById('pause-game');
            if (startBtn) startBtn.disabled = false;
            if (pauseBtn) pauseBtn.disabled = true;
        }
    };
    
    // Initialize the game
    initGame();
    
    // Draw initial state
    ctx.fillStyle = 'rgba(10, 10, 35, 0.9)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    gameState.entities.forEach(entity => {
        entity.render(ctx);
    });
    
    // Draw initial instructions
    ctx.fillStyle = '#00ffff';
    ctx.font = '24px Orbitron, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Java Game Engine Demo', canvas.width / 2, canvas.height / 2 - 50);
    ctx.font = '16px Orbitron, sans-serif';
    ctx.fillText('Click "Start" to begin', canvas.width / 2, canvas.height / 2);
    ctx.fillText('Use arrow keys or WASD to move', canvas.width / 2, canvas.height / 2 + 30);
    ctx.fillText('Collect the magenta squares', canvas.width / 2, canvas.height / 2 + 60);
    
    // Make game demo available globally
    window.gameDemo = gameDemo;
}

// Add a typing animation effect to elements with the 'typing-animation' class
function initTypingAnimation() {
    const typingElements = document.querySelectorAll('.typing-animation');
    
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.display = 'inline-block';
        
        let i = 0;
        const typing = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typing);
            }
        }, 50);
    });
}

// Initialize parallax effect for elements with the 'parallax' class
function initParallaxEffect() {
    window.addEventListener('scroll', function() {
        const parallaxElements = document.querySelectorAll('.parallax');
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.5;
            const yPos = -(window.pageYOffset * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Call additional initialization functions
document.addEventListener('DOMContentLoaded', function() {
    initTypingAnimation();
    initParallaxEffect();
});