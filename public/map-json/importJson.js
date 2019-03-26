const files = require.context('.', true, /\.json$/)
let cityMap = {
    '中国': 'zhongguo',
    '上海': 'shanghai',
    '河北': 'hebei',
    '山西': 'shanxi1',
    '内蒙古': 'neimenggu',
    '辽宁': 'liaoning',
    '吉林': 'jilin',
    '黑龙江': 'heilongjiang',
    '江苏': 'jiangsu',
    '浙江': 'zhejiang',
    '安徽': 'anhui',
    '福建': 'fujian',
    '江西': 'jiangxi',
    '山东': 'shandong',
    '河南': 'henan',
    '湖北': 'hubei',
    '湖南': 'hunan',
    '广东': 'guangdong',
    '广西': 'guangxi',
    '海南': 'hainan',
    '四川': 'sichuan',
    '贵州': 'guizhou',
    '云南': 'yunnan',
    '西藏': 'xizang',
    '陕西': 'shanxi',
    '甘肃': 'gansu',
    '青海': 'qinghai',
    '宁夏': 'ningxia',
    '新疆': 'xinjiang',
    '北京': 'beijing',
    '天津': 'tianjin',
    '重庆': 'chongqing',
    '香港': 'xianggang',
    '澳门': 'aomen'
};
let arrs = Object.entries(cityMap)
let map = new Map()
files.keys().forEach( file => {
	for(let [key, value] of arrs) {
		if(file.includes(value)) map.set(key,files(file))
	}
})
let turnMapToObject = strMap => {
  let obj = Object.create(null);
  for (let [k,v] of strMap) {
    obj[k] = v;
  }
  return obj;
}
let result = turnMapToObject(map)

export default result