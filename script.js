document.addEventListener('DOMContentLoaded', function() {
    // Get all the editable texts
    const editableTexts = document.querySelectorAll('.editable-text');
    
    // Get all the weight sliders
    const weightSliders = document.querySelectorAll('.weight-slider');
    
    // Get all weight option tabs
    const weightOptions = document.querySelectorAll('.weight-option');
    
    // Default font name sample texts
    const fontNames = {
        'otique': 'Otique Text',
        'sooper': 'Sooper Regular',
        'cheltender': 'Cheltender Regular'
    };
    
    // Font-specific size adjustments for visual height consistency
    const fontSizeAdjustments = {
        'otique': 1.2,    // Base font, no adjustment
        'sooper': 1.1,    // Larger than base to compensate for visual size
        'cheltender': 1.0  // Slightly larger than base for visual consistency
    };
    
    // Initial font sizes (to be calculated)
    const fontSizes = [];
    
    // Initialize font sizes with larger defaults and compensate for visual height
    function initializeFontSizes() {
        const viewportWidth = window.innerWidth;
        let baseFontSize;
        
        // Larger base sizes for all viewport widths
        if (viewportWidth < 480) {
            baseFontSize = 48;
        } else if (viewportWidth < 768) {
            baseFontSize = 72;
        } else {
            baseFontSize = 100;
        }
        
        // Apply font-specific size adjustments for visual consistency
        editableTexts.forEach((text, index) => {
            const fontClass = Array.from(text.classList).find(cls => 
                ['otique', 'sooper', 'cheltender'].includes(cls)
            );
            
            const adjustment = fontSizeAdjustments[fontClass] || 1.0;
            const adjustedSize = Math.round(baseFontSize * adjustment);
            
            text.style.fontSize = `${adjustedSize}px`;
            fontSizes[index] = adjustedSize;
            
            // Set slider to 60 (slightly above middle) for larger default size
            weightSliders[index].value = 60;
        });
    }
    
    // Initialize responsive sizes
    initializeFontSizes();
    
    // Handle window resize for responsive font sizes
    window.addEventListener('resize', initializeFontSizes);
    
    // Make the texts focusable and selectable without adding the focused class
    editableTexts.forEach(text => {
        // Make sure entire text is selected on click for easy replacement
        text.addEventListener('click', function() {
            // Create a range and select all text
            const range = document.createRange();
            range.selectNodeContents(this);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        });
    });
    
    // Handle slider changes
    weightSliders.forEach((slider, index) => {
        slider.addEventListener('input', function() {
            // Get base font size (based on device/viewport) - larger defaults
            let baseSize;
            const viewportWidth = window.innerWidth;
            
            if (viewportWidth < 480) {
                baseSize = 30; // Base for mobile (larger than before)
            } else if (viewportWidth < 768) {
                baseSize = 50; // Base for tablets (larger than before) 
            } else {
                baseSize = 70; // Base for desktop (larger than before)
            }
            
            // Find which font we're adjusting
            const textElement = editableTexts[index];
            const fontClass = Array.from(textElement.classList).find(cls => 
                ['otique', 'sooper', 'cheltender'].includes(cls)
            );
            
            // Apply font-specific adjustment
            const adjustment = fontSizeAdjustments[fontClass] || 1.0;
            
            // Map slider value (0-100) to font size with smoother curve and larger range
            // Value of 60 should correspond to the default sizes from initializeFontSizes
            const fontSize = Math.round((baseSize + (this.value * baseSize / 45)) * adjustment);
            
            // Update corresponding text element
            textElement.style.fontSize = `${fontSize}px`;
            
            // Store the current font size
            fontSizes[index] = fontSize;
        });
    });
    
    // Handle weight option toggles
    weightOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Find the parent section first
            const parentSection = this.closest('.typeface-section');
            
            // Toggle active class within this section only
            const siblings = parentSection.querySelectorAll('.weight-option');
            siblings.forEach(sibling => {
                sibling.classList.remove('active');
            });
            
            this.classList.add('active');
            
            // Toggle indicator
            if (this.textContent.includes('▼')) {
                this.textContent = this.textContent.replace('▼', '▽');
            } else if (this.textContent.includes('▽')) {
                this.textContent = this.textContent.replace('▽', '▼');
            }
        });
    });
});
