//REQUIREMENTS

const http = require("http");
const Https = require("https");
const Fs = require("fs");
const spawn = require("child_process").spawn; //Packet to spawn ffmpeg over a separate process
require("dotenv").config();

//SocketIo Server Declarations

const ip = process.env.SERVER_IP; //FlexDrone backend IP
const port = process.env.SERVER_PORT;//Port for Socket.io connection between frontend and backend
const port2 = process.env.ANDROID_SERVER_PORT//Port for Socket.io connection between backend and Android UX app
const KEY_LOCATION = process.env.KEY_LOCATION//Location for HTTPS certificates key.pem file
const CERT_LOCATION = process.env.CERT_LOCATION//Location for HTTPS certificates cert.pem file

//FRONTEND-BACKEND Socket.io connection server

const server = Https.createServer({
  key: Fs.readFileSync(KEY_LOCATION),
  cert: Fs.readFileSync(CERT_LOCATION),
});

server.on("request", (req, res) => {

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Certificates accepted. You may now return to the FlexDrone panel.");
});

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

server.listen(port, ip, () => {
  console.log(`Server running at https://${ip}:${port}/`);
});

//BACKEND-ANDROID Socket.io connection server

const server2 = http.createServer(function (req, res) {
 
})

const io2 = require("socket.io")(server2, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});


server2.listen(port2, ip, () => {
  console.log(`Server running at http://${ip}:${port2}/`);
});

//UTILITY VARIABLE DECLARATIONS

var FLAG_ASDK_ONLINE = false;
var ANDROID_IP = process.env.ANDROID_IP

//Function for transmitting status messages to client

function printStatus(msg){
  console.log(msg)
  io.emit("msg", msg)
}

//SOCKET.IO LISTENERS

//FRONTEND-BACKEND listeners
io.on("connection", (socket) => {
  console.log("A user has connected with id " + socket.id);
  io.emit("addresses", {android: ANDROID_IP});
  io.emit("msg", "Connection with FlexDrone server established.");

  socket.on("uxcommand", (command) => {
    if (FLAG_ASDK_ONLINE == true){
    console.log(`Command ${command} received. Sending to app.`)
    io2.emit("gimbalcommand", command)
  } else {
    io.emit("msg", "The command could not be sent: no connection with UX app");
    console.log(`Command ${command} received but there is no connection to UX app.`)
  }
  });

  socket.on("disconnect", () => {
    console.log("A user has disconnected");
  });
});


//BACKEND-ANDROID listeners

io2.on("connection", (socket2) => {

  printStatus("UX app has connected with id " + socket2.id);
  io2.emit("msg", "Connection with FlexDrone server established.");
  io2.emit("uxconnection")
  FLAG_ASDK_ONLINE = true;

  socket2.on("uxmsg", (msg) => {
    printStatus(msg)
  });

  socket2.on("disconnect", () => {
    printStatus("UX app has disconnected");
    FLAG_ASDK_ONLINE = false
  });
});
