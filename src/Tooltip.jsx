import React from "react";
import * as R from "ramda";

class ToolTip extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hover: true }
  }

  render() {

    const divStyle = {
      display: this.state.hover ? 'block' : 'none',
      position: 'fixed',
      background: 'white',
      left: this.props.xClick + 'px',
      top: this.props.yClick + 'px'
    }

    const tileStyle = {
      float: 'left',
      'marginLeft': '5px'
    }

    const rotateStyle = {
      float: 'left',
      'marginLeft': '10px'
    }

    const wordStyle = {
      float: 'right',
      'marginLeft': '10px'
    }

    let tooltipUpgradeHexes = R.addIndex(R.map)(
      (tile, i) => (
        <div key={i} onClick={() => {this.props.onClick(this.props.hexValue, i, 0, this)}} >
          {tile}
        </div>
      ),
      this.props.upgrades
    );

    let currentHex = {};
    currentHex[this.props.hexValue.currentHex.x + this.props.hexValue.currentHex.y] = {tile: this.props.upgrades[this.props.currentId],
                                                                                       rotation: this.props.rotation,
                                                                                       hexValue: this.props.hexValue,
                                                                                       translateX: this.props.translateX,
                                                                                       translateY: this.props.translateY,
                                                                                       upgradeHexValue: this.props.upgradeHexValue};
    return (
      <div style={divStyle} >
        <div style={tileStyle}>
          {tooltipUpgradeHexes}
        </div>
        <div style={rotateStyle} onClick={() => {this.props.onClick(this.props.hexValue, this.props.currentId, (this.props.rotation + 60) % 360, this)}} >
          Rotate CW
        </div>
        <div style={rotateStyle} onClick={() => {this.props.onClick(this.props.hexValue, this.props.currentId, (this.props.rotation - 60) % 360, this)}} >
          Rotate CCW
        </div>
        <div style={wordStyle} onClick={() => {this.props.handleCancel(this);}} >
          Cancel
        </div>
        <div style={wordStyle} onClick={() => {this.props.handleSubmit(currentHex, this);}} >
          Submit
        </div>
      </div>
    );
  }
}

export default ToolTip;
