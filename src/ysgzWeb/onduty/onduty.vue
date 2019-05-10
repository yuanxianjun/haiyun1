	<template>
  <div id="dutyDiv">
    <comHeader></comHeader>
    <backHome :localPage="'执勤值班'"></backHome>
    <div class="dutyBottom">
      <div class="duty_left">
        <!-- 退出按钮  -->
        <comOut></comOut>
        <div class="leftOne">
          <div class="left_header">
            <p class="divTitle">警情数据</p>
            <a href="#">
              <img src="../../common/images/into.png" alt>
            </a>
          </div>
          <div class="leftOne_content background_content">
            <div>
              <p class="textOne">年</p>
              <p class="textCenter">{{industryData.yearCount || 0}}</p>
            </div>
            <div>
              <p class="textOne">月</p>
              <p class="textCenter">{{industryData.monthCount || 0}}</p>
            </div>
            <div>
              <p class="textOne">今日</p>
              <p class="textCenter">{{industryData.dayCount || 0}}</p>
            </div>
            <div>
              <p class="textOne">昨日</p>
              <p class="textCenter">{{industryData.yesterdayCount || 0}}</p>
            </div>
          </div>
        </div>
        <!--值班要请-->
        <div class="leftTwo">
          <div class="left_header">
            <p class="divTitle">值班要情</p>
            <a href="#">
              <img src="../../common/images/into.png" alt>
            </a>
          </div>
          <div class="dutygun background_content">
            <div class="h_20"></div>
            <vue-seamless-scroll
              class="scrollDiv"
              :data="scrollData_duty"
              :class-option="classOption"
            >
              <div class="item">
                <p
                  class="scrollP"
                  v-for="(item,index) in scrollData_duty"
                  :key="index"
                  :title="item.title"
                >
                  <span>NO.{{index}}</span>
                  {{item.title}}
                </p>
                <!-- <p class="scrollP" title="欢迎市委领导视察检查工作">
                  <span>NO.1</span>欢迎市委领导视察检查工作
                </p>-->
              </div>
            </vue-seamless-scroll>
            <div class="h_20"></div>
          </div>
        </div>
        <!-- 视频系统 -->
        <div>
          <div class="left_header">
            <p class="divTitle">视频系统</p>
            <a href="#">
              <img src="../../common/images/into.png" alt>
            </a>
          </div>
          <div class="vedioDiv background_content">
            <div class="leftvedio">
              <img src="./assets/yinqu.png" alt>
            </div>
            <div class="rightvedio">
              <img src="./assets/zhihui.png" alt>
            </div>
          </div>
        </div>
      </div>

      <div class="content_right">
        <div>
          <div class="selectDiv">
            <span class="ROME">{{curDate}}</span>
            <img src="./assets/nabla.png" alt>
            <div class="clander">
              <el-date-picker
                value-format="yyyy-MM-dd"
                v-model="selectedData"
                type="date"
                placeholder="选择日期"
                @change="changeHandler"
              ></el-date-picker>
            </div>
          </div>
          <!-- 日历当前的天数 -->
          <div class="dayDiv">
            <span
              v-for="(item,index) in days"
              :class="[ nowDay-1 == index ? 'clanderSlected': '','calenderSpan']"
              :key="index"
              @click="changeStyle(index)"
            >{{item}}</span>
          </div>
        </div>
        <div class="tableDiv">
          <ul>
            <li class="thead">
              <span v-for="(item,index) in tableData.theadData" :key="index">{{item.trHeader}}</span>
            </li>

            <li class="tdHead" v-for="(item,index) in tableData.tdData" :key="index">
              <span id="firstSpan" :title="item.name">{{item.name}}</span>
              <span>
                <a class="peopleName" href="#">{{item.data && item.data["带班领导"]}}</a>
              </span>

              <span>
                <a class="peopleName" href="#">{{item.data && item.data["值班领导"]}}</a>
              </span>
              <span>
                <a class="peopleName" href="#">{{item.data && item.data["指挥长"]}}</a>
              </span>
              <span>
                <a class="peopleName" href="#">{{item.data && item.data["行政值班"]}}</a>
              </span>
              <span>
                <a class="peopleName" href="#">{{item.data && item.data["作战值班"]}}</a>
              </span>
              <span>
                <a class="peopleName" href="#">{{item.data && item.data["作战助理"]}}</a>
              </span>
              <span>
                <a class="peopleName" href="#">{{item.data && item.data["通信助理"]}}</a>
              </span>
              <span>
                <a class="peopleName" href="#">{{item.data && item.data["政工护理"]}}</a>
              </span>
              <span>
                <a class="peopleName" href="#">{{item.data && item.data["保障助理"]}}</a>
              </span>
              <span>
                <a class="peopleName" href="#">{{item.data && item.data["宣传助理"]}}</a>
              </span>
            </li>
          </ul>
        </div>
        <div class="con_bottom">
          <div class="cb_one">
            <div class="cb_title">
              <p class="divTitle">预警信息</p>
              <a href="#">
                <img src="../../common/images/into.png" alt>
              </a>
            </div>
            <div class="cb_con cb_con_first">
              <div class="scrollYu"></div>

              <vue-seamless-scroll
                class="cb_con_second"
                :data="scrollDataYu"
                :class-option="classOption"
              >
                <ul class="item">
                  <li class="conli" v-for="(item,index) in scrollDataYu" :key="index">
                    <span class="qixiang">气象</span>
                    <p class="con" :title="item.value">{{item.value}}</p>
                    <span class="time">21:33:00</span>
                  </li>
                </ul>
              </vue-seamless-scroll>
            </div>
          </div>

          <div>
            <div class="cb_title">
              <p class="divTitle">舆情信息</p>
              <a href="#">
                <img src="../../common/images/into.png" alt>
              </a>
            </div>
            <div class="cb_con">
              <div class="scrollYu"></div>
              <vue-seamless-scroll
                class="cb_con_second"
                :data="scrollDataYu"
                :class-option="classOption"
              >
                <ul class="item">
                  <li class="conli" v-for="(item,index) in scrollDataYu" :key="index">
                    <span class="dian"></span>
                    <p class="con" :title="item.value">{{item.value}}</p>
                    <span class="time">21:33:00</span>
                  </li>
                </ul>
              </vue-seamless-scroll>
            </div>
          </div>
          <div>
            <div class="cb_title">
              <p class="divTitle">超速报警</p>
              <a href="#">
                <img src="../../common/images/into.png" alt>
              </a>
            </div>
            <div class="cb_con cb_con_three">
              <ul>
                <li v-for="(item,index) in overSpeedData" :key="index+'speed'">
                  <span class="car_img">{{item.carNum}}</span>
                  <span class="con">当前时速:</span>
                  <span class="red_color">{{item.speed}}km/h</span>
                  <span class="warningBell"></span>
                </li>

                <!-- <li>
                  <span class="car_img">贵A,223</span>
                  <span class="con">当前时速:</span>
                  <span class="red_color">740km/h</span>
                  <span class="warningBell"></span>
                </li>-->
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
	
	<script>
import echarts from "echarts";

import { numbersSplit } from "../../tools/util.js";
import { imgUrl } from "./assets/img/img";
import { setTimeout, clearTimeout } from "timers";
// 引入头部的组件
import comHeader from "../components/comHeader";
import comOut from "../components/comOut";
import backHome from "../components/toHome";

// // 引入滑动组件
import vueSeamlessScroll from "vue-seamless-scroll";

export default {
  name: "ysgzIndex",
  data() {
    return {
      // 警情数据
      industryData: {},
      // 日历天数
      days: [],
      daySpanStyle: "can",
      nowDay: 0,
      selectedData: "",

      scrollDataYu: [
        { value: "贵州省贵阳市北屯小区发生重大火灾大佛寺放假哦" },
        { value: "贵州省贵阳市北屯小区发生重大火灾大佛寺放假哦" },
        { value: "贵州省贵阳市北屯小区发生重大火灾大佛寺放假哦" },
        { value: "贵州省贵阳市北屯小区发生重大火灾大佛寺放假哦" },
        { value: "贵州省贵阳市北屯小区发生重大火灾大佛寺放假哦" },
        { value: "贵州省贵阳市北屯小区发生重大火灾大佛寺放假哦" },
        { value: "贵州省贵阳市北屯小区发生重大火灾大佛寺放假哦" }
      ],
      // 值班要情数据
      scrollData_duty: [
        {
          title: "欢迎市委领导视察检查工作是佛山能否士大夫精神疗法"
        },
        {
          title: "sfsfdsdfsf视察检查工作是佛山能否士大夫精神疗法"
        },
        {
          title: "是否收费方式发给察检查工作是佛山能否士大夫精神疗法"
        }
      ],
      tableData: {
        tdData: [
          {
            name: "总队机关",
            value: {
              作战值班: "查爱平"
            }
          },
          {
            name: "贵阳",
            value: {}
          },
          {
            name: "遵义",
            value: {}
          },
          {
            name: "安顺",
            value: {}
          },
          {
            name: "黔南",
            value: {}
          },
          {
            name: "黔东南",
            value: {}
          },
          {
            name: "铜仁",
            value: {}
          },
          {
            name: "毕节",
            value: {}
          },
          {
            name: "六盘水",
            value: {}
          },
          {
            name: "黔东南",
            value: {}
          },
          {
            name: "贵安",
            value: {}
          },
          {
            name: "培训基地",
            value: {}
          }
        ],
        theadData: [
          {
            trHeader: "单位"
          },
          {
            trHeader: "带班领导"
          },
          {
            trHeader: "值班领导"
          },
          {
            trHeader: "指挥长"
          },

          {
            trHeader: "行政值班"
          },
          {
            trHeader: "作战值班"
          },
          {
            trHeader: "作战助理"
          },
          {
            trHeader: "通信助理"
          },
          {
            trHeader: "政工助理"
          },
          {
            trHeader: "保障助理"
          },
          {
            trHeader: "宣传助理"
          }
        ]
      },
      timer1: null,
      timer2: null,
      curDate: "",
      //展示日历
      showClander: true,
      checkYear: "",
      checkMonth: "",
      checkDay: "",
      checkYMD: "",
      // 超速报警数
      overSpeedData: []
    };
  },
  created() {
    this.getCurrTime();
    this.police_gd(this.checkYMD);
    this.perSonData_gd(this.checkYMD);
    // this.perSonData_gd(this.checkYMD);
    // 值班详情
    this.detailDuty_gd();
    // 超速报警
    this.overSpeedData_gd();
  },
  mounted() {
    var _this = this;

    window.addEventListener("resize", () => {});
    // 调用横幅滚动条
    var _this = this;
    // 日历操作
    var nowDate = new Date();
    this.nowDay = nowDate.getDate();
    this.setInter();
  },
  methods: {
    // 启用定时器
    setInter() {
      var timer = null;
      var _ = this;
      setTimeout(function() {
        _.overSpeedData_gd();
        setTimeout(function() {
          _.setInter();
        }, 3600000);
      }, 3600000);
    },
    // 超速报警数据获取
    overSpeedData_gd() {
      this.axios({
        method: "post",
        url: "/duty/overSpeed/"
      }).then(res => {
        if (res.status == 200) {
          if (res.data.result) {
            this.overSpeedData = res.data.result;
          }
        }
      });
    },
    // 值班人员信息表
    perSonData_gd(date) {
      this.axios({
        method: "post",
        url: "/duty/detail/" + date,
        params: {}
      }).then(res => {
        if (res.status == 200) {
          console.log(res.data.result == "[]");
          if (res.data.result) {
            var data = JSON.parse(res.data.result);
            console.log(data, "值班详情数据");

            var oldData = [
              {
                name: "总队机关",
                value: {
                  作战值班: "查爱平"
                }
              },
              {
                name: "贵阳",
                value: {}
              },
              {
                name: "遵义",
                value: {}
              },
              {
                name: "安顺",
                value: {}
              },
              {
                name: "黔南",
                value: {}
              },
              {
                name: "黔东南",
                value: {}
              },
              {
                name: "铜仁",
                value: {}
              },
              {
                name: "毕节",
                value: {}
              },
              {
                name: "六盘水",
                value: {}
              },
              {
                name: "黔东南",
                value: {}
              },
              {
                name: "贵安",
                value: {}
              },
              {
                name: "培训基地",
                value: {}
              }
            ];
            if (data.length == 0) {
              this.tableData.tdData = oldData;
            } else {
              this.tableData.tdData = data;
            }
          }
        } else {
          console.log("请求错误");
        }
      });
    },
    // 值班要情
    detailDuty_gd() {
      this.axios({
        method: "post",
        url: "/duty/notification/",
        params: {}
      }).then(res => {
        if (res.status == 200) {
          var data = res.data.result;

          if (data) {
            this.scrollData_duty = data;
          }
        } else {
          console.log("请求错误");
        }
      });
    },
    // 警情数据
    police_gd(date) {
      this.axios({
        method: "post",
        url: "/duty/alarmInfo/" + date,
        params: {}
      }).then(res => {
        if (res.status == 200) {
          var data = res.data.result;
          // console.log(data, "警情数据");
          if (data) {
            for (var i in data) {
              data[i] = numbersSplit(data[i]);
            }
            this.industryData = data;
          }
        } else {
          console.log("请求错误");
        }
      });
    },
    //处理日历格式 将当前日期处理成2019-04-18 的形式
    dealDate(year, month, day) {
      if (month.length < 2) {
        month = "0" + month;
      }
      if (day.length < 2) {
        day = "0" + day;
      }
      this.year = year;
      this.month = month;
      this.day = day;
      this.checkYMD = this.year + "-" + this.month + "-" + this.day;
    },
    // 判断当前是几月来改变当前横轴上额值
    pushDays(year, month) {
      var arr = [];
      var value = "";
      value = new Date(year, month, 0).getDate();
      for (let i = 1; i <= value; i++) {
        if (i < 10) {
          arr.push("0" + i);
        } else {
          arr.push(i);
        }
      }
      this.days = arr;
    },
    // 单击选择日期更改选中的日期的样式
    changeStyle(index) {
      var dayValue = index + 1 < 10 ? "0" + (index + 1) : index + 1;
      this.nowDay = index + 1;

      this.dealDate(this.checkYear, this.checkMonth, dayValue);
      console.log(this.checkYMD);
      this.perSonData_gd(this.checkYMD);
    },
    changeHandler() {
      this.showClander = false;
      var checkYear = this.selectedData.slice(0, 4);
      var checkMonth = this.selectedData.slice(5, 7);
      var checkDay = this.selectedData.slice(-2);

      if (checkDay[0] == 0) {
        checkDay = checkDay.slice(-1);
      }

      this.curDate = checkYear + " - " + checkMonth;
      if (checkMonth[0] == 0) {
        checkMonth = checkMonth.slice(-1);
      }

      this.pushDays(checkYear, checkMonth);

      this.nowDay = checkDay;
      this.dealDate(checkYear, checkMonth, checkDay);
      this.perSonData_gd(this.checkYMD);
      console.log(
        "点击更改事件",
        checkYear,
        checkMonth,
        this.nowDay,
        this.checkYMD
      );
    },

    // 获取时间
    getCurrTime() {
      let _this = this;
      // setInterval(function() {}, 1000);
      let time = new Date(); // 程序计时的月从0开始取值后+1
      let year, month, day, hour, min, sec, week;
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
      let timeStr = hour + " : " + min;
      week = time.getDay();
      _this.curDate = this.curDate || year + " - " + month;

      this.checkYear = year;
      this.checkMonth = month;
      this.checkDay = day;
      this.dealDate(year, month, day);
      this.pushDays(year, time.getMonth() + 1);
      // console.log(year, month, "create里面的事件");
    }
  },
  watch: {},
  computed: {
    classOption() {
      return {
        step: 0.3, //步长 越大滚动速度越快
        limitMoveNum: 4, //启动无缝滚动最小数据量 this.dataList.length
        hoverStop: true, //是否启用鼠标hover控制
        direction: 1, //1 往上 0 往下
        openWatch: true, //开启data实时监听
        singleHeight: 0, //单条数据高度有值hoverStop关闭
        waitTime: 1000 //单步停止等待时间
      };
    }
  },
  components: {
    // vuePie,
    // duty,
    // Agencies,
    // linechart,
    // earth,
    comHeader,
    comOut,
    backHome,
    vueSeamlessScroll
  }
};
</script>
	<style lang="scss" >
@import "../../common/styles/font.css";
html,
body {
  height: 100%;
  font-family: yiwei;
}
.ROME {
  font-family: ROME;
}
.h_20 {
  height: 20px;
}
#dutyDiv {
  width: 1920px;
  height: 1080px;
  overflow: hidden;
  position: relative;
  background-image: url("../../common/images/background.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  .divTitle {
    font-size: 16px;
    /*字体渐变*/
  }

  .color-grind {
    background: linear-gradient(to bottom, #02f4fb, #0f84d4);
    -webkit-background-clip: text;
    color: transparent;
  }

  .dutyBottom {
    width: 1920px;
    height: 990px;
    padding: 20px 40px 40px 40px;
    box-sizing: border-box;
    & > div {
      box-sizing: border-box;
    }
  }
  .duty_left {
    width: 345px;
    height: 990px;
    margin-right: 20px;
    display: flex;
    flex-direction: column;
    float: left;
    & > div {
      width: 345px;

      margin-top: 20px;
      &:nth-child(3) {
        height: 234px;
        // background: red;
      }
      &:nth-child(4) {
        height: 300px;
        // background: blue;
      }
    }
    .left_header {
      height: 45px;
      background: url(./assets/leftTitle.png) no-repeat center center;
      background-size: 100% 100%;
      margin-bottom: 10px;
      line-height: 30px;
      p {
        float: left;
        text-indent: 20px;
        line-height: 45px;
        font-size: 20px;
        background: linear-gradient(to bottom, #02f4fb, #0f84d4);
        -webkit-background-clip: text;
        color: transparent;
      }
      a {
        float: right;
        cursor: pointer;
        margin: 0;
      }
    }
    .background_content {
      background: url(./assets/bottomBoder.png) no-repeat center center;
      background-size: 100% 100%;
    }
    .leftOne {
      width: 345px;
      height: 235px;
      .leftOne_content {
        width: 345px;
        height: 180px;
        font-family: rome;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        & > div {
          float: left;
          width: 155px;
          height: 80px;
          background: url(./assets/yue.png) no-repeat center center;
          background-size: 100% 100%;
          padding: 4px 0px 0px 2px;
          margin-left: 12px;
          margin-top: 5px;
          .textOne {
            font-size: 18px;
            color: #00d9ff;
            text-indent: 10px;
          }
          .textCenter {
            font-size: 40px;
            text-align: center;
            background: linear-gradient(to bottom, #f4fc01, #ffc300);
            -webkit-background-clip: text;
            color: transparent;
          }
        }
      }
    }
    .leftTwo {
      width: 345px;
      height: 235px;
    }
    .dutygun {
      height: 180px;
      .scrollDiv {
        width: 268px;
        height: 140px;
        margin: 0 auto;

        overflow: hidden;
        .scrollP {
          width: 268px;
          height: 40px;
          font-size: 14px;
          line-height: 40px;
          color: #0394b7;
          background: url(./assets/line.png) no-repeat center bottom;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          cursor: pointer;
          span {
            margin-right: 20px;
          }
        }
        .scrollP:hover {
          width: 268px;
          height: 40px;
          font-size: 16px;
          line-height: 40px;
          color: #00ffff;
          background: url(./assets/line.png) no-repeat center bottom;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          cursor: pointer;
          span {
            margin-right: 20px;
          }
        }
      }
    }
    .vedioDiv {
      width: 345px;
      height: 245px;
      display: flex;
      background: url(./assets/t000.png) no-repeat center center;
      background-size: 100% 100%;
      flex-direction: row;
      justify-content: space-around;
      & > div {
        height: 240px;
        width: 50%;
        float: left;
        text-align: center;
        cursor: pointer;
        img {
          margin-top: 50%;
          width: 162px;
          height: 59px;
        }
      }
      .leftvedio {
        background: url(./assets/vedio1.png) no-repeat center;
      }
      .rightvedio {
        background: url(./assets/vedio2.png) no-repeat center;
      }
    }
  }
  .content_right {
    width: 1475px;
    height: 990px;
    float: left;
    position: relative;
    & > div {
      &:nth-child(1) {
        width: 1475px;
        height: 80px;
        .selectDiv {
          height: 30px;
          font-size: 24px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 17px;
          letter-spacing: 0px;
          color: #00ffff;
          img {
            vertical-align: middle;
            margin-left: 10px;
            cursor: pointer;
          }
          .clander {
            position: absolute;
            left: 0;
            top: -5px;
            .el-input__suffix {
              display: none;
            }
            .el-input__prefix {
              display: none;
            }
            .el-input__inner {
              cursor: pointer;
              background: transparent;
              border: none;
              color: transparent;
              padding: 0;
            }
            .el-input__inner::-webkit-input-placeholder {
              color: transparent;
            }
          }
        }
        .dayDiv {
          width: 1475px;
          height: 45px;
          line-height: 45px;
          font-size: 14px;
          color: #039dc3;
          background: url(./assets/dayBackground.png) no-repeat center;
          background-size: 100% 100%;
          display: flex;
          flex-direction: row;
          padding-left: 40px;
          padding-right: 40px;
          justify-content: space-between;
          .calenderSpan {
            cursor: pointer;
          }
          .clanderSlected {
            background: url("./assets/slected.png") no-repeat center center;
            background-size: 10px 100%;
            font-size: 18px;
            color: #00ffff;
          }
          span {
            width: 40px;
            height: 45px;
            text-align: center;
          }
        }
      }
    }
    .tableDiv {
      width: 100%;
      height: 492px;
      margin-top: 38px;
      background: url(./assets/table_out.png) no-repeat center center;
      background-size: 100% 100%;
      ul {
        border-left: 1px solid #012f55;
        border-top: 1px solid #012f55;
        .peopleName {
          font-size: 14px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 22px;
          letter-spacing: 0px;
          color: #03b0d8;
        }
        .peopleName:hover {
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 22px;
          letter-spacing: 0px;
          color: #00ffff;
        }
        .thead {
          font-size: 18px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 22px;
          letter-spacing: 0px;
          color: #7de3fa;
          height: 60px;
          line-height: 60px;
        }
        .tdHead {
          font-size: 18px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 22px;
          letter-spacing: 0px;
          color: #7de3fa;
          height: 36px;
          line-height: 36px;
        }
        li {
          height: 36px;
          border-bottom: 1px solid #012f55;
          line-height: 36px;
          display: flex;
          flex-direction: row;
          span {
            flex: 1;
            border-right: 1px solid #012f55;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          // span:not([id="firstSpan"]) {
          //   flex: 1;
          //   border-right: 1px solid #012f55;
          //   text-align: center;
          // }
          // #firstSpan {
          //   border-right: 1px solid #012f55;
          //   text-align: center;
          //   width: 160px;
          //   overflow: hidden;
          // }
        }
      }
    }
    .con_bottom {
      width: 100%;
      height: 300px;
      margin-top: 20px;
      font-family: ROME;
      & > div {
        width: 475px;
        height: 300px;
        float: left;
        margin-right: 21px;
        &:nth-child(3) {
          float: right;
          margin: 0;
        }
      }
      .cb_title {
        height: 45px;
        background: url(./assets/fourtitle.png) no-repeat center center;
        background-size: 100% 100%;
        margin-bottom: 10px;
        p {
          float: left;
          text-indent: 20px;
          line-height: 45px;
          font-size: 20px;
          background: linear-gradient(to bottom, #02f4fb, #0f84d4);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        a {
          height: 45px;
          float: right;
          cursor: pointer;
          margin-top: 12.5px;
          /*line-height: 45px;*/
        }
      }
      .cb_con {
        width: 475px;
        height: 245px;
        background: url(./assets/fourcontent.png) no-repeat center center;
        background-size: 100% 100%;
        font-family: ROME;
      }
      .cb_con_first {
        .qixiang {
          width: 40px;
          height: 16px;

          -webkit-text-size-adjust: none;
          text-size-adjust: none;
          background-image: linear-gradient(
              0deg,
              #107dd2 0%,
              #09bce8 50%,
              #01f9fd 100%
            ),
            linear-gradient(177deg, #000000 0%, #ffffff 100%);
          background-blend-mode: normal, normal;
          border: solid 1px #00ffff;
          // opacity: 0.57;
          color: #ffffff;
          font-size: 10px;
          text-align: center;
          line-height: 16px;
          margin-left: 6px;
          margin-right: 6px;
        }
        .cb_first1 {
          height: 60px;
          // background: red;
          font-size: 14px;
          color: #fff;
          & > div {
            float: left;
            line-height: 80px;

            &:nth-child(1) {
            }
            &:nth-child(2) {
              float: left;
              margin-left: 10px;
            }
            &:nth-child(3) {
              float: left;
              margin-left: 80px;
            }
            &:nth-child(4) {
              float: right;
            }
            .color-yellow {
              color: #02193b;
            }
          }
          .color-yellow {
            font-size: 14px;
            color: #fff000;
          }
          .clanderImg {
            width: 45px;
            height: 45px;
            margin-left: 20px;
            margin-top: 20px;
            background: url(./assets/rili.png) no-repeat center center;
            background-size: 100% 100%;
            font-size: 20px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 40px;
            letter-spacing: 0px;
            color: #070707;
            opacity: 0.9;
            text-align: center;
          }
          .ymd {
            .font24 {
              font-size: 24px;
            }
          }
          overflow: hidden;
        }
        .cb_first2 {
          height: 80px;
          .leftImg {
            width: 40px;
            height: 40px;
            background: url(./assets/yangguang.png) no-repeat center center;
            background-size: 100% 100%;
            margin-top: 15px;
          }
          & > div {
            float: left;
            &:nth-child(1) {
              width: 50px;
              height: 50px;
              margin-left: 20px;
              line-height: 80px;
            }
            &:nth-child(2) {
              line-height: 30px;
              margin-top: 10px;
              margin-left: 10px;
              .textTitle {
                // font-size: ;
                color: #0ba2d8;
              }
              .textContent {
                color: #fff;
                font-size: 24px;
              }
            }
            &:nth-child(3) {
              float: right;
              line-height: 80px;
              margin-right: 20px;
              color: #ffff;
            }
          }
        }
        .cb_first3 {
          height: 80px;
          background: url(./assets/cbfirst3_background.png) no-repeat center
            center;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          ul {
            width: 431px;
            height: 76px;
            // background: skyblue;
            margin-left: 20px;
            margin-top: 6px;
            li {
              width: 25%;
              height: 80px;
              text-align: center;
              color: #fff;
              float: left;
              &:nth-child(1) {
                text-indent: 30px;
              }
              .c_up {
                color: #00d9ff;
                margin-top: 12px;
              }
              .c_botttom {
                line-height: 28px;
              }
            }
          }
        }
      }
      .scrollYu {
        width: 100%;
        height: 20px;
        margin: 0;
      }
      .cb_con_second {
        width: 475px;
        height: 205px;
        overflow: hidden;
        display: block;
        ul > li {
          height: 40px;
          line-height: 40px;
          vertical-align: middle;
          span {
            display: inline-block;
            vertical-align: middle;
          }
          p {
            display: inline-block;
            vertical-align: middle;
          }
        }
        .dian {
          width: 10px;
          height: 10px;
          /*background:url(./assets/dian.png) no-repeat center center;
	    				background-size:100% 100%;*/
          background-color: #05dbf3;
          margin: 20px;
          border-radius: 50%;
        }
        .con {
          width: 320px;
          font-size: 16px;
          color: #0899d9;
          line-height: 40px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .conli:hover {
          p {
            font-size: 18px;
            color: #00ffff;
          }
          .time {
            font-size: 18px;
            color: #00ffff;
          }
        }

        .time {
          font-size: 16px;
          color: #0899d9;
          line-height: 40px;
          margin-left: 30px;
        }
      }
      .cb_con_three {
        display: block;
        width: 100%;
        height: 245px;
        ul {
          width: 100%;
          height: 245px;
          overflow: auto;
        }
        ul > li {
          line-height: 80px;
          margin-left: 20px;
          span {
            display: inline-block;
            vertical-align: middle;
          }
          p {
            display: inline-block;
            vertical-align: middle;
          }
          .car_img {
            width: 200px;
            height: 60px;
            background: url(./assets/caricon.png) no-repeat center center;
            background-size: 100% 100%;
            text-align: center;
            color: #ffffff;
            font-size: 18px;
            line-height: 60px;
            text-align: center;
            text-indent: 45px;
          }
          .con {
            width: 80px;
            margin-left: 10px;
            color: #ffffff;
          }
          .red_color {
            width: 80px;
            color: #ff0000;
            font-size: 24px;
            display: inline;
          }
          .warningBell {
            width: 30px;
            height: 30px;
            margin-left: 20px;
            background: url(./assets/speed.png) no-repeat center center;
            background-size: 100% 100%;
          }
        }
      }
    }
  }
}
</style>
<style >
.el-picker-panel__body-wrapper {
  font-family: "ROME";
}
</style>
	<style>
/*文字无缝滚动*/
@keyframes textMove {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-150px);
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
