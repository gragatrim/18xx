import React from "react";
import { colors } from "../data";

import HexContext from "../context/HexContext";

const Id = ({ id, extra, onClick}) => {
  let translateX = -40;
  let translateY = 70;
  return (
    <HexContext.Consumer>
      {hx => (
        <React.Fragment>
          <g transform={`translate(${translateX} ${translateY})`}>
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
            <g transform={`translate(${translateX} ${translateY})`}>
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
