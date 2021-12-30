import React, { useState } from "react";
import { Tab } from "bootstrap";
import Tabs from "react-bootstrap/Tabs";
import Plot from "react-plotly.js";
import "../App.scss"
const Telemetry = ({telemetry, temp, valueno}) => {

  const [key, setKey] = useState("data");

    
  return (
    <div className=" border h-100 w-50 d-flex-row justify-content-start">
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
      <Tab eventKey="data" title="Data">
        <div className=" d-inline-flex h-100 p-2 w-100 d-flex-row justify-content-center">
        <div className=" d-flex-column w-50 align-items-start justify-content-start">
          <h3 className="text-start">Pitch: {telemetry?.pitch}</h3>
          <h3 className="text-start">Roll: {telemetry?.roll}</h3>
          <h3 className="text-start">Yaw: {telemetry?.yaw}</h3>
          <h3 className="text-start">Velocity (X axis): {telemetry?.vgx}</h3>
          <h3 className="text-start">Velocity (Y axis): {telemetry?.vgy}</h3>
          <h3 className="text-start">Velocity (Z axis): {telemetry?.vgz}</h3>
          <h3 className="text-start">Acceleration (X axis): {telemetry?.agx}</h3>
          <h3 className="text-start">Acceleration (Y axis): {telemetry?.agy}</h3>
          <h3 className="text-start">Acceleration (Z axis): {telemetry?.agz}</h3>
          </div>
          <div className=" d-inline-flex-column w-50 align-items-start justify-content-start">
          <h3 className="text-start">Height: {telemetry?.h}</h3>
          <h3 className="text-start">Battery: {telemetry?.bat}</h3>
          <h3 className="text-start">Temp_Low: {(((telemetry?.templ - 32) * 5) / 9).toFixed(2)}</h3>
          <h3 className="text-start">Temp_High: {(((telemetry?.temph - 32) * 5) / 9).toFixed(2)}</h3>
          <h3 className="text-start">Barometer: {telemetry?.baro}</h3>
          </div>
          </div>
      </Tab>
    
      </Tabs>
    </div>
  );
};

export default Telemetry;
