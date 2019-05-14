<template>
  <div id="searchPerson" class="main">
    <comHeader></comHeader>
    <backHome :localPage="linkPageObj"></backHome>
    <div class="content_top">
      <div class="left">
        <!-- 退出按钮  -->
        <comOut></comOut>
        <div class="carImg">
          <div class="img">
            <img src="./assets/3.png" alt>
          </div>
          <div class="info">
            <ul class="leftUl">
              <li class="infoLi" v-for="(item,index) in 3" :key="index+'li'">
                <span>车辆名称：</span>
                <span>泡沫灭火车</span>
              </li>
            </ul>
            <div class="middlWire">
              <!-- <img src="./assets/" alt=""> -->
            </div>
            <ul class="leftUl">
              <li class="infoLi" v-for="(item,index) in 3" :key="index+'li'">
                <span>车辆名称：</span>
                <span>泡沫灭火车</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="middle">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="基础数据" name="first">
            <div class="info">
              <ul class="leftUl">
                <li class="infoLi" v-for="(item,index) in 3" :key="index+'li'">
                  <span>车辆名称：</span>
                  <span>泡沫灭火车</span>
                </li>
              </ul>
              <div class="middlWire">
                <!-- <img src="./assets/" alt=""> -->
              </div>
              <ul class="leftUl">
                <li class="infoLi" v-for="(item,index) in 3" :key="index+'li'">
                  <span>车辆名称：</span>
                  <span>泡沫灭火车</span>
                </li>
              </ul>
            </div>
          </el-tab-pane>
          <el-tab-pane label="性能指标" name="second">性能指标</el-tab-pane>
          <el-tab-pane label="装载器材" name="third">角色管理</el-tab-pane>
          <el-tab-pane label="生产企业" name="fourth">生产企业</el-tab-pane>
          <el-tab-pane label="GPS信息" name="fifth">GPS信息</el-tab-pane>
        </el-tabs>
      </div>
      <div class="right">
        <div class="right_header">
          <span class="color_grind">车辆生命周期</span>
        </div>
        <div class="right_con block">
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :icon="activity.icon"
              :type="activity.type"
              :color="activity.color"
              :size="activity.size"
              :timestamp="activity.timestamp"
            >
              {{activity.img}}
              <img :src="activity.img" alt>
              {{activity.content}}
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
      <div class="search_div">
        <!-- <el-input v-model="searchValue" placeholder="查询条件"></el-input> -->
        <span class="condition">查询条件</span>
        <a href="carSearch.html">
          <img src="./assets/searchBtn.png" alt>
        </a>
      </div>
    </div>
    <div class="bottom_content">
      <div class="bottom_header">
        <div class="title">
          <span class="color_grind">出警记录</span>
        </div>
        <div class="num color-grind">287</div>
        <div class="year">2019</div>
      </div>
      <div class="_swiper">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="cer in 10" :class="'cer_'+cer">
              <div class="time">2019-01-20</div>
              <div class="con">
                <div class="address">
                  花溪南方小区一栋三单元
                  1101室火灾
                </div>
                <div class="driver">驾驶员：张三</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
// 引入头部的组件
import comHeader from "../components/comHeader";
import comOut from "../components/comOut";
import backHome from "../components/toHome";

// caurap
var caurap;
export default {
  name: "searchPerson",
  data() {
    return {
      searchValue: "",
      carImg: 'require("./assets/scrap.png")',
      // 时间轴 数据
      activities: [
        {
          content: "支持使用图标",
          timestamp: "2018-04-12 20:46",
          size: "large",
          type: "primary",
          icon: "blue",
          img: "./assets/scrap.png"
        },
        {
          content: "支持自定义颜色",
          timestamp: "2018-04-03 20:46",
          color: "#0bbd87",
          img: "./assets/scrap.png"
        },
        {
          content: "支持自定义尺寸",
          timestamp: "2018-04-03 20:46",
          size: "large",
          color: "#77ff89"
        },
        {
          content: "默认样式的节点",
          timestamp: "2018-04-03 20:46",
          color: "red"
        }
      ],
      activeName: "first",
      swiper: null,
      linkPageObj: [
        {
          link: "personData.html",
          name: "人员数据"
        },
        {
          link: "carInfo.html",
          name: "车辆信息"
        }
      ],
      arr_swiper: [
        {
          time: "2017年-11-12"
        }
      ]
    };
  },
  created() {},
  watch: {},
  mounted() {
    this.swiper = new Swiper(".swiper-container", {
      slidesPerView: "auto",
      spaceBetween: 20,
      initialSlide: 0,
      grabCursor: true,
      freeMode: true
    });
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
  computed: {},
  components: {
    comHeader,
    comOut,
    backHome
  }
};
</script>

