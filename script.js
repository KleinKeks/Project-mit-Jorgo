// Simple sparkle effect when hovering over buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('nav a');
    
    // Add sparkles when hovering over buttons
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            createSparkles(this);
        });
    });
    
    // Create sparkle effect
    function createSparkles(element) {
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.style.cssText = `
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: #ffd700;
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 20;
                `;
                
                const rect = element.getBoundingClientRect();
                sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
                sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
                
                document.body.appendChild(sparkle);
                
                // Remove sparkle after animation
                setTimeout(() => sparkle.remove(), 800);
            }, i * 150);
        }
    }
});