const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    lintOnSave: false,
    assetsDir: 'battleDuty',
    devServer: {
        open: true,
        // before: function (app, server) {
        //     app.get('/', function (req, res) {
        //         res.redirect('/IMapManagement.html');
        //     });        // }
        historyApiFallback: {
            rewrites: [
                { from: /^\/$/, to: '/battleDutyIndex.html' },
                { from: /^\/onDuty/, to: '/battleDutyManagement.html' },
                { from: /^\/battleDutyManagement/, to: '/battleDutyManagement.html' },
                { from: /^\/doubleDutyIndex/, to: '/doubleDutyIndex.html' },
                { from: /^\/dutyImportant/, to: '/battleDutyManagement.html' },
                { from: /^\/dutyDetail/, to: '/battleDutyManagement.html' },
                { from: /^\/dutyImportant/, to: '/dutyImportant.html' },
                { from: /^\/createDutyImportant/, to: '/battleDutyManagement.html' },
                { from: /^\/battleDutyIndex/, to: '/battleDutyIndex.html' },
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
        'battleDutyManagement': {
            entry: 'src/battleDuty/battleDutyManagement/battleDutyManagement.js',
            template: 'src/battleDuty/battleDutyManagement/battleDutyManagement.html',
            filename: 'battleDutyManagement.html'
        },
        'battleDutyIndex': {
            entry: 'src/battleDuty/battleDutyIndex/battleDutyIndex.js',
            template: 'src/battleDuty/battleDutyIndex/battleDutyIndex.html',
            filename: 'battleDutyIndex.html'
        },
        'doubleDutyIndex': {
            entry: 'src/battleDuty/doubleDutyIndex/doubleDutyIndex.js',
            template: 'src/battleDuty/doubleDutyIndex/doubleDutyIndex.html',
            filename: 'doubleDutyIndex.html'
        }
    }
}