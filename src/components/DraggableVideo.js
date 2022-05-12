import React, { Component, component } from "react";
import $ from "jquery";
import io from "socket.io-client";
import Iframe from "react-iframe";
export default class DraggableVideo extends Component {

  componentDidMount() {

    var SOCKET_IP = this.props.SOCKET_IP
    var SOCKET_PORT = this.props.SOCKET_PORT
    console.log("COMPONENT SOCKET IP", SOCKET_IP, SOCKET_PORT)

    const socket = io(`http://${SOCKET_IP}:${SOCKET_PORT}`)
    console.log("Camera controller connected to socket")
    var lastX, lastY;

    var $box = $("#video-canvas");
    console.log("ready");
    $box.css("cursor", "move");


    var flag_move = false;
    var lastDirection = "none";
    var direction = "";
    var oldx = 0;
    var oldy = 0;

    const mousemovemethod = (e) => {
      $box.css("cursor", "grab");
      // console.log("lastDirection", lastDirection);
      // console.log("flag ", flag_move);
      // console.log(oldx, oldy);
      // console.log(e.pageX, e.pageY);

      if (e.pageX > oldx && e.pageY == oldy) {
        if (
          flag_move === false
          // || (flag_move === true && lastDirection !== "right")
        ) {
          flag_move = true;
          direction = "right";
          console.log(direction);
          socket.emit("uxcommand", "RIGHT");
        }
      } else if (e.pageX == oldx && e.pageY > oldy) {
        if (
          flag_move === false
          // || (flag_move === true && lastDirection !== "down")
        ) {
          flag_move = true;
          direction = "down";
          console.log(direction);
          socket.emit("uxcommand", "DOWN");
        }
      } else if (e.pageX == oldx && e.pageY < oldy) {
        if (
          flag_move === false
          // || (flag_move === true && lastDirection !== "up")
        ) {
          flag_move = true;
          direction = "up";
          console.log(direction);
          socket.emit("uxcommand", "UP");
        }
      } else if (e.pageX < oldx && e.pageY == oldy) {
        if (
          flag_move === false
          // || (flag_move === true && lastDirection !== "left")
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

    $box.on("wheel", function (e) {
      var delta = e.originalEvent.deltaY / Math.abs(e.originalEvent.deltaY);
      //console.log(delta)
      if (delta == -1) {
        //console.log("up")
        socket.emit("uxcommand", "zoomin");
      } // going up
      else {
        socket.emit("uxcommand", "zoomout");
      }
    });

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
    console.log("COMPONENT ANDROID IP", ANDROID_IP);
    return (
      <div className="iframe-container">
      <iframe
          src={`http://${ANDROID_IP}:8080`}
          className="responsive-iframe"
          style={{zIndex: "0"}}
        />
        <div className="responsive-iframe border " onMouseDown={this.handleEvent}
          onMouseUp={this.handleEvent}
          onDrag={this.handleDrag}
          id="video-canvas"
          style={{zIndex: "99"}}
          >
      </div>
      </div>
    );
  }
}
