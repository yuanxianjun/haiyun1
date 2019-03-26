<template>
    <div id="battleDutyIndex">
        <div class="topHeader">
            <div class="logo">
                <img src="./assets/logo.png" alt="">
            </div>
            <div class="weather">
                <div class="sweater-box">
                    <p class="sweater">
                        <template v-if="weather">
                            {{weather.date.split('实时：')[1].split(")")[0]}} | {{weather.weather}} | {{weather.wind}}
                        </template>
                        <template v-else>
                            0℃ | 晴 | 无风
                        </template>
                    </p>
                    <p class="time">
                        {{curTime}}
                    </p>
                </div>
            </div>
        </div>
        <div class="content-wrapper" :gutter="20">
            <div class="content-left">
                <div>
                    <div class="title">值班要情</div>
                    <div class="news-box">
                        <div class="news">
                            <li v-for="(item,idx) in newsList" :key="idx">
                                {{idx+1}}. {{item.title.length > 20 ? item.title.substring(0,19)+'...':item.title}}
                            </li>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="title">备勤值班</div>
                    <div class="prepareDuty">
                        <div class="item" v-for="item in prepareList">
                            <img :src="item.url" width="52" height="52" alt="">
                            <div class="info">
                                <p class="p1"><span>{{item.name}}</span><span>{{item.phone}}</span></p>
                                <p class="p2"><span>职务:</span><span>{{item.workPositionName}}</span></p>
                                <p class="p3"><span>备勤职务:</span><span>{{item.positionName}}</span></p>
                            </div>
                        </div>
                        <div class="item" v-for="item in prepareList">
                            <img :src="item.url" width="52" height="52" alt="">
                            <div class="info">
                                <p class="p1"><span>{{item.name}}</span><span>{{item.phone}}</span></p>
                                <p class="p2"><span>职务:</span><span>{{item.workPositionName}}</span></p>
                                <p class="p3"><span>备勤职务:</span><span>{{item.positionName}}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="title circle-title">消防实力</div>
                    <div class="circle-box">
                        <div 
                            class="circle-item" 
                            v-for="(item,idx) in fireFighting" 
                            :class="{clearMargin: (idx + 1) % 3 == 0,marginBottom: idx < 3}">
                            <vue-circle
                                :progress="item[1]"
                                :size="60"
                                :reverse="false"
                                line-cap="round"
                                :fill="fill"
                                empty-fill="rgba(255,255,255, .8)"
                                :animation-start-value="0.0"
                                :start-angle="0"
                                insert-mode="append"
                                :thickness="5"
                                :show-percent="false"
                                >
                                  <p>{{item[1]}}</p>
                            </vue-circle>
                            <p v-if="item[0] == 'zhidui'">支队</p>
                            <p v-if="item[0] == 'dadui'">大队</p>
                            <p v-if="item[0] == 'zhongdui'">中队</p>
                            <p v-if="item[0] == 'police'">警力</p>
                            <p v-if="item[0] == 'car'">车辆</p>
                            <p v-if="item[0] == 'drug'">药剂</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content-middle">
                <div class="today-info">
                    <div class="item">
                        <img src="./assets/execute.png" alt="">
                        <div>
                            <p>今日执勤</p>
                            <p>{{todayData.todayperson}}<span>人</span></p>
                        </div>
                    </div>
                    <div class="item">
                        <img src="./assets/car.png" alt="">
                        <div>
                            <p>今日车辆</p>
                            <p>{{todayData.todaycar}}<span>辆</span></p>
                        </div>
                    </div>
                    <div class="item">
                        <img src="./assets/warning.png" alt="">
                        <div>
                            <p>今日警情</p>
                            <p>{{todayData.todayemergency}}<span>条</span></p>
                        </div>
                    </div>
                    <div class="item">
                        <img src="./assets/check.png" alt="">
                        <div>
                            <p>今日检查</p>
                            <p>{{todayData.todayperson}}<span>个</span></p>
                        </div>
                    </div>
                </div>
                <div class="chart-wrapper">
                    <div id="myChart"></div>
                </div>
                <div class="table-wrapper">
                    <div class="table-header">
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>报警类型</th>
                                    <th>报警时间</th>
                                    <th>地点</th>
                                    <th>定位</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <div class="table-content">
                        <table>
                            <tbody>
                                <tr v-for="(item,idx) in mapData">
                                    <td>
                                        <img v-if="item.emergencyType == 'outfire'" src="./assets/fire.png" alt="">
                                        <img v-if="item.emergencyType == 'help'" src="./assets/social.png" alt="">
                                        <img v-if="item.emergencyType == 'rescue'" src="./assets/help.png" alt="">
                                        <img v-if="item.emergencyType == 'duty'" src="./assets/job.png" alt="">
                                    </td>
                                    <td>{{item.emergencyTypeName}}</td>
                                    <td>{{item.createTime}}</td>
                                    <td class="site">{{item.address}}</td>
                                    <td style="cursor: pointer;" @click="jumpTo(item.id)"><img src="./assets/gps.png" alt=""></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="content-right">
                <div>
                    <div class="title">警情信息</div>
                    <div id="warningInfo" class="chart-box" style="width: 100%;"></div>
                </div>
                <div>
                    <div class="title">重点单位</div>
                    <div id="keyUnit" class="chart-box" style="width: 100%;"></div>
                </div>
                <div>
                    <div class="title">火灾原因</div>
                    <div id="fireReson" class="chart-box" style="width: 100%;"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import vueCircle from 'vue2-circle-progress'
    import echarts from 'echarts'
    import mapJson from "../../../public/map-json/importJson";
    import stomp from 'stompjs'
    export default {
        name: 'battleDutyIndex',
        data() {
            return {
                activeIndex: 0,
                intnum: null,
                newsList: [], // 值班要情Arr
                todayData: {}, // 今日执勤&今日车辆
                keyUnitName: [], // 重点单位名称
                keyUnitValue: [], // 重点单位数据
                coordinates: [],
                mapData: [],
                fireFighting: [],
                prepareList: [], // 备勤值班Arr
                weather: null,
                curTime:'',
                currCityName:'',
                warningChart: null,
                keyUnitChart: null,
                fireResonChart: null,
                chinaMapChart: null,
                fill : { gradient: ["red", "green", "blue"] }, // vue-circle颜色填充
            }
        },
        created() {
            // 值班要情
            this.axios.get('/ecp/dutyShow/selectDutyPoint').then( res => {
                const { status, data } = res
                const { result } = data
                if(status == 200 && result.length) this.newsList = result;
            })
            // 备情值班
            this.axios.get('/ecp/dutyShow/selectDutyPerson').then( res => {
                const { status, data } = res
                const { result } = data
                if(status == 200 && result.length) this.prepareList = result;
            })
            // 消防实力
            this.axios.get('/ecp/dutyShow/selectPower').then( res => {
                const { status, data } = res
                const { result } = data
                if(status == 200 && result) {
                    this.fireFighting = Object.entries(result)
                }
            })
            // 今日车辆等数据
            this.axios.get('/ecp/dutyShow/selectEmergencyCount').then( res => {
                const { status, data } = res
                const { result } = data
                if(status == 200 && result) this.todayData = result
                this.renerWaringInfo()
                this.fireReson()
            })
            // 重点单位
            this.axios.get('/ecp/dutyShow/selectImportant').then( res => {
                const { status, data } = res
                const { result } = data
                const { name, num } = result
                for(let key of name) {
                    this.keyUnitName.push({
                        name: key
                    })
                }
                this.keyUnitValue = num;
                this.renderKeyUnit()
            })
            // 中间地图和表格
            this.axios.get('/ecp/dutyShow/selectMapdata').then( res => {
                const { status, data } = res
                const { result } = data
                const { emergency, coordinate } = result
                if(status == 200 && emergency.length) {
                    this.mapData = emergency
                    this.coordinates = coordinate
                }
                let mapJsonUrl = `${this.baseUrl}/map-json/zhongguo.json`;
                this.renderMap(mapJsonUrl)
            })
            
            this.connectData();
            this.getCurrentCity();
            this.getCurrTime();
        },
        mounted() {
            window.addEventListener("resize", () => { 
                this.keyUnitChart.resize();  
                this.fireResonChart.resize();  
                this.chinaMapChart.resize();  
            });
        },
        methods: {
            getRowClass(row,rowIndex) {
                return 'clearBgColor'
            },
            /**
             * 点击跳转到警情动态页面
             * @method jumpTo
             * @param {id} 跳转id数据
             */
            jumpTo(id) {
                window.location.href=`${this.baseUrl}/Dynamic/Dynamic.html?emergencyId=${id}`;
            },
            renderMap(url) {
                this.axios.get(url).then( res => {
                    echarts.registerMap('中国', res.data);
                    let myChart = this.extendsMap(echarts,'myChart', {
                        bgColor: 'transparent', // 画布背景色
                        mapName: '中国', // 地图名
                        text:'',
                        goDown: false, // 是否下钻
                        // 下钻回调
                        callback: function(name, option, instance) {
                        },
                        // 数据展示             
                        data: this.mapData
                    });
                })
            },
            extendsMap(echarts,id, opt) {
                let that = this
                // 实例
                that.chinaMapChart = echarts.init(document.getElementById(id));

                let curGeoJson = {};
                let cityMap = mapJson
                let geoCoordMap = this.coordinates
                
                let levelColorMap = {
                    'outfire': 'rgba(241, 109, 115, .8)',
                    'help': 'rgba(255, 235, 59, .7)',
                    'rescue': 'rgba(147, 235, 248, 1)',
                    'duty': 'rgba(75, 125, 126, 12)'
                };

                let defaultOpt = {
                    mapName: 'china', // 地图展示
                    goDown: false, // 是否下钻
                    bgColor: '#090918', // 画布背景色
                    activeArea: [], // 区域高亮,同echarts配置项
                    data: [],
                    // 下钻回调(点击的地图名、实例对象option、实例对象)
                    callback: function(name, option, instance) {}
                };
                if (opt) opt = echarts.util.extend(defaultOpt, opt);

                // 层级索引
                let name = [opt.mapName];
                let idx = 0;
                let pos = {
                    leftPlus: 40,
                    leftCur: 40,
                    left: 40,
                    top: 40
                };

                let line = [
                    [0, 0],
                    [8, 11],
                    [0, 22]
                ];
                // style
                let style = {
                    font: '18px "Microsoft YaHei", sans-serif',
                    textColor: '#eee',
                    lineColor: 'rgba(147, 235, 248, .8)'
                };

                let handleEvents = {
                    /**
                    * i 实例对象
                    * o option
                    * n 地图名
                    **/
                    resetOption: function(i, o, n) {
                        let breadcrumb = this.createBreadcrumb(n);
                        let j = name.indexOf(n);
                        let l = o.graphic.length;
                        if (j < 0) {
                            o.graphic.push(breadcrumb);
                            o.graphic[0].children[0].shape.x2 = 145;
                            o.graphic[0].children[1].shape.x2 = 145;
                            if (o.graphic.length > 2) {
                                let cityData = [];
                                let cityJson;
                                if(cityData!=null){
                                    o.series[0].data = handleEvents.initSeriesData(cityData);
                                }else{
                                    o.series[0].data = [];
                                }
                                
                                
                            }
                            name.push(n);
                            idx++;
                        } else {
                            o.graphic.splice(j + 2, l);
                            if (o.graphic.length <= 2) {
                                o.graphic[0].children[0].shape.x2 = 60;
                                o.graphic[0].children[1].shape.x2 = 60;
                                o.series[0].data = handleEvents.initSeriesData(opt.data);
                            };
                            name.splice(j + 1, l);
                            idx = j;
                            pos.leftCur -= pos.leftPlus * (l - j - 1);
                        };

                        o.geo.map = n;
                        o.geo.zoom = 1;
                        i.clear();
                        i.setOption(o);
                        opt.callback(n, o, i);
                    },

                    /**
                    * name 地图名
                    **/
                    createBreadcrumb: function(name) {
                        let cityToPinyin = {
                            '中国': 'zhongguo',
                            '上海': 'shanghai',
                            '河北': 'hebei',
                            '山西': 'shanxi',
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
                            '陕西': 'shanxi1',
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
                        let breadcrumb = {
                            type: 'group',
                            id: name,
                            left: pos.leftCur + pos.leftPlus,
                            top: pos.top + 3,
                            children: [{
                                type: 'polyline',
                                left: -90,
                                top: -5,
                                shape: {
                                    points: line
                                },
                                style: {
                                    stroke: '#fff',
                                    key: name
                                },
                                onclick: function() {
                                    let name = this.style.key;
                                    handleEvents.resetOption(chart, option, name);
                                }
                            }, {
                                type: 'text',
                                left: -68,
                                top: 'middle',
                                style: {
                                    text: name,
                                    textAlign: 'center',
                                    fill: style.textColor,
                                    font: style.font
                                },
                                onclick: function() {
                                    let name = this.style.text;
                                    handleEvents.resetOption(chart, option, name);
                                }
                            }, {
                                type: 'text',
                                left: -68,
                                top: 10,
                                style: {

                                    name: name,
                                    text: cityToPinyin[name] ? cityToPinyin[name].toUpperCase() : '',
                                    textAlign: 'center',
                                    fill: style.textColor,
                                    font: '12px "Microsoft YaHei", sans-serif',
                                },
                                onclick: function() {
                                    let name = this.style.name;
                                    handleEvents.resetOption(chart, option, name);
                                }
                            }]
                        }

                        pos.leftCur += pos.leftPlus;

                        return breadcrumb;
                    },

                // 设置effectscatter
                    initSeriesData: function(data) {
                        let temp = [];
                        for (let i = 0; i < data.length; i++) {
                             let geoCoord = geoCoordMap[data[i].name];
                            temp.push({
                                city:data[i].city,
                                createTime: data[i].createTime,
                                emergencyTypeName: data[i].emergencyTypeName,
                                value: geoCoord.concat(data[i].value,data[i].emergencyType),
                            });
                        };
                        return temp;
                    },
                    zoomAnimation: function() {
                        let count = null;
                        let zoom = function(per) {
                            if (!count) count = per;
                            count = count + per;
                            // console.log(per,count);
                            that.chinaMapChart.setOption({
                                geo: {
                                    zoom: count
                                }
                            });
                            if (count < 1) window.requestAnimationFrame(function() {
                                zoom(0.2);
                            });
                        };
                        window.requestAnimationFrame(function() {
                            zoom(0.2);
                        });
                    }
                };

                let option = {
                    backgroundColor: opt.bgColor,
                    tooltip: {
                        show: true,
                        trigger:'item',
                        alwaysShowContent:false,
                        backgroundColor:'rgba(50,50,50,0.7)',
                        hideDelay:100,
                        triggerOn:'mousemove',
                        enterable:true,
                        position:['60%','70%'],
                        formatter(params, ticket, callback){
                            return '报警时间:'+params.data.createTime+'<br/>'+'地点:'+params.data.city
                        }
                    },
                    graphic: [{
                        type: 'group',
                        left: pos.left,
                        top: pos.top - 4,
                        children: [{
                            type: 'line',
                            left: 0,
                            top: -20,
                            shape: {
                                x1: 0,
                                y1: 0,
                                x2: 60,
                                y2: 0
                            },
                            style: {
                                stroke: style.lineColor,
                            }
                        }, {
                            type: 'line',
                            left: 0,
                            top: 20,
                            shape: {
                                x1: 0,
                                y1: 0,
                                x2: 60,
                                y2: 0
                            },
                            style: {
                                stroke: style.lineColor,
                            }
                        }]
                    }, 
                    {
                        id: name[idx],
                        type: 'group',
                        left: pos.left + 2,
                        top: pos.top,
                        children: [{
                            type: 'polyline',
                            left: 90,
                            top: -12,
                            shape: {
                                points: line
                            },
                            style: {
                                stroke: 'transparent',
                                key: name[0]
                            },
                            onclick: function() {
                                let name = this.style.key;
                                handleEvents.resetOption(chart, option, name);
                            }
                        }, {
                            type: 'text',
                            left: 0,
                            top: 'middle',
                            style: {
                                text: '中国',
                                textAlign: 'center',
                                fill: style.textColor,
                                font: style.font
                            },
                            onclick: function() {
                                handleEvents.resetOption(chart, option, '中国');
                            }
                        }, {
                            type: 'text',
                            left: 0,
                            top: 10,
                            style: {
                                text: 'China',
                                textAlign: 'center',
                                fill: style.textColor,
                                font: '12px "Microsoft YaHei", sans-serif',
                            },
                            onclick: function() {
                                handleEvents.resetOption(chart, option, '中国');
                            }
                        }]
                    }],
                    geo: {
                        map: opt.mapName,
                        roam: true,
                        zoom: 1.2,
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#fff'
                                }
                            },
                            emphasis: {
                                textStyle: {
                                    color: '#fff'
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                borderColor: 'rgba(147, 235, 248, 1)',
                                borderWidth: 1,
                                areaColor: {
                                    type: 'radial',
                                    x: 0.5,
                                    y: 0.5,
                                    r: 0.8,
                                    colorStops: [{
                                        offset: 0,
                                        color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
                                    }, {
                                        offset: 1,
                                        color: 'rgba(147, 235, 248, .2)' // 100% 处的颜色
                                    }],
                                    globalCoord: false // 缺省为 false
                                },
                                shadowColor: 'rgba(128, 217, 248, 1)',
                                // shadowColor: 'rgba(255, 255, 255, 1)',
                                shadowOffsetX: -2,
                                shadowOffsetY: 2,
                                shadowBlur: 10
                            },
                            emphasis: {
                                areaColor: '#389BB7',
                                borderWidth: 0
                            }
                        },
                        regions: opt.activeArea.map(function(item) {
                            if (typeof item !== 'string') {
                                return {
                                    name: item.name,
                                    itemStyle: {
                                        normal: {
                                            areaColor: item.areaColor || '#389BB7'
                                        }
                                    },
                                    label: {
                                        normal: {
                                            show: item.showLabel,
                                            textStyle: {
                                                color: '#fff'
                                            }
                                        }
                                    }
                                }
                            } else {
                                return {
                                    name: item,
                                    itemStyle: {
                                        normal: {
                                            borderColor: 'red',
                                            areaColor: '#389BB7'
                                        }
                                    }
                                }
                            }
                        })
                    },
                    series: [{
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        showEffectOn: 'render',
                        rippleEffect: {
                            period:15,
                            scale: 4,
                            brushType: 'fill'
                        },
                        hoverAnimation: true,
                        itemStyle: {
                            normal: {
                               color: function(params){
                                   return levelColorMap[params.value[3]];
                                },
                                shadowBlur: 10,
                                shadowColor: '#333'
                            }
                        },
                        data: handleEvents.initSeriesData(opt.data)
                    }]
                };

                that.chinaMapChart.setOption(option);
                // 添加事件
                that.chinaMapChart.on('click', function(params) {
                    let _self = this;
                    if (opt.goDown && params.name !== name[idx]) {
                        if (cityMap[params.name]) {
                            let url = cityMap[params.name];
                            debugger;
                            $.get(url, function(response) {
                                //console.log(response);
                                curGeoJson = response;
                                echarts.registerMap(params.name, response);
                                handleEvents.resetOption(_self, option, params.name);
                            });
                        }
                    }
                });

                that.chinaMapChart.setMap = function(mapName) {
                    let _self = this;
                    if (mapName.indexOf('市') < 0) mapName = mapName + '市';
                    let citySource = cityMap[mapName];
                    if (citySource) {
                        let url = './map/' + citySource + '.json';
                        $.get(url, function(response) {
                            // console.log(response);
                            curGeoJson = response;
                            echarts.registerMap(mapName, response);
                            handleEvents.resetOption(_self, option, mapName);
                        });
                    }
                };
                return that.chinaMapChart;
            },
            // 警情信息
            renerWaringInfo(){
                this.warningChart = echarts.init(document.getElementById('warningInfo'));
                let option = {
                    color:['#43d3ff'],
                    grid: {
                        top: '1%',
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value',
                        show:false,
                        boundaryGap: [0, 0.01]
                    },
                    yAxis: {
                        type: 'category',
                        // y轴的字体样式
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        axisLine:{
                            show:false,
                        },
                        data: ['公务执勤','抢险救援','社会求助','火灾扑救']
                    },
                    series: [
                        {
                            type: 'bar',
                            barWidth:'10px',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'right'
                                }
                            },
                            data: [this.todayData.duty, this.todayData.rescue, this.todayData.help, this.todayData.outfire],
                            itemStyle: {
                            //柱形图圆角，鼠标移上去效果，如果只是一个数字则说明四个参数全部设置为那么多
                            emphasis: {
                                barBorderRadius: 30
                            },

                            normal: {
                                //柱形图圆角，初始化效果
                                barBorderRadius:[20, 20, 20, 20],
                                label: {
                                    show: true,//是否展示
                                    textStyle: {
                                        color:'#fff',
                                        width:'10px',
                                        fontWeight:'bolder',
                                        fontSize : '14',
                                        fontFamily : '微软雅黑',
                                    }
                                }
                            }
                        },
                            markLine: {
                                symbol: ['none', 'none'],//去掉箭头
                                itemStyle: {
                                    normal: {
                                        lineStyle: { 
                                            type: 'solid', color:'#43d3ff'
                                    },
                                    label: { 
                                        show: true, position:'left' 
                                        } 
                                    }
                                },
                            }
                        }
                    ]
                };
                this.warningChart.setOption(option);
            },
            // 重点单位
            renderKeyUnit() {
                this.keyUnitChart = echarts.init(document.getElementById('keyUnit'));
                let option = {
                    title: {
                    },
                    tooltip: {},
                    radar: {
                        name: {
                            textStyle: {
                                color: '#fff',
                                fontSize: '14',
                                borderRadius: 3,
                                padding: [6, 5, 3, 5]
                           }
                        },
                        indicator: this.keyUnitName
                    },
                    series: [{
                        name: '重点单位',
                        type: 'radar',
                        data : [
                           
                             {
                                value : this.keyUnitValue,
                                name : '重点单位'
                            }
                        ]
                    }]
                };
                this.keyUnitChart.setOption(option) 
            },
            // 火灾原因
            fireReson() {
                this.fireResonChart = echarts.init(document.getElementById('fireReson'));
                let option = {
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    series: [
                        {
                            name:'',
                            type:'pie',
                            radius: [80, 90],
                            data:[
                                {
                                    value:0, name:'',
                                    itemStyle: {
                                        normal: {
                                            color: '#03FEC9'
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            name:'火灾原因',
                            type:'pie',
                            radius: [60, 70],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show:true,
                                    formatter: '{b|{b}}  {per|{d}%}',
                                    rich: {
                                        b: {
                                            color: '#fff',
                                            fontSize: 14,
                                            align: 'center',
                                        },
                                        d: {
                                            color: '#11d1b4',
                                            fontSize: 14,
                                            align: 'center',
                                        }
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: true,
                                    length:10
                                }
                            },
                            data:[
                                {value:this.todayData.playfire, name:'玩火'},
                                {value:this.todayData.breakrules, name:'违反常规'},
                                {value:this.todayData.smoke, name:'吸烟'},
                                {value:this.todayData.arson, name:'纵火'},
                                {value:this.todayData.electrical, name:'电器'},
                                {value:this.todayData.careless, name:'用火不慎'}
                            ]
                        },
                        {
                            name:'',
                            type:'pie',
                            radius: [40, 50],
                            data:[
                                {
                                    value:0, name:'',
                                    itemStyle: {
                                        normal: {
                                            color: '#03FEC9'
                                        }
                                    }
                                }
                            ]
                        },
                    ]
                };

                this.fireResonChart.setOption(option)
            },
            connectData() {
                let _this = this;
                let client, destination;
                let url = "ws://192.168.1.25:61614";
                let login = "admin";
                let passcode = "admin";
                destination = "/topic/realtime_emergency_duty";
                client = stomp.client(url);

                // this allows to display debug logs directly on the web page
                client.debug = function (str) {
                     console.log("创建连接提示信息:" + str);
                };

                // the client is notified when it is connected to the server.
                client.connect(login, passcode, function (frame) {
                    client.debug("connected to Stomp");
                    client.subscribe(destination, function (message) {
                         // console.log('数据：' + message.body);
                        let msg = eval('(' + message.body + ')');
                        
                         let map = msg['emergencyData']
                         _this.mapData = map['emergency']
                        _this.coordinates = map['coordinate']
                        _this.todayData = msg['emergencyCount']
                    });
                });
            },
            getCurrentCity() {    //定义获取城市方法
                const geolocation = new BMap.Geolocation();
                let _this = this;
                geolocation.getCurrentPosition(function getinfo(position) {
                    let city = position.address.city;//获取城市信息
                    _this.getWeather(city);
                    setInterval(function() {
                        _this.getWeather(city);
                    },1000 * 60 * 10);
                }, function (e) {
                    console.log('定位失败！');
                }, {provider: 'baidu'});
            },
            getWeather(cityName){
                this.$jsonp('http://api.map.baidu.com/telematics/v3/weather',
                {
                    location: cityName, // 城市
                    output: "json", // 格式
                    ak: "eklfHV01LdEBLSrwUAXZRP6Ctr94f8TO" // 百度地图ak
                }).then(res => {
                    if(res.status == 'success'){
                        this.weather = res.results[0].weather_data[0];
                        console.log('this.weather',this.weather.date.split('实时：')[1].split(")")[0]);
                    }else{
                        this.$message.error('获取天气失败!')
                    }
                })
            },
            getCurrTime(){
                let _this = this;
                setInterval(function() {
                    let time = new Date();   // 程序计时的月从0开始取值后+1
                    let year,month,day,hour,min,sec;
                    year = time.getFullYear();
                    month = ((time.getMonth() + 1) < 10) ? ('0'+(time.getMonth() + 1)) : (time.getMonth() + 1);
                    day = (time.getDate() < 10) ? '0'+time.getDate() : time.getDate();
                    hour = (time.getHours() < 10) ? '0'+time.getHours() : time.getHours();
                    min = (time.getMinutes() < 10) ? '0'+time.getMinutes() : time.getMinutes();
                    sec = (time.getSeconds() < 10) ? '0'+time.getSeconds() : time.getSeconds();
                    let timeStr = year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
                    _this.curTime = timeStr;

                }, 1000);
            }
        },
        computed: {
            defaultActive () {
                return this.$route.path;
            }
        },
        components: {
            vueCircle
        }
    }
</script>

<style lang="scss">
    html, body {
        height: 100%;
    }

    #battleDutyIndex {
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-image: url('./assets/background.png');
        background-repeat: no-repeat;
        background-size: cover;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        .topHeader {
            padding: 0 0.2rem;
            overflow: hidden;
            .logo{
                float: left;
                margin: 0.08rem 0.1rem 0;
            }
            .weather {
                float: right;
                text-align: right;
                line-height: 0.76rem;
                span {
                    color: #fff;
                }
                overflow: hidden;
                .sweater-box {
                    width: 2rem;
                    text-align: left;
                    float: right;
                    .sweater{
                        color:#bdfff0;
                        line-height: 0.26rem;
                    }
                    .time{
                        color:#6dfff5;
                        line-height: 0.26rem;
                    }
                }
                
            }
        }
        .content-wrapper {
            color: #fff;
            padding: 0 0.5rem;
            width: 100%;
            height: 100%;
            overflow: hidden;
            .content-left {
                padding-top: 0.3rem;
                width: 20%;
                float: left;
                height: 100%;
                & > div {
                    &:nth-child(1) {
                        height: 30%;
                    }
                    &:nth-child(2) {
                        height: 36%;
                    }
                    &:nth-child(3) {
                        height: 26%;
                    }
                }
                .title {
                    color: #05DCE5;
                    width: 3.36rem;
                    height: 0.53rem;
                    line-height: 0.53rem;
                    font-size: 0.18rem;
                    text-align: center;
                    background: url('./assets/title.png')no-repeat;
                    &.circle-title {
                        margin-bottom: 0.16rem;
                    }
                }
                .news-box {
                    height: 2.08rem;
                    overflow: hidden;
                }
                .news {
                    margin-bottom: 0.1rem;
                    animation: scrollTop 5s linear infinite;
                    animation-fill-mode: forwards;
                    @keyframes scrollTop {
                      0% {
                        transform: translate3d(0,0,0);
                      }
                      100% {
                        transform: translate3d(0,-0.46rem,0);
                      }
                    } 
                    li {
                        font-size: 0.14rem;
                        line-height: 0.46rem;
                        list-style: none;
                        text-indent: 0.3rem;
                    }
                }
                .prepareDuty {
                    height: calc(100% - 0.53rem);
                    overflow-y: auto;
                    padding: 0.16rem 0 0 0.3rem;
                    .item {
                        font-size: 0.14rem;
                        margin-bottom: 0.2rem;
                        img,.info {
                            display: inline-block;
                        }
                        img {
                            width: 0.52rem;
                            height: 0.52rem;
                            position: relative;
                            top: -0.08rem;
                            border-radius: 50%;
                            margin-right: 0.3rem;
                        }
                        .p1 {
                            span:first-child {
                                margin-right: 0.2rem;
                            }
                        }
                        .p2 {
                            color: #00F6F7;
                            margin: 0.08rem 0;
                            span:first-child {
                                margin-right: 0.5rem;
                            }
                        }
                        .p3 {
                            color: #00A1FD;
                            span:first-child {
                                margin-right: 0.2rem;
                            }
                        }
                    }
                }
                .circle-box {
                    padding-left: 0.3rem;
                    .circle-item {
                        margin-right: 0.4rem;
                        float: left;
                        text-align: center;
                        &.clearMargin {
                            margin-right: 0;
                        }
                        &.marginBottom {
                            margin-bottom: 0.15rem;
                        }
                    }
                }
            }
            .content-middle {
                width: 60%;
                height: 100%;
                float: left;
                & > div {
                    &:nth-child(1) {
                        height: 12%;
                    }
                    &:nth-child(2) {
                        height: 51%;
                        #myChart {
                            width: 100%;
                            height: 100%;
                        }
                    }
                    &:nth-child(3) {
                        height: 30%;
                    }
                }
                .today-info {
                    text-align: center;
                    .item {
                        float: left;
                        width: 25%;
                        & > div,img {
                            display: inline-block;
                            p {
                                &:last-child {
                                    color: #00EBEE;
                                    margin-top: 0.2rem;
                                    span {
                                        font-size: 0.14rem;
                                    }
                                }
                            }
                        }
                        & > div {
                            padding-bottom: 0.3rem;
                        }
                        & > img {
                            width: 1.1rem;
                            height: 1.1rem;
                            margin-right: 0.1rem;
                        }
                    }
                }
                .table-header,.table-content {
                    table {
                        width: 100%;
                        tr {
                            line-height: 0.5rem;
                            text-align: center;
                            color: #818186;
                            font-size: 0.14rem;
                        }
                    }
                }
                .table-header table {
                    tr {
                        font-size: 0.16rem;
                        color: #fff;
                        background-color: #172537;
                    }
                }
                .table-content {
                    height: calc(100% - 1.1rem);
                    overflow-y: auto;
                    overflow-x: hidden;
                }
                .table-content table {
                    tbody {
                       tr {
                            line-height: 0.5rem;
                            text-align: center;
                            color: #818186;
                            font-size: 0.14rem;
                            td {
                                width: 20%;
                            }
                            td.site {
                                width: 30%;
                            }
                            td:first-child,td:last-child {
                                width: 10%;
                            }
                       }
                    }
                }
            }
            .content-right {
                width: 20%;
                float: right;
                height: 100%;
                .title {
                    color: #05DCE5;
                    width: 100%;
                    height: 0.53rem;
                    line-height: 0.53rem;
                    font-size: 0.18rem;
                    text-align: center;
                    background-image: url('./assets/title.png');
                    background-repeat: no-repeat;
                    background-size: cover;
                }
                & > div {
                    &:nth-child(1) {
                        height: 28%;
                        .title {
                            margin-bottom: 0.2rem;
                        }
                    }
                    &:nth-child(2) {
                        height: 31%;
                        .title {
                            margin-bottom: 0.2rem;
                        }
                    }
                    &:nth-child(3) {
                        height: 35%;
                    }
                    .chart-box {
                        height: calc(100% - 0.53rem);
                    }
                }
                //border: 1px solid brown;
            }
        }
    }
    *::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
        background-color: #041530;
        border-radius: 4px;
    }

    *::-webkit-scrollbar {
        width: 4px;
        background-color: #041530;
        border-radius: 4px;
    }

    *::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background: #64B1E3;
    }
</style>
