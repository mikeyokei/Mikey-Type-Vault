document.addEventListener("DOMContentLoaded", function() {
    // Get all UI elements
    const fontSelector = document.getElementById("font-selector");
    const fontSizeSlider = document.getElementById("font-size");
    const lineHeightSlider = document.getElementById("line-height");
    const letterSpacingSlider = document.getElementById("letter-spacing");
    const fontWeightSlider = document.getElementById("font-weight");
    const fontColorPicker = document.getElementById("font-color");
    const bgColorPicker = document.getElementById("bg-color");
    
    const sizeValue = document.getElementById("size-value");
    const lineHeightValue = document.getElementById("line-height-value");
    const letterSpacingValue = document.getElementById("letter-spacing-value");
    const weightValue = document.getElementById("weight-value");
    
    const testText = document.getElementById("test-text");
    const textAreaContainer = document.querySelector(".text-area-container");
    
    // Update the text when controls change
    function updateTextStyle() {
        testText.style.fontFamily = fontSelector.value;
        testText.style.fontSize = `${fontSizeSlider.value}px`;
        testText.style.lineHeight = lineHeightSlider.value;
        testText.style.letterSpacing = `${letterSpacingSlider.value}em`;
        testText.style.fontWeight = fontWeightSlider.value;
        testText.style.color = fontColorPicker.value;
        textAreaContainer.style.backgroundColor = bgColorPicker.value;
        
        // Update display values
        sizeValue.textContent = `${fontSizeSlider.value}px`;
        lineHeightValue.textContent = lineHeightSlider.value;
        letterSpacingValue.textContent = `${letterSpacingSlider.value}em`;
        weightValue.textContent = fontWeightSlider.value;
    }
    
    // Add event listeners to all controls
    fontSelector.addEventListener("change", updateTextStyle);
    fontSizeSlider.addEventListener("input", updateTextStyle);
    lineHeightSlider.addEventListener("input", updateTextStyle);
    letterSpacingSlider.addEventListener("input", updateTextStyle);
    fontWeightSlider.addEventListener("input", updateTextStyle);
    fontColorPicker.addEventListener("input", updateTextStyle);
    bgColorPicker.addEventListener("input", updateTextStyle);
    
    // Initial render
    updateTextStyle();
});
