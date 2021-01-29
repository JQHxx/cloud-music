# 我的第一个react项目，记录着我的学习过程。

# 仿造网易云的一个react项目

以 React 全家桶 (包含 hooks) 以及 immutable 数据流为基础打造的一款高质量的移动端音乐类 WebApp 。

# 接口

采用 github 上开源的 NodeJS 版 api 接口 NeteaseCloudMusicApi，提供音乐数据。
地址：https://github.com/Binaryify/NeteaseCloudMusicApi

# 启动项目

cd cloud-music
npm i
npm start

# 关于react的学习

1、生命周期 和 state
componentDidMount  当DOM第一次渲染的时候会执行该周期，类似vue的mounted或者angular的ngOnInit

componentWillUnmount 当组件被删除的时候会执行该周期，称之为卸载，类似vue的destoryed

State 和 props类似，但是state完全受控于组件。

下面是根据官网api写的例子：

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return <h2>It is {this.state.date.toLocaleTimeString()}</h2>;
  }
}

ReactDOM.render(<Clock />, document.getElementById("root"));

注意点：
1、不能直接更改state。


this.state.comment = "hello"; // wrong
此时组件不会重新渲染。
正确的写法是使用setState：this.setState({comment: 'Hello'});构造函数是唯一可以给 this.state 赋值的地方。

2、当clock组件被render的时候会调用componentDidMount周期启动定时器，而当定时器启动DOM变化的时候，会调用componentWillUnmount清除该定时器，并重新渲染新的DOM节点。

3、react可能会把对个setState()合并成一个调用，所以props和state可能异步更新，所以不应该依赖他们的值来更新数据重新渲染。
如需解决该问题可以让setState接收一个函数而不是对象，如下所示：
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));

4、state的更新会被合并。
当你的state包含多个独立变量的时候，你调用setState更新某一个变量的时候，会完全替换别的变量。

5、state完全受控于组件，除非拥有并设置了他的组件，否则其他组件是无法访问的。
但是组件可以将state作为props传递到子组件中，但是子组件无法得知其是否来源父组件的state
这种通常被称为“自上而下”或者是“单向”数据流.

# hook

1、Hook 是一些可以让你在函数组件里“钩入” React state 及生命周期等特性的函数。hook不能在class中使用。hook可以让我们在不编写class的时候使用state等react属性。

例子：计数器，点击按钮数字会加一
import React, { useState } from 'react';

function Example() {
  // 声明一个叫 “count” 的 state 变量。
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

useState 会返回一对值：当前状态和一个让你更新它的函数，你可以在事件处理函数中或其他一些地方调用这个函数。它类似 class 组件的 this.setState，但是它不会把新的 state 和旧的 state 进行合并。

# Effect Hook

Effect Hook 可以让你在函数组件中执行副作用操作.

import React, { useState, useEffect } from 'react';
function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

useEffect Hook可以看做是componentDidMount，componentDidUpdate 和 componentWillUnmount 这三个函数的组合。
在react中，有两个常见的副作用操作：需要清除的和不需要清除的。

1、无需清除的effect
比如发送网络请求，手动变更DOM。记录日志。

在class中我们需要在compontentDidMount和compontentDidUpdata连个生命周期中编写一样的代码来加载我们需要的效果。

但是在hook中，我们只需要用useEffect包裹着之前的代码即可实现同样的效果。

useEffect会在组件执行渲染之后保存传递的函数（我们称为effect），并且在执行DOM更新之后调用它。

# 为什么使用useEffect？

使用useEffect我们可以在组件中直接访问state。而且我们不需要特殊的API来读取它。
useEffect会在第一次渲染和每次更新之后执行。

# Hook规则

1、只在最顶层使用Hook，不要在循环、条件或者嵌套函数中使用Hook。
2、只在react中调用Hook，不要在普通的js函数中调用它。


# 自定义hook类似vue中的组件，父子组件的调用，不在赘述

# effect的条件执行

默认情况下，effect会在每轮组件渲染完成后执行。一旦effect的依赖发生变化，它就会被重新创建。
但是这样可以造成不必要的更新。比如订阅用户的在线状态，我们没必要在每次组件更新的时候都创建新的订阅，
我们只需要在prop改变的时候重新创建即可。

这样，我们就需要给useEffect传递第二个蚕食，他是effect所依赖的值数组。
如下所示：

useEffect(
  () => {
    const subscription = props.source.subscribe();
    return () => {
      subscription.unsubscribe();
    };
  },
  [props.source],
);
这个时候，只有当props.source改变的时候才会重新创建订阅。

注意：
1、请确保数组中包含了所有外部作用域中会发生变化且在 effect 中使用的变量，否则你的代码会引用到先前渲染中的旧变量
2、如果想执行只运行一次的 effect（仅在组件挂载和卸载时执行），可以传递一个空数组（[]）作为第二个参数。这就告诉 React 你的 effect 不依赖于 props 或 state 中的任何值，所以它永远都不需要重复执行。

# 关于redux

定义：redux是一个javascript的状态容器，类似于vuex。

三大原则：
1、同一数据源，所有的state都应该在一个object树上面，类似vuex的state
2、state是只读的，改变state需要在action里面进行，这样子可以确保视图和请求都不能随意修改state
vuex中使用dispatch和commit两种方法存储值
其中dispatch含有异步操作，取值的时候需要使用getter，而commit是同步操作直接取值就行。在vuex中dispatch可以调用action里面的函数。（react中暂时不知区别。后续看到在更改）
3、使用纯函数来执行修改。为了描述 action 如何改变 state tree ，你需要编写 reducers。


# Action
Action 是把数据从应用（这里之所以不叫 view 是因为这些数据有可能是服务器响应，用户输入或其它非 view 的数据 ）传到 store 的有效载荷。它是 store 数据的唯一来源。一般来说你会通过 store.dispatch() 将 action 传到 store。

Action 本质上是 JavaScript 普通对象。我们约定，action 内必须使用一个字符串类型的 type 字段来表示将要执行的动作。多数情况下，type 会被定义成字符串常量。当应用规模越来越大时，建议使用单独的模块或文件来存放 action。

# Reducer
Reducers 指定了应用状态的变化如何响应 actions 并发送到 store 的，记住 actions 只是描述了有事情发生了这一事实，并没有描述应用如何更新 state。

# Store
store是联合reducers和action的对象。
Store 有以下职责：
1、维持应用的 state；
2、提供 getState() 方法获取 state；
3、提供 dispatch(action) 方法更新 state；
4、通过 subscribe(listener) 注册监听器;
5、通过 subscribe(listener) 返回的函数注销监听器。

# immutable 数据结构中长度属性 size
可以用来判断数据是否存在，可以用于提升性能，避免资源不必要的重复加载。

# react forward ref的使用
引用传递（Ref forwading）是一种通过组件向子组件自动传递 引用ref 的技术。对于应用者的大多数组件来说没什么作用。但是对于有些重复使用的组件，可能有用。例如某些input组件，需要控制其focus，本来是可以使用ref来控制，但是因为该input已被包裹在组件中，这时就需要使用Ref forward来透过组件获得该input的引用。