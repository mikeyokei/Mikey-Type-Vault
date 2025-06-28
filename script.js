document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
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
            sizeValue.textContent = size + 'PX';
            previewText.style.fontSize = size + 'px';
        });
    }
    
    // Font entry interactions
    const fontEntries = document.querySelectorAll('.font-entry');
    fontEntries.forEach(entry => {
        entry.addEventListener('click', function() {
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
    
    // Folder tab functionality
    const folderTabs = document.querySelectorAll('.folder-tab');
    const typeSpecimen = document.querySelector('.type-specimen');
    
    folderTabs.forEach((tab, index) => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            folderTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Update specimen based on tab
            const fonts = ['otique-font', 'sooper-font', 'cheltender-font'];
            const letters = ['Aa Bb Cc', 'Dd Ee Ff', 'Gg Hh Ii'];
            
            if (typeSpecimen) {
                // Remove all font classes
                fonts.forEach(font => typeSpecimen.classList.remove(font));
                
                // Add new font class and update text
                typeSpecimen.classList.add(fonts[index]);
                typeSpecimen.textContent = letters[index];
            }
        });
    });
    
    // Form submission
    const contactForm = document.querySelector('.brutal-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation and submission feedback
            const inputs = this.querySelectorAll('input, textarea');
            let isValid = true;
            
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ff0000';
                    input.style.background = '#ffcccc';
                } else {
                    input.style.borderColor = '#000';
                    input.style.background = '#fff';
                }
            });
            
            if (isValid) {
                const submitBtn = this.querySelector('.form-submit');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'SENDING...';
                submitBtn.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    submitBtn.textContent = 'MESSAGE SENT!';
                    submitBtn.style.background = '#00ff00';
                    submitBtn.style.color = '#000';
                    
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.style.background = '#000';
                        submitBtn.style.color = '#fff';
                        submitBtn.disabled = false;
                        this.reset();
                    }, 2000);
                }, 1000);
            }
        });
    }
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) translateX(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.font-entry, .info-block, .process-step');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Navigation background and behavior on scroll
    const nav = document.querySelector('.nav');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Hide/show nav on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Terminal-style typing effect for preview text
    let typingTimer;
    if (previewText) {
        previewText.addEventListener('input', function() {
            clearTimeout(typingTimer);
            this.style.borderRight = '3px solid #00ff00';
            
            typingTimer = setTimeout(() => {
                this.style.borderRight = 'none';
            }, 1000);
        });
    }
    
    // Random glitch effect for terminal status
    const terminalStatus = document.querySelector('.terminal-status');
    if (terminalStatus) {
        setInterval(() => {
            if (Math.random() < 0.1) { // 10% chance
                const originalText = terminalStatus.textContent;
                terminalStatus.textContent = 'ERROR';
                terminalStatus.style.background = '#ff0000';
                
                setTimeout(() => {
                    terminalStatus.textContent = originalText;
                    terminalStatus.style.background = '#00ff00';
                }, 200);
            }
        }, 3000);
    }
    
    // Process step hover effects
    const processSteps = document.querySelectorAll('.process-step');
    processSteps.forEach((step, index) => {
        step.addEventListener('mouseenter', function() {
            // Add stagger effect
            setTimeout(() => {
                this.style.transform = 'scale(1.05) rotate(2deg)';
            }, index * 50);
        });
        
        step.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Add cursor trail effect
    let mouseTrail = [];
    document.addEventListener('mousemove', function(e) {
        mouseTrail.push({x: e.clientX, y: e.clientY, time: Date.now()});
        
        // Keep only recent positions
        mouseTrail = mouseTrail.filter(pos => Date.now() - pos.time < 500);
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Press 'T' to focus on type tester
        if (e.key.toLowerCase() === 't' && !e.target.matches('input, textarea')) {
            e.preventDefault();
            const typeTester = document.querySelector('.type-tester');
            if (typeTester) {
                typeTester.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => {
                    previewText.focus();
                }, 500);
            }
        }
        
        // Press 'F' to go to fonts section
        if (e.key.toLowerCase() === 'f' && !e.target.matches('input, textarea')) {
            e.preventDefault();
            const fontsSection = document.getElementById('fonts');
            if (fontsSection) {
                fontsSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});