import React from "react";
import { colors } from "../data";
import * as R from "ramda";

import HexContext from "../context/HexContext";

const Hex = ({ color, border, transparent onClick, hexValue }) => {
  let fill = (border || transparent ? "transparent" : (R.isNil(colors[color]) ? color : colors[color]));
  let stroke = border ? colors["black"] : "none";
  console.log(hexValue);

  return (
    <HexContext.Consumer>
      {hx => (
        <g transform={`rotate(${hx.rotation})`}>
          <polygon
            points="-86.6025,0 -43.30125,-75 43.30125,-75 86.6025,0 43.30125,75 -43.30125,75"
            fill={fill}
            strokeLinecap="round"
            strokeLinejoin="bevel"
            strokeWidth="2"
            stroke={stroke}
            hex={hexValue.hexes[0]}
            onClick={onClick.bind(this, hexValue)}
          />
        </g>
      )}
    </HexContext.Consumer>
  );
};

export default Hex;
