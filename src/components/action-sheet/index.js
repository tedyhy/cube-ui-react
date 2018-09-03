import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import Popup from '../popup';
import './style.scss';

const liClsString = (item, index, active) =>
  classNames('cube-action-sheet-item border-bottom-1px', item.class || '', {
    'cube-action-sheet-item_active': index === active,
  });

export default class ActionSheet extends React.PureComponent {
  static propTypes = {
    visible: PropTypes.bool,
    title: PropTypes.string,
    cancelTxt: PropTypes.string,
    active: PropTypes.number,
    zIndex: PropTypes.number,
    maskClosable: PropTypes.bool,
    pickerStyle: PropTypes.bool,
    data: PropTypes.array,
    onSelect: PropTypes.func,
    onCancel: PropTypes.func,
  };

  static defaultProps = {
    visible: false,
    title: '',
    cancelTxt: '取消',
    active: -1,
    zIndex: 100,
    maskClosable: true,
    pickerStyle: false,
    data: [],
    onSelect: () => {},
    onCancel: () => {},
  };

  state = {
    isVisible: false,
    isPopupVisible: false,
  };

  show = () => {
    this.setState({ isVisible: true });
  };
  hide = () => {
    this.setState({ isVisible: false });
  };
  showPopup = () => {
    this.setState({ isPopupVisible: true });
  };
  hidePopup = () => {
    this.setState({ isPopupVisible: false });
  };

  cancel = () => {
    this.hide();
    this.props.onCancel && this.props.onCancel();
  };
  maskClick = () => {
    this.props.maskClosable && this.cancel();
  };
  itemClick = (item, index) => () => {
    this.hide();
    this.props.onSelect && this.props.onSelect(item, index);
  };

  stopPropagation(e) {
    e.stopPropagation();
    if (e.nativeEvent.stopImmediatePropagation) {
      e.nativeEvent.stopImmediatePropagation();
    }
  }

  render() {
    const { title, cancelTxt, pickerStyle, zIndex, data, active } = this.props;
    const { isVisible, isPopupVisible } = this.state;
    const rootClass = pickerStyle ? 'cube-action-sheet_picker' : '';
    const rootStyle = { zIndex };

    return (
      <CSSTransition
        in={isVisible}
        timeout={300}
        classNames="cube-action-sheet-fade"
        onEnter={this.showPopup}
        onExited={this.hidePopup}
      >
        <Popup
          visible={isPopupVisible}
          type="action-sheet"
          center={false}
          className={rootClass}
          style={rootStyle}
          onMaskClick={this.maskClick}
        >
          <CSSTransition
            in={isVisible}
            timeout={300}
            classNames="cube-action-sheet-move"
          >
            <div
              className="cube-action-sheet-panel"
              onClick={this.stopPropagation}
            >
              {pickerStyle || title ? (
                <h1 className="cube-action-sheet-title border-bottom-1px">
                  {title}
                </h1>
              ) : null}
              <div className="cube-action-sheet-content">
                <ul className="cube-action-sheet-list">
                  {data.map((item, index) => (
                    <li
                      key={`${item.content}`}
                      data-align={item.align}
                      className={liClsString(item, index, active)}
                      onClick={this.itemClick(item, index)}
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    />
                  ))}
                </ul>
              </div>
              <div className="cube-action-sheet-space" />
              <div className="cube-action-sheet-cancel" onClick={this.cancel}>
                <span>{cancelTxt}</span>
              </div>
            </div>
          </CSSTransition>
        </Popup>
      </CSSTransition>
    );
  }
}
