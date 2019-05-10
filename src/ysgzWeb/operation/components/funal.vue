<template>
  <div :style="{height:heightData}">
    <div id="carInfoCanvas" ref="carInfoCanvas" :style="{height:'100%',width:'100%'}"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "vueCarInfo",
  props: {
    msg: String
  },
  data() {
    return {
      heightData: "200px",
      operationId: "0f9f0fa95213451cb98cc93e7e04ce76",
      carInfoData: []
    };
  },
  created() {
    // 车辆信息
    this.carInfo_gd(this.operationId);
  },
  mounted() {},
  methods: {
    // 车辆信息获取
    carInfo_gd(id) {
      this.axios({
        method: "post",
        url: "/org/carInfo/" + id
      }).then(res => {
        if (res.status == 200) {
          var data = [];
          if (res.data.result) {
            data = res.data.result;
            this.carInfoData = data;
            this.heightData = data.length * 40 + "px";
            this.carInfoFun(data);
          }
        } else {
          console.log("请求错误");
        }
      });
    },
    //车辆信息渲染
    carInfoFun(val) {
      let carInfoCanvas = this.$refs.carInfoCanvas;
      // console.log(carInfoCanvas, "79234280284308");
      this.keyUnitChart = echarts.init(carInfoCanvas);
      // console.log(this.keyUnitChart.getDom());
      var _ = this;

      var maxData = 1000;
      var yData = [];
      var xData = [];
      if (val) {
        val.forEach(item => {
          yData.push(item.name);
          xData.push(item.num);
        });
        maxData = eval(xData.join("+"));
      }
      // console.log("yData", yData, "xData", xData, maxData);
      //  ["灭火类", "举高类", "专勤类", "战勤保障类"]
      let option = {
        backgroundColor: "transparent",
        tooltip: {},
        xAxis: {
          max: maxData,
          splitLine: {
            show: false
          },
          offset: 10,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false
          }
        },
        yAxis: {
          data: yData,
          inverse: true,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            margin: 135,
            formatter: function(val) {
              return val.length > 8 ? val.substr(0, 7) + "..." : val;
            },
            textStyle: {
              color: "#fff",
              fontSize: 16,
              align: "left"
            }
          }
        },
        grid: {
          height: 40 * val.length,
          top: 15,
          left: 150,
          right: 60
        },
        series: [
          {
            // 外边框
            name: "",
            type: "pictorialBar",
            symbol: "reat",
            //barWidth: '10%',
            symbolOffset: [0, 0], //位置
            symbolSize: [9, 12],

            itemStyle: {
              opacity: 0,
              borderType: "dotted",
              normal: {
                opacity: 0,
                color: ""
              }
            },

            z: -180, //图层
            symbolRepeat: 20,
            symbolBoundingData: maxData,
            data: xData,
            animationEasing: "elasticOut"
          },
          {
            // 内边框
            name: "",
            type: "pictorialBar",
            symbol: "reat",
            //barWidth: '9%',
            //barMaxWidth: '20%',
            symbolOffset: [0, 0],
            symbolSize: ["101%", 22],
            itemStyle: {
              normal: {
                color: "transparent"
              }
            },
            z: -20,
            symbolRepeat: null,
            symbolBoundingData: maxData,
            // data: [891, 1220, 660, 1670],
            data: xData,
            animationEasing: "elasticOut"
          },

          {
            // current data
            type: "pictorialBar",
            symbol: "rect",
            itemStyle: {
              normal: {
                barBorderRadius: 5,
                color: "#00ccff"
              }
            },
            symbolRepeat: 20,
            symbolMargin: "5%",
            symbolClip: true,
            symbolSize: [9, 12],
            symbolBoundingData: maxData,
            // data: [891, 1220, 660, 1670],
            data: xData,
            z: 99999999,
            animationEasing: "elasticOut",
            animationDelay: function(dataIndex, params) {
              return params.index * 30;
            }
          },
          {
            // full data
            type: "pictorialBar",
            itemStyle: {
              normal: {
                color: "transparent",
                borderColor: "#00ccff",
                borderWidth: 0.5,
                borderType: "solid"
              }
            },
            label: {
              normal: {
                show: true,
                formatter: function(params) {
                  return params.value;
                },
                position: "right",
                offset: [10, 0],
                textStyle: {
                  color: "#00ccff",
                  fontSize: 24,
                  fontFamily: "ROME"
                }
              }
            },
            animationDuration: 0,
            symbolRepeat: 20,
            symbolMargin: "5%",
            symbol: "rect",
            symbolSize: [9, 12],
            symbolBoundingData: maxData,
            // data: [891, 1220, 660, 1670],
            data: xData,
            z: 99999,
            animationEasing: "elasticOut",
            animationDelay: function(dataIndex, params) {
              return params.index * 30;
            }
          }
        ]
      };
      this.keyUnitChart.setOption(option);
      var dom = _.keyUnitChart.getDom();
      var nowHeight = 40 * val.length;
      dom.style.height = nowHeight + "px";
      dom.childNodes[0].style.height = nowHeight + "px";
      dom.childNodes[0].childNodes[0].setAttribute("height", nowHeight);
      dom.childNodes[0].childNodes[0].style.height = nowHeight + "px";
      _.keyUnitChart.resize();
      // this.keyUnitChart.setOption(option);
      // console.log(
      //   (dom.childNodes[0].childNodes[0].style.height = nowHeight + "px")
      // );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
