import dva from 'dva';
import createLoading from 'dva-loading';
import createBrowserHistory from 'history/createBrowserHistory';
import globalModel from './models/global';
import RouterConfig from './router';
import './index.scss';

// Middleware
const middleware = [];
if (process.env.NODE_ENV !== 'production') {
  // const { createLogger } = require('redux-logger');
  // middleware.push(createLogger());
}

// 1. Initialize
const app = dva({
  history: createBrowserHistory(),
  onAction: middleware,
  onError(e, dispatch) {
    console.log(e.message);
  },
});

// 2. Plugins
app.use(createLoading());

// 3. Register global model
app.model(globalModel);

// 4. Router
app.router(RouterConfig);

// 5. Start
app.start('#root');
