import React from 'react';
import Toast from '../../components/toast';

export default class ToastExample extends React.PureComponent {
  state = {
    options: {},
  };

  showToastTime = () => {
    this.setState(
      {
        options: {
          time: 1000,
          txt: 'Toast time 1s',
          onTimeout: () => {
            console.log('timeout');
          },
        },
      },
      () => {
        this.$toast.show();
      }
    );
  };

  showToastTime0 = () => {
    this.setState(
      {
        options: {
          time: 0,
          txt: 'Toast time 0',
        },
      },
      () => {
        this.$toast.show();
        setTimeout(() => {
          this.$toast.hide();
        }, 2000);
      }
    );
  };

  showToastMask = () => {
    this.setState(
      {
        options: {
          txt: 'Loading...',
          mask: true,
        },
      },
      () => {
        this.$toast.show();
      }
    );
  };

  showToastType = () => {
    this.setState(
      {
        options: {
          txt: 'Correct',
          type: 'correct',
        },
      },
      () => {
        this.$toast.show();
      }
    );
  };

  render() {
    return (
      <div className="cube-main">
        <Toast ref={ref => (this.$toast = ref)} {...this.state.options} />
        <div className="cube-item">
          <button
            type="button"
            className="cube-btn"
            onClick={this.showToastTime}
          >
            Toast - time 1s
          </button>
        </div>
        <div className="cube-item">
          <button
            type="button"
            className="cube-btn"
            onClick={this.showToastTime0}
          >
            Toast - time 0
          </button>
        </div>
        <div className="cube-item">
          <button
            type="button"
            className="cube-btn"
            onClick={this.showToastMask}
          >
            Toast - with mask
          </button>
        </div>
        <div className="cube-item">
          <button
            type="button"
            className="cube-btn"
            onClick={this.showToastType}
          >
            Toast - type
          </button>
        </div>
      </div>
    );
  }
}
