import React from "react";
import Navbar from "react-bootstrap/Navbar";
import "../App.scss"

const HeaderNav = () => {
  return (
    <div>
      <Navbar bg="mediumgray" width="100%" variant="dark">
     
          <Navbar.Brand><h1>FlexDrone</h1></Navbar.Brand>
         
        
      </Navbar>
    </div>
  );
};

export default HeaderNav;
