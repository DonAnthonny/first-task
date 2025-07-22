const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// اتصال به دیتابیس MongoDB
connectDB();

// API روت‌ها
app.use("/api", require("./routes/auth"));
app.use("/api/provider", require("./routes/provider"));

// ایجاد سرور HTTP
const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});


// ✅ WebSocket server setup
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "*", // اجازه اتصال از هر کلاینتی (در حالت توسعه)
  }
});

let onlineProviders = {};

io.on("connection", (socket) => {
  console.log("Client connected", socket.id);

  // ارائه‌دهنده خدمات خودش را ثبت می‌کند
  socket.on("register_provider", ({ id, lat, lng }) => {
    onlineProviders[socket.id] = { id, lat, lng, socketId: socket.id };
    console.log(`Provider registered: ${id}`);
  });

  // وقتی کاربر درخواست جدیدی ثبت می‌کند
  socket.on("new_service_request", ({ lat, lng }) => {
    for (let provider of Object.values(onlineProviders)) {
      const distance = Math.sqrt(
        Math.pow(lat - provider.lat, 2) + Math.pow(lng - provider.lng, 2)
      );

      if (distance <= 0.01) {
        io.to(provider.socketId).emit("notify_new_request", { lat, lng });
      }
    }
  });

  socket.on("disconnect", () => {
    console.log("Disconnected:", socket.id);
    delete onlineProviders[socket.id];
  });
});
