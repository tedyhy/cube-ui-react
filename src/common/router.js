import { createElement } from 'react';
import dynamic from 'dva/dynamic';

let routerDataCache;

const modelNotExisted = (app, model) =>
  !app._models.some(({ namespace }) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1);
  });

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => {
  // () => require('module')
  // transformed by babel-plugin-dynamic-import-node-sync
  if (component.toString().indexOf('.then(') < 0) {
    models.forEach(model => {
      if (modelNotExisted(app, model)) {
        app.model(require(`../models/${model}`).default);
      }
    });

    /* eslint-disable no-use-before-define*/
    return props => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return createElement(component().default, {
        ...props,
        routerData: routerDataCache,
      });
    };
  }

  // () => import('module')
  return dynamic({
    app,
    models: () =>
      models
        .filter(model => modelNotExisted(app, model))
        .map(m => import(`../models/${m}.js`)),
    // add routerData prop
    component: () => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return component().then(raw => {
        const Component = raw.default || raw;
        return props =>
          createElement(Component, {
            ...props,
            routerData: routerDataCache,
          });
      });
    },
  });
};

export const getRouterData = app => {
  const routerConfig = {
    '/': {
      component: dynamicWrapper(app, [], () =>
        import('../layouts/BasicLayout')
      ),
    },
    '/base/loading': {
      name: 'loading',
      component: dynamicWrapper(app, [], () =>
        import('../routes/base/loading')
      ),
    },
    '/popup': {
      name: 'popup',
      component: dynamicWrapper(app, [], () => import('../routes/popup')),
    },
    '/popup/toast': {
      name: 'toast',
      component: dynamicWrapper(app, [], () => import('../routes/popup/toast')),
    },
    '/popup/picker': {
      name: 'picker',
      component: dynamicWrapper(app, [], () =>
        import('../routes/popup/picker')
      ),
    },
    '/popup/action-sheet': {
      name: 'action-sheet',
      component: dynamicWrapper(app, [], () =>
        import('../routes/popup/action-sheet')
      ),
    },
    '/popup/dialog': {
      name: 'dialog',
      component: dynamicWrapper(app, [], () =>
        import('../routes/popup/dialog')
      ),
    },
  };

  // Route configuration data
  const routerData = {};
  Object.keys(routerConfig).forEach(path => {
    let router = routerConfig[path];
    // If you need to configure complex parameter routing,
    // https://github.com/ant-design/ant-design-pro-site/blob/master/docs/router-and-nav.md#%E5%B8%A6%E5%8F%82%E6%95%B0%E7%9A%84%E8%B7%AF%E7%94%B1%E8%8F%9C%E5%8D%95
    // eg . /list/:type/user/info/:id
    router = {
      ...router,
    };
    routerData[path] = router;
  });

  return routerData;
};
