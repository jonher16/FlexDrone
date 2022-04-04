///Backend/server.js

//REQUIREMENTS

const http = require("http"); //Require http to create a http server
const dgram = require("dgram"); //Packet to interact via UDP on Node.js
const wait = require("waait"); //Packet for waiting an amount of time
const socket = require("socket.io"); //Packet to send commands over SocketIo
const WebSocket = require("ws"); //Packet to send video over WebSocket
const { NONAME } = require("dns");
const spawn = require("child_process").spawn; //Packet to spawn ffmpeg over a separate process
require("dotenv").config();

//SocketIo Server Declarations

const ip = process.env.SERVER_IP;
const port = 4001;
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Socket.io server");
});

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

const TELLO_HOST = "192.168.10.1";
let FLAG_TELLO_ONLINE = false;
let FLAG_TELLO_STREAM = false;
var stream;

const PORT_CONTROL = 8889;
const PORT_TELEMETRY = 8890;

var FLAG_ASDK_ONLINE = false;

var drone;
var telemetry;

//TELLO VIDEO STREAM SERVER

const STREAM_PORT = 3001;
const streamServer = http
  .createServer(function (request, response) {
    // Log that a stream connection has come through
    console.log(
      "Stream Connection on " +
        STREAM_PORT +
        " from: " +
        request.socket.remoteAddress +
        ":" +
        request.socket.remotePort
    );

    // When data comes from the stream (FFmpeg) we'll pass this to the web socket
    request.on("data", function (data) {
      // Now that we have data let's pass it to the web socket server
      webSocketServer.broadcast(data);
    });
  })
  .listen(STREAM_PORT); // Listen for streams on port 3001

//3. Begin web socket server

const webSocketServer = new WebSocket.Server({
  server: streamServer,
});

// Broadcast the stream via websocket to connected clients
webSocketServer.broadcast = function (data) {
  webSocketServer.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

//Main function to start UDP sockets, send "command" and "battery" to drone and start video stream
function startTello() {
  printStatus("Starting Tello connection");
  drone = dgram.createSocket("udp4");
  telemetry = dgram.createSocket("udp4");
  drone.bind(PORT_CONTROL);
  telemetry.bind(PORT_TELEMETRY);
  printStatus(`Drone UDP socket started at port ${PORT_CONTROL}`)
  printStatus(`Telemetry UDP socket started at port ${PORT_TELEMETRY}`)
  FLAG_TELLO_ONLINE = true;
  sendStartCommand();

  drone.on("message", (message) => {
    printStatus(`Message from Drone: ${message}`)
  });
  telemetry.on("message", (message) => {
    //MESSAGE ---> "battery:90;height:50"
    let arrayTel = [];
    arrayTel = `${message}`.split(";").map((x) => x.split(":")); // arraytel = [["battery", "90"],["height":"50"]]
    var telemetry = new Object();
    for (let i = 0; i < arrayTel.length - 1; i++) {
      telemetry[arrayTel[i][0]] = arrayTel[i][1]; //OUTPUT: telemetry {battery: "90", height: "50"}
    }
    io.emit("telemetry", telemetry);
  });
  startTelloStream()
}

//Functions for handling errors

function handleError(err) {
  if (err) {
    console.log("ERROR");
    console.log(err);
  }
}
function handleStart(err) {
  if (err) {
    console.log("START ERROR.");
    console.log(err);
  } else {
    printStatus("<Command> command sent successfully");
  }
}

//Function for transmitting status messages to client

function printStatus(msg){
  console.log(msg)
  io.emit("msg", msg)
}

//Function for starting video stream
function startTelloStream() {
  FLAG_TELLO_STREAM = true;
  var test = true
  if (test === true){
  drone.send("streamon", PORT_CONTROL, TELLO_HOST, null);
  }
  test = false
  printStatus("Starting Tello stream...");
  //5. Begin the ffmpeg stream. You must have Tello connected first
  // Delay for 3 seconds before we start ffmpeg
  setTimeout(function () {
    var args = [
      "-i",
      "udp://0.0.0.0:11111",
      "-r",
      "30",
      "-s",
      "960x720",
      "-codec:v",
      "mpeg1video",
      "-b",
      "800k",
      "-f",
      "mpegts",
      `http://${ip}:3001/stream`,
    ];

    // Spawn an ffmpeg instance

    stream = spawn("ffmpeg", args);
    printStatus("Tello stream started.")
    // Uncomment if you want to see ffmpeg stream info
    // streamer.stderr.pipe(process.stderr);
    // streamer.on("exit", function(code){
    //     console.log("Failure", code);
    // });
  }, 1000);
  
}

//Function for killing video stream

function killTelloStream() {
  stream.kill("SIGINT");
  printStatus("Tello stream closed.");
}

//Function to send "command" and "battery" commands every 20 secs

var timeout;

function sendStartCommand() {
  drone.send("command", 0, 7, PORT_CONTROL, TELLO_HOST, handleStart);
  drone.send("battery?", 0, 8, PORT_CONTROL, TELLO_HOST, handleError);
  timeout = setTimeout(sendStartCommand, 20000);
}

function stopTello(){
  printStatus("Stoping Tello connection")
  killTelloStream()
  clearTimeout(timeout)
  drone.close()
  telemetry.close()
  printStatus(`Drone UDP socket closed at port ${PORT_CONTROL}`);
  printStatus(`Telemetry UDP socket closed at port ${PORT_TELEMETRY}`);
  FLAG_TELLO_ONLINE = false
}

//SOCKET.IO LISTENERS

io.on("connection", (socket) => {
  console.log("A user has connected with id " + socket.id);
  io.emit("msg", "Welcome, new user");
  if(FLAG_TELLO_ONLINE === true){
    io.emit("tellostatus", true);
  } else {
    io.emit("tellostatus", false);
  }
  socket.on("tellostart", () => {
    startTello();
    io.emit("tellostatus", true)
  });
  socket.on("tellostop", () => {
    stopTello();
    io.emit("tellostatus", false)
  });

  socket.on("command", (command) => {
    
    if (FLAG_TELLO_ONLINE === true) {
      printStatus("Comando " + command + " recibido.");
      process.stdout.write(command + "\n");
      drone.send(
        command,
        0,
        command.length,
        PORT_CONTROL,
        TELLO_HOST,
        handleError
      );
    }
  });
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
