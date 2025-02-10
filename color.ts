namespace color {

    // Declare variables to store the selected color and canvas context
    export let selectedColor: string = "#ff0000"; // Default color is red

    // Get the color picker input element
    let colorInput = document.getElementById("fireworkcolor") as HTMLInputElement;

    // Update the selected color when the user changes the color
    colorInput.addEventListener("input", (event: Event) => {
        let target = event.target as HTMLInputElement;
        selectedColor = target.value; // Get the new color from the color input
        updateFireworkColor(selectedColor); // Update the firework's color
    });

    // Function to update the firework's color on the canvas
    function updateFireworkColor(color: string): void {
        let canvas = document.getElementById("fullscreenCanvas") as HTMLCanvasElement;
        let ctx = canvas.getContext("2d");

        if (ctx) {
            // Clear the canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw the new firework with the selected color (example: a circle)
            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, Math.PI * 2); // Draw a circle
            ctx.fillStyle = color; // Set the fill color to the selected color
            ctx.fill(); // Fill the circle with the selected color
            ctx.closePath();
        }
    }
}