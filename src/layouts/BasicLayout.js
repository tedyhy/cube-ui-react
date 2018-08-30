import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'dva/router';
import DocumentTitle from 'react-document-title';
import pathToRegexp from 'path-to-regexp';
import { getRoutes } from '../utils/utils';
import './BasicLayout.scss';

export default class BasicLayout extends React.PureComponent {
  static propTypes = {
    routerData: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object,
  };

  static childContextTypes = {
    location: PropTypes.object,
  };

  getChildContext() {
    const { location } = this.props;
    return {
      location,
    };
  }

  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = 'Cube Ui';
    let currRouterData = null;
    // match params path
    Object.keys(routerData).forEach(key => {
      if (pathToRegexp(key).test(pathname)) {
        currRouterData = routerData[key];
      }
    });
    if (currRouterData && currRouterData.name) {
      title = `${currRouterData.name} - Cube Ui`;
    }
    return title;
  }

  render() {
    const { match, routerData } = this.props;
    const title = this.getPageTitle();
    console.log(match, getRoutes(match.path, routerData));

    return (
      <DocumentTitle title={title}>
        <div className="cube-page-layout">
          <header className="header">
            <h1>{title.replace(' - Cube Ui', '')}</h1>
          </header>
          <Switch>
            {getRoutes(match.path, routerData).map(item => (
              <Route
                key={item.key}
                path={item.path}
                component={item.component}
                exact={item.exact}
              />
            ))}
          </Switch>
        </div>
      </DocumentTitle>
    );
  }
}
