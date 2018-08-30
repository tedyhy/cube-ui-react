import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import Loading from '../loading';
import Popup from '../popup';
import './style.scss';

export default class Toast extends React.PureComponent {
  static propTypes = {
    visible: PropTypes.bool,
    type: PropTypes.string,
    mask: PropTypes.bool,
    icon: PropTypes.string,
    txt: PropTypes.string,
    time: PropTypes.number,
    zIndex: PropTypes.number,
    maskClosable: PropTypes.bool,
    onTimeout: PropTypes.func,
  };

  static defaultProps = {
    visible: false,
    type: 'loading',
    mask: false,
    icon: '',
    txt: '',
    time: 3e3,
    zIndex: 900,
    maskClosable: false,
  };

  state = {
    isVisible: this.props.visible,
  };

  timer = null;

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
    this.clearTimer();
    this.setState({ isVisible: true }, () => {
      const { time, onTimeout } = this.props;
      if (time !== 0) {
        this.timer = setTimeout(() => {
          this.hide();
          onTimeout && onTimeout();
        }, time);
      }
    });
  };

  hide = () => {
    this.clearTimer();
    this.setState({ isVisible: false });
  };

  clearTimer = () => {
    clearTimeout(this.timer);
    this.timer = null;
  };

  maskClick = e => {
    const { maskClosable } = this.props;
    if (maskClosable) {
      this.hide();
    }
  };

  iconClass = () => {
    const { icon, type } = this.props;
    const iconClass = {};
    if (icon) {
      iconClass[icon] = true;
    }
    const classMap = {
      correct: 'cubeic-right',
      error: 'cubeic-wrong',
      warn: 'cubeic-warn',
    };
    const icon2 = classMap[type];
    if (icon2) {
      iconClass[icon2] = true;
    }
    return iconClass;
  };

  render() {
    const { type, txt, mask, zIndex } = this.props;
    const iconClassString = this.iconClass();
    const style = { zIndex };
    const isLoading = type === 'loading';

    return (
      <CSSTransition
        in={this.state.isVisible}
        timeout={200}
        classNames="cube-toast-fade"
        unmountOnExit
      >
        <Popup
          visible
          type="toast"
          style={style}
          mask={mask}
          onMaskClick={this.maskClick}
        >
          {!isLoading && (
            <i className={classNames('cube-toast-icon', iconClassString)} />
          )}
          {isLoading && <Loading />}
          {txt && <div className="cube-toast-tip">{txt}</div>}
        </Popup>
      </CSSTransition>
    );
  }
}
