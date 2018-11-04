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
      savedHexes: {},
    };
    this.game = games[this.props.match.params.game];
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleSubmit(currentHex, event) {
    this.setState({
      savedHexes: R.merge(this.state.savedHexes, currentHex),
      reactTooltip: undefined
    });
  }

  handleCancel(event) {
    this.setState({
      hexClicked: undefined,
      reactTooltip: undefined
    });
  }

  handleOnClick(hexValue, selecedHexValue, rotation, hexThis, event) {
    let upgrades = games[this.props.match.params.game].upgradesTo;
    let upgradeTo = upgrades[hexValue.id] ? upgrades[hexValue.id][selecedHexValue] : hexValue.id;
    if (R.isNil(upgradeTo) || upgradeTo === hexValue.id) {
      this.handleCancel();
      return false;
    }
    let coords = util.getCoords(this.game);
    //The else here means we're rotated 90 degrees, so the values are what rotating it 90 degree will give
    let xCoord = (this.game.info.orientation === "horizontal") ? coords.x[hexValue.currentHex.x] : coords.y[hexValue.currentHex.y];
    let yCoord = (this.game.info.orientation === "horizontal") ? coords.y[hexValue.currentHex.y] : (coords.x[hexValue.currentHex.y] * -1);
    let xClick = R.isNil(event) ? hexThis.props.xClick : event.clientX;
    let yClick = R.isNil(event) ? hexThis.props.yClick : event.clientY;

    let newHexValue = R.merge(hexValue, {id: upgradeTo});
    let hexClicked = <Tile id={upgradeTo} border={true} transparent={this.game.info.transparent} onClick={this.handleOnClick} translateX={xCoord} translateY={yCoord} hex={newHexValue} rotation={rotation} />
    this.setState({
      hexClicked: hexClicked,
      id: hexValue.hexes[0],
      reactTooltip: <Tooltip key="tooltipTime" upgrades={upgrades[hexValue.id]} xClick={xClick} yClick={yClick} onClick={this.handleOnClick} hexValue={hexValue} rotation={rotation} currentId={R.invertObj(upgrades[hexValue.id])[upgradeTo]} handleSubmit={this.handleSubmit} translateX={xCoord} translateY={yCoord} upgradeHexValue={newHexValue} handleCancel={this.handleCancel}/>
    });
  }

  render() {
    if (R.isNil(this.state.hexClicked) && R.isNil(this.state.savedHexes)) {
      return(
        <MapSingle match={this.props.match} onClick={this.handleOnClick}/>
      )
    } else {
        let hexesClicked = R.addIndex(R.map)(
          (tile, i) => (
            <Tile id={tile['tile']} key={i} border={true} transparent={this.game.info.transparent} onClick={this.handleOnClick} translateX={tile['translateX']} translateY={tile['translateY']} hex={tile['upgradeHexValue']} rotation={tile['rotation']} />
          ),
          this.state.savedHexes
        );
        let map = <MapSingle key="maptime" match={this.props.match} onClick={this.handleOnClick} hexOverlay={this.state.hexClicked} hexesClicked={R.values(hexesClicked)}/>
        let returnValues = [map, this.state.reactTooltip];
      return (
        returnValues
      );
    }
  }
};
export default Upgrade;
