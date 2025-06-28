document.addEventListener('DOMContentLoaded', function() {
    // Type tester functionality
    const fontSelector = document.getElementById('fontSelect');
    const sizeSlider = document.getElementById('sizeSlider');
    const sizeDisplay = document.getElementById('sizeDisplay');
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
    if (sizeSlider && sizeDisplay && previewText) {
        sizeSlider.addEventListener('input', function() {
            const size = this.value;
            sizeDisplay.textContent = size + 'px';
            previewText.style.fontSize = size + 'px';
        });
    }
    
    // Example sentence interactions
    const exampleSentences = document.querySelectorAll('.example-sentence');
    exampleSentences.forEach(sentence => {
        sentence.addEventListener('click', function() {
            const text = this.dataset.text;
            const fontClass = this.classList[1]; // Get the font class
            
            // Update preview text
            if (previewText && text) {
                previewText.textContent = text;
                
                // Update font selector to match
                const fontType = fontClass.replace('-font', '');
                if (fontSelector) {
                    fontSelector.value = fontType;
                    
                    // Remove all font classes and add the correct one
                    Object.values(fontClasses).forEach(className => {
                        previewText.classList.remove(className);
                    });
                    previewText.classList.add(fontClass);
                }
                
                // Scroll to preview area
                previewText.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
                
                // Focus on preview text for editing
                setTimeout(() => {
                    previewText.focus();
                }, 500);
            }
        });
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Press 'R' to reset preview text
        if (e.key.toLowerCase() === 'r' && !e.target.matches('input, textarea, [contenteditable]')) {
            e.preventDefault();
            if (previewText) {
                previewText.textContent = 'The quick brown fox jumps over the lazy dog';
                previewText.focus();
            }
        }
        
        // Press '1', '2', '3' to switch fonts
        if (['1', '2', '3'].includes(e.key) && !e.target.matches('input, textarea, [contenteditable]')) {
            e.preventDefault();
            const fontOptions = ['otique', 'sooper', 'cheltender'];
            const selectedFont = fontOptions[parseInt(e.key) - 1];
            
            if (fontSelector && selectedFont) {
                fontSelector.value = selectedFont;
                
                // Trigger change event
                const changeEvent = new Event('change');
                fontSelector.dispatchEvent(changeEvent);
            }
        }
    });
    
    // Auto-focus preview text on load
    if (previewText) {
        setTimeout(() => {
            previewText.focus();
        }, 100);
    }
    
    // Smooth scrolling for better UX
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Simple fade-in animation for content
    const animatedElements = document.querySelectorAll('.example-group, .preview-area');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
});