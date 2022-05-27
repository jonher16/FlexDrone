import React from "react";
import { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Iframe from "react-iframe";
import "../App.scss";
import DraggableVideo from "../components/DraggableVideo";
import JSMpeg from "@cycjimmy/jsmpeg-player";
import GimbalControl from "../components/GimbalControl";

const ASDK = ({ socket, ANDROID_IP, SOCKET_IP, SOCKET_PORT, ANDROID_FFMPEG_PORT }) => {

  const FLEXDRONE_IP = process.env.REACT_APP_FLEXDRONE_IP;

  useEffect(() => {
    socket.on("msg", (msg) => console.log("From server -->", msg));
  }, []);

  // const handleCommand = (e, command) => {
  //   e.preventDefault();
  //   socket.emit("uxcommand", command);
  //   console.log("Sending command", command);
  // };

  useEffect(() => {
    if (ANDROID_FFMPEG_PORT){
      var videoUrl = `wss://${FLEXDRONE_IP}:${ANDROID_FFMPEG_PORT}/stream`;
      var player = new JSMpeg.VideoElement("#video-canvas", videoUrl, {
        autoplay: true,
      });
      console.log(player);}
  }, []);

  const handleRestart = (e) => {
    e.preventDefault();
    socket.emit("restartstream")
    console.log("Sending restart stream")
  }

  return (
    <div className="w-100">
      <Button className="floating_button" onClick={e=>handleRestart(e)}>Restart stream</Button>
      <DraggableVideo socket={socket} ANDROID_IP={ANDROID_IP} SOCKET_IP={SOCKET_IP} SOCKET_PORT={SOCKET_PORT}/>
      {/* <GimbalControl onClick={handleCommand} width="100%" /> */}
      {/* <Button onClick={e=>handleStream(e)}>Start stream</Button> */}
      
    </div>
  );
};

export default ASDK;
