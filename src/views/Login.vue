<template>
	<div class="login-container">
		<el-form :model="ruleForm2" :rules="rules2" status-icon ref="ruleForm2"
		label-position="left" label-width="0px" class="demo-ruleForm login-page">
			<h3 class="title">系统登录</h3>
			<el-form-item prop="loginname">
				<el-input type="text" v-model="ruleForm2.loginname" auto-complete="off"
				placeholder="用户名"></el-input>
			</el-form-item>
			<el-form-item prop="password">
				<el-input type="password" v-model="ruleForm2.password" auto-complete="off"
				placeholder="密码"></el-input>
			</el-form-item>
			<el-checkbox v-model="checked" class="remeberme">记住密码</el-checkbox>
			<el-form-item style="width:100%;margin-top:15px">
				<el-button type="primary" style="width:100%" @click="handleSubmit('ruleForm2')" :loading="logining">登录</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
import {get,post} from '@/router/axios-cfg'
	export default{
		data(){
			return {
				logining:false,
				ruleForm2:{
					loginname: '',
					password: ''
				},
				rules2:{
					loginname:[{required:true,message:'请输入用户名',trigger:'blur'}],
					password:[{required:true,message:'请输入密码',trigger:'blur'}]
				},
				checked:false
			}
		},
		methods: {
			handleSubmit(formName){
				this.$refs[formName].validate((valid)=>{
					if(valid){
						this.logining = true
						let param = JSON.stringify(this.ruleForm2)
						post('/login',param).then(res=>{
							this.logining = false
							if(res.success){
								sessionStorage.setItem('user',res.data);
								//根据用户类型跳转 1：平台管理用户 2.：商业管理用户
		           	 			if(res.data.usertype==1)
									this.$router.push({path:'/in'})
								else{
									this.$router.push({path:'/cs'})
								}
							}else{
								if(res.code==501){
									this.$alert(res.msg,'提示',{confirmButtonText:'关闭'})
								}else{
									this.$refs[formName].resetFields();
									this.$alert('用户名或密码不正确','提示',{confirmButtonText:'关闭'})
								}
							}
						}).catch(res=>{
							this.ruleForm2 = {}
							this.logining = false
						})
					}else{
						console.log('错误提交')
						return false
					}
				})
			}
		}
	}
</script>
<style scoped>
	.login-container{
		width:100%;
		/*height: 100%;*/
		background: url('../assets/loginbg.jpg') no-repeat; 
		background-size:100% 100%;
		position:fixed;
		top:50%;
		left:50%;
		transform:translateX(-50%) translateY(-50%);
		min-height:768px;
	}
	.login-page{
		-webkit-border-radius: 5px;
		border-radius:5px;
		margin: 250px auto;
		width: 350px;
		padding:35px 35px 15px;
		background: #fff;
		border:1px solid #eaeaea;
		box-shadow: 0 0 25px #cac6c6; 
	}
	label.el-checkbox.rememberme{
		margin: 0px 0px 15px;
		text-align: right;
	}
</style>