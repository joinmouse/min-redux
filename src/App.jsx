import React, { useState, useContext } from "react";

const AppContext = React.createContext(null);

const App = () => {
  const [appState, setAppState] = useState({
    user: { name: "frank", age: 18 },
  });
  const contextValue = { appState, setAppState };

  console.log("appState", appState);

  return (
    <AppContext.Provider value={contextValue}>
      <FirstSon />
      <SecondSon />
      <ThirdSon />
    </AppContext.Provider>
  );
};

const FirstSon = () => {
  console.log("render FirstSon");
  return (
    <section>
      <p>长子</p>
      <User />
    </section>
  );
};

const SecondSon = () => {
  console.log("render SecondSon");
  return (
    <section>
      <p>次子</p>
      <Wrapper />
    </section>
  );
};

const ThirdSon = () => {
  console.log("render ThirdSon");
  return <section>小儿子</section>;
};

// 读数据
const User = () => {
  const contextValue = useContext(AppContext);
  return <div>User:{contextValue.appState.user.name}</div>;
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

const Wrapper = () => {
  const contextValue = useContext(AppContext);
  const { appState, setAppState } = contextValue;
  // 更新数据
  const updateState = (action) => {
    const newState = reducer(appState, action);
    setAppState(newState);
  };

  return <UserModifier updateState={updateState} state={appState} />;
};

// 写数据
const UserModifier = (props) => {
  const { updateState, state } = props;

  const onChange = (e) => {
    // update action
    updateState({
      type: "updateUser",
      data: { name: e.target.value },
    });
  };

  return (
    <div>
      <input value={state.user.name} onChange={onChange} />
    </div>
  );
};

export default App;
