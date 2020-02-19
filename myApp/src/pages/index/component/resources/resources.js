/* eslint-disable react/sort-comp */
/* eslint-disable import/first */
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './resources.scss'
import { AtIcon, AtSearchBar } from 'taro-ui'
import List from '../list/list'
import Model from '../model/model'
import { connect } from '@tarojs/redux';

@connect(({ catalog }) => ({
  catalog
}))
export default class Resources extends Component {

  config = {
    navigationBarTitleText: '资源中心'
  }

  state = {
    modelType: '',
    isOpenModel: false,
    currentName: '公共资源',
    titleList: [
      {
        name: '公共资源',
        imgSrc: 'home'
      },
      {
        name: '资源库',
        imgSrc: 'home'
      },
      {
        name: '共享空间',
        imgSrc: 'star'
      },
      {
        name: '离线资源',
        imgSrc: 'download-cloud'
      },
    ],
    searchValue: '',
    fileType: 'menu',
    fileTypeButton: [
      {
        type: 'menu',
        atIconValue: 'menu'
      },
      {
        type: 'list',
        atIconValue: 'list'
      }
    ],
    sortModel: false,
    checkedType: 0
  }
  openLayout(type) {
    this.setState({
      isOpenModel: true,
      modelType: type
    }, () => {
      document.body.classList.add('popup-open');
    })
  }
  hideLayout() {
    this.setState({
      isOpenModel: false
    }, () => {
      if (document.body.classList.contains('popup-open')) {
        document.body.classList.remove('popup-open');
      }
    })
  }
  selectTitle(item) {
    this.setState({
      currentName: item.name
    })
    this.hideLayout();
  }
  changeFileType(item) {
    if (item.type == 'list') {
      this.setState({
        fileType: 'menu'
      })
    } else {
      this.setState({
        fileType: 'list'
      })
    }
  }
  openSortModel() {
    this.setState({
      sortModel: true
    }, () => {
      document.body.classList.add('popup-open');
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
  closeModel(type) {
    if (type == 'sort') {
      this.setState({
        sortModel: false
      }, () => {
        if (document.body.classList.contains('popup-open')) {
          document.body.classList.remove('popup-open');
        }
      })
    }
  }

  jumpSubList(fileId, currentName) {
    const { dispatch } = this.props;
    Taro.setStorageSync('currentName', currentName);
    Taro.setStorageSync('fileId', fileId);
    dispatch({
      type: 'catalog/save',
      payload: {
        currentName: currentName
      }
    });
    Taro.navigateTo({
      url: `/pages/index/component/subList/subList`
    });
  }

  showMoreFolder() {
    const fileId = 'e60653302df41b796eea6e6bcb0ce182';
    const currentName = this.state.currentName;
    this.jumpSubList(fileId, currentName)
  }
  handleFolder(item) {
    this.jumpSubList(item.file_id, item.filename_KeywordIkPinyin);
  }

  onSearchChange() {

  }
  searchFile() {
    Taro.navigateTo({
      url: `/pages/index/component/searchFile/searchFile`
    });
  }
  handleRecent(index) {
    this.setState({
      checkedType: index
    })
  }
  getSubList({ dispatch, id }) {
    dispatch({
      type: 'catalog/publicSubList',
      payload: {
        page: 1,
        pageSize: 20,
        parentId: id,
        mode: 0,
        withCollect: true,
      }
    })
  }

  componentWillMount() { }
  componentDidMount() { 
    const { dispatch } = this.props;
    let id = 'e60653302df41b796eea6e6bcb0ce182'
    this.getSubList({ dispatch, id });
  }
  render() {
    const recently = [
      {
        name: '最近上传'
      },
      {
        name: '最近更新'
      }
    ]
    const { catalog: { subList }} = this.props;
    const folderList = subList.slice(0, 6);
    return (
      <View className='resources_index-container'>
        <View className='res_index-title'>
          <View className='res_index-titleName' onClick={this.openLayout.bind(this, 'title')}>
            <Text>{this.state.currentName}</Text>
            <AtIcon value='chevron-down' size='24' color='#fff'></AtIcon>
          </View>
          <View>
            <AtIcon value='add-circle' size='24' color='#fff' onClick={this.openLayout.bind(this, 'add')}></AtIcon>
          </View>
        </View>
        <View className='res_index-search'>
          <AtSearchBar
            value={this.state.searchValue}
            onChange={this.onSearchChange.bind(this)}
            onFocus={this.searchFile.bind(this)}
          />
        </View>
        <View className='res_index-header'>
          <View className='res_index-name'>我的文件夹</View>
          <View className='res_index-all' onClick={this.showMoreFolder.bind(this)}>
            <Text>全部</Text>
            <AtIcon value='chevron-right' size='18' color='#395AC5'></AtIcon>
          </View>
        </View>
        <View className='res_index-folder'>
          {folderList.map((item, index) => {
            return <View className='res_folder-item' key={index} onClick={this.handleFolder.bind(this, item)}>
              <Text className='fa fa-folder folder-image'></Text>
              <Text className='folder-name'>{item.filename_KeywordIkPinyin}</Text>
            </View>
          })}
        </View>
        <View className='res_index-header'>
          <View className='res_index-name'>
            {recently.map((item, index) => {
              return <Text className={this.state.checkedType === index ? 'checked' : ''} key={index} onClick={this.handleRecent.bind(this, index)}>{item.name}</Text>
            })}
          </View>
          <View className='res_index-all'>
            <AtIcon className='res_index-sort' value='settings' size='18' color='#000' onClick={this.openSortModel.bind(this)}></AtIcon>
            {this.state.fileTypeButton.map((item, index) => {
              return this.state.fileType == item.type ? <AtIcon key={index} value={item.atIconValue} size='18' color='#000' onClick={this.changeFileType.bind(this, item)}></AtIcon> : null
            })}
          </View>
        </View>
        <List list={subList} type={this.state.fileType}></List>
        <Model
          type={this.state.modelType}
          isOpen={this.state.isOpenModel}
          hideLayout={this.hideLayout.bind(this)}
          title={this.state.titleList}
          selectTitle={this.selectTitle.bind(this)}
          sortModel={this.state.sortModel}
          closeModel={this.closeModel.bind(this)}
        ></Model>
      </View>
    );
  }
}
