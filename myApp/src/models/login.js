import Taro from '@tarojs/taro';
import { 
  logIn,
  signOut,
} from '../service/login';

export default {
  namespace:'login',
  state: {
    loginData: [],
  },
  effects: {
    * logIn ({ payload }, { call, put }) {
      const data = yield call(logIn, payload);
      if (data.msg === undefined) {
        yield put({
          type: 'save',
          payload: {
            loginData: data,
          },
        });
      }
      return data;
    },
    
    * signOut ({ payload }, { call }) {
      const data = yield call(signOut, payload);
      return data;
    }
  },
  reducers: {
    save (state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  }
}