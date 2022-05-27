import React from "react";

const Data = ({ telemetry }) => {
  return (
    <div className="  d-inline-flex h-100 p-2 w-100 d-flex-row justify-content-center">
      <div className="  p-5 d-flex-column w-50 align-items-start justify-content-start">
        <h3 className="text-start">
          Pitch: {telemetry?.pitch[telemetry.pitch.length - 1]}
        </h3>
        <h3 className="text-start">
          Roll: {telemetry?.roll[telemetry.roll.length - 1]}
        </h3>
        <h3 className="text-start">
          Yaw: {telemetry?.yaw[telemetry.yaw.length - 1]}
        </h3>
        <h3 className="text-start">
          Velocity (X axis): {telemetry?.vgx[telemetry.vgx.length - 1]}
        </h3>
        <h3 className="text-start">
          Velocity (Y axis): {telemetry?.vgy[telemetry.vgy.length - 1]}
        </h3>
        <h3 className="text-start">
          Velocity (Z axis): {telemetry?.vgz[telemetry.vgz.length - 1]}
        </h3>
        <h3 className="text-start">
          Acceleration (X axis): {telemetry?.agx[telemetry.agx.length - 1]}
        </h3>
        <h3 className="text-start">
          Acceleration (Y axis): {telemetry?.agy[telemetry.agy.length - 1]}
        </h3>
        <h3 className="text-start">
          Acceleration (Z axis): {telemetry?.agz[telemetry.agz.length - 1]}
        </h3>
      </div>
      <div className=" d-inline-flex-column p-5 w-50 align-items-start justify-content-start">
        <h3 className="text-start">
          Height: {telemetry?.h[telemetry.h.length - 1]}
        </h3>
        <h3 className="text-start">
          Battery: {telemetry?.bat[telemetry.bat.length - 1]}
        </h3>
        <h3 className="text-start">
          Temp_Low:{" "}
          {(
            ((telemetry?.templ[telemetry.templ.length - 1] - 32) * 5) /
            9
          ).toFixed(2)}
        </h3>
        <h3 className="text-start">
          Temp_High:{" "}
          {(
            ((telemetry?.temph[telemetry.temph.length - 1] - 32) * 5) /
            9
          ).toFixed(2)}
        </h3>
        <h3 className="text-start">
          Barometer: {telemetry?.baro[telemetry.baro.length - 1]}
        </h3>
      </div>
    </div>
  );
};

export default Data;
