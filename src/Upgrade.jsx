import React from "react";
import util from "./util";
import games from "./data/games";
import * as R from "ramda";

import MapSingle from "./MapSingle";
import Tile from "./Tile";

class Upgrade extends React.Component {
  constructor(props) {
    super(props);

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(hexValue, event) {
    console.log(hexValue);
    alert('A hex was clicked: ' + hexValue.hexes[0])
    //event.currentTarget.outerHTML=<Tile id="7" />
  }
  render() {
    return(
      <MapSingle match={this.props.match} onClick={this.handleOnClick}/>
    )
  }
};
export default Upgrade;
