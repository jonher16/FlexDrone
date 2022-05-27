import { Button } from 'react-bootstrap'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const GimbalControl = ({ onClick }) => {
    return (
        <div style={{ position: "absolute", left: "5%", bottom: "0%", width: "100%" }} className="d-flex flex-row align-items-center w-50">
            {/* Edit Credentials Div */}
            <div className="w-50 h-100 mt-2 d-flex flex-column align-items-center">
                {/* State/Stop div*/}
                <div className="d-flex mt-1 justify-content-center w-100">
                    <Button
                        variant="primary"
                        style={{ width: "150px" }}
                        onClick={(e) => onClick(e, "GET_GIMBAL_STATE")}
                    >
                        Get gimbal state
                    </Button>
                </div>
                <div className="d-flex mt-1 justify-content-center w-100">
                    <Button
                        variant="primary"
                        style={{ width: "140px" }}
                        onClick={(e) => onClick(e, "STOP")}
                    >
                        Stop Gimbal
                    </Button>
                </div>
            </div>
            {/* <div className="d-flex mt-1 justify-content-center w-100">
            <Button
              variant="primary"
              style={{ width: "140px" }}
              onClick={(e) => onClick(e, "UNLOCK")}
            >
              Unlock Gimbal
            </Button>
          </div>
          <div className="d-flex mt-1 justify-content-center w-100">
            <Button
              variant="primary"
              style={{ width: "140px" }}
              onClick={(e) => onClick(e, "LOCK")}
            >
              Lock Gimbal
            </Button>
          </div> */}

            {/* Joysticks div*/}

            <div className="w-50 d-flex flex-column mt-3 justify-content-center">
                {/* Tilt Up div */}
                <div className="d-flex justify-content-around w-100">
                    <Button
                        style={{ width: "120px", height: "auto" }}
                        onClick={(e) => onClick(e, "UP")}
                    >
                        Tilt Up
                    </Button>
                </div>
                {/* Pan Left/Right Container */}
                <div className="w-100">
                    <div
                        className="d-flex mt-2 justify-content-center"
                    >
                        <div
                            className="d-flex justify-content-center"
                            style={{ width: "120px" }}
                        >
                            <Button
                                style={{ width: "120px" }}
                                onClick={(e) => onClick(e, "LEFT")}
                            >
                                Pan Left
                            </Button>
                        </div>
                        <div
                            className="d-flex justify-content-center"
                            style={{ width: "120px" }}
                        >
                            <Button
                                className="ml-2"
                                style={{ width: "120px" }}
                                onClick={(e) => onClick(e, "RIGHT")}
                            >
                                Pan Right
                            </Button>
                        </div>
                    </div>
                </div>
                {/* Tilt down div */}
                <div className="d-flex justify-content-around mt-2">
                    <Button
                        style={{ width: "120px" }}
                        onClick={(e) => onClick(e, "DOWN")}
                    >
                        Tilt Down
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default GimbalControl