import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

export default class Loading extends React.PureComponent {
  static propTypes = {
    size: PropTypes.number,
  };

  balde = 12;

  render() {
    const { size } = this.props;
    const wh = `${size}px`;
    const rootStyle = size ? { width: wh, height: wh } : null;
    const spinners = len => {
      const baldes = [];
      for (let i = 0; i < len; i++) {
        baldes.push(<i className="cube-loading-spinner" key={i} />);
      }
      return baldes;
    };
    return (
      <div className="cube-loading">
        <span className="cube-loading-spinners" style={rootStyle}>
          {spinners(this.balde)}
        </span>
      </div>
    );
  }
}
