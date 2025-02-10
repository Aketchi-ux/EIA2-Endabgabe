"use strict";
var Main;
(function (Main) {
    let particleSlider = document.getElementById("particleSlider");
    let particleCountValue = document.getElementById("particleCountValue");
    let foldButton = document.getElementById("foldinfireworks");
    let loadFireworksDiv = document.querySelector(".loadfireworks");
    let addbutton = document.getElementById("add");
    let deletebutton = document.getElementById("delete");
    let savebutton = document.getElementById("save");
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
    // Update sidebar values when sliders change
    particleSlider.addEventListener("input", () => {
        particleCountValue.textContent = particleSlider.value;
    });
    savebutton.addEventListener("click", () => {
        // Get current firework settings
        let explosionSize = Firework.explosionSizeSlider.value;
        let particleCount = particleSlider.value;
        let fireworkColor = color.selectedColor;
        // Create a new button for the saved firework
        let saveing = document.createElement("button");
        saveing.innerHTML = `Firework ${buttonCounter + 1}`;
        saveing.classList.add("firework-btn"); // Add class for styling
        // Store firework settings in localStorage
        let fireworkData = {
            explosionSize,
            particleCount,
            fireworkColor
        };
        localStorage.setItem(`firework-${buttonCounter + 1}`, JSON.stringify(fireworkData));
        // Append button to the loadFireworksDiv
        loadFireworksDiv.appendChild(saveing);
        buttonCounter++;
        // When clicking the saved button, apply its settings
        saveing.addEventListener("click", () => {
            let savedData = JSON.parse(localStorage.getItem(saveing.innerHTML) || "{}");
            if (savedData.explosionSize)
                Firework.explosionSizeSlider.value = savedData.explosionSize;
            if (savedData.particleCount)
                particleSlider.value = savedData.particleCount;
            if (savedData.fireworkColor)
                color.selectedColor = savedData.fireworkColor;
            Firework.explosionSizeValue.textContent = Firework.explosionSizeSlider.value;
            particleCountValue.textContent = particleSlider.value;
        });
    });
    deletebutton.addEventListener("click", () => {
    });
})(Main || (Main = {}));
;
//# sourceMappingURL=main.js.map