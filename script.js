document.addEventListener('DOMContentLoaded', function() {
    // Navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const target = this.dataset.target;
            const section = document.getElementById(target);
            if (section) {
                section.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Type tester
    const fontSelector = document.getElementById('fontSelector');
    const sizeSlider = document.getElementById('sizeSlider');
    const sizeValue = document.getElementById('sizeValue');
    const testText = document.getElementById('testText');
    
    const fontClasses = {
        'otique': 'otique-font',
        'sooper': 'sooper-font',
        'cheltender': 'cheltender-font'
    };
    
    // Font selector
    if (fontSelector && testText) {
        fontSelector.addEventListener('change', function() {
            const selectedFont = this.value;
            
            // Remove all font classes
            Object.values(fontClasses).forEach(className => {
                testText.classList.remove(className);
            });
            
            // Add selected font class
            if (fontClasses[selectedFont]) {
                testText.classList.add(fontClasses[selectedFont]);
            }
        });
    }
    
    // Size slider
    if (sizeSlider && sizeValue && testText) {
        sizeSlider.addEventListener('input', function() {
            const size = this.value;
            sizeValue.textContent = size;
            testText.style.fontSize = size + 'px';
        });
    }
    
    // Font card interactions
    const fontCards = document.querySelectorAll('.font-card');
    fontCards.forEach(card => {
        card.addEventListener('click', function() {
            const fontType = this.dataset.font;
            
            // Update type tester
            if (fontSelector && fontType) {
                fontSelector.value = fontType;
                
                // Trigger change event
                const changeEvent = new Event('change');
                fontSelector.dispatchEvent(changeEvent);
                
                // Scroll to type tester
                const typeTester = document.getElementById('test');
                if (typeTester) {
                    typeTester.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.target.matches('input, textarea, [contenteditable]')) return;
        
        // T for type tester
        if (e.key.toLowerCase() === 't') {
            e.preventDefault();
            const typeTester = document.getElementById('test');
            if (typeTester) {
                typeTester.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => {
                    testText.focus();
                }, 500);
            }
        }
        
        // F for fonts
        if (e.key.toLowerCase() === 'f') {
            e.preventDefault();
            const fontsSection = document.getElementById('fonts');
            if (fontsSection) {
                fontsSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
    
    // Scroll animations
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
    
    // Observe font cards
    const animatedElements = document.querySelectorAll('.font-card');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(el);
    });
    
    // Navigation hide/show on scroll
    const nav = document.querySelector('.nav');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
});