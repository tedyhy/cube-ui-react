import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import CSSTransition from '../../components/CSSTransition';

class Home extends React.PureComponent {
  static propTypes = {
    dispatch: PropTypes.func
  }

  goCity = () => {
    this.props.dispatch(
      routerRedux.push({
        pathname: '/city',
      })
    );
    // window.location.href = '/city'
  }

  render() {
    return (
      <CSSTransition>
        <div className="touch-scrolling">
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          home<br/>
          <button onClick={this.goCity}>城市</button>
        </div>
      </CSSTransition>
    );
  }
}

export default connect()(Home)
