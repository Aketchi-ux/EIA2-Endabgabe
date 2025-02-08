namespace Particles{

// Access the particle count slider and the displayed value span
const canvas = document.getElementById("fullscreenCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
const particleSlider = document.getElementById("particleSlider") as HTMLInputElement;
const particleCountValue = document.getElementById("particleCountValue") as HTMLSpanElement;

// Event listener for the slider to update the displayed particle count value
particleSlider.addEventListener("input", () => {
    // Update the displayed value next to the slider
    particleCountValue.textContent = particleSlider.value;
});

// Function to handle canvas click (creating fireworks)
canvas.addEventListener("click", (event: MouseEvent): void => {
    const x = event.offsetX;
    const y = event.offsetY;

    const numParticles = parseInt(particleSlider.value);  // Get the particle count from the slider

    // Create a new circle with full opacity and add it to the circles array
    const newCircle: Circle = {
        x,
        y,
        opacity: 1,  // Start with full opacity
        fadeOutInterval: setInterval(() => fadeOutCircle(newCircle), 50),  // Start the fade-out process
        particles: createParticles(x, y, numParticles),  // Use the slider value to create particles
    };
    circles.push(newCircle);

    // Function to fade out a specific circle
    function fadeOutCircle(circle: Circle): void {
        circle.opacity -= 1 / 50; // Gradually decrease opacity (100 steps for 5 seconds)
        clearCanvas();  // Clear the canvas before redrawing all circles and particles

        // Redraw all circles (including the fading one) with the selected color
        circles.forEach(c => {
            drawCircle(c.x, c.y, c.opacity, selectedColor);
            updateParticles(c, selectedColor);  // Update and draw particles for each circle
            c.particles.forEach(p => drawParticle(p, selectedColor));  // Draw each particle
        });

        if (circle.opacity <= 0) {
            clearInterval(circle.fadeOutInterval);  // Stop fading the current circle
            circles.splice(circles.indexOf(circle), 1);  // Remove the circle from the array
        }
    }
});

}