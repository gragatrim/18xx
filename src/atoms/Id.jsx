import React from "react";
import { colors } from "../data";

import HexContext from "../context/HexContext";

const Id = ({ id, extra, onClick, translateX, translateY, rotation }) => {
  translateX = (translateX - 40) || -40;
  translateY = (translateY + 70) || 70;
  //TODO rotation needs to be fixed on this. Currently the number doesn't rotate with the tile, it stays fixed
  return (
    <HexContext.Consumer>
      {hx => (
        <React.Fragment>
          <g transform={`translate(${translateX} ${translateY}) rotate(${hx.rotation})`}>
            <text
              fontFamily="Helvetica, Arial, sans-serif"
              fill={colors["text"]}
              stroke="none"
              strokeLinecap="round"
              strokeLinejoin="bevel"
              alignmentBaseline="baseline"
              textAnchor="start"
              fontSize="12"
              onClick={onClick && onClick}
              x="0"
              y="0"
            >
              {id}
            </text>
          </g>
          {extra && (
            <g transform={`translate(${translateX} ${translateY}) rotate(${!rotation ? hx.rotation : rotation})`}>
              <text
                fontFamily="Helvetica, Arial, sans-serif"
                fill={colors["text"]}
                stroke="none"
                strokeLinecap="round"
                strokeLinejoin="bevel"
                alignmentBaseline="baseline"
                textAnchor="end"
                fontSize="12"
                onClick={onClick && onClick}
                x="0"
                y="0"
              >
                {extra}
              </text>
            </g>
          )}
        </React.Fragment>
      )}
    </HexContext.Consumer>
  );
};

export default Id;
