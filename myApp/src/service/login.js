import Request from '../utils/request';
// import {SERVER} from '../utils/config';

// console.log(SERVER);
// export default function logIn11(data) {
//   return Request({
//     url: `${SERVER}/user/login`,
//     method: 'POST',
//     data,
//   });
// }
export const logIn = data => Request({
  url: `/user/login`,
  method: 'POST',
  data,
});

export const signOut = data => Request({
  url: `/user/signOut`,
  method: 'POST',
  data,
});