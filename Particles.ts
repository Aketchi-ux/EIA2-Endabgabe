namespace Particles {


    // Access the particle count slider and the displayed value span
    let canvas = document.getElementById("fullscreenCanvas") as HTMLCanvasElement;
    let ctx = canvas.getContext("2d")!;
    let particleSlider = document.getElementById("particleSlider") as HTMLInputElement;
    let particleCountValue = document.getElementById("particleCountValue") as HTMLSpanElement;

    // Event listener for the slider to update the displayed particle count value
    particleSlider.addEventListener("input", () => {
        // Update the displayed value next to the slider
        particleCountValue.textContent = particleSlider.value;
    });

    export function createParticles(x: number, y: number, numParticles: number): Firework.Particle[] {
        let particles: Firework.Particle[] = []; //initializes an empty array to store the particles
        for (let i = 0; i < numParticles; i++) { //runs a loop numParticles n-times(if numparticles =  50, it runs 50 times)
            let size = Math.random() * 3 + 3; //Larger particles (3-6px)
            let speedX = (Math.random() - 0.5) * 6;
            let speedY = (Math.random() - 0.5) * 6;
            //gives a range from -0.5 to 0.5, multiplying by 6 makes the speed between -3 to 3 pixels per frame
            //(makes the particles scatter in random directions)
            let opacity = Math.random() * 0.6 + 0.5;
            // Higher initial brightness, range from 0 to 0.6, adding 0.5 makes the range 0.5 to 1.1
            //(so particles are never fully invisible)
            let lifetime = Math.random() * 100 + 200;
            // Extended lifetime (200-300 frames) some Particles last longer than others
            let prevX = x;
            let prevY = y;
            //stores the pervious position of the particle bevor it moves
            //used to trails or drawing smooth animations

            particles.push({ x, y, size, opacity, speedX, speedY, lifetime, prevX, prevY });
            //creates a new particle object with all the properties and pushes into the particles array
        }
        return particles;
        //after the loop finishes, the function returns all created particles
        //these particles are then used in the explosion effect
    }

    export function updateParticles(circle: Firework.Circle): void {
        circle.particles.forEach(particle => { 
            //loops through every particle in the firework explosion (circle.particles)
            //each particle is updated individually
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            //the particle moves based on its speed in X and Y direction
            particle.opacity -= 0.005; // Slower fade-out
            particle.lifetime -= 2; // Particles last longer

            if (particle.lifetime <= 0 || particle.opacity <= 0) {
                let index = circle.particles.indexOf(particle);
                if (index > -1) circle.particles.splice(index, 1);
            }
            //if a particle is fully faded (opacity<=0)OR its lifetime runs out (lifetime<=0),remove it
            //finds Index of the particle in the circle.particles array
            //if it exists (index > -1), remove it using .splice()
        });
    }

    export function drawParticle(particle: Firework.Particle, color: string): void { 
        //The particle to be drawn, color: string = the color of the particle (in hex)
        ctx.beginPath();
        //resets any previous drawing path and ensures the new particles is drawn seperately from others
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        //draws a circle at (particle.x, particle.y), circle radius is particle.size, arc sets at 0 radians and ends at Math.PI * 2
        ctx.fillStyle = `rgba(${Firework.hexToRgb(color)}, ${Math.max(particle.opacity, 0.2)})`;
        //Firework.hexToRgb(color) converts hex (#ff0000) to RGB format
        //uses RGBA format to include transparency
        ctx.fill();
        //fills the circle with the previously selected color
        //particle appears on the canvas
        ctx.closePath();
        //finishes the current shape, prepares for the next particle to be drawn
    }

}