document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    
    // Add event listeners
    addEventListeners();
    
    // Initialize weather dashboard demo
    initWeatherDashboard();
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
}

// Initialize the weather dashboard demo
function initWeatherDashboard() {
    const dashboardContainer = document.querySelector('.weather-dashboard');
    if (!dashboardContainer) return;
    
    // Sample weather data for demonstration
    const weatherData = {
        temperature: 23.5,
        humidity: 68,
        pressure: 1013,
        light: 856,
        rainChance: 30,
        windSpeed: 12,
        batteryLevel: 85,
        lastUpdate: new Date().toLocaleTimeString()
    };
    
    // Update dashboard values
    updateDashboardValues(weatherData);
    
    // Initialize chart if canvas exists
    initWeatherChart();
    
    // Simulate real-time updates
    setInterval(() => {
        // Simulate data changes
        weatherData.temperature = Math.round((weatherData.temperature + (Math.random() * 0.6 - 0.3)) * 10) / 10;
        weatherData.humidity = Math.round(Math.min(100, Math.max(0, weatherData.humidity + (Math.random() * 4 - 2))));
        weatherData.pressure = Math.round(weatherData.pressure + (Math.random() * 2 - 1));
        weatherData.light = Math.round(weatherData.light + (Math.random() * 50 - 25));
        weatherData.rainChance = Math.round(Math.min(100, Math.max(0, weatherData.rainChance + (Math.random() * 10 - 5))));
        weatherData.windSpeed = Math.round((weatherData.windSpeed + (Math.random() * 2 - 1)) * 10) / 10;
        weatherData.batteryLevel = Math.max(0, Math.min(100, weatherData.batteryLevel - Math.random() * 0.2));
        weatherData.lastUpdate = new Date().toLocaleTimeString();
        
        // Update dashboard
        updateDashboardValues(weatherData);
        
        // Update chart
        if (window.weatherChart) {
            // Add new data point
            window.weatherChart.data.labels.push(weatherData.lastUpdate);
            window.weatherChart.data.datasets[0].data.push(weatherData.temperature);
            
            // Remove old data point if too many
            if (window.weatherChart.data.labels.length > 10) {
                window.weatherChart.data.labels.shift();
                window.weatherChart.data.datasets[0].data.shift();
            }
            
            window.weatherChart.update();
        }
    }, 5000); // Update every 5 seconds
}

// Update dashboard values with weather data
function updateDashboardValues(data) {
    // Update temperature
    const tempElement = document.querySelector('.dashboard-card.temperature .value');
    if (tempElement) tempElement.textContent = data.temperature;
    
    // Update humidity
    const humidityElement = document.querySelector('.dashboard-card.humidity .value');
    if (humidityElement) humidityElement.textContent = data.humidity;
    
    // Update pressure
    const pressureElement = document.querySelector('.dashboard-card.pressure .value');
    if (pressureElement) pressureElement.textContent = data.pressure;
    
    // Update light level
    const lightElement = document.querySelector('.dashboard-card.light .value');
    if (lightElement) lightElement.textContent = data.light;
    
    // Update rain chance
    const rainElement = document.querySelector('.dashboard-card.rain .value');
    if (rainElement) rainElement.textContent = data.rainChance;
    
    // Update wind speed
    const windElement = document.querySelector('.dashboard-card.wind .value');
    if (windElement) windElement.textContent = data.windSpeed;
    
    // Update battery level
    const batteryElement = document.querySelector('.dashboard-card.battery .value');
    if (batteryElement) {
        batteryElement.textContent = data.batteryLevel;
        
        // Change color based on battery level
        if (data.batteryLevel < 20) {
            batteryElement.style.color = '#ff0000';
        } else if (data.batteryLevel < 50) {
            batteryElement.style.color = '#ffaa00';
        } else {
            batteryElement.style.color = '#00ff00';
        }
    }
    
    // Update last update time
    const lastUpdateElement = document.querySelector('.dashboard-status .time');
    if (lastUpdateElement) lastUpdateElement.textContent = data.lastUpdate;
}

// Initialize weather chart
function initWeatherChart() {
    const chartCanvas = document.getElementById('weather-chart');
    if (!chartCanvas) return;
    
    // Check if Chart.js is available
    if (typeof Chart === 'undefined') {
        console.log('Chart.js not available. Displaying placeholder instead.');
        return;
    }
    
    // Initial data
    const initialData = {
        labels: [new Date().toLocaleTimeString()],
        datasets: [{
            label: 'Temperature (°C)',
            data: [23.5],
            borderColor: '#00ffff',
            backgroundColor: 'rgba(0, 255, 255, 0.1)',
            borderWidth: 2,
            tension: 0.4,
            fill: true
        }]
    };
    
    // Chart configuration
    const config = {
        type: 'line',
        data: initialData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 1000
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        color: 'rgba(0, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#e0e0e0'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#e0e0e0',
                        maxRotation: 45,
                        minRotation: 45
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#e0e0e0',
                        font: {
                            family: 'Orbitron'
                        }
                    }
                }
            }
        }
    };
    
    // Create chart
    window.weatherChart = new Chart(chartCanvas, config);
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