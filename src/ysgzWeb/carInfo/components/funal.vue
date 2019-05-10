<template>
  <div id="funnal" ref="pieOne" style="width:100%;height:100%;"></div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "vuePie",
  props: {
    msg: String
  },
  data() {
    return {};
  },
  created() {},
  mounted() {
    this.peopleData();
  },
  methods: {
    //人员数据
    peopleData() {
      let pieOne = this.$refs.pieOne;

      console.log(pieOne, "79234280284308");
      this.keyUnitChart = echarts.init(pieOne);
      var colorList = [
        "#f75757",
        "#f9cb3f",
        "#27c24c",
        "#2cdafc",
        "#23a2f5",
        "#f75757"
      ];
      let option = {
        tooltip: {
          show: false,
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}%"
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
                fontSize: 20
              },
              data: [
                [
                  { x: "33%", y: "20%" },
                  {
                    x: "60%",
                    y: "20%",
                    value: "支队" + " " + "375",
                    fontSize: 20,
                    lineStyle: {
                      color: colorList[0]
                    }
                  }
                ],
                [
                  { x: "30%", y: "35%" },
                  {
                    x: "60%",
                    y: "35%",
                    value: "大队" + " " + "375",
                    lineStyle: { color: colorList[1] }
                  }
                ],
                [
                  { x: "40%", y: "50%" },
                  {
                    x: "60%",
                    y: "50%",
                    value: "中队" + " " + "375",
                    lineStyle: { color: colorList[2] }
                  }
                ],
                [
                  { x: "40%", y: "63%" },
                  {
                    x: "60%",
                    y: "63%",
                    value: "微型消防站" + "375",
                    lineStyle: { color: colorList[3] }
                  }
                ],
                [
                  { x: "40%", y: "78%" },
                  {
                    x: "60%",
                    y: "78%",
                    value: "企业专职队" + "375",

                    lineStyle: {
                      color: colorList[4]
                    }
                  }
                ]
              ]
            },
            data: [
              { value: 1, name: "5%" },
              { value: 2, name: "10%" },
              { value: 3, name: "15%" },
              { value: 4, name: "20%" },
              { value: 5, name: "30%" }
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
