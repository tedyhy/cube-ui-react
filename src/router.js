import React from 'react';
import dynamic from 'dva/dynamic';
import { routerRedux, Route, Switch } from 'dva/router';
import { getRouterData } from './common/router';
import LoadingComponent from './components/LoadingComponent';
import ScrollMemory from 'react-router-scroll-memory';

const { ConnectedRouter } = routerRedux;

dynamic.setDefaultLoadingComponent(() => {
  return <LoadingComponent />;
});
function RouterConfig({ history, app }) {
  const routerData = getRouterData(app);
  const PopupLayout = routerData['/popup'].component;
  const HomeLayout = routerData['/home'].component;
  const CityLayout = routerData['/city'].component;

  return (
    <ConnectedRouter history={history}>
      <div className="cube-page">
        <ScrollMemory/>
        <Switch>
          <Route exact path="/popup" component={PopupLayout} />
          <Route exact path="/home" component={HomeLayout} />
          <Route exact path="/city" component={CityLayout} />
        </Switch>
      </div>
    </ConnectedRouter>
  );
}

export default RouterConfig;
