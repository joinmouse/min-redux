import React, { useState, useContext, useMemo, useEffect } from "react";

export const store = {
  state: {
    user: { name: "frank", age: 18 },
  },
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

// 规范创建新的state过程: reducer(creatNewState)
const reducer = (state, action) => {
  if (action.type === "updateUser") {
    return {
      ...state,
      user: {
        ...state.user,
        ...action.data,
      },
    };
  } else {
    return state;
  }
};

export const AppContext = React.createContext(null);

export const connect = (selector) => (Component) => {
  const Wrapper = (props) => {
    const store = useContext(AppContext);
    const { state, setState, subscribe } = store;
    const data = selector ? selector(state) : { state };
    // 订阅 & 更新
    const [, update] = useState({});
    useEffect(() => {
      subscribe(() => {
        update({});
      });
    }, []);
    // 更新数据
    const dispatch = (action) => {
      const newState = reducer(state, action);
      setState(newState);
    };
    return <Component {...props} {...data} dispatch={dispatch} />;
  };
  return Wrapper;
};
