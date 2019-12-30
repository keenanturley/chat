const url = 'ws://localhost:8080/'
const connection = new WebSocket(url)

connection.onerror = error => {
    console.log(`WebSocket error: ${error}`)
    showMessage("Error: Failed to connect to server.");
}

connection.onmessage = e => {
    showMessage(e.data);
}

// Shows a message in the history
function showMessage(message) {
    let history = document.getElementById("history");
    let element = document.createElement("div");
    element.classList.add("message");
    let node = document.createTextNode(message);
    element.appendChild(node);
    history.appendChild(element);
    history.scrollTo(0, history.scrollHeight);
}

// Sends a message to the server via websocket
function sendMessage(message) {
    connection.send(message);
}

// Hook command line
let commandLine = document.getElementById("command-line");
commandLine.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        sendMessage(commandLine.value);
        commandLine.value = "";
    }
});

console.log("app.js loaded.");
