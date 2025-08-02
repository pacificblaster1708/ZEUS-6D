document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navButtons = document.querySelectorAll('.nav-button');

    const observerOptions = {
        root: null, // Watch for intersection in the viewport
        rootMargin: '0px',
        threshold: 0.5 // Trigger when 50% of the section is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get the ID of the visible section
                const visibleSectionId = entry.target.id;

                // Remove 'active' class from all buttons
                navButtons.forEach(button => {
                    button.classList.remove('active');
                });

                // Add 'active' class to the button that corresponds to the visible section
                const activeButton = document.querySelector(`.nav-button[href="#${visibleSectionId}"]`);
                if (activeButton) {
                    activeButton.classList.add('active');
                }
            }
        });
    }, observerOptions);

    // Tell the observer to watch all sections
    sections.forEach(section => {
        observer.observe(section);
    });
});
