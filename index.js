const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const PORT = process.env.PORT || 8000;
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const io = require("socket.io")(server, {
  cors: {
    origin: process.env.WEBSITE_URL,
    methods: ["*"],
    credentials: true,
  },
});

app.get("/", (req, res) => {
  res.json({ title: "Hello world" });
});

app.post("/", (req, res) => {
  io.emit("new_post", { ...req.body });
  res.json({ status: 201 });
});

server.listen(PORT);
