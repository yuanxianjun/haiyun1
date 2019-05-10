<template>
  <div id="pieOne" ref="pieOne" style="width:100%;height:100%;"></div>
</template>
<script>
import echarts from "echarts";
export default {
  name: "vuePie",
  props: {
    tendency: Array
  },
  data() {
    return {
      xData: [],
      yData: [],
      cityId: "52"
    };
  },
  created() {},
  mounted() {},
  methods: {
    // 火灾趋势分析
    fireFrend_gd(options) {
      this.axios({
        method: "post",
        url: "/fireFighting/tendency/",
        params: options
      }).then(res => {
        if (res.status == 200) {
          if (res.data.result) {
            var data = res.data.result;
            this.tendData = data;
            this.peopleData(data);
          }
        } else {
          console.log("请求错误");
        }
      });
    },
    //折线图
    peopleData(val) {
      let pieOne = this.$refs.pieOne;
      this.keyUnitChart = echarts.init(pieOne);
      this.xData = val.xList;
      this.yData = val.yList;

      let option = {
        title: {},
        tooltip: {
          trigger: "axis",
          axisPointer: {
            lineStyle: {
              color: "#02EEFF"
            }
          }
        },
        legend: {},
        grid: {
          left: "3%",
          right: "4%",
          bottom: 20,
          top: 20,
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              show: true,
              color: "#03B0D8",
              fontFamily: "ROME"
            },
            data: this.xData
          }
        ],
        yAxis: [
          {
            type: "value",
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              show: true,
              color: "#03B0D8",
              fontFamily: "ROME"
            },
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 3
              }
            },
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
                      color: "#02EEFF"
                    },
                    {
                      offset: 0.8,
                      color: "rgba(255,255,255,0)"
                    }
                  ],
                  false
                ),
                shadowBlur: 10,
                opacity: 0.3
              }
            },
            itemStyle: {
              normal: {
                color: "#02EEFF",
                itemWidth: 10,
                width: 10,
                borderWidth: 10
              }
            },
            data: this.yData
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
