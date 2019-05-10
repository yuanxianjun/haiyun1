<template>
  <div>
    <div class="fenl_left">
      <div id="funnal" ref="pieOne" style="width:100%;height:220px;"></div>
    </div>
    <div class="fenl_left">
      <div id="funnala" ref="pieOnea" style="width:100%;height:220px;"></div>
    </div>
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
      siteAndFireCauseData: []
    };
  },
  created() {},
  mounted() {},
  methods: {
    // 火灾场所和火灾原因分析
    siteAndFireCauseData_gd(options) {
      this.axios({
        method: "post",
        url: "/fireFighting/siteAndFireCause",
        data: options
      }).then(res => {
        if (res.status == 200) {
          if (res.data.result) {
            var data = res.data.result;
            this.siteAndFireCauseData = data;
            console.log(data, "火灾场所和火灾原因分析");
            this.peopleData(data.site);
            this.peopleDataa();
          }
        } else {
          console.log("请求错误");
        }
      });
    },
    //渲染页面
    peopleData(val) {
      function toFix(num) {
        if (num) {
          return parseInt(num).toFixed(0);
        }
      }
      let pieOne = this.$refs.pieOne;
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
            left: "0",
            right: "45%",
            top: "15%",
            bottom: "15%",
            minSize: "70%",
            maxSize: "0%",
            sort: "ascending",
            gap: 0,
            label: {
              show: true,
              position: "inside",
              fontSize: 10,
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
                fontSize: 19
              }
            },
            markLine: {
              symbol: "none",
              lineStyle: { type: "solid" },
              label: {
                position: "end",
                fontFamily: "ROME",
                fontSize: 12,
                color: "#03B0D8"
              },
              data: [
                [
                  { x: "50%", y: "20%" },
                  {
                    x: "52%",
                    y: "20%",
                    value: val[0].name + " " + toFix(val[0].num) + "%",
                    fontSize: 20,
                    lineStyle: { width: 4, color: colorList[0] }
                  }
                ],
                [
                  { x: "50%", y: "35%" },
                  {
                    x: "52%",
                    y: "35%",
                    value: val[1].name + " " + toFix(val[1].num) + "%",
                    fontSize: 20,
                    lineStyle: { width: 4, color: colorList[1] }
                  }
                ],
                [
                  { x: "50%", y: "50%" },
                  {
                    x: "52%",
                    y: "50%",
                    value: val[2].name + " " + toFix(val[2].num) + "%",
                    fontSize: 20,
                    lineStyle: { width: 4, color: colorList[2] }
                  }
                ],
                [
                  { x: "50%", y: "63%" },
                  {
                    x: "52%",
                    y: "63%",
                    value: val[3].name + " " + toFix(val[3].num) + "%",
                    fontSize: 20,
                    lineStyle: { width: 4, color: colorList[3] }
                  }
                ],
                [
                  { x: "50%", y: "78%" },
                  {
                    x: "52%",
                    y: "78%",
                    value: val[4].name + " " + toFix(val[4].num) + "%",
                    fontSize: 20,
                    lineStyle: { width: 4, color: colorList[4] }
                  }
                ]
              ]
            },
            data: [
              { value: 1, name: "" },
              { value: 2, name: "" },
              { value: 3, name: "" },
              { value: 4, name: "" },
              { value: 5, name: "" }
            ]
          }
        ]
      };
      this.keyUnitChart.setOption(option);
    },
    //人员数据
    peopleDataa() {
      let pieOnea = this.$refs.pieOnea;
      this.keyUnitChart = echarts.init(pieOnea);
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
            left: "0%",
            right: "45%",
            top: "15%",
            bottom: "15%",
            minSize: "70%",
            maxSize: "0%",
            sort: "ascending",
            gap: 0,
            label: {
              show: true,
              position: "inside",
              fontSize: 10,
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
                fontSize: 12,
                color: "#03B0D8"
              },
              data: [
                [
                  { x: "50%", y: "20%" },
                  {
                    x: "52%",
                    y: "20%",
                    value: "电气火灾" + " " + "45%",
                    fontSize: 20,
                    lineStyle: { width: 4, color: colorList[0] }
                  }
                ],
                [
                  { x: "50%", y: "35%" },
                  {
                    x: "52%",
                    y: "35%",
                    value: "其他" + " " + "10%",
                    fontSize: 20,
                    lineStyle: { width: 4, color: colorList[1] }
                  }
                ],
                [
                  { x: "50%", y: "50%" },
                  {
                    x: "52%",
                    y: "50%",
                    value: "生活用火不慎" + " " + "25%",
                    fontSize: 20,
                    lineStyle: { width: 4, color: colorList[2] }
                  }
                ],
                [
                  { x: "50%", y: "63%" },
                  {
                    x: "52%",
                    y: "63%",
                    value: "人为原因" + " " + "10%",
                    fontSize: 20,
                    lineStyle: { width: 4, color: colorList[3] }
                  }
                ],
                [
                  { x: "50%", y: "78%" },
                  {
                    x: "52%",
                    y: "78%",
                    value: "生活作业类" + " " + "10%",
                    fontSize: 20,
                    lineStyle: { width: 4, color: colorList[4] }
                  }
                ]
              ]
            },
            data: [
              { value: 1, name: "" },
              { value: 2, name: "" },
              { value: 3, name: "" },
              { value: 4, name: "" },
              { value: 5, name: "" }
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
.fenl_left {
  width: 50%;
  float: left;
}
</style>
