import React from 'react';
import Picker from '../../components/picker';
import Toast from '../../components/toast';
import { data1, data2, data3 } from '../../services/picker';
import { delay } from '../../utils/utils';

export default class PickerExample extends React.PureComponent {
  state = {
    pickerOpts: {},
    toastOpts: {},
  };

  showPicker = () => {
    this.setState(
      {
        pickerOpts: {
          title: 'Picker',
          data: [data1],
          onSelect: this.selectHandle,
          onCancel: this.cancelHandle,
        },
      },
      () => {
        this.$picker.show();
      }
    );
  };

  showMutiPicker = () => {
    this.setState(
      {
        pickerOpts: {
          title: 'Multi-column Picker',
          data: [data1, data2, data3],
          onSelect: this.selectHandle,
          onCancel: this.cancelHandle,
        },
      },
      () => {
        this.$picker.show();
      }
    );
  };

  showAliasPicker = () => {
    this.setState(
      {
        pickerOpts: {
          title: 'Use Alias',
          data: [
            [{ id: 1, name: 'A' }, { id: 2, name: 'B' }, { id: 3, name: 'C' }],
          ],
          alias: {
            value: 'id',
            text: 'name',
          },
          onSelect: this.selectHandle,
          onCancel: this.cancelHandle,
        },
      },
      () => {
        this.$picker.show();
      }
    );
  };

  showSetDataPicker = () => {
    this.setState(
      {
        pickerOpts: {
          title: 'Use SetData',
          onSelect: this.selectHandle,
          onCancel: this.cancelHandle,
        },
      },
      () => {
        this.$picker.setData([data1, data2, data3], [1, 2, 3]);
        this.$picker.show();
      }
    );
  };

  showUpdatePropsPicker = async () => {
    this.$picker.show();
    await delay(1e3);

    this.setState({
      pickerOpts: {
        title: 'Updated',
        data: [data1, data2, data3],
        selectedIndex: [1, 2, 3],
      },
    });
  };

  showSubtitlePicker = () => {
    this.setState(
      {
        pickerOpts: {
          title: 'Picker',
          subtitle: 'subtitle',
          data: [data1],
          onSelect: this.selectHandle,
          onCancel: this.cancelHandle,
        },
      },
      () => {
        this.$picker.show();
      }
    );
  };

  selectHandle = (selectedVal, selectedIndex, selectedText) => {
    // this.$createDialog({
    //   type: 'warn',
    //   content: `Selected Item: <br/> - value: ${selectedVal.join(', ')} <br/> - index: ${selectedIndex.join(', ')} <br/> - text: ${selectedText.join(' ')}`,
    //   icon: 'cubeic-alert'
    // }).show()
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
        <Picker ref={ref => (this.$picker = ref)} {...this.state.pickerOpts} />
        <Toast ref={ref => (this.$toast = ref)} {...this.state.toastOpts} />

        <div className="cube-item">
          <button type="button" className="cube-btn" onClick={this.showPicker}>
            Picker
          </button>
        </div>
        <div className="cube-item">
          <button
            type="button"
            className="cube-btn"
            onClick={this.showMutiPicker}
          >
            Multi-column Picker
          </button>
        </div>
        <div className="cube-item">
          <button
            type="button"
            className="cube-btn"
            onClick={this.showAliasPicker}
          >
            Use alias
          </button>
        </div>
        <div className="cube-item">
          <button
            type="button"
            className="cube-btn"
            onClick={this.showSetDataPicker}
          >
            Use setData
          </button>
        </div>
        <div className="cube-item">
          <button
            type="button"
            className="cube-btn"
            onClick={this.showUpdatePropsPicker}
          >
            Use updateProps
          </button>
        </div>
        <div className="cube-item">
          <button
            type="button"
            className="cube-btn"
            onClick={this.showSubtitlePicker}
          >
            Use subtitle
          </button>
        </div>
      </div>
    );
  }
}
