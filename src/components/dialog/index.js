import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import Popup from '../popup';
import './style.scss';

const defHref = 'javascript:;';
const defConfirmBtn = {
  text: '确定',
  active: true,
  disabled: false,
  href: defHref,
};
const defCancelBtn = {
  text: '取消',
  active: false,
  disabled: false,
  href: defHref,
};
const parseBtn = (btn, defBtn) => {
  if (typeof btn === 'string') {
    btn = {
      text: btn,
    };
  }
  return Object.assign({}, defBtn, btn);
};

export default class Dialog extends React.PureComponent {
  static propTypes = {
    visible: PropTypes.bool,
    type: PropTypes.string,
    icon: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    zIndex: PropTypes.number,
    maskClosable: PropTypes.bool,
    showClose: PropTypes.bool,
    confirmBtn: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    cancelBtn: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    onClose: PropTypes.func,
  };

  static defaultProps = {
    visible: false,
    type: 'alert',
    icon: '',
    title: '',
    content: '',
    zIndex: 100,
    maskClosable: false,
    showClose: false,
    confirmBtn: { ...defConfirmBtn },
    cancelBtn: { ...defCancelBtn },
    onConfirm: () => {},
    onCancel: () => {},
    onClose: () => {},
  };

  state = {
    isVisible: false,
  };

  show = () => {
    this.setState({ isVisible: true });
  };
  hide = () => {
    this.setState({ isVisible: false });
  };
  confirm = e => {
    if (this._confirmBtn().disabled) {
      return;
    }
    this.hide();
    this.props.onConfirm(e);
  };
  cancel = e => {
    if (this._cancelBtn().disabled) {
      return;
    }
    this.hide();
    this.props.onCancel(e);
  };
  close = e => {
    this.hide();
    this.props.onClose(e);
  };
  maskClick = e => {
    this.props.maskClosable && this.cancel(e);
  };

  _confirmBtn = () => {
    return parseBtn(this.props.confirmBtn, defConfirmBtn);
  };
  _cancelBtn = () => {
    return parseBtn(this.props.cancelBtn, defCancelBtn);
  };

  render() {
    const {
      type,
      title,
      icon,
      content,
      zIndex,
      showClose,
      children,
    } = this.props;
    const { isVisible } = this.state;
    const containerCls = `cube-dialog-${type}`;
    const rootStyle = { zIndex };
    const isConfirm = type === 'confirm';
    const _confirmBtn = this._confirmBtn();
    const _cancelBtn = this._cancelBtn();
    const $slots = {};

    React.Children.forEach(children, (child, index) => {
      if (!child.props.slot) return;
      $slots[child.props.slot] = React.cloneElement(child);
    });

    return (
      <CSSTransition
        in={isVisible}
        timeout={400}
        classNames="cube-dialog-fade"
        onEnter={this.showPopup}
        onExited={this.hidePopup}
      >
        <Popup
          visible={isVisible}
          type="dialog"
          style={rootStyle}
          onMaskClick={this.maskClick}
        >
          <div className="cube-dialog-main">
            {showClose && (
              <span className="cube-dialog-close" onClick={this.close}>
                <i className="cubeic-close" />
              </span>
            )}
            <div className={containerCls}>
              {icon && (
                <p className="cube-dialog-icon">
                  <i className={icon} />
                </p>
              )}
              {title || $slots.title ? (
                <div className="cube-dialog-title">
                  {$slots.title || (
                    <p className="cube-dialog-title-def">{title}</p>
                  )}
                </div>
              ) : null}
              <div className="cube-dialog-content">
                {$slots.content || (
                  <div className="cube-dialog-content-def">
                    <p>{content}</p>
                  </div>
                )}
              </div>
              <div
                className={classNames('cube-dialog-btns', {
                  'border-right-1px': isConfirm,
                })}
              >
                {isConfirm ? (
                  <a
                    href={_cancelBtn.href}
                    className={classNames('cube-dialog-btn border-top-1px', {
                      'cube-dialog-btn_highlight': _cancelBtn.active,
                      'cube-dialog-btn_disabled': _cancelBtn.disabled,
                    })}
                    onClick={this.cancel}
                  >
                    {_cancelBtn.text}
                  </a>
                ) : null}
                <a
                  href={_confirmBtn.href}
                  className={classNames('cube-dialog-btn border-top-1px', {
                    'cube-dialog-btn_highlight': _confirmBtn.active,
                    'cube-dialog-btn_disabled': _confirmBtn.disabled,
                  })}
                  onClick={this.confirm}
                >
                  {_confirmBtn.text}
                </a>
              </div>
            </div>
          </div>
        </Popup>
      </CSSTransition>
    );
  }
}
