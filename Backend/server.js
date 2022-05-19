///Backend/server.js

//REQUIREMENTS

const http = require("http"); //Require http to create a http server
const Https = require("https");
const Fs = require("fs");
const spawn = require("child_process").spawn; //Packet to spawn ffmpeg over a separate process
require("dotenv").config();

//SocketIo Server Declarations

const ip = process.env.SERVER_IP;
const port = process.env.SERVER_PORT;
const KEY_LOCATION = process.env.KEY_LOCATION
const CERT_LOCATION = process.env.CERT_LOCATION

// const server = Https.createServer({
//   key: Fs.readFileSync(KEY_LOCATION),
//   cert: Fs.readFileSync(CERT_LOCATION),
// });

// server.on("request", (req, res) => {

//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/plain");
//   res.end("Certificates accepted. You may now return to the FlexDrone panel.");
// });

const server = http.createServer(function (req, res) {
 
  })

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

server.listen(port, ip, () => {
  console.log(`Server running at http://${ip}:${port}/`);
});

//VARIABLE DECLARATIONS

var FLAG_ASDK_ONLINE = false;
var ANDROID_IP = process.env.ANDROID_IP

//Function for transmitting status messages to client

function printStatus(msg){
  console.log(msg)
  io.emit("msg", msg)
}

//SOCKET.IO LISTENERS

io.on("connection", (socket) => {
  console.log("A user has connected with id " + socket.id);
  io.emit("addresses", {android: ANDROID_IP});
  io.emit("msg", "Connection with FlexDrone server established.");

  socket.on("uxmsg", (msg) => {
    printStatus(msg)
  });

  socket.on("uxcommand", (command) => {
    console.log(`Command ${command} received. Sending to app.`)
    io.emit("gimbalcommand", command)
  });

  socket.on("uxconnection", (msg) => {
    io.emit("msg","UX app connected.");
    FLAG_ASDK_ONLINE = true;
    console.log(msg)
    io.emit("uxconnection")
  });

  socket.on("disconnect", () => {
    console.log("A user has disconnected");
  });
});
