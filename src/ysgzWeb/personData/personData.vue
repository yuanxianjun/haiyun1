<template>
  <div class="person_bg">
    <com-header></com-header>
    <el-row>
      <el-col class="header_mb">
        <back-home :localPage="'人员数据'"></back-home>
      </el-col>
    </el-row>
    <el-row>
      <!-- 左 -->
      <el-col class="person_left">
        <com-out></com-out>
        <!-- 政工系统数据分析 -->
        <el-col class="person_left_zg">
          <el-col class="person_left_zg_tit">
            <span>政工系统数据分析</span>
          </el-col>
          <el-col class="person_left_zg_cont">
            <el-col class="person_left_zg_cont_tabs">
              <div
                @click="clickTab('station')"
                :style="'background-image: url(' + (zgBtn == 'station' ? tabActive : tabNot) + ')'"
                class="person_left_zg_cont_tabs_btn"
              >按岗位统计</div>
              <div
                @click="clickTab('special')"
                :style="'background-image: url(' + (zgBtn == 'special' ? tabActive : tabNot) + ')'"
                class="person_left_zg_cont_tabs_btn"
              >按专业统计</div>
              <div style="clear: both;"></div>
            </el-col>
            <el-row style="height: 305px;margin-top: 50px;">
              <div id="pieOne" ref="pieOne" style="width:100%;height:100%;"></div>
            </el-row>
          </el-col>
        </el-col>
        <!-- 警务系统关联分析 -->
        <el-col class="person_left_zg" style="margin-top: 0px !important;">
          <el-col class="person_left_zg_tit">
            <span>警务系统关联分析</span>
          </el-col>
          <el-col class="person_left_jw_cont">
            <el-row style="height: 320px;">
              <div id="pieJw" ref="pieJw" style="width:100%;height:100%;padding:0;"></div>
            </el-row>
          </el-col>
        </el-col>
      </el-col>
      <!-- 中 -->
      <el-col class="person_mid">
        <el-col class="person_mid_map">
          <map-city @pushId="pushId"></map-city>
        </el-col>
        <!-- 单项训练成绩排名前三 -->
        <el-col class="person_mid_dxxl">
          <el-col class="person_mid_dxxl_tit">
            <span>单项训练成绩排名前三</span>
          </el-col>
          <el-col class="person_mid_dxxl_tab">
            <el-row>
              <el-col class="person_left_zg_cont_tabs">
                <div
                  @click="clickPersonTab('sical')"
                  :style="'background-image: url(' + (personBtn == 'sical' ? tabActive : tabNot) + ')'"
                  class="person_left_zg_cont_tabs_btn"
                >人员/体能</div>
                <div
                  @click="clickPersonTab('skill')"
                  :style="'background-image: url(' + (personBtn == 'skill' ? tabActive : tabNot) + ')'"
                  class="person_left_zg_cont_tabs_btn"
                >人员/技能</div>
                <div style="clear: both;"></div>
              </el-col>
            </el-row>
            <el-row class="tabs_position">
              <el-col class="tabs_position_box">
                <el-col class="tabs_position_th">
                  <el-col>
                    <el-col class="first person_mid_dxxl_tab_one">
                      <p class="person_mid_dxxl_tab_one_1">{{personBtn=="skill"?"技能":"体能"}}</p>
                      <p class="person_mid_dxxl_tab_one_2">人员</p>
                    </el-col>
                  </el-col>
                  <el-col class="person_mid_dxxl_tab_one">单位</el-col>
                  <el-col class="person_mid_dxxl_tab_one">个人</el-col>
                </el-col>
                <el-col style="width: 756px;overflow-x: auto;overflow-y: hidden;">
                  <el-col
                    class="tabs_position_tdbox"
                    :style="'width:' + (252*spData.length) + 'px'"
                  >
                    <el-col
                      class="tabs_position_td"
                      v-for="(item,index) in spData"
                      :key="index+'skill'"
                    >
                      <el-col class="person_mid_dxxl_tab_background title_tabs">{{item.key}}</el-col>
                      <el-col class="person_mid_dxxl_left_text">
                        <p v-if="item.value.company">
                          <span class="person_mid_dxxl_number">NO.1</span>
                          {{item.value.company[0]}}
                        </p>
                        <p v-if="item.value.company">
                          <span class="person_mid_dxxl_number">NO.2</span>
                          {{item.value.company[1]}}
                        </p>
                        <p v-if="item.value.company">
                          <span class="person_mid_dxxl_number">NO.3</span>
                          {{item.value.company[2]}}
                        </p>
                      </el-col>
                      <el-col class="person_mid_dxxl_left_text">
                        <span>
                          <p>
                            <span class="person_mid_dxxl_number">NO.1</span>
                            {{item.value.person[0]}}
                          </p>
                          <p>
                            <span class="person_mid_dxxl_number">NO.2</span>
                            {{item.value.person[1]}}
                          </p>
                          <p>
                            <span class="person_mid_dxxl_number">NO.3</span>
                            {{item.value.person[2]}}
                          </p>
                        </span>
                      </el-col>
                    </el-col>
                  </el-col>
                </el-col>
              </el-col>
            </el-row>
          </el-col>
        </el-col>
      </el-col>
      <!-- 右 -->
      <el-col class="person_right">
        <!-- 接处警数据关联分析 -->
        <el-col class="person_right_jcj">
          <el-col class="person_right_jcj_tit">
            <span>接处警数据关联分析</span>
          </el-col>
          <el-col class="person_right_jcj_cont">
            <el-col :span="8" class="person_right_jcj_cont_imgbox">
              <img :src="hzpj" alt class="right_img">
              <p>火灾扑救</p>
              <h1>{{concatPolice.fireFighting ||0}}</h1>
            </el-col>
            <el-col :span="8" class="person_right_jcj_cont_imgbox">
              <img :src="qxjy" alt class="right_img">
              <p>抢险救援</p>
              <h1>{{concatPolice.fireRescuing ||0}}</h1>
            </el-col>
            <el-col :span="8" class="person_right_jcj_cont_imgbox">
              <img :src="shjz" alt class="right_img">
              <p>社会救助</p>
              <h1>{{concatPolice.socialAssistance||0}}</h1>
            </el-col>
          </el-col>
        </el-col>
        <!-- 消防监督检查分析 -->
        <el-col class="person_right_xfjd">
          <el-col class="person_right_xfjd_tit">
            <span>消防监督检查分析</span>
          </el-col>
          <el-col class="person_right_xfjd_cont">
            <el-col class="person_right_xfjd_cont_box">
              <el-col class="person_right_xfjd_cont_year">
                <el-col class="person_right_xfjd_cont_year_tit">年</el-col>
              </el-col>
              <el-col class="person_right_xfjd_cont_box_cont">
                <el-col class="person_right_xfjd_cont_box_cont_text">
                  <p>全年检查重点单位</p>
                  <p>全年执法人数</p>
                </el-col>
                <el-col class="person_right_xfjd_cont_box_cont_num">
                  <p>{{supervisionData.yearCompany}}</p>
                  <p>{{supervisionData.yearPerson}}</p>
                </el-col>
              </el-col>
            </el-col>
            <el-col class="person_right_xfjd_cont_box">
              <el-col class="person_right_xfjd_cont_year">
                <el-col class="person_right_xfjd_cont_year_tit">月</el-col>
              </el-col>
              <el-col class="person_right_xfjd_cont_box_cont">
                <el-col class="person_right_xfjd_cont_box_cont_text">
                  <p>当月检查重点单位</p>
                  <p>当月执法人数</p>
                </el-col>
                <el-col class="person_right_xfjd_cont_box_cont_num">
                  <p>{{supervisionData.monthCompany}}</p>
                  <p>{{supervisionData.monthPerson}}</p>
                </el-col>
              </el-col>
            </el-col>
            <el-col class="person_right_xfjd_cont_box">
              <el-col class="person_right_xfjd_cont_year">
                <el-col class="person_right_xfjd_cont_year_tit">日</el-col>
              </el-col>
              <el-col class="person_right_xfjd_cont_box_cont">
                <el-col class="person_right_xfjd_cont_box_cont_text">
                  <p>当日检查重点单位</p>
                  <p>当日执法人数</p>
                </el-col>
                <el-col class="person_right_xfjd_cont_box_cont_num">
                  <p>{{supervisionData.dayCompany}}</p>
                  <p>{{supervisionData.dayPerson}}</p>
                </el-col>
              </el-col>
            </el-col>
          </el-col>
        </el-col>
        <!-- 办公数据分析 -->
        <el-col class="person_right_bgsj">
          <el-col class="person_right_bgsj_tit">
            <span>办公数据分析</span>
          </el-col>
          <el-col class="person_right_bgsj_cont">
            <el-col class="person_right_bgsj_cont_top">
              <el-col class="person_right_bgsj_cont_top_left">
                <img :src="gwImg" alt>
              </el-col>
              <el-col class="person_right_bgsj_cont_top_righta">
                <el-col class="person_right_bgsj_cont_top_right_text">
                  <p>当日 &gt;</p>
                  <p>收发公文</p>
                </el-col>
                <el-col class="person_right_bgsj_cont_top_right_cont">
                  <p>当日收公文</p>
                  <p>当日发公文</p>
                </el-col>
                <el-col class="person_right_bgsj_cont_top_right_num">
                  <p>{{officeData.receiveOfficial || 0}}</p>
                  <p>{{officeData.sendOfficial || 0}}</p>
                </el-col>
              </el-col>
            </el-col>
            <el-col class="person_right_bgsj_cont_bot">
              <el-col class="person_right_bgsj_cont_top_left">
                <img :src="yjImg" alt>
              </el-col>
              <el-col class="person_right_bgsj_cont_top_rightb">
                <el-col class="person_right_bgsj_cont_top_right_text">
                  <p>当日 &gt;</p>
                  <p>收发邮件</p>
                </el-col>
                <el-col class="person_right_bgsj_cont_top_right_cont">
                  <p>当日收邮件</p>
                  <p>当日发邮件</p>
                </el-col>
                <el-col class="person_right_bgsj_cont_top_right_num">
                  <p>{{officeData.sendEmail || 0}}</p>
                  <p>{{officeData.receiveEmail || 0}}</p>
                </el-col>
              </el-col>
            </el-col>
          </el-col>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { test, home } from "@/common/static/service/apiData";
// 引入处理数字的工具
import { numbersSplit } from "../../tools/util.js";
import echarts from "echarts";
import mapCity from "./components/mapCity";
import comHeader from "@/ysgzWeb/components/comHeader";
import comOut from "@/ysgzWeb/components/comOut";
import backHome from "../components/toHome";
export default {
  name: "secondBattle",
  data() {
    return {
      policeConnectData: [],
      hzpj: require("@/common/images/hzpj.png"),
      qxjy: require("@/common/images/qxjy.png"),
      shjz: require("@/common/images/shjz.png"),
      gwImg: require("@/common/images/gwimg.png"),
      yjImg: require("@/common/images/yjimg.png"),
      tabNot: require("@/common/images/tab_not.png"),
      tabActive: require("@/common/images/tab_active.png"),
      peImg: require("@//common/images/pe.png"),
      peccImg: require("@//common/images/pecc.png"),
      zgBtn: "special",
      personBtn: "skill",
      radarList: [9, 10, 15, 22, 4, 5],
      // 按照专业统计的data
      dutyData: [
        { major: "公安学类", num: 369 },
        { major: "公安技术类", num: 337 },
        { major: "管理类", num: 132 },
        { major: "工学", num: 119 },
        { major: "法学", num: 109 }
      ],
      // 办公数据分析
      officeData: {},
      cityId: "52",
      // 接触警信息
      concatPolice: {},
      // 技能 体能
      spData: [
        {
          key: "",
          value: {
            person: [],
            company: []
          }
        }
      ],
      skillData: [],
      physicalData: [],
      supervisionData: []
    };
  },
  created() {
    var option = {
      isProvince: 0
    };
    // 消防监督
    this.fireSupervision_gd(option);
    // 根据地图id
    this.map_gd(option);

    //  政工系统给数据分析
    this.major_gd();
    this.job_gd();
    // 办公数据分析
    this.office_gd();

    // 警务系统关联分析
    this.policeAcess_gd();
    // 单项训练成绩排名前三
    this.SkillsData_gd();
  },
  mounted() {
    this.pieData(this.dutyData);
    this.peEchart();
  },
  methods: {
    // 消防监督分析
    fireSupervision_gd(options) {
      // 技能
      this.axios({
        method: "post",
        url: "/personnel/fireSupervision",
        data: options
      }).then(res => {
        if (res.status == 200) {
          var data = res.data.result;
          if (data) {
            this.supervisionData = data;
          }
        } else {
          console.log("请求错误");
        }
      });
    },
    // 技能和体能训练科目
    SkillsData_gd() {
      // 技能
      this.axios({
        method: "post",
        url: "/personnel/staffSkill",
        params: {}
      }).then(res => {
        if (res.status == 200) {
          var data = res.data.result;
          if (data) {
            this.skillData = JSON.parse(data);
            this.spData = this.skillData;
            console.log(data, "技能");
          }
        } else {
          console.log("请求错误");
        }
      });
    },
    PhysicalData_gd() {
      // 体能
      this.axios({
        method: "post",
        url: "/personnel/physicalSkill",
        params: {}
      }).then(res => {
        if (res.status == 200) {
          var data = res.data.result;
          if (data) {
            this.physicalData = JSON.parse(data);
            this.spData = this.physicalData;
          }
        } else {
          console.log("请求错误");
        }
      });
    },
    // 警务系统关联分析
    policeAcess_gd() {
      this.axios({
        method: "post",
        url: "/personnel/policeAssociation",
        params: {}
      }).then(res => {
        if (res.status == 200) {
          var data = res.data.result;
          if (data) {
            this.policeConnectData = data;
            console.log(data);
            this.peEchart(data);
          }
        } else {
          console.log("请求错误");
        }
      });
    },
    // 按专业统计获取数据
    major_gd() {
      this.axios({
        method: "post",
        url: "/personnel/majorStatistic",
        params: {}
      }).then(res => {
        if (res.status == 200) {
          var data = res.data.result;
          if (data) {
            this.dutyData = data;
            // this.pieData(data);
          }
        } else {
          console.log("请求错误");
        }
      });
    },
    // 办公数据分析
    office_gd() {
      this.axios({
        method: "post",
        url: "/personnel/officialDocumentStatistic",
        params: {}
      }).then(res => {
        if (res.status == 200) {
          var data = res.data.result;
          // console.log(data);
          if (data) {
            this.officeData = data;
          }
        } else {
          console.log("请求错误");
        }
      });
    },
    // 按照岗位统计
    job_gd() {
      this.axios({
        method: "post",
        url: "/personnel/postStatistic",
        params: {}
      }).then(res => {
        if (res.status == 200) {
          var data = res.data.result;
          // console.log(data);
          if (data) {
            this.radarList = data.map(item => {
              return item.num;
            });
          }
        } else {
          console.log("请求错误");
        }
      });
    },
    // 根据传过来的id 请求数据
    map_gd(options) {
      this.axios({
        method: "post",
        url: "/personnel/alarmReceivalStatistic/",
        data: options
      }).then(res => {
        if (res.status == 200) {
          var data = res.data.result;
          // console.log(data);
          if (data) {
            this.concatPolice = data;
          }
        } else {
          console.log("请求错误");
        }
      });
    },
    // 接Id
    pushId(idValue) {
      this.cityId = idValue;
      var options = {};
      if (idValue == 52) {
        options = {
          isProvince: "0"
        };
      } else {
        options = {
          cityId: idValue,
          isProvince: "1"
        };
      }
      this.map_gd(options);
      this.fireSupervision_gd(options);
    },
    // tab切换
    clickTab(val) {
      this.zgBtn = val;
      this.pieData(this.dutyData);
    },
    clickPersonTab(val) {
      this.personBtn = val;
      if (val == "skill") {
        this.SkillsData_gd();
      } else {
        this.PhysicalData_gd();
      }
    },
    testtest() {
      test().then(res => {
        console.log("res");
        console.log(res);
      });
    },
    // 雷达图
    // 饼图
    pieData(val) {
      let pieOne = this.$refs.pieOne;
      let keyUnitChart = echarts.init(pieOne);
      keyUnitChart.clear();
      let option;
      let _this = this;
      if (this.zgBtn == "special") {
        var pieData = val.map(item => {
          return {
            name: item.major,
            value: item.num
          };
        });

        option = {
          color: [
            "#45FFAC",
            "#00FFFF",
            "#0096FF",
            "#7ECEF4",
            "#448ACA",
            "rgba(250,250,250,0.3)"
          ],
          grid: {
            top: 0,
            bottom: 0
          },
          legend: {
            orient: "horizontal",
            // right: "",
            // top: "bottom",
            bottom: 10,
            itemWidth: 6,
            itemHeight: 6,
            itempGap: 0,
            formatter: name => {
              let data = pieData;
              let total = 0;
              let target;
              for (let i = 0, l = data.length; i < l; i++) {
                total += data[i].value;
                if (data[i].name == name) {
                  target = data[i].value;
                }
              }
              let arr = ["{a|" + name + "}", "{b|" + target + "}"];
              return arr.join("\n");
            },
            textStyle: {
              color: "#fff",
              rich: {
                a: {
                  //   width: 70,
                  lineHeight: 50,
                  fontSize: 16,
                  color: function() {},
                  verticalAlign: "bottom"
                },
                b: {
                  lineHeight: 30,
                  fontSize: 30,
                  fontFamily: "ROME",
                  color: function() {},
                  verticalAlign: "bottom"
                }
              }
            },
            icon: "roundRect",
            data: pieData
          },
          series: [
            // 主要展示层的
            {
              radius: ["45%", "50%"],
              center: ["50%", "40%"],
              type: "pie",
              itemStyle: {
                shadowBlur: 30,
                shadowColor: "#00ccff"
              },
              label: {
                normal: {
                  show: false,
                  formatter: "{c}%",
                  textStyle: {
                    fontSize: 16
                  },
                  position: "outside"
                },
                emphasis: {
                  show: true,
                  formatter: "{c}"
                }
              },
              labelLine: {
                normal: {
                  show: true,
                  length: 20,
                  length2: 25
                },
                emphasis: {
                  show: true
                }
              },
              name: "民警训练总量",
              data: pieData
            },
            // 边框的设置
            {
              radius: ["37%", "38%"],
              center: ["50%", "40%"],
              type: "pie",
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: false
                }
              },
              labelLine: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: false
                }
              },
              animation: false,
              tooltip: {
                show: false
              },
              data: [
                {
                  value: 1,
                  itemStyle: {
                    borderWidth: 1,
                    color: "#00ccff"
                  }
                }
              ]
            },
            {
              name: "外边框",
              type: "pie",
              clockWise: false, //顺时加载
              hoverAnimation: false, //鼠标移入变大
              center: ["50%", "40%"],
              radius: ["58%", "59%"],
              label: {
                normal: {
                  show: false
                }
              },
              data: [
                {
                  value: 9,
                  name: "",
                  itemStyle: {
                    normal: {
                      borderWidth: 1,
                      borderColor: "#00ccff"
                    }
                  }
                }
              ]
            }
          ]
        };
      } else {
        let indexFormatter = 0;
        let indicatorMax = this.radarList[0];
        this.radarList.map(item => {
          if (item > indicatorMax) {
            indicatorMax = item;
          }
        });
        // console.log(indicatorMax);
        option = {
          title: {},
          tooltip: {
            show: false
          },
          legend: {},
          radar: {
            radius: "55%",
            splitNumber: 3,
            axisLine: {
              lineStyle: {
                color: "#014463",
                opacity: 1
              }
            },
            splitLine: {
              lineStyle: {
                color: "#00aad8",
                opacity: 1
              }
            },
            splitArea: {
              show: true,
              areaStyle: {
                // 分隔区域的样式设置。
                color: ["#006187", "#013754", "#001d3d"] // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
              }
            },
            indicator: [
              { name: "宣传", max: indicatorMax },
              { name: "战训", max: indicatorMax },
              { name: "政工", max: indicatorMax },
              { name: "装备", max: indicatorMax },
              { name: "财务", max: indicatorMax },
              { name: "防火", max: indicatorMax }
            ],
            name: {
              show: true,
              formatter: function(val) {
                val = val + "\n" + _this.radarList[indexFormatter];
                indexFormatter++;
                let name = val.substring(0, val.indexOf("\n"));
                let values = val.substring(val.indexOf("\n") + 1, val.length); //去掉\n
                return "{nameTit|" + name + "\n}{valueCont| " + values + "}";
              },
              rich: {
                nameTit: {
                  color: "#03b0d8",
                  fontSize: 14
                },
                valueCont: {
                  color: "#f2fb4f",
                  fontSize: 30,
                  fontFamily: "ROME"
                }
              },
              lineHeight: 20
            }
          },
          series: [
            {
              name: "",
              type: "radar",
              symbolSize: 0,
              areaStyle: {
                normal: {
                  color: "#00aad8",
                  opacity: 0.5
                }
              },
              data: [
                {
                  value: this.radarList
                }
              ]
            }
          ],
          color: ["none"],
          backgroundColor: {
            type: "radial",
            colorStops: [
              {
                offset: 0,
                color: "rgba(0,0,0,0)" // 0% 处的颜色
              }
            ],
            globalCoord: false // 缺省为 false
          }
        };
      }

      keyUnitChart.setOption(option);
    },
    // 象形图
    peEchart(val) {
      let maxData = -0;
      let _this = this;

      let pieJw = this.$refs.pieJw;
      let keyChart = echarts.init(pieJw);
      var yData = [];
      var xData = [];
      if (val) {
        val.forEach(item => {
          yData.push(item.name);
          xData.push(item.num);
        });
        maxData = eval(xData.join("+"));
      }
      console.log(yData, xData, maxData);
      let option = {
        tooltip: {},
        xAxis: {
          max: maxData,
          splitLine: { show: false },
          axisLine: {
            show: false,
            lineStyle: {
              color: "none"
            }
          },
          axisLabel: {
            margin: 10
          }
        },
        yAxis: {
          data: yData,
          inverse: true,
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: {
            margin: 10,
            textStyle: {
              color: "#03B0D8",
              fontSize: 14
            }
          }
        },
        grid: {
          top: "center",
          height: 300,
          left: 170,
          right: 100
        },
        series: [
          {
            // current data
            type: "pictorialBar",
            symbol: "image://" + _this.peImg,
            symbolRepeat: "fixed",
            symbolMargin: 5,
            symbolClip: true,
            symbolSize: [14, 28],
            symbolBoundingData: maxData,
            data: xData,
            markLine: {
              show: false,
              symbol: "none",
              label: {},
              lineStyle: {
                normal: {
                  show: false,
                  color: "none",
                  type: "dotted",
                  opacity: 0,
                  width: 0
                }
              },
              data: [
                {
                  type: "max"
                }
              ]
            },
            z: 9
          },
          {
            // full data
            // name: "full",
            type: "pictorialBar",
            itemStyle: {
              normal: {
                opacity: 1
              }
            },
            label: {
              normal: {
                show: true,
                formatter: function(params) {
                  return params.value;
                },
                position: "right",
                offset: [30, -3],
                textStyle: {
                  align: "left",
                  color: "#FF8A00",
                  fontFamily: "ROME",
                  fontSize: 30
                }
              }
            },
            animationDuration: 0,
            symbolRepeat: "fixed",
            symbolMargin: 5,
            symbol: "image://" + _this.peccImg,
            symbolSize: [14, 28],
            symbolBoundingData: maxData,
            data: xData,
            z: 5
          }
        ]
      };
      keyChart.setOption(option);
    }
  },
  computed: {},
  components: {
    mapCity,
    comHeader,
    comOut,
    backHome
  }
};
</script>

<style lang="scss">
.person_mid_dxxl_tab {
  .person_left_zg_cont_tabs {
    padding: 12px 6px 0px 0;
  }
  .person_left_zg_cont_tabs_btn {
    width: 68px !important;
    height: 23px;
    font-size: 12px;
    font-family: SimHei;
    font-weight: 400;
    color: white;
    text-align: center;
    line-height: 23px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    float: right;
    cursor: pointer;
    margin-right: 1px;
  }
  .tabs_position {
    margin: 6px;
    border: 1px solid #044f6b;
    overflow-y: hidden;
    overflow-x: auto;
    .tabs_position_box {
      .tabs_position_th {
        width: 100px !important;
        text-align: center;
      }
      .tabs_position_tdbox {
        overflow-y: auto;
      }
      .tabs_position_td {
        width: 252px !important;
        text-align: center;
      }
    }
  }
  .person_mid_dxxl_tab_one {
    line-height: 110px;
    border-bottom: 1px solid #044f6b;
  }
  .person_mid_dxxl_tab_one:nth-child(3) {
    border-bottom: none;
  }
  .first.person_mid_dxxl_tab_one {
    width: 100px;
    height: 42px !important;
    font-size: 14px;
    line-height: 17px;
    color: white !important;
    background: linear-gradient(
      90deg,
      #074a8d 0%,
      #042043 80%,
      #042043 85%,
      #074a8d 100%
    );
  }
  .person_mid_dxxl_tab_one_1 {
    text-align: right;
    margin: 5px 5px 0 0;
  }
  .person_mid_dxxl_tab_one_2 {
    text-align: left;
    margin: 0px 0px 0 5px;
  }
  .first.person_mid_dxxl_tab_one:before {
    content: "";
    position: absolute;
    width: 1px;
    height: 108px;
    top: 0;
    left: 0;
    background-color: #044f6b;
    display: block;
    transform: rotate(-67deg);
    transform-origin: top;
    -ms-transform: rotate(-67deg);
    -ms-transform-origin: top;
  }
  //     .tabs_positionbox {
  //         width: calc(100% - 10px);
  //         overflow: hidden;
  //         margin: 0 auto;
  //         .tabs_position {
  //             position: initial !important;
  //             width: 100%;
  //             overflow-x: auto;
  //         }
  //     }

  .person_mid_dxxl_tab_background {
    background: linear-gradient(
      90deg,
      #074a8d 0%,
      #042043 25%,
      #042043 30%,
      #074a8d 100%
    );
    font-size: 14px;
    font-family: SimHei;
    font-weight: 400;
    color: rgba(2, 238, 255, 1);
    border-bottom: 1px solid #044f6b;
    border-left: 1px solid #044f6b;
  }
  .person_mid_dxxl_tab_background.title_tabs {
    height: 42px !important;
    line-height: 42px;
  }
  .person_mid_dxxl_left_text {
    text-align: left !important;
    padding-left: 13px;
    height: 111px;
    font-size: 14px;
    font-family: SimHei;
    padding-top: 18px;
    font-weight: 400;
    line-height: 24px;
    border-bottom: 1px solid #044f6b;
    border-left: 1px solid #044f6b;
    color: rgba(3, 176, 216, 1);
    p {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }
    .person_mid_dxxl_number {
      display: inline-block;
      font-size: 14px;
      font-family: ROME;
      width: 26px;
      font-weight: normal;
      color: rgba(255, 191, 0, 1);
    }
  }
  .person_mid_dxxl_left_text:nth-child(3n) {
    border-bottom: none;
  }
  table {
    border-collapse: collapse;
  }
  table,
  tr,
  td {
    border: 1px solid #044f6b;
  }

  td {
    text-align: center;
    height: 42px; /*这里需要自己调整，根据自己的需求调整高度*/
    position: relative;
  }

  .title1 {
    position: absolute;
    top: 0px;
    right: 5px;
  }
  .title2 {
    position: absolute;
    top: 20px;
    left: 5px;
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
@mixin tit_text {
  font-size: 18px;
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
.person_bg {
  color: white;
  padding-bottom: 21px;
  width: 1920px;
  height: 1080px;
  overflow-y: hidden;
  overflow-x: auto;
  background-image: url(../../common/images/background.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
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
  .person_left {
    width: 465px !important;
    margin: 0 20px 0 40px;
    .person_left_zg {
      margin-top: 30px;
      .person_left_zg_tit {
        @include tit_back;
        span {
          @include tit_text;
        }
      }
      .person_left_zg_cont {
        width: 464px !important;
        height: 356px;
        background-image: url(../../common/images/zgxtbg.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-top: 10px;
        margin-bottom: 30px;
        .person_left_zg_cont_tabs {
          padding: 10px 10px 0 0;
          .person_left_zg_cont_tabs_btn {
            width: 68px !important;
            height: 23px;
            font-size: 12px;
            font-family: SimHei;
            font-weight: 400;
            color: white;
            text-align: center;
            line-height: 23px;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            float: right;
            cursor: pointer;
            margin-right: 1px;
          }
        }
      }
      .person_left_jw_cont {
        width: 464px !important;
        height: 320px;
        background-image: url(../../common/images/jwxtbg.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-top: 10px;
      }
    }
  }
  .person_mid {
    width: calc(100% - 1050px) !important;
    .person_mid_map {
      width: 100%;
      height: 523px;
      background-image: url(../../common/images/mapbg.png);
    }
    .person_mid_dxxl {
      .person_mid_dxxl_tit {
        width: 100%;
        height: 45px;
        background-image: url(../../common/images/dxxlbg.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        line-height: 45px;
        padding-left: 20px;
        margin-top: 30px;
        span {
          @include tit_text;
        }
      }
      .person_mid_dxxl_tab {
        width: 100%;
        height: 320px;
        background-image: url(../../common/images/dxxltabbg.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-top: 9px;
      }
    }
  }
  .person_right {
    width: 465px !important;
    margin: 0 40px 0 20px;
    .person_right_jcj {
      margin-bottom: 25px;
      .person_right_jcj_tit {
        @include tit_back;
        span {
          @include tit_text;
        }
      }
      .person_right_jcj_cont {
        width: 100%;
        height: 183px;
        background-image: url(../../common/images/jcjbg.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-top: 10px;
        text-align: center;
        .person_right_jcj_cont_imgbox {
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
    .person_right_xfjd {
      margin-bottom: 25px;
      .person_right_xfjd_tit {
        @include tit_back;
        span {
          @include tit_text;
        }
      }
      .person_right_xfjd_cont {
        width: 464px;
        height: 318px;
        background-image: url(../../common/images/jwxtbg.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-top: 10px;
        .person_right_xfjd_cont_box:nth-child(1) {
          margin-top: 40px;
          .person_right_xfjd_cont_box_cont {
            border-top: 1px dashed #00ffff;
          }
        }
        .person_right_xfjd_cont_box {
          .person_right_xfjd_cont_box_cont {
            width: 325px !important;
            height: 80px;
            border-bottom: 1px dashed #00ffff;
            margin-left: -20px;
            .person_right_xfjd_cont_box_cont_text {
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
            .person_right_xfjd_cont_box_cont_num {
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
          .person_right_xfjd_cont_year {
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
            .person_right_xfjd_cont_year_tit {
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
    .person_right_bgsj {
      .person_right_bgsj_tit {
        @include tit_back;
        span {
          @include tit_text;
        }
      }
      .person_right_bgsj_cont {
        width: 464px !important;
        height: 211px;
        background-image: url(../../common/images/bgsjbg.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-top: 10px;
        .person_right_bgsj_cont_top {
          height: 88px !important;
          margin-bottom: 7px;
          margin-top: 15px;
        }
        .person_right_bgsj_cont_bottom {
          height: 88px;
        }
        .person_right_bgsj_cont_top_left {
          width: 72px !important;
          border-right: 1px solid rgba(0, 204, 238, 1);
          text-align: center;
          height: 36px;
          margin-right: 8px;
          margin-top: 24px;
          img {
            width: 43px;
            margin-top: -4px;
          }
        }
        .person_right_bgsj_cont_top_right_text {
          width: 93px !important;
          color: white;
          font-size: 18px;
          font-family: SimHei;
          font-weight: 400;
          margin: 18px 0 0 35px;
        }
        .person_right_bgsj_cont_top_right_cont {
          width: 155px !important;
          font-size: 14px;
          font-family: SimHei;
          font-weight: 400;
          color: rgba(3, 176, 216, 1);
          padding-top: 10px;
          p:nth-child(1) {
            margin-top: 4px;
          }
          p:nth-child(2) {
            margin-top: 22px;
          }
        }
        .person_right_bgsj_cont_top_righta {
          width: 374px !important;
          height: 88px;
          background-image: url(../../common/images/gwbg.png);
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
        .person_right_bgsj_cont_top_rightb {
          width: 374px !important;
          height: 88px;
          background-image: url(../../common/images/yjbg.png);
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
        .person_right_bgsj_cont_top_right_num {
          width: 75px !important;
          font-size: 30px;
          font-family: ROME;
          font-weight: normal;
          p:nth-child(1) {
            color: #01f9fd;
            margin-top: 4px;
          }
          p:nth-child(2) {
            color: #ff8a00;
          }
        }
      }
    }
  }
}
</style>
