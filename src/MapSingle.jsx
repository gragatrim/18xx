import React from "react";
import games from "./data/games";
import Map from "./Map";
import Svg from "./Svg";
import Title from "./Title";
import HexContext from "./context/HexContext";
import util from "./util";
import * as R from "ramda";
import { Redirect } from "react-router-dom";

const MapSingle = ({ match, onClick, hexOverlay, hexesClicked }) => {
  let game = games[match.params.game];
  game.info.rotation =  game.info.orientation === "horizontal" ? 0 : 90

  if (match.params.variation && !Array.isArray(game.map)) {
    return <Redirect to={`/${match.params.game}/map`} />;
  } else if (!match.params.variation && Array.isArray(game.map)) {
    return <Redirect to={`/${match.params.game}/map/0`} />;
  }

  let variation = Number(match.params.variation) || 0;

  let hexWidth = game.info.width;
  let edge = hexWidth * util.HEX_RATIO;
  let halfHexWidth = 0.5 * hexWidth;

  let map = Array.isArray(game.map) ? game.map[variation] : game.map;
  let hexes = map.hexes;
  if (map.copy !== undefined) {
    hexes = R.concat(game.map[map.copy].hexes, hexes);
  }
  let maxX = util.maxMapX(hexes);
  let maxY = util.maxMapY(hexes);

  let totalWidth =
    100 + (game.info.extraTotalWidth || 0) + halfHexWidth * (maxX + 1);
  let totalHeight =
    100 +
    (game.info.extraTotalHeight || 0) +
    (1.5 * (maxY - 1) * edge + 2 * edge);

  if (game.info.orientation === "horizontal") {
    let tmp = totalWidth;
    totalWidth = totalHeight;
    totalHeight = tmp;
  }

  return (
    <HexContext.Provider
      value={{
        width: game.info.width,
        rotation: game.info.orientation === "horizontal" ? 0 : 90
      }}
    >
      <div className="map">
        <Svg width={totalWidth} height={totalHeight}>
          <Title game={game} variation={variation} />
          <Map game={game} variation={variation} onClick={onClick} />
          {hexesClicked && hexesClicked}
          {hexOverlay && hexOverlay}
        </Svg>
      </div>
    </HexContext.Provider>
  );
};

export default MapSingle;
