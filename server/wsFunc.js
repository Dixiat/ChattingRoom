const onConnection = ws => {
    // Bind WebSocketServer
    ws.wss = this;
    wss.broadcast = message => {
        wss.clients.forEach((client => {
            client.send(message);
        }))
    }
};