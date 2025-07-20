document.addEventListener('DOMContentLoaded', function () {
    // Mobile Sidebar Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');

    menuToggle?.addEventListener('click', function () {
        this.classList.toggle('active');
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
    });

    overlay?.addEventListener('click', function () {
        menuToggle.classList.remove('active');
        sidebar.classList.remove('active');
        this.classList.remove('active');
        document.body.style.overflow = '';
    });

    function handleSidebarVisibility() {
        if (window.innerWidth > 768) {
            sidebar.classList.add('active');
            overlay.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = '';
        } else {
            sidebar.classList.remove('active');
        }
    }

    handleSidebarVisibility();
    window.addEventListener('resize', handleSidebarVisibility);

    // Submenu toggle for all main items with submenus
    document.querySelectorAll('.has-submenu > a').forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            e.preventDefault();

            const parent = this.parentElement;
            const submenu = this.nextElementSibling;

            // Optional: Collapse all other submenus
            document.querySelectorAll('.has-submenu').forEach(item => {
                if (item !== parent) {
                    item.classList.remove('active');
                    item.querySelector('.submenu')?.classList.remove('active');
                }
            });

            // Toggle current
            parent.classList.toggle('active');
            submenu?.classList.toggle('active');

            // Animate submenu items
            if (submenu?.classList.contains('active')) {
                submenu.querySelectorAll('li').forEach((item, i) => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateX(-10px)';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, i * 40);
                });
            }
        });
    });

    // Section scroll tracking
    const sections = document.querySelectorAll('.documentation-card h2');
    const submenuLinks = document.querySelectorAll('.submenu a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        submenuLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scroll to anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                history.pushState(null, null, targetId);
            }
        });
    });

    // Scroll-based animation
    function isInViewport(el) {
        const rect = el.getBoundingClientRect();
        return rect.top <= (window.innerHeight || document.documentElement.clientHeight) && rect.bottom >= 0;
    }

    function handleScrollAnimations() {
        document.querySelectorAll('[data-animate]').forEach(el => {
            if (isInViewport(el)) {
                el.classList.add('animate-in');
            }
        });
    }

    handleScrollAnimations();
    window.addEventListener('scroll', handleScrollAnimations);

    // Feedback interaction
    const feedbackBtns = document.querySelectorAll('.feedback-btn');
    feedbackBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            feedbackBtns.forEach(b => b.style.transform = '');
            this.style.transform = 'scale(1.05)';
            console.log(`Feedback: ${this.classList.contains('helpful') ? 'Helpful' : 'Not Helpful'}`);
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        });
    });

    // Hover animations
    const buttons = document.querySelectorAll('button, .feedback-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
        });
        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
    });

    // Card hover animation
    const cards = document.querySelectorAll('.documentation-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)';
        });
    });
});
