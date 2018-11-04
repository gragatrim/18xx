import React from "react";
import * as R from "ramda";
import MapSingle from "./MapSingle";
import Tooltip from "./Tooltip";
import games from "./data/games";
import Tile from "./Tile";
import util from "./util";

class Upgrade extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hexClicked: null,
      id: 57,
      reactTooltip: '',
    };
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(hexValue, selecedHexValue, rotation, hexThis, event) {
    let game = games[this.props.match.params.game];
    let upgrades = games[this.props.match.params.game].upgradesTo;
    let upgradeTo = upgrades[hexValue.id] ? upgrades[hexValue.id][selecedHexValue] : hexValue.id;
    if (R.isNil(upgradeTo) || upgradeTo == hexValue.id) {
      return false;
    }
    let coords = util.getCoords(game);
    //The else here means we're rotated 90 degrees, so the values are what rotating it 90 degree will give
    let xCoord = (game.info.orientation === "horizontal") ? coords.x[hexValue.currentHex.x] : coords.y[hexValue.currentHex.y];
    let yCoord = (game.info.orientation === "horizontal") ? coords.y[hexValue.currentHex.y] : (coords.x[hexValue.currentHex.y] * -1);
    let xClick = R.isNil(event) ? hexThis.props.xClick : event.clientX;
    let yClick = R.isNil(event) ? hexThis.props.yClick : event.clientY;

    let newHexValue = R.merge(hexValue, {id: upgradeTo});
    let hexClicked = <Tile id={upgradeTo} border={true} transparent={game.info.transparent} onClick={this.handleOnClick} translateX={xCoord} translateY={yCoord} hex={newHexValue} rotation={rotation} />
    this.setState({
      hexClicked: hexClicked,
      id: hexValue.hexes[0],
      reactTooltip: <Tooltip key="tooltipTime" upgrades={upgrades[hexValue.id]} xClick={xClick} yClick={yClick} onClick={this.handleOnClick} hexValue={hexValue} rotation={rotation} currentId={R.invertObj(upgrades[hexValue.id])[upgradeTo]}/>
    });
  }

  render() {
    if (R.isNil(this.state.hexClicked)) {
      return(
        <MapSingle match={this.props.match} onClick={this.handleOnClick}/>
      )
    } else {
        let map = <MapSingle key="maptime" match={this.props.match} onClick={this.handleOnClick} hexOverlay={this.state.hexClicked}/>
        let returnValues = [map, this.state.reactTooltip]
      return (
        returnValues
      );
    }
  }
};
export default Upgrade;
