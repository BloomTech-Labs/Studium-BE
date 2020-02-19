const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const path = require("path");
const uidMiddleWear = require("../routes/utils/findUIDMiddleware.js");

const authRouter = require("../routes/auth/auth-router.js");
const usersRouter = require("../routes/users/users-router.js");
const decksRouter = require("../routes/decks/decks-router.js");

const server = express();
const apiDocsPath = path.join(__dirname, "../apidoc");

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use("/api/auth", authRouter);
server.use("/api/users", uidMiddleWear, usersRouter);
server.use("/api/decks", uidMiddleWear, decksRouter);
server.use("/api", (req, res) => {
  console.log("inside of server up message");
  return res.status(200).json({ message: "Server up and running" });
});

server.use("/", express.static(apiDocsPath));

module.exports = server;
