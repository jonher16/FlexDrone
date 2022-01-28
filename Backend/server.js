//REQUIREMENTS

const http = require('http'); //Require http to create a http server
const dgram = require('dgram'); //Packet to interact via UDP on Node.js
const wait = require('waait'); //Packet for waiting an amount of time
const commandDelays = require('./commandDelays'); //File with all the Tello command delays
const socketIo = require("socket.io"); //Packet to send commands over SocketIo
const WebSocket = require('ws'); //Packet to send video over WebSocket
const spawn = require('child_process').spawn; //Packet to spawn ffmpeg over a separate process


//SocketIo Server Declarations

const hostname = '127.0.0.1';
const port = 4001;
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('SocketIo Server');
});
const io = socketIo(server);

//Tello Declarations

const PORT_CONTROL = 8889;
const PORT_TELEMETRY = 8890;
const DRONE_HOST = '192.168.10.1';

const drone = dgram.createSocket('udp4');
drone.bind(PORT_CONTROL);

const telemetry = dgram.createSocket('udp4');
telemetry.bind(PORT_TELEMETRY);

function handleError(err) {
  if(err){
      console.log("ERROR");
      console.log(err);
  }
}



//Tello Commands SocketIO Communication
io.on("connection", (socket) => {

  console.log("A user has connected")
  io.emit("welcome", "Welcome, new user");
  drone.send('command', 0, 7, PORT_CONTROL, DRONE_HOST, handleError);
  drone.send("battery?", 0, 8, PORT_CONTROL, DRONE_HOST, handleError);
drone.on('message', message => {
  console.log(`Message from Drone: ${message}`)
  io.emit("welcome", `Message from Drone: ${message}`);
});
  
  socket.on("comando", (comando) => {
    io.emit("comando_py", `Comando ${comando} recibido`)
    console.log("Comando " + comando + " recibido.")
    process.stdout.write(comando + '\n')
    io.emit("welcome", `Comando ${comando} recibido`);
    drone.send(comando, 0, comando.length, PORT_CONTROL, DRONE_HOST, handleError);
    });

  socket.on("disconnect", () => {
    console.log("A user has disconnected")
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

//Tello Commands Telemetry Communication
telemetry.on('message', message => { //MESSAGE ---> "battery:90;height:50"
let arrayTel= [];
arrayTel = `${message}`.split(";").map(x=> x.split(":")) // arraytel = [["battery", "90"],["height":"50"]]
var telemetry = new Object();
for(let i=0; i<arrayTel.length-1; i++){
  telemetry[arrayTel[i][0]] = arrayTel[i][1]; //OUTPUT: telemetry {battery: "90", height: "50"}
}
io.emit("telemetry", telemetry);
});

//Tello Video Stream

const STREAM_PORT = 3001
const streamServer = http.createServer(function(request, response) {

  // Log that a stream connection has come through
  console.log(
		'Stream Connection on ' + STREAM_PORT + ' from: ' + 
		request.socket.remoteAddress + ':' +
		request.socket.remotePort
	);

  // When data comes from the stream (FFmpeg) we'll pass this to the web socket
  request.on('data', function(data) {
    // Now that we have data let's pass it to the web socket server
    webSocketServer.broadcast(data);
  });

}).listen(STREAM_PORT); // Listen for streams on port 3001

//3. Begin web socket server

const webSocketServer = new WebSocket.Server({
  server: streamServer
});

// Broadcast the stream via websocket to connected clients
webSocketServer.broadcast = function(data) {
  webSocketServer.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

// Send streamon
drone.send("streamon", PORT_CONTROL, DRONE_HOST, null);

//5. Begin the ffmpeg stream. You must have Tello connected first
// Delay for 3 seconds before we start ffmpeg

setTimeout(function() {
  var args = [
    "-i", "udp://0.0.0.0:11111",
    "-r", "30",
    "-s", "960x720",
    "-codec:v", "mpeg1video",
    "-b", "800k",
    "-f", "mpegts",
    "http://127.0.0.1:3001/stream",
  ];

  // Spawn an ffmpeg instance
  var streamer = spawn('ffmpeg', args);

  // Uncomment if you want to see ffmpeg stream info
  // streamer.stderr.pipe(process.stderr);
  // streamer.on("exit", function(code){
  //     console.log("Failure", code);
  // });
}, 3000);
