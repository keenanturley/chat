const config = require("./config.json");
const https = require('https');
const fs = require('fs');
const WebSocket = require("ws");

let wsOptions = { port: 8080 };

if (config.useHttps) {
    const options = {
        key: fs.readFileSync(config.keyPath),
        cert: fs.readFileSync(config.certPath)
    };

    wsOptions.server = https.createServer(options);
}

const wss = new WebSocket.Server(wsOptions);

wss.on('connection', ws => {
    ws.on('message', message => {
        console.log(`Received message => ${message}`)
        wss.broadcast(message);
    });
})

if (wsOptions.server) {
    wsOptions.server.listen(8080);
}

wss.broadcast = (data) => {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
};
