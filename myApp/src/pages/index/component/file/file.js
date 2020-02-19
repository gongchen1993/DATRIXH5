import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button, Image } from '@tarojs/components';
import './file.scss'
import { AtIcon, AtActionSheet, AtAvatar } from 'taro-ui'

export default class File extends Component {

  config = {
    navigationBarTitleText: ''
  }

  state = {
    actionModel: false,
    fileInfoModel: false,
    isPreview: false
  }
  backSubIndex() {
    Taro.navigateTo({
      url: `/pages/index/component/subList/subList`
    });
  }
  openModel() {
    this.setState({
      fileInfoModel: false,
      actionModel: true
    })
  }
  handleClose() {
    this.setState({
      actionModel: false
    })
  }
  handleFileInfo() {
    this.setState({
      fileInfoModel: true
    })
  }
  handleSetting() {
    Taro.navigateTo({
      url: `/pages/index/component/fileSetting/fileSetting`
    });
  }
  handlePreview() {
    this.setState({
      isPreview: true
    })
  }
  closePreview() {
    this.setState({
      isPreview: false
    })
  }

  componentWillMount() { }
  componentDidMount() { }

  render() {
    return (
      <View className='file_index-contanier'>
        <View className='file_index-navbar'>
          <View className='file_index-navbar-left'>
            <AtIcon value='chevron-left' size='24' color='#fff'></AtIcon>
            <Text className='file_index-navbar-title' onClick={this.backSubIndex.bind(this)}>文件名称</Text>
          </View>
          <View className='file_index-navbar-right'>
            <Text className='fa fa-ellipsis-h' onClick={this.openModel.bind(this)}></Text>
          </View>
        </View>
        <View className='file_index-content'>
          <Image className='file_index-image' src='http://211.144.114.26:9004/datrix4/vw/read.php?fileId=2019072617_e1037ba7f48f760560ef8e6174bbbb66_lv0.JPG&rand=wev5gr' onClick={this.handlePreview.bind(this)}></Image>
        </View>
        <View className='file_index-bottom'>
          <View className='file_index-bottom-content'>
            <AtIcon value='download-cloud' size='24' color='#000'></AtIcon>
            <AtIcon value='share' size='24' color='#000'></AtIcon>
          </View>
        </View>
        {this.state.isPreview ? (<View className='file_index-preview' onClick={this.closePreview.bind(this)}>
          <Image className='file_index-previewImage' src='http://211.144.114.26:9004/datrix4/vw/read.php?fileId=2019072617_e1037ba7f48f760560ef8e6174bbbb66_lv0.JPG&rand=wev5gr'></Image>
        </View>) : ''}
        <AtActionSheet className='file_action-model' isOpened={this.state.actionModel} onClose={this.handleClose.bind(this)}>
          {!this.state.fileInfoModel ? (<View className='file_action-container'>
            <View className='file_action-header'>
              <View className='file_action-line'></View>
              <View className='file_action-fileInfo'>
                <View className='file_info-image'>
                  <AtIcon value='image' size='44' color='#f4c943'></AtIcon>
                </View>
                <View>
                  <View className='file-name'>2222.JPG</View>
                  <View className='file-moreInfo'>阅读次数：3 所有者：某某某</View>
                </View>
              </View>
            </View>
            <View className='file_action-content'>
              <View className='file_action-buttomList'>
                <View className='file_action-button'>
                  <AtIcon className='file_action-buttonImage' value='download-cloud' size='24' color='#000'></AtIcon>
                  <Text>取消离线可使用</Text>
                </View>
                <View className='file_action-button'>
                  <AtIcon className='file_action-buttonImage' value='file-new' size='24' color='#000'></AtIcon>
                  <Text>添加至</Text>
                </View>
                <View className='file_action-button'>
                  <AtIcon className='file_action-buttonImage' value='trash' size='24' color='#000'></AtIcon>
                  <Text>删除</Text>
                </View>
              </View>
              <View className='file_action-actionList'>
                <View className='actionList_item' onClick={this.handleFileInfo.bind(this)}>
                  <View className='actionList_item-img'>
                    <Text className='fa fa-edit'></Text>
                  </View>
                  <View className='actionList_item-name'>文件信息</View>
                </View>
                <View className='actionList_item' onClick={this.handleSetting.bind(this)}>
                  <View className='actionList_item-img'>
                    <Text className='fa fa-edit'></Text>
                  </View>
                  <View className='actionList_item-name'>权限设置</View>
                </View>
                <View className='actionList_item'>
                  <View className='actionList_item-img'>
                    <Text className='fa fa-edit'></Text>
                  </View>
                  <View className='actionList_item-name'>重命名</View>
                </View>
                <View className='actionList_item'>
                  <View className='actionList_item-img'>
                    <Text className='fa fa-edit'></Text>
                  </View>
                  <View className='actionList_item-name'>用其他应用打开</View>
                </View>
                <View className='actionList_item'>
                  <View className='actionList_item-img'>
                    <Text className='fa fa-edit'></Text>
                  </View>
                  <View className='actionList_item-name'>操作记录</View>
                </View>
                <View className='actionList_item'>
                  <View className='actionList_item-img'>
                    <Text className='fa fa-edit'></Text>
                  </View>
                  <View className='actionList_item-name'>客服</View>
                </View>
                <View className='actionList_item'>
                  <View className='actionList_item-img'>
                    <Text className='fa fa-edit'></Text>
                  </View>
                  <View className='actionList_item-name'>举报</View>
                </View>
              </View>
            </View>
          </View>)
            : (<View className='file_info-container'>
              <View className='file_info-header'>文件信息</View>
              <View className='file_info-content'>
                <View className='file_info-item'>
                  <View className='file_info-itemTitle'>文档所有者</View>
                  <View className='file_info-detail'>
                    <AtAvatar circle text='某某' size='small'></AtAvatar>
                    <Text className='file_info-detail--text'>某某某</Text>
                  </View>
                </View>
                <View className='file_info-item'>
                  <View className='file_info-itemTitle'>文档创建时间</View>
                  <View className='file_info-detail'>
                    <AtAvatar circle text='某某' size='small'></AtAvatar>
                    <Text className='file_info-detail--text'>2020年2月2日</Text>
                  </View>
                </View>
                <View className='file_info-item'>
                  <View className='file_info-itemTitle'>简介</View>
                  <View className='file_info-more'>
                    <View className='file_info-moreItem'>
                      <Text className='file_value'>JPG</Text>
                      <Text className='file_key'>文件类型</Text>
                    </View>
                    <View className='file_info-moreItem'>
                      <Text className='file_value'>111kb</Text>
                      <Text className='file_key'>文件大小</Text>
                    </View>
                  </View>
                </View>
                <View className='file_info-item'>
                  <View className='file_info-itemTitle'>互动统计</View>
                  <View className='file_info-more'>
                    <View className='file_info-moreItem'>
                      <Text className='file_value'>1</Text>
                      <Text className='file_key'>阅读人数</Text>
                    </View>
                    <View className='file_info-moreItem'>
                      <Text className='file_value'>4</Text>
                      <Text className='file_key'>阅读次数</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>)}
        </AtActionSheet>
      </View>
    );
  }
}