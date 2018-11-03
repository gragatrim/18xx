import React from "react";
import * as R from "ramda";
import * as ReactTooltip from "react-tooltip";
import MapSingle from "./MapSingle";
import games from "./data/games";
import Tile from "./Tile";
import util from "./util";

class Upgrade extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hexClicked: null,
      id: 57,
    };
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(hexValue, event) {
    let game = games[this.props.match.params.game];
    let upgrades = games[this.props.match.params.game].upgradesTo;
    let upgradeTo = upgrades[hexValue.id] ? upgrades[hexValue.id][0] : hexValue.id;
    let coords = util.getCoords(game);
    //The else here means we're rotated 90 degrees, so the values are what rotating it 90 degree will give
    let xCoord = (game.info.orientation === "horizontal") ? coords.x[R.match(/[a-zA-Z]+/,hexValue.hexes[0])[0]] : coords.y[R.match(/[a-zA-Z]+/,hexValue.hexes[0])[0]];
    let yCoord = (game.info.orientation === "horizontal") ? coords.y[R.match(/[0-9]+/,hexValue.hexes[0])[0]] : (coords.x[R.match(/[0-9]+/,hexValue.hexes[0])[0]] * -1);

    let tooltipHex = "hex" + hexValue.id;
    //let tooltipUpgradeHexes = 
    let tooltipInfo = {"data-tip": R.join("\n", upgrades[hexValue.id])};
    let newHexValue = R.merge(hexValue, {id: upgradeTo});
    let hexClicked = <Tile id={upgradeTo} border={true} transparent={game.info.transparent} onClick={this.handleOnClick} translateX={xCoord} translateY={yCoord} hex={newHexValue} tooltipInfo={tooltipInfo} />
    this.setState({
      hexClicked: hexClicked,
      id: hexValue.hexes[0],
      reactTooltip: <ReactTooltip key={tooltipHex}  effect='solid' delayHide={500} delayUpdate={500} place={'right'} border={true} type={'light'} globalEventOff="click"/>
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
