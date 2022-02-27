import React from 'react';
import Iframe from "react-iframe";

const Video = () => {
  return <Iframe
  className="videoframe"
  url="video.html"
  id="myId"
  display="initial"
  height="900px"
  position="relative"
/>
};

export default Video;
