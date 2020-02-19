import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button, Switch } from '@tarojs/components';
import './fileSetting.scss'
import { AtIcon, AtNavBar, AtRadio } from 'taro-ui'

export default class FileSetting extends Component {

  config = {
    navigationBarTitleText: ''
  }

  state = {
    openShare: true,
    visitValue: 'option1',
    shareValue: 'option1',
    createValue: 'option1',
  }

  backSubIndex() {
    Taro.navigateTo({
      url: `/pages/index/component/file/file`
    });
  }

  handleCheck(value) {
    this.setState({
      openShare: value.target.checked
    })
  }

  componentWillMount() { }
  componentDidMount() { }
  render() {
    return (
      <View className='set_index-container'>
        <AtNavBar
          onClickLeftIcon={this.backSubIndex}
          color='#000'
          title='文档设置'
          leftIconType='chevron-left'
          fixed={true}
          border={false}
        />
        <View className='set_index-content'>
          <View className='set_index-header'>
            <Text className='set_index-name'>已开启共享链接</Text>
            <Switch className='set_index-switch' checked={this.state.openShare} color='#366eff' onChange={this.handleCheck.bind(this)} />
          </View>
          {this.state.openShare ? (<View className='set_index-options'>
            <AtRadio
              options={[
                { label: '知道链接的人都可以访问', value: 'option1' },
                { label: '仅限所属组的用户访问', value: 'option2' },
              ]}
              value={this.state.visitValue}
            />
          </View>) : ''}
          <View className='set_index-header'>
            <Text className='set_index-name'>哪些人可以共享文档（添加和管理协作者）？</Text>
          </View>
          <View className='set_index-options'>
            <AtRadio
              options={[
                { label: '有访问权限的用户', value: 'option1' },
                { label: '只有我可以', value: 'option2' },
              ]}
              value={this.state.shareValue}
            />
          </View>
          <View className='set_index-header'>
            <Text className='set_index-name'>哪些人可以创建副本、打印、导出、复制内容？</Text>
          </View>
          <View className='set_index-options'>
            <AtRadio
              options={[
                { label: '有访问权限的用户', value: 'option1' },
                { label: '只有我可以', value: 'option2' },
              ]}
              value={this.state.createValue}
            />
          </View>
        </View>
      </View>
    );
  }
}