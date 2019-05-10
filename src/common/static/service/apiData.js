import Axios from '../auth/requestType'
import { hosts } from './apiUrl'
// 获取H5配置
const test = options => {
    return Axios.http(hosts.test, options, 'get')
}
const home = options => {
    return Axios.http(hosts.home, options, 'get')
}
export {
    test,
    home,
}