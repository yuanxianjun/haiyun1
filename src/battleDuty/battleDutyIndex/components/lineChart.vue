<template>
  <div id="pieOne" ref="pieOne" style="width:100%;height:100%;"></div>
</template>
<script>
import echarts from "echarts";
export default {
  name: "vuePie",
  props: {
    propsXdata: String
  },
  data() {
    return {
      xDataY: [],
      xDataM: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      xDataD: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31
      ],
      xData: []
    };
  },
  created() {
    this.xDataY = (function() {
      var data = [];
      for (var i = 2011; i < 2020; i++) {
        data.push(i + "年");
      }
      return data;
    })();
    console.log(this.xDataY);
  },
  mounted() {
    this.xData = this.xDataY;
    this.peopleData();
  },
  methods: {
    checkxData(params) {
      if (params == "y") {
        this.xData = this.xDataY;
      } else if (params == "m") {
        this.xData = this.xDataM;
      } else {
        this.xData = this.xDataD;
      }
      this.peopleData();
      console.log(this.xData);
    },
    //折线图
    peopleData() {
      //找到dom
      let pieOne = this.$refs.pieOne;
      this.keyUnitChart = echarts.init(pieOne);

      var color = [
        "#1a9bfc",
        "#99da69",
        "#e32f46",
        "#7049f0",
        "#fa704d",
        "#01babc"
      ];
      var name = ["总数", "亡人火灾", "三级以上火灾"];
      var data = [
        [20, 20, 30, 20, 30, 25, 30, 40, 90],
        [10, 15, 18, 10, 20, 19, 28, 20, 50],
        [8, 7, 9, 10, 10, 15, 10, 10, 30]
      ];

      var series = [];
      for (var i = 0; i < 6; i++) {
        series.push({
          name: name[i],
          type: "line",
          symbolSize: 3, //标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10[ default: 4 ]
          symbol: "circle", //标记的图形。ECharts 提供的标记类型包括 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
          smooth: true, //是否平滑曲线显示
          showSymbol: false, //是否显示 symbol, 如果 false 则只有在 tooltip hover 的时候显示

          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: color[i]
                  },
                  {
                    offset: 0.8,
                    color: "rgba(255,255,255,0)"
                  }
                ],
                false
              ),
              // shadowColor: 'rgba(255,255,255, 0.1)',
              shadowBlur: 10,
              opacity: 0.3
            }
          },
          itemStyle: {
            normal: {
              color: color[i],
              lineStyle: {
                width: 1,
                type: "solid" //'dotted'虚线 'solid'实线
              },
              borderColor: color[i], //图形的描边颜色。支持的格式同 color
              borderWidth: 8, //描边线宽。为 0 时无描边。[ default: 0 ]
              barBorderRadius: 0,
              label: {
                show: false
              },
              opacity: 0.5
            }
          },
          data: data[i]
        });
      }
      let option = {
        legend: {
          top: 40,
          icon: "rect",
          itemWidth: 20,
          itemHeight: 2,
          textStyle: {
            color: "#fff",
            fontSize: "10"
          },
          data: name
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "line", // 默认为直线，可选为：'line' | 'shadow'
            lineStyle: {
              color: "#57617B"
            }
          },
          formatter:
            "{b}<br />{a0}: {c0}%<br />{a1}: {c1}%<br />{a2}: {c2}%<br />{a3}: {c3}%<br />{a4}: {c4}%<br />{a5}: {c5}%",
          backgroundColor: "rgba(0,0,0,0.7)", // 背景
          padding: [8, 10], //内边距
          extraCssText: "box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);" //添加阴影
        },
        grid: {
          borderWidth: 0,
          top: 80,
          left: 40,
          right: 40,
          bottom: 40,
          textStyle: {
            color: "#fff"
          }
        },
        xAxis: [
          {
            type: "category",
            axisLine: {
              lineStyle: {
                color: "#32346c"
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#32346c "
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
                color: "#bac0c0",
                fontWeight: "normal",
                fontSize: "12"
              }
            },
            data: this.xData
          }
        ],
        yAxis: {
          type: "value",
          max: 50,
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#32346c"
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#32346c "
            }
          },
          axisLabel: {
            textStyle: {
              color: "#bac0c0",
              fontWeight: "normal",
              fontSize: "12"
            }
            // formatter: "{value}"
          }
        },
        series: series
      };
      this.keyUnitChart.setOption(option);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
