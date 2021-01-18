# 我的第一个react项目，记录着我的学习过程。

# 仿造网易云的一个react项目

以 React 全家桶 (包含 hooks) 以及 immutable 数据流为基础打造的一款高质量的移动端音乐类 WebApp 。

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
