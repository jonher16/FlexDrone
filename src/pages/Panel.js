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
//const ANDROID_IP = process.env.REACT_APP_ANDROID_IP;

console.log(SOCKET_IP)

const socket = io(`http://${SOCKET_IP}:4001/`);

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
      console.log("Tello status from server",status)
      setTelloStatus(status)
    });
    socket.on("addresses", (addresses) => {
      console.log("Adresses from server", addresses)
      setAdresses(addresses)
    });
  }, [])

  useEffect(() => {
    console.log(addresses)
  },[addresses])
  

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
          </div></>) : choice == "Tello" ? (<Tello socket={socket} tellostatus={telloStatus} />) : (<ASDK socket={socket} SOCKET_IP={SOCKET_IP} ANDROID_IP={addresses.android}/>)}
          
        
    </>
  );
}
