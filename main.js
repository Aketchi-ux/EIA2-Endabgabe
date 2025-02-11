"use strict";
var Main;
(function (Main) {
    let url = "https://7c8644f9-f81d-49cd-980b-1883574694b6.fr.bw-cloud-instance.org/mro41572/mingidb.php";
    let particleSlider = document.getElementById("particleSlider");
    let particleCountValue = document.getElementById("particleCountValue");
    let foldButton = document.getElementById("foldinfireworks");
    let loadFireworksDiv = document.querySelector(".loadfireworks");
    let savebutton = document.getElementById("save");
    let buttonCounter = 0;
    window.addEventListener("load", async () => {
        let canvas = document.getElementById("fullscreenCanvas");
        let ctx = canvas.getContext("2d"); //(context) => crc2 is referring to ctx, used to draw on canvas
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
        // let deleteQuery: URLSearchParams = new URLSearchParams();
        // deleteQuery.set("command", "drop");
        // deleteQuery.set("collection", "Fireworks");
        // await fetch(url + "?" + deleteQuery.toString());
        let createQuery = new URLSearchParams(); // creates a query string to send to the server
        createQuery.set("command", "create"); //request the server to create something
        createQuery.set("collection", "Fireworks"); //specifies the collection name
        await fetch(url + "?" + createQuery.toString()); //sends request to the server
        //await ensures the request completes bevor continuing
        let savedQuery = new URLSearchParams();
        savedQuery.set("command", "find"); //request the server to find data
        savedQuery.set("collection", "Fireworks");
        savedQuery.set("data", "{}");
        let response = await fetch(url + "?" + savedQuery.toString());
        //(savedQuery.toString) converts savedQuery (a URLSearchParams object) into a query string
        //fetch sends a HTTP request to the server with this query
        //await ensures the respons is fully received bevor moving to the next step
        //response stores the servers reply
        let responseText = await response.text();
        //await response.text() converts the servers response into a text string
        //responsetext now contains the raw JSON data from the server
        let responseData = JSON.parse(responseText).data;
        //JSON.parse(responseText) converts the JSON text into a JavaScript object
        //.data extracts the actual firework data from the response
        for (let itemId in responseData) {
            createFireworksButton(itemId);
        }
        //Loops through each firework ID in responseData
        //calls createFireworksButton(itemId) to create a button for that firework
    });
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
        let query = new URLSearchParams();
        query.set("command", "insert");
        query.set("collection", "Fireworks");
        query.set("data", JSON.stringify(fireworkData)); //Translates firewordData to JSON-String
        let response = await fetch(url + "?" + query.toString());
        let responseText = await response.text(); //Promise
        let responseJson = JSON.parse(responseText);
        createFireworksButton(responseJson.data.id);
    });
    function createFireworksButton(id) {
        // Create a new button for the saved firework
        let saveing = document.createElement("button");
        saveing.innerHTML = `Firework ${buttonCounter + 1}`;
        saveing.classList.add("firework-btn"); // Add class for styling
        // Save the mingidb id on the htmlattribute for later use
        saveing.setAttribute("id", id);
        // Append button to the loadFireworksDiv
        loadFireworksDiv.appendChild(saveing);
        buttonCounter++;
        // When clicking the saved button, apply its settings
        saveing.addEventListener("click", async () => {
            let buttonId = saveing.getAttribute("id"); //gets the id of the clicked button, which was assigned when the firework was saved
            let query = new URLSearchParams(); //creates URL parameters (query) to send a request to the server
            query.set("command", "find"); //informs the server we want to find data
            query.set("collection", "Fireworks"); //specifies which database collection to look in
            query.set("id", buttonId); //requests the specific firework based on its ID
            let response = await fetch(url + "?" + query.toString()); //send an HTTP request to the server, converts the parameters into a Url query string
            let responseJson = response.ok ? await response.text() : "{}"; //If Ok true, response.text, if false {}
            let savedData = JSON.parse(responseJson).data[buttonId];
            // converts hte response (JSON string) into an object
            //extracts the specific fireworks data using buttonId
            if (!savedData) {
                return;
            }
            //if the savedData is empty or undefined, it exits (return), avoid errors
            Firework.explosionSizeSlider.value = savedData.explosionSize;
            particleSlider.value = savedData.particleCount;
            color.selectedColor = savedData.fireworkColor;
            document.getElementById("fireworkcolor").value = savedData.fireworkColor;
            //updates explosion size slider, particle slider, color
            Firework.explosionSizeValue.textContent = Firework.explosionSizeSlider.value;
            particleCountValue.textContent = particleSlider.value;
            //updates the numbers next to the slider to match the loaded firework
        });
        let deleteButton = document.createElement("button");
        deleteButton.innerHTML = "X";
        saveing.appendChild(deleteButton);
        deleteButton.classList.add("delete-btn");
        deleteButton.addEventListener("click", async () => {
            loadFireworksDiv.removeChild(saveing);
            let buttonId = saveing.getAttribute("id");
            let query = new URLSearchParams();
            query.set("command", "delete");
            query.set("collection", "Fireworks");
            query.set("id", buttonId);
            console.log(await (await fetch(url + "?" + query.toString())).text());
        });
    }
})(Main || (Main = {}));
;
//# sourceMappingURL=main.js.map