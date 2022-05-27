import React from "react";
import "../App.scss"
const Option = ({title, image, onClick}) => {
  return (
    <div className="option" onClick={onClick}>
      <div className="option_ico">
      {image}
      </div>
      <h2 className="option__title">{title}</h2>
    </div>
  );
};

export default Option;
