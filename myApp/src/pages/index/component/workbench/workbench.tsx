import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView, Button, Input, Image } from '@tarojs/components'
import './workbench.scss'
import { AtIcon, AtSearchBar, AtList, AtListItem, AtModal, AtModalHeader, AtModalContent, AtModalAction, AtFloatLayout, AtGrid } from 'taro-ui'

export default class Workbench extends Component {

    config = {
        navigationBarTitleText: '工作台'
    }

    state = {
        currentName: '工作台',
        openTitle: false,
        openAdd: false,

        addFolderModel: false,
        sortModel: false,
        sortTypeChecked: 0,
        data: [
            {
                image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
                value: '门户站点'
            },
            {
                image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
                value: '智能图谱'
            },
            
        ]
    }

    showMoreFolder() {
        Taro.navigateTo({
            url: `/pages/index/component/workbench/addapp/addapp`
        });
    }

    onSearchChange(value) {

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
            <View className='res_index-container'>
                <View className='res_index-title'>
                    <View className='res_index-titleName' >
                        <Text>{this.state.currentName}</Text>
                    </View>
                </View>
                <View className='res_index_add' onClick={this.showMoreFolder.bind(this)}>
                    <AtIcon value='add-circle' size='30'></AtIcon>
                    <View className='res_index_add_text' >添加常用</View>
                </View>
                <View className='res_index-header'>
                    <View className='res_index-name'>全部应用</View>
                </View>
                <View className='res_index_app'>
                    <AtGrid  columnNum={4}  data={this.state.data} /> 
                </View>
            </View>
        );
    }
}
