"use strict";
var Main;
(function (Main) {
    let particleSlider = document.getElementById("particleSlider");
    let particleCountValue = document.getElementById("particleCountValue");
    let foldButton = document.getElementById("foldinfireworks");
    let loadFireworksDiv = document.querySelector(".loadfireworks");
    let addbutton = document.getElementById("add");
    let buttonCounter = 0;
    window.addEventListener("load", () => {
        let canvas = document.getElementById("fullscreenCanvas");
        let ctx = canvas.getContext("2d");
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
        }
        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();
    });
    // Hide the div when foldButton is clicked
    foldButton.addEventListener("click", () => {
        loadFireworksDiv.style.display = "none";
    });
    particleSlider.addEventListener("input", () => {
        // Update the span element with the current value of the slider
        particleCountValue.textContent = particleSlider.value;
    });
    addbutton.addEventListener("click", () => {
        let elem = document.createElement("button");
        elem.innerHTML = "New Firework";
        loadFireworksDiv.appendChild(elem);
        buttonCounter++;
        elem.id = `fireworkButton-${buttonCounter}`;
    });
})(Main || (Main = {}));
;
//# sourceMappingURL=main.js.map