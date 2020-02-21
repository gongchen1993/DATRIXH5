/* eslint-disable react/sort-comp */
/* eslint-disable import/first */
import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import './list.scss'
import { AtList, AtListItem, AtIcon, AtLoadMore } from 'taro-ui'
import Model from '../model/model'
import { connect } from '@tarojs/redux';
import { IMG_SERVER } from '../../../../utils/config';
import folderImg from '../../../../images/folder.svg';
import pdfImg from '../../../../images/pdf.svg';
import pptImg from '../../../../images/ppt.svg';
import itImg from '../../../../images/it.svg';
import zipImg from '../../../../images/zip.svg';
import txtImg from '../../../../images/txt.svg'
import videoImg from '../../../../images/video.svg';
import docxImg from '../../../../images/word.svg';
import nodata from '../../../../images/nodata.svg';

@connect(({ catalog }) => ({
  catalog
}))
export default class List extends Component {

  config = {
    navigationBarTitleText: '',
    fileId: ''
  }

  state = {
    moreActionModel: false,
  }
  openModel(type, item) {
    if (type == 'more') {
      this.setState({
        moreActionModel: true,
        fileId: item.file_id
      }, () => {
        document.body.classList.add('popup-open');
      })
    }
  }
  closeModel(type) {
    if (type == 'more') {
      this.setState({
        moreActionModel: false
      }, () => {
        if (document.body.classList.contains('popup-open')) {
          document.body.classList.remove('popup-open');
        }
      })
    }
  }
  loadMore(total) {

  }
  handleTo(type_, isdir, id, title, file_type, record_id) {
    const { dispatch } = this.props;
    let fullPath = Taro.getStorageSync('fullPath');
    fullPath = fullPath + '/' + id;
    Taro.setStorageSync('fullPath', fullPath);
    let fullPathName = Taro.getStorageSync('fullPathName');
    fullPathName = fullPathName + '/' + title;
    Taro.setStorageSync('fullPathName', fullPathName);
    Taro.setStorageSync('showDir', -1);
    if (file_type == '0') {
      Taro.setStorageSync('currentName', title);
      Taro.setStorageSync('parentId', id);
      dispatch({
        type: 'catalog/save',
        payload: {
          currentName: title
        }
      });
      this.props.getSubList({ dispatch, id });
    } else {
      Taro.setStorageSync('fileId', id);
      Taro.navigateTo({
        url: `/pages/index/component/file/file`
      });
    }
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
    const { list = [], type } = this.props;
    const scrollStyle = {
      height: '100%'
    }
    let thumb = ({ type = '', dir = '', id, file_type }) => {
      if (dir) {
        return folderImg;
      }
      const rand = Math.random().toString(36).substring(2);
      const type_ = type.toLowerCase();
      if (file_type === 4) {
        const url = `${IMG_SERVER}${id}&rand=${rand}`;
        return url;
      } else if (file_type === 1) {
        const url = `${IMG_SERVER}${id}&rand=${rand}`;
        return url;
      } else if (file_type === 2) {
        if (type_ === 'pdf') {
          return pdfImg;
        } else if (type_ === 'ppt') {
          return pptImg;
        } else if (type_ === 'txt') {
          return txtImg;
        } else if (type_ === 'docx') {
          return docxImg;
        } else {
          return itImg;
        }
      } else if (file_type === 3) {
        return videoImg;
      } else if (file_type === 5) {
        return zipImg;
      } else {
        return itImg;
      }

    }
    const listArr = list.map((item) => {
      const { ext, file_id, filename_KeywordIkPinyin, file_name_KeywordIkPinyin, create_time: time, record_id, is_collect, isdir, is_dir, file_type } = item;
      const title = filename_KeywordIkPinyin || file_name_KeywordIkPinyin;
      const like = is_collect || record_id;
      const dir = isdir || is_dir;
      return (
        <AtListItem
          key={file_id}
          title={title}
          note={time}
          onClick={this.handleTo.bind(this, ext, dir, file_id, title, file_type, record_id)}
          thumb={thumb({ type: ext, dir, id: file_id, file_type })}
        />
      )
    })
    const cardArr = list.map((item, index) => {
      const { ext, file_id, filename_KeywordIkPinyin, file_name_KeywordIkPinyin, create_time: time, record_id, is_collect, isdir, is_dir, file_type } = item;
      const title = filename_KeywordIkPinyin || file_name_KeywordIkPinyin;
      const like = is_collect || record_id;
      const dir = isdir || is_dir;
      return (
        <View key={index} className='list-item'>
          <View className='list-item_top'>
            <Image className='list-item_image' src={thumb({ type: ext, dir, id: file_id, file_type })} />
          </View>
          <View className='list-item_content'>
            <View className='list_item-left'>
              <Image className='list-item_icon' src={thumb({ type: ext, dir, id: file_id, file_type })} />
              <Text className='list-item_fileName'>{title}</Text>
            </View>
            <View>
              <Text className='fa fa-ellipsis-v' onClick={this.openModel.bind(this, 'more', item)}></Text>
            </View>
          </View>
        </View>
      )
    })
    return (
      <View className='list_index-fileContent'>
        <ScrollView
          className='scrollview'
          scrollY
          style={scrollStyle}
          scrollWithAnimation
          scrollTop={0}
          lowerThreshold={20}
          upperThreshold={20}
        >
          {
            list.length === 0 ? <Image className='imageStyle' src={nodata} style='height: 100%;width: 100%;text-align: center;vertical-align: middle;' />
              : (type == 'menu' ? <AtList>
                {listArr}
                {/* {
                  list.length >= 20 ?
                    (<AtLoadMore
                      onClick={this.loadMore.bind(this, list.length)}
                      status={this.state.status}
                      style='height: auto;'
                    />) : ('')
                } */}
              </AtList> : <View className='list_index-list'>{cardArr}</View>)
          }
        </ScrollView>
        <Model
          moreActionModel={this.state.moreActionModel}
          closeModel={this.closeModel.bind(this)}
          fileId={this.state.fileId}
        ></Model>
      </View>
    );
  }
}