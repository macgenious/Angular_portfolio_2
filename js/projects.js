document.addEventListener('DOMContentLoaded', () => {
    const carouselTrack = document.querySelector('.project-carousel-track');
    const projectCards = Array.from(carouselTrack.children);
    const filterButtons = document.querySelectorAll('.project-filters button');
    const noProjectsMessage = document.querySelector('.no-projects-message');
    const projectsSection = document.getElementById('projects');

    if (!carouselTrack || projectCards.length === 0) {
        if (noProjectsMessage) noProjectsMessage.style.display = 'block';
        if (carouselTrack) carouselTrack.style.display = 'none'; // Hide track if no projects
        console.warn('Carousel track or project cards not found. Projects section may not work as expected.');
        return;
    }

    let currentIndex = 0;
    let visibleCards = []; // Cards currently visible after filtering
    const cardWidth = projectCards[0].offsetWidth + parseInt(getComputedStyle(projectCards[0]).marginRight); // Width + margin
    let intervalId = null;
    const animationSpeed = 4000; // ms - slightly slower for better viewing
    let isAnimating = false; // Flag to prevent multiple animations at once
    
    // Apply initial 3D positioning to cards
    function apply3DEffects() {
        projectCards.forEach((card, index) => {
            // Calculate z-depth based on distance from center
            const zIndex = index === currentIndex ? 10 : 10 - Math.min(Math.abs(index - currentIndex), 5);
            const rotateY = (index - currentIndex) * 5; // Rotate cards based on position
            const translateZ = Math.abs(index - currentIndex) * -10; // Push cards back based on distance
            
            card.style.zIndex = zIndex;
            card.style.transform = `rotateY(${rotateY}deg) translateZ(${translateZ}px)`;
            card.style.opacity = index === currentIndex ? 1 : Math.max(0.7, 1 - Math.abs(index - currentIndex) * 0.15);
        });
    }

    // Function to set up infinite carousel animation
    function setupInfiniteCarousel() {
        // Only set up infinite carousel if we have more than one card
        if (visibleCards.length <= 1) return;
        
        // Create a stylesheet for our animation if it doesn't exist
        let styleSheet = document.querySelector('#infinite-carousel-animation');
        if (!styleSheet) {
            styleSheet = document.createElement('style');
            styleSheet.id = 'infinite-carousel-animation';
            document.head.appendChild(styleSheet);
        }
        
        // Set the keyframes for the animation
        styleSheet.textContent = `
            @keyframes infiniteCarousel {
                0% { transform: translateX(0); }
                100% { transform: translateX(-${cardWidth * visibleCards.length}px); }
            }
        `;
        
        // Remove any existing clones
        const existingClones = carouselTrack.querySelectorAll('.carousel-clone');
        existingClones.forEach(clone => clone.remove());
        
        // Clone the cards and append them to create the infinite effect
        visibleCards.forEach(card => {
            const clone = card.cloneNode(true);
            clone.classList.add('carousel-clone');
            carouselTrack.appendChild(clone);
        });
        
        // Set the width of the carousel track to accommodate all cards and clones
        carouselTrack.style.width = `${cardWidth * visibleCards.length * 2}px`;
        
        // Apply the animation
        carouselTrack.style.animation = 'infiniteCarousel 30s linear infinite';
        
        // Make sure 3D effects are applied to all cards
        apply3DEffects();
    }

    // Function to update the carousel display based on filters
    // Filter projects based on selected category
    function filterProjects(category) {
        // Reset animation flags
        isAnimating = false;
        currentIndex = 0;
        
        // Filter cards based on category
        visibleCards = [];
        projectCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            if (category === 'All' || cardCategory === category) {
                card.style.display = 'block';
                visibleCards.push(card);
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show or hide the "no projects" message
        if (visibleCards.length === 0) {
            noProjectsMessage.style.display = 'flex';
            carouselTrack.style.animation = 'none'; // Remove any infinite animation
            // Remove any cloned cards
            const existingClones = carouselTrack.querySelectorAll('.carousel-clone');
            existingClones.forEach(clone => clone.remove());
        } else {
            noProjectsMessage.style.display = 'none';
            
            // Reset carousel position
            carouselTrack.style.transform = 'translateX(0)';
            
            // Apply 3D effects to visible cards
            apply3DEffects();
            
            // Set up infinite carousel if we have more than one card
            if (visibleCards.length > 1) {
                setupInfiniteCarousel();
            } else {
                // If only one card, remove any infinite animation
                carouselTrack.style.animation = 'none';
                // Remove any cloned cards
                const existingClones = carouselTrack.querySelectorAll('.carousel-clone');
                existingClones.forEach(clone => clone.remove());
            }
        }
        
        // Update the carousel display
        updateCarousel();
    }

    // Function to update the scroll position with 3D effects
    // Update carousel display
    function updateCarousel() {
        if (visibleCards.length === 0) return;
        
        // Apply 3D effects to all cards
        apply3DEffects();
        
        // Add a subtle pulse animation to the current card
        visibleCards.forEach((card, index) => {
            if (index === currentIndex) {
                card.style.animation = 'pulse 2s ease infinite';
                card.style.zIndex = '10'; // Bring current card to front
            } else {
                card.style.animation = '';
                card.style.zIndex = '1';
            }
        });
        
        // If we have clones, also update their animations
        const clones = carouselTrack.querySelectorAll('.carousel-clone');
        clones.forEach((clone, index) => {
            if (index === currentIndex) {
                clone.style.animation = 'pulse 2s ease infinite';
                clone.style.zIndex = '10';
            } else {
                clone.style.animation = '';
                clone.style.zIndex = '1';
            }
        });
    }

    // Remove these functions as they're no longer needed with infinite carousel
    /*
    // Automatic scrolling function
    function autoScroll() {
        if (visibleCards.length <= 1) return; // Don't scroll if 0 or 1 card
        if (isAnimating) return; // Don't start a new scroll while animating
        
        currentIndex = (currentIndex + 1) % visibleCards.length;
        updateCarousel();
    }

    // Start automatic scrolling
    function startAutoScroll() {
        if (intervalId) clearInterval(intervalId);
        if (visibleCards.length > 1) { // Only scroll if there's more than one visible card
            intervalId = setInterval(autoScroll, animationSpeed);
        }
    }
    
    // Stop auto-scrolling
    function stopAutoScroll() {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }
    */
    
    // Add manual navigation with arrow keys
    document.addEventListener('keydown', (e) => {
        if (!projectsSection.classList.contains('active')) return; // Only if projects section is active
        
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            // Pause the infinite animation when using keyboard navigation
            carouselTrack.style.animationPlayState = 'paused';
            
            if (e.key === 'ArrowLeft') {
                if (isAnimating) return;
                currentIndex = (currentIndex - 1 + visibleCards.length) % visibleCards.length;
            } else {
                if (isAnimating) return;
                currentIndex = (currentIndex + 1) % visibleCards.length;
            }
            
            updateCarousel();
            
            // Resume the animation after a short delay
            setTimeout(() => {
                carouselTrack.style.animationPlayState = 'running';
            }, 1500);
        }
    });
    
    function handleSwipe() {
        if (isAnimating) return;
        const swipeThreshold = 50; // Minimum distance to register as a swipe
        const swipeDistance = touchEndX - touchStartX;
        
        if (swipeDistance > swipeThreshold) {
            // Swipe right - go to previous
            currentIndex = (currentIndex - 1 + visibleCards.length) % visibleCards.length;
            updateCarousel();
        } else if (swipeDistance < -swipeThreshold) {
            // Swipe left - go to next
            currentIndex = (currentIndex + 1) % visibleCards.length;
            updateCarousel();
        }
    }

    // Event listeners for filter buttons with enhanced animations
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
        });
        
        // Add hover effect
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px)';
            button.style.boxShadow = '0 5px 15px rgba(0, 255, 255, 0.3)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
            button.style.boxShadow = '';
        });
    });

    // Initial setup
    filterProjects('All'); // Show all projects initially

    // Pause auto-scroll on hover and add interactive effects
    if (carouselTrack) {
        carouselTrack.addEventListener('mouseenter', () => {
            // Pause the infinite animation
            carouselTrack.style.animationPlayState = 'paused';
            carouselTrack.style.cursor = 'grab';
        });

        carouselTrack.addEventListener('mouseleave', () => {
            // Resume the infinite animation
            carouselTrack.style.animationPlayState = 'running';
            carouselTrack.style.cursor = '';
        });
    }
    
    // Add click navigation for cards with links to project pages
    projectCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            if (isAnimating) return;
            currentIndex = visibleCards.indexOf(card);
            if (currentIndex !== -1) {
                updateCarousel();
                
                // Navigate to project page based on category and title
                const category = card.getAttribute('data-category');
                const title = card.querySelector('h3').textContent.trim();
                
                // Determine which project page to navigate to
                let projectPath = '';
                if (category === 'Python' && title.includes('Pokedex')) {
                    projectPath = 'pokedex/index.html';
                } else if (category === 'Java' && title.includes('Java Game')) {
                    projectPath = 'java/index.html';
                } else if (category === 'Hardware' && title.includes('Arduino')) {
                    projectPath = 'arduino/index.html';
                } else if (category === 'AI' && title.includes('AI Chatbot')) {
                    projectPath = 'deepseek_api/index.html';
                } else if (category === 'JavaScript' && title.includes('Interactive Portfolio')) {
                    projectPath = 'index.html';
                } else if (category === 'JavaScript' && title.includes('book')) {
                    projectPath = "https://llarjovecorresponsales.infinityfreeapp.com";}

                // Navigate to the project page after a short delay to show the card animation
                if (projectPath) {
                    setTimeout(() => {
                        window.location.href = projectPath;
                    }, 500);
                }
            }
        });
    });
    
    // Add touch support for mobile devices
    let touchStartX = 0;
    let touchEndX = 0;
    
    carouselTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        // Pause the infinite animation
        carouselTrack.style.animationPlayState = 'paused';
    }, { passive: true });
    
    carouselTrack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        // Resume the infinite animation
        carouselTrack.style.animationPlayState = 'running';
    }, { passive: true });

    // Recalculate on window resize (optional, but good for responsiveness)
    window.addEventListener('resize', () => {
        // Recalculate card width
        const newCardWidth = projectCards[0].offsetWidth + parseInt(getComputedStyle(projectCards[0]).marginRight);
        if (newCardWidth !== cardWidth) {
            // Update cardWidth and reposition carousel
            cardWidth = newCardWidth;
            if (visibleCards.length > 0) {
                // Re-filter to re-apply layout if needed, or just update
                filterProjects(document.querySelector('.project-filters button.active').textContent);
                apply3DEffects(); // Reapply 3D effects after resize
                
                // Update the infinite carousel animation
                if (visibleCards.length > 1) {
                    // Update the animation keyframes with new width
                    const styleSheet = document.querySelector('#infinite-carousel-animation');
                    if (styleSheet) {
                        styleSheet.textContent = `
                            @keyframes infiniteCarousel {
                                0% { transform: translateX(0); }
                                100% { transform: translateX(-${cardWidth * visibleCards.length}px); }
                            }
                        `;
                    }
                    // Update the carousel track width
                    carouselTrack.style.width = `${cardWidth * visibleCards.length * 2}px`;
                }
            }
        }
    });
    
    // Add a subtle entrance animation to the entire projects section
    projectsSection.addEventListener('transitionend', (e) => {
        if (e.propertyName === 'opacity' && projectsSection.classList.contains('active')) {
            // When the section becomes active and finishes fading in
            carouselTrack.style.animation = 'fadeIn 1s ease-out';
            filterButtons.forEach((btn, i) => {
                // Stagger the animation of the filter buttons
                setTimeout(() => {
                    btn.style.animation = 'fadeIn 0.5s ease-out';
                }, i * 100);
            });
        }
    });
});


    // Apply 3D effects to cards based on their position
    function apply3DEffects() {
        if (visibleCards.length === 0) return;
        
        visibleCards.forEach((card, index) => {
            // Calculate distance from current card (for 3D effect)
            const distance = index - currentIndex;
            const absDistance = Math.abs(distance);
            
            // Apply 3D transformations based on distance
            if (distance === 0) {
                // Current card
                card.style.transform = `translateZ(50px) rotateY(0deg) scale(1.05)`;
                card.style.opacity = '1';
                card.style.filter = 'brightness(1.1)';
            } else if (distance < 0) {
                // Cards to the left
                card.style.transform = `translateZ(${30 - absDistance * 10}px) translateX(${distance * 5}px) rotateY(${distance * 5}deg) scale(${1 - absDistance * 0.05})`;
                card.style.opacity = `${1 - absDistance * 0.2}`;
                card.style.filter = `brightness(${1 - absDistance * 0.1})`;
            } else {
                // Cards to the right
                card.style.transform = `translateZ(${30 - absDistance * 10}px) translateX(${distance * 5}px) rotateY(${distance * 5}deg) scale(${1 - absDistance * 0.05})`;
                card.style.opacity = `${1 - absDistance * 0.2}`;
                card.style.filter = `brightness(${1 - absDistance * 0.1})`;
            }
        });
        
        // Also apply effects to clones if they exist
        const clones = carouselTrack.querySelectorAll('.carousel-clone');
        clones.forEach((clone, index) => {
            const originalIndex = index % visibleCards.length;
            const distance = originalIndex - currentIndex;
            const absDistance = Math.abs(distance);
            
            // Apply same transformations as original cards
            if (distance === 0) {
                clone.style.transform = `translateZ(50px) rotateY(0deg) scale(1.05)`;
                clone.style.opacity = '1';
                clone.style.filter = 'brightness(1.1)';
            } else if (distance < 0) {
                clone.style.transform = `translateZ(${30 - absDistance * 10}px) translateX(${distance * 5}px) rotateY(${distance * 5}deg) scale(${1 - absDistance * 0.05})`;
                clone.style.opacity = `${1 - absDistance * 0.2}`;
                clone.style.filter = `brightness(${1 - absDistance * 0.1})`;
            } else {
                clone.style.transform = `translateZ(${30 - absDistance * 10}px) translateX(${distance * 5}px) rotateY(${distance * 5}deg) scale(${1 - absDistance * 0.05})`;
                clone.style.opacity = `${1 - absDistance * 0.2}`;
                clone.style.filter = `brightness(${1 - absDistance * 0.1})`;
            }
        });
    }