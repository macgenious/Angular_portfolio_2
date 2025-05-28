document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    
    // Add event listeners
    addEventListeners();
    
    // Initialize AI chatbot demo
    initChatbotDemo();
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
            this.style.boxShadow = '0 10px 20px rgba(255, 0, 255, 0.3)';
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
}

// Initialize the AI chatbot demo
function initChatbotDemo() {
    const chatContainer = document.querySelector('.chatbot-container');
    if (!chatContainer) return;
    
    const chatMessages = document.querySelector('.chat-messages');
    const userInput = document.querySelector('.user-input input');
    const sendButton = document.querySelector('.user-input button');
    
    // Sample responses for demonstration
    const botResponses = [
        "Hello! I'm your AI assistant. How can I help you today?",
        "That's an interesting question. Let me think about that...",
        "I can help you with programming, data analysis, and creative tasks.",
        "I'm trained on a diverse dataset to understand various topics.",
        "I can integrate with APIs to provide real-time information.",
        "I can process images and extract information from them.",
        "I can help you learn new programming languages and frameworks.",
        "I'm designed to maintain context throughout our conversation.",
        "I can generate code samples based on your requirements.",
        "I'm constantly learning and improving my responses."
    ];
    
    // Add initial bot message
    addBotMessage(botResponses[0]);
    
    // Handle send button click
    if (sendButton) {
        sendButton.addEventListener('click', sendMessage);
    }
    
    // Handle enter key press
    if (userInput) {
        userInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Function to send user message
    function sendMessage() {
        if (!userInput || !userInput.value.trim()) return;
        
        const message = userInput.value.trim();
        addUserMessage(message);
        userInput.value = '';
        
        // Simulate thinking
        setTimeout(() => {
            // Show typing indicator
            const typingIndicator = document.createElement('div');
            typingIndicator.className = 'message bot-message typing';
            typingIndicator.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';
            chatMessages.appendChild(typingIndicator);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // Simulate response delay
            setTimeout(() => {
                // Remove typing indicator
                chatMessages.removeChild(typingIndicator);
                
                // Add bot response
                const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
                addBotMessage(randomResponse);
            }, 1500);
        }, 500);
    }
    
    // Function to add user message
    function addUserMessage(text) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message user-message';
        messageElement.textContent = text;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Function to add bot message
    function addBotMessage(text) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message bot-message';
        messageElement.textContent = text;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
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
                // Add blinking cursor at the end
                const cursor = document.createElement('span');
                cursor.className = 'typing-cursor';
                cursor.textContent = '|';
                element.appendChild(cursor);
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

// Simulate AI model visualization
function initModelVisualization() {
    const canvas = document.getElementById('model-visualization');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Set canvas size to match display size
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    
    // Network nodes
    const nodes = [];
    const numNodes = 50;
    
    // Create nodes
    for (let i = 0; i < numNodes; i++) {
        nodes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 3 + 2,
            dx: (Math.random() - 0.5) * 2,
            dy: (Math.random() - 0.5) * 2,
            color: `rgba(${Math.random() * 100 + 155}, 0, ${Math.random() * 100 + 155}, ${Math.random() * 0.5 + 0.5})`
        });
    }
    
    // Animation function
    function animate() {
        requestAnimationFrame(animate);
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Draw connections
        ctx.lineWidth = 0.5;
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 0, 255, ${(100 - distance) / 100 * 0.5})`;
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }
        }
        
        // Update and draw nodes
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            
            // Update position
            node.x += node.dx;
            node.y += node.dy;
            
            // Bounce off edges
            if (node.x < 0 || node.x > width) node.dx *= -1;
            if (node.y < 0 || node.y > height) node.dy *= -1;
            
            // Draw node
            ctx.beginPath();
            ctx.fillStyle = node.color;
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Start animation
    animate();
}

// Call additional initialization functions
document.addEventListener('DOMContentLoaded', function() {
    initTypingAnimation();
    initParallaxEffect();
    initModelVisualization();
});