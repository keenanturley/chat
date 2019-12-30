const url = 'ws://localhost:8080/'
const connection = new WebSocket(url)

connection.onerror = error => {
    console.log(`WebSocket error: ${error}`)
}

connection.onopen = () => {
    connection.send('hey')
}

connection.onmessage = e => {
    showMessage(e.data);
}

function showMessage(message) {
    let node = document.createTextNode(message);
    document.querySelector("#history table")
            .insertRow(-1)
            .insertCell(0)
            .appendChild(node);
}

console.log("app.js loaded.");
