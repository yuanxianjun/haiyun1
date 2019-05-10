const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    lintOnSave: false,
    assetsDir: 'ysgzWeb',
    devServer: {
        open: true,
        // before: function (app, server) {
        //     app.get('/', function (req, res) {
        //         res.redirect('/IMapManagement.html');
        //     });        // }
        historyApiFallback: {
            rewrites: [
                { from: /^\/$/, to: '/ysgzIndex.html' },
                { from: /^\/personData/, to: '/personData.html' },
                { from: /^\/fireRescue/, to: '/fireRescue.html' },
                { from: /^\/ysgzIndex/, to: '/ysgzIndex.html' },
                //人员数据
                { from: /^\/personData/, to: '/personData.html' },
                //执勤值班
                { from: /^\/onduty/, to: '/onduty.html' },
                //车辆搜索
                { from: /^\/carSearch/, to: '/carSearch.html' },
                // 机构运行
                { from: /^\/operation/, to: '/operation.html' },
                { from: /./, to: '/views/404.html' }
            ]
        }
    },
    configureWebpack: config => {
        config.resolve = {
            extensions: ['.js', '.vue', '.json', ".css"],
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                '@': resolve('src'),
            }
        }
    },
    pages: {
        //首页
        'ysgzIndex': {
            entry: 'src/ysgzWeb/ysgzIndex/ysgzIndex.js',
            template: 'src/ysgzWeb/ysgzIndex/ysgzIndex.html',
            filename: 'ysgzIndex.html'
        },
        // 二级页面 => 人员数据
        'personData': {
            entry: 'src/ysgzWeb/personData/personData.js',
            template: 'src/ysgzWeb/personData/personData.html',
            filename: 'personData.html'
        },
        // 二级页面 => 火灾救援
        'fireRescue': {
            entry: 'src/ysgzWeb/fireRescue/fireRescue.js',
            template: 'src/ysgzWeb/fireRescue/fireRescue.html',
            filename: 'fireRescue.html'
        },
        // 二级页面 ——> 执勤值班
        'onduty': {
            entry: 'src/ysgzWeb/onduty/onduty.js',
            template: 'src/ysgzWeb/onduty/onduty.html',
            filename: 'onduty.html'
        },
        // 二级页面 ——> 执勤值班
        'operation': {
            entry: 'src/ysgzWeb/operation/operation.js',
            template: 'src/ysgzWeb/operation/operation.html',
            filename: 'operation.html'
        },
        // 三级页面 ——> 执勤值班
        'carSearch': {
            entry: 'src/ysgzWeb/carSearch/carSearch.js',
            template: 'src/ysgzWeb/carSearch/carSearch.html',
            filename: 'carSearch.html'
        },
        // 三级页面 ——> 人员搜索
        'searchPerson': {
            entry: 'src/ysgzWeb/searchPerson/searchPerson.js',
            template: 'src/ysgzWeb/searchPerson/searchPerson.html',
            filename: 'searchPerson.html'
        },
        // 三级页面 ——> 人员画像
        'personInfo': {
            entry: 'src/ysgzWeb/personInfo/personInfo.js',
            template: 'src/ysgzWeb/personInfo/personInfo.html',
            filename: 'personInfo.html'
        }

    }
}