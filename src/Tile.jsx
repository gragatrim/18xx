import React from "react";
import tiles from "./data/tiles";
import * as R from "ramda";

import Hex from "./Hex";

const Tile = ({ id, border, transparent, onClick, translateX, translateY, hex, rotation, game, clicked, rev }) => {
  let newHex = tiles[id];
  // If the full id doesn't exist check for only the base
  if (!newHex) {
    let [idBase] = id.split("|");
    newHex = tiles[idBase];
  }

  if(!newHex && !hex) {
    return null;
  }

  //Need the clone here so that we don't end up polluting the original tiles object when setting companies below
  let tempHex = R.clone(R.merge(hex, newHex));
  tempHex.rev = rev;
  //This ensures that we keep any tokens in the city as it upgrades
  let companyValues = !R.isNil(hex) ? R.map(R.pick(['companies']), R.values(hex.cities)) : {};
  R.addIndex(R.map) (
    (company, i) => (
      tempHex.cities[i].companies = (!R.isNil(company.companies) ? [company.companies[0]] : {})
    ), companyValues
  );
  let finalHex = tempHex;
  if (!R.isNil(newHex.cities) && !R.isNil(newHex.cities[0].size)) {
    //This ensures that the number of city spots is correct for the new tile we're updating to
    finalHex.cities[0].size = newHex.cities[0].size;
  }
  return <Hex hex={finalHex} id={id} border={border} onClick={onClick} transparent={transparent} translateX={translateX} translateY={translateY} rotation={rotation} game={game} clicked={clicked}  />;
};

export default Tile;
