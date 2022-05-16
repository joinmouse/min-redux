import React, { useState, useContext, useMemo, useEffect } from "react";

const AppContext = React.createContext(null);
const store = {
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

const connect = (Component) => {
  const Wrapper = (props) => {
    const store = useContext(AppContext);
    const { state, setState, subscribe } = store;
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
    return <Component {...props} dispatch={dispatch} state={state} />;
  };
  return Wrapper;
};

const App = () => {
  return (
    <AppContext.Provider value={store}>
      <FirstSon />
      <SecondSon />
      <ThirdSon />
    </AppContext.Provider>
  );
};

const FirstSon = () => {
  console.log("FirstSon", Math.random());
  return (
    <section>
      <p>长子</p>
      <User />
    </section>
  );
};

const SecondSon = () => {
  console.log("SecondSon", Math.random());
  return (
    <section>
      <p>次子</p>
      <UserModifier>输入</UserModifier>
    </section>
  );
};

const ThirdSon = () => {
  console.log("ThirdSon", Math.random());
  return <section>小儿子</section>;
};

// 读数据
const User = connect(({ state }) => {
  console.log9;
  return <div>User:{state.user.name}</div>;
});

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

// createWrapper 将组件和全局的state链接起来
const UserModifier = connect(({ state, dispatch, children }) => {
  // 写数据
  const onChange = (e) => {
    // update action
    dispatch({
      type: "updateUser",
      data: { name: e.target.value },
    });
  };

  return (
    <div>
      {children}
      <input value={state.user.name} onChange={onChange} />
    </div>
  );
});

export default App;
