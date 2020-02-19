import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import Login from './pages/login/login'
import dva from './utils/dva'
import models from './models/index'


import './app.scss'
import 'taro-ui/dist/style/index.scss'
import 'font-awesome/scss/font-awesome.scss'
import './icon/iconfont.css'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }
const dvaApp = dva.createApp({
  initialState: {},
  models: models,
});
const store = dvaApp.getStore();

class App extends Component {

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/login/login',
      'pages/index/index',
      'pages/index/component/subList/subList',
      'pages/index/component/searchFile/searchFile',
      'pages/index/component/file/file',
      'pages/index/component/fileSetting/fileSetting',
      'pages/index/component/workbench/addapp/addapp',
      'pages/index/component/personalsetting/organization/organization',
      'pages/index/component/personalsetting/personalsetting',
      'pages/index/component/workbench/workbench'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Login />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
