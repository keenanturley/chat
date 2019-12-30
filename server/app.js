const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', ws => {
    ws.on('message', message => {
        console.log(`Received message => ${message}`)
        wss.broadcast(message);
    });
})

wss.broadcast = (data) => {
    wss.clients.forEach((client) => {
        client.send(data);
    });
};
