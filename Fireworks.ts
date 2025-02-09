namespace Firework {
    // Get the canvas element and its context
    const canvas = document.getElementById("fullscreenCanvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d")!;
    const particleSlider = document.getElementById("particleSlider") as HTMLInputElement;
    const particleCountValue = document.getElementById("particleCountValue") as HTMLSpanElement;

    // Define a Circle type to store position, opacity, and a reference to the fade-out interval
    export interface Circle {
        x: number;
        y: number;
        opacity: number;
        fadeOutInterval: number;
        particles: Particle[];  // Store the emitted particles for each circle
    }

    // Define a Particle type
    interface Particle {
        x: number;
        y: number;
        size: number;
        opacity: number;
        speedX: number;
        speedY: number;
        lifetime: number;  // Duration of the particle's existence
        prevX: number;  // Vorherige Position des Partikels (für die Spur)
        prevY: number;
    }

    class firework {
        public name: string;
        public explosionsize: number;
        public particlecount: number;
        public colour: string;
        public pattern: string;

        constructor(name: string, explosionsize: number, particlecount: number, colour: string, pattern: string) {
            this.name = name;
            this.explosionsize = explosionsize;
            this.particlecount = particlecount;
            this.colour = colour;
            this.pattern = pattern;
        }
    }

    const fireworkuistate: firework = new firework(
        "Rocket Firework",   // name
        100,                 // explosionsize
        50,                  // particlecount
        "#ff0000",           // colour
        "circle"             // pattern
    );

    // Array to store multiple circles
    export const circles: Circle[] = [];

    // Default color (Initially red)
    let selectedColor: string = "#ff0000";

    // Get the color input from HTML
    const colorInput = document.getElementById("fireworkcolor") as HTMLInputElement;

    // Listen for color input changes and update selectedColor
    colorInput.addEventListener("input", (event: Event) => {
        const target = event.target as HTMLInputElement;
        selectedColor = target.value;  // Update the selected color
        drawPreviewCircle();  // Redraw the preview circle whenever color changes
    });

    // Function to create a circle with a dynamic color and a transparent radius (100px)
    export function drawCircle(x: number, y: number, opacity: number, color: string): void {
        // Create a radial gradient for the transparent circle
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 100); // Radius of 100px for transparency
        gradient.addColorStop(0, `rgba(${hexToRgb(color)}, ${opacity})`);  // Center with full opacity
        gradient.addColorStop(1, `rgba(${hexToRgb(color)}, 0)`);  // Transparent at the outer edge (100px radius)

        // Fill the circle with the gradient
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, 100, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }

    export function createParticles(x: number, y: number, numParticles: number): Particle[] {
        const particles: Particle[] = [];
        for (let i = 0; i < numParticles; i++) {
            const size = Math.random() * 2 + 1;  // Random size
            const speedX = Math.random() * 6 - 3;  // Random speed in X direction
            const speedY = Math.random() * 6 - 3;  // Random speed in Y direction
            const opacity = Math.random() * 0.6 + 0.4;  // Random opacity
            const lifetime = Math.random() * 80 + 80;  // Random lifetime
            const prevX = x;  // Initial previous position is the same as current position
            const prevY = y;

            particles.push({
                x,
                y,
                size,
                opacity,
                speedX,
                speedY,
                lifetime,
                prevX,
                prevY,
            });
        }
        return particles;
    }

    export function updateParticles(circle: Circle): void {
        circle.particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            particle.opacity -= 0.02;  // Faster fade-out
            particle.lifetime -= 5;   // Decrease lifetime of particle

            // Remove particle when lifetime or opacity is zero
            if (particle.lifetime <= 0 || particle.opacity <= 0) {
                const index = circle.particles.indexOf(particle);
                if (index > -1) {
                    circle.particles.splice(index, 1);  // Remove expired particles
                }
            }
        });
    }

    // Function to draw particles with dynamic color
    export function drawParticle(particle: Particle, color: string): void {
        // Use a small random variation in particle size to give a "sparkling" effect
        const sparkleSize = particle.size + (Math.random() * 1.5 - 0.75);

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, sparkleSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${hexToRgb(color)}, ${particle.opacity})`;  // Particles with dynamic color
        ctx.fill();
        ctx.closePath();
    }

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
                updateParticles(c);  // Update and draw particles for each circle
                c.particles.forEach(p => drawParticle(p, selectedColor));  // Draw each particle
            });

            if (circle.opacity <= 0) {
                clearInterval(circle.fadeOutInterval);  // Stop fading the current circle
                circles.splice(circles.indexOf(circle), 1);  // Remove the circle from the array
            }
        }
    });

    // Function to clear the canvas and ensure it's black
    export function clearCanvas(): void {
        ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clears the canvas
        ctx.fillStyle = "black";  // Fill with black color to ensure background stays black
        ctx.fillRect(0, 0, canvas.width, canvas.height);  // Fill the entire canvas with black
    }

    // Convert hex color to RGB for the gradient and particle effect
    function hexToRgb(hex: string): string {
        const hexValue = hex.replace("#", "");
        const r = parseInt(hexValue.substring(0, 2), 16);
        const g = parseInt(hexValue.substring(2, 4), 16);
        const b = parseInt(hexValue.substring(4, 6), 16);
        return `${r}, ${g}, ${b}`;
    }

    // Draw the preview circle when the user changes the color input
    function drawPreviewCircle(): void {
        clearCanvas();  // Clear the canvas
        const previewX = canvas.width / 2;  // X coordinate of the preview circle
        const previewY = canvas.height / 2;  // Y coordinate of the preview circle
        const opacity = 1;  // Full opacity for the preview circle

        // Draw the preview circle in the selected color
        drawCircle(previewX, previewY, opacity, selectedColor);
    }

    // Event listener for canvas click
    canvas.addEventListener("click", (event: MouseEvent): void => {
        const x = event.offsetX;
        const y = event.offsetY;

        // Create a new circle with full opacity and add it to the circles array
        const newCircle: Circle = {
            x,
            y,
            opacity: 1,  // Start with full opacity
            fadeOutInterval: setInterval(() => fadeOutCircle(newCircle), 50),  // Start the fade-out process
            particles: createParticles(x, y, 15),  // Create particles around the circle
        };
        circles.push(newCircle);

        // Function to fade out a specific circle
        function fadeOutCircle(circle: Circle): void {
            circle.opacity -= 1 / 50; // Gradually decrease opacity (100 steps for 5 seconds)
            clearCanvas();  // Clear the canvas before redrawing all circles and particles

            // Redraw all circles (including the fading one) with the selected color
            circles.forEach(c => {
                drawCircle(c.x, c.y, c.opacity, selectedColor);
                updateParticles(c);  // Update and draw particles for each circle
                c.particles.forEach(p => drawParticle(p, selectedColor));  // Draw each particle
            });

            if (circle.opacity <= 0) {
                clearInterval(circle.fadeOutInterval);  // Stop fading the current circle
                circles.splice(circles.indexOf(circle), 1);  // Remove the circle from the array
            }
        }
    });
}