import React from 'react';
import Dialog from '../../components/dialog';
import Toast from '../../components/toast';

export default class DialogExample extends React.PureComponent {
  state = {
    toastOpts: {},
    dialogOpts: {},
  };

  showAlert = () => {
    this.setState({
      dialogOpts: {
        type: 'alert',
        title: '我是标题',
        content: '我是内容',
        icon: 'cubeic-alert',
      },
    });
    this.$dialog.show();
  };
  showBtn = () => {
    this.setState({
      dialogOpts: {
        type: 'confirm',
        icon: 'cubeic-alert',
        title: '我是标题',
        content: '我是内容',
        confirmBtn: {
          text: '确定按钮',
          active: true,
          disabled: false,
          href: 'javascript:;',
        },
        cancelBtn: {
          text: '取消按钮',
          active: false,
          disabled: false,
          href: 'javascript:;',
        },
        onConfirm: () => {
          this.showToast({
            type: 'warn',
            time: 1000,
            txt: '点击确认按钮',
          });
        },
        onCancel: () => {
          this.showToast({
            type: 'warn',
            time: 1000,
            txt: '点击取消按钮',
          });
        },
      },
    });
    this.$dialog.show();
  };
  showClose = () => {
    this.setState({
      dialogOpts: {
        type: 'alert',
        icon: 'cubeic-alert',
        showClose: true,
        title: '标题',
        onClose: () => {
          this.showToast({
            type: 'warn',
            time: 1000,
            txt: '点击关闭按钮',
          });
        },
      },
    });
    this.$dialog.show();
  };
  showSlot = () => {
    this.setState({
      dialogOpts: {
        type: 'alert',
        confirmBtn: {
          text: '我知道了',
          active: true,
        },
        children: [
          React.createElement(
            'div',
            {
              className: 'my-title',
              slot: 'title',
              key: 'my-title',
            },
            [
              React.createElement('div', {
                className: 'my-title-img',
                key: 'my-title-img',
              }),
              React.createElement(
                'p',
                { key: 'my-title-img-p' },
                '附近车少,优选出租车将来接您'
              ),
            ]
          ),
          React.createElement(
            'p',
            {
              className: 'my-content',
              slot: 'content',
              key: 'my-content',
            },
            '价格仍按快车计算'
          ),
        ],
      },
    });
    this.$dialog.show();
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
        <Dialog ref={ref => (this.$dialog = ref)} {...this.state.dialogOpts}>
          {/* <h1 slot="title">sdfsadff</h1>
          <h2 slot="content">sdfadfasdfasdfasdf</h2>
          <div slot="btns">lllllllllllll</div>
          <p>sdfsdfdsf</p> */}
        </Dialog>

        <div className="cube-item">
          <button type="button" className="cube-btn" onClick={this.showAlert}>
            Dialog - type
          </button>
        </div>
        <div className="cube-item">
          <button type="button" className="cube-btn" onClick={this.showBtn}>
            Dialog - btn
          </button>
        </div>
        <div className="cube-item">
          <button type="button" className="cube-btn" onClick={this.showClose}>
            Dialog - show close
          </button>
        </div>
        <div className="cube-item">
          <button type="button" className="cube-btn" onClick={this.showSlot}>
            Dialog - slot
          </button>
        </div>
      </div>
    );
  }
}
