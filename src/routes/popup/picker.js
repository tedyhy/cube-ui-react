import React from 'react';
import Picker from '../../components/picker';
import Toast from '../../components/toast';
import { data1, data2, data3, data4 } from '../../services/picker';
import { delay } from '../../utils/utils';

export default class PickerExample extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      toastOpts: {},
      updatePropsPickerOpts: this.updatePropsPickerOpts,
      refillPickerOpts: this.refillPickerOpts,
    };
  }

  pickerOpts = {
    title: 'Picker',
    data: [data1],
    onSelect: this.selectHandle,
    onCancel: this.cancelHandle,
  };
  mutiPickerOpts = {
    title: 'Multi-column Picker',
    data: [data1, data2, data3],
    onSelect: this.selectHandle,
    onCancel: this.cancelHandle,
  };
  setDataPickerOpts = {
    title: 'Use SetData',
    onSelect: this.selectHandle,
    onCancel: this.cancelHandle,
  };
  aliasPickerOpts = {
    title: 'Use Alias',
    data: [[{ id: 1, name: 'A' }, { id: 2, name: 'B' }, { id: 3, name: 'C' }]],
    alias: {
      value: 'id',
      text: 'name',
    },
    onSelect: this.selectHandle,
    onCancel: this.cancelHandle,
  };
  subtitlePickerOpts = {
    title: 'Picker',
    subtitle: 'subtitle',
    data: [data1],
    onSelect: this.selectHandle,
    onCancel: this.cancelHandle,
  };
  updatePropsPickerOpts = {
    title: 'Use updateProps',
    data: [data1],
    selectedIndex: [0],
    onSelect: this.selectHandle,
    onCancel: this.cancelHandle,
  };
  refillPickerOpts = {
    title: 'Refill',
    data: [data3],
    selectedIndex: [4],
    onSelect: this.selectHandle,
    onCancel: this.cancelHandle,
  };

  showPicker = () => {
    this.$picker.show();
  };
  showMutiPicker = () => {
    this.$mutiPicker.show();
  };
  showAliasPicker = () => {
    this.$aliasPicker.show();
  };
  showSetDataPicker = () => {
    this.$setDataPicker.setData([data1, data2, data3], [1, 2, 3]);
    this.$setDataPicker.show();
  };
  showUpdatePropsPicker = async () => {
    this.$updatePropsPicker.show();

    await delay(2e3);

    this.setState({
      updatePropsPickerOpts: {
        title: 'Updated',
        data: [data1, data2, data3],
        selectedIndex: [1, 2, 3],
      },
    });
  };
  showSubtitlePicker = () => {
    this.$subtitlePicker.show();
  };
  showRefillPicker = async () => {
    this.setState(
      {
        refillPickerOpts: {
          title: 'Refill',
          data: [data3],
          selectedIndex: [4],
          onSelect: this.selectHandle,
          onCancel: this.cancelHandle,
        },
      },
      () => {
        this.$refillPicker.show();
      }
    );

    await delay(2e3);

    this.$refillPicker.refill([data4]);
  };

  selectHandle = (selectedVal, selectedIndex, selectedText) => {
    console.log(selectedVal, selectedIndex, selectedText);
  };
  cancelHandle = () => {
    this.setState(
      {
        toastOpts: {
          type: 'correct',
          txt: 'Picker canceled',
          time: 1000,
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
        <Toast ref={ref => (this.$toast = ref)} {...this.state.toastOpts} />

        <div className="cube-item">
          <Picker ref={ref => (this.$picker = ref)} {...this.pickerOpts} />
          <button type="button" className="cube-btn" onClick={this.showPicker}>
            Picker
          </button>
        </div>
        <div className="cube-item">
          <Picker
            ref={ref => (this.$mutiPicker = ref)}
            {...this.mutiPickerOpts}
          />
          <button
            type="button"
            className="cube-btn"
            onClick={this.showMutiPicker}
          >
            Multi-column Picker
          </button>
        </div>
        <div className="cube-item">
          <Picker
            ref={ref => (this.$aliasPicker = ref)}
            {...this.aliasPickerOpts}
          />
          <button
            type="button"
            className="cube-btn"
            onClick={this.showAliasPicker}
          >
            Use alias
          </button>
        </div>
        <div className="cube-item">
          <Picker
            ref={ref => (this.$setDataPicker = ref)}
            {...this.setDataPickerOpts}
          />
          <button
            type="button"
            className="cube-btn"
            onClick={this.showSetDataPicker}
          >
            Use setData
          </button>
        </div>
        <div className="cube-item">
          <Picker
            ref={ref => (this.$updatePropsPicker = ref)}
            {...this.state.updatePropsPickerOpts}
          />
          <button
            type="button"
            className="cube-btn"
            onClick={this.showUpdatePropsPicker}
          >
            Use updateProps
          </button>
        </div>
        <div className="cube-item">
          <Picker
            ref={ref => (this.$subtitlePicker = ref)}
            {...this.subtitlePickerOpts}
          />
          <button
            type="button"
            className="cube-btn"
            onClick={this.showSubtitlePicker}
          >
            Use subtitle
          </button>
        </div>
        <div className="cube-item">
          <Picker
            ref={ref => (this.$refillPicker = ref)}
            {...this.state.refillPickerOpts}
          />
          <button
            type="button"
            className="cube-btn"
            onClick={this.showRefillPicker}
          >
            Use refill
          </button>
        </div>
      </div>
    );
  }
}
