//REQUIREMENTS

const http = require("http");
const Https = require("https");
const Fs = require("fs");
const spawn = require("child_process").spawn; //Packet to spawn ffmpeg over a separate process
require("dotenv").config();
const WebSocketServer = require("ws").Server;
const WebSocket = require("ws"); //Packet to send video over WebSocket

//SocketIo Server Declarations

const SERVER_IP = process.env.SERVER_IP; //FlexDrone backend IP
const SERVER_PORT = process.env.SERVER_PORT; //Port for Socket.io connection between frontend and backend
const ANDROID_SERVER_PORT = process.env.ANDROID_SERVER_PORT //Port for Socket.io connection between backend and Android UX app
const KEY_LOCATION = process.env.KEY_LOCATION //Location for HTTPS certificates key.pem file
const CERT_LOCATION = process.env.CERT_LOCATION //Location for HTTPS certificates cert.pem file
const ANDROID_IP = process.env.ANDROID_IP
const ANDROID_FFMPEG_PORT = process.env.ANDROID_FFMPEG_PORT

var FLAG_ASDK_ONLINE = false;


//FRONTEND-BACKEND Socket.io connection server

const server = Https.createServer({
    key: Fs.readFileSync(KEY_LOCATION),
    cert: Fs.readFileSync(CERT_LOCATION),
});

server.on("request", (req, res) => { //What the server returns on a request

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Certificates accepted. You may now return to the FlexDrone panel."); //If there's a Socket.io connection error, most likely you'll need to do a request on this SERVER_PORT and accept certificates until you get this message
});

const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

server.listen(SERVER_PORT, SERVER_IP, () => {
    console.log(`Frontend-Backend connection server running at https://${SERVER_IP}:${SERVER_PORT}/`);
});

//BACKEND-ANDROID Socket.io connection server

const android_server = http.createServer(function(req, res) {

})

const android_io = require("socket.io")(android_server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

android_server.listen(ANDROID_SERVER_PORT, SERVER_IP, () => {
    console.log(`Backend-Android server running at http://${SERVER_IP}:${ANDROID_SERVER_PORT}/`);
});

//Function for transmitting status messages to client

function printStatus(msg) {
    console.log(msg)
    io.emit("msg", msg)
}

//STREAM

const StreamServer = Https.createServer({
    key: Fs.readFileSync(KEY_LOCATION),
    cert: Fs.readFileSync(CERT_LOCATION),
}); //Server to host the stream

StreamServer
    .on("request", (req, res) => {
        console.log(
            "Stream Connection on " +
            ANDROID_FFMPEG_PORT +
            " from: " +
            req.socket.remoteAddress +
            ":" +
            req.socket.remotePort
        );

        req.on("data", function(data) {
            // Now that we have data let's pass it to the web socket server
            webSocketServer.broadcast(data);
        });
    })
    .listen(ANDROID_FFMPEG_PORT);

//3. Begin web socket server

const webSocketServer = new WebSocketServer({
    server: StreamServer,
});

// Broadcast the stream via websocket to connected clients
webSocketServer.broadcast = function(data) {
    webSocketServer.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
};

var stream, pid;

setTimeout(function() { //Start stream after 3s
    var args = [
        "-i",
        `http:${ANDROID_IP}:8080/stream.mjpeg`,
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
        `https://127.0.0.1:${ANDROID_FFMPEG_PORT}/stream`,
    ];

    // Spawn an ffmpeg instance
    try {
        stream = spawn("ffmpeg", args);
        pid = stream.pid;
        io.emit("msg", "Stream started.");
        console.log("Stream started.");
        //Uncomment if you want to see ffmpeg stream info
        // stream.stderr.pipe(process.stderr);
        // stream.on("exit", function (code) {
        //   console.log("Failure", code);
        // });
    } catch (error) {
        io.emit("msg", error);
        console.log(error);
    }
}, 3000);




//SOCKET.IO LISTENERS

//FRONTEND-BACKEND listeners
io.on("connection", (socket) => {

    console.log("A user has connected with id " + socket.id);
    io.emit("addresses", { android_ip: ANDROID_IP, android_ffmpeg_port: ANDROID_FFMPEG_PORT }); //Send info about android app to client
    io.emit("msg", "Connection with FlexDrone server established.");
    socket.on("uxcommand", (command) => { //Socket.io channel for recieving commands from the client
        if (FLAG_ASDK_ONLINE === true) {
            console.log(`Command ${command} received. Sending to app.`)
            android_io.emit("gimbalcommand", command) //Socket.io channel for sending commands to the UX app
        } else {
            io.emit("msg", "The command could not be sent: no connection with UX app"); //Send to client in case thee is no connection to UX app
            console.log(`Command ${command} received but there is no connection to UX app.`)
        }
    });

    socket.on("restartstream", () => {
        try {
            io.emit("msg", "Stream closed. Restarting stream...");
            process.kill(pid, "SIGINT");
            console.log("Stream closed.");
        } catch (error) {
            console.log(error);
            io.emit("msg", error);
        }
        setTimeout(function() { //Start stream after 3s
            var args = [
                "-i",
                `http:${ANDROID_IP}:8080/stream.mjpeg`,
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
                `https://127.0.0.1:${ANDROID_FFMPEG_PORT}/stream`,
            ];

            // Spawn an ffmpeg instance
            try {
                stream = spawn("ffmpeg", args);
                pid = stream.pid;
                io.emit("msg", "Stream started.");
                console.log("Stream started.");
                //Uncomment if you want to see ffmpeg stream info
                // stream.stderr.pipe(process.stderr);
                // stream.on("exit", function (code) {
                //   console.log("Failure", code);
                // });
            } catch (error) {
                io.emit("msg", error);
                console.log(error);
            }
        }, 3000);
    });

    socket.on("disconnect", () => {
        console.log("A user has disconnected");
    });
});



//BACKEND-ANDROID listeners

android_io.on("connection", (android_socket) => {

    printStatus("UX app has connected with id " + android_socket.id);
    android_io.emit("msg", "Connection with FlexDrone server established."); //Send to client whenever there is a connection from UX app
    android_io.emit("uxconnection") //Send to UX app for it to know there is a connection with server
    FLAG_ASDK_ONLINE = true;

    android_socket.on("uxmsg", (msg) => {
        printStatus(msg)
    });

    android_socket.on("disconnect", () => {
        printStatus("UX app has disconnected");
        FLAG_ASDK_ONLINE = false
    });
});