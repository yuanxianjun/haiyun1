<template>
  <div id="duty" ref="domChart" style="width:100%;height:100%;"></div>
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
      var fillImg =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALMAAAAMCAYAAAApiIxTAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkY2NzM2QkYwNEVFMTExRTk5QjY1RkI2RTZGN0Y3NTQwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkY2NzM2QkYxNEVFMTExRTk5QjY1RkI2RTZGN0Y3NTQwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RjY3MzZCRUU0RUUxMTFFOTlCNjVGQjZFNkY3Rjc1NDAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RjY3MzZCRUY0RUUxMTFFOTlCNjVGQjZFNkY3Rjc1NDAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6xbnPnAAAAnElEQVR42uzSSwqDMBhF4fwh8YFTofvo/ukWuhMpisZqTesKcjuW802cXIIhx+7Px9cVvHKy81Pc3BqTm8ktctPX+py2neUmhF1uqrjJjfeH3BxB3yvmRm52v8pN7aKlT1e+ezXot4hvuTlZsq24mU2fM5ruZ8zLX/8z+bX8Xg64CGIGMQPEDBAzQMwgZoCYAWIGiBkgZlzJT4ABAE0kM3hb9XUtAAAAAElFTkSuQmCC";
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
          show: false
        },
        yAxis: {
          type: "category",
          // y轴的字体样式
          axisLabel: {
            show: true,
            textStyle: {
              color: "#03b0d8",
              fontSize: 16
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
            symbolOffset: [10, -2],
            symbolMargin: 0.7,
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
            symbolOffset: [10, -2],
            symbol: "image://" + fillImg,
            // barWidth: 12,
            symbolClip: true,
            symbolSize: ["90%", 12],
            symbolBoundingData: 1500,
            // symbolMargin: 0.5,

            // 标签值
            label: {
              normal: {
                show: true,
                color: "#65f2ea",
                position: "left",
                offset: [270, -2],
                color: "#65f2ea",
                fontFamily: "ROME",
                fontSize: 18
              }
            }
          }
        ]
      };
      this.dutyChart.setOption(option);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../../common/styles/font.css";
#duty {
  font-family: "ROME";
}
</style>
