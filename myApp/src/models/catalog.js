import { listFileid, listLik, list, enshrine, delEnshrine, delFile, meInfo, collectList, listCollectfile, createFromLink, renameFile } from '../service/catalog';

export default {
  namespace: 'catalog',
  state: {
    list: [
      {
        id: '1',
        title: '德拓大数据实验实训平台——韩总',
        description: '2018-09-12',
        type: 'file',
        like: true,
      },
    ],
    publicList: [],
    personalList: [],
    subList: [],
    sheetOpen: false,
    fileName: false,
    enshrineList: [],
    delEnshrinelList: [],
    delFileList: [],
    meInfoList: [],
    collectListData: [],
    display: false,
    currentName: ''
  },
  effects: {
    * createFromLink({ payload }, { call }) {
      const data = yield call(createFromLink, payload);
      return data;
    },
    * renameFile({ payload }, { call }) {
      const data = yield call(renameFile, payload);
      return data;
    },
    * listFileid({ payload }, { call }) {
      const data = yield call(listFileid, payload);
      return data;
    },
    * list({ payload }, { call, put }) {
      const data = yield call(listLik, payload);
      const { code, result } = data;
      if (code === 200) {
        yield put({
          type: 'save',
          payload: {
            publicList: result,
          },
        })
      }
      return data;
    },
    * listCollectfile({ payload }, { call, put }) {
      const data = yield call(listCollectfile, payload);
      const { code, result } = data;
      if (code === 200) {
        yield put({
          type: 'save',
          payload: {
            collectListData: result,
          },
        })
      }
      return data;
    },
    * publicSubList({ payload }, { call, put }) {
      const data = yield call(listLik, payload);
      const { code, result } = data;
      if (code === 200) {
        yield put({
          type: 'save',
          payload: {
            subList: result,
          },
        })
      }
      return data;
    },
    * personalSubList({ payload }, { call, put }) {
      const data = yield call(list, payload);
      const { code, result } = data;
      if (code === 200) {
        yield put({
          type: 'save',
          payload: {
            subList: result,
          },
        })
      }
      return data;
    },
    * personalList({ payload }, { call, put }) {
      const data = yield call(list, payload);
      const { code, result } = data;
      if (code === 200) {
        yield put({
          type: 'save',
          payload: {
            personalList: result,
          },
        })
      }
      return data;
    },
    * enshrine({ payload }, { call, put }) {
      const data = yield call(enshrine, payload);
      const { result } = data;
      if (data.msg === undefined) {
        yield put({
          type: 'save',
          payload: {
            enshrineList: result,
          },
        })
      }
      return data;
    },
    * delEnshrine({ payload }, { call, put }) {
      const data = yield call(delEnshrine, payload);
      const { result } = data;
      if (data.msg === undefined) {
        yield put({
          type: 'save',
          payload: {
            delEnshrinelList: result,
          },
        })
      }
      return data;
    },
    * delFile({ payload }, { call, put }) {
      const data = yield call(delFile, payload);
      const { result } = data;
      if (data.msg === undefined) {
        yield put({
          type: 'save',
          payload: {
            delFileList: result,
          },
        })
      }
      return data;
    },
    * meInfo({ payload }, { call, put }) {
      const data = yield call(meInfo, payload);
      const { result } = data;
      if (data.msg === undefined) {
        yield put({
          type: 'save',
          payload: {
            meInfoList: result,
          },
        })
      }
      return data;
    },
    * collectList({ payload }, { call, put }) {
      const data = yield call(collectList, payload);
      const { result } = data;
      if (data.msg === undefined) {
        yield put({
          type: 'save',
          payload: {
            collectListData: result,
          },
        })
      }
      return data;
    },
    * collectSubList({ payload }, { call, put }) {
      const data = yield call(list, payload);
      const { code, result } = data;
      if (code === 200) {
        yield put({
          type: 'save',
          payload: {
            collectListData: result,
          },
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
      }
    }
  }
}