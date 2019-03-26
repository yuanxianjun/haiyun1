<template>
  <div id="dutyDetail">
    <div class="date">{{selectedDay}}</div>
    <el-form :model="formData" :rules="rules" class="form-wrapper">
    	<el-table 
	      :data="detailList" 
	      style="width: 100%" 
	      height="220"
	      highlight-current-row
	      header-row-class-name="blackTableHeader">
	      <el-table-column prop="index" label="序号"  align="center">
	      	<template slot-scope="scope">
	              {{scope.$index+1}} 
	        </template>
	      </el-table-column>
	      <el-table-column prop="name" label="人员"  align="center"></el-table-column>
	      <el-table-column prop="position" label="备勤职务" align="center">
	      	<template slot-scope="scope">
	          <el-form-item prop="selectedPosition" :rules="[{ required: true, message: '请输入活动名称', trigger: 'blur' }]">
	          	<el-select 
	          	    class="selectWrap selectPosition"
		          	v-model="formData.selectedPosition[scope.$index]" 
		          	@change="handleChange(formData.selectedPosition[scope.$index],scope.$index)" 
		          	placeholder="请选择职务">
				    <el-option
				      v-for="(item,idx) in positionList"
				      :key="idx"
				      :label="item.name"
				      :value="item.dataKey">
				    </el-option>
				 </el-select>
	          </el-form-item>
	        </template>
	      </el-table-column>
	      <el-table-column prop="operation" label="操作" align="center">
	      	<template slot-scope="scope">
	          <span 
		          class="delete" 
		          @click="deleteRow(scope,detailList)"
		          :class="!formData.selectedPosition[scope.$index] ? 'disable' : ''">
		          删除
	          </span>
	        </template>
	      </el-table-column>
	    </el-table>
    </el-form>
    <div class="btns">
    	<el-button class="custom" @click="save">保存</el-button>
    	<el-button class="custom" @click="cancel">取消</el-button>
    </div>
    <el-form :inline="true">
      <el-form-item label="">
       <el-input class="nameInp" v-model="name" placeholder="请输入姓名" clearable></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-select class="selectWrap selectOrg" v-model="orgId" placeholder="请选择机构" clearable>
		    <el-option
		      v-for="item in organizationList"
		      :key="item.orgId"
		      :label="item.name"
		      :value="item.orgId">
		    </el-option>
		</el-select>
      </el-form-item>
      <el-form-item label="">
        <el-button class="custom" @click="getDutyPerson">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table 
      :data="dutyPersonList" 
      style="width: 100%" 
      height="480"
      highlight-current-row
      header-row-class-name="blackTableHeader">
      <el-table-column prop="index" label="序号"  align="center">
      	<template slot-scope="scope">
              {{scope.$index+1}} 
        </template>
      </el-table-column>
      <el-table-column prop="name" label="人员"  align="center"></el-table-column>
      <el-table-column prop="positionName" label="职务" align="center"></el-table-column>
      <el-table-column prop="operation" label="操作" align="center">
      	<template slot-scope="scope">
          <span class="select" @click="addRow(scope)">选择</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
		class="zb_page"
		@size-change="handleSizeChange"
		@current-change="handleCurrentChange"
		:current-page="currentPage"
		:page-sizes="[10, 20, 30, 40, 50]"
		:page-size="pageSize"
		layout="total, sizes, prev, pager, next, jumper"
		:total="total">
    </el-pagination>
  </div>
</template>
<script>
	export default {
		data() {
			return {
				dutyDate: '',
				name: '',
				total: 0,
				orgId: '', // 机构id
				organizationList: '',
				saveList: [],
				selectedDay: '',
				currentPage: 1,
				pageSize: 10,
				detailList: [],// 单日值班详情
				positionList: [],
				dutyPersonList: [],
				rules: {
					dataKey: [
			            { required: true, message: '请输入活动名称', trigger: 'blur' }
			         ]
				},
				formData: {
					selectedPosition: []
				}
			}
		},
		created() {
			this.selectedDay = this.$route.query.selectedDay
			
			// 获取单日值班详情
			this.axios.get(`/dutyPerson/selectForDate/${this.selectedDay}`).then( res => {
				const { data } = res
				const { code, result } = data
				if(code == 'success' && result.length) this.detailList = result
				this.detailList.forEach(({position, dutyDate, personId},idx) => {
					this.formData.selectedPosition[idx] = position
					this.saveList.push({
						personId,
						dutyDate,
						position
					})
				})
			})
			// 获取备勤职务列表
			this.axios.get('/enumetration/selectByParentKey/duty_position').then( res => {
				const { data } = res
				const { code, result } = data
				if(code == 'success' && result.length) this.positionList = result
			})
			//获取机构列表
			this.axios.get('/dutyPerson/selectOrgList').then( res => {
				const { data } = res
				const { code, result } = data
				if(code == 'success' && result.length) this.organizationList = result
			})
			// 分页查询值班人员列表
			this.getDutyPerson()
		},
		watch: {
			orgId(newVal,oldVal) {
				if(!newVal) this.getDutyPerson()
			},
	        name(newVal, oldVal) {
	        	if(!newVal) this.getDutyPerson()
	        },
	        //值班数据回显
	        detailList(newVal, oldVal) {
	        	newVal.forEach((item,idx,arr) => {
					let bool = this.dutyPersonList.some(val => val.personId == item.personId && !item.id)
					if(bool) {
						this.formData.selectedPosition[idx] = ''
					}else {
						this.formData.selectedPosition[idx] = arr[idx].position
					}
				})

	        }
		},
		methods: {
			handleChange(val, index) {
				this.saveList[index].position = val
			},
			save() {
				// 判断是否有未选择职务，未选择职务的selectedPosition为''
				let mustBool = this.formData.selectedPosition.indexOf('position1') > -1
				let bool = this.formData.selectedPosition.every( item => item )
				if(bool && mustBool) {
					this.axios.post('/dutyPerson/saveBatch',this.saveList).then( res => {
						if(res.data.code == 'success') this.$router.push({name: 'onDuty'})
					})
				}else {
					if (!bool) {
						this.$message.error('请选择备勤职务');
					} else {
						this.$message.error('必须有至少一位指挥长');
					}
				}
			},
			cancel() {
				this.$router.back()
			},
			addRow({ row }) {
				if(this.detailList.every( item => item.personId != row.personId)) {
					row.dutyDate = this.selectedDay
					this.detailList.unshift(row)
					this.saveList.unshift(row)
					console.log(row)
					this.$message({
			          message: '添加成功',
			          type: 'success'
			        })
				}else {
					this.$message.error('人员已存在');
				}
			},
			deleteRow({$index, row}, rows) {
				console.log(`${row.personId}`)
				console.log($index)
				if(!this.formData.selectedPosition[$index]) return;// 没有选择职务阻止删除
				let bool = confirm('您确定要删除吗？');
				bool && rows.splice($index, 1);
				bool && this.saveList.splice($index,1)
				console.log('saveListsaveListsaveListsaveList',this.saveList)
				// if (bool) {
				// 	if(`${row.id}` == undefined){
				// 		this.axios.delete(`/dutyPerson/delete/${row.id}`).then( res => {
				// 			if(res.data.code == 'success') {
				// 				rows.splice($index, 1);
				// 				this.saveList.splice($index,1)
				// 				this.$message({
				// 				message: '删除成功',
				// 				type: 'success'
				// 				})
				// 			}else {
				// 				this.$message.error('删除失败');
				// 			}
				// 		})
				// 	} else {
				// 		rows.splice($index, 1);
				// 		this.saveList.splice($index,1)
				// 		console.log(this.saveList)
				// 		this.$message({
				// 			message: '删除成功',
				// 			type: 'success'
				// 		})
				// 	}
				// }
			},
			// 获取人员列表
			getDutyPerson(page=1) {
				if(typeof page === 'object') page = 1
				this.axios.get(`/dutyPerson/selectByPage?page=${page}&name=${this.name}&orgId=${this.orgId}&pageSize=${this.pageSize}`).then( res => {
					const { data } = res
					const { code, result } = data
					const { list, total } = result
					if(code == 'success' && list.length) {
						this.dutyPersonList = list
						console.log(this.dutyPersonList)
					}else {
						this.dutyPersonList = []
					}
					this.total = total
				})
			},
			// 分页设置
			handleSizeChange(pageSize) {
				this.pageSize = pageSize
				this.getDutyPerson()
			},
			handleCurrentChange(page) {
				this.getDutyPerson(page)
			}
		}
	}
</script>
<style lang="scss">
	#dutyDetail {
			padding: 15px;
			height: 100%;
			.date {
					margin-bottom: 10px;
			}
			.form-wrapper {
					.el-form-item {
							margin-bottom: 0;
					}
			}
			.selectOrg {
					.el-input {
							width: 300px;
					}
			}
			.selectPosition {
					.el-input__inner {
							text-align: center;
					}
			}
			.nameInp {
					width: 300px!important;
					.el-input__inner {
							border-radius: 20px!important;
					}
			}
			span {
					cursor: pointer;
						//text-decoration: underline;
					&.delete {
							color: red;
							margin: 0 10px;
							&.disable {
									cursor: auto;
									color: #CFCFCF;
							}
					}
					&.select {
							color: #00c0ff;
							margin: 0 10px;
					}
			}
			.btns {
					text-align: right;
			}
			.el-pagination {
					text-align: center;
					margin-top: 20px;
					.el-input__inner {
							border-radius: 0;
					}
			}
	}
	.zb_page {
		.el-icon-arrow-left {
			line-height: 24px !important;
		}
		.el-icon-arrow-right {
			line-height: 24px !important;
		}
		.el-select__caret.el-input__icon{
			margin-right: 12px !important;
		}
	}
</style>