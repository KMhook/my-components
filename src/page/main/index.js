// 推荐使用ES2015的语法
import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

import Dialog from "../../component/Dialog/index";
import MainReducer from "./reducers";

let store = createStore(MainReducer);

const Page = {
  init() {
    // 页面初始化逻辑
    // 通过index.html中的：window.Page.init();进行调用
    console.log('init!');
    this.render();
  },
  render() {
    ReactDOM.render(
      <Provider store={store}>
        <Dialog />
      </Provider>,
      document.getElementById('my-dialog'));
  },
  bind() {

  }
};

window.Page = Page;
