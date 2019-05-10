<template>
  <div id="pieOne" ref="pieOne" style="width:100%;height:100%;"></div>
</template>
<script>
import echarts from "echarts";
export default {
  name: "lineChart",
  props: ["firePropsData"],
  data() {
    return {
      // x轴的变动数据
      xData: [],
      axisName: "月",
      realData: []
    };
  },
  created() {},
  mounted() {
    this.realData = this.dataY;
    this.xData = this.xDataY;

    // console.log("接收到的数据", this.firePropsData);
    this.fireCanvas(this.firePropsData.year || this.firePropsData);
  },
  methods: {
    checkxData(params) {
      if (params == "y") {
        this.xData = this.xDataY;
        this.realData = this.dataY;
        this.axisName = "月";

        if (this.firePropsData.year) {
          this.fireCanvas(this.firePropsData.year);
        } else {
          this.firstMhjy(0);
        }
      } else if (params == "m") {
        this.xData = this.xDataM;
        this.realData = this.dataM;
        this.axisName = "日";
        if (this.firePropsData.mouth) {
          this.fireCanvas(this.firePropsData.mouth);
        } else {
          this.firstMhjy(1);
        }
      } else {
        this.xData = this.xDataD;
        this.realData = this.dataD;
        this.axisName = "时";
        if (this.firePropsData.day) {
          this.fireCanvas(this.firePropsData.day);
        } else {
          this.firstMhjy(2);
        }
      }
    },
    // 请求数据
    firstMhjy(options) {
      this.axios({
        method: "get",
        url: "/org/fire_fighting?type=" + options,
        params: options
      }).then(res => {
        if (res.status == 200) {
          var data = res.data;
          if (data) {
            this.fireProps = data;
            this.fireCanvas(data);
          }
        } else {
          console.log("请求错误");
        }
      });
    },
    //折线图
    fireCanvas(val) {
      var _this = this;
      //找到dom
      let pieOne = this.$refs.pieOne;
      this.keyUnitChart = echarts.init(pieOne);

      var color = ["#ffff00", "#24ff00", "#00ffff"];
      var dataList = [];
      for (var i in val) {
        if (i == "zongShu") {
          dataList[0] = val[i];
        } else if (i == "wrs") {
          dataList[1] = val[i];
        } else if (i == "sanji") {
          dataList[2] = val[i];
        }
      }
      console.log(dataList);
      this.realData = dataList;
      // 赋值横坐标
      if (val.zuoBiao) {
        this.xData = val["zuoBiao"].map(res => {
          return res + " " + this.axisName;
        });
      }
      var name = ["总数", "亡人火灾", "三级以上火灾"];
      var series = [];
      for (var i = 0; i < 3; i++) {
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
                width: 2.5,
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
          data: this.realData[i]
        });
      }
      let option = {
        legend: {
          // right: 10,
          top: 40,
          icon: "rect",
          itemWidth: 20,
          itemHeight: 2,
          textStyle: {
            color: function(params) {},
            fontSize: "14"
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
          // // formatter: "{b}<br />{a0}: {c0}<br />{a1}: {c1}<br />{a2}: {c2}",
          // formatter:function(params){
          //   console.log("params",params)

          // },
          backgroundColor: "rgba(0,0,0,0.7)", // 背景
          padding: [8, 10], //内边距
          extraCssText: "box-shadow: 0 0 3px rgba(255, 255, l255, 0.4);" //添加阴影
        },
        grid: {
          borderWidth: 0,
          top: 80,
          left: 40,
          right: 20,
          bottom: 50,
          textStyle: {
            color: "#fff"
          }
        },
        xAxis: [
          {
            // name: this.axisName,
            // nameTextStyle: {
            //   color: "#0398bf",
            //   align: "right",
            //   verticalAlign: "bottom",
            //   padding: [60, -10, 0, -15]
            // },
            type: "category",
            axisLine: {
              lineStyle: {
                color: "#071e3d"
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "#071e3d "
              }
            },
            boundaryGap: false, //坐标轴两边留白策略，类目轴和非类目轴的设置和表现不一样
            min: 0,
            axisTick: {
              show: false
            },
            splitArea: {
              show: false
            },
            showMinLabel: true,
            showMaxLabel: true,
            axisLabel: {
              inside: false,
              // interval: 1,
              textStyle: {
                color: "#03b0d8",
                fontWeight: "normal",
                fontSize: "16",
                fontFamily: "ROME"
              }
            },
            data: this.xData
          }
        ],
        yAxis: {
          name: "(起)",
          type: "value",
          // max: 50,
          nameLocation: "end",
          nameTextStyle: {
            fontSize: 12,
            color: "#03b0d8",
            padding: [-10, 0, 0, -20]
          },
          scale: true,
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
              color: "#071e3d "
            }
          },
          axisLabel: {
            textStyle: {
              color: "#03b0d8",
              fontWeight: "normal",
              fontSize: "16",
              fontFamily: "ROMe"
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
