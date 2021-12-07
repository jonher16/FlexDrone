import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import socketIOClient from "socket.io-client";
import Button from "react-bootstrap/Button";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import Plot from 'react-plotly.js'
import { Tab } from "bootstrap";
import Tabs from 'react-bootstrap/Tabs'

const ENDPOINT = "http://127.0.0.1:4001";
const socket = io(ENDPOINT);
var t = 0;

function App() {

  const [key, setKey] = useState('home');

  const [telemetry, setTelemetry] = useState()
  const [temp, setTemp] = useState([])
  const [valueno, setValueno] = useState([])

  const handleButton = (e, comando) => {
    e.preventDefault();
    socket.emit("comando", comando);
    console.log(`Comando ${comando} emitido`);
  };

  useEffect(() => {
    socket.on("welcome", (msg) => console.log(msg));
  }, []);

  useEffect(() => {
    socket.on("telemetry", (msg) => {
      //console.log(msg);
      setTelemetry(msg)
      var avgtemp = (msg.temph - 32) *5/9
      setTemp( temp =>[...temp, avgtemp])
      setValueno(valueno => [...valueno, t])
      t++;
    });
  }, []);

useEffect(() =>console.log(temp), [temp])


//WASD Control

const vel = 40;

const [rightPressed, setRightPressed] = useState(false)
const [leftPressed, setLeftPressed] = useState(false)
const [upPressed, setUpPressed] = useState(false)
const [downPressed, setDownPressed] = useState(false)
const [QPressed, setQPressed] = useState(false)
const [EPressed, setEPressed] = useState(false)

var flagW = false;
var flagA = false;
var flagS = false;
var flagD = false;
var flagQ = false;
var flagE = false;
useEffect(() => {
  document.addEventListener('keydown', (e) => {

      if (e.code === 'KeyW' && flagW === false) {
        console.log("W")
        setUpPressed(true)
        socket.emit("comando", `rc 0 ${vel} 0 0`);
        flagW = true
      }
      else if (e.code === 'KeyS' && flagS === false) {
        console.log("S")
        setDownPressed(true)
        socket.emit("comando", `rc 0 -${vel} 0 0`);
        flagS = true
      }
      else if (e.code === 'KeyA' && flagA === false) {
        setLeftPressed(true)
        console.log("A")
        socket.emit("comando", `rc -${vel} 0 0 0`);
        flagA = true
      }
      else if (e.code === 'KeyD' && flagD === false) {
        console.log("D")
        flagD = true
        setRightPressed(state => true)
        socket.emit("comando", `rc ${vel} 0 0 0`);
      }

      else if (e.code === 'KeyQ' && flagQ === false) {
        console.log("Q")
        flagQ = true
        setQPressed(state => true)
        socket.emit("comando", `rc 0 0 ${vel} 0`);
      }

      else if (e.code === 'KeyE' && flagE === false) {
        console.log("E")
        flagE = true
        setEPressed(state => true)
        socket.emit("comando", `rc 0 0 -${vel} 0`);
      }
  })

  document.addEventListener('keyup', (e) => {

    if (e.code === 'KeyW') {
      console.log("No W")
      setUpPressed(false)
      flagW = false;
      socket.emit("comando", "rc 0 0 0 0");
    }
    else if (e.code === 'KeyS') {
      console.log("No S")
      setDownPressed(false)
      flagS = false;
      socket.emit("comando", "rc 0 0 0 0");
    }
    else if (e.code === 'KeyA') {
      setLeftPressed(false)
      console.log("No A")
      flagA = false;
      socket.emit("comando", "rc 0 0 0 0");
    }
    else if (e.code === 'KeyD') {
      console.log("No D")
      setRightPressed(false)
      flagD = false;
      socket.emit("comando", "rc 0 0 0 0");
    }

    else if (e.code === 'KeyQ') {
      console.log("No Q")
      setQPressed(false)
      flagQ = false;
      socket.emit("comando", "rc 0 0 0 0");
    }

    else if (e.code === 'KeyE') {
      console.log("No E")
      setEPressed(false)
      flagE = false;
      socket.emit("comando", "rc 0 0 0 0");
    }
})
}, [])

  return (
    <>
      <div className="App">
        <h1>FlexDrone</h1>
        <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="home" title="Home">
      <div className="d-inline-flex p-2 border w-100 d-flex-row justify-content-center">
          <div className="border w-50 mt-4 d-flex-column justify-content-center">
            <div className="mx-auto w-25 d-flex justify-content-around">
              <Button
                style={{ width: "90px" }}
                onClick={(e) => handleButton(e, "takeoff")}
              >
                Takeoff
              </Button>
              <Button
                style={{ width: "90px" }}
                onClick={(e) => handleButton(e, "land")}
              >
                Land
              </Button>
            </div>
            <div className="mx-auto w-25 d-flex justify-content-around mt-5">
              <Button
                style={{ width: "90px" }}
                onClick={(e) => handleButton(e, "up 20")}
              >
                Up
              </Button>
              <Button
                style={{ width: "90px" }}
                onClick={(e) => handleButton(e, "down 20")}
              >
                Down
              </Button>
            </div>
            <div className="d-flex justify-content-around mt-5">
              <Button
                style={{ width: "90px" }}
                onClick={(e) => handleButton(e, "forward 20")}
              >
                Forward
              </Button>
            </div>
            <div
              className="mx-auto d-flex justify-content-between mt-2"
              style={{ width: "185px" }}
            >
              <Button
                style={{ width: "90px" }}
                onClick={(e) => handleButton(e, "left 20")}
              >
                Left
              </Button>
              <Button
                style={{ width: "90px" }}
                onClick={(e) => handleButton(e, "right 20")}
              >
                Right
              </Button>
            </div>
            <div className="d-flex justify-content-around mt-2">
              <Button
                style={{ width: "90px" }}
                onClick={(e) => handleButton(e, "back 20")}
              >
                Back
              </Button>
            </div>
            <div className="d-flex justify-content-around mt-5">
              <Button
                style={{ width: "90px" }}
                onClick={(e) => handleButton(e, "flip f")}
              >
                Flip F!
              </Button>
            </div>
            <div
              className="mx-auto d-flex justify-content-between mt-2"
              style={{ width: "185px" }}
            >
              <Button
                style={{ width: "90px" }}
                onClick={(e) => handleButton(e, "flip l")}
              >
                Flip L!
              </Button>
              <Button
                style={{ width: "90px" }}
                onClick={(e) => handleButton(e, "flip r")}
              >
                Flip R!
              </Button>
            </div>
            <div className="d-flex justify-content-around mt-2">
              <Button
                style={{ width: "90px" }}
                onClick={(e) => handleButton(e, "flip b")}
              >
                Flip B!
              </Button>
            </div>
            <div className="d-flex justify-content-around mt-2">
            <Button
                style={{ width: "90px" }}
                onClick={(e) => handleButton(e, "stop")}
              >Stop</Button>
               <Button
                style={{ width: "100px" }}
                onClick={(e) => handleButton(e, "emergency")}
              >Emergency</Button>
              </div>
          </div>
          <div className="border w-50 mt-4 d-flex-column justify-content-center">
            <h1>Forward: {upPressed ? "1" : "0"} </h1>
            <h1>Back: {downPressed ? "1" : "0"} </h1>
            <h1>Left: {leftPressed ? "1" : "0"} </h1>
            <h1>Right: {rightPressed ? "1" : "0"} </h1>
            <h1>Up: {QPressed ? "1" : "0"} </h1>
            <h1>Down: {EPressed ? "1" : "0"} </h1>
            <h2>Pitch: {telemetry?.pitch}</h2>
            <h2>Roll: {telemetry?.roll}</h2>
            <h2>Yaw: {telemetry?.yaw}</h2>
            <h2>Velocity (X axis): {telemetry?.vgx}</h2>
            <h2>Velocity (Y axis): {telemetry?.vgy}</h2>
            <h2>Velocity (Z axis): {telemetry?.vgz}</h2>
            <h2>Acceleration (X axis): {telemetry?.agx}</h2>
            <h2>Acceleration (Y axis): {telemetry?.agy}</h2>
            <h2>Acceleration (Z axis): {telemetry?.agz}</h2>
            <h2>Height: {telemetry?.h}</h2>
            <h2>Battery: {telemetry?.bat}</h2>
            <h2>Temp_Low: {(telemetry?.templ-32)*5/9}</h2>
            <h2>Temp_High: {(telemetry?.temph-32)*5/9}</h2>
            <h2>Barometer: {telemetry?.baro}</h2>
          </div>
          </div>
      </Tab>
      <Tab eventKey="charts" title="Charts">
      <Plot 
        data={[
            {
                x: valueno,
                y: temp,
                type: 'scatter',
                mode: 'lines+markers',
                marker: {color: 'red'}
            }
        ]}
        layout={{
            width: 900,
            height: 800,
            title: 'Temperature'
        }}
    />
      </Tab>
    </Tabs>
        
      </div>
    </>
  );

        

}

export default App;
