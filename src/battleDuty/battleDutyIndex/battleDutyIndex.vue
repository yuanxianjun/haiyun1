<template>
  <div id="battleDutyIndex">
    <div class="topHeader">
      <div class="logo">
        <!-- <img src="./assets/logo.png" @click="goBack" alt> -->
      </div>
      <div class="weather">
        <div class="sweater-box">
          <p class="sweater">
            <template
              v-if="weather"
            >{{weather.date.split('实时：')[1].split(")")[0]}} | {{weather.weather}} | {{weather.wind}}</template>
            <template v-else>0℃ | 晴 | 无风</template>
          </p>
          <p class="time">{{curTime}}</p>
        </div>
      </div>
    </div>
    <div class="content-wrapper" :gutter="20">
      <div class="content-left">
        <div>
          <div class="name_div"></div>
        </div>
        <div>
          <div class="link-port">
            <div>
              <img src="./assets/use.png" alt>
            </div>
            <div>
              <img src="./assets/systom.png" alt>
            </div>
          </div>
        </div>
        <div>
          <div class="title">
            <p class="title_p">执勤值班</p>
            <a class="click_btn" href="#">
              <img src="./assets/into.png" alt>
            </a>
          </div>
          <div id="prepareDuty"></div>
        </div>
        <div>
          <div class="title circle-title">
            <p class="title_p">人员数据</p>
            <a class="click_btn" href="#">
              <img src="./assets/into.png" alt>
            </a>
          </div>

          <div class="under-pic">
            <div class="circle-box">
              <vuePie></vuePie>
            </div>
          </div>
        </div>
      </div>
      <div class="content-middle">
        <div class="today-info">
          <p class="titleInfo">
            <span class="bell"></span>
            节假日期间旅游景点和博物馆、文物建筑、要注意了解安全出口和疏散通道
          </p>
        </div>

        <div class="chart-wrapper">
          <h1>旋转地球</h1>
          <div id="fireReson" style="100% 100%"></div>

          <div class="block">
            <span class="demonstration">Click 指示器触发</span>
          </div>
        </div>

        <div class="table-wrapper">
          <div class="table-content">
            <el-carousel trigger="click" height="150px">
              <el-carousel-item v-for="item in 4" :key="item">
                <h3>{{ item }}</h3>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </div>
      <div class="content-right">
        <div></div>
        <div>
          <div class="title">
            <p class="title_p">灭火救援</p>
            <a class="click_btn" href="#">
              <img src="./assets/into.png" alt>
            </a>
          </div>
          <div class="under-pic"></div>
          <!-- <div id="warningInfo" class="chart-box" style="width: 100%;"></div> -->
        </div>
        <div>
          <div class="title">
            <p class="title_p">机构运行</p>
            <a class="click_btn" href="#">
              <img src="./assets/into.png" alt>
            </a>
          </div>
          <div class="under-pic"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueCircle from "vue2-circle-progress";
import echarts from "echarts";
import Stomp from "stompjs";
import vueSeamless from "vue-seamless-scroll";
import $ from "jquery";
import { imgUrl } from "./assets/img/img";
import { setTimeout, clearTimeout } from "timers";
// 引入pie组件
import vuePie from "./components/pie.vue";
export default {
  name: "battleDutyIndex",
  components: {},

  data() {
    return {
      dialogTableVisible: false,
      dialogContent: "",
      dialogTitle: "",

      todayData: {},
      keyUnitName: [],
      keyUnitValue: [],
      coordinates: [],
      fireFighting: [],
      prepareList: [],
      weather: null,
      curTime: "",
      currCityName: "",
      dutyChart: null,
      keyUnitChart: null,
      fireResonChart: null,
      chinaMapChart: null,
      isShowDialog: false,
      timeStamp: "",
      baseUrl: this.axios.defaults.baseURL.split("/ecp")[0],
      QNRTCUrl: localStorage.getItem("QNRTCUrl"),
      fill: { gradient: ["red", "green", "blue"] },
      sortArr: ["zhidui", "dadui", "zhongdui", "police", "car", "drug"], // 消防实力排序
      temp: []
    };
  },
  created() {
    // 值班要情
    this.axios.get("/dutyShow/selectDutyPoint").then(res => {
      const { status, data } = res;
      const { result } = data;
      // if (status == 200 && result.length) this.newsList = result;
    });
    // 备情值班
    this.axios.get("/dutyShow/selectDutyPerson").then(res => {
      const { status, data } = res;
      const { result } = data;
      if (status == 200 && result.length) this.prepareList = result;
    });
    // 消防实力
    this.axios.get("/dutyShow/selectPower").then(res => {
      const { status, data } = res;
      const { result } = data;
      if (status == 200 && result) {
        let newArr = [];
        this.fireFighting = Object.entries(result);
        for (var j = 0; j < this.sortArr.length; j++) {
          for (var i = 0; i < this.fireFighting.length; i++) {
            if (this.fireFighting[i][0] == this.sortArr[j]) {
              newArr.push(this.fireFighting[i]);
            }
          }
        }
        this.fireFighting = newArr;
      }
    });
    // 今日车辆等数据
    this.axios.get("/dutyShow/selectEmergencyCount").then(res => {
      const { status, data } = res;
      const { result } = data;
      if (status == 200 && result) this.todayData = result;
      this.renerWaringInfo();
      this.fireReson();
    });
    // 重点单位
    this.axios.get("/dutyShow/selectImportant").then(res => {
      const { status, data } = res;
      const { result } = data;
      const { name, num } = result;
      for (let key of name) {
        this.keyUnitName.push({
          name: key
        });
      }
      this.keyUnitValue = num;
      this.renderKeyUnit();
    });
    // 中间地图和表格
    this.axios.get("/dutyShow/selectMapdata").then(res => {
      const { status, data } = res;
      const { result } = data;
      const { emergency, coordinate } = result;
      if (status == 200 && emergency.length) {
        this.mapData = emergency;
        this.coordinates = coordinate;
      }
    });
    this.connectData();
    this.getCurrentCity();
    this.getCurrTime();
  },
  mounted() {
    var _this = this;
    setTimeout(function() {}, 2000);

    window.addEventListener("resize", () => {
      this.keyUnitChart.resize();
      this.fireResonChart.resize();
      this.chinaMapChart.resize();
    });
  },
  methods: {
    // 点击查看值班要情
    clickContent(e) {
      console.log(e.target.innerText, "content");
      // this.dialogContent = e.target.innerText;
      // this.dialogTableVisible = true;
    },
    // 关闭弹窗
    closeDialog() {
      this.dialogContent = "";
      this.dialogTableVisible = false;
    },
    getRowClass(row, rowIndex) {
      return "clearBgColor";
    },
    jumpTo(id) {
      window.location.href = `${
        this.baseUrl
      }/EMDY/dynamic.html?emergencyId=${id}`;
    },

    // 设置effectscatter
    initSeriesData: function(data) {
      this.temp = [];
      for (let i = 0; i < data.length; i++) {
        // console.log(this.coordinates,'this.coordinates==============')
        let geoCoord = this.coordinates[data[i].name];
        if (geoCoord) {
          this.temp.push({
            symbol:
              "image://" +
              (data[i].emergencyType == "outfire"
                ? imgUrl.hzpj
                : data[i].emergencyType == "rescue"
                ? imgUrl.qxjy
                : data[i].emergencyType == "duty"
                ? imgUrl.gwzq
                : imgUrl.shjz),
            name: data[i].name,
            city: data[i].city,
            createTime: data[i].createTime,
            emergencyTypeName: data[i].emergencyTypeName,
            value: geoCoord.concat(data[i].value, data[i].emergencyType),
            emergencyType: data[i].emergencyType
          });
        }
      }
      // console.log(this.temp,'temp')
      return this.temp;
    },
    extendsMap(echarts, id, opt) {
      let that = this;
      // 实例
      that.chinaMapChart = echarts.init(document.getElementById(id));

      let curGeoJson = {};

      let geoCoordMap = this.coordinates;

      let defaultOpt = {
        mapName: "china", // 地图展示
        goDown: false, // 是否下钻
        bgColor: "#090918", // 画布背景色
        activeArea: [], // 区域高亮,同echarts配置项
        data: [],
        // 下钻回调(点击的地图名、实例对象option、实例对象)
        callback: function(name, option, instance) {}
      };
      if (opt) opt = echarts.util.extend(defaultOpt, opt);

      // 层级索引
      let name = [opt.mapName];
      let idx = 0;
      let pos = {
        leftPlus: 40,
        leftCur: 40,
        left: 40,
        top: 40
      };

      let line = [[0, 0], [8, 11], [0, 22]];
      // style
      let style = {
        font: '18px "Microsoft YaHei", sans-serif',
        textColor: "#eee",
        lineColor: "rgba(147, 235, 248, .8)"
      };

      let handleEvents = {
        /**
         * i 实例对象
         * o option
         * n 地图名
         **/
        resetOption: function(i, o, n) {
          let breadcrumb = this.createBreadcrumb(n);
          let j = name.indexOf(n);
          let l = o.graphic.length;
          if (j < 0) {
            o.graphic.push(breadcrumb);
            o.graphic[0].children[0].shape.x2 = 145;
            o.graphic[0].children[1].shape.x2 = 145;
            if (o.graphic.length > 2) {
              let cityData = [];
              let cityJson;
              for (let x = 0; x < opt.data.length; x++) {
                if (n === opt.data[x].city) {
                  $([opt.data[x]]).each(function(index, data) {
                    cityJson = {
                      name: data.name,
                      city: data.city,
                      createTime: data.createTime,
                      value: data.coordinate,
                      emergencyType: data.emergencyType,
                      emergencyTypeName: data.emergencyTypeName
                    };
                    cityData.push(cityJson);
                  });
                }
              }
              if (cityData != null) {
                o.series[0].data = that.initSeriesData(cityData);
              } else {
                o.series[0].data = [];
              }
            }
            name.push(n);
            idx++;
          } else {
            o.graphic.splice(j + 2, l);
            if (o.graphic.length <= 2) {
              o.graphic[0].children[0].shape.x2 = 60;
              o.graphic[0].children[1].shape.x2 = 60;
              o.series[0].data = that.initSeriesData(opt.data);
            }
            name.splice(j + 1, l);
            idx = j;
            pos.leftCur -= pos.leftPlus * (l - j - 1);
          }

          o.geo.map = n;
          o.geo.zoom = 1;
          i.clear();
          i.setOption(o);
          // this.zoomAnimation();
          opt.callback(n, o, i);
        },

        /**
         * name 地图名
         **/
        createBreadcrumb: function(name) {
          let breadcrumb = {
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
                  let name = this.style.key;
                  handleEvents.resetOption(that.chinaMapChart, option, name);
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
                  let name = this.style.text;
                  handleEvents.resetOption(that.chinaMapChart, option, name);
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
                  let name = this.style.name;
                  handleEvents.resetOption(that.chinaMapChart, option, name);
                }
              }
            ]
          };

          pos.leftCur += pos.leftPlus;

          return breadcrumb;
        },

        zoomAnimation: function() {
          let count = null;
          let zoom = function(per) {
            if (!count) count = per;
            count = count + per;
            that.chinaMapChart.setOption({
              geo: {
                zoom: count
              }
            });
            if (count < 1)
              window.requestAnimationFrame(function() {
                zoom(0.2);
              });
          };
          window.requestAnimationFrame(function() {
            zoom(0.2);
          });
        }
      };
      let option = {
        backgroundColor: opt.bgColor,
        tooltip: {
          show: true,
          trigger: "item",
          alwaysShowContent: false,
          backgroundColor: "rgba(50,50,50,0.7)",
          hideDelay: 100,
          triggerOn: "mousemove",
          enterable: true,
          // position:['60%','70%'],
          formatter(params, ticket, callback) {
            return (
              "报警时间:" +
              params.data.createTime +
              "<br/>" +
              "地点:" +
              params.data.city
            );
          }
        },
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
                  let name = this.style.key;
                  handleEvents.resetOption(that.chinaMapChart, option, name);
                }
              },
              {
                type: "text",
                left: 0,
                top: "middle",
                style: {
                  text: "中国",
                  textAlign: "center",
                  fill: style.textColor,
                  font: style.font
                },
                onclick: function() {
                  handleEvents.resetOption(that.chinaMapChart, option, "中国");
                }
              },
              {
                type: "text",
                left: 0,
                top: 10,
                style: {
                  text: "China",
                  textAlign: "center",
                  fill: style.textColor,
                  font: '12px "Microsoft YaHei", sans-serif'
                },
                onclick: function() {
                  handleEvents.resetOption(that.chinaMapChart, option, "中国");
                }
              }
            ]
          }
        ],
        geo: {
          map: opt.mapName,
          roam: true,
          zoom: 1.2,
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
                    borderColor: "red",
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
            rippleEffect: {
              brushType: "stroke"
            },
            symbolSize: {
              brushType: "stroke",
              scale: 0
            },
            borderWidth: 0,
            showEffectOn: "emphasis",
            hoverAnimation: false,
            symbolSize: 40,
            data: this.initSeriesData(opt.data)
          }
        ]
      };

      that.chinaMapChart.setOption(option);
      // 添加事件
      that.chinaMapChart.on("click", function(params) {
        let _self = this;
        if (opt.goDown && params.name !== name[idx]) {
          if (cityMap[params.name]) {
            let url = cityMap[params.name];
            $.get(url, function(response) {
              //console.log(response);
              curGeoJson = response;
              echarts.registerMap(params.name, response);
              handleEvents.resetOption(_self, option, params.name);
            });
          }
        }
      });

      that.chinaMapChart.setMap = function(mapName) {
        let _self = this;
        if (mapName.indexOf("市") < 0) mapName = mapName + "市";
        let citySource = cityMap[mapName];
        if (citySource) {
          let url = "./map/" + citySource + ".json";
          $.get(url, function(response) {
            // console.log(response);
            curGeoJson = response;
            echarts.registerMap(mapName, response);
            handleEvents.resetOption(_self, option, mapName);
          });
        }
      };
      return that.chinaMapChart;
    },
    // 执勤值班
    renerWaringInfo() {
      this.dutyChart = echarts.init(document.getElementById("prepareDuty"));
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
            symbolOffset: [0, -2],
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
                offset: [250, 3],
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

    // 重点单位
    renderKeyUnit() {
      this.keyUnitName.forEach(item => {
        item.max = 15;
      });
      this.keyUnitChart = echarts.init(document.getElementById("keyUnit"));
      let option = {
        title: {},
        tooltip: {},
        radar: {
          name: {
            textStyle: {
              color: "#fff",
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          center: ["50%", "65%"],
          radius: "80%",
          indicator: this.keyUnitName
        },
        series: [
          {
            name: "",
            top: "center",
            type: "radar",
            areaStyle: {
              normal: {
                color: "#3ddbec",
                opacity: 0.5
              }
            },
            lineStyle: {
              normal: {
                color: "#cbe7e8"
              }
            },
            itemStyle: { normal: { areaStyle: { type: "default" } } },
            data: [
              {
                value: this.keyUnitValue,
                name: "重点单位"
              }
            ]
          }
        ]
      };
      this.keyUnitChart.setOption(option);
    },
    // 火灾原因
    fireReson() {
      this.fireResonChart = echarts.init(document.getElementById("fireReson"));

      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: [80, 83],
            center: ["55%", "50%"],
            hoverAnimation: false,
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: 0,
                name: "",
                itemStyle: {
                  normal: {
                    color: "#03FEC9"
                  }
                }
              }
            ]
          },
          {
            name: "火灾原因",
            type: "pie",
            radius: [60, 72],
            center: ["55%", "50%"],
            hoverAnimation: false,
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                formatter: "{b|{b}}  {per|{d}%}",
                color: "#fff",
                rich: {
                  b: {
                    color: "#fff",
                    fontSize: 14,
                    align: "center"
                  },
                  d: {
                    color: "#11d1b4",
                    fontSize: 14,
                    align: "center"
                  }
                }
              }
            },
            labelLine: {
              normal: {
                show: true,
                length: 10
              }
            },
            data: [
              {
                value: this.todayData.playfire,
                name: "玩火",
                itemStyle: {
                  normal: {
                    color: "#25b6bf"
                  }
                }
              },
              {
                value: this.todayData.breakrules,
                name: "违反常规",
                itemStyle: {
                  normal: {
                    color: "#00ffff"
                  }
                }
              },
              {
                value: this.todayData.smoke,
                name: "吸烟",
                itemStyle: {
                  normal: {
                    color: "#00a1fd"
                  }
                }
              },
              {
                value: this.todayData.arson,
                name: "纵火",
                itemStyle: {
                  normal: {
                    color: "#6d21f9"
                  }
                }
              },
              {
                value: this.todayData.electrical,
                name: "电器",
                itemStyle: {
                  normal: {
                    color: "#a6f7fc"
                  }
                }
              },
              {
                value: this.todayData.careless,
                name: "用火不慎",
                itemStyle: {
                  normal: {
                    color: "#4e00ff"
                  }
                }
              }
            ]
          },
          {
            name: "",
            type: "pie",
            radius: [50, 53],
            center: ["55%", "50%"],
            hoverAnimation: false,
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: 0,
                name: "",
                itemStyle: {
                  normal: {
                    color: "#03FEC9"
                  }
                }
              }
            ]
          }
        ]
      };

      this.fireResonChart.setOption(option);
    },
    connectData() {
      let _this = this;
      let client, destination;
      let url = "ws://192.168.1.22:61614";
      let login = "admin";
      let passcode = "admin";
      destination = "/topic/realtime_emergency_badu_show";
      client = Stomp.client(this.axios.defaults.rabbitMQUrl);

      // this allows to display debug logs directly on the web page
      client.debug = function(str) {
        console.log("创建连接提示信息:" + str);
      };

      // the client is notified when it is connected to the server.
      client.connect(login, passcode, function(frame) {
        client.debug("connected to Stomp");
        client.subscribe(destination, function(message) {
          console.log("数据：" + message.body);

          let msg = eval("(" + message.body + ")");
          let map = msg["emergencyData"];

          var arr = [];
          for (var key in _this.coordinates) {
            var obj = {};
            obj.name = key;
            obj.value = _this.coordinates[key];
            arr.push(obj);
          }
          var curObj = {};
          for (var key in map["coordinate"]) {
            curObj.name = key;
            curObj.value = map["coordinate"][key];
          }

          arr.unshift(curObj);
          _this.coordinates = [];
          arr.forEach((item, index) => {
            _this.coordinates[item.name] = item.value;
          });

          _this.todayData = msg["emergencyCount"];
          let timer = null;
          clearTimeout(timer);
          setTimeout(() => {
            $("#tablist-0").addClass("tab_show");
            timer = setTimeout(() => {
              $("#tablist-0").removeClass("tab_show");
              clearTimeout(timer);
            }, 10000);
          }, 800);
        });
      });
    },
    getCurrentCity() {
      //定义获取城市方法
      const geolocation = new BMap.Geolocation();
      let _this = this;
      geolocation.getCurrentPosition(
        function getinfo(position) {
          let city = position.address.city; //获取城市信息
          _this.getWeather(city);
          setInterval(function() {
            _this.getWeather(city);
          }, 1000 * 60 * 10);
        },
        function(e) {
          console.log("定位失败！");
        },
        { provider: "baidu" }
      );
    },
    // 获取今天的天气信息
    getWeather(cityName) {
      this.$jsonp("http://api.map.baidu.com/telematics/v3/weather", {
        location: cityName, // 城市
        output: "json", // 格式
        ak: "eklfHV01LdEBLSrwUAXZRP6Ctr94f8TO" // 百度地图ak
      }).then(res => {
        if (res.status == "success") {
          this.weather = res.results[0].weather_data[0];
          console.log(
            "this.weather",
            this.weather.date.split("实时：")[1].split(")")[0]
          );
        } else {
          this.$message.error("获取天气失败!");
        }
      });
    },
    // 获取时间
    getCurrTime() {
      let _this = this;
      setInterval(function() {
        let time = new Date(); // 程序计时的月从0开始取值后+1
        let year, month, day, hour, min, sec;
        year = time.getFullYear();
        month =
          time.getMonth() + 1 < 10
            ? "0" + (time.getMonth() + 1)
            : time.getMonth() + 1;
        day = time.getDate() < 10 ? "0" + time.getDate() : time.getDate();
        hour = time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
        min =
          time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
        sec =
          time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds();
        let timeStr =
          year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
        _this.curTime = timeStr;
      }, 1000);
    },
    videoTalk({ personId }) {
      this.timeStamp = new Date().getTime();
      var senderName = "管理员";
      var alias = new Array(personId);
      this.axios({
        method: "post",
        url: `/app/video?senderName=${senderName}&roomId=${
          this.timeStamp
        }&alias=${alias}`
      }).then(res => {
        if (res.data.code == "success") {
          this.openWindow(this.timeStamp);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //打开新窗口播放视频会议，并设置新框框的样式
    openWindow(timeStamp) {
      var url = `${this.QNRTCUrl}?room=${timeStamp}&username=admin`; //转向网页的地址;
      var name = "视频会议";
      var iWidth = 1500;
      var iHeight = 900;
      var iTop = (window.screen.availHeight - 30 - iHeight) / 2;
      var iLeft = (window.screen.availWidth - 10 - iWidth) / 2;
      window.open(
        url,
        name,
        "height=" +
          iHeight +
          ",,innerHeight=" +
          iHeight +
          ",width=" +
          iWidth +
          ",innerWidth=" +
          iWidth +
          ",top=" +
          iTop +
          ",left=" +
          iLeft +
          ",toolbar=no,titlebar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no"
      );
    },
    goBack() {
      window.history.back(1);
    }
  },
  watch: {
    todayData(newVal, oldVal) {
      this.renerWaringInfo();
    }
  },
  computed: {
    defaultActive() {
      return this.$route.path;
    }
  },
  components: {
    VueCircle,
    vueSeamless,
    vuePie
  }
};
</script>


<style lang="scss">
html,
body {
  height: 100%;
}
#battleDutyIndex {
  width: 1920px;
  height: 890px;
}
.title_p {
  display: inline-block;
  width: 90%;
  text-indent: 20px;
  font-size: 24px;
  font-weight: 550px;
  // 文件渐变颜色（支支持webkit内核）
  background-image: -webkit-linear-gradient(bottom, #107dd2, #01f9fd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.click_btn {
  display: inline-block;
  width: 20px;
  height: 20px;
  img {
    width: 100%;
    height: 100%;
    vertical-align: middle;
  }
}
#battleDutyIndex {
  width: 1920px;
  height: 100%;
  overflow: auto;
  background-image: url("./assets/background.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  .topHeader {
    height: 140px;
    padding: 0 20px;
    overflow: hidden;
    .logo {
      float: left;
      cursor: pointer;
      margin: 8px 10px 0;
    }
    .weather {
      float: right;
      text-align: right;
      line-height: 76px;
      span {
        color: #fff;
      }
      overflow: hidden;
      .sweater-box {
        width: 200px;
        text-align: left;
        padding-left: 20px;
        float: right;
        .sweater {
          color: #bdfff0;
          line-height: 26px;
        }
        .time {
          color: #6dfff5;
          line-height: 26px;
        }
      }
    }
  }
  .content-wrapper {
    color: #fff;
    padding: 0 40px 40px 40px;
    width: 100%;
    height: calc(100% - 84px);
    overflow: hidden;
    .content-left {
      width: 20%;
      float: left;
      height: 100%;
      padding-right: 40px;
      & > div {
        &:nth-child(1) {
          height: 50px;
          margin-bottom: 10px;
          .name_div {
            background: black;
          }
        }
        &:nth-child(2) {
          // 需要更改
          height: 80px;
          margin-bottom: 20px;
          .link-port {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: row;
            & > div {
              flex: 1;
              width: 50%;
              height: 80px;
              text-align: center;
              img {
                width: 100px;
                height: 40px;
                margin-top: 20px;
              }
              :nth-child(1) {
              }
            }
            img {
              display: inline-block;
            }
          }
        }
        &:nth-child(3) {
          height: 40%;
          margin-bottom: 20px;
        }
        &:nth-child(4) {
          height: 33%;
        }
      }
      .title {
        color: hsl(182, 96%, 46%);
        height: 45px;
        line-height: 45px;
        font-size: 18px;
        text-align: left;
        background: url("./assets/title.png") no-repeat;
        &.circle-title {
          margin-bottom: 10px;
        }
      }
      .scroll-wrapper {
        height: 186px;
        overflow: hidden;
      }
      .news {
        li {
          font-size: 14px;
          line-height: 30px;
          list-style: none;
          text-indent: 30px;
          cursor: pointer;
        }
      }
      #prepareDuty {
        height: calc(100% - 65px);
        overflow-y: auto;

        background-image: url("./assets/rect.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-top: 10px;
      }
      .under-pic {
        height: calc(100% - 30px);
        background-image: url("./assets/rect.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
      .circle-box {
        width: 100%;
        height: 100%;

        .circle-item {
          margin-right: 40px;
          float: left;
          text-align: center;
          &.clearMargin {
            margin-right: 0;
          }
          &.marginBottom {
            margin-bottom: 15px;
          }
        }
        #fireReson {
          width: 100%;
          height: calc(100% - 53px);
        }
      }
    }
    .content-middle {
      width: calc(100% - 40%);
      height: 100%;
      float: left;
      padding-right: 40px;
      & > div {
        &:nth-child(1) {
          height: 65px;
        }
        &:nth-child(2) {
          height: calc(100% - 266px);
          #myChart {
            width: 100%;
            height: 100%;
          }
        }
        &:nth-child(3) {
          height: 200px;
        }
      }
      .today-info {
        text-align: center;
        background-image: url("./assets/rect.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;

        .titleInfo {
          height: 100%;
          color: red;
          line-height: 65px;
          font-size: 20px;
          .bell {
            float: left;
            width: 20px;
            height: 20px;
            margin-top: 23px;
            margin-left: 20px;
            background-image: url("./assets/warning.png");
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }
        }
      }
      .table-wrapper {
        height: 180px;
      }
      .table-content {
        height: calc(100%);
        overflow-y: auto;
        overflow-x: hidden;
        background: #051f43;
      }
    }
    .content-right {
      width: 20%;
      float: right;
      height: 100%;

      .title {
        color: #05dce5;
        width: 100%;
        height: 53px;
        line-height: 53px;
        font-size: 18px;
        text-align: left;
        background-image: url("./assets/title.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
      & > div {
        &:nth-child(1) {
          height: calc(20% - 20px);
          .title {
            margin-bottom: 20px;
          }
          #warningInfo {
            height: calc(100% - 53px);
          }
        }
        &:nth-child(2) {
          height: 40%;
          margin-bottom: 20px;
          .title {
            margin-bottom: 0px;
          }
          #keyUnit {
            height: calc(100% - 53px);
          }
        }
        &:nth-child(3) {
          height: 40%;
        }
        .chart-box {
          height: calc(100% - 53px);
        }
      }

      //border: 1px solid brown;
    }
    .under-pic {
      height: calc(100% - 65px);
      margin-top: 10px;
      background-image: url("./assets/rect.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
  }
}
*::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
  background-color: #041530;
  border-radius: 4px;
}

*::-webkit-scrollbar {
  width: 4px;
  background-color: #041530;
  border-radius: 4px;
}

*::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: #64b1e3;
}
.tab_img {
  width: 30px;
  vertical-align: inherit;
}
</style>
<style>
td img {
  vertical-align: middle;
}

.el-dialog__title {
  color: #00ffff !important;
  font-size: 22px;
}

.el-dialog .el-dialog__body .closeBtn {
  /* background: url(./assets/close.png) no-repeat 0 0; */
  background-size: contain;
  border: 0px;
  width: 30px;
  height: 30px;
  padding: 0px;
  float: right;
  position: absolute;
  top: -10px;
  right: -10px;
  cursor: pointer;
}
.tab_show td {
  animation: myanimate 1.5s infinite;
  -webkit-animation: myanimate 1.5s infinite;
}
.tab_show {
  animation: myanimate 1.5s infinite;
  -webkit-animation: myanimate 1.5s infinite;
}
@keyframes myanimate {
  0% {
    color: white;
    background: #7b0606;
  }
  25% {
    color: #818186;
    background: #041530;
  }
  50% {
    color: white;
    background: #7b0606;
  }
  75% {
    color: #818186;
    background: #041530;
  }
  100% {
    color: white;
    background: #7b0606;
  }
}

@-webkit-keyframes myanimate /*Safari and Chrome*/ {
  0% {
    color: white;
    background: #7b0606;
  }
  25% {
    color: #818186;
    background: #041530;
  }
  50% {
    color: white;
    background: #7b0606;
  }
  75% {
    color: #818186;
    background: #041530;
  }
  100% {
    color: white;
    background: #7b0606;
  }
}
</style>
