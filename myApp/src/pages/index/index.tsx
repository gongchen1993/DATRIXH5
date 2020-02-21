/* eslint-disable react/sort-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable import/first */
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import { AtTabBar } from 'taro-ui'
import Resources from './component/resources/resources'
import Personalsetting from './component/personalsetting/personalsetting'
import Workbench from './component/workbench/workbench'


export default class Index extends Component {
  constructor(props, context) {
    super(props, context);
  }
  state = {
    tabList: [
      { title: '首页', iconType: 'home' },
      { title: '应用中心', iconType: 'message' },
      { title: '资源中心', iconType: 'file-generic' },
      { title: '个人中心', iconType: 'user' }
    ],
    current: 2,
  }
  handleClick(value) {
    this.setState({
      current: value
    })
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  render() {
    let page;
    if (this.state.current === 2) {
      page = (<Resources></Resources>)
    } else if (this.state.current === 1) {
      page = (<Workbench></Workbench>)
    } else if (this.state.current === 3) {
      page = (<Personalsetting></Personalsetting>)
    }
    return (
      <View className='index-container'>
        <View className='index_content'>
          {page}
        </View>
        <View className='index-tabbar'>
          <AtTabBar
            fixed
            tabList={this.state.tabList}
            onClick={this.handleClick.bind(this)}
            current={this.state.current}
          />
        </View>
      </View>
    )
  }
}
