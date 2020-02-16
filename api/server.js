const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authRouter = require("../auth/auth-router.js");
const usersRouter = require("../users/users-router.js");
const decksRouter = require("../decks/decks-router.js");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);
server.use("/api/decks", decksRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "Up and running" });
});

module.exports = server;
