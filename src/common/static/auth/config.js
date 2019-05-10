const API_URL = {
    index: 'http://192.168.1.25:8888/ecp',
    dev: 'http://192.168.1.22:8888/ecp',
    local: 'http://localhost:8089/ecp'
}
const HOSTNAME = window.location.hostname + (window.location.port ? ':' + window.location.port : '')
let vConsole = {}
if (HOSTNAME.indexOf('192.168.1.25') > -1) {
    module.exports = API_URL.index
} else if (HOSTNAME.indexOf('192.168.1.22') > -1) {
    module.exports = API_URL.dev
} else {
    module.exports = API_URL.local
}
