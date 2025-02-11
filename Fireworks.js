"use strict";
var Firework;
(function (Firework) {
    let canvas = document.getElementById("fullscreenCanvas");
    let ctx = canvas.getContext("2d");
    let particleSlider = document.getElementById("particleSlider");
    let particleCountValue = document.getElementById("particleCountValue");
    Firework.explosionSizeSlider = document.getElementById("explosionSizeSlider");
    Firework.explosionSizeValue = document.getElementById("explosionSizeValue");
    class Circle {
        x;
        y;
        opacity;
        fadeOutInterval;
        particles;
    }
    Firework.Circle = Circle;
    class Particle {
        x;
        y;
        size;
        opacity;
        speedX;
        speedY;
        lifetime;
        prevX;
        prevY;
    }
    Firework.Particle = Particle;
    class firework {
        explosiosize;
        particlecount;
        colour;
        constructor(explosionsize, particlecount, colour) {
            this.explosiosize = explosionsize;
            this.particlecount = particlecount;
            this.colour = colour;
        }
    }
    Firework.firework = firework;
    let fireworkuistate = {
        explosionsize: parseInt(Firework.explosionSizeSlider.value), // Default explosion size
        particlecount: 50,
        colour: "#ff0000",
    };
    // Listen for explosion size changes
    Firework.explosionSizeSlider.addEventListener("input", () => {
        fireworkuistate.explosionsize = parseInt(Firework.explosionSizeSlider.value);
        Firework.explosionSizeValue.textContent = Firework.explosionSizeSlider.value;
        drawPreviewCircle();
    });
    Firework.circles = []; //declares and array of circle objects
    let selectedColor = "#ff0000";
    //stores currently selected color for fireworks, default value is red
    //this variable updates dynamically when the user picks color
    let colorInput = document.getElementById("fireworkcolor");
    colorInput.addEventListener("input", (event) => {
        selectedColor = event.target.value;
        drawPreviewCircle();
    });
    function drawCircle(x, y, opacity, color) {
        let gradient = ctx.createRadialGradient(x, y, 0, x, y, 120); //creates a gradient that radiates outward
        let radius = fireworkuistate.explosionsize; // Use dynamic radius
        gradient.addColorStop(0, `rgba(${hexToRgb(color)}, ${Math.max(opacity, 0.3)})`);
        gradient.addColorStop(1, `rgba(${hexToRgb(color)}, 0)`);
        //defines color transition (0 = center of explosion)
        //(1 = outer edge, fully transparent) hexToRGB converts hex color to RGB format
        //Math.max ensures the explosion has at least 30% opacity to remain visible
        ctx.fillStyle = gradient; //sets the fill style to radial gradient
        ctx.beginPath(); //begins drawing a new shape
        ctx.arc(x, y, radius, 0, Math.PI * 2); //draws a circle (Math.PI * is a full rotation)
        ctx.fill(); //fills the circle with the gradient
        ctx.closePath(); //closes the shape
    }
    Firework.drawCircle = drawCircle;
    particleSlider.addEventListener("input", () => {
        particleCountValue.textContent = particleSlider.value;
    });
    canvas.addEventListener("click", (event) => {
        let x = event.offsetX;
        let y = event.offsetY;
        let numParticles = parseInt(particleSlider.value);
        //retrieves the current Value from particleSlider
        //converts the value to a number using parseInt, value determines how many particles the firework will have
        let newCircle = {
            x,
            y,
            opacity: 1,
            fadeOutInterval: setInterval(() => fadeOutCircle(newCircle), 50),
            particles: Particles.createParticles(x, y, numParticles),
        };
        Firework.circles.push(newCircle);
    });
    function fadeOutCircle(circle) {
        circle.opacity -= 0.5 / 100; // Slower fade-out for longer visibility
        clearCanvas();
        circle.opacity -= 1 / 50; // Gradually decrease opacity (100 steps for 5 seconds)
        clearCanvas(); // Clear the canvas before redrawing all circles and particles
        // Redraw all circles (including the fading one) with the selected color
        Firework.circles.forEach(c => {
            drawCircle(c.x, c.y, c.opacity, color.selectedColor);
            Particles.updateParticles(c); // Update and draw particles for each circle
            c.particles.forEach(p => Particles.drawParticle(p, color.selectedColor)); // Draw each particle
        });
        if (circle.opacity <= 0) {
            clearInterval(circle.fadeOutInterval); // Stop fading the current circle
            Firework.circles.splice(Firework.circles.indexOf(circle), 1); // Remove the circle from the array
        }
    }
    Firework.fadeOutCircle = fadeOutCircle;
    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    Firework.clearCanvas = clearCanvas;
    function hexToRgb(hex) {
        let hexValue = hex.replace("#", ""); // removes # from the hex color, ensures only six-character hex value
        let r = parseInt(hexValue.substring(0, 2), 16); // first two characters (red)
        let g = parseInt(hexValue.substring(2, 4), 16); // middle two characters (green)
        let b = parseInt(hexValue.substring(4, 6), 16); // last two characters (blue)
        return `${r}, ${g}, ${b}`; //Returns the RGB values as a string
    }
    Firework.hexToRgb = hexToRgb;
    function drawPreviewCircle() {
        clearCanvas();
        drawCircle(canvas.width / 2, canvas.height / 2, 1, selectedColor);
    }
})(Firework || (Firework = {}));
//# sourceMappingURL=Fireworks.js.map