document.addEventListener('DOMContentLoaded', () => {
    // --- Get DOM Elements ---
    const canvas = document.getElementById('starfield-canvas');
    const ctx = canvas.getContext('2d');

    const widthInput = document.getElementById('width-input');
    const heightInput = document.getElementById('height-input');
    const starCountSlider = document.getElementById('star-count-slider');
    const brightnessSlider = document.getElementById('brightness-slider');
    
    const starCountValue = document.getElementById('star-count-value');
    const brightnessValue = document.getElementById('brightness-value');

    const generateBtn = document.getElementById('generate-btn');
    const saveBtn = document.getElementById('save-btn');

    // --- Core Drawing Function ---
    function generateStarfield() {
        console.log("Generating starfield...");

        // 1. Get current settings from the UI
        const width = parseInt(widthInput.value, 10);
        const height = parseInt(heightInput.value, 10);
        const starCount = parseInt(starCountSlider.value, 10);
        const maxBrightness = parseFloat(brightnessSlider.value);

        // 2. Set canvas dimensions
        canvas.width = width;
        canvas.height = height;

        // 3. Draw the black background
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, width, height);

        // 4. Draw each star
        for (let i = 0; i < starCount; i++) {
            // Generate random properties for the star
            const x = Math.random() * width;
            const y = Math.random() * height;
            const radius = Math.random() * 1.5; // Stars have slightly varied sizes
            
            // The alpha (opacity) is random, up to the max brightness setting
            const alpha = Math.random() * maxBrightness; 

            // Draw the star (a small circle)
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.fill();
        }
        console.log("Generation complete.");
    }

    // --- Event Listeners ---

    // Generate button click
    generateBtn.addEventListener('click', generateStarfield);

    // Save button click
    saveBtn.addEventListener('click', () => {
        // Create a temporary link element
        const link = document.createElement('a');
        
        // The link's URL is the canvas's image data
        link.href = canvas.toDataURL('image/png'); // You can also use 'image/jpeg'
        
        // Set a filename for the download
        link.download = 'starfield.png';
        
        // Programmatically click the link to trigger the download
        link.click();
    });

    // Update the text display when sliders are moved
    starCountSlider.addEventListener('input', (e) => {
        starCountValue.textContent = e.target.value;
    });

    brightnessSlider.addEventListener('input', (e) => {
        brightnessValue.textContent = parseFloat(e.target.value).toFixed(2);
    });

    // --- Initial Generation ---
    // Generate the first starfield when the page loads
    generateStarfield();
});