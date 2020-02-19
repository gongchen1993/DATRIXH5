/* eslint-disable react/sort-comp */
/* eslint-disable import/first */
import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './subList.scss'
import { AtIcon, AtSearchBar } from 'taro-ui'
import List from '../list/list';
import Model from '../model/model'
import { connect } from '@tarojs/redux';

@connect(({ catalog }) => ({
  catalog
}))
export default class Sublist extends Component {

  config = {
    navigationBarTitleText: ''
  }

  state = {
    isOpenModel: false,
    modelType: '',
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
    searchValue: '',
    fileList: [
      {
        pId: 0,
        name: '文件名1',
        note: '2月12日 20：20'
      },
      {
        pId: 0,
        name: '文件名2',
        note: '2月12日 20：20'
      },
      {
        pId: 0,
        name: '文件名',
        note: '2月12日 20：20'
      },
      {
        pId: 0,
        name: '文件名',
        note: '2月12日 20：20'
      },
      {
        pId: 0,
        name: '文件名',
        note: '2月12日 20：20'
      },
      {
        pId: 1,
        name: '文件名',
        note: '2月12日 20：20'
      },
      {
        pId: 1,
        name: '文件名',
        note: '2月12日 20：20'
      },
      {
        pId: 1,
        name: '文件名',
        note: '2月12日 20：20'
      },
      {
        pId: 1,
        name: '文件名',
        note: '2月12日 20：20'
      },
      {
        pId: 1,
        name: '文件名',
        note: '2月12日 20：20'
      },
      {
        pId: 1,
        name: '文件名',
        note: '2月12日 20：20'
      },
    ],
    moreActionModel: false
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
  openModel(type) {
    if (type == 'sort') {
      this.setState({
        sortModel: true
      }, () => {
        document.body.classList.add('popup-open');
      })
    } else if (type == 'more') {
      this.setState({
        moreActionModel: true
      }, () => {
        document.body.classList.add('popup-open');
      })
    }
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
    } else if (type == 'more') {
      this.setState({
        moreActionModel: false
      }, () => {
        if (document.body.classList.contains('popup-open')) {
          document.body.classList.remove('popup-open');
        }
      })
    }
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
  onSearchChange() {

  }
  backIndex() {
    Taro.navigateTo({
      url: `/pages/index/index`
    });
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


  componentWillMount() {
    
  }
  componentDidMount() {
    const { dispatch } = this.props;
    let id = Taro.getStorageSync('fileId')
    const currentName = Taro.getStorageSync('currentName')
    dispatch({
      type: 'catalog/save',
      payload: {
        currentName: currentName
      }
    });
    this.getSubList({ dispatch, id });
  }
  render() {
    const { catalog: { subList, currentName }} = this.props;
    return (
      <View className='sub_index-container'>
        <View className='sub_index-navbar'>
          <View className='sub_index-navbar-left'>
            <AtIcon value='chevron-left' size='24' color='#fff'></AtIcon>
            <Text className='sub_index-navbar-title' onClick={this.backIndex.bind(this)}>{currentName}</Text>
          </View>
          <View className='sub_index-navbar-right'>
            {this.state.fileTypeButton.map((item, index) => {
              return this.state.fileType == item.type ? <AtIcon key={index} value={item.atIconValue} size='24' color='#fff' onClick={this.changeFileType.bind(this, item)}></AtIcon> : null
            })}
            <AtIcon value='settings' size='24' color='#fff' onClick={this.openModel.bind(this, 'sort')}></AtIcon>
            {/* <Text className='fa fa-ellipsis-h' onClick={this.openModel.bind(this, 'more')}></Text> */}
            <AtIcon value='add-circle' size='24' color='#fff' onClick={this.openLayout.bind(this, 'addFolder')}></AtIcon>
          </View>
        </View>
        <View className='sub_index-content'>
          <View className='sub_index-search'>
            <AtSearchBar
              value={this.state.searchValue}
              onChange={this.onSearchChange.bind(this)}
            />
          </View>
          <List list={subList} type={this.state.fileType} getSubList={this.getSubList.bind(this)}></List>
        </View>
        <Model
          sortModel={this.state.sortModel}
          closeModel={this.closeModel.bind(this)}
          hideLayout={this.hideLayout.bind(this)}
          type={this.state.modelType}
          isOpen={this.state.isOpenModel}
          moreActionModel={this.state.moreActionModel}
        ></Model>
      </View>
    );
  }
}