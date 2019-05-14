<template>
  <div id="searchPerson" class="main">
    <comHeader></comHeader>
    <backHome :localPage="'人员搜索'"></backHome>
    <div class="header">
      <div class="header_left">
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
      </div>
      <div class="header_right">
        <div class="queryPanel">
          <div class="query_title"></div>
          <div class="params">
            <div class="param" v-for="param in params">
              <label>{{param.value}}</label>
              <i @click="deleteParam(param)"></i>
            </div>
          </div>
        </div>
        <div class="btn">
          <el-button></el-button>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="left">
        <div class="query">
          <div class="query_con">
            <div class="item">
              <div class="title">
                <i class="box" style="background: #04C8FF"></i>
                <label>职业职能证书</label>
              </div>
              <el-checkbox-group v-model="query.certificate">
                <el-checkbox v-for="smallItem in queryObj.certificate" :label="smallItem.name"></el-checkbox>
              </el-checkbox-group>
            </div>
            <div class="item">
              <div class="title">
                <i class="box" style="background: #FFBC00"></i>
                <label>学历</label>
              </div>
              <el-radio-group v-model="query.education">
                <el-radio
                  v-for="smallItem in queryObj.education"
                  :label="smallItem.name"
                >{{smallItem.name}}</el-radio>
              </el-radio-group>
            </div>
            <div class="item">
              <div class="title">
                <i class="box" style="background: #FFBC00"></i>
                <label>专业</label>
              </div>
              <el-radio-group v-model="query.major">
                <el-radio
                  v-for="smallItem in queryObj.major"
                  :label="smallItem.name"
                >{{smallItem.name}}</el-radio>
              </el-radio-group>
            </div>
            <div class="item">
              <div class="title">
                <i class="box" style="background: #FFFF00"></i>
                <label>立功受奖</label>
              </div>
              <el-checkbox-group v-model="query.reward">
                <el-checkbox v-for="smallItem in queryObj.reward" :label="smallItem.name"></el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </div>
      </div>
      <div class="center">
        <div class="query">
          <div class="query_con">
            <div class="item">
              <div class="title">
                <i class="box" style="background:#8FDA01"></i>
                <label>训练科目</label>
              </div>
              <el-form
                :model="query"
                :rules="rules"
                ref="trainForm"
                label-width="0px"
                class="demo-ruleForm"
              >
                <el-form-item label prop="train">
                  <el-checkbox-group v-model="query.train">
                    <div v-for="smallItem in queryObj.train">
                      <el-checkbox :label="smallItem.name"></el-checkbox>
                      <template v-if="smallItem.name != '单杠卷身上'">
                        <el-input suffix-icon="el-input-time"></el-input>
                        <span class="separator">—</span>
                        <el-input suffix-icon="el-input-time"></el-input>
                        <span class="classifier">分钟</span>
                      </template>
                      <template v-else>
                        <el-input></el-input>
                        <span class="separator">—</span>
                        <el-input></el-input>
                        <span class="classifier">个</span>
                      </template>
                    </div>
                  </el-checkbox-group>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>

      <div class="right">
        <div class="query">
          <div class="query_con">
            <div class="item">
              <div class="title">
                <i class="box" style="background:#FF5FD4"></i>
                <label>人员列表</label>
              </div>
              <div class="resultList">
                <div class="t_header">
                  <div class="t_l">所属机构</div>
                  <div class="t_r">姓名</div>
                </div>
                <div class="t_body">
                  <div class="t_row" v-for="person in personList">
                    <div class="t_l">{{person.orgName}}</div>
                    <div class="t_r">
                      <a href="personInfo.html">{{person.name}}</a>
                    </div>
                  </div>
                </div>
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

// // 引入滑动组件
import vueSeamlessScroll from "vue-seamless-scroll";

export default {
  name: "searchPerson",
  data() {
    var validateTrain = (rule, train, callback) => {
      if (train.length != 0) {
        return callback(new Error("请添加成员组！"));
      } else {
        callback();
      }
    };

    return {
      rules: {
        train: [{ validator: validateTrain, trigger: "blur" }]
      },
      // 实时警情数据
      slectProps: {
        label: "orgName",
        value: ["orgId"],
        children: "orgTreeList"
      },
      selectedOptions: ["e289775cdcde495e9120e2fd5fbddb09"],
      orgTreeData: [],
      userId: "01bd72cf0622445cb2e40d05173d425a",
      // 搜索栏目条件
      params: [],
      // 所有的条件选项列表
      queryObj: {
        certificate: [
          //职业职能证书
          { id: 1, name: "灭火救援" },
          { id: 2, name: "起车驾驶" },
          { id: 3, name: "搜救犬寻到" },
          { id: 4, name: "无人驾驶员" },
          { id: 5, name: "车辆装备保障" },
          { id: 6, name: "通信与计算机" },
          { id: 7, name: "潜水员" }
        ],
        education: [
          //学历
          { id: 1, name: "博士生" },
          { id: 1, name: "硕士生" },
          { id: 2, name: "大学本科" },
          { id: 3, name: "大专" },
          { id: 4, name: "高中" },
          { id: 5, name: "中专" },
          { id: 6, name: "中学" },
          { id: 7, name: "小学" }
        ],
        major: [
          //专业
          { id: 1, name: "通信与计算机" },
          { id: 2, name: "土木工程" },
          { id: 3, name: "建筑工程" },
          { id: 4, name: "测绘工程" },
          { id: 5, name: "软件工程" },
          { id: 6, name: "网络工程处" }
        ],
        reward: [
          //立功受奖
          { id: 1, name: "部队内部奖励" },
          { id: 2, name: "地方奖励" }
        ],
        train: [
          //训练科目
          { id: 1, name: "400m救人疏散物资" },
          { id: 2, name: "60m肩梯跑" },
          { id: 3, name: "负重上10楼" },
          { id: 4, name: "绳索攀爬" },
          { id: 5, name: "背负空气呼吸器50000m跑" },
          { id: 6, name: "搬运" },
          { id: 7, name: "重物折返" },
          { id: 8, name: "100m负重跑" },
          { id: 9, name: "单杠卷身上" }
        ]
      },
      query: {
        certificate: [],
        education: "",
        major: "",
        reward: [],
        train: []
      },
      personList: [
        { id: 1, orgName: "遵义市消防支队", name: "主角" },
        { id: 2, orgName: "遵义市消防支队", name: "主角" },
        { id: 3, orgName: "遵义市消防支队", name: "主角" },
        { id: 4, orgName: "遵义市消防支队", name: "主角" },
        { id: 5, orgName: "遵义市消防支队", name: "主角" },
        { id: 6, orgName: "遵义市消防支队", name: "主角" },
        { id: 7, orgName: "遵义市消防支队", name: "主角" },
        { id: 8, orgName: "遵义市消防支队", name: "主角" },
        { id: 9, orgName: "遵义市消防支队", name: "主角" },
        { id: 10, orgName: "遵义市消防支队", name: "主角" },
        { id: 11, orgName: "遵义市消防支队", name: "主角" },
        { id: 12, orgName: "遵义市消防支队", name: "主角" },
        { id: 13, orgName: "遵义市消防支队", name: "主角" },
        { id: 14, orgName: "遵义市消防支队", name: "主角" }
      ]
    };
  },
  created() {
    // 组织结构获取
    this.orgTree_gd(this.userId);
  },
  watch: {
    //职业职能证书
    "query.certificate": function(newVal, oldVal) {
      if (newVal.length > oldVal.length) {
        //添加元素
        this.params.push({
          type: "certificate",
          value: newVal[newVal.length - 1]
        });
      } else {
        //减少元素
        var uncheck = this.diffArray(oldVal, newVal);
        this.params = this.params.filter(
          item =>
            item.type != "certificate" ||
            (item.type == "certificate" && item.value != uncheck)
        );
      }
    },

    //学历
    "query.education": function(newVal, oldVal) {
      var index = -1;
      this.params.filter(function(item, idx) {
        if (item.type == "education" && item.value == oldVal) {
          index = idx;
          return item;
        }
      });
      if (index == -1) {
        this.params.push({ type: "education", value: newVal });
      } else {
        if (!newVal) {
          //删除专业搜索
          this.params.splice(index, 1);
        } else {
          //在原位置上修改

          var newObj = { type: "education", value: newVal };
          this.params.splice(index, 1, newObj);
        }
      }
    },

    //专业
    "query.major": function(newVal, oldVal) {
      var index = -1;
      this.params.filter(function(item, idx) {
        if (item.type == "major" && item.value == oldVal) {
          index = idx;
          return item;
        }
      });
      if (index == -1) {
        //第一次添加该类型的数据
        this.params.push({ type: "major", value: newVal });
      } else {
        if (!newVal) {
          //删除专业搜索
          this.params.splice(index, 1);
        } else {
          //在原位置上修改

          var newObj = { type: "major", value: newVal };
          this.params.splice(index, 1, newObj);
        }
      }
    },

    //立功受奖
    "query.reward": function(newVal, oldVal) {
      if (newVal.length > oldVal.length) {
        //添加元素
        this.params.push({
          type: "reward",
          value: newVal[newVal.length - 1]
        });
      } else {
        //减少元素
        var uncheck = this.diffArray(oldVal, newVal);
        this.params = this.params.filter(
          item =>
            item.type != "reward" ||
            (item.type == "reward" && item.value != uncheck)
        );
      }
    },

    //训练科目
    "query.train": function(newVal, oldVal) {
      if (newVal.length > oldVal.length) {
        //添加元素
        this.params.push({
          type: "train",
          value: newVal[newVal.length - 1]
        });
      } else {
        //减少元素
        var uncheck = this.diffArray(oldVal, newVal);
        this.params = this.params.filter(
          item =>
            item.type != "train" ||
            (item.type == "train" && item.value != uncheck)
        );
      }
    }
  },
  mounted() {},
  methods: {
    /****
     *比较两个数组的差异
     * */
    diffArray(targetArr, compareArr) {
      for (var i = 0; i < targetArr.length; i++) {
        if (compareArr.indexOf(targetArr[i]) == -1) {
          return targetArr[i];
        }
      }
    },

    /****
     * 删除搜索条件
     * */
    deleteParam: function(data) {
      if (
        "certificate" == data.type ||
        "reward" == data.type ||
        "train" == data.type
      ) {
        this.query[data.type] = this.query[data.type].filter(
          item => item != data.value
        );
      } else {
        this.query[data.type] = "";
      }
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
          }
        } else {
          console.log("请求错误");
        }
      });
    },

    /**
     *点击级联下拉菜单触发
     */
    handleChange(value) {}
  },
  computed: {},
  components: {
    comHeader,
    comOut,
    backHome,
    vueSeamlessScroll
  }
};
</script>

