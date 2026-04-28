document.addEventListener("DOMContentLoaded", () => {

    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    ScrollReveal().reveal('.reveal', {
        distance: '40px',
        duration: 1200,
        easing: 'ease-in-out',
        origin: 'bottom'
    });

    ScrollReveal().reveal('.reveal-zoom', {
        scale: 0.85,
        duration: 1200,
        easing: 'ease-in-out'
    });

    ScrollReveal().reveal('.reveal-left', {
        origin: 'left',
        distance: '60px',
        duration: 1200,
        interval: 200,
        easing: 'ease-in-out'
    });

    ScrollReveal().reveal('.reveal-right', {
        origin: 'right',
        distance: '60px',
        duration: 1200,
        interval: 200,
        easing: 'ease-in-out'
    });

});

