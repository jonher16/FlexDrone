import React from "react";
import "../App.scss";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import Data from "../components/Data";
import Graph from "../components/Graph";
import { Tab } from "bootstrap";
import Tabs from "react-bootstrap/esm/Tabs";
import Video from "../components/Video";
import Control from "../components/Control";

const Tello = ({ socket, tellostatus }) => {

  const handleButton = (e, command) => {
    e.preventDefault();
    socket.emit("command", command);
    console.log(`Comando ${command} emitido`);
  };

  const handleStartConnection = (e) => {
    e.preventDefault();
    socket.emit("tellostart");
    setIsTelloActive(true);
  };

  const handleStopConnection = (e) => {
    e.preventDefault();
    socket.emit("tellostop");
    setIsTelloActive(false);
  };

  useEffect(() => {
    socket.on("msg", (msg) => console.log("From server -->", msg));
  }, []);

  useEffect(() => {
    console.log(tellostatus)
    setIsTelloActive(tellostatus)
  }, [tellostatus])
  

  const [telnames, setTelnames] = useState([]);
  const [telemetry, setTelemetry] = useState({
    pitch: [],
    roll: [],
    yaw: [],
    agx: [],
    agy: [],
    agz: [],
    vgx: [],
    vgy: [],
    vgz: [],
    bat: [],
    baro: [],
    h: [],
    time: [],
    templ: [],
    temph: [],
  });

  const [key, setKey] = useState("control");
  const [time, setTime] = useState([]);
  const [isTelloActive, setIsTelloActive] = useState(false);

  // useEffect(() => {
  //   console.log("Tello local var ", isTelloActive)
  // }, [isTelloActive])

  useEffect(() => {
    socket.on("telemetry", (msg) => {
      //console.log(msg);
      setTelnames(Object.keys(msg));
      delete telnames["tof"];
      var flag_max = false;
      var temp_telemetry = telemetry;
      var date = new Date();
      for (let x in temp_telemetry) {
        if (temp_telemetry[x.toString()].length >= 50) {
          temp_telemetry[x.toString()].shift();
          flag_max = true;
        }
        temp_telemetry[x.toString()].push(msg[x.toString()]);
      }
      setTelemetry(temp_telemetry);
      //console.log(flag_max)
      setTime((time) =>
        flag_max === false ? [...time, date] : time.shift() && [...time, date]
      );
    });
  }, []);

  //WASD Control

  const vel = 80;

  var flagW = false;
  var flagA = false;
  var flagS = false;
  var flagD = false;
  var flagQ = false;
  var flagE = false;
  var flagSL = false;
  var flagSpace = false;

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.code === "KeyW" && flagW === false) {
        console.log("W");
        socket.emit("command", `rc 0 ${vel} 0 0`);
        flagW = true;
      } else if (e.code === "KeyS" && flagS === false) {
        console.log("S");

        socket.emit("command", `rc 0 -${vel} 0 0`);
        flagS = true;
      } else if (e.code === "KeyA" && flagA === false) {
        console.log("A");
        socket.emit("command", `rc -${vel} 0 0 0`);
        flagA = true;
      } else if (e.code === "KeyD" && flagD === false) {
        console.log("D");
        flagD = true;

        socket.emit("command", `rc ${vel} 0 0 0`);
      } else if (e.code === "KeyQ" && flagQ === false) {
        console.log("Q");
        flagQ = true;
        socket.emit("command", `rc 0 0 0 -${vel} `);
      } else if (e.code === "KeyE" && flagE === false) {
        console.log("E");
        flagE = true;
        socket.emit("command", `rc 0 0 0 ${vel}`);
      } else if (e.code === "Space" && flagSpace === false) {
        console.log("Space");
        flagSpace = true;
        socket.emit("command", `rc 0 0 ${vel} 0`);
      } else if (e.code === "ShiftLeft" && flagSL === false) {
        console.log("ShiftLeft");
        flagSL = true;
        socket.emit("command", `rc 0 0 -${vel} 0`);
      }
    });

    document.addEventListener("keyup", (e) => {
      if (e.code === "KeyW") {
        console.log("No W");
        flagW = false;
        socket.emit("command", "rc 0 0 0 0");
      } else if (e.code === "KeyS") {
        console.log("No S");

        flagS = false;
        socket.emit("command", "rc 0 0 0 0");
      } else if (e.code === "KeyA") {
        console.log("No A");
        flagA = false;
        socket.emit("command", "rc 0 0 0 0");
      } else if (e.code === "KeyD") {
        console.log("No D");

        flagD = false;
        socket.emit("command", "rc 0 0 0 0");
      } else if (e.code === "KeyQ") {
        console.log("No Q");

        flagQ = false;
        socket.emit("command", "rc 0 0 0 0");
      } else if (e.code === "KeyE") {
        console.log("No E");

        flagE = false;
        socket.emit("command", "rc 0 0 0 0");
      } else if (e.code === "Space") {
        console.log("No Space");
        flagSpace = false;
        socket.emit("command", "rc 0 0 0 0");
      } else if (e.code === "ShiftLeft") {
        console.log("No ShiftLeft");
        flagSL = false;
        socket.emit("command", "rc 0 0 0 0");
      }
    });
  }, []);

  return (
    <>
      <div className="Tello">
        <script type="text/javascript" src="jsmpeg.min.js"></script>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
        >
          <Tab eventKey="control" title="Control">
            
            {isTelloActive ? (
              <Button
                style={{ width: "200px" }}
                className="ml-3 mt-3"
                onClick={(e) => handleStopConnection(e)}
              >
                Stop connection
              </Button>
            ) : (
              <Button
                style={{ width: "200px" }}
                className="ml-3 mt-3"
                onClick={(e) => handleStartConnection(e)}
              >
                Start connection
              </Button>
            )}
            <Control onClick={handleButton}/>
          </Tab>
          <Tab eventKey="data" title="Data">
            <Data telemetry={telemetry} />
          </Tab>
          <Tab eventKey="charts" width="100%" title="Charts">
            <Graph time={time} telemetry={telemetry} telnames={telnames} />
          </Tab>
          <Tab eventKey="video" className="tab_style" title="Video">
            <div className="d-flex flex-row justify-content-center">
            <Video />
            </div>
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default Tello;
