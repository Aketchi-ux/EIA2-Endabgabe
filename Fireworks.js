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
        color;
        constructor(explosionsize, particlecount, color) {
            this.explosiosize = explosionsize;
            this.particlecount = particlecount;
            this.color = color;
        }
    }
    Firework.firework = firework;
    let fireworkuistate = {
        explosionsize: parseInt(Firework.explosionSizeSlider.value), // Default explosion size
        particlecount: 50,
        color: "#ff0000",
    };
    // Listen for explosion size changes
    Firework.explosionSizeSlider.addEventListener("input", () => {
        fireworkuistate.explosionsize = parseInt(Firework.explosionSizeSlider.value);
        Firework.explosionSizeValue.textContent = Firework.explosionSizeSlider.value;
        drawPreviewCircle();
    });
    Firework.circles = [];
    let selectedColor = "#ff0000";
    let colorInput = document.getElementById("fireworkcolor");
    colorInput.addEventListener("input", (event) => {
        selectedColor = event.target.value;
        drawPreviewCircle();
    });
    function drawCircle(x, y, opacity, color) {
        let gradient = ctx.createRadialGradient(x, y, 0, x, y, 120);
        let radius = fireworkuistate.explosionsize; // Use dynamic radius
        gradient.addColorStop(0, `rgba(${hexToRgb(color)}, ${Math.max(opacity, 0.3)})`);
        gradient.addColorStop(1, `rgba(${hexToRgb(color)}, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
    Firework.drawCircle = drawCircle;
    particleSlider.addEventListener("input", () => {
        particleCountValue.textContent = particleSlider.value;
    });
    canvas.addEventListener("click", (event) => {
        let x = event.offsetX;
        let y = event.offsetY;
        let numParticles = parseInt(particleSlider.value);
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
        circle.opacity -= 0.02; // Adjust fade speed (higher = faster)
        if (circle.opacity <= 0) {
            clearInterval(circle.fadeOutInterval); // Stop fading this circle
            Firework.circles.splice(Firework.circles.indexOf(circle), 1); // Remove from array
            return; // Exit function early
        }
        clearCanvas(); // Clear before redrawing
        // Redraw all circles and their particles
        Firework.circles.forEach(c => {
            drawCircle(c.x, c.y, c.opacity, selectedColor);
            Particles.updateParticles(c);
            c.particles.forEach(p => Particles.drawParticle(p, selectedColor));
            clearCanvas();
        });
    }
    Firework.fadeOutCircle = fadeOutCircle;
    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    Firework.clearCanvas = clearCanvas;
    function hexToRgb(hex) {
        let hexValue = hex.replace("#", "");
        let r = parseInt(hexValue.substring(0, 2), 16);
        let g = parseInt(hexValue.substring(2, 4), 16);
        let b = parseInt(hexValue.substring(4, 6), 16);
        return `${r}, ${g}, ${b}`;
    }
    Firework.hexToRgb = hexToRgb;
    function drawPreviewCircle() {
        clearCanvas();
        drawCircle(canvas.width / 2, canvas.height / 2, 1, selectedColor);
    }
})(Firework || (Firework = {}));
//# sourceMappingURL=Fireworks.js.map