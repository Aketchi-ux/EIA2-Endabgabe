"use strict";
window.addEventListener("load", () => {
    const canvas = document.getElementById("fullscreenCanvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
        console.error("Canvas-Rendering-Context konnte nicht initialisiert werden.");
        return;
    }
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        draw();
    }
    function draw() {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
        ctx.font = "40px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Fullscreen Canvas", canvas.width / 2, canvas.height / 2);
    }
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
});
//# sourceMappingURL=main.js.map