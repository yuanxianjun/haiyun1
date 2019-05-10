<template>
  <div class="out">
    <!-- 外环 -->
    <div class="outRing">
      <div class="rotateDiv">
        <div class="outDiv" v-for="(item,index) in outPos" :key="index">
          <!-- 旋转的背景-->
          <div class="outBall"></div>
          <div class="circle_text">{{item.title}}</div>
          <div class="line_text">2{{item.value}}</div>
        </div>
      </div>
      <!--<div class="outDiv">
        
        	<div class="outBall"></div>
        	<div class="circle_text">水利数据</div>
         	<div class="line_text">2345</div> 
      </div>-->
    </div>
    <!-- 内环 -->
    <div class="insideRing">
      <div class="rotateDiv">
        <div class="outDiv" v-for="(item,index) in inPos" :key="index">
          <!-- 旋转的背景-->
          <div class="outBall"></div>
          <div class="circle_text">{{item.title}}</div>
          <div class="line_text">2{{item.value}}</div>
        </div>
      </div>
    </div>
    <!-- 地球 -->
    <div class="earth"></div>
    <!-- <div class="earthUP">
      <img src="../assets/earthUp.png" alt>
    </div>-->
  </div>
</template>

<script>
import $ from "jquery";
import echarts from "echarts";
export default {
  name: "vuePie",
  props: {},
  data() {
    return {
      outPos: [
        {
          title: "水利数据",
          value: "2345"
        },
        {
          title: "气象数据",
          value: "2345"
        },
        {
          title: "交通数据",
          value: "2346"
        },
        {
          title: "地震数据",
          value: "3421"
        },
        {
          title: "公安数据",
          value: "1235"
        },
        {
          title: "工商数据",
          value: "5676"
        },
        {
          title: "国土数据",
          value: "3233"
        }
      ],
      inPos: [
        { title: "队伍数据", value: "2454" },
        { title: "救援数据", value: "28910" },
        { title: "交通数据", value: "44121" },
        { title: "基础数据", value: "43210" }
      ],
      timer: null
    };
  },
  created() {},
  mounted() {
    this.starRotate();
  },
  methods: {
    //  星际绕行
    starRotate() {
      //
      var outBalls = $(".outRing").find(".outDiv");
      var inBalls = $(".insideRing").find(".outDiv");

      rotate(inBalls, 230, 120, 90, -1);
      rotate(outBalls, 430, 250, 60, 1);

      function rotate(balls, x, y, num, direct) {
        for (var i = 0; i < balls.length; i++) {
          balls[i].deg = i * num;
        }
        var a = x,
          b = y;
        //设置定时器
        setInterval(changeEdg, 10);

        //变位置的函数
        function changeEdg() {
          for (var i = 0; i < balls.length; i++) {
            balls[i].style.left =
              direct * a * Math.cos((balls[i].deg * Math.PI) / 180) + a + "px";

            balls[i].style.top =
              b * Math.sin((balls[i].deg * Math.PI) / 180) + b + "px";

            balls[i].deg += 0.155;
          }
        }
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.out {
  width: 1022px;
  height: 600px;
  position: relative;
  left: 0;
  top: 0;
}

// 旋转的圈中间文字
.circle_text {
  width: 40px;
  height: 40px;
  font-size: 14px;
  letter-spacing: 3px;
  color: #41c7f8;
  word-wrap: break-word;
  position: absolute;
  left: 16px;
  top: 11px;
  z-index: 700;
}
// 横杠上的文字
.line_text {
  width: 120px;
  height: 40px;

  position: absolute;
  left: 60px;
  top: 20px;
  line-height: 40px;
  text-align: center;
  font-family: ROME;
  font-size: 32px;
  color: #ffffff;
  z-index: 800;
  background: url(../assets/heng.png) no-repeat bottom;
  background-size: 100%;
}
.outBall {
  width: 62px;
  height: 62px;
  position: absolute;
  z-index: 100;
  background-repeat: no-repeat;
  background-size: 100% 100%;

  background-image: url(../assets/little_circle.png);
  // 自转动画
  -webkit-animation: myRotate 10s linear infinite;
  animation: myRotate 10s linear infinite;
}
// 外环
.outRing {
  width: 900px;
  height: 560px;

  position: absolute;
  left: 62px;
  top: 30px;
  z-index: 30;
  background-image: url(../assets/out_circle.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;

  .rotateDiv {
    width: 900px;
    height: 560px;
    // background: red;
    position: absolute;
    transform: rotate(15deg);
    .outDiv {
      position: absolute;
      width: 62px;
      height: 62px;
      transform: rotate(-15deg);
    }
  }
}
// 内环
.insideRing {
  width: 515px;
  height: 300px;
  position: absolute;
  left: 269px;
  top: 166px;
  z-index: 20;

  background-image: url(../assets/neiquan.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .rotateDiv {
    width: 500px;
    height: 290px;
    // background: red;
    position: absolute;
    transform: rotate(6deg);
    .outDiv {
      position: absolute;
      width: 62px;
      height: 62px;
      transform: rotate(-6deg);
    }
  }
}
// 球体
.earth {
  width: 600px;
  height: 800px;
  position: absolute;
  left: 248px;
  top: -118px;
  z-index: 10;

  background-image: url(../assets/earth.png);
  background-repeat: no-repeat;
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
