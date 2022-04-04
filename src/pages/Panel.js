import React, { useState } from "react";
import "../App.scss";
import Option from "../components/Option";
import { Container, Row, Col, Button } from "react-bootstrap";
import HeaderNav from "../components/HeaderNav";
import {GiDeliveryDrone, GiDragonfly} from "react-icons/gi"
import Tello from "./Tello";
import ASDK from "./ASDK"
import io from "socket.io-client";
import { useEffect } from "react";

// function getParameterByName(name, url = window.location.href) {
//   name = name.replace(/[\[\]]/g, "\\$&");
//   var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
//     results = regex.exec(url);
//   if (!results) return null;
//   if (!results[2]) return "";
//   return decodeURIComponent(results[2].replace(/\+/g, " "));
// }

// const mesa = getParameterByName("mesa");

// const cocina = {
//   title: "Cocina",
//   image: <GiCook className="option_icon" />,
//   link: "/index.html?id=i&group=sala1",
// }

const SOCKET_IP = process.env.REACT_APP_SOCKET_IP;
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

  const handleClick = (e, choice) => {
    e.preventDefault()
    setChoice(choice);
  };

  useEffect(() => {
    socket.on("tellostatus", (status) => {
      console.log("Tello status from server",status)
      setTelloStatus(status)
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
          </div></>) : choice == "Tello" ? (<Tello socket={socket} tellostatus={telloStatus} />) : (<ASDK socket={socket}/>)}
          
        
    </>
  );
}
