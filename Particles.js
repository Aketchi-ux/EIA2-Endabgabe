"use strict";
var Particles;
(function (Particles) {
    // Access the particle count slider and the displayed value span
    let canvas = document.getElementById("fullscreenCanvas");
    let ctx = canvas.getContext("2d");
    let particleSlider = document.getElementById("particleSlider");
    let particleCountValue = document.getElementById("particleCountValue");
    // Event listener for the slider to update the displayed particle count value
    particleSlider.addEventListener("input", () => {
        // Update the displayed value next to the slider
        particleCountValue.textContent = particleSlider.value;
    });
    function createParticles(x, y, numParticles) {
        let particles = [];
        for (let i = 0; i < numParticles; i++) {
            let size = Math.random() * 3 + 3; // Larger particles (3-6px)
            let speedX = (Math.random() - 0.5) * 6;
            let speedY = (Math.random() - 0.5) * 6;
            let opacity = Math.random() * 0.6 + 0.5; // Higher initial brightness
            let lifetime = Math.random() * 100 + 200; // Extended lifetime (200-300 frames)
            let prevX = x;
            let prevY = y;
            particles.push({ x, y, size, opacity, speedX, speedY, lifetime, prevX, prevY });
        }
        return particles;
    }
    Particles.createParticles = createParticles;
    function updateParticles(circle) {
        circle.particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            particle.opacity -= 0.005; // Slower fade-out
            particle.lifetime -= 2; // Particles last longer
            if (particle.lifetime <= 0 || particle.opacity <= 0) {
                let index = circle.particles.indexOf(particle);
                if (index > -1)
                    circle.particles.splice(index, 1);
            }
        });
    }
    Particles.updateParticles = updateParticles;
    function drawParticle(particle, color) {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${Firework.hexToRgb(color)}, ${Math.max(particle.opacity, 0.2)})`;
        ctx.fill();
        ctx.closePath();
    }
    Particles.drawParticle = drawParticle;
})(Particles || (Particles = {}));
//# sourceMappingURL=Particles.js.map