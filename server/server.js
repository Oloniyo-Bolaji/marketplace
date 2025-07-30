import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // Replace with your frontend domain in production
    methods: ["GET", "POST"],
  },
});

app.use(cors());

app.get("/", (req, res) => {
  res.send("Socket.IO server is running!");
});

io.on("connection", (socket) => {
  console.log("✅ New client connected:", socket.id);

  socket.on("message", (data) => {
    console.log("📨 Message received:", data);
    // Broadcast to all clients except sender
    socket.broadcast.emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

const PORT = 4000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Socket.IO server running at http://localhost:${PORT}`);
});
