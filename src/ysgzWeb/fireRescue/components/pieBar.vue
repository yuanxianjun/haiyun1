<template>
  <div style="margin-top: 10px;">
    <el-col :span="12" id="pieBar" ref="pieBar" style="width:220px;height: 190px;"></el-col>
    <el-col :span="12" id="pieBar2" ref="pieBar2" style="width:220px;height: 190px;"></el-col>
    <el-col>
      <el-col class="pie_text" :span="12">火灾扑救</el-col>
      <el-col class="pie_text" :span="12">抢险救援</el-col>
    </el-col>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  name: "vuePie",
  props: ["renderData"],
  data() {
    return {};
  },
  watch: {
    renderData: function(newVal, oldVal) {
      if (newVal) {
        this.getPie(newVal.fireFighting);
        this.getPie2(newVal.fireRescuing);
      }
    }
  },
  created() {},
  mounted() {
    this.getPie(this.renderData.fireFighting);
    this.getPie2(this.renderData.fireRescuing);
    // console.log(this.renderData, "查询到的数据");
  },
  methods: {
    getPie(val) {
      var myChart = echarts.init(document.getElementById("pieBar"));
      var val_data = [];
      var data = [];
      if (val) {
        val.map(item => {
          if (item.name == "1") {
            val_data[0] = item.num;
          } else if (item.name == "2") {
            val_data[1] = item.num;
          } else if (item.name == "3") {
            val_data[2] = item.num;
          } else if (item.name == "4") {
            val_data[3] = item.num;
          } else if (item.name == "5") {
            val_data[4] = item.num;
          }
        });
      }
      var option = {
        angleAxis: {
          interval: 1,
          type: "category",
          data: ["一级", "二级", "三级", "四级", "五级"],
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#00c7ff",
              width: 1,
              type: "solid"
            }
          },
          axisLabel: {
            interval: 0,
            show: true,
            color: "white",
            margin: 1,
            padding: 9,
            fontSize: 14
          }
        },
        radiusAxis: {
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        polar: {
          radius: 72
        },
        tooltip: {
          show: true,
          trigger: "item",
          // formatter: "{b0}<br />{c0}",
          formatter: function(par) {
            // return "{nameTit|" + par.name + "\n}{valueCont| " + par.value + "}";
            var res = "";
            res = `<span style="color:yellow;font-size:12px;">${
              par.name
            }:</span><span style="color:yellow;font-size:18px;"> ${
              par.value
            }</span>`;
            return res;
          }
        },
        // rich: {
        //   nameTit: {
        //     color: "red",
        //     fontSize: 14
        //   },
        //   valueCont: {
        //     color: "blue",
        //     fontSize: 30,
        //     fontFamily: "ROME"
        //   }
        // },
        series: [
          {
            type: "bar",
            data: [
              {
                value: val_data[0],
                itemStyle: {
                  normal: {
                    color: "#0E6DE9"
                  }
                }
              },
              {
                value: val_data[1],
                itemStyle: {
                  normal: {
                    color: "#FFFF00"
                  }
                }
              },
              {
                value: val_data[2],
                itemStyle: {
                  normal: {
                    color: "#FF0000"
                  }
                }
              },
              {
                value: val_data[3],
                itemStyle: {
                  normal: {
                    color: "#E6AF08"
                  }
                }
              },
              {
                value: val_data[4],
                itemStyle: {
                  normal: {
                    color: "#009944"
                  }
                }
              }
            ],
            coordinateSystem: "polar"
          },
          {
            type: "pie",
            radius: ["84%", "85%"],
            data: [
              {
                value: 1
              }
            ],
            itemStyle: {
              color: "#00FCFD"
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            hoverOffset: 0,
            tooltip: {
              show: false
            }
          }
        ]
      };
      myChart.setOption(option);
    },
    getPie2(val) {
      var myChart2 = echarts.init(document.getElementById("pieBar2"));
      var val_data = [];
      if (val) {
        val.map(item => {
          if (item.name == "1") {
            val_data[0] = item.num;
          } else if (item.name == "2") {
            val_data[1] = item.num;
          } else if (item.name == "3") {
            val_data[2] = item.num;
          } else if (item.name == "4") {
            val_data[3] = item.num;
          } else if (item.name == "5") {
            val_data[4] = item.num;
          }
        });
      }
      var option2 = {
        angleAxis: {
          interval: 1,
          type: "category",
          data: ["一级", "二级", "三级", "四级"],
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#00c7ff",
              width: 1,
              type: "solid"
            }
          },
          axisLabel: {
            interval: 0,
            show: true,
            color: "white",
            padding: 9,
            margin: 1,
            fontSize: 14
          }
        },
        radiusAxis: {
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        polar: {
          radius: 72
        },
        tooltip: {
          show: true,
          trigger: "item",
          // formatter: "{b0}<br />{c0}"
          formatter: function(par) {
            // return "{nameTit|" + par.name + "\n}{valueCont| " + par.value + "}";
            var res = "";
            res = `<span style="color:yellow;font-size:12px;">${
              par.name
            }:</span><span style="color:yellow;font-size:18px;"> ${
              par.value
            }</span>`;
            return res;
          }
        },
        series: [
          {
            type: "bar",
            data: [
              {
                value: val_data[0],
                itemStyle: {
                  normal: {
                    color: "#0E6DE9"
                  }
                }
              },
              {
                value: val_data[1],
                itemStyle: {
                  normal: {
                    color: "#FFFF00"
                  }
                }
              },
              {
                value: val_data[2],
                itemStyle: {
                  normal: {
                    color: "#FF0000"
                  }
                }
              },
              {
                value: val_data[3],
                itemStyle: {
                  normal: {
                    color: "#E6AF08"
                  }
                }
              }
            ],
            coordinateSystem: "polar"
          },
          {
            type: "pie",
            radius: ["84%", "85%"],
            data: [
              {
                value: 1
              }
            ],
            itemStyle: {
              color: "#00FCFD"
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            hoverOffset: 0,
            tooltip: {
              show: false
            }
          }
        ]
      };
      myChart2.setOption(option2);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.pie_text {
  font-size: 18px;
  color: rgba(3, 176, 216, 1);
  line-height: 21px;
  text-align: center;
  margin-top: 15px;
}
</style>
