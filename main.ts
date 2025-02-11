namespace Main {

    let url: string = "https://7c8644f9-f81d-49cd-980b-1883574694b6.fr.bw-cloud-instance.org/mro41572/mingidb.php";
    let particleSlider = document.getElementById("particleSlider") as HTMLInputElement;
    let particleCountValue = document.getElementById("particleCountValue") as HTMLSpanElement;
    let foldButton = document.getElementById("foldinfireworks")!;
    let loadFireworksDiv = document.querySelector(".loadfireworks")! as HTMLDivElement;
    let savebutton = document.getElementById("save")!;

    let buttonCounter = 0;

    window.addEventListener("load", async () => {
        let canvas = document.getElementById("fullscreenCanvas") as HTMLCanvasElement;
        let ctx = canvas.getContext("2d")!;

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

        // let deleteQuery: URLSearchParams = new URLSearchParams();
        // deleteQuery.set("command", "drop");
        // deleteQuery.set("collection", "Fireworks");
        // await fetch(url + "?" + deleteQuery.toString());

        let createQuery: URLSearchParams = new URLSearchParams();
        createQuery.set("command", "create");
        createQuery.set("collection", "Fireworks");
        await fetch(url + "?" + createQuery.toString());

        
        let savedQuery: URLSearchParams = new URLSearchParams();
        savedQuery.set("command", "find");
        savedQuery.set("collection", "Fireworks");
        savedQuery.set("data", "{}");
        let response = await fetch(url + "?" + savedQuery.toString());
        let responseText = await response.text();
        let responseData = JSON.parse(responseText).data;

        for(let itemId in responseData) 
        {
            createFireworksButton(itemId);
        }
    })

    // Hide the div when foldButton is clicked
    foldButton.addEventListener("click", () => {
        loadFireworksDiv.style.display = "none";
    });


    // Update sidebar values when sliders change
    particleSlider.addEventListener("input", () => {
        particleCountValue.textContent = particleSlider.value;
    });


    savebutton.addEventListener("click", async () => {
        // Get current firework settings
        let explosionSize = Firework.explosionSizeSlider.value;
        let particleCount = particleSlider.value;
        let fireworkColor = color.selectedColor;
    
        // Store firework settings in localStorage
        let fireworkData = {
            explosionSize,
            particleCount,
            fireworkColor
        };

        let query: URLSearchParams = new URLSearchParams();
        query.set("command", "insert");
        query.set("collection", "Fireworks");
        query.set("data", JSON.stringify(fireworkData));//Translates firewordData to JSON-String

        let response = await fetch(url + "?" + query.toString());
        let responseText = await response.text(); //Promise
        let responseJson = JSON.parse(responseText);
    
        createFireworksButton(responseJson.data.id);
    });

    function createFireworksButton(id : string) 
    {
        // Create a new button for the saved firework
        let saveing = document.createElement("button") as HTMLButtonElement;
        saveing.innerHTML = `Firework ${buttonCounter + 1}`;
        saveing.classList.add("firework-btn"); // Add class for styling
        
        // Save the mingidb id on the htmlattribute for later use
        saveing.setAttribute("id", id);
    
        // Append button to the loadFireworksDiv
        loadFireworksDiv.appendChild(saveing);
        buttonCounter++;
        // When clicking the saved button, apply its settings
        saveing.addEventListener("click", async () => {
            let buttonId = saveing.getAttribute("id")!;
            let query: URLSearchParams = new URLSearchParams();
            query.set("command", "find");
            query.set("collection", "Fireworks");
            query.set("id", buttonId);
            let response = await fetch(url + "?" + query.toString());
            let responseJson = response.ok ? await response.text() : "{}"; //If Ok true, response.text, if false {}
            let savedData = JSON.parse(responseJson).data[buttonId];
    
            if (!savedData) 
            {
                return;
            }
            Firework.explosionSizeSlider.value = savedData.explosionSize;
            particleSlider.value = savedData.particleCount;
            color.selectedColor = savedData.fireworkColor;
            (document.getElementById("fireworkcolor") as HTMLInputElement).value = savedData.fireworkColor;
    
            Firework.explosionSizeValue.textContent = Firework.explosionSizeSlider.value;
            particleCountValue.textContent = particleSlider.value;
        
        });

        let deleteButton = document.createElement("button") as HTMLButtonElement;
        deleteButton.innerHTML = "X";
        saveing.appendChild(deleteButton);
        deleteButton.classList.add("delete-btn");
    

        deleteButton.addEventListener("click", async () => {
            loadFireworksDiv.removeChild(saveing);
            let buttonId = saveing.getAttribute("id")!;
            let query: URLSearchParams = new URLSearchParams();
            query.set("command", "delete");
            query.set("collection", "Fireworks");
            query.set("id", buttonId);
            console.log(await(await fetch(url + "?" + query.toString())).text());
        });
    }
};