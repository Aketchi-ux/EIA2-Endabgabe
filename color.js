"use strict";
var color;
(function (color_1) {
    // Declare variables to store the selected color and canvas context
    color_1.selectedColor = "#ff0000"; // Default color is red
    // Get the color picker input element
    let colorInput = document.getElementById("fireworkcolor");
    // Update the selected color when the user changes the color
    colorInput.addEventListener("input", (event) => {
        let target = event.target;
        color_1.selectedColor = target.value; // Get the new color from the color input
        updateFireworkColor(color_1.selectedColor); // Update the firework's color
    });
    // Function to update the firework's color on the canvas
    function updateFireworkColor(color) {
        let canvas = document.getElementById("fullscreenCanvas");
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
})(color || (color = {}));
//# sourceMappingURL=color.js.map