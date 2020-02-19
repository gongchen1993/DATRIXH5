import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button, Input, ScrollView, Image } from '@tarojs/components';
import './organization.scss'
import { AtIcon, AtModal, AtModalHeader, AtModalContent, AtModalAction, AtActionSheet, AtSearchBar, AtList, AtListItem, AtNavBar } from 'taro-ui'

export default class Organization extends Component {

    config = {
        navigationBarTitleText: ''
    }

    state = {
        nav_level: 0,
        searchValue: '',
        nav_list: ['联系人', '上海德拓信息技术股份有限公司'],
        nav_data: [
            {
                name: '支撑体系',
                value: '37'
            },
            {
                name: '营销体系',
                value: '27'
            },
            {
                name: '研发体系',
                value: '148'
            },
            {
                name: '交付体系',
                value: '28'
            }
        ],
        search_nav_data: [
            {
                name: '支撑体系',
                value: '37'
            },
            {
                name: '营销体系',
                value: '27'
            },
            {
                name: '研发体系',
                value: '148'
            },
            {
                name: '交付体系',
                value: '28'
            }
        ],
        nav_data1: [
            {
                name: '支撑体系',
                value: '37'
            },
            {
                name: '营销体系',
                value: '27'
            },
            {
                name: '研发体系',
                value: '148'
            },
            {
                name: '交付体系',
                value: '28'
            }
        ],
        index1: 0,
        nav_data2: [
            {
                name: '创新产品事业部',
                value: '45'
            },
            {
                name: '数据中心',
                value: '8'
            },
            {
                name: '云计算事业部',
                value: '47'
            },
            {
                name: '研发协同中心',
                value: '1'
            },
            {
                name: '大数据事业部',
                value: '47'
            }
        ],
        index2: 0,
        nav_data3: [
            {
                name: '技术架构部',
                value: '5'
            },
            {
                name: '数据管理产品线',
                value: '6'
            },
            {
                name: '教育科研产品线',
                value: '3'
            },
            {
                name: '产品运营部',
                value: '8'
            },
            {
                name: '质量保证部',
                value: '6'
            },
            {
                name: '交互研发部',
                value: '10'
            },
            {
                name: 'AL LAB',
                value: '7'
            }
        ],
        index3: 0,
        nav_data4: [
            {
                name: '孙伟',
                value: ''
            },
            {
                name: '杨小帅',
                value: '6'
            },
            {
                name: '张兵兵',
                value: '3'
            },
            {
                name: '呼喊元',
                value: '8'
            },
            {
                name: '徐凤超',
                value: '6'
            },
            {
                name: '消防',
                value: '10'
            },
            {
                name: '王婷婷',
                value: '7'
            },
            {
                name: '孙明静',
                value: '7'
            }
        ],
        index5: 0,
        nav_data5: {
            og: '上海德拓信息技术股份有限公司',
            name: '孙明婧',
            phone: '+86-15598897887',
            part: '研发体系-创新产品事业部-产品运营部'
        },
        og_list: false,
        person_list: true,
        person_page: true
    }

    onSearchChange(value) {
        this.setState({
            searchValue : value
        });
    }

    onActionClick(){
        let value = this.state.searchValue;
        console.log(value);
        this.setState({
            search_nav_data:this.state.nav_data
        });
        if(value===''){
            this.setState({
                nav_data:this.state.search_nav_data
            });
        }else{
            let res = this.state.nav_data.map(({name}) => ({ name }));
            let search_list_index = [];
            let search_list = [];
            for (var i = 0; i < res.length; i++) {  
                if(res[i].name.indexOf(value) > -1){
                    search_list_index.push(i);
                }
            }  
            for (var i = 0; i < this.state.nav_data.length; i++) {  
                if(search_list_index.indexOf(i)>-1){
                    search_list.push(this.state.nav_data[i]);
                }
            }  
            this.setState({
                nav_data:search_list
            });
            console.log(search_list);
        }
    }

    onClick(index) {
        var level = this.state.nav_level + 1;
        this.setState({
            nav_level: level
        });
        console.log('level:' + level + ',nav_level:' + this.state.nav_level);
        if (level == 0) {
            var list = ['联系人', '上海德拓信息技术股份有限公司'];
            this.setState({
                nav_list: list,
                nav_data: this.state.nav_data1
            });
            Taro.navigateTo({
                url: `/pages/index/component/personalsetting/personalsetting`
            });
        }
        else if (level == 1) {
            list = this.state.nav_list;
            list.push(this.state.nav_data[index].name);
            this.setState({
                nav_list: list,
                nav_data: this.state.nav_data2
            });
        }
        else if (level == 2) {
            list = this.state.nav_list;
            list.push(this.state.nav_data[index].name);
            this.setState({
                nav_list: list,
                nav_data: this.state.nav_data3
            });
        }
        else if (level == 3) {
            list = this.state.nav_list;
            list.push(this.state.nav_data[index].name);
            this.setState({
                nav_data: this.state.nav_data4
            });
            this.setState({
                nav_list: list,
                og_list: true,
                person_list: false,
                person_page: true
            });
        }
        else if (level == 4) {
            list = this.state.nav_list;
            list.push(this.state.nav_data[index].name);
            this.setState({
                nav_data: this.state.nav_data4
            });
            this.setState({
                nav_list: list,
                og_list: true,
                person_list: true,
                person_page: false
            });
        }
    }

    back() {
        var level = 0;
        if (this.state.nav_list.length > 0 && this.state.nav_level >= 1) {
            var list = this.state.nav_list;
            list.pop();
            level = this.state.nav_level - 1;
            this.setState({
                nav_list: list,
                nav_level: level
            });
        }
        console.log('level:' + level + ',nav_level:' + this.state.nav_level);
        if (level == 0) {
            this.setState({
                nav_data: this.state.nav_data1
            });
        }
        else if (level == 1) {
            this.setState({
                nav_data: this.state.nav_data2
            });
        }
        else if (level == 2) {
            this.setState({
                nav_data: this.state.nav_data3
            });
        }
        else if (level == 3) {
            this.setState({
                nav_data: this.state.nav_data4
            });
            this.setState({
                og_list: true,
                person_list: false,
                person_page: true
            });
        }
        else if (level == 4) {
            this.setState({
                nav_data: this.state.nav_data4
            });
            this.setState({
                og_list: true,
                person_list: true,
                person_page: false
            });
        }
    }

    turn2bumen() {
        this.back();
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
                    title='上海德拓信息技术股份有限公司'
                    leftIconType='chevron-left'
                    onClickLeftIcon={this.back.bind(this)}
                >
                    <View>添加常用应用</View>
                </AtNavBar>
                <View className="res_index-search">
                    <AtSearchBar
                        value={this.state.searchValue}
                        onChange={this.onSearchChange.bind(this)}
                        onActionClick={this.onActionClick.bind(this)}
                    />
                </View>
                <View className="res_index_nav">
                    {this.state.nav_list.map((item, index) => {
                        return <Text key={index} >{item}-</Text>
                    })}
                </View>
                <View className='res_index_app_hr'></View>
                <View className='res_index-app_content' hidden={this.state.og_list}>
                    <AtList>
                        {this.state.nav_data.map((item, index) => {
                            return <AtListItem
                                title={item.name + '(' + item.value + ')'}
                                arrow='right'
                                onClick={this.onClick.bind(this, index, 0)}
                            />
                        })}
                    </AtList>
                </View>
                <View className='res_index-app_content' hidden={this.state.person_list}>
                    <AtList>
                        {this.state.nav_data.map((item, index) => {
                            return <AtListItem
                                title={item.name}
                                arrow='right'
                                onClick={this.onClick.bind(this, index)}
                                thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
                            />
                        })}
                    </AtList>
                </View>
                <View className='res_index-app_content' hidden={this.state.person_page}>
                    <View className='res_index_personal_info' >
                        <View className='res_index_personal_info_title'>企业/组织</View>
                        <View className='res_index_personal_info_info'>{this.state.nav_data5.og}</View>
                        <hr></hr>
                    </View>
                    <View className='res_index_personal_info' >
                        <View className='res_index_personal_info_title'>姓名</View>
                        <View className='res_index_personal_info_info'>{this.state.nav_data5.name}</View>
                        <hr></hr>
                    </View>
                    <View className='res_index_personal_info' >
                        <View className='res_index_personal_info_title'>电话</View>
                        <View className='res_index_personal_info_info at-row at-row--wrap'>
                            <Text className='at-col at-col-11' >{this.state.nav_data5.phone}</Text>
                            <AtIcon value='phone' size='20'></AtIcon>
                        </View>
                        <hr></hr>
                    </View>
                    <View className='res_index_personal_info' onClick={this.turn2bumen.bind(this)}>
                        <View className='res_index_personal_info_title'>部门</View>
                        <View className='res_index_personal_info_info at-row at-row--wrap'>
                            <Text className='at-col at-col-11' >{this.state.nav_data5.part}</Text>
                            <AtIcon value='chevron-right' size='20'></AtIcon>
                        </View>
                        <hr></hr>
                    </View>
                </View>
            </View>
        );
    }
}