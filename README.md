# FlexDrone

Bachellor's Thesis Project on Drone & Sensor management system.
Aims to support as many drone models possible to be able to control their movements, accessories and get data.

### Supported
- DJI Ryze Tello: Drone control (Buttons + Keyboard), data, video
- DJI ASDK compatible drones (Tested on Matrice300RTK) : Gimbal control and video

## Installation

Install dependencies in both frontend and backend.

```
cd flexdrone
npm install
cd Backend
npm install
```

The machine where FlexDrone is deployed needs to have ffmpeg installed.
For linux machines:

```sudo apt install ffmpeg```

## Architecture

Currently, the architecure of the system is the following one:

- serverTello.js ---> HTTP Socket.IO server the frontend Tello module connects to.
- server.js ---> 
  - HTTPS Socket.IO server the frontend ASDK module connects to.
  - HTTP Socket.IO server the UX SDK module connects to.

Firstly both server files were merged into one, but due to the fact that the tello module is a test module (and has no commercial interest) it was decided to put it apart. 

On the other hand, the server.js itself has 2 Socket.IO servers, 1 mounted over HTTPS and the other one over HTTP. This helps us with two aspects:

1. Distinguish between a frontend client and the UX app (clients connect to the HTTPS server while the app connects to HTTP server)
2. Difficulty of connecting UX app to a Socket.IO server over HTTPS. It definitely can be done but this is a decent temporary solution.

The reason to use HTTPS on the frontend Socket.io instance is because frontend is aimed to be included in a HTTPS web service. If the frontend Socket.io instance is left to HTTP, it shows an error on the HTTPS frontend on SSL security issue.

### TELLO module

For using the Tello module, please go to frontend environment file (/.env) and deactivate HTTPS, as well as change server IP to localhost :
```
GENERATE_SOURCEMAP=false
HTTPS=false
REACT_APP_FLEXDRONE_IP=localhost
REACT_APP_FLEXDRONE_PORT=6001
```
Then go to backend .env file (Backend/.env) and make sure you have the same server IP and PORT configured.

The file corresponding to the Tello server is serverTello.js. In order to run it, execute:
```node serverTello.js```

The IP address of the server can be easily changed in the .env files, located in both Backend and src folders.

### ASDK module

For the ASDK module, you have to enable HTTPS in the frontend. In order to do that, go to frontend environment file and change HTTPS to true.
The file corresponding to ASDK server is server.js. In order to run it, execute:
```node server.js```



