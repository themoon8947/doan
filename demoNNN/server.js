const WebSocket = require("ws");
const server = new WebSocket.Server({ port: 8080 });

server.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("message", (message) => {
    const data = JSON.parse(message);
    if (data.type === "message") {
      console.log(`Message from ${data.sender}: ${data.message}`);

      // Gửi tin nhắn đến tất cả client khác
      server.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(data));
        }
      });
    }
  });

  socket.on("close", () => {
    console.log("Client disconnected");
  });
});

console.log("WebSocket server is running on ws://localhost:8080");

//npm init -y
// npm install ws
// node server.js
// npm install express
// npm install nodemon
