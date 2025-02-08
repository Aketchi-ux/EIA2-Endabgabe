namespace Main{

window.addEventListener("load", () => {
    const canvas = document.getElementById("fullscreenCanvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    const particleSlider = document.getElementById("particleSlider") as HTMLInputElement;
    const particleCountValue = document.getElementById("particleCountValue") as HTMLSpanElement;


    if (!ctx) {
        console.error("Canvas-Rendering-Context konnte nicht initialisiert werden.");
        return;
    }

    function resizeCanvas(): void {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        draw();
    }

    function draw(): void {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
})

const foldButton = document.getElementById('foldinfireworks');
const loadFireworksDiv = document.querySelector('.loadfireworks');

// Add click event listener for the button
foldButton.addEventListener('click', () => {
    if (loadFireworksDiv.style.display === 'none') {
        // Show the 'loadfireworks' div
        loadFireworksDiv.style.display = 'block';
        foldButton.textContent = 'Hide';  // Change button text to 'Hide'
        foldButton.classList.remove('fixed'); // Remove fixed position class
    } else {
        // Hide the 'loadfireworks' div
        loadFireworksDiv.style.display = 'none';
        foldButton.textContent = 'Show';  // Change button text to 'Show'
        foldButton.classList.add('fixed'); // Add the 'fixed' class to move button to the bottom-left
    }
});

particleSlider.addEventListener("input", () => {
    // Update the span element with the current value of the slider
    particleCountValue.textContent = particleSlider.value;
});
};