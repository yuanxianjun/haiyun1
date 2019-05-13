<template>
  <div>
    <div class="navigate">
      <img class="homeIcon" src="../../common/images/home.png" alt>
      <a class="_link" href="ysgzIndex.html">首页</a>
      <template v-if="typeof localPage == 'string'">
        <span class="littleHeng">-</span>
        <span class="color-grind">{{localPage}}</span>
      </template>
      <template v-else>
        <template v-for="(page,index) in localPage">
          <span class="littleHeng">-</span>
          <template v-if="index < localPage.length-1">
            <a class="_link" :href="page.link">{{page.name}}</a>
          </template>
          <template v-else>
            <span class="color-grind">{{page.name}}</span>
          </template>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "backHome",
  props: ["localPage"],
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// 首页icon图标和文字
.navigate {
  float: right;
  margin-right: 40px;
  display: flex;
  flex-direction: row;
  ._link {
    color: #0584b9;
    margin-left: 5px;
    cursor: pointer;
  }
  _link:link,
  _link:visited,
  _link:hover,
  _link:active {
    color: #0ebeea;
  }
  .littleHeng {
    margin-left: 15px;
    margin-right: 15px;
    color: #0ab7ff;
  }
}
.homeIcon {
  width: 18px;
  height: 18px;
}
.color-grind {
  background: linear-gradient(to bottom, #02f4fb, #0f84d4);
  -webkit-background-clip: text;
  color: transparent;
}
</style>

