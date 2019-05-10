<template>
  <div id="pieOne" ref="pieOne" style="width:100%;height:260px">
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
          name: "防护类",
          value: 192
        },
        {
          name: "探测类",
          value: 189
        },
        {
          name: "破拆类",
          value: 118
        },
        {
          name: "保障类",
          value: 210
        },
        {
          name: "通信类",
          value: 221
        },
        {
          name: "照明类",
          value: 122
        },
        {
          name: "救生类",
          value: 222
        }
      ],
      operationId: "0f9f0fa95213451cb98cc93e7e04ce76",
      beiqinData: {}
    };
  },
  created() {
    this.zhuangbei_gd(this.operationId);
  },
  mounted() {},
  methods: {
    // 装备信息获取
    zhuangbei_gd(id) {
      this.axios({
        method: "post",
        url: "/org/equipmentInfo/" + id
      }).then(res => {
        if (res.status == 200) {
          var data = [];
          if (res.data.result) {
            data = res.data.result;
            this.beiqinData = data;
            this.peopleData(data);
          }
        } else {
          console.log("请求错误");
        }
      });
    },
    //人员数据
    peopleData(val) {
      let pieOne = this.$refs.pieOne;
      this.keyUnitChart = echarts.init(pieOne);
      var data = [];
      if (val) {
        this.dutyData.forEach(item => {
          if (item.name == "防护类") {
            item.value = val.countFH;
          } else if (item.name == "探测类") {
            item.value = val.countTC;
          } else if (item.name == "破拆类") {
            item.value = val.countPC;
          } else if (item.name == "保障类") {
            item.value = val.countBZ;
          } else if (item.name == "通信类") {
            item.value = val.countTX;
          } else if (item.name == "照明类") {
            item.value = val.countZM;
          } else if (item.name == "救生类") {
            item.value = val.countJS;
          }
        });
      }
      let option = {
        color: [
          "#45ffac",
          "#80c269",
          "#00ffff",
          "#00a0e9",
          "#7ecef4",
          "#448aca",
          "#facd89"
        ],
        grid: {
          top: 10,
          bottom: 0,
          left: 0,
          right: 0,
          height: 195
        },
        series: [
          // 主要展示层的
          {
            radius: ["30%", "35%"],
            center: ["50%", "40%"],
            type: "pie",
            itemStyle: {
              shadowBlur: 30,
              shadowColor: "#00ccff"
            },
            label: {
              normal: {
                show: true,
                formatter: function(params) {
                  // console.log(params.name, params.value);
                  var value =
                    "{fang|" +
                    "■ }" +
                    "{white|" +
                    params.name +
                    "}\n{yellow|" +
                    params.value +
                    "}";
                  return value;
                },
                rich: {
                  fang: {
                    // color: "#fff",
                    fontSize: 10
                  },
                  yellow: {
                    color: "#45ffac",
                    fontSize: 18,
                    fontFamily: "ROME",
                    padding: 4
                  },
                  white: {
                    color: "#fff",
                    fontSize: 14
                  }
                },
                // textStyle: {
                //   color: "#45ffac",
                //   fontSize: 24,
                //   fontFamily: "ROME"
                // },
                position: "outside"
              },

              emphasis: {
                show: true
              }
            },
            labelLine: {
              normal: {
                show: true,
                length: 30,
                length2: 40,
                lineStyle: {
                  type: "dashed"
                }
              },

              emphasis: {
                show: true
              }
            },
            name: "装备信息",
            data: this.dutyData
          },
          // 边框的设置
          {
            radius: ["24%", "26%"],
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
            radius: ["40%", "41%"],
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
