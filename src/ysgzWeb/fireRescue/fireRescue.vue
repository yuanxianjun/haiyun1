<template>
  <div class="fire_bg">
    <com-header></com-header>
    <el-row>
      <el-col class="header_mb">
        <back-home :localPage="'灭火救援'"></back-home>
      </el-col>
    </el-row>
    <el-row>
      <!-- 左 -->
      <el-col class="fire_left">
        <el-row style="margin-bottom: 50px;">
          <com-out></com-out>
        </el-row>
        <!-- 灾情统计分析 -->
        <el-col class="fire_left_ztj">
          <el-col class="fire_left_ztj_tit">
            <span>灾情统计分析</span>
          </el-col>
          <el-col class="fire_left_ztj_cont">
            <el-col class="fire_left_ztj_cont_tabs">
              <el-col class="fire_left_ztj_cont_tabs_icon">
                <img src="../../common/images/redring.png" alt>
              </el-col>
              <el-col class="fire_left_ztj_cont_tabs_name">灾情总数</el-col>
              <el-col class="fire_left_ztj_cont_tabs_num">{{statisticAnalysisData.countFire}}</el-col>
              <el-col class="fire_left_ztj_cont_tabs_right">
                <p v-if="TB!==null">
                  <span class="fire_left_ztj_cont_tabs_right_text">同比：</span>
                  <span
                    :class=" TB == 0 ? 'fire_left_ztj_cont_tabs_right_white':TB>0 ?'fire_left_ztj_cont_tabs_right_red':'fire_left_ztj_cont_tabs_right_green'"
                  >
                    {{TB == 0 ? 0 : TB > 0 ? TB + "%" : "下降"}}
                    <span v-show="TB<0">↓</span>
                    <span v-show="TB>0">↑</span>
                  </span>
                </p>
                <p v-if="HB!==null">
                  <span class="fire_left_ztj_cont_tabs_right_text">环比：</span>
                  <span
                    :class=" HB == 0 ? 'fire_left_ztj_cont_tabs_right_white':HB>0 ?'fire_left_ztj_cont_tabs_right_red':'fire_left_ztj_cont_tabs_right_green'"
                  >
                    {{HB == 0 ? 0 : HB > 0 ? TB + "%" : "下降"}}
                    <span v-if="HB<0">↓</span>
                    <span v-if="HB>0">↑</span>
                  </span>
                </p>
              </el-col>
            </el-col>
            <el-col style="margin-left: 35px;">
              <el-col class="fire_left_ztj_cont_bot">
                <el-col class="fire_left_ztj_cont_bot_tit">出动车辆：</el-col>
                <el-col class="fire_left_ztj_cont_bot_num">{{statisticAnalysisData.countCar}}</el-col>
              </el-col>
              <el-col class="fire_left_ztj_cont_bot">
                <el-col class="fire_left_ztj_cont_bot_tit">出动人员：</el-col>
                <el-col class="fire_left_ztj_cont_bot_num">{{statisticAnalysisData.countPerson}}</el-col>
              </el-col>
            </el-col>
          </el-col>
        </el-col>
        <!-- 中队接处 -->
        <el-col class="fire_left_ztj">
          <el-col class="fire_left_ztj_tit">
            <span>中队接处警数据分析</span>
            <img class="intoPng" @click="showMore" src="../../common/images/into.png" alt>
          </el-col>
          <el-col class="fire_left_jw_cont">
            <el-row>
              <div
                @click="clickMidJj('cheliang')"
                class="fire_left_jw_cont_cheliang"
                :style="'background-image: url(' + (midJj == 'cheliang' ? cheliang : noCheliang) + ')'"
              ></div>
              <div
                @click="clickMidJj('zhongdui')"
                class="fire_left_jw_cont_zhongdui"
                :style="'background-image: url(' + (midJj == 'zhongdui' ? zhongdui : noZhongdui) + ')'"
              ></div>
            </el-row>

            <el-row v-show="midJj == 'zhongdui'">
              <el-col
                v-for="(item,index) in detachMentData_z"
                v-if="index < 5"
                :class="'fire_left_jw_cont_' + index"
                :key="index"
              >
                <el-col :class="'fire_left_jw_cont_'+index+'_index'">NO.{{index+1}}</el-col>
                <el-col class="fire_left_jw_cont_text">{{item.name}}</el-col>
                <el-col class="fire_left_jw_cont_num">{{item.num}}</el-col>
              </el-col>

              <!-- <el-col class="fire_left_jw_cont_4">
                <el-col class="fire_left_jw_cont_blue_index">NO.5</el-col>
                <el-col class="fire_left_jw_cont_text">{{detachMentData_z[4].name}}</el-col>
                <el-col class="fire_left_jw_cont_num">{{detachMentData_z[4].num}}</el-col>
              </el-col>-->
            </el-row>
            <el-row v-show="midJj == 'cheliang'">
              <el-col
                v-for="(item,index) in detachMentData"
                :class="'fire_left_jw_cont_'+index"
                :key="index"
                v-if="index < 5"
              >
                <el-col class="fire_left_jw_cont_0_index" style="width: 50px;">NO.{{index+1}}</el-col>
                <el-col style="width: 75px;" class="fire_left_jw_cont_text">贵{{item.carNumber}}</el-col>
                <el-col style="width: 65px;" class="fire_left_jw_cont_text">{{item.carName}}</el-col>
                <el-col class="fire_left_jw_cont_text" style="width: 94px;">{{item.orgName}}</el-col>
                <el-col class="fire_left_jw_cont_num" style="width: 72px;">{{item.num}}</el-col>
              </el-col>
              <!-- <el-col class="fire_left_jw_cont_white">
                <el-col class="fire_left_jw_cont_white_index" style="width: 50px;">NO.2</el-col>
                <el-col style="width: 75px;" class="fire_left_jw_cont_text">贵A.6687</el-col>
                <el-col style="width: 65px;" class="fire_left_jw_cont_text">登高车</el-col>
                <el-col class="fire_left_jw_cont_text" style="width: 94px;">XXXXXX中队...</el-col>
                <el-col class="fire_left_jw_cont_num" style="width: 72px;">1234</el-col>
              </el-col>-->
            </el-row>
            <el-row v-if="concatSelf.rank">
              <el-col class="fire_left_jw_cont_ccc">
                <el-col
                  class="fire_left_jw_cont_ccc_index"
                  :style="midJj == 'cheliang' ? 'width: 50px;' : '100px;'"
                >NO.{{concatSelf.rank?concatSelf.rank:"" }}</el-col>
                <el-col
                  style="width: 75px;"
                  v-show="midJj == 'cheliang'"
                  class="fire_left_jw_cont_text"
                >贵{{concatSelf.carNumber}}</el-col>
                <el-col
                  style="width: 65px;"
                  v-show="midJj == 'cheliang'"
                  class="fire_left_jw_cont_text"
                >{{concatSelf.carName}}</el-col>
                <el-col
                  class="fire_left_jw_cont_text"
                  :style="midJj == 'cheliang' ? 'width: 94px;' : '180px;'"
                >{{midJj == 'cheliang'?concatSelf.carName:concatSelf.orgName}}</el-col>

                <el-col
                  class="fire_left_jw_cont_num"
                  :style="midJj == 'cheliang' ? 'width: 72px;' : '80px;'"
                >{{concatSelf.num}}</el-col>
              </el-col>
            </el-row>
          </el-col>
        </el-col>
        <!-- 火灾场所与火灾原因分析 -->
        <el-col class="fire_left_reson">
          <el-col class="fire_left_reson_tit">
            <span>火灾场所与火灾原因分析</span>
          </el-col>
          <el-col class="fire_left_reson_box">
            <fire-fannl ref="site"></fire-fannl>
          </el-col>
        </el-col>
      </el-col>
      <!-- 中 -->
      <el-col class="fire_mid">
        <el-col class="fire_mid_mapdate">
          <el-row>
            <el-col>
              <el-col class="fire_mid_mapdate_start">
                <el-col class="fire_mid_mapdate_start_icon"></el-col>
                <el-col class="fire_mid_mapdate_start_text">{{startDate}}</el-col>
              </el-col>
              <el-col style="width: 30px;text-align: center;">-</el-col>
              <el-col class="fire_mid_mapdate_start">
                <el-col class="fire_mid_mapdate_start_icon"></el-col>
                <el-col class="fire_mid_mapdate_start_text">{{endDate}}</el-col>
              </el-col>
            </el-col>
            <el-col>
              <el-date-picker
                class="fire_mid_mapdate_start_import"
                v-model="valueDate"
                type="daterange"
                @change="dateChange"
                range-separator="-"
                start-placeholder
                end-placeholder
                :unlink-panels="unlinkPannle"
              ></el-date-picker>
            </el-col>
            <el-row class="fire_mid_mapdate_yeardays">
              <div
                :style="'background-image: url(' + (dateData == 'Y' ? isActiveImg : noActiveImg) + ')'"
                class="fire_mid_mapdate_yeardays_years"
                @click="dateBtn('Y')"
              >年</div>
              <div
                :style="'background-image: url(' + (dateData == 'M' ? isActiveImg : noActiveImg) + ')'"
                class="fire_mid_mapdate_yeardays_years"
                @click="dateBtn('M')"
              >月</div>
              <div
                :style="'background-image: url(' + (dateData == 'D' ? isActiveImg : noActiveImg) + ')'"
                class="fire_mid_mapdate_yeardays_years"
                @click="dateBtn('D')"
              >日</div>
            </el-row>
          </el-row>
          <map-city @pushCityId="selectedCity"></map-city>
        </el-col>
        <!-- 灾情数据质量分析 -->
        <el-col class="fire_mid_zqsj">
          <el-col class="fire_mid_zqsj_tit">
            <span>灾情数据质量分析</span>
          </el-col>
          <el-col class="fire_mid_zqsj_tab">
            <el-col class="fire_mid_zqsj_cont">
              <el-col class="fire_mid_zqsj_cont_green">正常</el-col>
              <el-col class="fire_mid_zqsj_cont_text">{{dataQuality.countNormal || 0}}</el-col>
            </el-col>
            <el-col class="fire_mid_zqsj_cont">
              <el-col class="fire_mid_zqsj_cont_red">
                <p>坐标不规范</p>
                <p>立案超时</p>
                <p>结案超时</p>
                <p>文书较少</p>
                <p>文书缺少关键点</p>
                <p>无调派车辆GPS</p>
              </el-col>
              <el-col class="fire_mid_zqsj_cont_text" style="margin-top: 0px;">
                <p>{{dataQuality.countZB}}</p>
                <p>{{dataQuality.countOverTimeLA}}</p>
                <p>{{dataQuality.countOverTimeJA}}</p>
                <p>{{dataQuality.countBookLittle}}</p>
                <p>{{dataQuality.countBookGJD}}</p>
                <p>{{dataQuality.countGps || 0}}</p>
              </el-col>
            </el-col>
          </el-col>
        </el-col>
        <el-col class="fire_mid_zqsj" style="margin-left: 30px;">
          <el-col class="fire_mid_zqsj_tit">
            <span>重点对象数据质量分析</span>
          </el-col>
          <el-col class="fire_mid_zqsj_tab">
            <li-quid></li-quid>
          </el-col>
        </el-col>
      </el-col>
      <!-- 右 -->
      <el-col class="fire_right">
        <!-- 火灾趋势分析 -->
        <el-col class="fire_right_hzqs">
          <el-col class="fire_right_hzqs_tit">
            <span>火灾趋势分析</span>
          </el-col>
          <el-col class="fire_right_hzqs_cont">
            <line-chart ref="lineChild"></line-chart>
          </el-col>
        </el-col>
        <!-- 灾情等级分布 -->
        <el-col class="fire_right_zqdj">
          <el-col class="fire_right_zqdj_tit">
            <span>灾情等级分布</span>
          </el-col>
          <el-col class="fire_right_zqdj_cont">
            <pie-bar v-if="rangeData" :renderData="rangeData"></pie-bar>
          </el-col>
        </el-col>
        <!-- 办公数据分析 -->
        <el-col class="fire_right_yafx">
          <el-col class="fire_right_yafx_tit">
            <span>预案分析</span>
          </el-col>
          <el-col class="fire_right_yafx_cont">
            <el-col class="fire_right_yafx_cont_img">
              <p>123364</p>
              <p class="fire_right_yafx_cont_img_tet">重点单位</p>
            </el-col>
            <el-col class="fire_right_yafx_cont1">
              <p class="fire_right_yafx_cont_num">{{planData.countNotAssociated}}</p>
              <p class="fire_right_yafx_cont_tit" style="margin-top: 30px;">未关联预案单位</p>
            </el-col>
            <el-col class="fire_right_yafx_cont2">
              <p class="fire_right_yafx_cont_num">{{planData.countAssociate}}</p>
              <p class="fire_right_yafx_cont_tit" style="margin-top: 30px;">关联文本预案单位</p>
            </el-col>
            <el-col class="fire_right_yafx_cont3">
              <p class="fire_right_yafx_cont_num">6789</p>
              <p class="fire_right_yafx_cont_tit" style="margin-top: 24px;">关联数字化预案单位</p>
            </el-col>
            <el-col class="fire_right_yafx_cont4">
              <p class="fire_right_yafx_cont_num">6789</p>
              <p class="fire_right_yafx_cont_tit" style="margin-top: 24px;">关联文本和数字化预案单位</p>
            </el-col>
          </el-col>
        </el-col>
      </el-col>
    </el-row>
    <div class="showMoreDiv" v-if="showMore_bool">
      <el-table :data="modalData" stripe style="width: 100%">
        <template v-if="midJj == 'zhongdui'">
          <el-table-column prop="rank" label="排名" width="180"></el-table-column>
          <el-table-column prop="name" label="中队名称" width="180"></el-table-column>
          <el-table-column prop="num" label="数量"></el-table-column>
        </template>
        <template v-else>
          <el-table-column prop="rank" label="排名" width="180"></el-table-column>
          <el-table-column prop="carNumber" label="车牌号" width="180"></el-table-column>
          <el-table-column prop="carName" label="类型"></el-table-column>
          <el-table-column prop="orgName" label="所属中队"></el-table-column>
          <el-table-column prop="num" label="数量"></el-table-column>
        </template>
      </el-table>
      <div class="closeImg" @click="showMore_bool=false">
        <img src="../../common/images/bubble_close.png" alt>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import mapCity from "./components/mapCity";
import fireFannl from "./components/funnal";
import liQuid from "./components/liQuid";
import lineChart from "./components/lineChart";
import pieBar from "./components/pieBar";
import comHeader from "@/ysgzWeb/components/comHeader";
import comOut from "@/ysgzWeb/components/comOut";
import backHome from "../components/toHome";

export default {
  name: "fire",
  data() {
    return {
      // 中队和车辆展示更多
      showMore_bool: false,
      modalData: [],
      // 日历选择两个的时候不能同时更改
      unlinkPannle: true,
      userId: "9dec404c5bc94ceda23df4f3b821351d",
      // 灾情质量分析
      dataQuality: [],
      planData: {},
      TB: 30,
      HB: 20,
      zhongdui: require("@/common/images/zhongdui.png"),
      cheliang: require("@/common/images/cheliang.png"),
      noZhongdui: require("@/common/images/no_zhongdui.png"),
      noCheliang: require("@/common/images/no_cheliang.png"),
      isActiveImg: require("@/common/images/is_activebck.png"),
      noActiveImg: require("@/common/images/no_activebck.png"),
      midJj: "zhongdui",
      valueDate: "",
      startDate: "",
      endDate: "",
      // 切换年月日
      dateData: "Y",
      cityId: "52",
      // 灾情等级分布flag
      flag: 1,
      type: "Y",
      rangeData: {},
      isProvince: 0,

      // 中队接触警数据分析
      detachMentData: [
        {
          carName: "抢险救援消防车（JY）",
          carNumber: null,
          num: "1",
          orgName: "兴仁县中队"
        },
        {
          carName: "抢险救援消防车（JY）",
          carNumber: null,
          num: "1",
          orgName: "兴仁县中队"
        },
        {
          carName: "抢险救援消防车（JY）",
          carNumber: null,
          num: "1",
          orgName: "兴仁县中队"
        },
        {
          carName: "抢险救援消防车（JY）",
          carNumber: null,
          num: "1",
          orgName: "兴仁县中队"
        }
      ],
      detachMentData_z: [
        {
          name: "遵义市中队",
          num: 23424
        },
        {
          name: "贵阳支队",
          num: 23424
        },
        {
          name: "贵阳总队",
          num: 23424
        },
        {
          name: "中队",
          num: 23424
        },
        {
          name: "中队",
          num: 23424
        },
        {
          rank: "232",
          name: "中队",
          num: 23424
        },
        {
          name: "中队",
          num: 23424
        },
        {
          name: "中队",
          num: 23424
        },
        {
          name: "中队",
          num: 23424
        },
        {
          name: "中队",
          num: 23424
        }
      ],
      // 自己的一项值
      concatSelf: {
        // rank: 111,
        // name: "我自己",
        // carNumber: "H666",
        // carName: "泡沫车",
        // orgName: "贵阳消防中队",
        // num: "666"
      },
      // 灾情统计分析
      statisticAnalysisData: {}
    };
  },
  created() {
    // 灾情等级
    var option = {
      flag: 1,
      type: "Y",
      isProvince: 0
    };
    var option_userId = {
      flag: 1,
      type: "Y",
      isProvince: 0,
      userId: this.userId
    };

    // 灾情等级
    this.range_gd(option);
    // 中队车辆分析
    this.detachment_gd(option_userId);
    this.detachmentz_gd(option_userId);
    // 灾情统计分析
    this.statisticAnalysis_gd(option);
    this.planAnlyz(option);
    // 灾情质量分析
    this.qulityData_gd(option);
  },
  mounted() {
    var option_userId = {
      flag: 1,
      type: "Y",
      isProvince: 0,
      userId: this.userId
    };
    //  火灾趋势分析
    this.$refs.lineChild.fireFrend_gd(option_userId);

    var option = {
      flag: 1,
      type: "Y",
      isProvince: 0
    };
    // 火灾场所
    this.$refs.site.siteAndFireCauseData_gd(option);
  },
  methods: {
    // 中队和车辆展示更多
    showMore() {
      this.showMore_bool = true;
      console.log(this.showMore_bool);
    },
    // 灾情质量分析
    qulityData_gd(options) {
      this.axios({
        method: "post",
        url: "/fireFighting/dataQuality",
        data: options
      }).then(res => {
        if (res.status == 200) {
          if (res.data.result) {
            var data = res.data.result;
            this.dataQuality = data;
            console.log(data, "灾情质量分析");
          }
        } else {
          console.log("请求错误");
        }
      });
    },
    // 灭火救援预案分析
    planAnlyz(options) {
      this.axios({
        method: "post",
        url: "/fireFighting/prePlanAnalyze/",
        data: options
      }).then(res => {
        if (res.status == 200) {
          if (res.data.result) {
            var data = res.data.result;
            this.planData = data;
            console.log(data, "预案分析数据");
          }
        } else {
          console.log("请求错误");
        }
      });
    },
    // 中队接触警数据分析——车辆
    detachment_gd(options) {
      this.axios({
        method: "post",
        url: "/fireFighting/carAlarmReceivalDataStatistic/",
        data: options
      }).then(res => {
        if (res.status == 200) {
          if (res.data.result) {
            var data = res.data.result;
            this.detachMentData = data.list.map((item, index) => {
              item.rank = parseInt(index) + 1;
              return item;
            });
            this.modalData = this.detachMentData;

            console.log(this.modalData, "车辆信息");

            if (data.self) {
              this.concatSelf = data.self;
            }
          }
        } else {
          console.log("请求错误");
        }
      });
    },
    // 中队接触警数据分析——中队
    detachmentz_gd(options) {
      this.axios({
        method: "post",
        url: "/fireFighting/zdAlarmReceivalDataStatistic/",
        data: options
      }).then(res => {
        if (res.status == 200) {
          if (res.data.result) {
            var data = res.data.result;
            this.detachMentData_z = data.list.map((item, index) => {
              item.rank = parseInt(index) + 1;
              return item;
            });
            this.modalData = this.detachMentData_z;

            if (data.self) {
              this.concatSelf = data.self;
            }
            console.log(data, "中队接触警数据分析中队");
          }
        } else {
          console.log("请求错误");
        }
      });
    },
    // 灾情统计分析
    statisticAnalysis_gd(options) {
      this.axios({
        method: "post",
        url: "/fireFighting/statisticAnalysis/",
        data: options
      }).then(res => {
        if (res.status == 200) {
          if (res.data.result) {
            var data = res.data.result;
            // this.statisticAnalysisData = data;
            this.TB = 20;
            this.HB = -10;
            console.log(data, "灾情统计分析");
          }
        } else {
          console.log("请求错误");
        }
      });
    },
    // 灾情等级请求时间，城市 都对应的数据
    range_gd(options) {
      this.axios({
        method: "post",
        url: "/fireFighting/rangeDistribution/",
        params: options
      }).then(res => {
        if (res.status == 200) {
          if (res.data.result) {
            var data = res.data.result;
            this.rangeData = data;
          }
        } else {
          console.log("请求错误");
        }
      });
    },
    // 选择城市
    selectedCity(id) {
      var option = {};
      var option_userId = {};
      this.cityId = id;
      if (id == "52") {
        option = {
          flag: 1,
          type: this.dateData,
          isProvince: 0
        };
        option_userId = {
          flag: 1,
          type: this.dateData,
          isProvince: 0,
          userId: this.userId
        };
        this.range_gd(option);
        this.detachment_gd(option_userId);
        this.detachmentz_gd(option_userId);
        this.statisticAnalysis_gd(option);
        this.planAnlyz(option);
        // 灾情质量分析
        this.qulityData_gd(option);
        this.$refs.lineChild.fireFrend_gd(option_userId);
        // 火灾场所
        this.$refs.site.siteAndFireCauseData_gd(option);
      } else {
        option = {
          flag: 1,
          type: this.dateData,
          isProvince: 1,
          cityId: id
        };
        option_userId = {
          flag: 1,
          type: this.dateData,
          isProvince: 1,
          cityId: id,
          userId: this.userId
        };
        this.range_gd(option);
        this.detachment_gd(option_userId);
        this.detachmentz_gd(option_userId);
        this.statisticAnalysis_gd(option);
        this.planAnlyz(option);
        // 灾情质量分析
        this.qulityData_gd(option);
        //  火灾趋势分析
        this.$refs.lineChild.fireFrend_gd(option_userId);
        // 火灾场所
        this.$refs.site.siteAndFireCauseData_gd(option);
      }
    },
    clickMidJj(val) {
      this.midJj = val;
      if (val == "zhongdui") {
        this.modalData = this.detachMentData_z;
      } else {
        this.modalData = this.detachMentData;
      }
    },

    formatDate(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      return y + "-" + m + "-" + d;
    },
    // 日期选择
    dateChange() {
      var option = {};
      var option_userId = {};
      this.startDate = this.formatDate(this.valueDate[0]);
      this.endDate = this.formatDate(this.valueDate[1]);
      if (this.cityId != "52") {
        option = {
          flag: 0,
          startTime: this.startDate,
          endTime: this.endDate,
          isProvince: 1,
          cityId: this.cityId
        };
        option_userId = {
          flag: 0,
          startTime: this.startDate,
          endTime: this.endDate,
          isProvince: 1,
          cityId: this.cityId,
          userId: this.userId
        };
        this.range_gd(option);
        this.detachment_gd(option_userId);
        this.detachmentz_gd(option_userId);
        this.statisticAnalysis_gd(option);
        this.planAnlyz(option);
        // 灾情质量分析
        this.qulityData_gd(option);
        //  火灾趋势分析
        this.$refs.lineChild.fireFrend_gd(option_userId);
        // 火灾场所
        this.$refs.site.siteAndFireCauseData_gd(option);
      } else {
        option = {
          flag: 0,
          startTime: this.startDate,
          endTime: this.endDate,
          isProvince: 0
        };
        option_userId = {
          flag: 0,
          startTime: this.startDate,
          endTime: this.endDate,
          isProvince: 0,
          userId: this.userId
        };
        this.range_gd(option);
        this.detachment_gd(option_userId);
        this.detachmentz_gd(option_userId);
        this.statisticAnalysis_gd(option);
        this.planAnlyz(option);
        // 灾情质量分析
        this.qulityData_gd(option);

        //  火灾趋势分析
        this.$refs.lineChild.fireFrend_gd(option_userId);
        // 火灾场所
        this.$refs.site.siteAndFireCauseData_gd(option);
      }
    },
    // 年月日点击
    dateBtn(val) {
      var option = {};
      var option_userId = {};
      this.dateData = val;
      if (val == "Y") {
        if (this.cityId != "52") {
          option = {
            flag: 1,
            type: "Y",
            isProvince: 1,
            cityId: this.cityId
          };
          this.range_gd(option);
          this.detachment_gd(option_userId);
          this.detachmentz_gd(option_userId);
          this.statisticAnalysis_gd(option);
          this.planAnlyz(option);
          // 灾情质量分析
          this.qulityData_gd(option);
          option_userId = {
            flag: 1,
            type: "Y",
            isProvince: 1,
            cityId: this.cityId,
            userId: this.userId
          };
          //  火灾趋势分析
          this.$refs.lineChild.fireFrend_gd(option_userId);
          // 火灾场所
          this.$refs.site.siteAndFireCauseData_gd(option);
        } else {
          option = {
            flag: 1,
            type: "Y",
            isProvince: 0
          };
          option_userId = {
            flag: 1,
            type: "Y",
            isProvince: 0,
            cityId: this.cityId,
            userId: this.userId
          };
          this.range_gd(option);
          this.detachment_gd(option_userId);
          this.detachmentz_gd(option_userId);
          this.statisticAnalysis_gd(option);
          this.planAnlyz(option);
          // 灾情质量分析
          this.qulityData_gd(option);

          //  火灾趋势分析
          this.$refs.lineChild.fireFrend_gd(option_userId);
          // 火灾场所
          this.$refs.site.siteAndFireCauseData_gd(option);
        }
      } else if (val == "M") {
        if (this.cityId != "52") {
          option = {
            flag: 1,
            type: "M",
            isProvince: 1,
            cityId: this.cityId
          };
          option_userId = {
            flag: 1,
            type: "M",
            isProvince: 1,
            cityId: this.cityId,
            userId: this.userId
          };
          this.range_gd(option);
          this.detachment_gd(option_userId);
          this.detachmentz_gd(option_userId);
          this.statisticAnalysis_gd(option);
          this.planAnlyz(option);
          // 灾情质量分析
          this.qulityData_gd(option);

          //  火灾趋势分析
          this.$refs.lineChild.fireFrend_gd(option_userId);
          // 火灾场所
          this.$refs.site.siteAndFireCauseData_gd(option);
        } else {
          option = {
            flag: 1,
            type: "M",
            isProvince: 0
          };
          option_userId = {
            flag: 1,
            type: "M",
            isProvince: 0,
            userId: this.userId
          };
          this.range_gd(option);
          this.detachment_gd(option_userId);
          this.detachmentz_gd(option_userId);
          this.statisticAnalysis_gd(option);
          this.planAnlyz(option);
          // 灾情质量分析
          this.qulityData_gd(option);

          //  火灾趋势分析
          this.$refs.lineChild.fireFrend_gd(option_userId);
          // 火灾场所
          this.$refs.site.siteAndFireCauseData_gd(option);
        }
      } else {
        if (this.cityId != "52") {
          option = {
            flag: 1,
            type: "D",
            isProvince: 1,
            cityId: this.cityId
          };
          option_userId = {
            flag: 1,
            type: "D",
            isProvince: 1,
            cityId: this.cityId,
            userId: this.userId
          };
          this.range_gd(option);
          this.detachment_gd(option_userId);
          this.detachmentz_gd(option_userId);
          this.statisticAnalysis_gd(option);
          this.planAnlyz(option);
          // 灾情质量分析
          this.qulityData_gd(option);

          //  火灾趋势分析
          this.$refs.lineChild.fireFrend_gd(option_userId);
          // 火灾场所
          this.$refs.site.siteAndFireCauseData_gd(option);
        } else {
          option = {
            flag: 1,
            type: "D",
            isProvince: 0
          };
          option_userId = {
            flag: 1,
            type: "D",
            isProvince: 0,
            userId: this.userId
          };
          this.range_gd(option);
          this.detachment_gd(option_userId);
          this.detachmentz_gd(option_userId);
          this.statisticAnalysis_gd(option);
          this.planAnlyz(option);
          // 灾情质量分析
          this.qulityData_gd(option);

          //  火灾趋势分析
          this.$refs.lineChild.fireFrend_gd(option_userId);
          // 火灾场所
          this.$refs.site.siteAndFireCauseData_gd(option);
        }
      }
    }
  },
  computed: {},
  components: {
    mapCity,
    comHeader,
    comOut,
    fireFannl,
    liQuid,
    lineChart,
    pieBar,
    backHome
  }
};
</script>

<style lang="scss">
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
@mixin tit_text {
  font-size: 24px;
  font-family: SimHei;
  font-weight: 400;
  color: rgba(0, 204, 255, 1);
  background: linear-gradient(
    0deg,
    rgba(16, 125, 210, 1) 0%,
    rgba(1, 249, 253, 1) 98.193359375%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
@mixin tit_back {
  width: 100%;
  height: 45px;
  background-image: url(../../common/images/biaotibg.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  line-height: 45px;
  padding-left: 20px;
}
@keyframes trans {
  0% {
    transform: rotateZ(5deg) rotateY(0deg);
  }
  20% {
    transform: rotateZ(5deg) rotateY(30deg);
  }
  50% {
    transform: rotateZ(5deg) rotateY(0deg);
  }
  75% {
    transform: rotateZ(5deg) rotateY(30deg);
  }
  100% {
    transform: rotateZ(5deg) rotateY(0deg);
  }
}
@keyframes trans2 {
  0% {
    transform: rotateY(0deg);
  }
  20% {
    transform: rotateY(30deg);
  }
  50% {
    transform: rotateY(0deg);
  }
  75% {
    transform: rotateY(30deg);
  }
  100% {
    transform: rotateY(0deg);
  }
}
@keyframes trans3 {
  0% {
    transform: rotateZ(-5deg) rotateY(0deg);
  }
  20% {
    transform: rotateZ(-5deg) rotateY(30deg);
  }
  50% {
    transform: rotateZ(-5deg) rotateY(0deg);
  }
  75% {
    transform: rotateZ(-5deg) rotateY(30deg);
  }
  100% {
    transform: rotateZ(-5deg) rotateY(0deg);
  }
}
@keyframes trans4 {
  0% {
    transform: rotateZ(-9deg) rotateY(0deg);
  }
  20% {
    transform: rotateZ(-9deg) rotateY(30deg);
  }
  50% {
    transform: rotateZ(-9deg) rotateY(0deg);
  }
  75% {
    transform: rotateZ(-9deg) rotateY(30deg);
  }
  100% {
    transform: rotateZ(-9deg) rotateY(0deg);
  }
}
.fire_bg {
  color: white;
  padding-bottom: 21px;
  width: 1920px;
  height: 1080px;
  overflow: auto;
  background-image: url(../../common/images/background.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  overflow: hidden;
  // 弹出框
  .showMoreDiv {
    width: 917px;
    height: 650px;
    position: relative;
    top: -864px;
    left: 500px;
    background: url(../../common/images/modal.png) no-repeat center center;
    background-size: 100% 100%;
    z-index: 999;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 20px;
    // 更改表格样式
    .el-table {
      position: relative;
      overflow: hidden;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      width: 100%;
      max-width: 100%;
      background: transparent !important;
      font-size: 14px;
      color: #fff;
    }
    .el-table--enable-row-hover .el-table__body tr:hover > td {
      opacity: 0.8;
      background: transparent;
    }
    .el-table--group::after,
    .el-table--border::after,
    .el-table::before {
      content: "";
      position: absolute;
      background-color: transparent;
      z-index: 1;
    }
    // .el-table tr {
    //   background-color: transparent;
    // }
    .el-table tr {
      background-color: transparent;
    }

    .el-table th {
      white-space: nowrap;
      overflow: hidden;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      background-color: transparent;
    }
    .el-table th.is-leaf,
    .el-table td {
      border-bottom: none;
    }
    .el-table--striped .el-table__body tr.el-table__row--striped td {
      background: rgba(70, 150, 187, 0.5);
    }
    .el-table thead {
      color: #00ccff;
      font-weight: 500;
    }
    .closeImg {
      position: absolute;
      right: 15px;
      top: 20px;
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
  }
  .header_mb {
    text-align: right;
    margin-bottom: 20px;
    padding-right: 40px;
    .header_mb_home {
      margin-left: 5px;
      font-size: 14px;
      font-family: SimHei;
      font-weight: 400;
      color: rgba(10, 183, 255, 0.6);
    }
    .header_mb_cont {
      font-size: 14px;
      font-family: SimHei;
      font-weight: 400;
      color: rgba(10, 183, 255, 1);
      background: linear-gradient(
        0deg,
        rgba(16, 125, 210, 1) 0%,
        rgba(1, 249, 253, 1) 98.193359375%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  .fire_left {
    width: 440px !important;
    margin: 0 26px 0 40px;
    .fire_left_ztj {
      margin-bottom: 15px;
      .fire_left_ztj_tit {
        @include tit_back;
        span {
          @include tit_text;
        }
        img {
          float: right;
          margin-top: 12px;
          cursor: pointer;
        }
      }
      .fire_left_ztj_cont {
        width: 440px !important;
        height: 130px;
        background-image: url(../../common/images/zaiqingbox.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-top: 10px;
        .fire_left_ztj_cont_tabs {
          width: 355px !important;
          height: 54px;
          background-image: url(../../common/images/rescuebg.png);
          background-repeat: no-repeat;
          background-size: 100% 100%;
          margin-top: 10px;
          margin-left: 35px;
          .fire_left_ztj_cont_tabs_icon {
            text-align: center;
            line-height: 40px;
            width: 54px;
            height: 54px;
          }
          .fire_left_ztj_cont_tabs_name {
            width: 108px !important;
            font-size: 16px;
            font-family: SimHei;
            font-weight: 400;
            color: rgba(0, 255, 255, 1);
            line-height: 55px;
            margin-left: 22px;
          }
          .fire_left_ztj_cont_tabs_num {
            width: 70px;
            font-size: 30px;
            font-family: ROME;
            font-weight: bold;
            color: rgba(242, 251, 79, 1);
            line-height: 50px;
          }
          .fire_left_ztj_cont_tabs_right {
            width: 168px !important;
            padding-right: 10px;
            // line-height: 20px;
            p {
              // margin-top: 4px;
              text-align: right;
            }
            .fire_left_ztj_cont_tabs_right_text {
              font-size: 14px;
              font-family: Adobe Heiti Std R;
              font-weight: normal;
              color: rgba(10, 183, 255, 1);
            }
            .fire_left_ztj_cont_tabs_right_white {
              font-size: 16px;
              font-family: ROME;
              font-weight: normal;
              color: #ffffff;
              span {
                font-weight: 900;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
                  Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
                  "Helvetica Neue", sans-serif;
              }
            }
            .fire_left_ztj_cont_tabs_right_red {
              font-size: 18px;
              font-family: ROME;
              font-weight: normal;
              color: rgba(255, 0, 0, 1);
              span {
                font-weight: 900;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
                  Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
                  "Helvetica Neue", sans-serif;
              }
            }
            .fire_left_ztj_cont_tabs_right_green {
              font-size: 16px;
              font-family: ROME;
              font-weight: normal;
              color: rgba(0, 255, 42, 1);
              span {
                font-weight: 900;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
                  Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
                  "Helvetica Neue", sans-serif;
              }
            }
          }
        }
        .fire_left_ztj_cont_bot {
          width: 173px !important;
          height: 45px;
          background-image: url(../../common/images/firecarbox.png);
          background-repeat: no-repeat;
          background-size: 100% 100%;
          margin-top: 10px;
          .fire_left_ztj_cont_bot_tit {
            margin-left: 25px;
            width: 80px;
            font-size: 16px;
            font-family: SimHei;
            font-weight: 400;
            line-height: 45px;
            color: rgba(0, 255, 255, 1);
          }
          .fire_left_ztj_cont_bot_num {
            width: 63px;
            font-size: 30px;
            font-family: ROME;
            font-weight: bold;
            color: rgba(242, 251, 79, 1);
          }
        }
      }
      .fire_left_jw_cont {
        width: 440px !important;
        height: 257px;
        background-image: url(../../common/images/left_right.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-top: 10px;
        .fire_left_jw_cont_text {
          font-size: 14px;
          font-family: Adobe Heiti Std R;
          font-weight: normal;
          width: 180px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .fire_left_jw_cont_num {
          text-align: right;
          font-family: ROME;
          width: 80px;
        }
        .fire_left_jw_cont_zhongdui {
          cursor: pointer;
          width: 43px !important;
          height: 23px;
          background-repeat: no-repeat;
          background-size: 100% 100%;
          float: right;
          margin-right: 1px;
        }
        .fire_left_jw_cont_cheliang {
          cursor: pointer;
          width: 43px !important;
          height: 23px;
          background-image: url(../../common/images/cheliang.png);
          background-repeat: no-repeat;
          background-size: 100% 100%;
          float: right;
        }
        .fire_left_jw_cont_ccc {
          width: 400px !important;
          height: 22px;
          background: rgba(13, 53, 80, 0.5);
          margin: 5px 0 0 0px;
          color: white;
          line-height: 22px;
          margin-left: 20px;
          padding-left: 20px;
          font-size: 16px;
          .fire_left_jw_cont_ccc_index {
            font-family: ROME;
            width: 100px;
          }
        }
        .fire_left_jw_cont_0 {
          width: 400px !important;
          height: 32px;
          background-image: url(../../common/images/yellow_line.png);
          background-repeat: no-repeat;
          background-size: 100% 100%;
          margin: 5px 0 0 20px;
          color: #f6ff00;
          line-height: 32px;
          padding-left: 20px;
          font-size: 16px;
        }
        .fire_left_jw_cont_0_index {
          font-family: ROME;
          width: 100px;
        }
        .fire_left_jw_cont_1 {
          width: 400px !important;
          height: 32px;
          background-image: url(../../common/images/white_line.png);
          background-repeat: no-repeat;
          background-size: 100% 100%;
          margin: 9px 0 0 20px;
          color: #e9e9d8;
          line-height: 32px;
          padding-left: 20px;
          font-size: 16px;

          .fire_left_jw_cont_1_index {
            font-family: ROME;
            width: 100px;
          }
        }
        .fire_left_jw_cont_2 {
          width: 400px !important;
          height: 32px;
          background-image: url(../../common/images/red_line.png);
          background-repeat: no-repeat;
          background-size: 100% 100%;
          margin: 9px 0 0 20px;
          color: #dab273;
          line-height: 32px;
          padding-left: 20px;
          font-size: 16px;
          .fire_left_jw_cont_2_index {
            font-family: ROME;
            width: 100px;
          }
        }
        .fire_left_jw_cont_3 {
          width: 400px !important;
          height: 32px;
          background-image: url(../../common/images/blue_line.png);
          background-repeat: no-repeat;
          background-size: 100% 100%;
          margin: 9px 0 0 20px;
          color: #00ffff;
          line-height: 32px;
          padding-left: 20px;
          font-size: 16px;
          .fire_left_jw_cont_3_index {
            font-family: ROME;
            width: 100px;
          }
        }
        .fire_left_jw_cont_4 {
          width: 400px !important;
          height: 32px;
          background-image: url(../../common/images/blue_line.png);
          background-repeat: no-repeat;
          background-size: 100% 100%;
          margin: 9px 0 0 20px;
          color: #00ffff;
          line-height: 32px;
          padding-left: 20px;
          font-size: 16px;
          .fire_left_jw_cont_4_index {
            font-family: ROME;
            width: 100px;
          }
        }
      }
    }
    .fire_left_reson {
      .fire_left_reson_tit {
        @include tit_back;
        span {
          @include tit_text;
        }
      }
      .fire_left_reson_box {
        width: 440px !important;
        height: 220px;
        background-image: url(../../common/images/bottom_box.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-top: 10px;
      }
    }
  }
  .fire_mid {
    width: calc(100% - 1012px) !important;
    .fire_mid_mapdate {
      width: 100%;
      height: 658px;
      .fire_mid_mapdate_start {
        width: 122px !important;
        .fire_mid_mapdate_start_icon {
          width: 24px !important;
          height: 24px;
          background-image: url(../../common/images/ridate.png);
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
        .fire_mid_mapdate_start_text {
          font-size: 18px;
          font-family: ROME;
          color: rgba(255, 255, 255, 1);
          width: 98px;
          height: 24px;
          border: 1px solid #036e9a;
          border-left: none;
          line-height: 20px;
          text-align: center;
        }
      }
      .fire_mid_mapdate_start_import {
        position: absolute;
        top: 0;
        left: 0;
        width: 274px !important;
        height: 24px;
        opacity: 0;
        cursor: pointer;
        input {
          opacity: 0;
          cursor: pointer !important;
        }
        .el-input__icon {
          display: none !important;
        }
      }
      .fire_mid_mapdate_yeardays {
        position: absolute;
        top: 40px;
        z-index: 20;
        .fire_mid_mapdate_yeardays_years {
          cursor: pointer;
          float: left;
          width: 24px !important;
          height: 24px;
          background-repeat: no-repeat;
          background-size: 100% 100%;
          margin-right: 1px;
          font-size: 16px;
          color: white;
          text-align: center;
          line-height: 24px;
        }
      }
    }
    .fire_mid_zqsj {
      width: 438px;
      .fire_mid_zqsj_tit {
        @include tit_back;
        span {
          @include tit_text;
        }
      }
      .fire_mid_zqsj_tab {
        width: 100%;
        height: 220px;
        background-image: url(../../common/images/bottom_box.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-top: 10px;
        .fire_mid_zqsj_cont {
          .fire_mid_zqsj_cont_green {
            width: 230px;
            height: 24px;
            background-image: url(../../common/images/green_line.png);
            background-repeat: no-repeat;
            background-size: 100% 100%;
            margin: 20px 0px 10px 105px;
            text-align: center;
          }
          .fire_mid_zqsj_cont_text {
            width: 70px;
            margin-top: 20px;
            font-size: 20px;
            font-family: ROME;
            font-weight: normal;
            color: #02eeff;
            text-align: right;
            p {
              margin-bottom: 2px;
              margin-right: 3px;
            }
          }
          .fire_mid_zqsj_cont_red {
            width: 308px;
            height: 155px;
            background-image: url(../../common/images/red_lines.png);
            background-repeat: no-repeat;
            margin: 0px 0px 10px 29px;
            background-size: 100% 100%;
            p {
              margin-left: 76px;
              text-align: center;
              font-size: 14px;
              color: rgba(255, 255, 255, 1);
              line-height: 26px;
            }
          }
        }
      }
    }
  }
  .fire_right {
    width: 440px !important;
    margin: 0 40px 0 26px;
    .fire_right_hzqs {
      margin-bottom: 15px;
      margin-top: 41px;
      .fire_right_hzqs_tit {
        @include tit_back;
        span {
          @include tit_text;
        }
      }
      .fire_right_hzqs_cont {
        width: 100%;
        height: 220px;
        background-image: url(../../common/images/bottom_box.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-top: 10px;
        .fire_right_hzqs_cont_imgbox {
          padding-top: 20px;
          .right_img {
            width: 90px;
          }
          p {
            font-size: 14px;
            font-family: SimHei;
            font-weight: 400;
            color: rgba(3, 176, 216, 1);
            margin-top: 3px;
          }
          h1 {
            font-size: 30px;
            font-family: ROME;
            font-weight: bold;
            color: rgba(242, 251, 79, 1);
          }
        }
      }
    }
    .fire_right_zqdj {
      margin-bottom: 15px;
      .fire_right_zqdj_tit {
        @include tit_back;
        span {
          @include tit_text;
        }
      }
      .fire_right_zqdj_cont {
        width: 440px !important;
        height: 257px;
        background-image: url(../../common/images/bottom_box.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-top: 10px;
        .fire_right_zqdj_cont_box:nth-child(1) {
          margin-top: 40px;
          .fire_right_zqdj_cont_box_cont {
            border-top: 1px dashed #00ffff;
          }
        }
        .fire_right_zqdj_cont_box {
          .fire_right_zqdj_cont_box_cont {
            width: 325px !important;
            height: 80px;
            border-bottom: 1px dashed #00ffff;
            margin-left: -20px;
            .fire_right_zqdj_cont_box_cont_text {
              width: 150px !important;
              font-size: 14px;
              font-family: SimHei;
              font-weight: 400;
              color: rgba(3, 176, 216, 1);
              text-align: right;
              p:nth-child(1) {
                margin-top: 8px;
              }
              p:nth-child(2) {
                margin-top: 22px;
              }
            }
            .fire_right_zqdj_cont_box_cont_num {
              width: 135px !important;
              height: 22px;
              font-size: 30px;
              font-family: ROME;
              font-weight: normal;
              text-align: right;
              line-height: 24px;
              p:nth-child(1) {
                color: #fc656a;
                margin-top: 12px;
              }
              p:nth-child(2) {
                color: #1efa43;
                margin-top: 10px;
              }
            }
          }
          .fire_right_zqdj_cont_year {
            width: 72px;
            height: 72px;
            border-radius: 50%;
            border-color: #00ffff;
            border-right-style: dashed;
            border-left-style: none;
            border-width: 1px;
            padding: 10px;
            margin-top: 4px;
            margin-left: 40px;
            .fire_right_zqdj_cont_year_tit {
              width: 50px !important;
              height: 50px;
              background: rgba(0, 255, 255, 0.08);
              border: 1px solid rgba(0, 255, 255, 1);
              border-radius: 50%;
              font-size: 24px;
              font-family: MFYueYuan_Noncommercial-Regular;
              font-weight: 400;
              color: rgba(2, 238, 255, 1);
              text-align: center;
              line-height: 50px;
            }
          }
        }
      }
    }
    .fire_right_yafx {
      .fire_right_yafx_tit {
        @include tit_back;
        span {
          @include tit_text;
        }
      }
      .fire_right_yafx_cont {
        width: 440px !important;
        height: 220px;
        background-image: url(../../common/images/bottom_box.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-top: 10px;
        position: relative;
        .fire_right_yafx_cont_img {
          position: absolute;
          left: 0;
          right: 0;
          margin: 25px auto;
          width: 220px !important;
          height: 187px;
          background-image: url(../../common/images/dipan.png);
          background-repeat: no-repeat;
          background-size: 100% 100%;
          p {
            font-family: ROME;
            font-size: 24px;
            font-weight: normal;
            color: white;
            text-align: center;
            margin-top: -20px;
          }
          .fire_right_yafx_cont_img_tet {
            font-size: 14px;
            font-weight: normal;
            color: rgba(76, 236, 255, 1);
            line-height: 18px;
            margin-top: 5px;
          }
        }
        .fire_right_yafx_cont1 {
          position: absolute;
          width: 120px !important;
          top: 30px;
          left: 20px;
          height: 123px;
          background-image: url(../../common/images/juxing.png);
          background-repeat: no-repeat;
          background-size: 100% 100%;
          animation: trans 5s linear infinite;
        }
        .fire_right_yafx_cont2 {
          position: absolute;
          left: 108px;
          top: 77px;
          width: 120px !important;
          height: 123px;
          background-image: url(../../common/images/juxing.png);
          background-repeat: no-repeat;
          background-size: 100% 100%;
          animation: trans2 6s linear infinite;
        }
        .fire_right_yafx_cont3 {
          position: absolute;
          width: 120px !important;
          height: 123px;
          left: 220px;
          top: 84px;
          background-image: url(../../common/images/juxing.png);
          background-repeat: no-repeat;
          background-size: 100% 100%;
          animation: trans3 4s linear infinite;
        }
        .fire_right_yafx_cont4 {
          position: absolute;
          width: 120px !important;
          height: 123px;
          left: 300px;
          top: 30px;
          background-image: url(../../common/images/juxing.png);
          background-repeat: no-repeat;
          background-size: 100% 100%;
          animation: trans4 3s linear infinite;
        }
        .fire_right_yafx_cont_num {
          font-size: 24px;
          font-family: ROME;
          font-weight: normal;
          color: white;
          margin: 26px 0 0 0;
          text-align: center;
        }
        .fire_right_yafx_cont_tit {
          width: 114px;
          height: 30px;
          font-size: 14px;
          color: rgb(76, 236, 255);
          line-height: 14px;
          text-align: center;
        }
      }
    }
  }
}
</style>
