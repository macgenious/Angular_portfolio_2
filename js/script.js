// Script to handle navbar active class and other functionality

document.addEventListener('DOMContentLoaded', function() {
    // Get all sections that we want to track for the navbar
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    // Function to set active class on navbar items based on scroll position
    function setActiveNavLink() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Offset for header
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });
        
        // Remove active class from all links and add to current section link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Add event listener for scroll to update active nav link
    window.addEventListener('scroll', setActiveNavLink);
    
    // Set active link on page load
    setActiveNavLink();
    
    // Handle Read CV button click
    const readCvButton = document.querySelector('.btn-primary');
    if (readCvButton) {
        readCvButton.addEventListener('click', function() {
            window.open('curriculum.pdf', '_blank');
        });
    }
});