import Taro from '@tarojs/taro';
import { SERVER } from './config';

export default (options = { method: 'GET', data: {} }) => {
  const { data:bodyData={} } = options;
  const { loginIp } = bodyData;
  const requestData = {
    ...bodyData,
  }
  
  let requestHeader = {};
  if (options.url !== '/user/login') {
    requestHeader = {
      'access-token': Taro.getStorageSync('token'),
    }
  }
  let serverHost = SERVER;
  if(loginIp){
    serverHost = `http://${loginIp}/api/as`;
  }
 
  return Taro.request({
    url: `${serverHost}${options.url}`,
    data: JSON.stringify(requestData),
    header: {
      'Content-Type': 'application/json',
      ...requestHeader,
    },
    method: options.method.toUpperCase(),
  }).then((res) => {
    const { statusCode, data } = res;
    if (statusCode >= 200 && statusCode < 300) {
      if (data.code === 401) {
        Taro.navigateTo({
          url: `/pages/login/index`,
        })
        Taro.removeStorageSync('token');
        Taro.removeStorageSync('root_ids');
        Taro.removeStorageSync('user_id');
        Taro.removeStorageSync('sunUrl');
        Taro.removeStorageSync('review');
      }
      return data;
    } else {
      Taro.removeStorageSync('token');
      Taro.removeStorageSync('root_ids');
      Taro.removeStorageSync('user_id');
      Taro.removeStorageSync('sunUrl');
      Taro.removeStorageSync('review');
      Taro.navigateTo({
        url: `/pages/login/index`,
      })
      throw new Error(`网络请求错误，状态码${statusCode}`);
    }
  })
}
