<template>
  <div id="pieOne" ref="pieOne" style="width:100%;height:100%;">
 
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "vuePie",
  props: {
    msg: String
  },
  data() {
    return {
    };
  },
  created() {},
  mounted() {
    this.peopleData();
  },
  methods: {
    //折线图
    peopleData() {
    	//找到dom
      let pieOne = this.$refs.pieOne;
      this.keyUnitChart = echarts.init(pieOne);
			
      var xData = function() {
    var data = [];
    for (var i = 2011; i < 2017; i++) {
        data.push(i + "年");
    }
    return data;
}();
var color = ['#1a9bfc', '#99da69', '#e32f46', '#7049f0', '#fa704d', '#01babc', ]
var name = ['学前教育', '义务教育', '高中教育', '高等教育', '教师队伍', '教学条件']
var data = [
    [20,20,30,20,30,20],
    [10,15,18,10,20,19],
    [8,7,9,10,10,20],
    [6,5,8,5,6,8]
]

var series = [];
for (var i = 0; i < 6; i++) {
    series.push({
        name: name[i],
        type: "line",
        symbolSize: 3,//标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10[ default: 4 ]
        symbol: 'circle',//标记的图形。ECharts 提供的标记类型包括 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
        smooth: true, //是否平滑曲线显示
        showSymbol: false, //是否显示 symbol, 如果 false 则只有在 tooltip hover 的时候显示
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: color[i]
                }, {
                    offset: 0.8,
                    color: 'rgba(255,255,255,0)'
                }], false),
                // shadowColor: 'rgba(255,255,255, 0.1)',
                shadowBlur: 10,
                opacity:0.3,
            }
        },
        itemStyle: {
            normal: {
                color: color[i],
                lineStyle: {
                    width: 1,
                    type: 'solid' //'dotted'虚线 'solid'实线
                },
                borderColor: color[i], //图形的描边颜色。支持的格式同 color
                borderWidth: 8 ,//描边线宽。为 0 时无描边。[ default: 0 ] 
                barBorderRadius: 0,
                label: {
                    show: false,
                },
                opacity:0.5,
            }
        },
        data: data[i],

    })
}
let option = {
    legend: {
        top: 20,
            itemGap:5,
            itemWidth:5,
            textStyle: {
                color: '#fff',
                fontSize: '10'
            },
            data: name
    },
//  title: {
//      text: "负面言论分领域趋势",
//      textStyle: {
//          color: '#fff',
//          fontSize: '22',
//          fontWeight: 'normal',
//      },
//      subtextStyle: {
//          color: '#90979c',
//          fontSize: '16',
//
//      },
//  },
    tooltip: {
        trigger: "axis",
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'line', // 默认为直线，可选为：'line' | 'shadow'
            lineStyle: {
                color: '#57617B'
            }
        },
        formatter: '{b}<br />{a0}: {c0}%<br />{a1}: {c1}%<br />{a2}: {c2}%<br />{a3}: {c3}%<br />{a4}: {c4}%<br />{a5}: {c5}%',
        backgroundColor: 'rgba(0,0,0,0.7)', // 背景
        padding: [8, 10], //内边距
        extraCssText: 'box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);', //添加阴影
    },
    grid: {
        borderWidth: 0,
          top: 80,
          left: 40,
          right:40,
          bottom:40,
        textStyle: {
            color: "#fff"
        }
    },
    xAxis: [{
        type: "category",
        axisLine: {
            lineStyle: {
                color: '#32346c'
            }
        },
        splitLine: {
            show: true,
            lineStyle: {
                color: '#32346c ',
            }
        },
        boundaryGap: false, //坐标轴两边留白策略，类目轴和非类目轴的设置和表现不一样
        axisTick: {
            show: false
        },
        splitArea: {
            show: false
        },
        axisLabel: {
            inside: false,
            textStyle: {
                color: '#bac0c0',
                fontWeight: 'normal',
                fontSize: '12',
            },
        },
        data: xData,
    }],
    yAxis: {
        type: 'value',
        axisTick: {
            show: false
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: '#32346c',
            }
        },
        splitLine: {
            show: true,
            lineStyle: {
                color: '#32346c ',
            }
        },
        axisLabel: {
            textStyle: {
                color: '#bac0c0',
                fontWeight: 'normal',
                fontSize: '12',
            },
            formatter: '{value}%',
        },
    },
    series: series,
}
      this.keyUnitChart.setOption(option);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
