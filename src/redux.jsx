import React, { useEffect, useState } from "react";

const store = {
  state: null,
  reducer: null,
  setState: (newState) => {
    store.state = newState;
    // 更新所有订阅的组件
    store.listeners.map((fn) => fn(store.state));
  },
  listeners: [],
  // 订阅
  subscribe: (fn) => {
    store.listeners.push(fn);
    // 取消订阅
    return () => {
      const index = store.listeners.indexOf(fn);
      store.listeners.splice(index, 1);
    };
  },
};

export const createStore = (reducer, initState) => {
  store.state = initState;
  store.reducer = reducer;
  return store;
};

export const connect = (selector, dispatchSelector) => (Component) => {
  const Wrapper = (props) => {
    const { state, reducer, setState, subscribe } = store;
    // 更新数据
    const dispatch = (action) => {
      const newState = reducer(state, action);
      setState(newState);
    };
    // selector 读写接口
    const data = selector ? selector(state) : { state };
    const dispatchers = dispatchSelector
      ? dispatchSelector(dispatch)
      : { dispatch };

    // 订阅 & 更新
    const [, update] = useState({});
    useEffect(() => {
      const unsubscibe = subscribe(() => {
        // 实现精准更新
        const newData = selector
          ? selector(store.state)
          : { state: store.state };
        if (changed(data, newData)) {
          update({});
        }
      });
      return unsubscibe;
    }, [selector]);

    return <Component {...props} {...data} {...dispatchers} />;
  };
  return Wrapper;
};

const changed = (oldState, newState) => {
  let changed = false;
  for (let key in oldState) {
    if (oldState[key] !== newState[key]) {
      changed = true;
    }
  }
  return changed;
};

const AppContext = React.createContext(null);

export const Provider = ({ store, children }) => {
  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
};
