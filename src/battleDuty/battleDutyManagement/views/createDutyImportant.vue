<template>
	<div id="createDutyImportant">
		<el-form ref="form" :model="formData" :rules="rules" label-width="80px">
			<el-form-item label="日期" prop="dutyDate">
				<el-date-picker
							:picker-options="pickerOptions"
		          v-model="formData.dutyDate"
		          type="date"
		          size="large"
		          value-format="yyyy-MM-dd"
		          placeholder="选择日期">
		        </el-date-picker>
			</el-form-item>
			<el-form-item label="标题" prop="title">
				<el-input v-model="formData.title" placeholder="请输入标题"></el-input>
			</el-form-item>
			<el-form-item label="内容" prop="content">
				<el-input type="textarea" rows="6" placeholder="请输入不超过200字标题内容" v-model="formData.content"></el-input>
			</el-form-item>
			<el-form-item class="btns">
				<el-button class="custom" @click="submitForm('form')">保存</el-button>
				<el-button class="custom" @click="cancel">取消</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				pickerOptions: {
					disabledDate(time) {
						return time.getTime()< Date.now() - 86400000; // 当前时间点前的日期不可选
					}
				},
				formData: {
					dutyDate: '',
					title: '',
					content: '',
				},
				rules: {
					dutyDate: [{required: true, message: '请选择值班日期', trigger: 'blur'}],
					title: [
						{required: true, message: '请输入值班标题', trigger: 'blur'},
						{max: 100, message: '不超过100个字', trigger: 'blur'},
					],
					content: [
						{required: true, message: '请输入值班内容', trigger: 'blur'},
						{max: 200, message: '不超过200个字', trigger: 'blur'},
					]
				}
			}
		},
		created() {
			if(this.$route.query.modifyData) {
				this.formData = JSON.parse(this.$route.query.modifyData)
			}
		},
		methods: {
			submitForm(formName) {
		        this.$refs[formName].validate((valid) => {
		          if (valid) {
		            this.save()
		          } else {
		            return false;
		          }
		        });
		    },
			save() {
				if(!this.$route.query.modifyData) {
					// 创建值班数据
					this.axios.post('/dutyPoint/insert',this.formData).then( res => {
						if(res.data.code == 'success') {
							this.$message({
					          message: '创建成功',
					          type: 'success'
					        })
					        this.$router.push({name: 'dutyImportant'})
						}else {
							this.$message.error('创建失败');
						}
					})
				}else {
					// 修改值班数据
					this.axios.patch('/dutyPoint/update',this.formData).then( res => {
						if(res.data.code == 'success') {
							this.$message({
					          message: '修改成功',
					          type: 'success'
					        })
					        this.$router.push({name: 'dutyImportant'})
						}else {
							this.$message.error('修改失败');
						}
					})
				}
			},
			cancel() {
				this.$router.back()
			}
		}
	}
</script>
<style lang="scss">
	#createDutyImportant {
		padding: 20px;
		.el-input {
			width: 28%;
			.el-input__inner {
				border-radius: 20px;
			}
		}
		.btns {
			text-align: right;
		}
	}
</style>