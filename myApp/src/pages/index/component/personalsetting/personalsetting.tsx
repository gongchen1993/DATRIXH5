import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView, Button, Input, Image } from '@tarojs/components'
import './personalsetting.scss'
import { AtIcon, AtSearchBar, AtList, AtListItem, AtModal, AtModalHeader, AtModalContent, AtModalAction, AtFloatLayout, AtAvatar } from 'taro-ui'

export default class Personalsetting extends Component {

    config = {
        navigationBarTitleText: '个人中心'
    }

    state = {
        currentName: '个人中心',
        searchValue: '',
        personal_data: {
            company: '上海德拓信息技术股份有限公司',
            part: '创新产品事业部',
            job: '产品经理',
            imag: '',
            name: '陈潜智'
        }
    }

    onSearchChange(value) {

    }

    itemOnClick(value) {
        Taro.navigateTo({
            url: `/pages/index/component/personalsetting/organization/organization`
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
            <View className='res_index-container'>
                <View className='res_index-title'>
                    <View className='res_index-titleName' >
                        <Text>{this.state.currentName}</Text>
                    </View>
                </View>
                <View className='res_index_card'>
                    <View className='res_index_card_top at-row at-row--wrap'>
                        <View className='res_index_card_info at-col at-col-7'>
                            <View className='at-row at-row--wrap'>
                                <View className='at-col at-col-12'><Text>{this.state.personal_data.company}</Text></View>
                                <View className='at-col at-col-12'><Text>{this.state.personal_data.part}</Text></View>
                                <View className='at-col at-col-12'><Text>{this.state.personal_data.job}</Text></View>
                            </View>
                        </View>
                        <View className='res_index_card_img at-col at-col-5'>
                            <AtAvatar image='https://jdc.jd.com/img/200' size='large'></AtAvatar>
                        </View>
                    </View>
                    <View className='res_index_card_mid'>
                        <View className='res_index_card_name'>
                            <Text>{this.state.personal_data.name}</Text>
                        </View>
                    </View>
                    <hr></hr>
                    <View className='res_index_card_bot at-row at-row--wrap'>
                        <View className='res_index_card_bot_text at-col at-col-10'>
                            <Text>对外名片</Text>
                        </View>
                        <View className='res_index_card_bot_right at-col at-col-2'>
                            <AtIcon className='res_index-sort' value='message' size='18'></AtIcon>
                            <AtIcon className='res_index-sort' value='chevron-right' size='18'></AtIcon>
                        </View>
                    </View>
                </View>
                <View className="res_index-search">
                    <AtSearchBar
                        value={this.state.searchValue}
                        onChange={this.onSearchChange.bind(this)}
                    />
                </View>
                <View className="res_index_list">
                    {/* <AtList>
                        <AtListItem
                            title='动态'
                            iconInfo={{ size: 25, color: '#78A4FA', value: 'calendar', }}
                        />
                        <AtListItem
                            title='通讯录'
                            iconInfo={{ size: 25, color: '#FF4949', value: 'calendar', }}
                        />
                        <AtListItem
                            title='组织架构'
                            iconInfo={{ size: 25, color: '#FF4949', value: 'calendar', }}
                            onClick={this.itemOnClick.bind(this)}
                        />
                    </AtList> */}

                    <View className='at-row'>
                        <View className='at-col at-col-1'></View>
                        <View className='at-col at-col-1'><AtIcon className='res_index-sort' value='eye' size='25' color='yellow'></AtIcon></View>
                        {/* <View className='at-col at-col-1'></View> */}
                        <View className='res_index_list_txt at-col at-col-9 '>
                            <Text>动态</Text>
                        </View>
                        <View className='at-col at-col-1'><View className='res_index_bort'>12</View></View>
                    </View>
                    <hr className='list_hr'></hr>

                    <View className='at-row'>
                        <View className='at-col at-col-1'></View>
                        <View className='at-col at-col-1'><AtIcon className='res_index-sort' value='phone' size='25' color='blue'></AtIcon></View>
                        {/* <View className='at-col at-col-1'></View> */}
                        <View className='res_index_list_txt at-col at-col-10 '>
                            <Text>通讯录</Text>
                        </View>
                    </View>
                    <hr className='list_hr'></hr>

                    <View className='at-row' onClick={this.itemOnClick.bind(this)}>
                        <View className='at-col at-col-1'></View>
                        <View className='at-col at-col-1'><AtIcon className='res_index-sort' value='calendar' size='25' color='green'></AtIcon></View>
                        {/* <View className='at-col at-col-1'></View> */}
                        <View className='res_index_list_txt at-col at-col-9 '>  
                            <Text>组织架构</Text>
                        </View>
                        <View className='at-col at-col-1'><AtIcon className='res_index-sort' value='chevron-right' size='30'></AtIcon></View>
                    </View>
                    <hr className='list_hr'></hr>
                </View>
            </View>
        );
    }
}
