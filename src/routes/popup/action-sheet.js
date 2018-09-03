import React from 'react';
import ActionSheet from '../../components/action-sheet';
import Toast from '../../components/toast';

export default class ActionSheetExample extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      toastOpts: {},
      actionSheetOpts: {},
    };
  }

  showDefault = () => {
    this.setState({
      actionSheetOpts: {
        title: '我是标题~~~',
        data: [
          {
            content: '<em>align - center</em>',
            class: 'cube-foo',
          },
          {
            content: 'align - left',
            align: 'left',
          },
          {
            content: 'align - right',
            align: 'right',
          },
        ],
        onSelect: (item, index) => {
          this.showToast({
            txt: `Clicked ${item.content}`,
            type: 'correct',
            time: 1000,
          });
        },
      },
    });
    this.$actionSheet.show();
  };
  showActive = () => {
    this.setState({
      actionSheetOpts: {
        title: '我是标题~~~',
        active: 0,
        data: [
          {
            content: '舒适型',
          },
          {
            content: '七座商务',
          },
          {
            content: '豪华型',
          },
        ],
        onSelect: (item, index) => {
          this.showToast({
            txt: `Clicked ${item.content}`,
            type: 'correct',
            time: 1000,
          });
        },
        onCancel: () => {
          this.showToast({
            txt: `Clicked canceled`,
            type: 'warn',
            time: 1000,
          });
        },
      },
    });
    this.$actionSheet.show();
  };
  showPickerStyle = () => {
    this.setState({
      actionSheetOpts: {
        title: '我是标题~~~',
        pickerStyle: true,
        data: [
          {
            content: '舒适型',
          },
          {
            content: '七座商务',
          },
          {
            content: '豪华型',
          },
        ],
        onSelect: (item, index) => {
          this.showToast({
            txt: `Clicked ${item.content}`,
            type: 'correct',
            time: 1000,
          });
        },
        onCancel: () => {
          this.showToast({
            txt: `Clicked canceled`,
            type: 'warn',
            time: 1000,
          });
        },
      },
    });
    this.$actionSheet.show();
  };

  showToast = toastOpts => {
    this.setState(
      {
        toastOpts,
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
        <ActionSheet
          ref={ref => (this.$actionSheet = ref)}
          {...this.state.actionSheetOpts}
        />

        <div className="cube-item">
          <button type="button" className="cube-btn" onClick={this.showDefault}>
            ActionSheet
          </button>
        </div>
        <div className="cube-item">
          <button type="button" className="cube-btn" onClick={this.showActive}>
            ActionSheet - active
          </button>
        </div>
        <div className="cube-item">
          <button
            type="button"
            className="cube-btn"
            onClick={this.showPickerStyle}
          >
            ActionSheet - picker style
          </button>
        </div>
      </div>
    );
  }
}
