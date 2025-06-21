// Wait for page to load completely
document.addEventListener('DOMContentLoaded', function() {
    // Get all the buttons
    const buttons = document.querySelectorAll('nav a');
    
    // Add effects to each button
    buttons.forEach(button => {
        // When mouse enters button - create sparkles
        button.addEventListener('mouseenter', function() {
            createSparkles(this);
        });
    });
    
    // Function to create sparkle effect
    function createSparkles(button) {
        // Create 4 sparkles around the button
        for (let i = 0; i < 4; i++) {
            setTimeout(() => {
                // Create sparkle element
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle';
                
                // Get button position
                const rect = button.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                // Position sparkle randomly around button
                const randomX = centerX + (Math.random() - 0.5) * rect.width;
                const randomY = centerY + (Math.random() - 0.5) * rect.height;
                
                sparkle.style.left = randomX + 'px';
                sparkle.style.top = randomY + 'px';
                
                // Add sparkle to page
                document.body.appendChild(sparkle);
                
                // Remove sparkle after animation (800ms)
                setTimeout(() => sparkle.remove(), 800);
            }, i * 150); // Delay each sparkle by 150ms
        }
    }
});