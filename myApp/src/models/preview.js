import { 
  infoList,
  commentList,
  commentSubmit,
  commentPraise,
  transCoding,
} from '../service/preview';

export default {
  namespace:'preview',
  state: {
    infoListdata: [],
    commentListdata: [],
    commentSubmitdata: [],
    commentPraisedata: [],
    PDFURL: '',
  },
  effects: {
    * infoList({ payload }, { call, put }) {
      const data = yield call(infoList, payload);
      const { result } = data;
      if (data.msg === undefined) {
        yield put({
          type: 'save',
          payload: {
            infoListdata: result,
          },
        })
      }
      return data;
    },
    * commentList({ payload }, { call, put }) {
      const data = yield call(commentList, payload);
      const { result } = data;
      if (data.msg === undefined) {
        yield put({
          type: 'save',
          payload: {
            commentListdata: result,
          },
        })
      }
      return data;
    },
    * commentSubmit({ payload }, { call, put }) {
      const data = yield call(commentSubmit, payload);
      const { result } = data;
      if (data.msg === undefined) {
        yield put({
          type: 'save',
          payload: {
            commentSubmitdata: result,
          },
        })
      }
      return data;
    },
    * commentPraise({ payload }, { call, put }) {
      const data = yield call(commentPraise, payload);
      const { result } = data;
      if (data.msg === undefined) {
        yield put({
          type: 'save',
          payload: {
            commentPraisedata: result,
          },
        })
      }
      return data;
    },

    * transCoding({payload}, {call}){
      const data = yield call(transCoding, payload);
      const { result: { process } } = data;
      return process;
    }
  },
  reducers: {
    save(state,{ payload }) {
      return {
        ...state,
        ...payload,
      }
    }
  }
}