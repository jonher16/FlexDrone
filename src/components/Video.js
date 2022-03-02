import React from "react";
import Iframe from "react-iframe";
import JSMpeg from "@cycjimmy/jsmpeg-player";
import { useEffect } from "react";

const ffmpegIP = "localhost";

const Video = () => {

  useEffect(() => {
    var videoUrl = `ws://${ffmpegIP}:3001/stream`;
    var player = new JSMpeg.VideoElement("#video-canvas", videoUrl, {
      autoplay: true,
    });
    console.log(player);
}, []);

  return (
    <>
      {/* <Iframe
        className="videoframe"
        url="video.html"
        id="myId"
        display="initial"
        height="900px"
        position="relative"
      /> */}
      <div id="video-canvas" className="m-3" style={{ height: "500px", width: "800px" }}></div>
    </>
  );
};

export default Video;
