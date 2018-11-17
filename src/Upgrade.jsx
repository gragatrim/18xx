import React from "react";
import * as R from "ramda";
import MapSingle from "./MapSingle";
import Tooltip from "./Tooltip";
import games from "./data/games";
import Tile from "./Tile";
import GameInformation from "./GameInformation";
import Privates from "./Privates";
import Companies from "./Companies";
import util from "./util";
import PouchDB from "pouchdb";
import queryString from 'query-string'


class Upgrade extends React.Component {
  constructor(props) {
    super(props);
    this.values = queryString.parse(this.props.location.search)
    let dbName = "map_" + this.values.gameToLoad;
    this.localDb = new PouchDB(dbName);
    this.remoteDb = new PouchDB(process.env.REACT_APP_remotePouchDb + dbName);
    this.state = {
      hexClicked: null,
      id: 57,
      reactTooltip: '',
      savedHexes: {},
      initialClick: true, };
    this.localDb.allDocs({ include_docs: true, attachments: true }).then(function (result) { this.setState({savedHexes: result.rows}) }.bind(this));
    this.localDb.changes({
      since: 'now',
      live: true
    }).on('change', this.handleCancel.bind(this));
    this.game = games[this.props.match.params.game];
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleSubmit(currentHex, event) {
      let dbHexes = {
        _id: R.keys(currentHex)[0],
        hex: currentHex,
      };
    if (!R.isNil(currentHex[R.keys(currentHex)[0]].hexValue.rev)) {
      dbHexes._rev = currentHex[R.keys(currentHex)[0]].hexValue.rev;
    }
    this.localDb.put(dbHexes, function callback(err, result) {
      if (err) {
        }
    });

    this.localDb.allDocs({ include_docs: true, attachments: true }).then(function (result) { this.setState({savedHexes: result.rows, initialClick: true, hexClicked: undefined, reactTooltip: undefined}) }.bind(this));
  }

  handleCancel(event) {
    this.localDb.allDocs({ include_docs: true, attachments: true }).then(function (result) { this.setState({savedHexes: result.rows, initialClick: true, reactTooltip: undefined, hexClicked: undefined}) }.bind(this));
  }

  handleOnClick(hexValue, selecedHexValue, rotation, hexThis, event) {
    if (!R.isNil(this.state.savedHexes[R.join('', R.values(hexValue.currentHex))]) && this.state.initialClick === true) {
      rotation = this.state.savedHexes[R.join('', R.values(hexValue.currentHex))].rotation || rotation
    }
    let upgrades = games[this.props.match.params.game].upgradesTo;
    let upgradeTo = upgrades[hexValue.id] ? upgrades[hexValue.id][selecedHexValue] : hexValue.id;
    if (R.isNil(upgradeTo) || upgradeTo === hexValue.id) {
      this.handleCancel();
      return false;
    }
    let coords = util.getCoords(this.game);
    //The else here means we're rotated 90 degrees, so the values are what rotating it 90 degree will give
    let xCoord = (this.game.info.orientation === "horizontal") ? coords.x[hexValue.currentHex.x] : coords.y[hexValue.currentHex.y];
    let yCoord = (this.game.info.orientation === "horizontal") ? coords.y[hexValue.currentHex.y] : (coords.x[hexValue.currentHex.x] * -1);
    let xClick = R.isNil(event) ? hexThis.props.xClick : event.clientX;
    let yClick = R.isNil(event) ? hexThis.props.yClick : event.clientY;

    let newHexValue = R.merge(hexValue, {id: upgradeTo});
    let hexClicked = <Tile id={upgradeTo} border={true} transparent={this.game.info.transparent} onClick={this.handleOnClick} translateX={xCoord} translateY={yCoord} hex={newHexValue} rotation={rotation} game={this.game} clicked={true} rev={hexValue.rev} opacity=".9" />
    let tooltip =  <Tooltip key="tooltipTime" upgrades={upgrades[hexValue.id]} xClick={xClick} yClick={yClick} onClick={this.handleOnClick} hexValue={hexValue} rotation={rotation} currentId={R.invertObj(upgrades[hexValue.id])[upgradeTo]} handleSubmit={this.handleSubmit} translateX={xCoord} translateY={yCoord} upgradeHexValue={newHexValue} handleCancel={this.handleCancel}/>;
    this.localDb.allDocs({ include_docs: true, attachments: true }).then(function (result) { this.setState({savedHexes: result.rows, id: hexValue.hexes[0], initialClick: false, reactTooltip: tooltip , hexClicked: hexClicked}) }.bind(this));
  }

  sync() {
    let opts = {live: true};
    this.localDb.replicate.to(this.remoteDb, opts);
    this.localDb.replicate.from(this.remoteDb, opts);
  }


  render() {
    if (R.isNil(this.state.hexClicked) && R.isNil(this.state.savedHexes)) {
      let map = <MapSingle key="map" match={this.props.match} onClick={this.handleOnClick}/>
      let gameInfo = <GameInformation key="gameInfo" values={this.values}/>
      let privateInfo = <Privates key="privateinfo" values={this.values} game={this.game}/>
      let companyInfo = <Companies key="companyinfo" values={this.values} game={this.game}/>
      let returnValues = [gameInfo, privateInfo, companyInfo, map];
      return(
       returnValues
    )
  } else {
      let hexesClicked = R.addIndex(R.map)(
        (tile, i) => (
          <Tile id={tile.doc.hex[tile.id]['tile']} key={i} border={true} transparent={this.game.info.transparent} onClick={this.handleOnClick} translateX={tile.doc.hex[tile.id]['translateX']} translateY={tile.doc.hex[tile.id]['translateY']} hex={tile.doc.hex[tile.id]['upgradeHexValue']} rotation={tile.doc.hex[tile.id]['rotation']} game={this.game} clicked={true} rev={tile.value.rev} />
          ),
          this.state.savedHexes
      );
      let map = <MapSingle key="maptime" match={this.props.match} onClick={this.handleOnClick} hexOverlay={this.state.hexClicked} hexesClicked={R.values(hexesClicked)}/>
      let gameInfo = <GameInformation key="gameInfo" values={this.values}/>
      let privateInfo = <Privates key="privateinfo" values={this.values} game={this.game}/>
      let companyInfo = <Companies key="companyinfo" values={this.values} game={this.game}/>
      let returnValues = [gameInfo, privateInfo, companyInfo, map, this.state.reactTooltip];
      this.sync();
      return (
        returnValues
      );
    }
  }
};
export default Upgrade;
