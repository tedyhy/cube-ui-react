import React from 'react';
import { Route, Switch } from 'dva/router';
import { getRoutes } from '../../utils/utils';
import Popup from './popup';
import './style.scss';

export default class PopupMainExample extends React.PureComponent {
  render() {
    const { match, routerData } = this.props;
    const routes = getRoutes(match.path, routerData);

    return (
      <div className="cube-content cube-main">
        <Switch>
          {routes.map(item => (
            <Route
              key={item.key}
              path={item.path}
              component={item.component}
              exact={item.exact}
            />
          ))}
          <Route path={match.path} component={Popup} />
        </Switch>
      </div>
    );
  }
}
