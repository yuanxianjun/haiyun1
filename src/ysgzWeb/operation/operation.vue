	<template>
  <div id="operation">
    <comHeader></comHeader>
    <backHome :localPage="'机构运行'"></backHome>
    <div class="operationContent">
      <div class="operation_left">
        <!-- 退出按钮  -->
        <comOut></comOut>
        <!-- 下拉列表    -->
        <div class="selectDiv">
          <el-cascader
            ref="cascaderRef"
            expand-trigger="click"
            :options="orgTreeData"
            v-model="selectedOptions"
            :show-all-levels="false"
            change-on-select
            :props="slectProps"
            @change="handleChange"
          ></el-cascader>
        </div>
        <!-- 人员构成 -->
        <div class="left2">
          <div class="leftTitle">
            <span class="color-grind">人员构成</span>
          </div>
          <div class="left2_content">
            <div>
              <ul class="flex-row">
                <li class="imgli">
                  <img src="./assets/zhihuiyuan.png" alt>
                </li>
                <li class="litext">指挥员数量</li>
                <li class="liNum">
                  <span class="yellowSpan">{{peopleMemberData.countCommanderManage}}</span>
                  <span class="ren">人</span>
                </li>
              </ul>
            </div>
            <div>
              <ul class="flex-row">
                <li class="imgli">
                  <img src="./assets/xiaofangyuan.png" alt>
                </li>
                <li class="litext">消防员数量</li>
                <li class="liNum">
                  <span class="yellowSpan">{{peopleMemberData.countFiremen}}</span>
                  <span class="ren">人</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 车辆信息 -->
        <div class="left3">
          <div class="leftTitle">
            <span class="color-grind">车辆信息</span>
          </div>
          <div class="leftContent">
            <div id="carInfo">
              <vue-carInfo ref="carData"></vue-carInfo>
            </div>
          </div>
        </div>

        <!-- 装备信息 -->
        <div class="left4">
          <div class="leftTitle">
            <span class="color-grind">装备信息</span>
          </div>
          <div id="zhuangbei">
            <vue-zhuang ref="zhuangbei"></vue-zhuang>
          </div>
        </div>
      </div>
      <div class="operation_right">
        <div class="opRight1">
          <div class="opTitle1">
            <span class="color-grind">{{titleName}}</span>
          </div>
          <div v-if="!isZhong" class="opRight1_content_1">
            <div class="dai">
              <el-tooltip
                :manual="!leadData.name"
                class="marginCenter"
                content="Right Top 提示文字"
                placement="right-start"
              >
                <div slot="content">
                  <div class="xuanfu">
                    <div class="xuanfu_header">详情</div>
                    <div class="xuanfu_con">
                      <div class="leftImg">
                        <img src="./assets/touxiang.png" alt srcset>
                      </div>
                      <div class="rightP">
                        <p>
                          <span>姓名：</span>
                          {{leadData.name}}
                        </p>
                        <p>
                          <span>岗位：</span>
                          {{leadData.postName}}
                        </p>
                        <p>
                          <span>职位：</span>
                          {{leadData.dutyName}}
                        </p>
                        <p>
                          <span>所属机构：</span>
                          {{leadData.orgName}}
                        </p>
                      </div>
                      <div class="rightClose">
                        <img src="./assets/bubble_close.png" alt srcset>
                      </div>
                    </div>
                  </div>
                </div>
                <el-button @mouseenter.native="getDetail(leadData.userId)">
                  <div class="quli">
                    <div class="quliHeader">{{leadData.postName}}</div>
                    <div class="quliCon">{{leadData.name}}</div>
                  </div>
                </el-button>
              </el-tooltip>
            </div>
            <div class="zhi">
              <el-tooltip
                v-for="(item,index) in beiqinData"
                class="marginCenter"
                content="Right Top 提示文字"
                placement="right-start"
                :key="index+'el'"
                :manual="!item.name"
              >
                <div slot="content">
                  <div class="xuanfu">
                    <div class="xuanfu_header">详情</div>
                    <div class="xuanfu_con">
                      <div class="leftImg">
                        <img src="./assets/touxiang.png" alt srcset>
                      </div>
                      <div class="rightP">
                        <p>
                          <span>姓名：</span>
                          {{item.name}}
                        </p>
                        <p>
                          <span>岗位：</span>
                          {{item.postName}}
                        </p>
                        <p>
                          <span>职位：</span>
                          {{item.dutyName}}
                        </p>
                        <p>
                          <span>所属机构：</span>
                          {{item.orgName}}
                        </p>
                      </div>
                      <div class="rightClose">
                        <img src="./assets/bubble_close.png" alt srcset>
                      </div>
                    </div>
                  </div>
                </div>
                <el-button @mouseenter.native="getDetail(item.userId)">
                  <div class="quli">
                    <div class="quliHeader">{{item.postName}}</div>
                    <div class="quliCon">{{item.name}}</div>
                  </div>
                </el-button>
              </el-tooltip>
              <!-- <div :class="quliStyle">
                <div class="quliHeader"></div>
                <div class="quliCon">周祯楠</div>
              </div>
              <div :class="quliStyle">
                <div class="quliHeader">行政领导</div>
                <div class="quliCon">周祯楠</div>
              </div>
              <div :class="quliStyle">
                <div class="quliHeader">作战助理</div>
                <div class="quliCon">周祯楠</div>
              </div>
              <div :class="quliStyle">
                <div class="quliHeader">政工助理</div>
                <div class="quliCon">周祯楠</div>
              </div>
              <div :class="quliStyle">
                <div class="quliHeader">宣传助理</div>
                <div class="quliCon">周祯楠</div>
              </div>-->
            </div>
            <!-- <div class="zhi">
              <div :class="quliStyle">
                <div class="quliHeader">指挥长</div>
                <div class="quliCon">周祯楠</div>
              </div>

              <div :class="quliStyle">
                <div class="quliHeader">行政值班</div>
                <div class="quliCon">周祯楠</div>
              </div>
              <div :class="quliStyle">
                <div class="quliHeader">通信助理</div>
                <div class="quliCon">周祯楠</div>
              </div>
              <div :class="quliStyle">
                <div class="quliHeader">保障助理</div>
                <div class="quliCon">周祯楠</div>
              </div>
            </div>
            -->
          </div>
          <!-- 中队显示作战力量 -->
          <div v-if="isZhong" class="opRight1_content">
            <div class="touxiang">
              <div>
                <div class="img">
                  <img src="./assets/touxiang.png" alt>
                </div>
                <p class="monitor">正班：{{fightPowerData.squad['正班']}}</p>
              </div>
              <div>
                <div class="img">
                  <img src="./assets/touxiang.png" alt>
                </div>
                <p class="monitor">副班：{{fightPowerData.squad['副班']}}</p>
              </div>
            </div>
            <div class="list">
              <ul>
                <li v-for="(item,index) in fightPowerData.list" :key="index+'fight'">
                  <div class="li_left">
                    <img src="./assets/shuiguanche.png" alt>
                  </div>
                  <div class="li_right">
                    <p class="car">
                      <span>{{index == 0?'首车':(index+1)+'车'}}:{{item.carName}}</span>
                      <span>{{item.carNum}}</span>
                    </p>
                    <div class="name_p">
                      <p>
                        <span>班长：{{item.squadName}}</span>
                        <span class="carName">驾驶员：{{item.driver}}</span>
                      </p>
                      <p class="between_div">
                        <span v-for="(item,index) in item.memberList" :key="index+'member'">{{item}}</span>
                      </p>
                    </div>
                  </div>
                </li>

                <!-- <li>
                  <div class="li_left">
                    <img src="./assets/shuiguanche.png" alt>
                  </div>
                  <div class="li_right">
                    <p class="car">
                      <span>二车:水罐车</span>
                      <span>贵X5816应急</span>
                    </p>
                    <div class="name_p">
                      <p>
                        <span>班长：郑成河</span>
                        <span class="carName">驾驶员：郭大旗</span>
                      </p>
                      <p class="between_div">
                        <span>王小强</span>
                        <span>张七七</span>
                        <span>李美丽</span>
                        <span>王宝胜</span>
                      </p>
                    </div>
                  </div>
                </li> 
                <li>
                  <div class="li_left">
                    <img src="./assets/shuiguanche.png" alt>
                  </div>
                  <div class="li_right">
                    <p class="car">
                      <span>首车:水罐车</span>
                      <span>贵X5816应急</span>
                    </p>
                    <div class="name_p">
                      <p>
                        <span>班长：郑成河</span>
                        <span class="carName">驾驶员：郭大旗</span>
                      </p>
                      <p class="between_div">
                        <span>王小强</span>
                        <span>张七七</span>
                        <span>李美丽</span>
                        <span>王宝胜</span>
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="li_left">
                    <img src="./assets/shuiguanche.png" alt>
                  </div>
                  <div class="li_right">
                    <p class="car">
                      <span>首车:水罐车</span>
                      <span>贵X5816应急</span>
                    </p>
                    <div class="name_p">
                      <p>
                        <span>班长：郑成河</span>
                        <span class="carName">驾驶员：郭大旗</span>
                      </p>
                      <p class="between_div">
                        <span>王小强</span>
                        <span>张七七</span>
                        <span>李美丽</span>
                        <span>王宝胜</span>
                      </p>
                    </div>
                  </div>
                </li>-->
              </ul>
            </div>
          </div>
        </div>

        <div class="opRight2">
          <div>
            <div class="opTitle1">
              <span class="color-grind">实时警情</span>
            </div>
            <div class="opRight2_content">
              <ul class="realCondition">
                <li
                  v-for="(item , index) in realTimeData"
                  :key="index+'r'"
                  :class="[judgeColor(item.fireType,item.fireRange),comStyle]"
                >
                  <div class="level">
                    {{item.fireRange==1?'一级':item.fireRange==2?'二级':item.fireRange==3?'三级':item.fireRange==4?'四级':
                    '五级'}}
                  </div>
                  <div class="conditon">
                    <p class="time">{{item.time}}</p>
                    <p class="context">{{item.fireType}}</p>
                    <p class="location" :title="item.address">{{item.address}}</p>
                  </div>
                </li>
                <!-- <li class="bgli bgYellow">
                  <div class="level">三级</div>
                  <div class="conditon">
                    <p class="time">2019-03-14 10:33:28</p>
                    <p class="context">云溪小区火灾扑救</p>
                    <p class="location">大南门云溪小区</p>
                  </div>
                </li>-->
              </ul>
            </div>
          </div>
          <div>
            <div class="opTitle1">
              <span class="color-grind">接触警数据</span>
            </div>
            <div class="opRight2_content">
              <div id="touchPoliceDiv">
                <div class="ymd">
                  <img @click="fireClick('y')" class="ymd_img" :src="showfireY" alt>
                  <img @click="fireClick('m')" class="ymd_img" :src="showfireM" alt>
                  <img @click="fireClick('d')" class="ymd_img" :src="showfireD" alt>
                </div>
                <vue-touch ref="changeData"></vue-touch>
              </div>
            </div>
          </div>
        </div>
        <!-- 实时在位信息 -->
        <div class="opRight3 opRight2">
          <div>
            <div class="opTitle1">
              <span class="color-grind">实时在位信息</span>
            </div>

            <div class="opRight2_content">
              <ul class="realTimePeople">
                <li v-for="(item,index) in realTimedata1" :key="index">
                  <span class="leftTitle1">{{item.title}}</span>
                  <span
                    class="yellowFont"
                  >{{ item.title == "在位人员"?realTimeReginData.reginCount:item.title == "请假人员" ? realTimeReginData.leaveCount:item.title == "当日处警人员"?realTimeReginData.personCount:item.title == "库存装备"? realTimeReginData.inventoryEquipmentCount:0}}</span>
                </li>
                <li v-for="(item,index) in realTimedata" :key="(index+10)">
                  <span class="leftTitle">{{item.title}}</span>
                  <span
                    class="yellowFont"
                  >{{ item.title == "在位车辆"?realTimeReginData.reginCarCount:item.title == "外出行政车辆" ?0:item.title == "当日处警车辆"?realTimeReginData.carCount:item.title == "当日出动装备"? 0:0}}</span>
                </li>
              </ul>
              <div class="box"></div>
              <div class="right3_right"></div>
            </div>
          </div>
          <div>
            <div class="opTitle1">
              <span class="color-grind">今日训练安排</span>
            </div>
            <div class="opRight2_content">
              <ul class="traningPlan">
                <li v-for="(item,index) in todayTrain" :key="index">
                  <span class="index">{{(index < 10) ? "0"+ (index+1) : index}}</span>
                  <!-- <span class="num">{{item}}</span> -->
                  <span class="text">{{item}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="opRightBottom">
          <div class="bottomTitle">
            <span class="color-grind2">系统外链</span>
          </div>
          <div class="bottomContent">
            <div>
              <a class="clicka" href="#">营区视频</a>
            </div>
            <div>
              <a class="clicka" href="#">电子安防</a>
            </div>
            <div>
              <a class="clicka" href="#">电子围栏</a>
            </div>
            <div>
              <a class="clicka" href="#">电子表格数据</a>
            </div>
            <div>
              <a class="clicka" href="#">关联队正规化建设</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
	<script>
import echarts from "echarts";
import moment from "moment";
import { setTimeout, clearTimeout } from "timers";

// 引入头部的组件
import comHeader from "../components/comHeader";
import comOut from "../components/comOut";
import backHome from "../components/toHome";

// // 引入滑动组件
import vueSeamlessScroll from "vue-seamless-scroll";
// 引入车辆信息echarts组件
import vueCarInfo from "./components/funal";
import vueZhuang from "./components/zhuangbei";
import vueTouch from "./components/vueTouch";

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
      // 实时在位信息
      realTimeReginData: {},
      // 备勤值班
      quliStyle: "quli",
      titleName: "备勤值班",
      personDetailData: {},
      // 作战力量
      fightPowerData: {
        squad: {},
        list: [
          {
            id: null,
            carName: "水罐消防车（SG）",
            carNum: "2CA113486",
            squadName: null,
            driver: "卢林勇",
            memberList: null
          }
        ]
      },

      // 实时警情数据
      realTimeData: [
        { fireType: "火灾扑救", fireRange: "1", time: "2018-09-17 08:46:41" },
        {
          address: "仁怀市茅台镇下坪村石坝河沟酒城酒业路段（驾驶员被困）",
          fireType: "抢险救援",
          fireRange: "1",
          time: "2018-05-10 21:24:25"
        },
        {
          address: "都匀电信大楼一草坪着火（清水湾）",
          fireType: "火灾扑救",
          fireRange: "1",
          time: "2014-01-31 14:30:00"
        }
      ],
      colorStyle: "bgBlue",
      comStyle: "bgli",
      // 下拉选择列表
      options: [
        {
          value: "zong",
          label: "贵州省消防总队"
        },
        {
          value: "ziyuan",
          label: "三中队",
          children: [
            {
              value: "axure",
              label: "平塘中队"
            },
            {
              value: "sketch",
              label: "三都中队"
            },
            {
              value: "jiaohu",
              label: "罗甸县公安消防大队罗甸县中队"
            },
            {
              value: "changshun",
              label: "长顺中队"
            }
          ]
        }
      ],
      slectProps: {
        label: "orgName",
        value: ["orgId"],
        children: "orgTreeList"
      },
      selectedOptions: ["e289775cdcde495e9120e2fd5fbddb09"],
      // 实时警情根据警情的背景切换
      bgClass: "",
      // 年月日切换
      showfireY: c_y,
      showfireM: m,
      showfireD: d,
      propsData: "m",
      // 实时在位信息
      realTimedata1: [
        {
          title: "在位人员",
          value: 20
        },
        {
          title: "请假人员",
          value: 11
        },
        {
          title: "当日处警人员",
          value: 18
        },
        {
          title: "库存装备",
          value: 32
        }
      ],
      realTimedata: [
        {
          title: "在位车辆",
          value: 23
        },
        {
          title: "外出行政车辆",
          value: 35
        },
        {
          title: "当日处警车辆",
          value: 34
        },
        {
          title: "当日出动装备",
          value: 25
        }
      ],
      // 今日训练安排
      todayTrain: [
        // {
        //   index: "01",
        //   num: "100",
        //   con: "m肩梯"
        // },
        // {
        //   index: "02",
        //   num: "5000",
        //   con: " m跑"
        // },
        // {
        //   index: "03",
        //   num: "400",
        //   con: " m救人疏散物资"
        // }
      ],
      userId: "01bd72cf0622445cb2e40d05173d425a",
      // 组织id
      operationId: "0f9f0fa95213451cb98cc93e7e04ce76",
      orgTreeData: [],
      // 接触警数据统计的选中的 年 月 日
      nowDayType: "Y",
      // 人员构成数据
      peopleMemberData: {
        countCommanderManage: 0,
        countFiremen: 0
      },
      //  备勤值班数据
      beiqinData: [],
      // 首长
      leadData: {},
      isZhong: false
    };
  },
  created() {
    // 实时在信息
    this.realTimeRegin_gd(this.operationId);

    // 组织结构获取
    this.orgTree_gd(this.userId);

    // 今日训练数据
    this.trainning_gd(this.operationId);
    // 人员构成数据
    this.peopleMember(this.operationId);
    // 实时警情获取
    this.realTimeFire_gd(this.operationId);

    if (this.isZhong) {
      // 作战力量
      this.fightPowerData_gd("55792502c90c4edc961281b9daab0b3d");
    } else {
      // 备勤值班
      this.beiqingData_gd(this.operationId);
    }
  },
  mounted() {
    var ymd = moment().format("YYYY-MM-DD");
    this.setInter();
  },
  methods: {
    /**
     * 中队   作战力量
     * 非中队 备勤值班
     */

    // 作战力量数据获取
    fightPowerData_gd(orgId) {
      this.axios({
        method: "post",
        url: "/org/fightPower/" + orgId
      }).then(res => {
        if (res.status == 200) {
          var data = [];
          if (res.data.result) {
            data = res.data.result;
            this.fightPowerData = data;
            console.log(data, data.list, "作战力量");
          }
        } else {
          console.log("请求错误");
        }
      });
    },
    // 根据userId 获取人员详细信息
    getDetail(userId) {
      // console.log("detail", userId);
      if (userId) {
      }
    },
    // 滑过后的详情展示
    detailData_gd(id) {
      this.axios({
        method: "post",
        url: "/org/personDetail/" + id
      }).then(res => {
        if (res.status == 200) {
          var data = [];
          if (res.data.result) {
            data = res.data.result;
            this.personDetailData = data;
            // console.log(data, "实时在位信息");
          }
        } else {
          console.log("请求错误");
        }
      });
    },
    // 点击下拉菜单触发
    handleChange(value) {
      // console.log(this.$refs.cascaderRef, value, "查看点击效果");
      var labels = this.$refs.cascaderRef.currentLabels;
      var labeLenth = labels.length;

      var boolZhong =
        labels[labeLenth - 1].indexOf("中队") == -1 ? false : true;
      this.isZhong = boolZhong;
      var index = value.length - 1,
        orgId = value[index];

      if (orgId) {
        if (boolZhong) {
          this.titleName = "作战力量";
          this.fightPowerData_gd(orgId);
        } else {
          this.titleName = "备勤值班";
          this.beiqingData_gd(orgId);
        }
        this.operationId = orgId;
        // 实时在位信息
        this.realTimeRegin_gd(this.operationId);
        // 通过组织Id查询当日训练安排
        this.trainning_gd(orgId);
        // 人员书构成
        this.peopleMember(orgId);
        // 实时在位信息
        this.realTimeFire_gd(orgId);
        // 备勤值班
        this.beiqingData_gd(this.operationId);
        // 车辆信息
        this.$refs.carData.carInfo_gd(orgId);
        // 组织ID 查询接触警数据
        this.$refs.changeData.concactPolice_gd({
          id: orgId,
          type: this.nowDayType
        });
        this.$refs.zhuangbei.zhuangbei_gd(orgId);
      }
    },
    // 启用定时器
    setInter() {
      var timer = null;
      var _ = this;
      if (timer) {
        clearInterval(timer);
      }
      timer = setInterval(function() {
        _.realTimeFire_gd(_.operationId);
        console.log(timer, "timer");
      }, 60000);
    },
    // 实时在位信息
    realTimeRegin_gd(id) {
      this.axios({
        method: "post",
        url: "/org/realTimeRegin/" + id
      }).then(res => {
        if (res.status == 200) {
          var data = [];
          if (res.data.result) {
            data = res.data.result;
            this.realTimeReginData = data;
            // console.log(data, "实时在位信息");
          }
        } else {
          console.log("请求错误");
        }
      });
    },
    // 备勤值班
    beiqingData_gd(id) {
      this.axios({
        method: "post",
        url: "/org/dutyNow/" + id
      }).then(res => {
        if (res.status == 200) {
          var data = [];
          if (res.data.result) {
            data = res.data.result;

            var order = [
              "带班首长",
              "值班领导",
              "指挥长",
              "作战值班",
              "行政值班",
              "作战助理",
              "通信助理",
              "政工助理",
              "保障助理",
              "宣传助理"
            ];
            data.forEach(item => {
              if (item.postName == "带班首长") {
                this.leadData = item;
                return;
              }
            });

            data.sort((a, b) => {
              return order.indexOf(a.postName) - order.indexOf(b.postName);
            });
            this.leadData = data[0];
            this.beiqinData = data.slice(1);
          }
        } else {
          console.log("请求错误");
        }
      });
    },
    // 判断颜色
    judgeColor(keys, level) {
      var colorStyle = "";
      if (keys == "火灾扑救") {
        if (level == 1) {
          colorStyle = "bgGreen";
        } else if (level == 2) {
          colorStyle = "bgBlue";
        } else if (level == 3) {
          colorStyle = "bgYellow";
        } else if (level == 4) {
          colorStyle = "bgOrange";
        } else {
          colorStyle = "bgRed";
        }
      } else if (keys == "抢险救援") {
        if (level == 1) {
          colorStyle = "bgBlue";
        } else if (level == 2) {
          colorStyle = "bgYellow";
        } else if (level == 3) {
          colorStyle = "bgOrange";
        } else if (level == 4) {
          colorStyle = "bgRed";
        }
      } else {
        colorStyle = "bgGreen";
      }
      return colorStyle;
    },
    //实时警情的获取
    realTimeFire_gd(id) {
      this.axios({
        method: "post",
        url: "/org/realTimeFireInfo/" + id
      }).then(res => {
        if (res.status == 200) {
          var data = [];
          if (res.data.result) {
            data = res.data.result;
            this.realTimeData = data;
          }
        } else {
          console.log("请求错误");
        }
      });
    },

    // 人员构成数据的获取
    peopleMember(id) {
      this.axios({
        method: "post",
        url: "/org/perpsonMember/" + id
      }).then(res => {
        if (res.status == 200) {
          var data = [];
          if (res.data.result) {
            data = res.data.result;
            this.peopleMemberData = data;
            // console.log(data, "查看人员构成数据");
          }
        } else {
          console.log("请求错误");
        }
      });
    },
    // 组织结构数据查询
    orgTree_gd(id) {
      this.axios({
        method: "post",
        url: "/org/orgTree/" + id
      }).then(res => {
        if (res.status == 200) {
          var data = [];
          if (res.data.result) {
            data.push(JSON.parse(res.data.result));
            this.orgTreeData = data;
            // console.log(data, "查看数据");
          }
        } else {
          console.log("请求错误");
        }
      });
    },
    // 今日训练安排数据获取
    trainning_gd(id) {
      this.axios({
        method: "post",
        url: "/org/trainSubject/" + id
      }).then(res => {
        if (res.status == 200) {
          var data = res.data.result;
          if (data) {
            // data.map(res => {
            //   res.replace(/[^0-9]/ig,"");
            //   return res;
            // });
            this.todayTrain = data;
            // console.log(data);
          }
        } else {
          console.log("请求错误");
        }
      });
    },

    // 防火监督年月日切换数值
    fireClick(params) {
      // console.log(params);
      // params 代表传入的年或月或者日
      if (params == "y") {
        this.showfireY = c_y;
        this.showfireM = m;
        this.showfireD = d;
        this.nowDayType = "Y";
        this.$refs.changeData.concactPolice_gd({
          id: this.operationId,
          type: "Y"
        });
      } else if (params == "m") {
        this.showfireM = c_m;
        this.showfireY = y;
        this.showfireD = d;
        this.nowDayType = "M";
        this.$refs.changeData.concactPolice_gd({
          id: this.operationId,
          type: "M"
        });
      } else if (params == "d") {
        this.showfireD = c_d;
        this.showfireY = y;
        this.showfireM = m;
        this.nowDayType = "D";
        this.$refs.changeData.concactPolice_gd({
          id: this.operationId,
          type: "D"
        });
      }
    }
  },
  watch: {},
  computed: {
    // 控制滚动效果的配置
    classOption() {
      return {
        step: 0.3, //步长 越大滚动速度越快
        limitMoveNum: 5, //启动无缝滚动最小数据量 this.dataList.length
        hoverStop: true, //是否启用鼠标hover控制
        direction: 1, //1 往上 0 往下
        openWatch: true, //开启data实时监听
        singleHeight: 0, //单条数据高度有值hoverStop关闭
        waitTime: 1000 //单步停止等待时间
      };
    }
  },
  components: {
    comHeader,
    comOut,
    backHome,
    vueSeamlessScroll,
    vueCarInfo,
    vueZhuang,
    vueTouch
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
// 更改悬浮框的样式
.el-button {
  background: transparent !important;
  border: none !important;
  padding: 0 !important;
}
.el-button:hover {
  opacity: 1 !important;
}
.el-tooltip__popper.is-dark {
  background: transparent !important;
  // color: #fff;
}
.xuanfu {
  width: 380px;
  height: 205px;
  position: absolute;
  // left: 138px;
  top: -26px;
  z-index: 300;
  .xuanfu_header {
    width: 380px;
    height: 30px;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 40px;
    letter-spacing: 0px;
    color: #ffffff;
  }
  .xuanfu_con {
    width: 380px;
    height: 180px;
    background: url(./assets/modal.png) no-repeat center center;
    border-top: 1px solid #0083ff;
    display: flex;
    flex-direction: row;

    .leftImg {
      width: 102px;
      height: 124px;
      // border: solid 1px #4696bb;
      margin-top: 34px;
      margin-left: 16px;
      margin-right: 15px;
      text-align: center;
      background: url(./assets/xiangkuang.png) no-repeat center center;
      background-size: 100% 100%;
      img {
        width: 92px;
        height: 112px;
        margin-top: 5px;
      }
    }
    .rightP {
      margin-top: 14px;
      p {
        height: 16px;
        font-family: SimHei;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 17px;
        letter-spacing: 0px;
        color: #ffffff;
        margin-top: 20px;
        word-wrap: nowrap;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
    .rightClose {
      width: 16px;
      height: 16px;
      position: absolute;
      right: 10px;
      top: 40px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
.flex-row {
  display: flex;
  flex-direction: row;
}
.color-grind {
  background: linear-gradient(to bottom, #02f4fb, #0f84d4);
  -webkit-background-clip: text;
  color: transparent;
}
.color-grind2 {
  background: linear-gradient(to bottom, #01c9d1, #0d7cc4);
  -webkit-background-clip: text;
  color: transparent;
}
.font20 {
  font-size: 20px;
}

#operation {
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
  .operationContent {
    width: 1920px;
    height: 990px;
    padding-left: 40px;
    padding-right: 40px;
    padding-top: 0px;
    padding-bottom: 40px;
    div {
      box-sizing: border-box;
    }
    .operation_left {
      width: 435px;
      height: 990px;
      float: left;
      display: flex;
      flex-direction: column;
      margin-top: 20px;
      // background: red;
      .leftTitle {
        width: 435px;
        height: 45px;
        background: url(./assets/title_434-45.png) no-repeat center center;
        background-size: 100% 100%;
        line-height: 45px;
        margin-bottom: 10px;
        text-indent: 20px;
        font-size: 24px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        // color: #00ccff;
      }
      .leftContent {
        width: 435px;
        height: 216px;
        float: left;
        background: url(./assets/content_bg434-207.png) no-repeat center center;
        background-size: 100% 100%;
        // margin-top: 10px;
        #zhuangbei {
          width: 435px;
          height: 195px;
          background: url(./assets/content_bg434-207.png) no-repeat center
            center;
          background-size: 100% 100%;
        }
      }
      .selectDiv {
        width: 435px;
        height: 43px;
        float: left;
        margin-top: 20px;
        margin-bottom: 20px;
        .el-input--suffix .el-input__inner {
          width: 348px;
          height: 34px;
          box-shadow: inset 0px 0px 10px 0px #00ccff;
          border-radius: 6px;
          border: solid 1px #00ccff;
          background: transparent;
          line-height: 34px;
          font-size: 18px;
          // text-indent: 100px;
          background: linear-gradient(to bottom, #02f4fb, #0f84d4);
          -webkit-background-clip: text;
          color: transparent;
        }
        .el-input__suffix {
          color: #00ccff;
        }
        .el-cascader__label {
          background: linear-gradient(to bottom, #02f4fb, #0f84d4);
          -webkit-background-clip: text;
          color: transparent;
        }
        .el-cascader-menu__item--extensible:after {
          font-family: "element-icons";
          content: "\E604";
          font-size: 14px;
          color: #00ccff !important;
          position: absolute;
          right: 15px;
        }
        .el-cascader-menu__item:hover,
        .el-cascader-menu__item:focus:not(:active) {
          background-color: #00ccff;
          opacity: 0.2;
        }
        .el-cascader-menu__item.is-active {
          color: #ffff;
        }
      }
      .left2 {
        width: 435px;
        height: 202px;
        float: left;
        .left2_content {
          width: 435px;
          height: 147px;
          background: url(./assets/renyuangoucheng_bg.png) no-repeat center
            center;
          background-size: 100% 100%;
          padding-left: 33px;
          padding-top: 5px;
          & > div {
            margin-top: 14px;
          }
          ul {
            width: 366px;
            height: 47px;
            li {
              float: left;
            }
            .imgli {
              width: 40px;
              height: 40px;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .litext {
              width: 110px;
              font-size: 18px;
              font-weight: normal;
              font-stretch: normal;
              line-height: 47px;
              letter-spacing: 0px;
              color: #ffffff;
              margin-left: 37px;
            }
            .liNum {
              font-size: 14px;
              color: #ffffff;
              vertical-align: middle;
              margin-top: -10px;
              span {
                float: left;
                // margin-top: 10px;
                line-height: 48px;
              }
              .yellowSpan {
                font-family: ROME;
                font-size: 40px;
                font-weight: normal;
                letter-spacing: -1px;
                color: #ffb315;
                margin-right: 10px;
                width: 150px;
                text-align: right;
              }
              .ren {
                line-height: 65px;
              }
            }
          }
        }
      }
      .left3 {
        width: 435px;
        height: 275px;
        margin-top: 20px;

        #carInfo {
          width: 434px;
          height: 207px;
          overflow-x: hidden;
          overflow-y: scroll;
        }
      }

      .left4 {
        width: 435px;
        height: 275px;
        margin-top: 18px;
        float: left;
        #zhuangbei {
          width: 435px;
          height: 195px;
          background: url(./assets/content_bg434-207.png) no-repeat center
            center;
          background-size: 100% 100%;
        }
      }
    }
    .operation_right {
      width: 1392px;
      height: 640px;
      float: right;
      margin-top: 20px;
      .opTitle1 {
        width: 100%;
        height: 45px;
        background: url(./assets/title_495-45.png) no-repeat center center;
        background-size: 100% 100%;
        line-height: 45px;
        margin-bottom: 10px;
        text-indent: 20px;
        font-size: 24px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
      }
      .opRight1 {
        width: 495px;
        height: 640px;
        float: left;
        .opRight1_content_1 {
          width: 495px;
          height: 585px;
          margin-top: 10px;
          background: url(./assets/content_bg495-585.png) no-repeat center
            center;
          background-size: 100% 100%;
          font-size: 18px;
          .quliHeader {
            width: 134px;
            text-align: center;
            position: absolute;
            top: -10px;
            color: #00ccff;
          }
          .quliCon {
            width: 134px;
            height: 66px;
            color: #ffff;
            line-height: 66px;
            text-align: center;
          }
          .quli {
            position: relative;
            width: 134px;
            height: 65px;
            background: url(./assets/buble.png) no-repeat left bottom;
            background-size: 100% 100%;
            color: #ffff;
            margin: 0 auto;
            margin-top: 10px;
          }
          .quli:hover {
            position: relative;
            width: 134px;
            height: 65px;
            background: url(./assets/bubble_hover.png) no-repeat left bottom;
            background-size: 100% 100%;
            color: #ffff;
            margin: 0 auto;
            margin-top: 10px;
          }
          .dai {
            width: 495px;
            height: 110px;
            margin: 0 auto;
            // margin-top: 44px;
            .marginCenter {
              margin-left: 180px;
              margin-top: 20px;
            }
          }
          .zhi {
            width: 495px;
            height: 475px;
            // padding-left: 50px;
            .marginCenter {
              width: 134px;
              margin-left: 50px;
              margin-right: 63px;
              float: left;
              margin-top: 15px;
            }
          }
        }
        .opRight1_content {
          width: 495px;
          height: 585px;
          margin-top: 10px;
          background: url(./assets/content_bg495-585.png) no-repeat center
            center;
          background-size: 100% 100%;
          .touxiang {
            width: 495px;
            height: 165px;
            padding-top: 12px;
            & > div {
              width: 117px;
              height: 165px;
              float: left;
              margin-left: 80px;
              margin-right: 40px;
            }

            .img {
              width: 102px;
              height: 124px;
              border: solid 1px #4696bb;
              // opacity: 0.5;
              padding: 5px 4px 5px 4px;
              img {
                width: 94px;
                height: 114px;
              }
            }
            .monitor {
              width: 100%;
              height: 30px;
              line-height: 40px;
              font-size: 14px;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 0px;
              color: #ffffff;
            }
          }
          .list {
            width: 465px;
            height: 131px;
            margin-left: 10px;
            margin-top: 10px;
            ul {
              width: 465px;
              height: 400px;
              overflow-y: auto;
              overflow-x: hidden;

              li {
                width: 450px;
                height: 130px;
                background: url(./assets/xiaofangche_bg.png) no-repeat right top;
                background-size: 370px 125px;
                margin-top: 5px;
                margin-right: 5px;
              }
              .li_left {
                width: 110px;
                height: 110px;
                background-color: #032b4e;
                border: solid 1px #4696bb;
                border-radius: 50%;
                float: left;
                margin-top: 6px;
                margin-left: 7px;
                img {
                  width: 100px;
                  height: 100px;
                }
              }
              .li_right {
                float: right;
                .car {
                  width: 300px;
                  height: 38px;
                  line-height: 38px;
                  font-size: 20px;
                  color: #ffffff;
                  span {
                    // margin-right: 40px;
                    &:nth-child(2) {
                      float: right;
                      margin-right: 30px;
                    }
                  }
                }
                .name_p {
                  width: 300px;
                  height: 80px;
                  margin-top: 6px;

                  p {
                    height: 40px;
                    line-height: 40px;
                    font-size: 16px;
                    color: #ffffff;
                    opacity: 0.7;
                    .carName {
                      float: right;
                      margin-right: 10px;
                    }
                  }
                  .between_div {
                    padding-right: 10px;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                  }
                }
              }
            }
          }
        }
      }
      .opRight2 {
        width: 434px;
        height: 640px;
        float: left;
        margin-left: 10px;
        & > div {
          width: 434px;
          height: 310px;
          display: flex;
          flex-direction: column;
          &:nth-child(2) {
            margin-top: 20px;
          }
        }
        .opRight2_content {
          width: 434px;
          height: 265px;
          background: url(./assets/content_bg434-255.png) no-repeat center
            center;
          background-size: 100% 100%;
        }
        // 实时警情
        .realCondition {
          width: 434px;
          height: 255px;
          overflow-y: auto;
          overflow-x: hidden;
          padding: 22px 16px;

          .bgRed {
            background: url(./assets/bg_5.png) no-repeat center center;
            background-size: 100% 100%;
            margin-bottom: 10px;
          }
          .bgYellow {
            background: url(./assets/bg_1.png) no-repeat center center;
            background-size: 100% 100%;
            margin-bottom: 10px;
          }
          .bgGreen {
            background: url(./assets/bg_3.png) no-repeat center center;
          }
          .bgOrange {
            background: url(./assets/bg_2.png) no-repeat center center;
          }
          .bgBlue {
            background: url(./assets/bg_4.png) no-repeat center center;
          }

          .bgli {
            width: 391px;
            height: 102px;
            text-align: center;
            line-height: 40px;
            // background: url(./assets/bg_1.png) no-repeat center center;
            background-size: 100% 100%;
            margin-bottom: 20px;
          }
          .level {
            float: left;
            width: 54px;
            height: 102px;
            padding: 10px;
            font-size: 24px;
            word-wrap: break-word;
            // letter-spacing: 5px;
            color: #ffffff;
            // writing-mode: sideways-lr;
            // -webkit-writing-mode: sideways-lr;
            // -ms-writing-mode: sideways-lr;
          }
          .conditon {
            float: left;
            width: 337px;
            height: 102px;
            p {
              width: 337px;
              height: 30px;
              line-height: 30px;
              margin-top: 3px;
            }
            .time {
              font-family: ROME;
              font-size: 24px;
              line-height: 28px;
              letter-spacing: 0px;
              color: #ffffff;
              text-align: center;
            }
            .context {
              width: 337px;
              font-size: 18px;
              color: #ffffff;
            }
            .location {
              width: 337px;
              font-size: 18px;
              color: #ffffff;
              overflow: hidden; //盒子溢出隐藏
              text-overflow: ellipsis; //文字溢出显示省略号
              white-space: nowrap; //文字不换行
              cursor: pointer;
            }
          }
        }

        //接触警数据
        #touchPoliceDiv {
          width: 434px;
          height: 255px;
          position: relative;
          .ymd {
            position: absolute;
            right: 0;
            z-index: 9999;
            img {
              cursor: pointer;
              margin-left: 5px;
            }
          }
        }
      }
      .opRight3 {
        width: 434px;
        height: 640px;
        float: right;
        margin-left: 10px;
        // 实时在位信息
        .realTimePeople {
          width: 434px;
          height: 255px;
          padding: 27px;
          font-family: rome;
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          justify-content: space-between;
          li {
            width: 50%;
            height: 45px;
          }
          .leftTitle {
            display: inline-block;
            width: 120px;
            font-size: 18px;
            line-height: 40px;
            letter-spacing: 2px;
            color: #ffffff;
          }
          .leftTitle1 {
            display: inline-block;
            min-width: 122px;
            font-size: 18px;
            line-height: 40px;
            letter-spacing: 2px;
            color: #ffffff;
          }
          .yellowFont {
            font-size: 36px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 40px;
            letter-spacing: 4px;
            color: #ffb315;
            margin-left: 10px;
          }
        }
        // 今日训练安排
        .traningPlan {
          width: 434px;
          height: 255px;
          padding: 23px 20px;
          overflow: auto;
          li {
            width: 100%;
            height: 55px;
            background: url(./assets/paihang_bg.png) no-repeat center center;
            background-size: 100% 100%;
            margin-top: 10px;
            line-height: 55px;
            .index {
              width: 70px;
              height: 50px;
              display: inline-block;
              color: #ffffff;
              font-size: 30px;
              text-align: center;
              font-family: ROME;
            }
            .num {
              font-size: 24px;
              color: #ffffff;
              margin-left: 52px;
              font-family: ROME;
              letter-spacing: 1.5px;
            }
            .text {
              display: inline-block;
              font-size: 20px;
              font-weight: normal;

              font-stretch: normal;
              line-height: 60px;
              color: #ffffff;
              margin-left: 52px;
              letter-spacing: 1.5px;
            }
          }
        }
      }
      .opRightBottom {
        width: 1392px;
        height: 250px;
        float: left;
        margin-top: 20px;
        .bottomTitle {
          width: 1392px;
          height: 45px;
          background: url(./assets/title_1392-45.png) no-repeat center center;
          background-size: 100% 100%;
          line-height: 45px;
          margin-bottom: 10px;
          text-indent: 20px;
          font-size: 24px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
        }
        .bottomContent {
          width: 1392px;
          height: 195px;
          background: url(./assets/1392-194.png) no-repeat center center;
          background-size: 100% 100%;
          margin-top: 10px;
          padding-left: 20px;
          padding-top: 14px;
          .clicka {
            width: 270px;
            height: 59px;
            display: block;
            background-color: #1560a9;
            opacity: 0.7;
            font-size: 24px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #ffffff;
            text-align: center;
            line-height: 59px;
          }
          & > div {
            width: 270px;
            height: 170px;
            margin-right: 2px;
            padding-top: 60px;
            float: left;
            &:nth-child(1) {
              background: url(./assets/yingqushipin.png) no-repeat center center;
              background-size: 100% 100%;
            }
            &:nth-child(2) {
              background: url(./assets/dianzianfang.png) no-repeat center center;
              background-size: 100% 100%;
            }
            &:nth-child(3) {
              background: url(./assets/dianziweilan.png) no-repeat center center;
              background-size: 100% 100%;
            }
            &:nth-child(4) {
              background: url(./assets/dianzibiaoge.png) no-repeat center center;
              background-size: 100% 100%;
            }
            &:nth-child(5) {
              background: url(./assets/guanlianduizhan.png) no-repeat center
                center;
              background-size: 100% 100%;
            }
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }
}
</style>
<style >
.el-cascader-menu .el-popper {
  border: none !important;
}
.el-cascader-menus {
  border: none !important;
  font-family: "微软雅黑";
}
.el-cascader-menus .el-cascader-menu {
  display: inline-block;
  vertical-align: top;
  height: 204px;
  overflow: auto;
  border-right: solid 1px #021739;
  background-color: #0a294e;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0;
  padding: 6px 0;
  min-width: 160px;
}
/* .el-cascader-menus .el-cascader-menu__item.is-active {
  color: #ffffff;
} */
.el-cascader-menu__item:hover,
.el-cascader-menu__item:focus:not(:active) {
  background-color: rgba(0, 204, 255, 0.3);
}
.el-cascader-menu__item:hover,
.el-cascader-menu__item:focus:not(:active) {
  background-color: rgba(0, 204, 255, 0.3);
}
.el-cascader-menus .el-cascader-menu__item:hover {
  background-color: rgba(0, 204, 255, 0.3);
}
.el-cascader-menus .el-cascader-menu__item {
  font-size: 14px;
  padding: 8px 20px;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #ffffff;
  height: 34px;
  line-height: 1.5;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  cursor: pointer;
  outline: none;
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

