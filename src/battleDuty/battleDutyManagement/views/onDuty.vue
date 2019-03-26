<template>
  <div id="onDuty">
    <el-form :inline="true" :model="formInline" >
        <el-form-item label="">
            <el-date-picker
                class="dateWrap"
                v-model="selectedMonth"
                type="month"
                size="large"
                :clearable="false"
                value-format="yyyy-MM"
                placeholder="选择日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="">
            <el-input class="nameInp" :clearable="true" v-model="inpText" placeholder="按名称查询"></el-input>
        </el-form-item>
        <el-form-item label="">
            <el-button class="custom" @click="search">查询</el-button>
        </el-form-item>
    </el-form>
    <div class="calendar">
        <div class="weeks">
            <span>星期日</span>
            <span>星期一</span>
            <span>星期二</span>
            <span>星期三</span>
            <span>星期四</span>
            <span>星期五</span>
            <span>星期六</span>
        </div>
      <div class="content">
          <div class="overflowX item"  v-for="(item,index) in prevDays" v-if="prevDays"></div>
          <el-scrollbar class="overflowX item" :class="{today: obj.isToday,isPrev:!obj.isFuture}" v-for="(obj,idx) in dutyLists">
            <div @click="toDetail(idx,obj)">
              <span class="time" v-formateDate="idx"></span>
              <div class="info">
                  <div v-if="obj.list.length">
                      <label>负责人:</label>
                      <div class="list">
                          <p v-show="val.position == 'position1'" v-for="val in obj.list" :class="{highlightName: val.hasColor}">{{val.name}}</p>
                      </div>
                      <label>值班人:</label>
                      <div class="list">
                          <p v-show="val.position == 'position2'" v-for="val in obj.list" :class="{highlightName: val.hasColor}">{{val.name}}</p>
                      </div>
                  </div>
                  <div v-if="!obj.list.length">
                      <span>请选择备勤值班人员</span>
                  </div>
              </div>
          </div>
          </el-scrollbar>
          
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'home',
    data() {
        return {
            inpText: '', // 查询model
            selectedMonth: '',
            formInline: {},
            dutyLists: [], // 值班列表Arr
            prevDays: 0
        }
    },
    created() {
        // 获取当前年-月
        let times = new Date()
        let year = times.getFullYear()
        let month = times.getMonth() + 1
        if(month < 10) month = '0' + month;
        this.selectedMonth = `${year}-${month}`
        // 获取值班列表
        this.search()
    },
    methods: {
        // 获取值班列表
        search() {
            this.axios.get(`/dutyPerson/selectForMonth?monthStr=${this.selectedMonth}&name=${this.inpText}`).then( res => {
                const { status, data } = res
                const { result } = data
                if(status == 200 && result.length) {
                    this.dutyLists = result
                    this.prevDays = result[0].dayOfWeek
                }else {
                    this.dutyLists = []
                    this.prevDays = 0
                }
            })
        },
        // 跳转值班详情页，传入当前选择日期
        toDetail(idx,{isFuture}) {
            if(!isFuture) return;
            let num = idx + 1
            let selectedDay = ''
            num >= 10 ? selectedDay = `${this.selectedMonth}-${num}` : selectedDay = `${this.selectedMonth}-0${num}`
            this.$router.push({
                name: 'dutyDetail',
                query: {
                    selectedDay
                }
            })
        }
    },
    directives: {
        formateDate: {
            bind(el,binding) {
                let num = binding.value + 1;
                num >= 10 ? el.innerHTML = num : el.innerHTML = '0' + num
            }
        }
    },
    components: {

    }
}
</script>
<style lang="scss">
    #onDuty {
        padding: 20px;
        background: white;
        border-radius: 10px;
        margin-bottom: 20px;
        .el-form {
            .el-form-item {
                margin-bottom: 0;
                .nameInp {
                    width: 300px!important;
                    .el-input__inner {
                        border-radius: 20px!important;
                    }
                }
            }
        }
        .calendar {
            margin-top: 20px;
            .weeks {
                span {
                    display: inline-block;
                    width: 14.2%;
                    height: 50px;
                    line-height: 50px;
                    color: #fff;
                    text-align: center;
                    background-color: #9CA0B4;
                    margin-right: 1px;
                    &:last-child {
                        margin-right: 0;
                    }
                }
            }
          .content {
              overflow: hidden;
              border-left: 1px solid #ebeff2;
              .item {
                //   width: 14.28%;
                  height: 142px;
                  overflow-y: auto;
                  overflow-x: hidden;
                  float: left;
                  cursor: pointer;
                  padding: 10px 0 0 10px;
                  border-right: 1px solid #ebeff2;
                  border-bottom: 1px solid #ebeff2;
                  .time {
                      color: #6670a2;
                  }
                &.today {
                    .time {
                        display: inline-block;
                        width: 30px;
                        height: 30px;
                        line-height: 30px;
                        text-align: center;
                        color: #ffffff;
                        background: linear-gradient(to right, #4dc3e4, #a1e9d9);
                        border-radius: 50%;
                    }
                    .info {
                        color: #3ACFFF;
                    }
                }
                  &.isPrev {
                      cursor: auto;
                      overflow-y: auto;
                      overflow-x: hidden;
                      background-color: #F1F1F1;
                  }
                  .info {
                      color: #747474;
                      width: 138px;
                      margin: 0 auto;
                      p:first-child {
                      }
                      label {
                          margin-right: 4px;
                      }
                      label,.list {
                          float: left;
                          .highlightName {
                              color: #17CBFF;
                          }
                      }
                      span {
                          display: inline-block;
                          margin-top: 4px;
                      }
                  }
                }
            }
        }
    }
    //滚动条
.el-scrollbar.overflowX {
  height: 100%;
}

.overflowX > .el-scrollbar__wrap {
  overflow-x: hidden;
}
.overflowX {
  width: 14.28%;

}
</style>
