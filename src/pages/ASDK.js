import React from "react";
import { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "../App.scss";
import JSMpeg from "@cycjimmy/jsmpeg-player";

const ffmpegIP = "localhost";

const ASDK = ({ socket }) => {

    useEffect(() => {
        var videoUrl = `ws://${ffmpegIP}:3001/stream`;
        var player = new JSMpeg.VideoElement("#video-canvas", videoUrl, {
          autoplay: true,
        });
        console.log(player);
    }, []);

    

  const handleCommand = (e, command) => {
    e.preventDefault();
    socket.emit("uxcommand", command);
    console.log("Sending command", command);
  };

  return (
    <div>
      <Container className="d-flex flex-row w-100 h-100" fluid>
        <Row className="w-100">
          {/* Video Column */}
          <Col
            xs={12}
            sm={6}
            className="d-flex justify-content-center w-100 mt-5"
          >
            <div
              id="video-canvas"
              style={{ height: "300px", width: "500px" }}
            ></div>
          </Col>
          {/* Video Column Close */}

          {/* Controls Column*/}
          <Col xs={12} sm={6} className="d-flex justify-content-center w-100">
            {/* Edit Credentials Div */}
            <div className="w-100 h-100 mt-2">
              {/* <div
                      className="d-flex justify-content-center mb-3"
                      xs="12"
                      lg="6"
                      md="6"
                    >
                      <Button onClick={() => editCredentials()}>
                        Edit Credentials
                      </Button>
                    </div> */}

              {/* Zoomin div*/}

              <div className="d-flex mt-1 justify-content-center w-100">
                <Button
                  variant="primary"
                  style={{ width: "120px" }}
                  onClick={(e) => handleCommand(e, "START")}
                >
                  Camera start
                </Button>
              </div>

              {/* Joysticks div*/}

              <div className="d-flex flex-column mt-3 justify-content-center">
                {/* Tilt Up div */}
                <div className="d-flex justify-content-around w-100">
                  <Button
                    style={{ width: "120px", height: "auto" }}
                    onClick={(e) => handleCommand(e, "up")}
                  >
                    Tilt Up
                  </Button>
                </div>
                {/* Pan Left/Right Container */}
                <Container className="w-100">
                  <Row
                    xs="12"
                    lg="6"
                    md="6"
                    className="d-flex mt-2 justify-content-center"
                  >
                    <Col
                      className="d-flex justify-content-center"
                      style={{ width: "120px" }}
                    >
                      <Button
                        style={{ width: "120px" }}
                        onClick={(e) => handleCommand(e, "left")}
                      >
                        Pan Left
                      </Button>
                    </Col>
                    <Col
                      className="d-flex justify-content-center"
                      style={{ width: "120px" }}
                    >
                      <Button
                        style={{ width: "120px" }}
                        onClick={(e) => handleCommand(e, "right")}
                      >
                        Pan Right
                      </Button>
                    </Col>
                  </Row>
                </Container>
                {/* Tilt down div */}
                <div className="d-flex justify-content-around mt-2">
                  <Button
                    style={{ width: "120px" }}
                    onClick={(e) => handleCommand(e, "down")}
                  >
                    Tilt Down
                  </Button>
                </div>
              </div>
            </div>
          </Col>
          {/* Controls Column Close */}
        </Row>
      </Container>
    </div>
  );
};

export default ASDK;
