"use strict";
var Pattern;
(function (Pattern) {
    const canvas = document.getElementById("fullscreenCanvas");
    const ctx = canvas.getContext("2d");
    // Function to draw the selected shape (circle, square, or triangle)
    function drawShape(x, y, opacity, color, pattern) {
        ctx.fillStyle = `rgba(${hexToRgb(color)}, ${opacity})`; // Set the color and opacity
        if (pattern === "circle") {
            ctx.beginPath();
            ctx.arc(x, y, 100, 0, Math.PI * 2); // Draw a circle
            ctx.fill();
            ctx.closePath();
        }
        else if (pattern === "square") {
            ctx.beginPath();
            ctx.rect(x - 50, y - 50, 100, 100); // Draw a square
            ctx.fill();
            ctx.closePath();
        }
        else if (pattern === "triangle") {
            ctx.beginPath();
            ctx.moveTo(x, y - 50); // Top point of the triangle
            ctx.lineTo(x - 50, y + 50); // Bottom left point of the triangle
            ctx.lineTo(x + 50, y + 50); // Bottom right point of the triangle
            ctx.closePath();
            ctx.fill();
        }
    }
    Pattern.drawShape = drawShape;
})(Pattern || (Pattern = {}));
//# sourceMappingURL=Patterns.js.map