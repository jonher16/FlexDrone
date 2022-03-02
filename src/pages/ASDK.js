import React from "react";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import "../App.scss";

const ASDK = ({ socket }) => {
  
    const handleCommand = (e, command) => {
        e.preventDefault()
        socket.emit("uxcommand", command)
        console.log("Sending command", command)
    }
    
  return <div>
      <Button onClick={(e)=>handleCommand(e, "GIMBALUP")}>Send command</Button>
  </div>;
};

export default ASDK;
