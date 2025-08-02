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
// --- MODAL LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('about-modal');
    if (modal) {
        const openBtn = document.getElementById('open-about-modal');
        const closeBtn = modal.querySelector('.close-button');
        const modalTabs = modal.querySelector('.modal-tabs');
        const modalDisplay = modal.querySelector('.modal-display-content');

        if (openBtn) {
            openBtn.onclick = function() {
                modal.classList.add('active');
                modal.querySelector('.modal-tab-button').click();
            }
        }

        if (closeBtn) {
            closeBtn.onclick = function() {
                modal.classList.remove('active');
            }
        }

        window.addEventListener('click', function(event) {
            if (event.target == modal) {
                modal.classList.remove('active');
            }
        });

        if (modalTabs) {
            const tabButtons = modalTabs.querySelectorAll('.modal-tab-button');
            tabButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const contentId = button.dataset.contentId;
                    const newContent = document.getElementById(contentId);

                    if (modalDisplay && newContent) {
                        modalDisplay.innerHTML = newContent.innerHTML;
                    }

                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                });
            });
        }
    }
});
