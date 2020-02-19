import Request from '../utils/request';

export const getQRcodeId = data => Request({
  url: '/share/shareFiles',
  method: 'POST',
  data,
})

export const needPwd = data => Request({
  url: '/share/needPwd',
  method: 'POST',
  data,
})

export const getShare = data => Request({
  url: '/share/getShare',
  method: 'POST',
  data,
})


export const getShareFolder = data => Request({
  url: '/share/shareFoledeList',
  method: 'POST',
  data,
})