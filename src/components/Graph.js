import React, { useState, useEffect } from 'react'
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Plot from 'react-plotly.js';

const Graph = ({telnames, time, telemetry}) => {

    const handleSelection = (e, sel) => {
        e.preventDefault();
        setSelection(sel);
      };
      
      const [selection, setSelection] = useState("pitch");

  return (
      <>
    <DropdownButton id="dropdown-basic-button" title="Graph">
              {telnames?.map((name) => (
                <Dropdown.Item onClick={(e) => handleSelection(e, name)}>
                  {name}
                </Dropdown.Item>
              ))}
            </DropdownButton>

            <Plot
              className="plot"
              key={selection}
              data={[
                {
                  x: time,
                  y: telemetry[selection],
                  type: "scatter",
                  mode: "lines+markers",
                  marker: { color: "lightgray" },
                },
              ]}
              layout={{
                responsive: true,
                autosize: true,
                title: selection.charAt(0).toUpperCase() + selection.slice(1),
                plot_bgcolor: "#2b2b2b",
                paper_bgcolor: "#2b2b2b",
                font: {
                  color: "#afb1b3",
                },
                yaxis: {
                  gridcolor: "#3c3f41",
                },
                xaxis: {
                  gridcolor: "#3c3f41",
                },
              }}
            />
            </>
  )
}

export default Graph