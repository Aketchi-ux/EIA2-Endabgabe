namespace Firework {
    let canvas = document.getElementById("fullscreenCanvas") as HTMLCanvasElement;
    let ctx = canvas.getContext("2d")!;
    let particleSlider = document.getElementById("particleSlider") as HTMLInputElement;
    let particleCountValue = document.getElementById("particleCountValue") as HTMLSpanElement;
    export let explosionSizeSlider = document.getElementById("explosionSizeSlider") as HTMLInputElement;
    export let explosionSizeValue = document.getElementById("explosionSizeValue") as HTMLSpanElement;

    export class Circle {
        x: number;
        y: number;
        opacity: number;
        fadeOutInterval: number;
        particles: Particle[];
    }

    export class Particle {
        x: number;
        y: number;
        size: number;
        opacity: number;
        speedX: number;
        speedY: number;
        lifetime: number;
        prevX: number;
        prevY: number;
    }

    export class firework {
        public explosiosize: number;
        public particlecount: number;
        public color: string;
        constructor(explosionsize: number, particlecount: number, color: string) {
            this.explosiosize = explosionsize;
            this.particlecount = particlecount;
            this.color = color;
        }
    }

    let fireworkuistate = {
        explosionsize: parseInt(explosionSizeSlider.value), // Default explosion size
        particlecount: 50,
        color: "#ff0000",
    };

    // Listen for explosion size changes
    explosionSizeSlider.addEventListener("input", () => {
        fireworkuistate.explosionsize = parseInt(explosionSizeSlider.value);
        explosionSizeValue.textContent = explosionSizeSlider.value;
        drawPreviewCircle();
    });
    
    export let circles: Circle[] = [];
    let selectedColor: string = "#ff0000";

    let colorInput = document.getElementById("fireworkcolor") as HTMLInputElement;
    colorInput.addEventListener("input", (event: Event) => {
        selectedColor = (event.target as HTMLInputElement).value;
        drawPreviewCircle();
    });

    export function drawCircle(x: number, y: number, opacity: number, color: string): void {
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

    particleSlider.addEventListener("input", () => {
        particleCountValue.textContent = particleSlider.value;
    });

    canvas.addEventListener("click", (event: MouseEvent): void => {
        let x = event.offsetX;
        let y = event.offsetY;
        let numParticles = parseInt(particleSlider.value);

        let newCircle: Circle = {
            x,
            y,
            opacity: 1,
            fadeOutInterval: setInterval(() => fadeOutCircle(newCircle), 50),
            particles: Particles.createParticles(x, y, numParticles),
        };
        circles.push(newCircle);
    });

    export function fadeOutCircle(circle: Circle): void {
        circle.opacity -= 0.02; // Adjust fade speed (higher = faster)
        
        if (circle.opacity <= 0) {
            clearInterval(circle.fadeOutInterval);  // Stop fading this circle
            circles.splice(circles.indexOf(circle), 1);  // Remove from array
            return;  // Exit function early
        }
    
        clearCanvas(); // Clear before redrawing
    
        // Redraw all circles and their particles
        circles.forEach(c => {
            drawCircle(c.x, c.y, c.opacity, selectedColor);
            Particles.updateParticles(c);
            c.particles.forEach(p => Particles.drawParticle(p, selectedColor));
            clearCanvas();
        });
    }    

    export function clearCanvas(): void {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    export function hexToRgb(hex: string): string {
        let hexValue = hex.replace("#", "");
        let r = parseInt(hexValue.substring(0, 2), 16);
        let g = parseInt(hexValue.substring(2, 4), 16);
        let b = parseInt(hexValue.substring(4, 6), 16);
        return `${r}, ${g}, ${b}`;
    }

    function drawPreviewCircle(): void {
        clearCanvas();
        drawCircle(canvas.width / 2, canvas.height / 2, 1, selectedColor);
    }

}