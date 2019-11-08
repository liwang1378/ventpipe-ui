<template>
	<div style="width:50%;margin:0 auto">
	<el-form label-position="top" label-width="80px" :model="form" ref="form" :rules="rules">
		<el-input v-model="form.userid" type="hidden"></el-input>
	  <el-form-item label="请输入原密码" prop="password">
	    <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
	  </el-form-item>
	  <el-form-item label="请输入新密码" prop="password1">
	    <el-input type="password" v-model="form.password1" autocomplete="off"></el-input>
	  </el-form-item>
	  <el-form-item label="再次确认新密码" prop="password2">
	    <el-input type="password" v-model="form.password2" autocomplete="off"></el-input>
	  </el-form-item>
	  <el-form-item>
	     <el-button type="primary" @click="submitForm('form')">确定</el-button>
	     <el-button @click="resetForm('form')">重置</el-button>
	   </el-form-item>
	</el-form>
	</div>
</template>

<script>
import {get,post} from '@/router/axios-cfg'
	export default{
		data(){
			var validatePass = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('请输入新密码'));
		        } else if (value !== this.form.password2) {
		          callback(new Error('两次输入密码不一致!'));
		        } else {
		          callback();
		        }
		      }
			return{
				user:{},
				form:{
					password:'',
					password1:'',
					password2:'',
					userid:''
				},
				rules:{
					password:[{required:true,message:'请输入原密码',trigger:blur}],
					password1:[{required:true,message:'请输入新密码',trigger:blur},{
						min:6,max:12,message:'密码长度在6 - 12 个字符',trigger:'blur'
					},{ validator: validatePass, trigger: 'blur' }]
				}
			}
		},
		methods:{
			submitForm(formName) {
		         this.$refs[formName].validate((valid) => {
		          let param = {userid:this.form.userid, password:this.form.password,password2:this.form.password1}
		          if (valid) {
		            post('/user/reset',JSON.stringify(param)).then((res)=>{
		            	if(res.success){
		            		this.$refs[formName].resetFields();
			  				this.$message({
	  				          message: '密码操作成功！',
	  				          type: 'success'
	  				        });
		  				}else{
		  					this.$message.error('原密码不正确哦');
		  				}
		  			})
		          } else {
		            this.$message.error('错了哦');
		            return false;
		          }
		        });
		      },
		      resetForm(formName) {
		        this.$refs[formName].resetFields();
		      }
		},
		created(){
			//获取当前用户的userid
			get('/current').then(res=>{
			  this.user = res.data
			  this.form.userid= res.data.userid
			})
			
		}
	}
</script>

<style scoped></style>