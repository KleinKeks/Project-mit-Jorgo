// Enhanced sparkle effect when hovering over buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('nav a');
    
    // Add sparkles when hovering over buttons
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            createSparkles(this);
        });
        
        // Additional particle burst on click
        button.addEventListener('click', function(e) {
            e.preventDefault();
            createParticleBurst(this);
            
            // Navigate after effect
            setTimeout(() => {
                window.location.href = this.href;
            }, 300);
        });
    });
    
    // Create sparkle effect
    function createSparkles(element) {
        for (let i = 0; i < 6; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.className = 'particle';
                
                const rect = element.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                // Random position around the button
                const angle = (Math.PI * 2 * i) / 6;
                const distance = 30 + Math.random() * 20;
                const x = centerX + Math.cos(angle) * distance;
                const y = centerY + Math.sin(angle) * distance;
                
                sparkle.style.left = x + 'px';
                sparkle.style.top = y + 'px';
                sparkle.style.background = `hsl(${45 + Math.random() * 30}, 100%, ${60 + Math.random() * 40}%)`;
                
                document.body.appendChild(sparkle);
                
                // Remove sparkle after animation
                setTimeout(() => sparkle.remove(), 800);
            }, i * 100);
        }
    }
    
    // Create particle burst effect
    function createParticleBurst(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 6px;
                height: 6px;
                background: ${['#ffd700', '#ff6b35', '#dc143c'][Math.floor(Math.random() * 3)]};
                border-radius: 50%;
                pointer-events: none;
                z-index: 40;
                left: ${centerX}px;
                top: ${centerY}px;
            `;
            
            document.body.appendChild(particle);
            
            // Animate particle outward
            const angle = (Math.PI * 2 * i) / 12;
            const distance = 80 + Math.random() * 40;
            const duration = 600 + Math.random() * 400;
            
            particle.animate([
                { 
                    transform: 'translate(-50%, -50%) scale(1)',
                    opacity: 1 
                },
                { 
                    transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`,
                    opacity: 0 
                }
            ], {
                duration: duration,
                easing: 'ease-out'
            }).onfinish = () => particle.remove();
        }
    }
});