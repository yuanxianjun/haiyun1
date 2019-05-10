<template>
  <div class="hello" style="position: relative;">
      	<div id="main" style="width: 440px;height:220px;"></div>
        <el-row class="shuiqiu_text">
            <el-col :span="6" v-for="item in dataList" :key="item">{{item}}</el-col>
        </el-row>
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
	name: 'HelloWorld',
	data () {
		return {
            dataList: ['高层建筑','水库水电站','大型综合体','石油化工','核电站','地下建筑','地震带','油气管线']
		}
	},
	mounted() {
		console.log(echarts)
		this.echartsCon()
	},
	methods: {
		echartsCon () {
			var myChart = echarts.init(document.getElementById('main'));
            var option = {
                tooltip: {
                    show: true,
                    formatter: '112'
                },
                title: [{
                    text: '323',
                    left: '14%',
                    top: '14%',
                    textAlign: 'center',
                    textStyle: {
                        fontWeight: '500',
                        color: 'white',
                        fontSize: 24,
                        fontFamily: 'ROME',
                        textAlign: 'center',
                    }
                },{
                    text: '3231',
                    left: '37%',
                    top: '14%',
                    textAlign: 'center',
                    textStyle: {
                        fontWeight: '500',
                        color: 'white',
                        fontSize: 24,
                        fontFamily: 'ROME',
                        textAlign: 'center',
                    }
                },{
                    text: '3231',
                    left: '60%',
                    top: '14%',
                    textAlign: 'center',
                    textStyle: {
                        fontWeight: '500',
                        color: 'white',
                        fontSize: 24,
                        fontFamily: 'ROME',
                        textAlign: 'center',
                    }
                },{
                    text: '3231',
                    left: '83%',
                    top: '14%',
                    textAlign: 'center',
                    textStyle: {
                        fontWeight: '500',
                        color: 'white',
                        fontSize: 24,
                        fontFamily: 'ROME',
                        textAlign: 'center',
                    }
                },
                

                {
                    text: '323',
                    left: '14%',
                    top: '62%',
                    textAlign: 'center',
                    textStyle: {
                        fontWeight: '500',
                        color: 'white',
                        fontSize: 24,
                        fontFamily: 'ROME',
                        textAlign: 'center',
                    }
                },{
                    text: '3231',
                    left: '37%',
                    top: '62%',
                    textAlign: 'center',
                    textStyle: {
                        fontWeight: '500',
                        color: 'white',
                        fontSize: 24,
                        fontFamily: 'ROME',
                        textAlign: 'center',
                    }
                },{
                    text: '3231',
                    left: '60%',
                    top: '62%',
                    textAlign: 'center',
                    textStyle: {
                        fontWeight: '500',
                        color: 'white',
                        fontSize: 24,
                        fontFamily: 'ROME',
                        textAlign: 'center',
                    }
                },{
                    text: '331',
                    left: '83%',
                    top: '62%',
                    textAlign: 'center',
                    textStyle: {
                        fontWeight: '500',
                        color: 'white',
                        fontSize: 24,
                        fontFamily: 'ROME',
                        textAlign: 'center',
                    }
                }


                ],
                series: [{
                    type: 'liquidFill',
                    radius: '70px', //调整大小
                    color: [{type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: '#00FFFC' // 0% 处的颜色
                    }, {
                        offset: 1, color: '#0090FF' // 100% 处的颜色
                    }],
                    global: false}],
                    center: ['15%', '23%'],
                    shape: 'circle', //修改形状，目前支持	'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
                    outline: {
                        borderDistance: 0, //内环padding值
                        itemStyle: {
                            borderWidth: 1, //圆边线宽度
                            borderColor: '#00FFFF',
                        },
                    },

                    backgroundStyle: { // 内图 背景色 边
                        color: '#172A51',
                    },
                    data: [{
                        'value': '0.4',
                        color: ['#00FFFF']
                    }], //其中第一个数值由键值对表示
                    label: {
                        normal: {
                        show: false,
                        }
                    }
                },{
                    type: 'liquidFill',
                    radius: '70px', //调整大小
                    color: [{type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: '#0DBD8D' // 0% 处的颜色
                    }, {
                        offset: 1, color: '#0E7FBF' // 100% 处的颜色
                    }],
                    global: false}],
                    center: ['38%', '23%'],
                    shape: 'circle', //修改形状，目前支持	'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
                    outline: {
                        borderDistance: 0, //内环padding值
                        itemStyle: {
                            borderWidth: 1, //圆边线宽度
                            borderColor: '#8A4CC6',
                        },
                    },

                    backgroundStyle: { // 内图 背景色 边
                        color: '#1C334C',
                    },
                    data: [{
                        'value': '0.3',
                        color: ['#00FFFF']
                    }], //其中第一个数值由键值对表示
                    label: {
                        normal: {
                            show: false,
                        }
                    }
                },{
                    type: 'liquidFill',
                    radius: '70px', //调整大小
                    color: [{type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: '#00FFFC' // 0% 处的颜色
                    }, {
                        offset: 1, color: '#0090FF' // 100% 处的颜色
                    }],
                    global: false}],
                    center: ['61%', '23%'],
                    shape: 'circle', //修改形状，目前支持	'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
                    outline: {
                        borderDistance: 0, //内环padding值
                        itemStyle: {
                            borderWidth: 1, //圆边线宽度
                            borderColor: '#21B1E7',
                        },
                    },

                    backgroundStyle: { // 内图 背景色 边
                        color: '#1C334C',
                    },
                    data: [{
                        'value': '0.3',
                        color: ['#00FFFF']
                    }], //其中第一个数值由键值对表示
                    label: {
                        normal: {
                            show: false,
                        }
                    }
                },{
                    type: 'liquidFill',
                    radius: '70px', //调整大小
                    color: [{type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: '#0967CC' // 0% 处的颜色
                    }, {
                        offset: 1, color: '#0927D0' // 100% 处的颜色
                    }],
                    global: false}],
                    center: ['84%', '23%'],
                    shape: 'circle', //修改形状，目前支持	'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
                    outline: {
                        borderDistance: 0, //内环padding值
                        itemStyle: {
                            borderWidth: 1, //圆边线宽度
                            borderColor: '#DB6AF8',
                        },
                    },

                    backgroundStyle: { // 内图 背景色 边
                        color: '#1B1A4E',
                    },
                    data: [{
                        'value': '0.3',
                        color: ['#00FFFF']
                    }], //其中第一个数值由键值对表示
                    label: {
                        normal: {
                            show: false,
                        }
                    }
                },{
                    type: 'liquidFill',
                    radius: '70px', //调整大小
                    color: [{type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: '#CC00FA' // 0% 处的颜色
                    }, {
                        offset: 1, color: '#FF006F' // 100% 处的颜色
                    }],
                    global: false}],
                    center: ['15%', '71%'],
                    shape: 'circle', //修改形状，目前支持	'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
                    outline: {
                        borderDistance: 0, //内环padding值
                        itemStyle: {
                            borderWidth: 1, //圆边线宽度
                            borderColor: '#DB6AF8',
                        },
                    },

                    backgroundStyle: { // 内图 背景色 边
                        color: '#51172C',
                    },
                    data: [{
                        'value': '0.3',
                    }], //其中第一个数值由键值对表示
                    label: {
                        normal: {
                            show: false,
                        }
                    }
                },{
                    type: 'liquidFill',
                    radius: '70px', //调整大小
                    color: [{type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: '#00FF12' // 0% 处的颜色
                    }, {
                        offset: 1, color: '#FFB400' // 100% 处的颜色
                    }],
                    global: false}],
                    center: ['38%', '71%'],
                    shape: 'circle', //修改形状，目前支持	'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
                    outline: {
                        borderDistance: 0, //内环padding值
                        itemStyle: {
                            borderWidth: 1, //圆边线宽度
                            borderColor: '#00FF00',
                        },
                    },

                    backgroundStyle: { // 内图 背景色 边
                        color: '#172A51',
                    },
                    data: [{
                        'value': '0.3',
                        color: ['#00FFFF']
                    }], //其中第一个数值由键值对表示
                    label: {
                        normal: {
                            show: false,
                        }
                    }
                },{
                    type: 'liquidFill',
                    radius: '70px', //调整大小
                    color: [{type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: '#FFFF00' // 0% 处的颜色
                    }, {
                        offset: 1, color: '#FF6D00' // 100% 处的颜色
                    }],
                    global: false}],
                    center: ['61%', '71%'],
                    shape: 'circle', //修改形状，目前支持	'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
                    outline: {
                        borderDistance: 0, //内环padding值
                        itemStyle: {
                            borderWidth: 1, //圆边线宽度
                            borderColor: '#FFFF00',
                        },
                    },

                    backgroundStyle: { // 内图 背景色 边
                        color: '#172A51',
                    },
                    data: [{
                        'value': '0.3',
                        color: ['#00FFFF']
                    }], //其中第一个数值由键值对表示
                    label: {
                        normal: {
                            show: false,
                        }
                    }
                },{
                    type: 'liquidFill',
                    radius: '70px', //调整大小
                    color: [{type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: '#94A318' // 0% 处的颜色
                    }, {
                        offset: 1, color: '#57A518' // 100% 处的颜色
                    }],
                    global: false}],
                    center: ['84%', '71%'],
                    shape: 'circle', //修改形状，目前支持	'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
                    outline: {
                        borderDistance: 0, //内环padding值
                        itemStyle: {
                            borderWidth: 1, //圆边线宽度
                            borderColor: '#51AE98',
                        },
                    },

                    backgroundStyle: { // 内图 背景色 边
                        color: '#2A4820',
                    },
                    data: [{
                        'value': '0.3',
                        color: ['#00FFFF']
                    }], //其中第一个数值由键值对表示
                    label: {
                        normal: {
                            show: false,
                        }
                    }
                }]
            };
			myChart.setOption(option)
		}
	},
}
</script>

<style>
.shuiqiu_text {
    position: absolute !important;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    width: 410px;
    margin: 0 auto;
    font-size:14px;
    font-family:Adobe Heiti Std R;
    font-weight:normal;
    color:rgba(255,255,255,1);
}
.shuiqiu_text div {
    text-align: center;
}
.shuiqiu_text div:nth-child(1) {
    margin: 90px 0 85px;
}
.shuiqiu_text div:nth-child(2) {
    margin: 90px 0 85px;
}
.shuiqiu_text div:nth-child(3) {
    margin: 90px 0 85px;
}
.shuiqiu_text div:nth-child(4) {
    margin: 90px 0 85px;
}
</style>
