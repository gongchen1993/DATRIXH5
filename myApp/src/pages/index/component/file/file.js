import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button, Image, Video } from '@tarojs/components';
import './file.scss'
import { AtIcon, AtActionSheet, AtAvatar, AtModal } from 'taro-ui'
import { connect } from '@tarojs/redux';
import { IMG_SERVER, PDF_SRVER } from '../../../../utils/config';

@connect(({ preview, catalog }) => ({
  preview,
  catalog
}))
export default class File extends Component {

  config = {
    navigationBarTitleText: ''
  }

  state = {
    actionModel: false,
    fileInfoModel: false,
    isPreview: false,
    deleteModal: false
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
  getFileData({ dispatch, id }) {
    dispatch({
      type: 'preview/infoList',
      payload: {
        fileId: id,
        withCollect: true,
        withPraise: true
      }
    })
  }
  conver(limit) {
    let size = "";
    if (limit < 0.1 * 1024) { //如果小于0.1KB转化成B  
      size = limit.toFixed(2) + "B";
    } else if (limit < 0.1 * 1024 * 1024) {//如果小于0.1MB转化成KB  
      size = (limit / 1024).toFixed(2) + "KB";
    } else if (limit < 0.1 * 1024 * 1024 * 1024) { //如果小于0.1GB转化成MB  
      size = (limit / (1024 * 1024)).toFixed(2) + "MB";
    } else { //其他转化成GB  
      size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";
    }
    let sizestr = size + "";
    let len = sizestr.indexOf("\.");
    let dec = sizestr.substr(len + 1, 2);
    if (dec == "00") {//当小数点后为00时 去掉小数部分  
      return sizestr.substring(0, len) + sizestr.substr(len + 3, 2);
    }
    return sizestr;
  }
  self_MakeRandom() {
    const rand = Math.random().toString(36).substring(2);
    return rand;
  }
  self_MakeURL({ id, userId }) {
    const rand = this.self_MakeRandom();
    const pdfURL = `${PDF_SRVER}fileId=${id}&userId=${userId}&rand=${rand}`;
    const imgURL = `${IMG_SERVER}${id}&userId=${userId}&preview=file&rand=${rand}`;
    const videoURL = `${IMG_SERVER}${id}&preview=file&userId=${userId}&viewPx=标清`;
    return {
      pdfURL, imgURL, videoURL
    }
  }
  openDeModal() {
    this.handleClose()
    this.setState({
      deleteModal: true
    })
  }
  closeDeModal() {
    this.setState({
      deleteModal: false
    })
  }
  handleDeCancel() {
    this.closeDeModal()
  }
  handleDeConfirm() {
    const { dispatch } = this.props;
    let fileId = '';
    Taro.showLoading({
      mask: true,
      title: 'loading',
    });
    fileId = Taro.getStorageSync('fileId');
    dispatch({
      type: 'catalog/delFile',
      payload: {
        fileId: [fileId],
      }
    }).then((s) => {
      if (s.code == 200) {
        this.closeDeModal()
        this.showToast('删除成功', 'success');
        Taro.navigateTo({
          url: `/pages/index/component/subList/subList`
        });
      }
    })
  }
  showToast(text, type) {
    Taro.showToast({
      title: text,
      icon: type,
    });
  }
  componentDidMount() {
    const { dispatch } = this.props;
    let id = Taro.getStorageSync('fileId');
    this.getFileData({ dispatch, id })
  }

  render() {
    const { preview } = this.props;
    const { infoListdata } = preview;
    const { filename_KeywordIkPinyin, ext, create_time, file_size, userInfo, file_type } = infoListdata;
    const fileSize = this.conver(file_size);
    const id = Taro.getStorageSync('fileId');
    const userId = Taro.getStorageSync('user_id');
    const URL = this.self_MakeURL({ id, userId });
    const { pdfURL, imgURL, videoURL } = URL;
    return (
      <View className='file_index-contanier'>
        <View className='file_index-navbar'>
          <View className='file_index-navbar-left'>
            <AtIcon value='chevron-left' size='24' color='#fff'></AtIcon>
            <Text className='file_index-navbar-title' onClick={this.backSubIndex.bind(this)}>{filename_KeywordIkPinyin}</Text>
          </View>
          <View className='file_index-navbar-right'>
            <Text className='fa fa-ellipsis-h' onClick={this.openModel.bind(this)}></Text>
          </View>
        </View>
        <View className='file_index-content'>
          {
            file_type == '2'
              ? (
                <iframe
                  className='previewIframe'
                  src={pdfURL}
                >
                </iframe>
              ) : (
                file_type == '3' || file_type == '4'
                  ? (
                    <Video src={videoURL} />
                  )
                  : (
                    <Image className='file_index-image' src={imgURL} onClick={this.handlePreview.bind(this)} />
                  )
              )
          }
        </View>
        <View className='file_index-bottom'>
          <View className='file_index-bottom-content'>
            <AtIcon value='download-cloud' size='24' color='#000'></AtIcon>
            <AtIcon value='share' size='24' color='#000'></AtIcon>
          </View>
        </View>
        {this.state.isPreview ? (<View className='file_index-preview' onClick={this.closePreview.bind(this)}>
          {
            file_type == '2'
              ? (
                <iframe
                  className='previewIframe'
                  src={pdfURL}
                >
                </iframe>
              ) : (
                file_type == '3' || file_type == '4'
                  ? (
                    <Video src={videoURL} />
                  )
                  : (
                    <Image className='file_index-previewImage' src={imgURL} onClick={this.handlePreview.bind(this)} />
                  )
              )
          }
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
                  <View className='file-name'>{filename_KeywordIkPinyin}</View>
                  <View className='file-moreInfo'>阅读次数：{infoListdata.preview}&emsp;所有者：{userInfo ? userInfo.user_name : ''}</View>
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
                <View className='file_action-button' onClick={this.openDeModal.bind(this)}>
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
                    <AtAvatar circle text={userInfo ? userInfo.user_name : ''} size='small'></AtAvatar>
                    <Text className='file_info-detail--text'>{userInfo ? userInfo.user_name : ''}</Text>
                  </View>
                </View>
                <View className='file_info-item'>
                  <View className='file_info-itemTitle'>文档创建时间</View>
                  <View className='file_info-detail'>
                    <AtAvatar circle text='某某' size='small'></AtAvatar>
                    <Text className='file_info-detail--text'>{create_time}</Text>
                  </View>
                </View>
                <View className='file_info-item'>
                  <View className='file_info-itemTitle'>简介</View>
                  <View className='file_info-more'>
                    <View className='file_info-moreItem'>
                      <Text className='file_value'>{ext}</Text>
                      <Text className='file_key'>文件类型</Text>
                    </View>
                    <View className='file_info-moreItem'>
                      <Text className='file_value'>{fileSize}</Text>
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
                      <Text className='file_value'>{infoListdata.preview}</Text>
                      <Text className='file_key'>阅读次数</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>)}
        </AtActionSheet>
        <AtModal
          isOpened={this.state.deleteModal}
          cancelText='取消'
          confirmText='确认'
          onClose={this.closeDeModal.bind(this)}
          onCancel={this.handleDeCancel.bind(this)}
          onConfirm={this.handleDeConfirm.bind(this)}
          content='是否删除文件?'
        />
      </View>
    );
  }
}