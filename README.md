### 使用 vite 构建

### run

- yarn

- yarn dev

### 重点 API 说明

- 全局数据源: store

- 读数据: state

- 写数据: dispatch

  - reducer(state, action): 规范 new state 的创建

  - initState: 初始 state

  - action: 变动的描述 update

- connect: (mapStateToProps, mapDispatchToProps)(Component) 连接 store & 组件

  - mapStateToProps: 读数据(selector 过滤)

  - mapDispatchToProps: 写数据(dispatchSelector 过滤)

- Provider: 提供全局的 store
