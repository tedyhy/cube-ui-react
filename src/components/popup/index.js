import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import './style.scss';

export default class Popup extends React.PureComponent {
  static propTypes = {
    visible: PropTypes.bool,
    type: PropTypes.string,
    style: PropTypes.object,
    mask: PropTypes.bool,
    maskCnt: PropTypes.any,
    maskClosable: PropTypes.bool,
    center: PropTypes.bool,
    position: PropTypes.string,
    onMaskClick: PropTypes.func,
  };

  static defaultProps = {
    visible: false,
    type: '',
    style: {},
    mask: true,
    maskCnt: '',
    maskClosable: false,
    center: true,
    position: '',
    onMaskClick: () => {},
  };

  state = {
    isVisible: this.props.visible,
  };

  handler = null;

  componentDidMount() {
    this.handler = addEventListener(
      this.$popup,
      'touchmove',
      this.preventDefault
    );
  }

  componentWillUnmount() {
    const handler = this.handler;
    if (handler && handler.remove) {
      handler.remove();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible !== this.props.visible) {
      if (nextProps.visible) {
        this.show();
      } else {
        this.hide();
      }
    }
  }

  show = () => {
    this.setState({ isVisible: true });
  };

  hide = () => {
    this.setState({ isVisible: false });
  };

  preventDefault(e) {
    e.preventDefault();
  }

  stopPropagation(e) {
    e.stopPropagation();
    if (e.nativeEvent.stopImmediatePropagation) {
      e.nativeEvent.stopImmediatePropagation();
    }
  }

  maskClick = e => {
    const { maskClosable, onMaskClick } = this.props;
    onMaskClick(e);
    if (maskClosable) {
      this.hide();
    }
  };

  render() {
    const { type, style, mask, maskCnt, center, position } = this.props;
    const rootClass = classNames('cube-popup', {
      'cube-popup_mask': mask,
      [`cube-${type}`]: type,
    });
    const containerClass = classNames('cube-popup-container', {
      [`cube-popup-${position}`]: position,
      'cube-popup-center': !position && center,
    });
    const rootStyle = { ...style, display: this.state.isVisible ? '' : 'none' };

    return (
      <div
        ref={ref => (this.$popup = ref)}
        className={rootClass}
        style={rootStyle}
      >
        <div className="cube-popup-mask" onClick={this.maskClick}>
          {maskCnt}
        </div>
        <div className={containerClass}>
          <div className="cube-popup-content">{this.props.children}</div>
        </div>
      </div>
    );
  }
}
