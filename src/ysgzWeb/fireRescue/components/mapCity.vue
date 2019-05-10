<template>
  <div class="map_back">
    <div id="mapCity" style="width:100%;height:620px;"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import $ from "jquery";
import guizhou from "@/common/guizhouJson/guizhousheng.json";
import anshunshi from "@/common/guizhouJson/anshunshi.json";
import bijieshi from "@/common/guizhouJson/bijieshi.json";
import guiyangshi from "@/common/guizhouJson/guiyangshi.json";
import liupanshuishi from "@/common/guizhouJson/liupanshuishi.json";
import qiandongnan from "@/common/guizhouJson/qiandongnan.json";
import qiannanbu from "@/common/guizhouJson/qiannanbu.json";
import qianxinan from "@/common/guizhouJson/qianxinan.json";
import tongrenshi from "@/common/guizhouJson/tongrenshi.json";
import zunyishi from "@/common/guizhouJson/zunyishi.json";

export default {
  data() {
    return {};
  },
  created() {},
  mounted() {
    this.renderMap();
  },
  methods: {
    renderMap(url) {
      var _this = this;
      echarts.registerMap("贵州", guizhou);
      var myChart = _this.extendsMap(echarts, "mapCity", {
        bgColor: "transparent", // 画布背景色
        mapName: "贵州", // 地图名
        goDown: true, // 是否下钻
        // 下钻回调
        callback: function(name, option, instance) {
          // console.log(name, option, instance);
        },
        // 数据展示
        data: [
          {
            name: "黔南",
            value: 10,
            level: 1
          },
          {
            name: "铜仁",
            value: 12,
            level: 2
          },
          {
            name: "黔东南",
            value: 11,
            level: 3
          },
          {
            name: "赣州",
            value: 16,
            level: 2
          },
          {
            name: "遵义",
            value: 12,
            level: 1
          }
        ]
      });
    },
    extendsMap(echarts, id, opt) {
      // 实例
      var chart = echarts.init(document.getElementById(id));

      var curGeoJson = {};
      var cityMap = {
        黔南: qiannanbu,
        铜仁市: tongrenshi,
        黔东南: qiandongnan,
        黔西南: qianxinan,
        贵阳市: guiyangshi,
        安顺市: anshunshi,
        遵义市: zunyishi,
        毕节市: bijieshi,
        六盘水市: liupanshuishi
      };
      var geoCoordMap = {
        黔南: [115.89, 28.48],
        铜仁: [117.28, 29.09],
        黔东南: [113.93, 27.41],
        黔西南: [115.97, 29.51],
        贵阳: [114.81, 27.72],
        安顺: [117.12, 28.1],
        赣州: [115.04, 25.67],
        遵义: [115.05, 26.88],
        毕节: [114.41, 28.03],
        抚州: [116.45, 27.79],
        六盘水: [117.92, 28.22]
      };
      var levelColorMap = {
        "1": "rgba(241, 109, 115, .8)",
        "2": "rgba(255, 235, 59, .7)",
        "3": "rgba(147, 235, 248, 1)"
      };

      var defaultOpt = {
        mapName: "guizhou", // 地图展示
        goDown: false, // 是否下钻
        bgColor: "#404a59", // 画布背景色
        activeArea: [], // 区域高亮,同echarts配置项
        data: [],
        // 下钻回调(点击的地图名、实例对象option、实例对象)
        callback: function(name, option, instance) {}
      };
      if (opt) opt = echarts.util.extend(defaultOpt, opt);

      // 层级索引
      var name = [opt.mapName];
      var idx = 0;
      var pos = {
        leftPlus: 20,
        leftCur: 50,
        left: 0,
        top: 60
      };

      var line = [[0, 0], [8, 11], [0, 22]];
      // style
      var style = {
        font: '18px "Microsoft YaHei", sans-serif',
        textColor: "#eee",
        lineColor: "rgba(147, 235, 248, .8)"
      };

      var handleEvents = {
        /**
         * i 实例对象
         * o option
         * n 地图名
         **/
        resetOption: function(i, o, n) {
          var breadcrumb = this.createBreadcrumb(n);

          var j = name.indexOf(n);
          var l = o.graphic.length;
          if (j < 0) {
            o.graphic.push(breadcrumb);
            o.graphic[0].children[0].shape.x2 = 20 * n.length + 80;
            o.graphic[0].children[1].shape.x2 = 20 * n.length + 80;
            if (o.graphic.length > 2) {
              for (var x = 0; x < opt.data.length; x++) {
                if (n === opt.data[x].name + "市") {
                  break;
                } else o.series[0].data = [];
              }
            }
            name.push(n);
            idx++;
          } else {
            o.graphic.splice(j + 2, l);
            if (o.graphic.length <= 2) {
              o.graphic[0].children[0].shape.x2 = 60;
              o.graphic[0].children[1].shape.x2 = 60;
            }
            name.splice(j + 1, l);
            idx = j;
            pos.leftCur -= pos.leftPlus * (l - j - 1);
          }

          o.geo.map = n;
          o.geo.zoom = 1;
          i.clear();
          i.setOption(o);
          this.zoomAnimation();
          opt.callback(n, o, i);
        },

        /**
         * name 地图名
         **/
        createBreadcrumb: function(name) {
          var cityToPinyin = {
            黔南: "qiannanbu",
            铜仁市: "tongrenshi",
            黔东南: "qiandongnan",
            黔西南: "qianxinan",
            贵阳市: "guiyangshi",
            安顺市: "anshunshi",
            遵义市: "zunyishi",
            毕节市: "bijieshi",
            六盘水市: "liupanshuishi"
          };
          var breadcrumb = {
            type: "group",
            id: name,
            left: pos.leftCur + pos.leftPlus,
            top: pos.top + 3,
            children: [
              {
                type: "polyline",
                left: -90,
                top: -5,
                shape: {
                  points: line
                },
                style: {
                  stroke: "#fff",
                  key: name
                  // lineWidth: 2,
                },
                onclick: function() {
                  var name = this.style.key;
                  handleEvents.resetOption(chart, option, name);
                }
              },
              {
                type: "text",
                left: -68,
                top: "middle",
                style: {
                  text: name,
                  textAlign: "center",
                  fill: style.textColor,
                  font: style.font
                },
                onclick: function() {
                  var name = this.style.text;
                  handleEvents.resetOption(chart, option, name);
                }
              },
              {
                type: "text",
                left: -68,
                top: 10,
                style: {
                  name: name,
                  text: cityToPinyin[name]
                    ? cityToPinyin[name].toUpperCase()
                    : "",
                  textAlign: "center",
                  fill: style.textColor,
                  font: '12px "Microsoft YaHei", sans-serif'
                },
                onclick: function() {
                  // console.log(this.style);
                  var name = this.style.name;
                  handleEvents.resetOption(chart, option, name);
                }
              }
            ]
          };

          pos.leftCur += pos.leftPlus;

          return breadcrumb;
        },

        zoomAnimation: function() {
          var zoom = function() {
            chart.setOption({
              geo: {
                zoom: 1
              }
            });
          };
          window.requestAnimationFrame(function() {
            zoom();
          });
        }
      };

      var option = {
        backgroundColor: opt.bgColor,
        graphic: [
          {
            type: "group",
            left: pos.left,
            top: pos.top - 4,
            children: [
              {
                type: "line",
                left: 0,
                top: -20,
                shape: {
                  x1: 0,
                  y1: 0,
                  x2: 60,
                  y2: 0
                },
                style: {
                  stroke: style.lineColor
                }
              },
              {
                type: "line",
                left: 0,
                top: 20,
                shape: {
                  x1: 0,
                  y1: 0,
                  x2: 60,
                  y2: 0
                },
                style: {
                  stroke: style.lineColor
                }
              }
            ]
          },
          {
            id: name[idx],
            type: "group",
            left: pos.left + 2,
            top: pos.top,
            children: [
              {
                type: "polyline",
                left: 90,
                top: -12,
                shape: {
                  points: line
                },
                style: {
                  stroke: "transparent",
                  key: name[0]
                },
                onclick: function() {
                  var name = this.style.key;
                  handleEvents.resetOption(chart, option, name);
                }
              },
              {
                type: "text",
                left: 0,
                top: "middle",
                style: {
                  text: name[0] === "贵州" ? "贵州省" : name[0],
                  textAlign: "center",
                  fill: style.textColor,
                  font: style.font
                },
                onclick: function() {
                  handleEvents.resetOption(chart, option, "贵州");
                }
              },
              {
                type: "text",
                left: 0,
                top: 10,
                style: {
                  text: "JIANGXI",
                  textAlign: "center",
                  fill: style.textColor,
                  font: '12px "Microsoft YaHei", sans-serif'
                },
                onclick: function() {
                  handleEvents.resetOption(chart, option, "贵州");
                }
              }
            ]
          }
        ],
        geo: {
          map: opt.mapName,
          // roam: true,
          zoom: 1,
          label: {
            normal: {
              show: true,
              textStyle: {
                color: "#fff"
              }
            },
            emphasis: {
              textStyle: {
                color: "#fff"
              }
            }
          },
          itemStyle: {
            normal: {
              borderColor: "rgba(147, 235, 248, 1)",
              borderWidth: 1,
              areaColor: {
                type: "radial",
                x: 0.5,
                y: 0.5,
                r: 0.8,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(147, 235, 248, 0)" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(147, 235, 248, .2)" // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              },
              shadowColor: "rgba(128, 217, 248, 1)",
              // shadowColor: 'rgba(255, 255, 255, 1)',
              shadowOffsetX: -2,
              shadowOffsetY: 2,
              shadowBlur: 10
            },
            emphasis: {
              areaColor: "#389BB7",
              borderWidth: 0
            }
          },
          regions: opt.activeArea.map(function(item) {
            if (typeof item !== "string") {
              return {
                name: item.name,
                itemStyle: {
                  normal: {
                    areaColor: item.areaColor || "#389BB7"
                  }
                },
                label: {
                  normal: {
                    show: item.showLabel,
                    textStyle: {
                      color: "#fff"
                    }
                  }
                }
              };
            } else {
              return {
                name: item,
                itemStyle: {
                  normal: {
                    borderColor: "#91e6ff",
                    areaColor: "#389BB7"
                  }
                }
              };
            }
          })
        },
        series: [
          {
            type: "effectScatter",
            coordinateSystem: "geo",
            // symbol: 'diamond',
            showEffectOn: "render",
            rippleEffect: {
              period: 15,
              scale: 6,
              brushType: "fill"
            },
            hoverAnimation: true,
            itemStyle: {},
            data: []
          }
        ]
      };

      chart.setOption(option);
      // 添加事件
      var _this = this;
      chart.on("click", function(params) {
        var _self = this;

        if (opt.goDown && params.name !== name[idx]) {
          if (cityMap[params.name]) {
            for (let i of guizhou.features) {
              if (params.name === i.properties.name) {
                // console.log(i.id);
                _this.$emit("pushCityId", i.id);
              }
            }
          }
          if (cityMap[params.name]) {
            var url = cityMap[params.name];
            // console.log(response);
            curGeoJson = url;
            echarts.registerMap(params.name, url);
            handleEvents.resetOption(_self, option, params.name);
          }
        }
        if (params.name == "") {
          _this.$emit("pushCityId", "52");
        }
      });

      chart.setMap = function(mapName) {
        var _self = this;
        if (mapName.indexOf("市") < 0) mapName = mapName + "市";

        var citySource = cityMap[mapName];

        if (citySource) {
          var url = "./map/" + citySource + ".json";
          curGeoJson = url;
          echarts.registerMap(mapName, url);
          handleEvents.resetOption(_self, option, mapName);
        }

        // handleEvents.resetOption(this, option, mapName);
      };

      return chart;
    }
  },
  computed: {},
  components: {}
};
</script>


<style lang="scss">
.map_back {
  width: 100%;
  height: 620px;
  background-image: url(../../../common/images/qiuqiu.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 70% 100%;
  margin: 0 auto;
}
</style>
