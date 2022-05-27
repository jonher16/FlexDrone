import React from "react";
import Navbar from "react-bootstrap/Navbar";
import "../App.scss"

const HeaderNav = ({onClick}) => {
  return (
    <div>
      <Navbar bg="mediumgray" width="100%" variant="dark">
          <Navbar.Brand><h1 className="title_style" onClick={onClick}>FlexDrone</h1></Navbar.Brand>
      </Navbar>
    </div>
  );
};

export default HeaderNav;
