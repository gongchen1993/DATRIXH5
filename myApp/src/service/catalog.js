import Request from '../utils/request';

export const listFileid = data => Request({
  url: '/file/getLink',
  method: 'POST',
  data,
});

export const listLik = data => Request({
  url: '/file/listLink',
  method: 'POST',
  data,
});

export const list = data => Request({
  url: '/file/list',
  method: 'POST',
  data,
});

export const listCollectfile = data => Request({
  url: '/topic/listCollectFolder',
  method: 'POST',
  data,
});

export const logIn = data => Request({
  url: `/user/login`,
  method: 'POST',
  data,
});

export const enshrine = data => Request({
  url: `/topic/putCollectFile`,
  method: 'POST',
  data,
});

export const delEnshrine = data => Request({
  url: `/topic/removeCollectionFile`,
  method: 'POST',
  data,
});

export const delFile = data => Request({
  url: `/file/doTrash`,
  method: 'POST',
  data,
});

export const meInfo = data => Request({
  url: `/user/getUserInfo`,
  method: 'POST',
  data,
});

export const collectList = data => Request({
  url: `/topic/listCollectionFile`,
  method: 'POST',
  data,
});

export const createFromLink = data => Request({
  url: `/file/createFromLink`,
  method: 'POST',
  data,
});

export const renameFile = data => Request({
  url: `/file/rename`,
  method: 'POST',
  data,
});
