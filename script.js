document.addEventListener('DOMContentLoaded', function() {
    // Type tester functionality
    const fontSelector = document.getElementById('fontSelector');
    const sizeSlider = document.getElementById('sizeSlider');
    const sizeValue = document.getElementById('sizeValue');
    const previewText = document.getElementById('previewText');
    
    // Font class mapping
    const fontClasses = {
        'otique': 'otique-font',
        'sooper': 'sooper-font',
        'cheltender': 'cheltender-font'
    };
    
    // Update font family
    if (fontSelector) {
        fontSelector.addEventListener('change', function() {
            const selectedFont = this.value;
            
            // Remove all font classes
            Object.values(fontClasses).forEach(className => {
                previewText.classList.remove(className);
            });
            
            // Add selected font class
            if (fontClasses[selectedFont]) {
                previewText.classList.add(fontClasses[selectedFont]);
            }
        });
    }
    
    // Update font size
    if (sizeSlider && sizeValue && previewText) {
        sizeSlider.addEventListener('input', function() {
            const size = this.value;
            sizeValue.textContent = size + 'px';
            previewText.style.fontSize = size + 'px';
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Font card interactions
    const fontCards = document.querySelectorAll('.font-card');
    fontCards.forEach(card => {
        card.addEventListener('click', function() {
            const fontType = this.dataset.font;
            
            // Update type tester with clicked font
            if (fontSelector && fontType) {
                fontSelector.value = fontType;
                
                // Trigger change event to update preview
                const changeEvent = new Event('change');
                fontSelector.dispatchEvent(changeEvent);
                
                // Scroll to type tester
                const typeTester = document.querySelector('.type-tester');
                if (typeTester) {
                    typeTester.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Form submission
    const contactForm = document.querySelector('.form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation and submission feedback
            const inputs = this.querySelectorAll('input, textarea');
            let isValid = true;
            
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#dc3545';
                } else {
                    input.style.borderColor = '#e9ecef';
                }
            });
            
            if (isValid) {
                const submitBtn = this.querySelector('.form-submit');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    submitBtn.textContent = 'message sent!';
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        this.reset();
                    }, 2000);
                }, 1000);
            }
        });
    }
    
    // Folder hover effects
    const folders = document.querySelectorAll('.folder');
    folders.forEach((folder, index) => {
        folder.addEventListener('mouseenter', function() {
            // Slight stagger effect for folder animations
            setTimeout(() => {
                this.style.transform = 'rotate(0deg) translateY(-10px) scale(1.05)';
            }, index * 100);
        });
        
        folder.addEventListener('mouseleave', function() {
            const rotations = ['-5deg', '2deg', '-2deg'];
            this.style.transform = `rotate(${rotations[index]}) translateY(0) scale(1)`;
        });
    });
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.font-card, .process-step');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Navigation background on scroll
    const nav = document.querySelector('.nav');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
            nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.boxShadow = 'none';
        }
        
        // Hide/show nav on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
});