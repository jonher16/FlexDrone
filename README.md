# FlexDrone

Bachellor's Thesis Project on Drone & Sensor management system.
The aim of the project is to have as many drone modules as possible. Each module will allow the user to interact with the connected drone.

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

## Configuration

### TELLO MODULE
The IP address of the server can be easily changed in the .env files, located in both Backend and src folders.
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

### ASDK module

For the ASDK module, you have to enable HTTPS. Go to frontend environment file and change HTTPS to true
The file corresponding to ASDK server is server.js. In order to run it, execute:
```node server.js```




