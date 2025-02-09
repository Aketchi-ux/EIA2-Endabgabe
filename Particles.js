"use strict";
var Particles;
(function (Particles) {
    // Access the particle count slider and the displayed value span
    const canvas = document.getElementById("fullscreenCanvas");
    const particleSlider = document.getElementById("particleSlider");
    const particleCountValue = document.getElementById("particleCountValue");
    // Event listener for the slider to update the displayed particle count value
    particleSlider.addEventListener("input", () => {
        // Update the displayed value next to the slider
        particleCountValue.textContent = particleSlider.value;
    });
    // Function to handle canvas click (creating fireworks)
    canvas.addEventListener("click", (event) => {
        const x = event.offsetX;
        const y = event.offsetY;
        const numParticles = parseInt(particleSlider.value); // Get the particle count from the slider
        // Create a new circle with full opacity and add it to the circles array
        const newCircle = {
            x,
            y,
            opacity: 1, // Start with full opacity
            fadeOutInterval: setInterval(() => fadeOutCircle(newCircle), 50), // Start the fade-out process
            particles: Firework.createParticles(x, y, numParticles), // Use the slider value to create particles
        };
        Firework.circles.push(newCircle);
        // Function to fade out a specific circle
        function fadeOutCircle(circle) {
            circle.opacity -= 1 / 50; // Gradually decrease opacity (100 steps for 5 seconds)
            Firework.clearCanvas(); // Clear the canvas before redrawing all circles and particles
            // Redraw all circles (including the fading one) with the selected color
            Firework.circles.forEach(c => {
                Firework.drawCircle(c.x, c.y, c.opacity, colour.selectedColor);
                Firework.updateParticles(c); // Update and draw particles for each circle
                c.particles.forEach(p => Firework.drawParticle(p, colour.selectedColor)); // Draw each particle
            });
            if (circle.opacity <= 0) {
                clearInterval(circle.fadeOutInterval); // Stop fading the current circle
                Firework.circles.splice(Firework.circles.indexOf(circle), 1); // Remove the circle from the array
            }
        }
    });
})(Particles || (Particles = {}));
//# sourceMappingURL=Particles.js.map