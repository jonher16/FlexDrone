import React from "react";
import { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Iframe from "react-iframe";
import "../App.scss";
import DraggableVideo from "../components/DraggableVideo";
import JSMpeg from "@cycjimmy/jsmpeg-player";
import GimbalControl from "../components/GimbalControl";

const ASDK = ({ socket, ANDROID_IP, SOCKET_IP, SOCKET_PORT }) => {

  useEffect(() => {
    socket.on("msg", (msg) => console.log("From server -->", msg));
  }, []);



  const handleCommand = (e, command) => {
    e.preventDefault();
    socket.emit("uxcommand", command);
    console.log("Sending command", command);
  };

  return (
    <div className="w-100">

      <DraggableVideo socket={socket} ANDROID_IP={ANDROID_IP} SOCKET_IP={SOCKET_IP} SOCKET_PORT={SOCKET_PORT}/>
      {/* <GimbalControl onClick={handleCommand} width="100%" /> */}
     
      
    </div>
  );
};

export default ASDK;
