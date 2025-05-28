document.addEventListener('DOMContentLoaded', () => {

    // Custom cursor
    const cursorDot = document.querySelector('.cursor-dot');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorDot.style.opacity = '0.7';

        // If the cursor is inside the nav hide it instantly
        if (e.target.closest('header')) {
            cursorDot.style.transition = 'opacity 0s ease-in-out, transform 0s ease-in-out';
            cursorDot.style.opacity = '0';
        }
    });

    document.addEventListener('mouseout', () => {
        cursorDot.style.opacity = '0';
    });
});