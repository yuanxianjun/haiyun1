//引入axios
import axios from 'axios';

export default class Axios {
    /**
     *
     * @param{请求的Url} url
     * @param{如果有参数，传递params} options
     *
     */
    static http(url, options, method) {
        return new Promise((resolve, reject) => {
            axios({
                url: url,
                method: method || 'get',
                params: options,
            }).then(function (res) {
                if (res) {
                    resolve(res);
                } else {
                    reject(res.msg);
                }
            }).catch(function (err) {
                console.error('AxiosError', err);
            })
        })
    }
}