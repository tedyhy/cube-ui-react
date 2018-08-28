import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import CSSTransition from '../../components/CSSTransition';

class SelectCity extends React.PureComponent {
  static propTypes = {
    dispatch: PropTypes.func,
  };

  goHome = () => {
    this.props.dispatch(
      routerRedux.push({
        pathname: '/',
      })
    );
    // window.location.href = '/city'
  }

  render() {

    return (
      <CSSTransition>
        <div className="touch-scrolling">
          city<br/>
          city<br/>
          city<br/>
          city<br/>
          city<br/>
          city<br/>
          city<br/>
          city<br/>
          city<br/>
          city<br/>
          city<br/>
          city<br/>
          city<br/>
          city<br/>
          city<br/>
          city<br/>
          city<br/>
          city<br/>
          city<br/>
          city<br/>
          city<br/>
          city<br/>
          city<br/>
          city<br/>
          city<br/>
          city<br/>
          city<br/>
          city<br/>
          city<br/>
          city<br/>
          city<br/>
          city<br/>
          city<br/>
          city<br/>
          city<br/>
          city<br/>
          city<br/>
          city<br/>
          city<br/>
          city<br/>
          city<br/>
          city<br/>
          city<br/>
          city<br/>
          city<br/>
          city<br/>
          city<br/>
          city<br/>
          city<br/>
          city<br/>
          city<br/>
          city<br/>
          city<br/>
          <button onClick={this.goHome}>home</button>
          city<br/>
          city<br/>
          city<br/>
          city<br/>
          city<br/>
          city<br/>
          city<br/>
          city<br/>
        </div>
      </CSSTransition>
    );
  }
}

export default connect()(SelectCity)
