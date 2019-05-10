<template>
  <div id="pieOne" ref="pieOne" style="width:100%;height:100%;">
    <h1>中国</h1>
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
      dutyData: [
        {
          name: "指挥长",
          value: 10
        },
        {
          name: "指挥员",
          value: 10
        },
        {
          name: "消防长",
          value: 10
        },
        {
          name: "消防员",
          value: 10
        }
      ]
    };
  },
  created() {},
  mounted() {
    this.peopleData();
  },
  methods: {
    //人员数据
    peopleData() {
      let pieOne = this.$refs.pieOne;
      this.keyUnitChart = echarts.init(pieOne);
      let option = {
        color: [
          "#00ffff",
          "#fa9c59",
          "#fcfc61",
          "#6bfa6b",
          "#585247",
          "#7F6AAD",
          "#009D85",
          "rgba(250,250,250,0.3)"
        ],
        grid: {},
        legend: {
          orient: "horizontal",
          // right: "",
          // top: "bottom",
          bottom: 10,
          itemWidth: 6,
          itemHeight: 6,
          formatter: name => {
            let data = this.dutyData;
            let total = 0;
            let target;
            for (let i = 0, l = data.length; i < l; i++) {
              total += data[i].value;
              if (data[i].name == name) {
                target = data[i].value;
              }
            }
            let arr = ["{a|" + name + "}", "{b|" + target * 10 + "}"];
            return arr.join("\n");
          },
          textStyle: {
            color: "#fff",
            rich: {
              a: {
                width: 60,
                lineHeight: 50,
                fontSize: 16,
                color: function() {},
                verticalAlign: "bottom"
              },
              b: {
                lineHeight: 30,
                fontSize: 24,
                fontFamily: "ROME",
                color: function() {},
                verticalAlign: "bottom"
              }
            }
          },
          icon: "roundRect",
          data: this.dutyData
        },
        series: [
          // 主要展示层的
          {
            radius: ["45%", "50%"],
            center: ["50%", "40%"],
            type: "pie",
            itemStyle: {
              shadowBlur: 30,
              shadowColor: "#00ccff"
            },
            label: {
              normal: {
                show: true,
                formatter: "{c}%",
                textStyle: {
                  fontSize: 16
                },
                position: "outside"
              },
              emphasis: {
                show: true
              }
            },
            labelLine: {
              normal: {
                show: true,
                length: 20,
                length2: 25
              },
              emphasis: {
                show: true
              }
            },
            name: "民警训练总量",
            data: this.dutyData
          },
          // 边框的设置
          {
            radius: ["37%", "38%"],
            center: ["50%", "40%"],
            type: "pie",
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            animation: false,
            tooltip: {
              show: false
            },
            data: [
              {
                value: 1,
                itemStyle: {
                  borderWidth: 1,
                  color: "#00ccff"
                }
              }
            ]
          },
          {
            name: "外边框",
            type: "pie",
            clockWise: false, //顺时加载
            hoverAnimation: false, //鼠标移入变大
            center: ["50%", "40%"],
            radius: ["58%", "59%"],
            label: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: 9,
                name: "",
                itemStyle: {
                  normal: {
                    borderWidth: 1,
                    borderColor: "#00ccff"
                  }
                }
              }
            ]
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
