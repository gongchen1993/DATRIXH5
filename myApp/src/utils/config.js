import Taro from '@tarojs/taro';

let PORT = '';
let IP = '';

const env = process.env.NODE_ENV;
// if (env === 'development') {
//   IP = '211.144.114.26';
//   PORT = '9004';
// } else {
//   const { hostname, port } = window.location;
//   IP = hostname;
//   PORT = port;
// }
IP = '211.144.114.26';
PORT = '21980';

const HTTP = 'http://';

let HOST = `${HTTP}${IP}`;

if (window.location.port) {
  HOST = `${HTTP}${IP}:${PORT}`;
}



const ENV_TYPE = Taro.getEnv();
const SERVER = `${HOST}/api/as`;
const IMG_SERVER = `${HOST}/datrix4/asvw/read.php?fileId=`;
const HEAD_SERVER = `${HOST}/datrix4/vw/read.php?preview=avatar&userId=`
const PDF_SRVER = `${HOST}:${PORT}/pdfpreview/web/viewer.html?`;
const PUBLIC_FILEID = '4c9184f37cff01bcdc32dc486ec36961';
const QRCODE_SERVER = `${HOST}:${PORT}/pdfpreview/qrcode`;


const isClient = window.webkit && window.webkit.messageHandlers;

export default ENV_TYPE;

export {
  SERVER,
  IMG_SERVER,
  HEAD_SERVER,
  HOST,
  PDF_SRVER,
  PUBLIC_FILEID,
  IP,
  QRCODE_SERVER,
  isClient,
}
