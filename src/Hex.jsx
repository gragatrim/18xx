import React from "react";
import util from "./util";
import * as R from "ramda";

import Position from "./Position";

import HexContext from "./context/HexContext";

import Hex from "./atoms/Hex";
import Divide from "./atoms/Divide";
import Track from "./atoms/Track";
import Id from "./atoms/Id";
import City from "./atoms/City";
import Town from "./atoms/Town";
import CenterTown from "./atoms/CenterTown";
import Label from "./atoms/Label";
import Icon from "./atoms/Icon";
import Value from "./atoms/Value";
import Industry from "./atoms/Industry";
import Company from "./atoms/Company";
import OffBoardRevenue from "./atoms/OffBoardRevenue";
import OffBoardTrack from "./atoms/OffBoardTrack";
import Water from "./atoms/Water";
import Bridge from "./atoms/Bridge";
import Mountain from "./atoms/Mountain";
import Tunnel from "./atoms/Tunnel";
import RouteBonus from "./atoms/RouteBonus";
import Border from "./atoms/Border";

import Token from "./Token";

const concat = R.unapply(R.reduce(R.concat, []));

const makeOffBoardTrack = track => {
  let side = track.side;
  let rotation = (track.rotation || 0) + (side - 1) * 60;
  let transform = `rotate(${rotation || 0})`;
  return (
    <g transform={transform} key={`offboard-${side}`}>
      <OffBoardTrack border={true} />
      <OffBoardTrack />
    </g>
  );
};

const makeTrack = track => {
  let point = track.start || track.end || track.side;
  let rotation = (track.rotation || 0) + (point - 1) * 60;
  let transform = `rotate(${rotation || 0})`;
  let type = track.type || util.trackType(track);
  return (
    <g transform={transform} key={`track-${type}-${point}`}>
      <Track type={type} gauge={track.gauge} offset={track.offset} />
    </g>
  );
};

const makeBorder = track => {
  let point = track.start || track.end || track.side;
  let rotation = (track.rotation || 0) + (point - 1) * 60;
  let transform = `rotate(${rotation || 0})`;
  let type = track.type || util.trackType(track);
  return (
    <g transform={transform} key={`track-board-${type}-${point}`}>
      <Track
        type={track.type || util.trackType(track)}
        gauge={track.gauge}
        border={true}
      />
    </g>
  );
};

const HexTile = ({ hex, id, border, transparent, onClick, translateX, translateY, rotation, game, clicked }) => {
  translateX = translateX || 0;
  translateY = translateY || 0;
  if (hex === undefined || hex === null) {
    return null;
  }

  let [idBase, idExtra] = (id || "").split("|");

  let getTracks = R.converge(concat, [
    R.compose(
      R.map(makeBorder),
      R.filter(t => t.cross !== "over")
    ),
    R.compose(
      R.map(makeTrack),
      R.filter(t => t.cross === "under")
    ),
    R.compose(
      R.map(makeBorder),
      R.filter(t => t.cross === "over")
    ),
    R.compose(
      R.map(makeTrack),
      R.filter(t => t.cross !== "under")
    )
  ]);

  let tracks = getTracks(hex.track || []);

  let offBoardTracks = R.map(makeOffBoardTrack, hex.offBoardTrack || []);

  let outsideCities = (
    <Position game={game} data={R.filter(c => c.outside === true, hex.cities || [])}>
      {c => <City {...c} />}
    </Position>
  );
  let cities = (
    <Position game={game} clicked={clicked} data={R.filter(c => c.outside !== true, hex.cities || [])}>
      {c => <City {...c} />}
    </Position>
  );

  let outsideCityBorders = (
    <Position game={game} data={R.filter(c => c.outside === true, hex.cities || [])}>
      {c => <City {...c} border={true} />}
    </Position>
  );
  let cityBorders = (
    <Position game={game} clicked={clicked} data={R.filter(c => c.coutside !== true, hex.cities || [])}>
      {c => <City {...c} border={true} />}
    </Position>
  );

  let towns = <Position game={game} clicked={clicked} data={hex.towns}>{t => <Town {...t} />}</Position>;

  let townBorders = (
    <Position game={game} clicked={clicked} data={hex.towns}>{t => <Town {...t} border={true} />}</Position>
  );

  let centerTowns = (
    <Position game={game} data={hex.centerTowns}>
      {t => (
        <React.Fragment>
          <CenterTown border={true} />
          <CenterTown {...t} />
        </React.Fragment>
      )}
    </Position>
  );

  let labels = <Position game={game} clicked={clicked} data={hex.labels}>{l => <Label {...l} />}</Position>;
  let icons = <Position game={game} data={hex.icons}>{i => <Icon {...i} />}</Position>;

  let water = <Position game={game} data={hex.water}>{w => <Water {...w} />}</Position>;

  let mountain = (
    <Position game={game} data={hex.mountain}>{m => <Mountain {...m} />}</Position>
  );

  let bridges = (
    <Position game={game} data={hex.bridges}>{b => <Bridge {...b} />}</Position>
  );

  let tunnels = (
    <Position game={game} data={hex.tunnels}>{t => <Tunnel {...t} />}</Position>
  );

  let divides = <Position game={game} data={hex.divides}>{t => <Divide />}</Position>;

  let offBoardRevenue = (
    <Position game={game} data={hex.offBoardRevenue}>
      {r => <OffBoardRevenue {...r} />}
    </Position>
  );

  let borders = (
    <Position game={game} data={hex.borders} >{b => <Border {...b} game={game} />}</Position>
  );

  let values = <Position game={game} clicked={clicked} data={hex.values}>{v => <Value {...v} />}</Position>;

  let industries = (
    <Position game={game} data={hex.industries}>{i => <Industry {...i} />}</Position>
  );

  let companies = (
    <Position game={game} data={hex.companies}>{c => <Company {...c} />}</Position>
  );

  let tokens = <Position game={game} data={hex.tokens}>{t => <Token {...t} />}</Position>;

  let bonus = (
    <Position game={game} data={hex.routeBonus}>{b => <RouteBonus {...b} />}</Position>
  );

  return (
    <g transform={`rotate(${!R.isNil(game) ? game.info.rotation : 0}) translate(${translateX}, ${translateY}) rotate(${rotation || 0})`}>
      <Hex color={hex.color} transparent={transparent} onClick={onClick} hexValue={hex} id={id} rotation={rotation} />

      <HexContext.Consumer>
        {hx => (
          <g clipPath="url(#hexClip)" >
            <g>
              {icons}
              {!clicked && water}
              {!clicked && mountain}
              {cityBorders}
              {townBorders}
              {tracks}
              {offBoardTracks}
              {values}
              {cities}
              {towns}
              {!clicked && centerTowns}
              {labels}
              {tokens}
              {bonus}
              {offBoardRevenue}
              {divides}
              {borders}
            </g>
          </g>
        )}
      </HexContext.Consumer>

      {border && <Hex border={true} onClick={onClick} hexValue={hex} translateX={translateX} translateY={translateY} id={id} game={game} rotation={rotation} />}
      {outsideCityBorders}

      {id && <Id id={idBase} extra={idExtra} onClick={onClick} translateX={translateX} translateY={translateY} />}

      {outsideCities}
      {offBoardRevenue}
      {industries}
      {companies}

      {tunnels}
      {bridges}
    </g>
  );
};

export default HexTile;
