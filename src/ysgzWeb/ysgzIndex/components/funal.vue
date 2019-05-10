<template>
  <div id="funnal" ref="pieOne" style="width:100%;height:100%;"></div>
</template>

<script>
import echarts from "echarts";

export default {
  name: "vuePie",
  props: {
    jgyx: {
      中队: 0,
      企业专职队: 0,
      大队: 0,
      政府专职队: 0,
      微型消防站: 0,
      支队: 0
    }
  },
  data() {
    return {
      jigoudata: {}
    };
  },
  created() {},
  mounted() {
    var data = JSON.parse(this.jgyx);
    this.jigouCanvas(data);
  },
  methods: {
    // 渲染canvas
    jigouCanvas(val) {
      let pieOne = this.$refs.pieOne;
      this.keyUnitChart = echarts.init(pieOne);
      var colorList = [
        "#bfeb6a",
        "#ffa100",
        "#fa7a01",
        "#ff5700",
        "#128d8a",
        "#007a3d"
      ];
      var numList = [],
        sumAll = 0,
        dataObject = [];
      for (var i in val) {
        if (i !== "code") {
          numList.push(val[i]);
        }
      }
      sumAll = eval(numList.join("+"));

      function splitBai(i) {
        return ((i / sumAll) * 100).toFixed(0) + "%";
      }
      for (var i in val) {
        if (i == "支队") {
          dataObject[0] = { value: 1, name: splitBai(val[i]) };
        } else if (i == "大队") {
          dataObject[1] = { value: 2, name: splitBai(val[i]) };
        } else if (i == "中队") {
          dataObject[2] = { value: 3, name: splitBai(val[i]) };
        } else if (i == "政府专职队") {
          dataObject[3] = { value: 4, name: splitBai(val[i]) };
        } else if (i == "企业专职队") {
          dataObject[4] = { value: 5, name: splitBai(val[i]) };
        } else if (i == "微型消防站") {
          dataObject[5] = { value: 6, name: splitBai(val[i]) };
        } else {
          // dataObject[3] = { value: 4, name: splitBai(val[i]) };
        }
      }

      let option = {
        tooltip: {
          show: false,
          trigger: "item"
        },

        legend: {
          show: false,
          textStyle: {
            color: "#fff"
          }
        },
        calculable: true,
        color: colorList,
        series: [
          {
            name: "漏斗图",
            type: "funnel",
            left: "10%",
            right: "45%",
            top: "15%",
            bottom: "15%",

            minSize: "0%",
            maxSize: "100%",

            sort: "ascending",
            gap: 0,
            label: {
              show: true,
              position: "inside",
              fontSize: 16,
              fontFamily: "ROME"
            },
            labelLine: {
              length: 50,
              lineStyle: {
                width: 1,
                type: "solid"
              }
            },
            itemStyle: {
              borderColor: "none",
              borderWidth: 0
            },
            emphasis: {
              label: {
                fontSize: 16
              }
            },
            markLine: {
              symbol: "none",
              lineStyle: { type: "solid" },
              label: {
                position: "end",
                fontFamily: "ROME",
                fontSize: 16
              },
              data: [
                [
                  { x: "33%", y: "20%" },
                  {
                    x: "60%",
                    y: "20%",
                    value: "支队" + " " + val["支队"],
                    fontSize: 16,
                    lineStyle: {
                      color: colorList[0]
                    }
                  }
                ],
                [
                  { x: "38%", y: "35%" },
                  {
                    x: "60%",
                    y: "35%",
                    fontSize: 16,
                    value: "大队" + " " + val["大队"],
                    lineStyle: { color: colorList[1] }
                  }
                ],
                [
                  { x: "40%", y: "45%" },
                  {
                    x: "60%",
                    y: "45%",
                    fontSize: 16,
                    value: "中队" + " " + val["中队"],
                    lineStyle: { color: colorList[2] }
                  }
                ],
                [
                  { x: "40%", y: "56%", fontSize: 18 },
                  {
                    x: "60%",
                    y: "56%",
                    fontSize: 16,
                    value: "政府专职队" + " " + val["政府专职队"],
                    lineStyle: { color: colorList[3] }
                  }
                ],
                [
                  { x: "40%", y: "67%", fontSize: 18 },
                  {
                    x: "60%",
                    y: "67%",
                    fontSize: 16,
                    value: "企业专职队" + " " + val["政府专职队"],
                    lineStyle: { color: colorList[4] }
                  }
                ],
                [
                  { x: "40%", y: "78%" },
                  {
                    x: "60%",
                    y: "78%",
                    value: "微型消防站" + " " + val["微型消防站"],
                    lineStyle: {
                      color: colorList[5]
                    }
                  }
                ]
              ]
            },
            data: dataObject
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
