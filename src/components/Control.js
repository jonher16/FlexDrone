import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'

const Control = ({onClick}) => {
  return (
    <>
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
                    onClick={(e) => onClick(e, "up 20")}
                  >
                    Up
                  </Button>
                </Col>

                <Col className="w-50 d-flex justify-content-center">
                  <Button
                    style={{ width: "90px" }}
                    onClick={(e) => onClick(e, "down 20")}
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
                    onClick={(e) => onClick(e, "ccw 20")}
                  >
                    Rotate L
                  </Button>
                </Col>

                <Col className="w-50 d-flex justify-content-center">
                  <Button
                    style={{ width: "90px" }}
                    onClick={(e) => onClick(e, "cw 20")}
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
                      onClick={(e) => onClick(e, "forward 20")}
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
                          onClick={(e) => onClick(e, "left 20")}
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
                          onClick={(e) => onClick(e, "right 20")}
                        >
                          Right
                        </Button>
                      </Col>
                    </Row>
                  </Container>

                  <div className="d-flex justify-content-around mt-2">
                    <Button
                      style={{ width: "90px" }}
                      onClick={(e) => onClick(e, "back 20")}
                    >
                      Back
                    </Button>
                  </div>
                </Col>

                <Col className="w-50">
                  <div className="d-flex justify-content-around">
                    <Button
                      style={{ width: "90px" }}
                      onClick={(e) => onClick(e, "flip f")}
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
                          onClick={(e) => onClick(e, "flip l")}
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
                          onClick={(e) => onClick(e, "flip r")}
                        >
                          Flip R!
                        </Button>
                      </Col>
                    </Row>
                  </Container>
                  <div className="d-flex justify-content-around mt-2">
                    <Button
                      style={{ width: "90px" }}
                      onClick={(e) => onClick(e, "flip b")}
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
                    onClick={(e) => onClick(e, "stop")}
                  >
                    Stop
                  </Button>
                </Col>
                <Col className="w-50 d-flex justify-content-center">
                  <Button
                    style={{ width: "100px" }}
                    onClick={(e) => onClick(e, "emergency")}
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
                    onClick={(e) => onClick(e, "takeoff")}
                  >
                    Takeoff
                  </Button>
                </Col>
                <Col className="w-50 d-flex justify-content-center">
                  <Button
                    style={{ width: "90px" }}
                    onClick={(e) => onClick(e, "land")}
                  >
                    Land
                  </Button>
                </Col>
              </Row>
            </Container>
    </>
  )
}

export default Control