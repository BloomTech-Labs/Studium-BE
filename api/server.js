const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const path = require("path");
const uidMiddleWear = require("../routes/utils/findUIDMiddleware.js");

const registerRouter = require("../routes/auth/registerRouter.js");
const usersRouter = require("../routes/users/users-router.js");
const decksRouter = require("../routes/decks/decks-router.js");
const cardsRouter = require("../routes/cards/cards-router.js");

const server = express();
const apiDocsPath = path.join(__dirname, "../apidoc");

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use("/api/register", registerRouter);
server.use("/api/users", uidMiddleWear, usersRouter);
server.use("/api/decks", uidMiddleWear, decksRouter);
server.use("/api/cards", cardsRouter);
server.use("/api", (req, res) => {
  console.log("inside of server up message");
  return res.status(200).json({ message: "Server up and running" });
});

server.use("/", express.static(apiDocsPath));

module.exports = server;
