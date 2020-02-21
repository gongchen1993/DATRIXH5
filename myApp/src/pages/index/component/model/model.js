/* eslint-disable react/sort-comp */
/* eslint-disable import/first */
import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button, Input } from '@tarojs/components';
import './model.scss'
import { AtIcon, AtModal, AtModalHeader, AtModalContent, AtModalAction, AtActionSheet } from 'taro-ui'
import { connect } from '@tarojs/redux';

@connect(({ catalog }) => ({
  catalog
}))

export default class Mpdel extends Component {

  config = {
    navigationBarTitleText: ''
  }

  state = {
    addFolderModel: false,
    renameModal: false,
    sortType: [
      {
        name: '全部',
        fileType: -1
      },
      {
        name: '文档',
        fileType: 2
      },
      {
        name: '表格',
        fileType: 0
      },
      {
        name: '文件',
        fileType: 0
      },
      {
        name: '图片',
        fileType: 1
      },
      {
        name: '视频',
        fileType: 4
      },
    ],
    fileType: -1,
    sortTypeChecked: 0,
    sortDateType: [
      {
        name: '修改时间',
      },
      {
        name: '创建时间',
      },
    ],
    sortDateTypeChecked: -1,
    fileName: '',
    deleteModal: false
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
  changeFileName(e) {
    this.setState({
      fileName: e.target.value
    })
  }
  addCancel() {
    this.setState({
      addFolderModel: false
    })
  }
  addConfirm() {
    if (this.state.fileName) {
      const { dispatch } = this.props;
      let parentId = '';
      Taro.showLoading({
        mask: true,
        title: 'loading',
      });
      parentId = Taro.getStorageSync('parentId');
      const link_root = Taro.getStorageSync('link_root')
      dispatch({
        type: 'catalog/createFromLink',
        payload: {
          parentId: link_root,
          fileName: this.state.fileName,
          newFolder: false,
          isDir: true,
          fileSize: 0,
          lParentId: parentId,
          mode: 0
        }
      }).then((s) => {
        if (s.code == 200) {
          this.setState({
            addFolderModel: false
          })
          this.showToast('操作成功', 'success');
          const showDir = Taro.getStorageSync('showDir')
          this.getFileList(showDir)
        }
      })
    }
  }
  showToast(text, type) {
    Taro.showToast({
      title: text,
      icon: type,
    });
  }
  checkSortType(item, index) {
    this.setState({
      sortTypeChecked: index,
      fileType: item.fileType
    })
  }
  resetSort() {
    this.setState({
      sortTypeChecked: 0,
      fileType: -1
    })
  }
  confirmSort() {
    this.sortList()
    this.props.closeModel('sort')
  }
  sortList() {
    const { dispatch } = this.props;
    const showDir = Taro.getStorageSync('showDir')
    const id = Taro.getStorageSync('parentId')
    if (showDir == 0) {
      dispatch({
        type: 'catalog/list',
        payload: {
          page: 1,
          pageSize: 1000,
          parentId: id,
          mode: 0,
          showDir: 0,
          fileType: this.state.fileType
        }
      })
    } else {
      dispatch({
        type: 'catalog/publicSubList',
        payload: {
          page: 1,
          pageSize: 1000,
          parentId: id,
          mode: 0,
          showDir: showDir,
          fileType: this.state.fileType
        }
      })
    }
  }
  openRenameModal() {
    this.props.closeModel('more');
    this.setState({
      renameModal: true
    })
  }
  renameCancel() {
    this.setState({
      renameModal: false
    })
  }
  renameConfirm() {
    if (this.state.fileName) {
      const { fileId, dispatch } = this.props
      Taro.showLoading({
        mask: true,
        title: 'loading',
      });
      dispatch({
        type: 'catalog/renameFile',
        payload: {
          fileId: fileId,
          fileName: this.state.fileName
        }
      }).then((s) => {
        if (s.code == 200) {
          this.setState({
            renameModal: false
          })
          this.showToast('操作成功', 'success');
          const showDir = Taro.getStorageSync('showDir')
          this.getFileList(showDir)
        }
      })
    } else {
      // this.showToast('名称不能为空')
    }
  }
  getFileList(showDir) {
    const { dispatch } = this.props
    const id = Taro.getStorageSync('parentId')
    dispatch({
      type: 'catalog/publicSubList',
      payload: {
        page: 1,
        pageSize: 1000,
        parentId: id,
        mode: 0,
        showDir: showDir,
      }
    })
  }
  showToast(text, type) {
    Taro.showToast({
      title: text,
      icon: type,
    });
  }
  openDeModal() {
    this.props.closeModel('more')
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
    const { fileId, dispatch } = this.props
    Taro.showLoading({
      mask: true,
      title: 'loading',
    });
    dispatch({
      type: 'catalog/delFile',
      payload: {
        fileId: [fileId],
      }
    }).then((s) => {
      if (s.code == 200) {
        setTimeout(() => {
          this.closeDeModal()
          this.showToast('删除成功', 'success');
          const showDir = Taro.getStorageSync('showDir')
          this.getFileList(showDir)
        }, 2000);
      }
    })
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
            <Input className='model-addFolder' type='text' placeholder='请输入文件夹名称' value={this.state.fileName} onchange={this.changeFileName.bind(this)}></Input>
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
              <View className='more_model-actionItem' onClick={this.openRenameModal.bind(this)}>重命名</View>
              {/* <View className='more_model-actionItem'>添加至</View> */}
              <View className='more_model-actionItem'>移动到</View>
              <View className='more_model-actionItem'>复制链接</View>
              <View className='more_model-actionItem'>共享</View>
              <View className='more_model-actionItem' onClick={this.openDeModal.bind(this)}>移除</View>
            </View>
            <View className='more_model-cancel' onClick={() => this.props.closeModel('more')}>
              <Text>取消</Text>
            </View>
          </View>
        </AtActionSheet>
        <AtModal isOpened={this.state.renameModal}>
          <AtModalContent>
            <Input className='model-addFolder' type='text' placeholder='请输入名称' value={this.state.fileName} onchange={this.changeFileName.bind(this)}></Input>
          </AtModalContent>
          <AtModalAction> <Button onClick={this.renameCancel.bind(this)}>取消</Button> <Button onClick={this.renameConfirm.bind(this)}>确定</Button> </AtModalAction>
        </AtModal>
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