import Taro from '@tarojs/taro';
import Request from '../utils/request';

export const infoList = data => Request({
  url: '/file/info',
  method: 'POST',
  data,
});

export const commentList = data => Request({
  url: `/comment/listComments`,
  method: 'POST',
  data,
});

export const commentSubmit = data => Request({
  url: `/comment/comment`,
  method: 'POST',
  data,
});

export const commentPraise = data => Request({
  url: `/comment/praise`,
  method: 'POST',
  data,
});

export const transCoding = data => Request({
  url: '/media/convertDetail',
  method: 'POST',
  data,
})