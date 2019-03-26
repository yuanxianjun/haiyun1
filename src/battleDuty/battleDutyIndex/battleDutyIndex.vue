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
          <p class="titleInfo">
            <span class="bell"></span>
            节假日期间旅游景点和博物馆、文物建筑、要注意了解安全出口和疏散通道
          </p>
        </div>

        <div class="chart-wrapper">
          <earth></earth>
        </div>

        <div class="table-wrapper">
          <div class="table-content">
          	<div>
          		<el-row >
						  <el-col :span="6"><div class="grid-content bg-purple"><p class="ps">
						  		发现火灾违法行为
						  	</p>
						  	<p class="numbers">
						  		2,455
						  	</p></div></el-col>
						 
						  <el-col :span="5"><div class="grid-content bg-purple"><p class="ps">
						  		下发行政处罚决定书
						  	</p>
						  	<p class="numbers">
						  		2,455
						  	</p></div></el-col>
						  	<el-col :span="5"><div class="grid-content bg-purple"><p class="ps">
						  		下发行政处罚决定书
						  	</p>
						  	<p class="numbers">
						  		2,455
						  	</p></div></el-col>
						  	 <el-col :span="5"><div class="grid-content bg-purple"><p class="ps">
						  		检查单位数
						  	</p>
						  	<p class="numbers">
						  		2,455
						  	</p></div></el-col>
						  	 <el-col :span="3"><div class="grid-content bg-purple"><p class="ps">
						  		拘留
						  	</p>
						  	<p class="numbers">
						  	45
						  	</p></div></el-col>
						</el-row>
          	</div>
          	<div>
      
          		<el-row >
						  <el-col :span="6"><div class="grid-content bg-purple"><p class="ps">
						  		发现火灾违法行为
						  	</p>
						  	<p class="numbers">
						  		2,455
						  	</p></div></el-col>
						 
						  <el-col :span="5"><div class="grid-content bg-purple"><p class="ps">
						  		下发行政处罚决定书
						  	</p>
						  	<p class="numbers">
						  		2,455
						  	</p></div></el-col>
						  	<el-col :span="5"><div class="grid-content bg-purple"><p class="ps">
						  		下发行政处罚决定书
						  	</p>
						  	<p class="numbers">
						  		2,455
						  	</p></div></el-col>
						  	 <el-col :span="5"><div class="grid-content bg-purple"><p class="ps">
						  		检查单位数
						  	</p>
						  	<p class="numbers">
						  		2,455
						  	</p></div></el-col>
						  	 <el-col :span="3"><div class="grid-content bg-purple"><p class="ps">
						  		拘留
						  	</p>
						  	<p class="numbers">
						  	45
						  	</p></div></el-col>
						</el-row>
          	</div>
            
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
          <div class="under-pic">
          		<linechart></linechart>
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
import Agencies from './components/funal.vue'
// 引入机构运行组件
import linechart from './components/lineChart.vue'
// 引入地球
import earth from "./components/earthBall.vue"

export default {
  name: "battleDutyIndex",
  data() {
    return {
      dialogTableVisible: false,
      dialogContent: "",
      dialogTitle: "",

      todayData: {},
      keyUnitName: [],
      keyUnitValue: [],
      coordinates: [],
     
      prepareList: [],
      weather: null,
      curTime: "",
      currCityName: "",
      
      keyUnitChart: null,
      fireResonChart: null,
      chinaMapChart: null,
      isShowDialog: false,
      timeStamp: "",
      baseUrl: this.axios.defaults.baseURL.split("/ecp")[0],
      QNRTCUrl: localStorage.getItem("QNRTCUrl"),
      fill: { gradient: ["red", "green", "blue"] },
      tableMiddle: [
      {
      	name:"发现火灾违法行为",
      	value:"2,455"
      },
      {
      	name:"下发行政处罚决定书",
      	value:"2,455"
      },
      {
      	name:"下发行政强制决定书",
      	value:"2,455"
      },
      {
      	name:"检查单位数",
      	value:"2,455"
      },
      {
      	name:"拘留",
      	value:"45"
      },
      ], // 消防实力排序
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
    vuePie,
    duty,
    Agencies,
    linechart,
    earth
  }
};
</script>


<style lang="scss">
html,
body {
  height: 100%;
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
  height: 1080px;
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
      height:100%;
      min-width:367px;
      float: left;
      & > div {
        &:nth-child(1) {
          min-height:80px;
          margin-bottom: 10px;
          .name_div {
            background: black;
          }
        }
        &:nth-child(2) {
          // 需要更改
          min-height: 50x;
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
        	
          min-height: 360px;
          margin-bottom: 20px;
        }
        &:nth-child(4) {
        	
          min-height: 360px;
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
        height: calc(100% - 30px);
        background-image: url("./assets/rect.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
      .circle-box {
        width: 100%;
        height: 318px;
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
     	padding-left:40px;
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
        display:flex;
        flex-direction: column;
        & > div{
        	flex:1;
        	text-align: center;
        	padding-top:24px;        	
        	.ps{
        		
        		font-size: 16px;
        		color:#00ccff;
        	}
        	.numbers{
        		
        		font-size:36px;
        		 background-image: -webkit-linear-gradient(bottom, #00ff54, #01f9fd);
        		   
					  -webkit-background-clip: text;
  					-webkit-text-fill-color: transparent;
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

      //border: 1px solid brown;
    }
    .under-pic {
      height: calc(100% - 65px);
      height:318px;
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
