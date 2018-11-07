import React from "react";
import * as R from "ramda";

const Position = ({ data, children, game, clicked }) => {
  if (!data) {
    data = [];
  } else if (!Array.isArray(data)) {
    data = [data];
  }
  return R.map(d => {
    // Set everything to defaults of 0
    //We check for clicked to make sure we aren't going to double apply a rotation since it was already applied.
    let gameRotation = (!R.isNil(game) ? (clicked !== true ? game.info.rotation : 0) : 0)
    let angle = (d.angle || 0) - gameRotation;
    let rotation = d.rotate || d.rotation || 0;
    if (d.side) {
      rotation = rotation + (d.side - 1) * 60;
    }

    let x = d.x || 0;
    let y = d.y || 0;

    // Compute percent distant into translate
    let translate = 75 * (d.percent || 0);
    let rotate = -(d.angle || 0) + (rotation || 0);

    return (
      <g
        key={`position-${angle}-${rotate}-${translate}-${x}-${y}`}
        transform={`rotate(${angle} ${x} ${y}) translate(0 ${translate}) rotate(${rotate} ${x} ${y}) translate(${x} ${y})`}
      >
        {children(d)}
      </g>
    );
  }, data);
};

export default Position;
