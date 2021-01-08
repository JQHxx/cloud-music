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