import React from 'react';
import Popup from '../../components/popup';

let cur = 0;
const positions = ['top', 'right', 'bottom', 'left', 'center'];

export default class ToastLayout extends React.PureComponent {
  state = {
    type: 'popup-dialog',
    mask: true,
    visible1: false,
    visible2: false,
    visible3: false,
    visible4: false,
  };

  position = '';

  showPopup = i => e => {
    if (i === 4) {
      this.position = positions[cur++];
      if (cur === positions.length) {
        cur = 0;
      }
    }
    this.setState({ ['visible' + i]: true });
    setTimeout(() => {
      this.setState({ ['visible' + i]: false });
    }, 2000);
  };

  show = () => {
    this.$popup.show();
  };

  hide = () => {
    this.$popup.hide();
  };

  render() {
    return (
      <div className="cube-page-main">
        <div>
          <Popup type="my-popup" visible={this.state.visible1}>
            My Popup Content 1
          </Popup>
          <button
            type="button"
            className="cube-btn"
            onClick={this.showPopup(1)}
          >
            Show Popup
          </button>
        </div>
        <div>
          <Popup type="my-popup" visible={this.state.visible2} mask={false}>
            My Popup Content 2
          </Popup>
          <button
            type="button"
            className="cube-btn"
            onClick={this.showPopup(2)}
          >
            Show Popup - no mask
          </button>
        </div>
        <div>
          <Popup type="my-popup" visible={this.state.visible3} mask={false}>
            <i>My Popup Content 3</i>
          </Popup>
          <button
            type="button"
            className="cube-btn"
            onClick={this.showPopup(3)}
          >
            Show Popup - with content
          </button>
        </div>
        <div>
          <Popup
            type="my-popup"
            visible={this.state.visible4}
            position={this.position}
            maskClosable
          >
            My Popup Content 4
          </Popup>
          <button
            type="button"
            className="cube-btn"
            onClick={this.showPopup(4)}
          >
            top/right/bottom/left/center
          </button>
        </div>
        <div>
          <Popup type="extend-popup" ref={ref => (this.$popup = ref)}>
            <div className="cube-extend-popup-content" onClick={this.hide}>
              click here hide
            </div>
          </Popup>
          <button type="button" className="cube-btn" onClick={this.show}>
            Show Extend Popup
          </button>
        </div>
      </div>
    );
  }
}
