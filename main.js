"use strict";
var Main;
(function (Main) {
    const particleSlider = document.getElementById("particleSlider");
    const particleCountValue = document.getElementById("particleCountValue");
    const foldButton = document.getElementById('foldinfireworks');
    const loadFireworksDiv = document.querySelector('.loadfireworks');
    const addbutton = document.getElementById("add");
    let buttonCounter = 0;
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
        }
        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();
    });
    // Add click event listener for the button
    foldButton.addEventListener('click', () => {
        if (loadFireworksDiv.style.display === 'none') {
            // Show the 'loadfireworks' div
            loadFireworksDiv.style.display = 'block';
            foldButton.textContent = 'Hide'; // Change button text to 'Hide'
            foldButton.classList.remove('fixed'); // Remove fixed position class
        }
        else {
            // Hide the 'loadfireworks' div
            loadFireworksDiv.style.display = 'none';
            foldButton.textContent = "Show"; // Change button text to 'Show'
            foldButton.classList.add('fixed'); // Add the 'fixed' class to move button to the bottom-left
        }
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