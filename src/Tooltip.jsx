import React from "react";
import * as R from "ramda";

class ToolTip extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hover: true }
  }

  handleMouseOut() {
    this.setState({ hover: false })
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

    return (
      <div style={divStyle} onBlur={this.handleMouseOut.bind(this)}>
        <div style={tileStyle}>
          {tooltipUpgradeHexes}
        </div>
        <div style={rotateStyle} onClick={() => {this.props.onClick(this.props.hexValue, this.props.currentId, (this.props.rotation + 60) % 360, this)}} >
          Rotate CW
        </div>
        <div style={rotateStyle} onClick={() => {this.props.onClick(this.props.hexValue, this.props.currentId, (this.props.rotation - 60) % 360, this)}} >
          Rotate CCW
        </div>
      </div>
    );
  }
}

export default ToolTip;
