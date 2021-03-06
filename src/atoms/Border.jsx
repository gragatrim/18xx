import React from "react";
import { colors } from "../data";

import HexContext from "../context/HexContext";

const edge = 150 * 0.57735;

const Border = ({ color, dashed, offset }) => {
  let strokeDashArray = "none";
  let strokeDashOffset = "none";
  let width = 16;
  if (dashed) {
    strokeDashArray = `${width}`;
    if (offset) {
      strokeDashOffset = `${offset}`;
    }
  }
  return (
    <HexContext.Consumer>
      {hx => (
        <path
          d={`m ${0.5 * edge} 75 L ${-0.5 * edge} 75`}
          fill="none"
          stroke={colors[color]}
          strokeWidth="10"
          strokeDasharray={strokeDashArray}
          strokeDashoffset={strokeDashOffset}
          strokeLinecap="round"
          strokeLinejoin="round"
          transform={`rotate(${hx.rotation})`}
        />
      )}
    </HexContext.Consumer>
  );
};

export default Border;
