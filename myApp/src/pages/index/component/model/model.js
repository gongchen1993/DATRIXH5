/* eslint-disable react/sort-comp */
/* eslint-disable import/first */
import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button, Input } from '@tarojs/components';
import './model.scss'
import { AtIcon, AtModal, AtModalHeader, AtModalContent, AtModalAction, AtActionSheet } from 'taro-ui'

export default class Mpdel extends Component {

  config = {
    navigationBarTitleText: ''
  }

  state = {
    addFolderModel: false,
    sortType: [
      {
        name: '全部',
      },
      {
        name: '文档',
      },
      {
        name: '表格',
      },
      {
        name: '文件',
      },
      {
        name: '图片',
      },
      {
        name: '视频',
      },
    ],
    sortTypeChecked: 0,
    sortDateType: [
      {
        name: '修改时间',
      },
      {
        name: '创建时间',
      },
    ],
    sortDateTypeChecked: -1
  }

  addFolder() {
    this.hideLayout();
    this.setState({
      addFolderModel: true
    })
  }
  hideLayout() {
    this.props.hideLayout();
  }
  selectTitle(item) {
    this.props.selectTitle(item)
  }
  addCancel() {
    this.setState({
      addFolderModel: false
    })
  }
  addConfirm() {
    this.setState({
      addFolderModel: false
    })
  }
  checkSortType(item, index) {
    this.setState({
      sortTypeChecked: index
    })
  }
  resetSort() {
    this.setState({
      sortTypeChecked: 0
    })
  }
  confirmSort() {
    this.props.closeModel('sort')
  }

  componentWillMount() { }
  componentDidMount() { }
  componentWillReceiveProps() { }
  componentWillUnmount() { }
  componentDidShow() { }
  componentDidHide() { }
  componentDidCatchError() { }
  componentDidNotFound() { }
  render() {
    const { type, isOpen, title, sortModel, moreActionModel } = this.props
    return (
      <View className='model-index'>
        <View className={isOpen ? 'model_index-layout model_index-layout--active' : 'model_index-layout'}>
          <View className='model_index-layout_container'>
            {type == 'title' ? (<View className='layout-body'>
              {title.map((item, index) => {
                return <View className='layout-item' key={index} onClick={this.selectTitle.bind(this, item)}>
                  <AtIcon value={item.imgSrc} size='24' color='#000'></AtIcon>
                  <Text className='item-name'>{item.name}</Text>
                </View>
              })}
            </View>)
              : (<View className='layout-body'>
                <View>
                  <View className='layout-header'>新建</View>
                  <View className='layout-content'>
                    <View className='layout_fun-type' onClick={this.addFolder.bind(this)}>
                      <AtIcon value='folder' size='30' color='#ffc310'></AtIcon>
                      <View>文件夹</View>
                    </View>
                  </View>
                </View>
                {type != 'addFolder' ? (<View>
                  <View className='layout-header'>上传</View>
                  <View className='layout-content'>
                    <View className='layout_fun-type'>
                      <AtIcon value='image' size='30' color='#ffc310'></AtIcon>
                      <View>图片</View>
                    </View>
                    <View className='layout_fun-type'>
                      <AtIcon value='file-generic' size='30' color='#636ceb'></AtIcon>
                      <View>文件</View>
                    </View>
                  </View>
                </View>) : null}
              </View>)}
          </View>
          <View className='model_index-layout_overlay' onClick={this.hideLayout.bind(this)}></View>
        </View>
        <AtModal isOpened={this.state.addFolderModel}>
          <AtModalHeader>文件夹</AtModalHeader>
          <AtModalContent>
            <Input className='model-addFolder' type='text' placeholder='请输入文件夹名称'></Input>
          </AtModalContent>
          <AtModalAction> <Button onClick={this.addCancel.bind(this)}>取消</Button> <Button onClick={this.addConfirm.bind(this)}>创建</Button> </AtModalAction>
        </AtModal>
        <AtActionSheet isOpened={sortModel} className='sort-model' onClose={() => this.props.closeModel('sort')}>
          <View className='sort-model-body'>
            <View className='sort_body-header'>类型筛选</View>
            <View className='sort_body-content'>
              {this.state.sortType.map((item, index) => {
                return <View key={index} className={this.state.sortTypeChecked === index ? 'sort_body-type sort_body-type--active' : 'sort_body-type'} onClick={this.checkSortType.bind(this, item, index)}>{item.name}</View>
              })}
            </View>
            <View className='sort_body-header'>排序</View>
            <View className='sort_body-content'>
              {this.state.sortDateType.map((item, index) => {
                return <View key={index} className={this.state.sortDateTypeChecked === index ? 'sort_body-type sort_body-type--active' : 'sort_body-type'}>{item.name}</View>
              })}
            </View>
            <View className='sort_body-content'>
              <View className='sort_body-button sort_body-button--reset' onClick={this.resetSort.bind(this)}>重置</View>
              <View className='sort_body-button sort_body-button--confirm' onClick={this.confirmSort.bind(this)}>确定</View>
            </View>
          </View>
        </AtActionSheet>
        <AtActionSheet isOpened={moreActionModel} className='more-model' onClose={() => this.props.closeModel('more')}>
          <View className='more_model-content'>
            <View className='more_model-action'>
              <View className='more_model-actionItem'>设为离线可用</View>
              <View className='more_model-actionItem'>用其他应用打开</View>
              <View className='more_model-actionItem'>重命名</View>
              <View className='more_model-actionItem'>添加至</View>
              <View className='more_model-actionItem'>移动到</View>
              <View className='more_model-actionItem'>复制链接</View>
              <View className='more_model-actionItem'>共享</View>
              <View className='more_model-actionItem'>移除</View>
            </View>
            <View className='more_model-cancel' onClick={() => this.props.closeModel('more')}>
              <Text>取消</Text>
            </View>
          </View>
        </AtActionSheet>
      </View>
    );
  }
}