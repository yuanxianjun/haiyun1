	<template>
  <div id="carSearchDiv">
    <comHeader></comHeader>
    <backHome :localPage="pageTitle"></backHome>
    <div class="carSearchCon">
      <div class="carSearch_left">
        <div class="left_header">
          <span class="headerStyle color-grind">查询条件</span>
        </div>
        <div class="left_content">
          <ul class="searchul">
            <!-- 下拉 -->
            <li class="searchli">
              <el-select v-model="selectValue" placeholder="请选择所属机构">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </li>
            <li class="searchli">
              <el-select v-model="selectValue" placeholder="请选择车辆类型">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </li>
            <li class="searchli">
              <el-select v-model="selectValue" placeholder="请选择生产企业">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </li>
            <li class="searchli">
              <el-select v-model="selectValue" placeholder="请选择装备状态">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </li>
            <!-- 日期 -->
            <li class="searchli">
              <el-date-picker v-model="dateTimeValue" type="date" placeholder="选择装备日期"></el-date-picker>
              <span class="searchli_time"></span>
            </li>
            <li class="searchli">
              <el-date-picker v-model="dateTimeValue" type="date" placeholder="选择报废日期"></el-date-picker>
              <span class="searchli_time"></span>
            </li>
            <li class="searchli">
              <el-date-picker v-model="dateTimeValue" type="date" placeholder="选择出厂日期"></el-date-picker>
              <span class="searchli_time"></span>
            </li>
            <li class="searchli">
              <el-date-picker v-model="dateTimeValue" type="date" placeholder="选择购买日期"></el-date-picker>
              <span class="searchli_time"></span>
            </li>

            <li class="searchli_111">
              <el-input v-model="carLicense" placeholder="请输入车牌号"></el-input>
            </li>
            <!-- 下拉 -->
            <li class="searchli">
              <el-select v-model="selectValue" placeholder="请选择装备状态">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </li>
          </ul>
          <div class="buttonDiv">
            <div :class="searchBtnStyle" @click="searchFun">查询</div>
            <div :class="cancelBtnStyle" @click="cancelFun">取消</div>
          </div>
        </div>
      </div>

      <div class="content_right">
        <div class="right_header">
          <span class="headerStyle color-grind">查询结果</span>
        </div>
        <div class="right_content">
          <div class="tableDiv">
            <ul>
              <li class="thead">
                <span v-for="(item,index) in tableData.theadData" :key="index">{{item.trHeader}}</span>
              </li>

              <li class="tdHead" v-for="(item,index) in tableData.tdData" :key="index">
                <span id="firstSpan" :title="item.name">{{item.name}}</span>
                <span>
                  <a class="peopleName" href="#">{{item.value && item.value["所属机构"]}}</a>
                </span>

                <span>
                  <a class="peopleName" href="#">{{item.value && item.value["装备编码"]}}</a>
                </span>
                <span>
                  <a class="peopleName" href="#">{{item.value && item.value["车牌号"]}}</a>
                </span>
                <span>
                  <a class="peopleName" href="#">{{item.value && item.value["车辆类型"]}}</a>
                </span>
              </li>
            </ul>
          </div>
          <div class="pageRate">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400"
            ></el-pagination>
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
import backHome from "../components/toHome";

export default {
  name: "ysgzIndex",
  data() {
    return {
      pageTitle: [
        {
          link: "/personData",
          name: "人员数据"
        },{
          link:"",
          name:"车辆搜索"
        }
      ],
      dateTimeValue: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      selectValue: "",
      // 车牌号
      carLicense: "",
      searchBtnStyle: "btn",
      cancelBtnStyle: "btn",
      currentPage4: 4,
      tableData: {
        tdData: [
          {
            name: "1",
            value: {
              所属机构: "花溪区消防中队",
              装备编码: "433u3423u080808",
              车牌号: "贵X353454554急",
              车辆类型: "举高喷射消防车"
            }
          },
          {
            name: "2",
            value: {
              所属机构: "花溪区消防中队",
              装备编码: "433u3423u080808",
              车牌号: "贵X353454554急",
              车辆类型: "举高喷射消防车"
            }
          },
          {
            name: "3",
            value: {
              所属机构: "花溪区消防中队",
              装备编码: "433u3423u080808",
              车牌号: "贵X353454554急",
              车辆类型: "举高喷射消防车"
            }
          },
          {
            name: "4",
            value: {
              所属机构: "花溪区消防中队",
              装备编码: "433u3423u080808",
              车牌号: "贵X353454554急",
              车辆类型: "举高喷射消防车"
            }
          },
          {
            name: "5",
            value: {
              所属机构: "花溪区消防中队",
              装备编码: "433u3423u080808",
              车牌号: "贵X353454554急",
              车辆类型: "举高喷射消防车"
            }
          },
          {
            name: "6",
            value: {
              所属机构: "花溪区消防中队",
              装备编码: "433u3423u080808",
              车牌号: "贵X353454554急",
              车辆类型: "举高喷射消防车"
            }
          },
          {
            name: "7",
            value: {
              所属机构: "花溪区消防中队",
              装备编码: "433u3423u080808",
              车牌号: "贵X353454554急",
              车辆类型: "举高喷射消防车"
            }
          },
          {
            name: "8",
            value: {
              所属机构: "花溪区消防中队",
              装备编码: "433u3423u080808",
              车牌号: "贵X353454554急",
              车辆类型: "举高喷射消防车"
            }
          },
          {
            name: "9",
            value: {
              所属机构: "花溪区消防中队",
              装备编码: "433u3423u080808",
              车牌号: "贵X353454554急",
              车辆类型: "举高喷射消防车"
            }
          },
          {
            name: "10",
            value: {
              所属机构: "花溪区消防中队",
              装备编码: "433u3423u080808",
              车牌号: "贵X353454554急",
              车辆类型: "举高喷射消防车"
            }
          },
          {
            name: "11",
            value: {
              所属机构: "花溪区消防中队",
              装备编码: "433u3423u080808",
              车牌号: "贵X353454554急",
              车辆类型: "举高喷射消防车"
            }
          }
        ],
        theadData: [
          {
            trHeader: "序号"
          },
          {
            trHeader: "所属机构"
          },
          {
            trHeader: "装备编码"
          },
          {
            trHeader: "车牌号"
          },

          {
            trHeader: "车辆类型"
          }
        ]
      }
    };
  },
  created() {},
  mounted() {},
  methods: {
    //查询和取消
    searchFun() {
      this.searchBtnStyle = "clickBtn btn";
      this.cancelBtnStyle = " btn";
      this.tabaledata_gd();
    },

    cancelFun() {
      this.searchBtnStyle = " btn";
      this.cancelBtnStyle = " clickBtn btn";
      this.tabaledata_gd();
    },
    // 请求列表数据
    tabaledata_gd() {
      var that = this;
      setTimeout(function() {
        that.searchBtnStyle = "btn";
        that.cancelBtnStyle = "btn";
      }, 200);
    },
    // 分页数据
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
  components: {
    comHeader,
    backHome
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
#carSearchDiv {
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
  .headerStyle {
    line-height: 45px;
    font-size: 24px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #00ccff;
    margin-left: 20px;
    margin-top: 11px;
  }
  .color-grind {
    font-size: 24px;
    background: linear-gradient(to bottom, #02f4fb, #0f84d4);
    -webkit-background-clip: text;
    color: transparent;
  }
  .carSearchCon {
    padding: 20px;
    width: 1920px;
    height: 990px;
    .carSearch_left {
      width: 355px;
      height: 45px;
      float: left;
      margin-right: 20px;
      .left_header {
        width: 355px;
        height: 45px;
        background: url(./assets/title.png) no-repeat center center;
        background-size: 100% 100%;
      }
      .left_content {
        width: 355px;
        height: 880px;
        margin-top: 20px;
        background: url(./assets/left_content.png) no-repeat center center;
        background-size: 100% 100%;
        .el-select__caret {
          color: #00ccff;
        }
        .searchul {
          display: flex;
          flex-direction: column;

          li {
            width: 307px;
            height: 34px;
            margin-left: 24px;

            margin-top: 30px;
            background-size: 100% 100%;
            margin-bottom: 10px;
            position: relative;
          }
          .el-date-editor {
            .el-input--prefix .el-input__inner {
              padding-left: 20px;
            }
            .el-input__prefix {
              display: none;
            }
            .el-input__suffix {
              position: absolute;
              height: 100%;
              right: 5px;
              top: -1px;
            }
          }

          .el-select {
            width: 99%;
            display: inline-block;
            position: relative;
          }
          .el-input__suffix {
            position: absolute;
            height: 100%;
            right: 5px;
            top: 3px;
            text-align: center;
            color: #c0c4cc;
            -webkit-transition: all 0.3s;
            transition: all 0.3s;
            pointer-events: none;
          }
          .el-input__inner {
            background-color: transparent;
            color: #fff;
            border: none;
            line-height: 34px;
            height: 34px;
          }
          .el-select .el-input .el-select__caret {
            color: #00ccff !important;
          }
          .searchli {
            background: url(./assets/1.png) no-repeat center center;
          }
          .searchli_111 {
            background: url(./assets/111.png) no-repeat center center;
          }
          .searchli_time {
            width: 20px;
            height: 20px;
            position: absolute;
            right: 10px;
            top: 7px;
            background: url(./assets/time.png) no-repeat center center;
            background-size: 100% 100%;
          }
          .searchli_select {
            background: url(./assets/select.png) no-repeat center center;
          }
        }
        .buttonDiv {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          margin-top: 40px;
          .btn {
            text-align: center;
            width: 118px;
            height: 34px;
            background: url(./assets/btn.png) no-repeat center center;
            background-size: 100% 100%;
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 34px;
            letter-spacing: 0px;
            color: #ffffff;
            cursor: pointer;
          }
          .clickBtn {
            background: url(./assets/btn_click.png) no-repeat center center;
          }
        }
      }
    }
    .content_right {
      width: 1505px;
      height: 880px;
      float: left;
      position: relative;
      .right_header {
        width: 1505px;
        height: 45px;
        background: url(./assets/title_68.png) no-repeat center center;
        background-size: 100% 100%;
      }
      .right_content {
        width: 1505px;
        height: 880px;
        position: relative;
        background: url(./assets/right_content.png) no-repeat center center;
        background-size: 100% 100%;
        margin-top: 20px;
        padding: 12px;
        .pageRate {
          position: absolute;
          bottom: 12px;
          width: 1505px;
          height: 30px;
          .el-select__caret {
            color: #00ccff;
          }
          .el-pagination .btn-prev,
          .el-pagination .btn-next {
            background: center center no-repeat;
            background-size: 16px;
            background-color: transparent !important;
            cursor: pointer;
            margin: 0;
            color: #00ccff !important;
          }
          .el-pagination {
            color: #00ccff;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            font-family: ROME;
            .el-pager li {
              padding: 0 4px;
              background: transparent;
            }
            .el-input__inner {
              -webkit-appearance: none;
              background-color: transparent;
              background-image: none;
              border-radius: 10px;
              border: 1px solid #024454;
              color: #00ccff;
            }

            .el-pagination__total {
              color: #00ccff;
            }
            .el-pagination__jump {
              margin-left: 24px;
              font-weight: normal;
              color: #00ccff;
            }

            .el_pagenation button {
              background: transparent !important;
              color: #00ccff !important;
            }

            .el-pagination button.btn-prev {
              background: center center no-repeat;
              background-size: 16px;
              background-color: transparent;
              cursor: pointer;
              margin: 0;
              color: #00ccff;
            }
            .el-pagination .btn-next {
              background: center center no-repeat;
              background-size: 16px;
              background-color: transparent !important;
              cursor: pointer;
              margin: 0;
              color: #00ccff !important;
            }
            .el-pagination button:disabled {
              color: #00ccff !important;
              background-color: transparent !important;
              cursor: not-allowed;
            }
          }
        }
      }
      .tableDiv {
        width: 100%;
        height: 492px;
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
            color: #00ccff;
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
