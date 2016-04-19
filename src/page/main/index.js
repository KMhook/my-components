'use strict';

// 推荐使用ES2015的语法
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

//import Dialog from '../../component/Dialog/index';
//import Button from '../../component/Button/index';
//import { mainApp } from './reducers';
import RabbitView from '../../component/view/RabbitView/index';

//let store = createStore(mainApp);

const Page = {
  init() {
    // 页面初始化逻辑
    // 通过index.html中的：window.Page.init();进行调用
    console.log('init!');
    this.render();
  },
  render() {
    /*
    ReactDOM.render(
      <Provider store={store}>
      </Provider>,
      document.getElementById('my-dialog'));
      */
    var i = 0;
    let viewArray = [];
    for(i = 0; i < 5; i ++) {
      viewArray.push(<RabbitView />);
    }
    ReactDOM.render(
      { viewArray },
      document.getElementById('my-dialog')
    );
  },
  bind() {
  }
};


window.Page = Page;
