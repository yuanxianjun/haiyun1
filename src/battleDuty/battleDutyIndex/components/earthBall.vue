<template>
  <div class="out center" style="width:100%;height:100%;">
  	<div class="outRing center">
  		<div class="insideRing center">
  			<div class="earth"></div>
  		</div>
  	</div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "vuePie",
  props: {
   
  },
  data() {
    return {
    
    };
  },
  created() {},
  mounted() {
   
  },
  methods: {
    //人员数据
   }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.center{
	display: flex; align-items: center; justify-content: center;
}
.out{
	position: relative;
	left:0;
	top:0;
	
}
.outRing{
	width:80%;
	height:80%;
	/*position:absolute;
	top:50%;*/
	
	background-image: url(../assets/out_circle.png);
	background-repeat: no-repeat;
	background-size: 100% 100%;
}
.insideRing{
	width:60%;
	height:60%;
	margin:0 auto;

	background-image: url(../assets/neiquan.png);
	background-repeat: no-repeat;
	background-size: 100% 100%;
}
.earth{
	width: 100%;
    height: 266%;
	background-image: url(../assets/earth.png);
	background-repeat: no-repeat;
	background-size: 100% 100%;
}
</style>
