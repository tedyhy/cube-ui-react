
export default {
  namespace: 'global',

  state: {},

  reducers: {},

  effects: {},

  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname, search }) => {});
    },
  },
};
