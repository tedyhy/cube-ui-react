import React from 'react';
import PropTypes from 'prop-types';
import BScroll from 'better-scroll';
import { CSSTransition } from 'react-transition-group';
import Popup from '../popup';
import './style.scss';

const DEFAULT_KEYS = {
  value: 'value',
  text: 'text',
};

export default class Picker extends React.PureComponent {
  static propTypes = {
    visible: PropTypes.bool,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    cancelTxt: PropTypes.string,
    confirmTxt: PropTypes.string,
    swipeTime: PropTypes.number,
    zIndex: PropTypes.number,
    maskClosable: PropTypes.bool,
    pending: PropTypes.bool,
    data: PropTypes.array,
    selectedIndex: PropTypes.array,
    alias: PropTypes.object,
    onSelect: PropTypes.func,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    onValueChange: PropTypes.func,
  };

  static defaultProps = {
    visible: false,
    title: '',
    subtitle: '',
    cancelTxt: '取消',
    confirmTxt: '确定',
    swipeTime: 2500,
    zIndex: 100,
    maskClosable: true,
    pending: false,
    data: [],
    selectedIndex: [],
    alias: {},
    onSelect: () => {},
    onCancel: () => {},
    onChange: () => {},
    onValueChange: () => {},
  };

  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
      isPopupVisible: false,
      pickerData: props.data.slice(), // 单列或多列 picker 数据，如：[[data1], [data2], [data3]]
    };

    // 各项选中的值
    this.pickerSelectedVal = [];
    // 各项选中的索引
    this.pickerSelectedIndex = props.selectedIndex.slice();
    // 初始化选中的索引
    if (!this.pickerSelectedIndex.length) {
      this.pickerSelectedIndex = [];
      for (let i = 0; i < this.state.pickerData.length; i++) {
        this.pickerSelectedIndex[i] = 0;
      }
    }

    // picker wheel 实例集合
    this.wheels = null;
    // TODO: wft
    this.dirty = true;
  }

  componentWillUnmount() {
    this.wheels && this.wheels.forEach(wheel => wheel.destroy());
    this.wheels = null;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible !== this.props.visible) {
      if (nextProps.visible) {
        this.show();
      } else {
        this.hide();
      }
    }
    if (
      nextProps.data !== this.props.data ||
      nextProps.selectedIndex !== this.props.selectedIndex
    ) {
      this.merge(nextProps.data, nextProps.selectedIndex);
    }
  }

  componentDidUpdate() {
    this.refresh();
  }

  show = () => {
    if (this.state.isVisible) return;

    this.setState({ isVisible: true });
    if (!this.wheels || this.dirty) {
      setTimeout(() => {
        this.wheels = this.wheels || [];
        let wheelWrapper = this.$wheelWrapper;
        for (let i = 0; i < this.state.pickerData.length; i++) {
          this._createWheel(wheelWrapper, i).enable();
          this.wheels[i].wheelTo(this.pickerSelectedIndex[i]);
        }
        this.dirty && this._destroyExtraWheels();
        this.dirty = false;
      });
    } else {
      for (let i = 0; i < this.state.pickerData.length; i++) {
        this.wheels[i].enable();
        this.wheels[i].wheelTo(this.pickerSelectedIndex[i]);
      }
    }
  };
  hide = () => {
    if (!this.state.isVisible) return;

    this.setState({ isVisible: false });
    for (let i = 0; i < this.state.pickerData.length; i++) {
      this.wheels[i].disable();
    }
  };
  setData = (data, selectedIndex) => {
    this.pickerSelectedIndex = selectedIndex ? [...selectedIndex] : [];
    this.setState({ pickerData: data.slice() }, pickerData => {
      if (this.state.isVisible) {
        setTimeout(() => {
          const wheelWrapper = this.$wheelWrapper;
          pickerData.forEach((item, i) => {
            this._createWheel(wheelWrapper, i);
            this.wheels[i].wheelTo(this.pickerSelectedIndex[i]);
          });
          this._destroyExtraWheels();
        });
      } else {
        this.dirty = true;
      }
    });
  };

  // 当 props.data | props.selectedIndex 更新时，调用 merge 更新数据
  merge = (data, selectedIndex) => {
    this.setData(data, selectedIndex);
  };
  showPopup = () => {
    this.setState({ isPopupVisible: true });
  };
  hidePopup = () => {
    this.setState({ isPopupVisible: false });
  };
  confirm = () => {
    if (!this._canConfirm()) return;
    this.hide();

    const { pickerData } = this.state;
    const valueKey = this.props.alias.value || DEFAULT_KEYS.value;
    const textKey = this.props.alias.text || DEFAULT_KEYS.text;

    const pickerSelectedText = [];
    let changed = false;

    const dataLength = pickerData.length;
    const selectedValLength = this.pickerSelectedVal.length;

    if (selectedValLength !== dataLength) {
      if (selectedValLength > dataLength) {
        this.pickerSelectedVal.splice(dataLength);
        this.pickerSelectedIndex.splice(dataLength);
      }
      changed = true;
    }

    for (let i = 0; i < dataLength; i++) {
      const index = this.wheels[i].getSelectedIndex();
      this.pickerSelectedIndex[i] = index;

      let value = null;
      let text = '';
      if (pickerData[i].length) {
        value = pickerData[i][index][valueKey];
        text = pickerData[i][index][textKey];
      }
      if (this.pickerSelectedVal[i] !== value) {
        changed = true;
      }
      this.pickerSelectedVal[i] = value;
      pickerSelectedText[i] = text;
    }

    this.props.onSelect(
      this.pickerSelectedVal,
      this.pickerSelectedIndex,
      pickerSelectedText
    );

    if (changed) {
      this.props.onValueChange(
        this.pickerSelectedVal,
        this.pickerSelectedIndex,
        pickerSelectedText
      );
    }
  };
  cancel = () => {
    this.hide();
    this.props.onCancel && this.props.onCancel();
  };
  maskClick = () => {
    this.props.maskClosable && this.cancel();
  };
  /*
  refill = (datas) => {
    let ret = []
    if (!datas.length) {
      return ret
    }
    datas.forEach((data, index) => {
      ret[index] = this.refillColumn(index, data)
    })
    return ret
  }
  refillColumn(index, data) {
    const wheelWrapper = this.$wheelWrapper
    let scroll = wheelWrapper.children[index].querySelector('.cube-picker-wheel-scroll')
    let wheel = this.wheels ? this.wheels[index] : null
    let dist = 0
    if (scroll && wheel) {
      let oldData = this.state.pickerData[index]
      this.$set(this.pickerData, index, data)
      let selectedIndex = wheel.getSelectedIndex()
      if (oldData.length) {
        let oldValue = oldData[selectedIndex][valueKey]
        for (let i = 0; i < data.length; i++) {
          if (data[i][valueKey] === oldValue) {
            dist = i
            break
          }
        }
      }
      this.pickerSelectedIndex[index] = dist
      this.$nextTick(() => {
        // recreate wheel so that the wrapperHeight will be correct.
        wheel = this._createWheel(wheelWrapper, index)
        wheel.wheelTo(dist)
      })
    }
    return dist
  }
  */
  scrollTo = (index, dist) => {
    const wheel = this.wheels[index];
    this.pickerSelectedIndex[index] = dist;
    wheel.wheelTo(dist);
  };
  refresh = () => {
    setTimeout(() => {
      this.wheels && this.wheels.forEach(wheel => wheel.refresh());
    });
  };

  _createWheel = (wheelWrapper, i) => {
    if (!this.wheels[i]) {
      const { swipeTime, onChange } = this.props;
      const wheel = (this.wheels[i] = new BScroll(wheelWrapper.children[i], {
        wheel: {
          selectedIndex: this.pickerSelectedIndex[i] || 0,
          wheelWrapperClass: 'cube-picker-wheel-scroll',
          wheelItemClass: 'cube-picker-wheel-item',
        },
        swipeTime,
        observeDOM: false,
      }));
      wheel.on('scrollEnd', () => {
        onChange && onChange(i, wheel.getSelectedIndex());
      });
    } else {
      this.wheels[i].refresh();
    }
    return this.wheels[i];
  };
  _destroyExtraWheels = () => {
    const dataLength = this.state.pickerData.length;
    if (this.wheels.length > dataLength) {
      const extraWheels = this.wheels.splice(dataLength);
      extraWheels.forEach(wheel => wheel.destroy());
    }
  };
  _canConfirm = () => {
    return (
      !this.props.pending && this.wheels.every(wheel => !wheel.isInTransition)
    );
  };

  stopPropagation(e) {
    e.stopPropagation();
    if (e.nativeEvent.stopImmediatePropagation) {
      e.nativeEvent.stopImmediatePropagation();
    }
  }

  render() {
    const {
      title,
      subtitle,
      alias,
      zIndex,
      cancelTxt,
      confirmTxt,
    } = this.props;
    const { isVisible, isPopupVisible } = this.state;
    const textKey = alias.text || DEFAULT_KEYS.text;
    const rootStyle = { zIndex };

    return (
      <CSSTransition
        in={isVisible}
        timeout={300}
        classNames="cube-picker-fade"
        onEnter={this.showPopup}
        onExited={this.hidePopup}
      >
        <Popup
          visible={isPopupVisible}
          type="picker"
          center={false}
          style={rootStyle}
          onMaskClick={this.maskClick}
        >
          <CSSTransition
            in={isVisible}
            timeout={300}
            classNames="cube-picker-move"
          >
            <div className="cube-picker-panel" onClick={this.stopPropagation}>
              <div className="cube-picker-choose border-bottom-1px">
                <span className="cube-picker-cancel" onClick={this.cancel}>
                  {cancelTxt}
                </span>
                <span className="cube-picker-confirm" onClick={this.confirm}>
                  {confirmTxt}
                </span>
                <div className="cube-picker-title-group">
                  <h1 className="cube-picker-title">{title}</h1>
                  {subtitle && (
                    <h2 className="cube-picker-subtitle">{subtitle}</h2>
                  )}
                </div>
              </div>

              <div className="cube-picker-content">
                <i className="border-bottom-1px" />
                <i className="border-top-1px" />
                <div
                  className="cube-picker-wheel-wrapper"
                  ref={ref => (this.$wheelWrapper = ref)}
                >
                  {this.state.pickerData.map((data, index) => {
                    return (
                      <div key={index}>
                        <ul className="cube-picker-wheel-scroll">
                          {data.map((item, index) => (
                            <li className="cube-picker-wheel-item" key={index}>
                              {item[textKey]}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="cube-picker-footer" />
            </div>
          </CSSTransition>
        </Popup>
      </CSSTransition>
    );
  }
}
