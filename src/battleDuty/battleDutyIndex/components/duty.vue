<template>
  <div id="duty" ref="domChart" style="width:100%;height:100%;">
    
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
    this.renerWaringInfo();
  },
  methods: {
  	    // 执勤值班
    renerWaringInfo() {
      let dom = this.$refs.domChart;
      this.dutyChart = echarts.init(dom);
      var category = [
        "保障助理",
        "政工助理",
        "宣传助理",
        "通信助理",
        "作战助理",
        "指挥长",
        "值班领导"
      ];
      // var barData = [0, ~~(Math.random() * 100), ~~(Math.random() * 100), ~~(Math.random() * 100), ~~(Math.random() * 100)];
      var barData = [100, 200, 300, 400, 500, 700, 800];
      var lineData = [1500, 1500, 1500, 1500, 1500, 1500, 1500];
      // barData处理形式
      let option = {
        color: ["#43d3ff"],
        grid: {
          top: "4%",
          left: "3%",
          right: "20%",
          bottom: "4%",
          containLabel: true
        },
        xAxis: {
          type: "value",
          show: false,
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: "category",
          // y轴的字体样式
          axisLabel: {
            show: true,
            textStyle: {
              color: "#03b0d8",
              fontSize: "16px"
            }
          },
          axisLine: {
            show: false
          },
          data: category
        },
        series: [
          // 底层
          {
            name: "",
            type: "pictorialBar",
            data: lineData,
            symbol: "rect",
            symbolOffset: [0, -5],
            symbolMargin: 0.5,
            itemStyle: {
              normal: {
                color: "transparent",
                borderColor: "#02eeff",
                borderWidth: "0.5",
                borderType: "solid"
              }
            },

            z: -11,
            symbolRepeat: "fixed",
            symbolSize: [8, 12],

            animationEasing: "elasticOut",
            animationDelay: function(dataIndex, params) {
              return params.index * 30;
            }
          },
          // 覆盖层
          {
            type: "pictorialBar",
            data: barData,
            // 设置子项的形状及样式
            symbol: "rect",
            barWidth: "10px",
            symbolSize: [8, 12],
            symbolRepeat: true,
            symbolMargin: 0.5,

            // 标签值
            label: {
              normal: {
                show: true,
                color: "#65f2ea",
                position: "left",
                offset: [280, 3],
                color: "#65f2ea",
                fontSize: 18
              }
            },
            // 设置横条的样式
            itemStyle: {
              normal: {
                barBorderRadius: 5,
                borderWidth: "0.5",
                borderColor: "#000",
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  1,
                  0,
                  [
                    {
                      offset: 0,
                      color: "#32cfbe"
                    },
                    {
                      offset: 0.8,
                      color: "#00ff58"
                    }
                  ],
                  false
                )
              }
            }
          }
        ]
      };
      this.dutyChart.setOption(option);
    },
 
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
