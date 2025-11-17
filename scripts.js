// Cursor follower
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

document.addEventListener('mousemove', (e) => {
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
    
    cursorOutline.style.left = e.clientX - 20 + 'px';
    cursorOutline.style.top = e.clientY - 20 + 'px';
});

// Navigation scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe skill items
document.querySelectorAll('.skill-item').forEach(item => {
    observer.observe(item);
});

// Observe experience items
document.querySelectorAll('.experience-item').forEach(item => {
    observer.observe(item);
});

// Gallery scroll animation - ensure seamless loop
const galleryTrack = document.getElementById('galleryTrack');
if (galleryTrack) {
    const items = galleryTrack.querySelectorAll('.gallery-item');
    const itemWidth = 500 + 48; // width + gap
    
    // Clone items for seamless scroll
    items.forEach(item => {
        const clone = item.cloneNode(true);
        galleryTrack.appendChild(clone);
    });

    // Remove any gallery items whose images fail to load
    const removeBroken = (img) => {
        const item = img.closest('.gallery-item');
        if (item && item.parentElement) {
            item.parentElement.removeChild(item);
        }
    };

    const checkAndHookBrokenImages = () => {
        const imgs = galleryTrack.querySelectorAll('.gallery-item img');
        imgs.forEach((img) => {
            // If already finished loading but failed, remove immediately
            if (img.complete && typeof img.naturalWidth !== 'undefined' && img.naturalWidth === 0) {
                removeBroken(img);
                return;
            }
            // Otherwise, listen for load errors
            img.addEventListener('error', () => removeBroken(img), { once: true });
        });
    };

    checkAndHookBrokenImages();
}

// Optional: Add hover effects to interactive elements
document.querySelectorAll('.skill-item, .experience-item, .gallery-item').forEach(el => {
    el.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// (removed JS that set --underline-width; underline now expands to match title width via CSS)
