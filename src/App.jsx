import React from "react";
import { AppContext, connect, store } from "./redux";

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
const User = connect((state) => {
  return state.user;
})(({ name }) => {
  return <div>User:{name}</div>;
});

// createWrapper 将组件和全局的state链接起来
const UserModifier = connect()(({ state, dispatch, children }) => {
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
