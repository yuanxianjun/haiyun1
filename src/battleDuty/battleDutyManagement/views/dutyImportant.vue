<template>
	<div id="dutyImportant">
		<el-form :inline="true" :model="formInline" class="form">
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
	        <el-button class="custom" @click="getDetailList">查询</el-button>
	      </el-form-item>
	      <el-form-item label="">
	        <el-button class="custom" @click="createDutyData">创建</el-button>
	      </el-form-item>
	    </el-form>
	    <el-table 
	      :data="detailList" 
	      style="width: 100%" 
	      highlight-current-row
	      header-row-class-name="blackTableHeader">
	      <el-table-column prop="order" label="序号"  align="center">
	      	<template slot-scope="scope">
              {{scope.$index+1}} 
        	</template>
	      </el-table-column>
	      <el-table-column prop="title" label="标题"  align="center"></el-table-column>
	      <el-table-column prop="dutyDate" label="日期" align="center"></el-table-column>
	      <el-table-column prop="operation" label="操作" align="center">
	      	<template slot-scope="scope">
	          <span class="modify" @click="modify(scope.row)">修改</span>
	          <span class="delete" @click="deleteRow(scope,detailList)">删除</span>
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
				selectedMonth: '',
				formInline: {},
				currentPage: 1,
				pageSize: 10,
				detailList: [],
				total: 0
			}
		},
		created() {
			// 获取当前年-月
		    let times = new Date()
		    let year = times.getFullYear()
		    let month = times.getMonth() + 1
		    if(month < 10) month = '0' + month;
		    this.selectedMonth = `${year}-${month}`
		    //获取值班要情
		    this.getDetailList()
		},
		methods: {
			getDetailList(page = 1) {
				if(typeof page === 'object') page = 1
				this.axios.get(`/dutyPoint/selectByPage?page=${page}&pageSize=${this.pageSize}&monthStr=${this.selectedMonth}`).then( res => {
			    	const { status, data } = res
					const { result } = data
					const { list, total } = result
					if(status == 200 && list.length) {
						this.total = total
						this.detailList = list
					}else {
						this.total = 0
						this.detailList = []
					}
			    })
			},
			// 创建跳转
			createDutyData() {
				this.$router.push({ name: 'createDutyImportant'})
			},
			// 修改跳转
			modify({ id, title, content, dutyDate }) {
				let params = JSON.stringify({ id, title, content, dutyDate })
				this.$router.push({
				 name: 'createDutyImportant',
				 query: {
				 	modifyData: params
				 }
				})
			},
			// 删除要情
			deleteRow({$index, row}, rows) {
				let bool = confirm('您确定要删除这条值班要情吗？');
				bool && this.axios.delete(`/dutyPoint/delete/${row.id}`).then( res => {
					if(res.status == 200) {
						rows.splice($index, 1);
						this.$message({
				          message: '删除成功',
				          type: 'success'
				        })
					}else {
						this.$message.error('删除失败');
					}
				})
			},
			// 分页设置
			handleSizeChange(pageSize) {
				this.pageSize = pageSize
				this.getDetailList()
			},
			handleCurrentChange(page) {
				this.getDetailList(page)
			}
		}
	}
</script>
<style lang="scss">
	#dutyImportant {
		width: 100%;
		height: 100%;
		padding: 15px;
		span {
			cursor: pointer;
			&.delete {
				color: red;
				margin: 0 10px;
				text-decoration: underline;
			}
			&.modify {
				color: #00c0ff;
				margin: 0 10px;
				text-decoration: underline;
			}
		}
		.el-pagination {
			text-align: center;
			margin-top: 20px;
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