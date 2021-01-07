import { GlobalStyle } from './style';
import { IconStyle } from './assets/iconfont/iconfont';
import { Provider } from 'react-redux';
//renderRoutes 读取路由配置转化为 Route 标签
import { renderRoutes } from 'react-router-config';
import routes from './routes/index.js';
import store from './store/index';
import { HashRouter } from 'react-router-dom';
function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <GlobalStyle></GlobalStyle>
        <IconStyle></IconStyle>
        {renderRoutes(routes)}
      </HashRouter>
    </Provider>
  );
}

export default App;
