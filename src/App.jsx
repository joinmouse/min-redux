import React from "react";
import { Provider, createStore, connect } from "./redux";
import connectToUser from "./connecters/connectToUser";

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
const initState = {
  user: { name: "frank", age: 18 },
  group: { name: "FE" },
};
const store = createStore(reducer, initState);

const App = () => {
  return (
    <Provider store={store}>
      <FirstSon />
      <SecondSon />
      <ThirdSon />
    </Provider>
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
const User = connectToUser(({ user }) => {
  return <div>User:{user.name}</div>;
});

// createWrapper 将组件和全局的state链接起来
const UserModifier = connectToUser(({ updateUser, user, children }) => {
  // 写数据
  const onChange = (e) => {
    // update action
    updateUser({ name: e.target.value });
  };

  return (
    <div>
      {children}
      <input value={user.name} onChange={onChange} />
    </div>
  );
});

export default App;
