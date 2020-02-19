import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button, Input, ScrollView, Image } from '@tarojs/components';
import './searchFile.scss'
import { AtIcon, AtModal, AtCheckbox, AtModalHeader, AtModalContent, AtModalAction, AtActionSheet, AtSearchBar, AtList, AtListItem, AtFloatLayout } from 'taro-ui'
import List from '../list/list'
import fileImg from '../../../../images/filesvg.svg';

export default class Searchfile extends Component {

  config = {
    navigationBarTitleText: ''
  }

  state = {
    fileType: 'menu',
    fileTypeButton: [
      {
        type: 'fileType',
        name: '类型'
      },
      {
        type: 'owner',
        name: '所有者'
      },
      {
        type: 'folder',
        name: '文件夹'
      }
    ],
    openAdd: false,
    addFolderModel: false,
    sortModel: false,
    sortDateType: [
      {
        name: '修改时间',
      },
      {
        name: '创建时间',
      },
      {
        name: '名称',
      },
    ],
    fileTypeList: [
      {
        name: '全部',
        value: 'iconfont iconall'
      },
      {
        name: '文档',
        value: 'iconfont iconfeeds'
      },
      {
        name: '表格',
        value: 'iconfont iconform'
      },
      {
        name: '文件',
        value: 'iconfont iconicon_doc'
      },
      {
        name: '文件夹',
        value: 'iconfont iconfolder'
      },
      {
        name: '视频',
        value: 'iconfont iconvideo'
      },
      {
        name: '音频',
        value: 'iconfont iconvoice'
      },
      {
        name: '图片',
        value: 'iconfont iconpic'
      },
      {
        name: 'PDF',
        value: 'iconfont iconpdf-fill'
      },
      {
        name: '其他类型文件',
        value: 'iconfont icontemplate'
      },
    ],
    sortDateTypeChecked: -1,
    searchValue: '',
    fileList: [
      {
        name: '文件名',
        note: '2月12日 20：20'
      },
      {
        name: '文件名',
        note: '2月12日 20：20'
      },
      {
        name: '文件名',
        note: '2月12日 20：20'
      },
      {
        name: '文件名',
        note: '2月12日 20：20'
      },
      {
        name: '文件名',
        note: '2月12日 20：20'
      },
      {
        name: '文件名',
        note: '2月12日 20：20'
      },
      {
        name: '文件名',
        note: '2月12日 20：20'
      },
      {
        name: '文件名',
        note: '2月12日 20：20'
      },
      {
        name: '文件名',
        note: '2月12日 20：20'
      },
      {
        name: '文件名',
        note: '2月12日 20：20'
      },
      {
        name: '文件名',
        note: '2月12日 20：20'
      },
    ],
    fileTypeMldal: false,//选择文件类型框
    folderMldal: false,//文件夹选择框
    folderMldalDetail: false,//我的文档框
    checkboxOption: [{
      value: 'Oups',
      desc: '最后更新与2月9日 13：34',
      label: 'Oups',
    }, {
      value: 'Oups2',
      desc: '最后更新与2月9日 13：34',
      label: 'Oups2'
    }, {
      value: 'Oups3',
      desc: '最后更新与2月9日 13：34',
      label: 'Oups3',
    }, {
      value: 'Oups4',
      label: 'Oups4',
      desc: '最后更新与2月9日 13：34'
    }],
    checkedList: ['Oups'],
    chooseCircle: false,//全部与归我所有

  }
  closeSearch() {
    this.setState({
      sortModel: false
    }, () => {
      Taro.navigateTo({
        url: `/pages/index/index`
      });
    })

  }
  showMoreFolder() {

  }
  openFileLayout(item) {//打开选择文件筐
    console.log(item.type)
    if (item.type == "fileType") {
      this.setState({
        fileTypeMldal: true
      })
    } else if (item.type == "owner") {

    } else if (item.type == "folder") {
      this.setState({
        folderMldal: true
      })
    }

  }
  openSortModel() {
    console.log(this.state.sortModel)
    this.setState({
      sortModel: !this.state.sortModel
    }, () => {
      if (document.body.classList.contains('popup-open')) {
        document.body.classList.remove('popup-open');
      } else {
        document.body.classList.add('popup-open');
      }
    })
  }
  closeSortModel() {
    this.setState({
      sortModel: false

    }, () => {
      if (document.body.classList.contains('popup-open')) {
        document.body.classList.remove('popup-open');
      }
    })
  }
  resetSort() {
    this.setState({
      sortTypeChecked: 0
    })
  }
  confirmSort() {
    this.setState({
      sortModel: false
    }, () => {
      if (document.body.classList.contains('popup-open')) {
        document.body.classList.remove('popup-open');
      }
    })
  }
  closeFileLayout() {//关闭选择文件类型框
    this.setState({
      fileTypeMldal: false
    })
  }
  closeFolderMldal() {//关闭文件夹选择框
    this.setState({
      folderMldal: false
    })
  }
  openFolderMldalDetail() {
    this.setState({
      folderMldalDetail: true
    })
  }
  closeFolderMldalDetail() {//关闭我的文档
    this.setState({
      folderMldalDetail: false
    })
  }
  handleChange(value) {//文件夹选择
    this.setState({
      checkedList: value
    })
  }
  chooseFolderSure() {//确认选择
    this.setState({
      folderMldalDetail: false
    })
  }
  chooseCircle(type) {//全部与归我所有
    if (type == 'all') {
      this.setState({
        chooseCircle: false
      })
    } else if (type == 'ower') {
      this.setState({
        chooseCircle: true
      })
    }
  }
  checkFileType() {

  }
  onSearchChange(value) {
    console.log(123)
  }
  onActionClickSearchBar() {
    console.log(123)
  }
  componentWillMount() { }
  componentDidMount() { }
  componentWillReceiveProps(nextProps, nextContext) { }
  componentWillUnmount() { }
  componentDidShow() { }
  componentDidHide() { }
  componentDidCatchError() { }
  componentDidNotFound() { }
  render() {
    const scrollStyle = {
      height: '100%'
    }
    return (
      <View className='sea_index-container'>
        <View className='sub_index-content'>
          <View className="res_index-search">
            <AtSearchBar
              value={this.state.searchValue}
              onChange={this.onSearchChange.bind(this)}
              onActionClick={this.onActionClickSearchBar.bind(this)}
            />
            <View className='res_index-all' onClick={this.closeSearch.bind(this)}>
              <Text>取消</Text>
            </View>
          </View>
        </View>
        <View className='res_index-header'>
          <View className='res_index-all' onClick={this.showMoreFolder.bind(this)}>
            <Text className={this.state.chooseCircle ? "res_index-allTotal" : "res_index-allTotal res_index-allTotal--active"} onClick={this.chooseCircle.bind(this, 'all')}>全部</Text>
            <Text className={this.state.chooseCircle ? "res_index-allTotal  res_index-allTotal--active" : "res_index-allTotal"} onClick={this.chooseCircle.bind(this, 'ower')}>归我所有</Text>
          </View>
          <View className='res_index-titleName' onClick={this.openSortModel.bind(this)}>
            <Text>过滤</Text>
            <Text className='arrow'></Text>
          </View>
        </View>
        <List className="search-list" list={this.state.fileList} type={this.state.fileType}></List>
        <AtFloatLayout isOpened={this.state.sortModel} className='sort-model' onClose={this.closeSortModel.bind(this)}>
          {this.state.fileTypeButton.map((item, index) => {
            return <View className='res_index-title'>
              <View className='res_index-name'>{item.name}</View>
              <View className='res_index-all' onClick={this.openFileLayout.bind(this, item)}>
                <AtIcon value='add-circle' size='24' color='#000' ></AtIcon>
                <AtIcon value='chevron-right' size='18' color='#8b9dde'></AtIcon>
              </View>
            </View>
          })}
          <View className='sort_body-content'>
            <View className='sort_body-button sort_body-button--reset' onClick={this.resetSort.bind(this)}>重置条件</View>
            <View className='sort_body-button sort_body-button--confirm' onClick={this.confirmSort.bind(this)}>确定</View>
          </View>
        </AtFloatLayout>
        {/* 类型 */}
        <AtModal isOpened={this.state.fileTypeMldal} className="choose_file_type">
          <View className="choose_file_type_head">
            <AtIcon value='close' size='24' color='#000' onClick={this.closeFileLayout.bind(this, 'add')}></AtIcon>
            <Text className="file_type_head_text">选择文件类型</Text>
          </View>
          <View className='file_body-content'>
            {this.state.fileTypeList.map((item, index) => {
              return <View className='file_body-type' onClick={this.checkFileType.bind(this, item, index)}>
                <View className={item.value} style={"font-size:24px;color:#000"} ></View>
                <View>
                  {item.name}
                </View>
              </View>
            })}
          </View>
        </AtModal>
        {/* 文件夹 */}
        <AtModal isOpened={this.state.folderMldal} className="choose_file_type">
          <View className="choose_file_type_head">
            <AtIcon value='close' size='24' color='#000' onClick={this.closeFolderMldal.bind(this)}></AtIcon>
            <Text className="folder_type_head_text">我的空间</Text>
          </View>
          <View className="res_index-search">
            <AtSearchBar
              value={this.state.searchValue}
              onChange={this.onSearchChange.bind(this)}
              onActionClick={this.onActionClickSearchBar.bind(this)}
            />
          </View>
          <AtList>
            <AtListItem title='我的文档' thumb={fileImg} onClick={this.openFolderMldalDetail.bind(this)} />
            <AtListItem title='共享文件夹' thumb={fileImg} />
          </AtList>
        </AtModal>
        {/* 我的文档 */}
        <AtModal isOpened={this.state.folderMldalDetail} className="choose_file_type choose_file_floder_type">
          <View className="choose_file_type_head">
            <AtIcon value='chevron-left' size='20' color='#000' onClick={this.closeFolderMldalDetail.bind(this)}></AtIcon>
            <Text className="folder_type_head_text">我的文档</Text>
          </View>
          <View className="res_index-search">
            <AtSearchBar
              value={this.state.searchValue}
              onChange={this.onSearchChange.bind(this)}
              onActionClick={this.onActionClickSearchBar.bind(this)}
            />
          </View>
          <AtCheckbox
            options={this.state.checkboxOption}
            selectedList={this.state.checkedList}
            onChange={this.handleChange.bind(this)}
          />
          <View className='choose-folder' onClick={this.chooseFolderSure.bind(this)}>
            <Text>选择</Text>

          </View>
        </AtModal>
      </View>
    );
  }
}