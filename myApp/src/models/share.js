import Taro from '@tarojs/taro';
import {
  getQRcodeId,
  needPwd,
  getShare,
  getShareFolder,
} from '../service/share';

export default {
  namespace:'share',
  state: {
    shareId: '',
    shareList: [],
    ifPwd: false,
    auth: null,
  },
  effects: {
    * getId({ payload }, { call, put }){
      const data = yield call(getQRcodeId, payload);
      const { result, code } = data;
      if(code === 200){
        yield put({
          type: 'save',
          payload:{
            shareId:result,
          }
        })
      }
    },

    * needPwd({ payload }, { call, put }){
      const data = yield call(needPwd, payload);
      const { code, flag } = data;
      if(code === 200){
        yield put({
          type: 'save',
          payload:{
            // shareList: result,
            ifPwd: flag,
          }
        })
      }
    },

    * getShare({ payload }, { call, put }){
      const data = yield call(getShare, payload);
      const { code, result } = data;
      if(code === 200 && result) {
        const { file_info, auth } = result;
        Taro.setStorageSync('auth', auth);
        yield put({
          type: 'save',
          payload: {
            shareList: file_info,
          }
        })
      }
    },

    * getShareFoldeList({payload}, {call, put}){
      const data = yield call(getShareFolder, payload);
      const { code, result } = data;
      if(code === 200 && result){
        const { file_info } = result;
        let shareList = result;
        if(file_info){
          shareList = file_info;
        }
        yield put({
          type: 'save',
          payload: {
            shareList,
          }
        })
      }
      return data;
    }
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  }
}
