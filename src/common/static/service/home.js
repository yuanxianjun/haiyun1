import HOSTNAME from '../auth/config';
import Axios from '../auth/requestType'
const hosts = {
    home: HOSTNAME + '/car/selectByPage',
    home2: HOSTNAME + '/car/selectByPage/sds',
    home3: HOSTNAME + '/car/selectByPage',
};

// 获取H5配置
const test = options => {
    return Axios.http(hosts.test, options, 'get')
}
const home = options => {
    return Axios.http(hosts.home, options, 'get')
}
export {
    home,
}


