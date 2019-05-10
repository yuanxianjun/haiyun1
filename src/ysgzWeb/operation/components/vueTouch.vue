<template>
  <div id="carInfoCanvas" ref="carInfoCanvas" style="width:100%;height:100%;"></div>
</template>

<script>
import echarts from "echarts";
import moment from "moment";
export default {
  name: "vueCarInfo",
  props: {
    msg: String
  },
  data() {
    return {
      operationId: "0f9f0fa95213451cb98cc93e7e04ce76"
    };
  },
  created() {},
  mounted() {
    var ymd = moment().format("YYYY-MM-DD");
    // 接处警数据获取
    this.concactPolice_gd({
      id: this.operationId,
      type: "Y"
    });
  },
  methods: {
    // 接触警数据获取
    concactPolice_gd(options) {
      this.axios({
        method: "post",
        url: "/org/alarmReceivalData/" + options.id,
        params: { type: options.type }
      }).then(res => {
        if (res.status == 200) {
          var data = res.data.result;
          if (data) {
            // console.log(data, "data");
            this.carInfoFun(data);
          }
        } else {
          console.log("请求错误");
        }
      });
    },

    //人员数据
    carInfoFun(val) {
      let carInfoCanvas = this.$refs.carInfoCanvas;

      // console.log(carInfoCanvas, "79234280284308");
      this.keyUnitChart = echarts.init(carInfoCanvas);
      var data = val;
      // var data = [
      //   {
      //     name: "火灾扑救",
      //     value: 100
      //   },
      //   {
      //     name: "抢险救援",
      //     value: 200
      //   },
      //   {
      //     name: "社会救助",
      //     value: 300
      //   },
      //   {
      //     name: "公务执勤",
      //     value: 60
      //   },
      //   {
      //     name: "反恐排爆",
      //     value: 50
      //   },
      //   {
      //     name: "其他出动",
      //     value: 300
      //   }
      // ];
      var xData = [],
        yData = [];
      var min = 0;
      data &&
        data.map(function(a, b) {
          xData.push(a.name);
          if (a.num === 0) {
            yData.push(a.num + min);
          } else {
            yData.push(a.num);
          }
        });

      let option = {
        backgroundColor: "transparent",
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
            lineStyle: {
              opacity: 0
            }
          },
          formatter: function(prams) {
            // if (prams[0].data === min) {
            //     return "合格率：0%"
            // } else {
            //     return "合格率：" + prams[0].data + "%"
            // }
            return prams[0].data;
          }
        },
        legend: {
          data: ["直接访问", "背景"],
          show: false
        },
        grid: {
          left: 5,
          right: 20,
          bottom: 20,
          top: 50,
          height: "75%",
          containLabel: true,
          z: 22
        },
        xAxis: [
          {
            type: "category",
            gridIndex: 0,
            nameGap: 0,
            data: xData,
            splitLine: {
              show: true,
              lineStyle: {
                color: "#0a2646"
              }
            },
            axisTick: {
              alignWithLabel: false
            },
            axisLine: {
              lineStyle: {
                color: "#0c3b71"
              }
            },
            axisLabel: {
              show: true,
              color: "#ccced3",
              fontSize: 12,
              margin: 10
            }
          }
        ],
        yAxis: [
          {
            name: "(次)",
            nameTextStyle: {
              color: "#fff",
              padding: [0, 0, 0, -40]
            },
            type: "value",
            gridIndex: 0,
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            min: min,
            max: 600,
            axisLine: {
              lineStyle: {
                color: "#0c3b71"
              }
            },
            axisLabel: {
              color: "rgb(170,170,170)",
              formatter: "{value} "
            }
          },
          {
            type: "value",
            gridIndex: 0,
            splitNumber: 20,
            splitLine: {
              show: true,
              lineStyle: {
                color: "#07274b"
              }
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitArea: {
              show: false,
              areaStyle: {
                color: ["rgba(250,250,250,0.0)", "rgba(250,250,250,0.05)"]
              }
            }
          }
        ],
        series: [
          {
            name: "填充",
            type: "bar",
            barWidth: 22,
            xAxisIndex: 0,
            yAxisIndex: 0,
            itemStyle: {
              normal: {
                barBorderRadius: 0,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#08c1c8"
                  },
                  {
                    offset: 0.7,
                    color: "#164760"
                  },
                  {
                    offset: 1,
                    color: "#1b2f49"
                  }
                ])
              }
            },
            data: yData,
            zlevel: 11
          },
          {
            name: "背景",
            type: "bar",
            barWidth: 22,
            xAxisIndex: 0,
            yAxisIndex: 1,
            barGap: "-100%",
            data: [100, 100, 100, 100, 100, 100, 100],
            itemStyle: {
              normal: {
                color: "rgba(255,255,255,0.1)"
              }
            },
            zlevel: 9
          }
        ]
      };

      this.keyUnitChart.setOption(option);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
