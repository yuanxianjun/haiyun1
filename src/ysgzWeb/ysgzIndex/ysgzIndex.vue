<template>
  <div id="battleDutyIndex">
    <!-- 公共的头部组件 -->
    <!-- v-if="oneDayData.nowTime" -->
    <comHeader :serveTime="oneDayData.nowTime"></comHeader>
    <div class="content-wrapper">
      <div class="content-left">
        <div class="positionComout">
          <comOut></comOut>
        </div>
        <div>
          <div class="link-port">
            <div @click="showUse = !showUse">
              <img
                v-show="showUse"
                src="./assets/use.png"
                style="width:100px;height:40px;margin-top:20px;"
                alt
              >
              <img
                style="width:128px;height:64px;margin-top:8px;"
                v-show="!showUse"
                src="./assets/use2.png"
                alt
              >
            </div>
            <div @click="showSystom = !showSystom">
              <img
                v-show="showSystom"
                src="./assets/systom.png"
                style="width:100px;height:40px;margin-top:20px;"
                alt
              >
              <img
                style="width:128px;height:64px;margin-top:8px;"
                v-show="!showSystom"
                src="./assets/systom2.png"
                alt
              >
            </div>
          </div>
        </div>
        <div>
          <div class="title">
            <p class="title_p">执勤值班</p>
            <a class="click_btn" href="onduty.html">
              <img src="./assets/into.png" alt>
            </a>
          </div>
          <div id="prepareDuty">
            <duty v-if="oneDayData.zbzq" :dutyData="oneDayData.zbzq"></duty>
          </div>
        </div>
        <div>
          <div class="title circle-title">
            <p class="title_p">人员数据</p>
            <a class="click_btn" href="personData.html">
              <img src="./assets/into.png" alt>
            </a>
          </div>

          <div class="circle-box">
            <vuePie v-if="oneDayData.rysj" :rysj="oneDayData.rysj"></vuePie>
          </div>
        </div>
      </div>
      <div class="content-middle">
        <div class="today-info">
          <div class="titleInfo">
            <span class="bell"></span>

            <div id="div1">
              <vue-seamless-scroll :data="noticeList" :class-option="classOption">
                <span class="con_text" v-for="(item,index) in noticeList" :key="index">
                  {{item.time}}
                  {{item.fireType}}
                  {{item.fireRange == 1 ? "一级" :item.fireRange == 2 ? "二级":item.fireRange == 3 ?"三级":"四级"}}
                  {{item.address}}
                </span>
              </vue-seamless-scroll>
            </div>
          </div>
        </div>

        <div class="chart-wrapper">
          <earth></earth>
        </div>

        <div class="table-wrapper">
          <div class="table-header">
            <p class="title_p">防火监督</p>
            <a class="click_btn" href="#">
              <img src="./assets/into.png" alt>
            </a>
          </div>
          <div class="table-content">
            <div class="ymd">
              <img @click="fireClick('y')" class="ymd_img" :src="showfireY" alt>
              <img @click="fireClick('m')" class="ymd_img" :src="showfireM" alt>
              <img @click="fireClick('d')" class="ymd_img" :src="showfireD" alt>
            </div>
            <div class="list">
              <el-row>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <p class="ps">发现火灾隐患或违法行为数</p>
                    <p class="numbers">
                      {{supervisionData["hz"]}}
                      <span class="unit">个</span>
                    </p>
                  </div>
                </el-col>

                <el-col :span="5">
                  <div class="grid-content bg-purple">
                    <p class="ps">下发责令改正通知书</p>
                    <p class="numbers">
                      {{supervisionData["gztzs"]}}
                      <span class="unit">份</span>
                    </p>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="grid-content bg-purple">
                    <p class="ps">下发行政强制决定书</p>
                    <p class="numbers">
                      {{supervisionData["qzjds"]}}
                      <span class="unit">份</span>
                    </p>
                  </div>
                </el-col>
                <el-col :span="5">
                  <div class="grid-content bg-purple">
                    <p class="ps">检查单位数</p>
                    <p class="numbers">
                      {{supervisionData["jcdw"]}}
                      <span class="unit">个</span>
                    </p>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="grid-content bg-purple">
                    <p class="ps">拘留</p>
                    <p class="numbers">
                      {{supervisionData["jl"]}}
                      <span class="unit">人</span>
                    </p>
                  </div>
                </el-col>
              </el-row>
            </div>
            <!-- 下面一行 -->
            <div cl··ass="list">
              <el-row>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <p class="ps">督促整改火灾隐患或违法行为数</p>
                    <p class="numbers">
                      {{supervisionData["zg"]}}
                      <span class="unit">个</span>
                    </p>
                  </div>
                </el-col>

                <el-col :span="5">
                  <div class="grid-content bg-purple">
                    <p class="ps">下发行政处罚决定书</p>
                    <p class="numbers">
                      {{supervisionData["xzcfjds"]}}
                      <span class="unit">份</span>
                    </p>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="grid-content bg-purple">
                    <p class="ps">下发临时查封决定书</p>
                    <p class="numbers">
                      {{supervisionData["lscfjds"]}}
                      <span class="unit">份</span>
                    </p>
                  </div>
                </el-col>
                <el-col :span="5">
                  <div class="grid-content bg-purple">
                    <p class="ps">责令三停单位</p>
                    <p class="numbers">
                      {{supervisionData["zl"]}}
                      <span class="unit">个</span>
                    </p>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="grid-content bg-purple">
                    <p class="ps">罚款</p>
                    <p class="numbers">
                      {{supervisionData["fk"]}}
                      <span class="unit">万元</span>
                    </p>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </div>
      <div class="content-right">
        <div>
          <ul class="grid">
            <li class="grid-li">
              <div class="grid-wei">
                <div
                  class="grid_value b1"
                  :style="'transform:rotateY('+ degOne +'deg)'"
                >{{todayData[0]}}</div>
                <div
                  class="grid_value b2 back0"
                  :style="'transform:rotateY('+ degTwo +'deg)'"
                >{{todayData[0]}}</div>
              </div>
              <div class="grid_key">当日三级以上火灾</div>
            </li>
            <li class="grid-li">
              <!-- {{todayData[1]}} -->
              <div class="grid_value" :style="'transform:rotateY('+ degOne +'deg)'">{{todayData[1]}}</div>
              <div class="grid_value" :style="'transform:rotateY('+ degTwo +'deg)'">{{todayData[1]}}</div>
              <div class="grid_key">抢险救援</div>
            </li>
            <li class="grid-li">
              <div class="grid_value" :style="'transform:rotateY('+ degOne +'deg)'">{{todayData[2]}}</div>
              <div class="grid_value" :style="'transform:rotateY('+ degTwo +'deg)'">{{todayData[2]}}</div>
              <div class="grid_key">当日亡人火灾</div>
            </li>
          </ul>
        </div>
        <div>
          <div class="title">
            <p class="title_p">灭火救援</p>
            <a class="click_btn" href="fireRescue.html">
              <img src="./assets/into.png" alt>
            </a>
          </div>
          <div class="under-pic helpDiv">
            <div class="help_ymd" @click="helpClick()">
              <img @click="helpClick('y')" :src="showhelpY" alt>
              <img @click="helpClick('m')" :src="showhelpM" alt>
              <img @click="helpClick('d')" :src="showhelpD" alt>
            </div>
            <linechart
              v-if="fireProps.code == 'success' || fireProps.year"
              :firePropsData="fireProps"
              ref="line"
            ></linechart>
          </div>
        </div>
        <div>
          <div class="title">
            <p class="title_p">机构运行</p>
            <a class="click_btn" href="operation.html">
              <img src="./assets/into.png" alt>
            </a>
          </div>
          <div class="under-pic">
            <Agencies v-if="oneDayData.jgyx" :jgyx="oneDayData.jgyx"></Agencies>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="https://unpkg.com/tween.js@16.3.4"></script>
<script>
import $ from "jquery";
import moment from "moment";
// 引入stomp,axios,until 工具包
import Stomp from "stompjs";
import { axios } from "axios";

// 引入头部的组件
import comHeader from "../components/comHeader";
import comOut from "../components/comOut";

// 引入横向滚动组件
import vueSeamlessScroll from "vue-seamless-scroll";
// 引入pie组件
import vuePie from "./components/pie.vue";
// 引入执勤值班组件
import duty from "./components/duty.vue";
// 引入机构运行组件
import Agencies from "./components/funal.vue";
// 引入灭火救援组件
import linechart from "./components/lineChart.vue";
// 引入地球
import earth from "./components/earthBall.vue";

// 导入图片 y-->year  m-->month d-->day
import c_y from "./assets/click-year.png";
import y from "./assets/year.png";
import c_m from "./assets/click-month.png";
import m from "./assets/month.png";
import c_d from "./assets/click-day.png";
import d from "./assets/day.png";

export default {
  name: "ysgzIndex",
  data() {
    return {
      // 防火监督data
      supervisionData: {},
      number: 0,
      // mqUrl
      mqUrl: localStorage.getItem("mqUrl"),
      // 公告滚动的列表
      noticeList: [],

      // 应用通报 和 系统维护
      showUse: true,
      showSystom: true,

      // 底部年月日的切换
      showfireY: c_y,
      showhelpY: c_y,
      showhelpM: m,
      showfireM: m,
      showfireD: d,
      showhelpD: d,

      // 展示和关闭确认退出页面
      showOutPage: false,

      dialogTableVisible: false,
      dialogContent: "",
      // 右上角动画
      todayData: {
        "0": 0,
        "1": 0,
        "2": 0
      },
      _degOne: 0,
      get degOne() {
        return this._degOne;
      },
      set degOne(value) {
        this._degOne = value;
      },
      degTwo: 180,
      // 一日一更新的数据
      oneDayData: { zbzq: "", nowTime: "" },

      keyUnitName: [],
      keyUnitValue: [],
      coordinates: [],

      tableMiddle: {
        y: ["5678", "4343", "2324", "7227", 345, 100],
        m: ["2678", "2353", "2324", "2227", 235, 500],
        d: ["1678", "1343", "1424", "1227", 98, 100]
      },
      fireData: ["5678", "4343", "2324", "7227", 98, 100],
      // 灭火救援的props
      fireProps: {}
    };
  },
  created() {
    // 初始化数据
    this.firstNotic();
    this.firstSan();
    this.firstMhjy();
    // 一日一更新数据获取 mq获取
    this.notice_gd();
    // 灭火救援 mq获取
    this.mhjy_gd();
    var stringTime = moment().format("YYYY-MM-DD");
    // console.log(stringTime);
    this.oneDay_gd({ dateTime: stringTime });
    // 防火监督初始化
    this.fireSuper_gd("Y");
  },
  mounted() {
    var _this = this;
    //监听窗口变化
    window.addEventListener("resize", () => {});
  },
  methods: {
    // 防火监督数据获取
    fireSuper_gd(type) {
      this.axios({
        method: "post",
        url: "/supervisionInfo/" + type
        // params: options
      }).then(res => {
        if (res.status == 200) {
          var data = res.data.result;
          if (data) {
            this.supervisionData = data;
            // console.log("防火监督数据", data.xzcfjds);
          }
        } else {
          console.log("请求错误");
        }
      });
    },
    // 灭火救援,当日数据
    mhjy_gd() {
      var url = this.mqUrl;
      let client,
        _this = this,
        login = "admin",
        passcode = "admin",
        destination = "/topic/ysgz_fire_mhjy";

      client = Stomp.client(url);
      // this allows to display debug logs directly on the web page
      client.debug = function(val) {
        // console.log(val);
      };

      // the client is notified when it is connected to the server.
      client.connect(login, passcode, function(frame) {
        // client.debug("connected to Stomp");

        var timer = null;
        var num = 0;
        var flag = 1;

        client.subscribe(destination, function(message) {
          var data = JSON.parse(message.body) || {};

          if (data.today !== "null" && data.today !== "undefined") {
            var nowData = JSON.parse(data.today);

            // console.log(
            //   _this.todayData[0] !== nowData[0],
            //   _this.todayData[1] !== nowData[1],
            //   _this.todayData[2] !== nowData[2]
            // );
            if (
              _this.todayData[0] !== nowData[0] &&
              _this.todayData[1] !== nowData[1] &&
              _this.todayData[2] !== nowData[2]
            ) {
              numberChange(0, nowData[0]);
            }
            // else if (_this.todayData[1] !== nowData[1]) {
            //   numberChange(2, nowData[1]);
            // } else if (_this.todayData[0] !== nowData[2]) {
            //   numberChange(2, nowData[2]);
            // }
            function numberChange(number, nowVal) {
              if (timer) {
                clearInterval(timer);
              }
              if (flag == 1) {
                _this.degOne = 180;
                _this.degTwo = 0;
                flag = 2;
              } else {
                _this.degOne = 0;
                _this.degTwo = -180;
                flag = 1;
              }

              setTimeout(function() {
                _this.todayData[number] = nowVal;
              }, 300);
            }
          }

          _this.fireProps = data;
        });
      });
    },

    // 初始化滚动条内容
    firstNotic(options) {
      this.axios({
        method: "post",
        url: "/org/fireNotice",
        params: options
      }).then(res => {
        if (res.status == 200) {
          var data = res.data.result;
          if (data) {
            this.noticeList = data;
          }
        } else {
          console.log("请求错误");
        }
      });
    },
    // 初始化总数
    firstSan(options) {
      this.axios({
        method: "get",
        url: "/org/today",
        params: options
      }).then(res => {
        if (res.status == 200) {
          var data = res.data;
          if (data) {
            this.todayData = data;
          }
        } else {
          console.log("请求错误");
        }
      });
    },
    // 初始化灭火救援
    firstMhjy(options) {
      this.axios({
        method: "get",
        url: "/org/fire_fighting?type=0",
        params: options
      }).then(res => {
        if (res.status == 200) {
          var data = res.data;
          if (data) {
            this.fireProps = data;
          }
        } else {
          console.log("请求错误");
        }
      });
    },
    // 执勤值班，人员数据，机构运行，地球数据获取,一日一更新的数据
    oneDay_gd(options) {
      this.axios({
        // headers: { "Content-Type": "application/x-www-form-urlencoded" },
        method: "post",
        url: "/org/homePageDataStatistic",
        params: options
      }).then(res => {
        if (res.status == 200) {
          var data = res.data.result;
          if (data) {
            this.oneDayData = data;
          }
        } else {
          console.log("请求错误");
        }
      });
    },

    // 公告获取 一段时间一更新
    notice_gd() {
      var url = this.mqUrl;
      let client,
        _this = this,
        login = "admin",
        passcode = "admin",
        destination = "/topic/ysgz_fire_notice";
      client = Stomp.client(url);
      // this allows to display debug logs directly on the web page
      client.debug = function(val) {
        // console.log(val);
      };
      // the client is notified when it is connected to the server.
      client.connect(login, passcode, function(frame) {
        // client.debug("connected to Stomp");
        client.subscribe(destination, function(message) {
          _this.noticeList = JSON.parse(message.body) || [];
        });
      });
    },
   

    // 防火监督年月日切换数值
    fireClick(params) {
      // params 代表传入的年或月或者日
      if (params == "y") {
        this.showfireY = c_y;
        this.showfireM = m;
        this.showfireD = d;

        this.fireData = this.tableMiddle.y;
        this.fireSuper_gd("Y");
      } else if (params == "m") {
        this.showfireM = c_m;
        this.showfireY = y;
        this.showfireD = d;

        this.fireData = this.tableMiddle.m;

        this.fireSuper_gd("M");
      } else if (params == "d") {
        this.showfireD = c_d;
        this.showfireY = y;
        this.showfireM = m;

        this.fireData = this.tableMiddle.d;
        this.fireSuper_gd("D");
      }
    },
    // 灭火救援的年月日切换
    helpClick(params) {
      // params 代表传入的年或月或者日
      if (params == "y") {
        this.showhelpY = c_y;
        this.showhelpM = m;
        this.showhelpD = d;
        this.$refs.line.checkxData("y");
      } else if (params == "m") {
        this.showhelpM = c_m;
        this.showhelpY = y;
        this.showhelpD = d;
        this.$refs.line.checkxData("m");
      } else if (params == "d") {
        this.showhelpD = c_d;
        this.showhelpY = y;
        this.showhelpM = m;
        this.$refs.line.checkxData("d");
      }
    }
  },
  watch: {},
  computed: {
    defaultActive() {
      return this.$route.path;
    },
    classOption() {
      return {
        step: 0.3, //步长 越大滚动速度越快
        limitMoveNum: 5, //启动无缝滚动最小数据量 this.dataList.length
        hoverStop: true, //是否启用鼠标hover控制
        direction: 2, //1 往上 0 往下 2往左
        openWatch: true, //开启data实时监听
        singleHeight: 0, //单条数据高度有值hoverStop关闭
        waitTime: 1000 //单步停止等待时间
      };
    }
  },
  components: {
    vuePie,
    duty,
    Agencies,
    linechart,
    earth,
    comHeader,
    comOut,
    vueSeamlessScroll
  }
};
</script>


<style lang="scss">
@import "../../common/styles/font.css";
html,
body {
  height: 100%;
  font-family: ROME;
}
.rotate180 {
  transform: rotateY(180deg);
}
.rotate0 {
  transform: rotateY(0);
}
.rotate-180 {
  transform: rotateY(-180deg);
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
  float: right;
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
  height: 1080px;
  overflow: auto;
  position: relative;
  background-image: url("../../common/images/background.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  .content-wrapper {
    width: 1920px;
    height: 990px;
    color: #fff;
    padding: 20px 40px 40px 40px;
    .content-left {
      width: 20%;
      height: 100%;
      min-width: 367px;
      position: relative;
      float: left;
      & > div {
        &:nth-child(1) {
          min-height: 80px;
          margin-bottom: 10px;
        }
        &:nth-child(2) {
          // 需要更改
          min-height: 50x;
          margin-bottom: 10px;
          .link-port {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: row;
            margin-top: 70px;
            & > div {
              flex: 1;
              width: 50%;
              height: 80px;
              text-align: center;
              img {
                margin-top: 20px;
                cursor: pointer;
              }
            }
            img {
              display: inline-block;
            }
          }
        }
        &:nth-child(3) {
          min-height: 360px;
          margin-bottom: 20px;
        }
        &:nth-child(4) {
          min-height: 360px;
        }
      }
      .positionComout {
        position: absolute;
        top: -25px;
        left: 0;
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

      #prepareDuty {
        height: 320px;
        overflow-y: auto;
        background-image: url("./assets/rect.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-top: 10px;
      }
      .under-pic {
        height: 320px;
        background-image: url("./assets/rect.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
      .circle-box {
        width: 100%;
        height: 320px;
        background-image: url("./assets/rect.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
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
      padding-left: 40px;
      & > div {
        &:nth-child(1) {
          height: 65px;
        }
        &:nth-child(2) {
          height: calc(100% - 315px);
          #myChart {
            width: 100%;
            height: 100%;
          }
        }
        &:nth-child(3) {
          height: 250px;
        }
      }
      .today-info {
        text-align: center;
        background-image: url("./assets/gundong.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        .titleInfo {
          height: 100%;
          color: red;
          line-height: 65px;
          font-size: 20px;
          position: relative;

          .bell {
            float: left;
            width: 20px;
            height: 20px;
            margin-top: 23px;
            margin-left: 40px;
            background-image: url("./assets/warning.png");
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }
          #div1 {
            width: 900px;
            height: 65px;
            margin-left: 100px;
            overflow: hidden;
            white-space: nowrap;

            .con_text {
              width: 800px;
              height: 65px;
              font-size: 24px;
              color: #ff0f00;
              margin-left: 500px;
              letter-spacing: 3px;
            }
          }
        }
      }
      .table-wrapper {
        height: 180px;
      }
      .table-header {
        width: 100%;
        height: 40px;
        line-height: 40px;
        background-image: url("./assets/topBorder.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-bottom: 10px;
      }
      .table-content {
        height: 201px;
        overflow-y: auto;
        overflow-x: hidden;
        background-image: url("./assets/bottomBoder.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        display: flex;
        flex-direction: column;
        position: relative;
        z-index: 999;

        & > div {
          text-align: center;
          .list {
            margin-top: 10px;
          }
          .ps {
            font-size: 16px;
            line-height: 30px;
            color: #00ccff;
          }
          .unit {
            font-size: 14px;
            margin-left: -4px;
          }
          .numbers {
            font-family: ROME;
            font-size: 36px;
            background-image: -webkit-linear-gradient(bottom, #00ff54, #01f9fd);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            line-height: 50px;
          }
        }
        .ymd {
          height: 30px;

          text-align: right;
          .ymd_img {
            margin-left: 2px;
            cursor: pointer;
          }
        }
      }
    }
    .content-right {
      width: 20%;
      float: right;
      height: 100%;
      .title {
        color: #05dce5;
        width: 100%;
        height: 45px;
        line-height: 45px;
        font-size: 18px;
        text-align: left;
        background-image: url("./assets/title.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
      & > div {
        &:nth-child(1) {
          height: 128px;
          margin-bottom: 35px;
          .title {
            margin-bottom: 20px;
          }
          #warningInfo {
            height: calc(100% - 53px);
          }
        }
        &:nth-child(2) {
          height: 40%;
          min-height: 367px;
          margin-bottom: 20px;
          .title {
            margin-bottom: 0px;
          }
          #keyUnit {
            height: calc(100% - 53px);
          }
        }
        &:nth-child(3) {
          height: 375;
        }
        .chart-box {
          height: calc(100% - 53px);
        }
      }
      //灭火救救的年月日位置
      .helpDiv {
        position: relative;
        .help_ymd {
          position: absolute;
          right: 0;
          z-index: 200;
          img {
            margin-left: 5px;
            cursor: pointer;
          }
        }
      }
      .grid {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
      }
      .grid-li {
        flex: 1;
        height: 100%;
        position: relative;
        text-align: center;
        .grid-wei {
          position: absolute;
        }
        .grid_key {
          font-size: 14px;
          color: #03b0d8;
          margin-top: 110px;
          text-align: center;
          // position: absolute;
          bottom: 0;
          left: center;
          // width: 100px;
        }
        .grid_value {
          height: 100px;
          width: 100px;
          font-family: ROME;
          font-size: 46px;
          color: #f2fb48;
          line-height: 100px;
          text-align: center;
          background-image: url("./assets/group.png");
          background-repeat: no-repeat;
          background-size: 100%;
          background-position-x: 2px;
          margin: 0 auto;

          position: absolute;
          left: 14px;
          -webkit-perspective: 1500;
          -moz-perspective: 1500;
          backface-visibility: hidden;
          transition: all 1s;
        }
        .b2 {
          /* background: tomato; */
          transform: rotateY(-180deg);
        }
      }
      //border: 1px solid brown;
    }
    .under-pic {
      height: 321px;
      margin-top: 10px;
      background-image: url("./assets/rect.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
  }
}
*::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.2);
  background-color: #041530;
  border-radius: 4px;
}
*::-webkit-scrollbar {
  width: 4px;
  height: 4px;
  background-color: #057ac5;
  border-radius: 4px;
}
*::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: #057ac5;
}
</style>
<style>
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
@-webkit-keyframes myRotate {
  0% {
    -webkit-transform: rotate(0deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes myRotate {
  0% {
    -webkit-transform: rotate(0deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
</style>
