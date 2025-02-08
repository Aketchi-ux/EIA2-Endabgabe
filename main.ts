window.addEventListener("load", () => {
    const canvas = document.getElementById("fullscreenCanvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    const fireworkButton = document.getElementById("fireworkButton");

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

        ctx.fillStyle = "white";
        ctx.font = "40px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Fullscreen Canvas", canvas.width / 2, canvas.height / 2);
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
});