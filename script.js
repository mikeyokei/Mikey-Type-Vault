document.addEventListener('DOMContentLoaded', function() {
    // Get all the editable texts
    const editableTexts = document.querySelectorAll('.editable-text');
    
    // Get all the weight sliders
    const weightSliders = document.querySelectorAll('.weight-slider');
    
    // Get all weight option tabs
    const weightOptions = document.querySelectorAll('.weight-option');
    
    // Get all buy buttons
    const buyButtons = document.querySelectorAll('.buy-btn');
    
    // Make the texts focusable
    editableTexts.forEach(text => {
        // Focus handling
        text.addEventListener('focus', function() {
            this.classList.add('focused');
        });
        
        text.addEventListener('blur', function() {
            this.classList.remove('focused');
        });
        
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
            // Map slider value (0-100) to font size (60-180px)
            const fontSize = 60 + (this.value * 1.2);
            
            // Update corresponding text element
            const textElement = editableTexts[index];
            textElement.style.fontSize = `${fontSize}px`;
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
    
    // Add hover effect to buy buttons
    buyButtons.forEach(button => {
        button.addEventListener('mouseover', function() {
            this.style.color = '#0FA3B1';
        });
        
        button.addEventListener('mouseout', function() {
            this.style.color = '';
        });
    });
});
