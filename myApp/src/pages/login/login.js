/* eslint-disable react/sort-comp */
import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import md5 from 'js-md5'
import { AtForm, AtInput, AtButton, AtCheckbox } from 'taro-ui';
import { connect } from '@tarojs/redux';
import './login.scss';
import logo from '../../images/logo.svg';
import TYPE_ENV from '../../utils/config.js';


@connect(({ login }) => ({
  login,
}))
class Index extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      loginId: '',
      password: '',
      loginIp: '',
      checkedList: [],
      indexURL: '/pages/index/index',
    }
  }

  static options = {
    addGlobalClass: true
  }

  config = {
    navigationBarTitleText: '首页'
  }


  componentWillMount() { }

  componentDidMount() {
    this.self_InitHost();
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  handleCheckCookie() {
    const { checkedList } = this.state;
    const length = checkedList.length;
    if (length !== 0) {
      return true;
    } else {
      return false;
    }
  }

  handleChangeLoginId(value) {
    this.setState({
      loginId: value,
      password: '',
      checkedList: [],
    })
  }

  handleChangeLoginIp(value) {
    Taro.setStorageSync('host', value);
    this.setState({
      loginIp: value,
      loginId: '',
      password: '',
      checkedList: [],
    })
  }

  handleChangePassword(value) {
    this.setState({
      password: value,
      checkedList: [],
    })
  }


  handleToIndex = () => {
    const { dispatch } = this.props;
    const { loginId, password, loginIp, indexURL: url } = this.state;
    if (!loginId) {
      this.showToast('没有输入用户名');
      return;
    }
    if (!password) {
      this.showToast('没有输入密码');
      return;
    }
    const electrloReturnURL = this.self_ConnectIndexHost({ loginId, loginIp, password });
    if (process.env.toElectrol) {
      this.self_ElectrolToIndex({ dispatch, loginId, password, url: electrloReturnURL, loginIp });
    } else {
      this.self_NormalToIndex({ dispatch, loginId, password, url });
    }
  }



  self_ElectrolToIndex({ dispatch, loginId, password, url, loginIp }) {
    const promise = this.self_LaunchLoginClient({ dispatch, loginId, password, loginIp });
    promise.then((s) => {
      if (s.msg === undefined) {
        const host = url;
        window.location = host;
      } else {
        this.showToast(s.msg);
      }
    })
  }

  self_NormalToIndex({ dispatch, loginId, password, url }) {
    const promise = this.self_LaunchLogin({ dispatch, loginId, password });
    promise.then((s) => {
      if (s.msg === undefined) {
        const { result } = s;
        this.self_SetLocalStorage(result);
        Taro.navigateTo({
          url,
        });
      } else {
        this.showToast(s.msg);
      }
    });
  }


  /**
   *
   * @description 客户端登陆成功后返回的地址，地址是构建好，放到服务器的地址
   */
  self_ConnectIndexHost({ loginIp, loginId, password }) {
    // console.log(loginIp);
    const host = `http://${loginIp}/mobile/#/pages/index/index?loginId=${loginId}&password=${password}`;
    return host;
  }



  self_LaunchLogin({ loginId, password, dispatch }) {
    const promise = dispatch({
      type: 'login/logIn',
      payload: {
        loginId,
        password: md5(password),
        from: 0,
      }
    })
    return promise;
  }

  self_LaunchLoginClient({ loginId, password, dispatch, loginIp }) {
    const promise = dispatch({
      type: 'login/logIn',
      payload: {
        loginId,
        password: md5(password),
        loginIp,
        from: 0,
      }
    })
    return promise;
  }

  self_SetLocalStorage(result) {
    Taro.setStorageSync('root_ids', result.info.root_ids);
    Taro.setStorageSync('token', result.token);
    Taro.setStorageSync('user_id', result.info.id);
    Taro.removeStorageSync('review');
  }


  handleChangeCheckbox = async (value) => {
    const { password, loginId, loginIp } = this.state;
    if (!loginId) {
      this.showToast('没有输入用户名');
      return;
    }
    if (!password) {
      this.showToast('没有输入密码');
      return;
    }

    await this.setState({
      checkedList: value
    })
    const isRemeber = this.handleCheckCookie();
    if (isRemeber) {
      Taro.setStorageSync('user', loginId);
      Taro.setStorageSync('password', password);
      Taro.setStorageSync('host', loginIp);
      // setCookie('user', loginId, 1);
      // setCookie('password', password, 1);
    } else {
      Taro.setStorageSync('user', '');
      // Taro.setStorageSync('host','');
      Taro.setStorageSync('password', '');
    }
  }

  handleIfAutoLogin = () => {
    const { toElectrol } = this.state;
    if (toElectrol) {
      return;
    } else {
      const password = Taro.getStorageSync('password');
      const token = Taro.getStorageSync('token');
      if (token && password) {
        Taro.navigateBack();
      }
    }
  }

  self_InitHost = () => {
    const host = Taro.getStorageSync('host') || '';
    const user = Taro.getStorageSync('user') || '';
    const password = Taro.getStorageSync('password') || '';
    this.setState({
      loginIp: host,
      loginId: user,
      password,
    })
    const ifHasCookie = this.self_IfHasCookie({ user, password });
    if (ifHasCookie) {
      this.setState({
        checkedList: ['login']
      })
    }
  }

  self_IfHasCookie({ user, password }) {
    return (user && password) ? true : false;
  }

  showToast(text) {
    Taro.showToast({
      title: text,
      icon: 'none',
    });
  }

  onSubmit(event) {
    console.log(event)
  }
  onReset(event) {
    console.log(event)
  }

  render() {
    const isRN = TYPE_ENV === 'RN';
    const toElectrol = process.env.toElectrol;
    const checkboxOption = [{
      value: 'login',
      label: '记住密码'
    }]
    const { loginIp } = this.state;


    return (
      <View className='loginContainer'>
        {isRN
          ? (
            <View>
              RN UI  is  comming
          </View>
          )
          : (
            <AtForm
              onSubmit={this.onSubmit.bind(this)}
              onReset={this.onReset.bind(this)}
              className='formContainer'
            >
              <View className='login-logo'>
                <Image
                  style='width: 50px;height: 50px;'
                  src={logo}
                />
                <View className='imgSubTitle'>DATRIX</View>
              </View>
              {toElectrol ?
                (<View className='electrlo'>
                  <AtInput
                    name='ip'
                    placeholder='IP'
                    className='ipcontainer inputContainer'
                    value={loginIp}
                    onChange={this.handleChangeLoginIp.bind(this)}
                  />
                  <AtInput
                    name='name'
                    placeholder='Name'
                    className='useercontainer inputContainer'
                    value={this.state.loginId}
                    onChange={this.handleChangeLoginId.bind(this)}
                  />
                  <AtInput
                    name='value'
                    type='password'
                    placeholder='Password'
                    className='passwordcontainer inputContainer'
                    value={this.state.password}
                    onChange={this.handleChangePassword.bind(this)}
                  />
                  <AtCheckbox
                    options={checkboxOption}
                    selectedList={this.state.checkedList}
                    onChange={this.handleChangeCheckbox.bind(this)}
                  />
                </View>) : (
                  <View className='native'>
                    <AtInput
                      name='name'
                      placeholder='Name'
                      className='useercontainer inputContainer  test1'
                      type='text'
                      value={this.state.loginId}
                      onChange={this.handleChangeLoginId.bind(this)}
                    />
                    <AtInput
                      name='value'
                      type='password'
                      placeholder='Password'
                      className='passwordcontainer inputContainer test2'
                      value={this.state.password}
                      onChange={this.handleChangePassword.bind(this)}
                    />
                    <AtCheckbox
                      options={checkboxOption}
                      selectedList={this.state.checkedList}
                      onChange={this.handleChangeCheckbox.bind(this)}
                    />
                  </View>
                )
              }
              <AtButton className='submitBtn' formType='submit' type='primary' onClick={this.handleToIndex.bind(this)}>登录</AtButton>
            </AtForm>
          )
        }
      </View>
    )
  }
}
export default Index;
