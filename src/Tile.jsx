import React from "react";
import tiles from "./data/tiles";
import * as R from "ramda";

import Hex from "./Hex";

const Tile = ({ id, border, transparent, onClick, translateX, translateY, hex }) => {
  let newHex = tiles[id];
  // If the full id doesn't exist check for only the base
  if (!newHex) {
    let [idBase] = id.split("|");
    newHex = tiles[idBase];
  }

  if(!newHex && !hex) {
    return null;
  }
  let finalHex = R.merge(hex, newHex);
  return <Hex hex={finalHex} id={id} border={border} onClick={onClick} transparent={transparent} translateX={translateX} translateY={translateY} />;
};

export default Tile;
