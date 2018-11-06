import React from "react";
import tiles from "./data/tiles";
import * as R from "ramda";

import Hex from "./Hex";

const Tile = ({ id, border, transparent, onClick, translateX, translateY, hex, rotation, game }) => {
  let newHex = tiles[id];
  // If the full id doesn't exist check for only the base
  if (!newHex) {
    let [idBase] = id.split("|");
    newHex = tiles[idBase];
  }

  if(!newHex && !hex) {
    return null;
  }

  let tempHex = R.merge(hex, newHex);
  //This ensures that we keep any tokens in the city as it upgrades
  let finalHex = R.mergeDeepRight(tempHex, !R.isNil(hex.cities) ? {cities: [{companies: hex.cities[0].companies}]} : {});
  if (!R.isNil(newHex.cities) && !R.isNil(newHex.cities[0].size)) {
    //This ensures that the number of city spots is correct for the new tile we're updating to
    finalHex.cities[0].size = newHex.cities[0].size;
  }
  return <Hex hex={finalHex} id={id} border={border} onClick={onClick} transparent={transparent} translateX={translateX} translateY={translateY} rotation={rotation} game={game} />;
};

export default Tile;
