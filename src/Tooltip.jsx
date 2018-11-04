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

    let tooltipUpgradeHexes = R.addIndex(R.map)(
      (tile, i) => (
        <div key={i} onClick={() => {this.props.onClick(this.props.hexValue, i, this)}} >
          {tile}
        </div>
      ),
      this.props.upgrades
    );

    return (
      <div style={divStyle} onBlur={this.handleMouseOut.bind(this)}>
        {tooltipUpgradeHexes}
      </div>
    );
  }
}

export default ToolTip;
