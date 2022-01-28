import "./App.scss";
import Button from "react-bootstrap/Button";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import HeaderNav from "./components/HeaderNav";
import { Tab } from "bootstrap";
import Plot from "react-plotly.js";
import Tabs from "react-bootstrap/esm/Tabs";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Iframe from "react-iframe";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

const ENDPOINT = "http://127.0.0.1:4001";
const socket = io(ENDPOINT);

function App() {
  const handleButton = (e, comando) => {
    e.preventDefault();
    socket.emit("comando", comando);
    console.log(`Comando ${comando} emitido`);
  };

  useEffect(() => {
    socket.on("welcome", (msg) => console.log(msg));
  }, []);

  const [telnames, setTelnames] = useState([]);
  const [telemetry, setTelemetry] = useState({pitch: [], roll: [], yaw: [], agx: [], agy: [], agz: [], vgx: [], vgy: [], vgz: [], bat: [], baro: [], h: [], time: [], templ: [], temph: []});
  const [selection, setSelection] = useState("pitch")

  const [key, setKey] = useState("control");
  const [valueno, setValueno] = useState([]);

  const handleSelection = (e, sel) => {
    e.preventDefault();
    setSelection(sel)
  }
  useEffect(() => {
    socket.on("telemetry", (msg) => {
      //console.log(msg);
      setTelnames(Object.keys(msg));
      delete telnames["tof"]
      
      setTelemetry((telemetry) => ({
      pitch: [...telemetry.pitch, msg.pitch],
      roll: [...telemetry.roll, msg.roll],
      yaw: [...telemetry.yaw, msg.yaw],
      agx: [...telemetry.agx, msg.agx],
      agy: [...telemetry.agy, msg.agy],
      agz: [...telemetry.agz, msg.agz],
      vgx: [...telemetry.vgx, msg.vgx],
      vgy: [...telemetry.vgy, msg.vgy],
      vgz: [...telemetry.vgz, msg.vgz],
      bat: [...telemetry.bat, msg.bat],
      baro: [...telemetry.baro, msg.baro],
      h: [...telemetry.h, msg.h],
      templ: [...telemetry.templ, (msg.templ-32)*5/9],
      temph: [...telemetry.temph, (msg.temph-32)*5/9],
      }));

      var date = new Date();
      setValueno((valueno) => [...valueno, date]);
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

        socket.emit("comando", `rc 0 ${vel} 0 0`);
        flagW = true;
      } else if (e.code === "KeyS" && flagS === false) {
        console.log("S");

        socket.emit("comando", `rc 0 -${vel} 0 0`);
        flagS = true;
      } else if (e.code === "KeyA" && flagA === false) {
        console.log("A");
        socket.emit("comando", `rc -${vel} 0 0 0`);
        flagA = true;
      } else if (e.code === "KeyD" && flagD === false) {
        console.log("D");
        flagD = true;

        socket.emit("comando", `rc ${vel} 0 0 0`);
      } else if (e.code === "KeyQ" && flagQ === false) {
        console.log("Q");
        flagQ = true;
        socket.emit("comando", `rc 0 0 0 -${vel} `);
      } else if (e.code === "KeyE" && flagE === false) {
        console.log("E");
        flagE = true;
        socket.emit("comando", `rc 0 0 0 ${vel}`);
      } else if (e.code === "Space" && flagSpace === false) {
        console.log("Space");
        flagE = true;
        socket.emit("comando", `rc 0 0 ${vel} 0`);
      } else if (e.code === "ShiftLeft" && flagSL === false) {
        console.log("ShiftLeft");
        flagE = true;
        socket.emit("comando", `rc 0 0 -${vel} 0`);
      }
    });

    document.addEventListener("keyup", (e) => {
      if (e.code === "KeyW") {
        console.log("No W");

        flagW = false;
        socket.emit("comando", "rc 0 0 0 0");
      } else if (e.code === "KeyS") {
        console.log("No S");

        flagS = false;
        socket.emit("comando", "rc 0 0 0 0");
      } else if (e.code === "KeyA") {
        console.log("No A");
        flagA = false;
        socket.emit("comando", "rc 0 0 0 0");
      } else if (e.code === "KeyD") {
        console.log("No D");

        flagD = false;
        socket.emit("comando", "rc 0 0 0 0");
      } else if (e.code === "KeyQ") {
        console.log("No Q");

        flagQ = false;
        socket.emit("comando", "rc 0 0 0 0");
      } else if (e.code === "KeyE") {
        console.log("No E");

        flagE = false;
        socket.emit("comando", "rc 0 0 0 0");
      } else if (e.code === "Space") {
        console.log("No Space");
        flagSpace = false;
        socket.emit("comando", "rc 0 0 0 0");
      } else if (e.code === "ShiftLeft") {
        console.log("No ShiftLeft");
        flagSL = false;
        socket.emit("comando", "rc 0 0 0 0");
      }
    });
  }, []);

  return (
    <>
      <div className="App">
        <script type="text/javascript" src="jsmpeg.min.js"></script>
        <HeaderNav />
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
        >
          <Tab eventKey="control" title="Control">
            <Container className=" w-75 mt-5" fluid>
              {/* Up/Down Row */}

              <Row
                className="d-flex mt-3 justify-content-center w-3"
                xs="12"
                lg="6"
                md="6"
              >
                <Col className="w-50 d-flex justify-content-center">
                  <Button
                    variant="primary"
                    style={{ width: "90px" }}
                    onClick={(e) => handleButton(e, "up 20")}
                  >
                    Up
                  </Button>
                </Col>

                <Col className="w-50 d-flex justify-content-center">
                  <Button
                    style={{ width: "90px" }}
                    onClick={(e) => handleButton(e, "down 20")}
                  >
                    Down
                  </Button>
                </Col>
              </Row>
              {/* Rotate L/R row*/}
              <Row
                className="d-flex mt-3 justify-content-center w-3"
                xs="12"
                lg="6"
                md="6"
              >
                <Col className="w-50 d-flex justify-content-center">
                  <Button
                    variant="primary"
                    style={{ width: "90px" }}
                    onClick={(e) => handleButton(e, "ccw 20")}
                  >
                    Rotate L
                  </Button>
                </Col>

                <Col className="w-50 d-flex justify-content-center">
                  <Button
                    style={{ width: "90px" }}
                    onClick={(e) => handleButton(e, "cw 20")}
                  >
                    Rotate R
                  </Button>
                </Col>
              </Row>

              {/* Joysticks row */}

              <Row
                className="d-flex mt-3 justify-content-center w-3"
                xs="12"
                lg="6"
                md="6"
              >
                <Col className=" w-50">
                  <div className="d-flex justify-content-around">
                    <Button
                      style={{ width: "90px" }}
                      onClick={(e) => handleButton(e, "forward 20")}
                    >
                      Forward
                    </Button>
                  </div>

                  <Container className="">
                    <Row
                      xs="12"
                      lg="6"
                      md="6"
                      className="d-flex mt-2 justify-content-center"
                    >
                      <Col
                        className="d-flex justify-content-center"
                        style={{ width: "100px" }}
                      >
                        <Button
                          style={{ width: "100px" }}
                          onClick={(e) => handleButton(e, "left 20")}
                        >
                          Left
                        </Button>
                      </Col>
                      <Col
                        className="d-flex justify-content-center"
                        style={{ width: "100px" }}
                      >
                        <Button
                          style={{ width: "100px" }}
                          onClick={(e) => handleButton(e, "right 20")}
                        >
                          Right
                        </Button>
                      </Col>
                    </Row>
                  </Container>

                  <div className="d-flex justify-content-around mt-2">
                    <Button
                      style={{ width: "90px" }}
                      onClick={(e) => handleButton(e, "back 20")}
                    >
                      Back
                    </Button>
                  </div>
                </Col>

                <Col className="w-50">
                  <div className="d-flex justify-content-around">
                    <Button
                      style={{ width: "90px" }}
                      onClick={(e) => handleButton(e, "flip f")}
                    >
                      Flip F!
                    </Button>
                  </div>

                  <Container className="">
                    <Row
                      xs="12"
                      lg="6"
                      md="6"
                      className="d-flex mt-2 justify-content-center"
                    >
                      <Col
                        className="d-flex justify-content-center"
                        style={{ width: "100px" }}
                      >
                        <Button
                          style={{ width: "90px" }}
                          onClick={(e) => handleButton(e, "flip l")}
                        >
                          Flip L!
                        </Button>
                      </Col>
                      <Col
                        className="d-flex justify-content-center"
                        style={{ width: "100px" }}
                      >
                        <Button
                          style={{ width: "90px" }}
                          onClick={(e) => handleButton(e, "flip r")}
                        >
                          Flip R!
                        </Button>
                      </Col>
                    </Row>
                  </Container>
                  <div className="d-flex justify-content-around mt-2">
                    <Button
                      style={{ width: "90px" }}
                      onClick={(e) => handleButton(e, "flip b")}
                    >
                      Flip B!
                    </Button>
                  </div>
                </Col>
              </Row>
              {/* Stop/Emergency Row */}
              <Row
                className="d-flex mt-3 justify-content-center w-3"
                xs="12"
                lg="6"
                md="6"
              >
                <Col className="w-50 d-flex justify-content-center">
                  <Button
                    style={{ width: "90px" }}
                    onClick={(e) => handleButton(e, "stop")}
                  >
                    Stop
                  </Button>
                </Col>
                <Col className="w-50 d-flex justify-content-center">
                  <Button
                    style={{ width: "100px" }}
                    onClick={(e) => handleButton(e, "emergency")}
                  >
                    Emergency
                  </Button>
                </Col>
              </Row>
              {/* Takeoff/Land Row */}
              <Row
                className="d-flex mt-3 justify-content-center w-3"
                xs="12"
                lg="6"
                md="6"
              >
                <Col className="w-50 d-flex justify-content-center">
                  <Button
                    style={{ width: "90px" }}
                    onClick={(e) => handleButton(e, "takeoff")}
                  >
                    Takeoff
                  </Button>
                </Col>
                <Col className="w-50 d-flex justify-content-center">
                  <Button
                    style={{ width: "90px" }}
                    onClick={(e) => handleButton(e, "land")}
                  >
                    Land
                  </Button>
                </Col>
              </Row>
            </Container>
          </Tab>

          <Tab eventKey="data" title="Data">
            <div className="  d-inline-flex h-100 p-2 w-100 d-flex-row justify-content-center">
              <div className="  p-5 d-flex-column w-50 align-items-start justify-content-start">
                <h3 className="text-start">Pitch: {telemetry?.pitch}</h3>
                <h3 className="text-start">Roll: {telemetry?.roll}</h3>
                <h3 className="text-start">Yaw: {telemetry?.yaw}</h3>
                <h3 className="text-start">
                  Velocity (X axis): {telemetry?.vgx}
                </h3>
                <h3 className="text-start">
                  Velocity (Y axis): {telemetry?.vgy}
                </h3>
                <h3 className="text-start">
                  Velocity (Z axis): {telemetry?.vgz}
                </h3>
                <h3 className="text-start">
                  Acceleration (X axis): {telemetry?.agx}
                </h3>
                <h3 className="text-start">
                  Acceleration (Y axis): {telemetry?.agy}
                </h3>
                <h3 className="text-start">
                  Acceleration (Z axis): {telemetry?.agz}
                </h3>
              </div>
              <div className=" d-inline-flex-column p-5 w-50 align-items-start justify-content-start">
                <h3 className="text-start">Height: {telemetry?.h}</h3>
                <h3 className="text-start">Battery: {telemetry?.bat}</h3>
                <h3 className="text-start">
                  Temp_Low: {(((telemetry?.templ - 32) * 5) / 9).toFixed(2)}
                </h3>
                <h3 className="text-start">
                  Temp_High: {(((telemetry?.temph - 32) * 5) / 9).toFixed(2)}
                </h3>
                <h3 className="text-start">Barometer: {telemetry?.baro}</h3>
              </div>
            </div>
          </Tab>
          <Tab eventKey="charts" width="100%" title="Charts">
            <DropdownButton id="dropdown-basic-button" title="Graph">
              {
              telnames.map((name) => (
                <Dropdown.Item onClick={(e)=>handleSelection(e, name)}>{name}</Dropdown.Item>
              ))}
            </DropdownButton>

            <Plot
              className="plot"
              data={[
                {
                  x: valueno,
                  y: telemetry[selection],
                  type: "scatter",
                  mode: "lines+markers",
                  marker: { color: "lightgray" },
                },
              ]}
              layout={{
                responsive: true,
                autosize: true,
                title: (selection.charAt(0).toUpperCase() + selection.slice(1)),
                plot_bgcolor: "#2b2b2b",
                paper_bgcolor: "#2b2b2b",
                font: {
                  color: "#afb1b3",
                },
                yaxis: {
                  gridcolor: "#3c3f41",
                },
                xaxis: {
                  gridcolor: "#3c3f41",
                },
              }}
            />
          </Tab>
          <Tab eventKey="video" className="tab_style" title="Video">
            <Iframe
              className="videoframe"
              url="video.html"
              id="myId"
              display="initial"
              height="900px"
              position="relative"
            />
          </Tab>
        </Tabs>
      </div>
    </>
  );
}

export default App;
