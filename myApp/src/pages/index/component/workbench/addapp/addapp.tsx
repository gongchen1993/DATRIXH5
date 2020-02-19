import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button, Input, ScrollView, Image } from '@tarojs/components';
import './addapp.scss'
import { AtIcon, AtModal, AtModalHeader, AtModalContent, AtModalAction, AtActionSheet, AtSearchBar, AtList, AtListItem, AtNavBar, AtAvatar } from 'taro-ui'

export default class Addapp extends Component {

    config = {
        navigationBarTitleText: ''
    }

    state = {
        searchValue: '',
        app_list: [
            {
                name: '动态图谱',
                content: '让你的学习更有智慧',
                img: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
                is_checked: 0
            },
            {
                name: '疫情动态',
                content: '真实传递疫情信息，实时追踪最新动态',
                img: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
                is_checked: 1
            }
        ],
        app_list_data: [
            {
                name: '动态图谱',
                content: '让你的学习更有智慧',
                img: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
                is_checked: 0
            },
            {
                name: '疫情动态',
                content: '真实传递疫情信息，实时追踪最新动态',
                img: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
                is_checked: 1
            }
        ],
        search_app_list: [
            {
                name: '动态图谱',
                content: '让你的学习更有智慧',
                img: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
                is_checked: 0
            },
            {
                name: '疫情动态',
                content: '真实传递疫情信息，实时追踪最新动态',
                img: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
                is_checked: 1
            }
        ],
    }

    onActionClick() {
        let value = this.state.searchValue;
        console.log(value);
        if(value===''){
            this.setState({
                app_list:this.state.app_list_data
            });
        }else{
            let res = this.state.app_list_data.map(({name}) => ({ name }));
            let search_list_index = [];
            let search_list = [];
            for (var i = 0; i < res.length; i++) {  
                if(res[i].name.indexOf(value) > -1){
                    search_list_index.push(i);
                }
            }  
            for (var i = 0; i < this.state.app_list_data.length; i++) {  
                if(search_list_index.indexOf(i)>-1){
                    search_list.push(this.state.app_list_data[i]);
                }
            }  
            this.setState({
                app_list:search_list
            });
            console.log(search_list);
        }
        
    }

    onChange(value){
        this.setState({
            searchValue : value
        });
    }

    addapp(index){
        var temp_data = this.state.app_list;
        temp_data[index].is_checked ==1?temp_data[index].is_checked=0:temp_data[index].is_checked=1;
        this.setState({
            app_list:temp_data
        });
    }

    back(){
        Taro.navigateTo({
            url: `/pages/index/component/workbench/workbench`
        });
    }

    ok(){
        Taro.navigateTo({
            url: `/pages/index/component/workbench/workbench`
        });
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
            <View className='sub_index-container'>
                <AtNavBar
                    color='#000'
                    title='添加常用应用'
                    rightFirstIconType='check'
                    leftIconType='close'
                    onClickLeftIcon={this.back.bind(this)}
                    onClickRgIconSt={this.ok.bind(this)}
                >
                    <View>添加常用应用</View>
                </AtNavBar>
                <View className="res_index-search">
                    <AtSearchBar
                        showActionButton
                        value={this.state.searchValue}
                        onActionClick={this.onActionClick.bind(this)}
                        onChange={this.onChange.bind(this)}
                    />
                </View>
                <View className='res_index-app_content'>
                    {/* {this.state.app_list.map((item, index) => {
                        return <AtListItem
                            title={item.name}
                            note={item.content}
                            thumb={item.img}
                            isSwitch
                        />
                    })} */}

                    {this.state.app_list.map((item, index) => {
                        return <View className='at-row at-row--wrap app_list' onClick={this.addapp.bind(this,index)}>
                            <View className='at-col at-col-1'></View>
                            <View className='at-col at-col-1'>
                                {item.is_checked == 1 ? <AtIcon value='check-circle' size='25' color='blue'></AtIcon> : <AtIcon value='check-circle' size='25'></AtIcon>}
                            </View>
                            <View className='at-col at-col-2'><AtAvatar image={item.img}></AtAvatar></View>
                            <View className='at-col at-col-8 t-row at-row--wrap'>
                                <View className='at-col at-col-12 title'>{item.name}</View>
                                <View className='at-col at-col-12 content'>{item.content}</View>
                            </View>
                        </View>
                    })}

                </View>
            </View>
        );
    }
}