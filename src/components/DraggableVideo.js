import React, { Component, component } from "react";
import $ from "jquery";
import io from "socket.io-client";
import Iframe from "react-iframe";
export default class DraggableVideo extends Component {

  componentDidMount() {

    var SOCKET_IP = this.props.SOCKET_IP
    var SOCKET_PORT = this.props.SOCKET_PORT

    const socket = io(`https://${SOCKET_IP}:${SOCKET_PORT}`)
    var lastX, lastY;

    var $box = $("#video-canvas");
    $box.css("cursor", "move");

    var flag_move = false;
    var lastDirection = "none";
    var direction = "";
    var oldx = 0;
    var oldy = 0;

    //Functions that control mouse drag and send command to UX app
    const mousemovemethod = (e) => {

      $box.css("cursor", "grab");

      if (e.pageX > oldx && e.pageY == oldy) {
        if (
          flag_move === false
        ) {
          flag_move = true;
          direction = "right";
          console.log(direction);
          socket.emit("uxcommand", "RIGHT");
        }
      } else if (e.pageX == oldx && e.pageY > oldy) {
        if (
          flag_move === false
        ) {
          flag_move = true;
          direction = "down";
          console.log(direction);
          socket.emit("uxcommand", "DOWN");
        }
      } else if (e.pageX == oldx && e.pageY < oldy) {
        if (
          flag_move === false
        ) {
          flag_move = true;
          direction = "up";
          console.log(direction);
          socket.emit("uxcommand", "UP");
        }
      } else if (e.pageX < oldx && e.pageY == oldy) {
        if (
          flag_move === false
        ) {
          flag_move = true;
          direction = "left";
          console.log(direction);
          socket.emit("uxcommand", "LEFT");
        }
      }
      oldx = e.pageX;
      oldy = e.pageY;

      lastDirection = direction;
    };

    // $box.on("wheel", function (e) {
    //   var delta = e.originalEvent.deltaY / Math.abs(e.originalEvent.deltaY);
    //   if (delta == -1) {
    //     socket.emit("uxcommand", "zoomin");
    //   }
    //   else {
    //     socket.emit("uxcommand", "zoomout");
    //   }
    // });

    $box.on("touchstart mousedown", function (e) {
      $box.on("touchmove mousemove", mousemovemethod);
    });

    $box.on("touchend mouseup", function (e) {
      $box.off("touchend mousemove", mousemovemethod);
      $box.css("cursor", "move");
      //console.log("ready");
      socket.emit("uxcommand", "STOP");
      flag_move = false;
      lastDirection = "";
    });
  }

  render() {

    const ANDROID_IP = this.props.ANDROID_IP;
    // console.log("COMPONENT ANDROID IP", ANDROID_IP);
    return (
      <div className="iframe-container">
        <img
          src="http://172.20.85.253:8080/stream.mjpeg"
          className="responsive-iframe"
          style={{ zIndex: "0" }}
        />
        <div className="responsive-iframe border " 
          onMouseDown={this.handleEvent}
          onMouseUp={this.handleEvent}
          onDrag={this.handleDrag}
          id="video-canvas"
          style={{ zIndex: "99" }}
        >
        </div>
      </div>
    );
  }
}
