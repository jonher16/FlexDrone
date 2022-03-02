# FlexDrone

Bachellor's Thesis Project on Drone & Sensor management system.
The aim of the project is to have as many drone modules as possible. Each module will allow the user to interact with the connected drone.

## Drone support

### Supported
- DJI Ryze Tello: Drone control (Buttons + Keyboard), data, video
### Planned to be supported
- All drones supported by DJI Android SDK (Main focus on DJI Matrice 300 RTK): Gimbal control and video

## Installation

First, install dependencies in both frontend and backend.

```
cd flexdrone
npm install
cd Backend
npm install
```
The IP address of the server can be easily changed in the .env files, located in both Backend and src folders.

The machine where FlexDrone is deployed needs to have ffmpeg installed.
For linux machines:

```sudo apt install ffmpeg```


