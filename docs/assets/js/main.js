document.addEventListener('DOMContentLoaded', () => {

    // --- FULLSCREEN VIDEO LOOP LOGIC ---
    const video = document.getElementById('background-video');
    if (video) {
        // Set the desired playback speed.
        video.playbackRate = 1.75;

        const playNext = () => {
            video.classList.toggle('flipped');
            video.play();
        };

        video.play();
        video.addEventListener('ended', playNext);
    }

    // --- TRANSPARENT FLOWCHART LOGIC ---
    const flowchartIframe = document.getElementById('flowchart-iframe');
    if (flowchartIframe) {
        flowchartIframe.onload = () => {
            try {
                // Access the content inside the iframe and set its background to transparent
                flowchartIframe.contentWindow.document.body.style.backgroundColor = 'transparent';
            } catch (e) {
                console.error("Could not access iframe content. Check same-origin policy.", e);
            }
        };
    }

    // --- SIDE NAVIGATION SCROLL LOGIC ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.side-nav a.nav-button');
    if (sections.length > 0 && navLinks.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.6
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const visibleSectionId = entry.target.id;
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${visibleSectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // --- MODAL LOGIC ---
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


// --- MOUSE TRAIL EFFECT (can stay outside) ---
document.addEventListener('mousemove', (e) => {
    const trail = document.createElement('span');
    trail.className = 'trail';
    document.body.appendChild(trail);

    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';

    setTimeout(() => {
        trail.remove();
    }, 800);
});
