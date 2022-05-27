import React, { useState } from "react";
import "../App.scss";
import Option from "../components/Option";
import { Container, Row, Col} from "react-bootstrap";
import HeaderNav from "../components/HeaderNav";
import {GiDeliveryDrone} from "react-icons/gi"
import Tello from "./Tello";
import ASDK from "./ASDK"
import io from "socket.io-client";
import { useEffect } from "react";


const SOCKET_IP = process.env.REACT_APP_FLEXDRONE_IP;
const SOCKET_PORT = process.env.REACT_APP_FLEXDRONE_PORT;

console.log(SOCKET_IP)

const socket = io(`https://${SOCKET_IP}:${SOCKET_PORT}/`);

const options = [
  {
    title: "Tello",
    image: <GiDeliveryDrone className="option_icon" />,
  },
  {
    title: "ASDK",
    image: <GiDeliveryDrone className="option_icon" />,
  },
];

export default function Panel({}) {
  const [choice, setChoice] = useState("Panel");
  const [telloStatus, setTelloStatus] = useState("")
  const [addresses, setAdresses] = useState({})

  const handleClick = (e, choice) => {
    e.preventDefault()
    setChoice(choice);
  };

  useEffect(() => {
    socket.on("tellostatus", (status) => {
      //Receives from server whether tello connection has been already started
      setTelloStatus(status)
    });
    socket.on("addresses", (addresses) => {
      // Receives addresses object from server (for now only contains Android app IP address) and sets it into the useState
      setAdresses(addresses)
    });
  }, [])

  return (
    <>
      <HeaderNav onClick={(e)=>handleClick(e, "Panel")}/>
      {choice === "Panel" ? (
        <>
          <div className="main">
            <Container className="container" fluid>
              <Row>
                {options.map((option) => (
                  <Col
                    className="d-flex justify-content-center w-3"
                    xs="12"
                    lg="6"
                    md="6"
                    style={{ padding: "1rem" }}
                  >
                    <Option
                      title={option.title}
                      image={option.image}
                      onClick={(e)=>handleClick(e, option.title)}
                    />
                  </Col>
                ))}
                
              </Row>
            </Container>
          </div></>) : choice === "Tello" ? (<Tello socket={socket} tellostatus={telloStatus} />) : (<ASDK socket={socket} SOCKET_IP={SOCKET_IP} SOCKET_PORT={SOCKET_PORT} ANDROID_IP={addresses.android_ip} ANDROID_FFMPEG_PORT={addresses.android_ffmpeg_port}/>)}
          
        
    </>
  );
}
