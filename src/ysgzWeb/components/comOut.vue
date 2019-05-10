<template>
  <div>
    <div class="name_div">
      <div class="circle_div">
        <div class="outHead">
          <img src="../../common/images/outHead.png" alt>
        </div>
      </div>
      <div class="out_circle"></div>
      <div class="name_con">
        <span class="police_name">黄景瑜</span>
        <span class="helleo">警官，您好</span>
      </div>
      <div class="out_btn" @click="showOutPage = true"></div>
    </div>
    <div class="outPageBox" v-if="showOutPage">
      <div class="outPage">
        <div class="centerDiv">
          <div class="headImg">
            <img class="head_img" src="../../common/images/outHead.png" alt>
          </div>
          <div class="loginName">黄景瑜</div>
          <div class="btns">
            <div class="confirm" @click="outConfirm">
              <img src="../../common/images/modal_3.png" alt>
            </div>
            <div class="cancel" @click="outCancel">
              <img src="../../common/images/modal_4.png" alt>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "comOut",
  props: {
    msg: String
  },
  data() {
    return {
      showOutPage: false
    };
  },
  created() {},
  mounted() {},
  methods: {
    // 退出按钮方法
    outConfirm() {
      this.showOutPage = false;
    },
    outCancel() {
      this.showOutPage = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../common/styles/font.css";
/*登录名称*/
.name_div {
  width: 354px;
  height: 80px;
  background: url("../../common/images/sign.png") no-repeat center right;
  background-size: 77% auto;
  position: relative;
  .circle_div {
    width: 24.8%;
    height: 100%;
    float: left;
    .outHead {
      text-align: center;
    }
    img {
      width: 34px;
      height: 34px;
      margin-top: 20px;
      margin-left: 10px;
    }
  }
  .out_circle {
    width: 102px;
    height: 102px;

    position: absolute;
    left: -2px;
    top: -12px;
    background: url(../../common/images/logo_pie.png) no-repeat center center;
    -webkit-background-size: cover;
    background-size: cover;
    -webkit-animation: myRotate 10s linear infinite;
    animation: myRotate 10s linear infinite;
  }
  .name_con {
    width: 60%;
    line-height: 80px;

    float: left;
    .police_name {
      display: inline-block;
      color: #0ab7ff;
      font-size: 18px;
      width: 75px;
      margin-left: 20px;
    }
    .helleo {
      font-size: 18px;
      color: #fff;
    }
  }
  .out_btn {
    position: absolute;
    right: 12%;
    top: 30%;
    width: 30px;
    height: 30px;
    background: url(../../common/images/out.png) no-repeat center center;
    cursor: pointer;
  }
}
.outPageBox {
  width: 1920px;
  height: 1080px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
}
// 退出的弹框
.outPage {
  width: 1920px;
  height: 1080px;
  overflow: hidden;
  opacity: 60%;
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
  left: 0;
  top: 0;

  .centerDiv {
    width: 456px;
    height: 445px;
    position: absolute;
    left: 50%;
    margin-left: -228px;
    top: 30%;
    background-image: url("../../common/images/modal1.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    .headImg {
      width: 180px;
      height: 180px;
      margin: 0 auto;
      margin-top: 80px;
      background-image: url("../../common/images/modal_2.png");
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
          cursor: pointer;
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
        cursor: pointer;
      }

      .cancel {
        text-align: left;
        margin-left: 50px;
        cursor: pointer;
      }
    }
  }
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
