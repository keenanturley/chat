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

    wsOptions.server = https.createServer(options, function (req, res) {
        res.writeHead(200);
        res.end("hello world\n");
    }).listen(8000);
}

const wss = new WebSocket.Server(wsOptions);

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
