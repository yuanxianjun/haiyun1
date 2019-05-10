<template>
  <div id="battleDutyIndex">
    <div class="topHeader">
      <div class="logo">
        <img src="./assets/logo_title.png">
      </div>
      <div class="big_title">
        <img src="./assets/title_text.png" alt>
      </div>
      <div class="weather">
        <div class="sweater-box">
          <span class="date">2019-03-21</span>
          <span class="week">星期一</span>
          <span class="time">{{curTime}}</span>
        </div>
      </div>
    </div>
    <div class="content-wrapper">
      <div class="content-left">
        <div>
          <div class="name_div">
            <div class="out_circle"></div>
            <div class="name_con">
              <span class="police_name">黄景瑜</span>
              <span class="helleo">警官，您好</span>
            </div>
            <div class="out_btn" @click="showOutPage = true"></div>
          </div>
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
              <img v-show="!showUse" src="./assets/use2.png" alt>
            </div>
            <div @click="showSystom = !showSystom">
              <img
                v-show="showSystom"
                src="./assets/systom.png"
                style="width:100px;height:40px;margin-top:20px;"
                alt
              >
              <img v-show="!showSystom" src="./assets/systom2.png" alt>
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
          <div id="prepareDuty">
            <duty></duty>
          </div>
        </div>
        <div>
          <div class="title circle-title">
            <p class="title_p">人员数据</p>
            <a class="click_btn" href="#">
              <img src="./assets/into.png" alt>
            </a>
          </div>

          <div class="circle-box">
            <vuePie></vuePie>
          </div>
        </div>
      </div>
      <div class="content-middle">
        <div class="today-info">
          <div class="titleInfo">
            <span class="bell"></span>

            <div id="div1">
              <div id="div2">
                <span class="con_text">节假日期间旅游景点和博物馆、文物建筑、要注意了解安全出口和疏散通道</span>
              </div>
              <div id="div3"></div>
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
                    <p class="ps">发现火灾违法行为</p>
                    <p class="numbers">{{fireData[0]}}</p>
                  </div>
                </el-col>

                <el-col :span="5">
                  <div class="grid-content bg-purple">
                    <p class="ps">下发行政处罚决定书</p>
                    <p class="numbers">{{fireData[1]}}</p>
                  </div>
                </el-col>
                <el-col :span="5">
                  <div class="grid-content bg-purple">
                    <p class="ps">下发行政处罚决定书</p>
                    <p class="numbers">{{fireData[2]}}</p>
                  </div>
                </el-col>
                <el-col :span="5">
                  <div class="grid-content bg-purple">
                    <p class="ps">检查单位数</p>
                    <p class="numbers">{{fireData[3]}}</p>
                  </div>
                </el-col>
                <el-col :span="3">
                  <div class="grid-content bg-purple">
                    <p class="ps">拘留</p>
                    <p class="numbers">{{fireData[4]}}</p>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div class="list">
              <el-row>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <p class="ps">发现火灾违法行为</p>
                    <p class="numbers">{{fireData[0]}}</p>
                  </div>
                </el-col>

                <el-col :span="5">
                  <div class="grid-content bg-purple">
                    <p class="ps">下发行政处罚决定书</p>
                    <p class="numbers">{{fireData[1]}}</p>
                  </div>
                </el-col>
                <el-col :span="5">
                  <div class="grid-content bg-purple">
                    <p class="ps">下发行政处罚决定书</p>
                    <p class="numbers">{{fireData[2]}}</p>
                  </div>
                </el-col>
                <el-col :span="5">
                  <div class="grid-content bg-purple">
                    <p class="ps">检查单位数</p>
                    <p class="numbers">{{fireData[3]}}</p>
                  </div>
                </el-col>
                <el-col :span="3">
                  <div class="grid-content bg-purple">
                    <p class="ps">拘留</p>
                    <p class="numbers">{{fireData[4]}}</p>
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
              <div class="grid_value">78</div>
              <div class="grid_key">当日三级以上火灾</div>
            </li>
            <li class="grid-li">
              <div class="grid_value">150</div>
              <div class="grid_key">抢险救援</div>
            </li>
            <li class="grid-li">
              <div class="grid_value">950</div>
              <div class="grid_key">当日亡人火灾</div>
            </li>
          </ul>
        </div>
        <div>
          <div class="title">
            <p class="title_p">灭火救援</p>
            <a class="click_btn" href="#">
              <img src="./assets/into.png" alt>
            </a>
          </div>
          <div class="under-pic helpDiv">
            <div class="help_ymd" @click="helpClick()">
              <img @click="helpClick('y')" :src="showhelpY" alt>
              <img @click="helpClick('m')" :src="showhelpM" alt>
              <img @click="helpClick('d')" :src="showhelpD" alt>
            </div>
            <linechart :propsData="propsData" ref="line"></linechart>
          </div>
        </div>
        <div>
          <div class="title">
            <p class="title_p">机构运行</p>
            <a class="click_btn" href="#">
              <img src="./assets/into.png" alt>
            </a>
          </div>
          <div class="under-pic">
            <Agencies></Agencies>
          </div>
        </div>
      </div>
    </div>
    <div class="outPage" v-if="showOutPage">
      <div class="centerDiv">
        <div class="headImg">
          <img class="head_img" src="./assets/outHead.png" alt>
        </div>
        <div class="loginName">黄鲸鱼</div>
        <div class="btns">
          <div class="confirm" @click="outConfirm">
            <img src="./assets/modal_3.png" alt>
          </div>
          <div class="cancel" @click="outCancel">
            <img src="./assets/modal_4.png" alt>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import Stomp from "stompjs";

import $ from "jquery";
import { imgUrl } from "./assets/img/img";
import { setTimeout, clearTimeout } from "timers";

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
  name: "battleDutyIndex",
  data() {
    return {
      // 应用通报 和 系统维护
      showUse: true,
      showSystom: true,

      // 底部年月日的切换
      showfireY: y,
      showfireM: c_m,
      showfireD: d,
      showhelpY: c_y,
      showhelpM: m,
      showhelpD: d,
      propsData: "m",

      // 展示和关闭确认退出页面
      showOutPage: false,

      dialogTableVisible: false,
      dialogContent: "",

      todayData: {},
      keyUnitName: [],
      keyUnitValue: [],
      coordinates: [],

      prepareList: [],
      weather: null,
      curTime: "",

      keyUnitChart: null,
      fireResonChart: null,
      chinaMapChart: null,

      timeStamp: "",
      baseUrl: this.axios.defaults.baseURL.split("/ecp")[0],
      QNRTCUrl: localStorage.getItem("QNRTCUrl"),
      fill: { gradient: ["red", "green", "blue"] },
      tableMiddle: {
        y: [5678, 4343, 2324, 7227, 3435, 100],
        m: [2678, 23543, 2324, 2227, 2435, 500],
        d: [1678, 13543, 1424, 1227, 1435, 100]
      },
      fireData: [5678, 4343, 2324, 7227, 3435, 100],
      // 消防实力排序
      temp: []
    };
  },
  created() {
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
    // 调用横幅滚动条
    this.scrollText();
  },
  methods: {
    // 公告滚动效果
    scrollText() {
      var s, s2, s3, timer;
      function getid(id) {
        return document.getElementById(id);
      }
      s = getid("div1");
      s2 = getid("div2");
      s3 = getid("div3");
      s3.innerHTML = s2.innerHTML;
      timer = setInterval(mar, 100);
      function mar() {
        if (s2.offsetWidth <= s.scrollLeft) {
          s.scrollLeft -= s2.offsetWidth;
        } else {
          s.scrollLeft += 5;
        }
      }
    },
    // 退出按钮方法
    outConfirm() {
      this.showOutPage = false;
    },
    outCancel() {
      this.showOutPage = false;
    },
    // 防火监督年月日切换数值
    fireClick(params) {
      // params 代表传入的年或月或者日
      if (params == "y") {
        this.showfireY = c_y;
        this.showfireM = m;
        this.showfireD = d;

        this.fireData = this.tableMiddle.y;
      } else if (params == "m") {
        this.showfireM = c_m;
        this.showfireY = y;
        this.showfireD = d;

        this.fireData = this.tableMiddle.m;
      } else if (params == "d") {
        this.showfireD = c_d;
        this.showfireY = y;
        this.showfireM = m;

        this.fireData = this.tableMiddle.d;
      }
    },
    // 灭火救援的年月日切换
    helpClick(params) {
      // params 代表传入的年或月或者日
      if (params == "y") {
        this.showhelpY = c_y;
        this.showhelpM = m;
        this.showhelpD = d;
        this.propsData = this.xDataY;
        this.$refs.line.checkxData("y");
      } else if (params == "m") {
        this.showhelpM = c_m;
        this.showhelpY = y;
        this.showhelpD = d;
        this.propsData = this.xDataM;
        this.$refs.line.checkxData("m");
      } else if (params == "d") {
        this.showhelpD = c_d;
        this.showhelpY = y;
        this.showhelpM = m;
        this.propsData = "d";
        this.$refs.line.checkxData("d");
      }
    },
    // 点击跳转到执勤值班的页面
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
        let timeStr = hour + ":" + min;
        _this.curTime = timeStr;
      }, 1000);
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
    vuePie,
    duty,
    Agencies,
    linechart,
    earth
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
  background-image: url("./assets/background.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // 退出的弹框
  .outPage {
    width: 1920px;
    height: 1080px;
    opacity: 60%;
    background: rgba(0, 0, 0, 0.6);
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1000;

    .centerDiv {
      width: 456px;
      height: 445px;
      position: absolute;
      left: 50%;
      margin-left: -228px;
      top: 30%;
      background-image: url("./assets/modal1.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      .headImg {
        width: 180px;
        height: 180px;
        margin: 0 auto;
        margin-top: 80px;
        background-image: url("./assets/modal_2.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        text-align: center;
        padding-top: 55px;
        .header_img {
          width: 80px;
          height: 80px;
        }
        .btns {
          width: 100%;
          height: 80px;
          .confirm {
            width: 200px;
            height: 80px;
            float: left;
          }
        }
      }
      .loginName {
        height: 50px;
        text-align: center;
        color: #0ff;
        line-height: 40px;
        font-size: 18px;
        font-family: "ROME";
      }
      .btns {
        width: 100%;
        height: 80px;
        & > div {
          width: 200px;
          height: 80px;
          float: left;
        }
        .confirm {
          text-align: right;
        }

        .cancel {
          text-align: left;
          margin-left: 50px;
        }
      }
    }
  }
  .topHeader {
    width: 100%;
    height: 90px;
    position: relative;
    margin-bottom: 20px;
    overflow: hidden;
    background: url("./assets/heaer_backgroung.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    .logo {
      cursor: pointer;
      margin-top: 15px;
      position: absolute;
      left: 40px;
    }
    .big_title {
      text-align: center;
      img {
        margin-top: 10px;
      }
    }
    .weather {
      position: absolute;
      right: 0;
      top: 5px;
      text-align: right;
      line-height: 50px;
      span {
        color: #0ab7ff;
      }
      overflow: hidden;
      .sweater-box {
        color: #0ab7ff;
        width: 300px;
        text-align: left;
        padding-left: 20px;
        float: right;
        & > span {
          width: 100px;
          font-size: 16px;
          margin-left: 20px;
        }
      }
    }
  }
  .content-wrapper {
    width: 1920px;
    height: 970px;
    color: #fff;
    padding: 0 40px 40px 40px;
    .content-left {
      width: 20%;
      height: 100%;
      min-width: 367px;
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
            & > div {
              flex: 1;
              width: 50%;
              height: 80px;
              text-align: center;
              img {
                width: 100%;
                height: 80px;
                // margin-top: 20px;
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
          min-height: 360px;
          margin-bottom: 20px;
        }
        &:nth-child(4) {
          min-height: 360px;
        }
      }
      /*登录名称*/
      .name_div {
        width: 100%;
        height: 80px;
        background: url("assets/sign.png") no-repeat center center;
        /*background-size: auto 100%;*/
        .out_circle {
          width: 100px;
          height: 100px;
          position: absolute;
          left: 30px;
          top: 100px;
          background: url(assets/logo_pie.png) no-repeat center center;
          -webkit-background-size: cover;
          background-size: cover;
          -webkit-animation: myRotate 10s linear infinite;
          animation: myRotate 10s linear infinite;
        }
        .name_con {
          line-height: 80px;
          margin-left: 110px;
          .police_name {
            color: #0ab7ff;
            font-size: 18px;
            margin-right: 10px;
          }
          .helleo {
            font-size: 18px;
            color: #fff;
          }
        }
        .out_btn {
          position: absolute;
          left: 323px;
          top: 136px;
          width: 30px;
          height: 30px;
          background: url(assets/out.png) no-repeat center center;
          cursor: pointer;
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
        height: 318px;
        overflow-y: auto;
        background-image: url("./assets/rect.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-top: 10px;
      }
      .under-pic {
        height: calc(100% - 40px);
        min-height: 308px;
        background-image: url("./assets/rect.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
      .circle-box {
        width: 100%;
        height: 300px;
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
            #div2 {
              width: auto;
              height: 65px;
              display: inline-block;
              line-height: 65px;
              word-spacing: 10px;
              span {
                width: 800px;
                height: 65px;
                font-size: 24px;
                color: #ff0f00;
                margin-left: 500px;
              }
            }
            #div3 {
              width: auto;
              height: 65px;
              display: inline-block;
              line-height: 65px;
              text-align: center;
              span {
                width: 800px;
                height: 65px;
                font-size: 24px;
                color: #ff0f00;
                margin-left: 500px;
              }
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
        height: 200px;
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
          height: 40%;
          min-height: 367px;
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

        .grid_key {
          font-size: 14px;
          color: #03b0d8;
          margin-top: 5px;
          text-align: center;
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
        }
      }
      //border: 1px solid brown;
    }
    .under-pic {
      height: calc(100% - 65px);
      height: 308px;
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
