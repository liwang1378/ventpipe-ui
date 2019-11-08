<template>
	<div>
		<div style="margin-bottom:10px;">
		<span style="text-align:center;font-size:24px;">用户管理</span>
		<div style="float:right;">
		<el-button type="primary"  size="small" @click="fresh()">刷新</el-button>
		<el-button type="primary"  size="small" @click="addModal()">添加新用户</el-button>
		</div>
		</div>
		  <el-table
		      :data="tableData"
		      stripe
		      style="width: 100%">
		      <el-table-column
		        prop="userid"
		        label="编号">
		      </el-table-column>
		      <el-table-column
		        prop="username"
		        label="客户姓名"
		        width="100">
		      </el-table-column>
		      <el-table-column
		        prop="telephone"
		        label="联系方式">
		      </el-table-column>
		      <el-table-column
		        prop="period"
		        label="使用截止期限" width="180">
		      </el-table-column>
		      <el-table-column
		        prop="loginname"
		        label="登录账户" width="100">
		      </el-table-column>
		      <el-table-column
		        prop="password"
		        label="密码">
		      </el-table-column>
		      <el-table-column prop="activeflag" label="激活状态" :formatter="fmtActive"></el-table-column>
		      <el-table-column
		        label="操作" width="400">
		        <template slot-scope="scope">
		               <el-button @click="handleUpdate(scope.row)" type="primary" size="small">修改</el-button>
		               <span v-if="flag">
		               	<el-button :type="scope.row.activeflag==1?'danger':'success'" size="small" @click="handleEnable(scope.row)">{{scope.row.activeflag==1?'禁用':'启用'}}</el-button>
		               </span>
		                <el-button @click="handleDelete(scope.row)" type="danger" size="small">删除</el-button>
		               <span v-if="flag">
			               <el-button type="success" size="small" @click="handleEnter(scope.row)">进入系统</el-button>
			                <el-button @click="handleClick(scope.row)" type="warning" size="small">导入</el-button>
		                </span>
		             </template>
		      </el-table-column>
		    </el-table>
	<el-dialog title="添加新用户" :visible.sync="userUI">
		<el-form :model="form" :rules="rules" ref="form">
			<el-input v-model="form.userid" type="hidden"></el-input>
			<el-form-item label="客户名称" :label-width="formLabelWidth" prop="username">
				<el-input v-model="form.username" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="联系电话" :label-width="formLabelWidth" prop="telephone">
				<el-input v-model="form.telephone" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="使用截止期限" :label-width="formLabelWidth" prop="period" style="text-align:left">
			<el-date-picker
		      v-model="form.period"
		      type="date"
		      placeholder="选择截止期限" format="yyyy-MM-dd">
		    </el-date-picker>
				<!-- <el-input v-model="form.period" autocomplete="off"></el-input> -->
			</el-form-item>
			<el-form-item label="登录账号" :label-width="formLabelWidth" prop="loginname">
				<el-input v-model="form.loginname" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="密码" :label-width="formLabelWidth" prop="password">
				<el-input v-model="form.password" autocomplete="off"></el-input>
			</el-form-item>
		</el-form>
		<div class="dialog-footer" slot="footer">
			<el-button @click="userUI=false">取消</el-button>
			<el-button type="primary" @click="submitForm('form')">确定</el-button>
		</div>
	</el-dialog>
	</div>
</template>
<script>
import {get,post} from '@/router/axios-cfg'
	export default{
		data(){
			return {
				flag:true,
				userUI:false,
				form:{
					username : '',
					loginname : '',
					password : '',
					period : '',
					telephone : '',
					activeflag: ''
				},
				formLabelWidth:'120px',
				rules:{
					username:[{required:true,message:'请输入客户名称',trigger:blur}],
					loginname:[{required:true,message:'请输入登录账号',trigger:blur}],
					password:[{required:true,message:'请输入登录密码',trigger:blur},{
						min:6,max:12,message:'密码长度在6 - 12 个字符',trigger:'blur'
					}],
					period:[{required:true,message:'请输入截止期限',trigger:blur}],
					telephone:[{required:true,message:'请输入联系电话',trigger:blur}],
				},
				tableData: []
			}
		},
		created(){
			this.query()
			let flag = this.$route.path
			if(flag == "/user"){
				this.flag = false
			}
		},
		methods:{
		  addModal(){
		  	this.userUI = true
		  	this.form = {}
		  },
		  fmtActive(row,column,cellValue,index){
		  	return cellValue==1?<el-tag type="success">激活</el-tag>:<el-tag type="danger">禁用</el-tag>
		  },
		  fresh(){
		  	this.$message('刷新成功')
		  	this.query()
		  },
		  async query(){
		  	await get('/user/query').then(res=>{
		  		let arr = res.data
		  		this.tableData = res.data
		  		for(let i=0;i<arr.length;i++){
		  			this.tableData[i].telephone = arr[i].customer.telephone
		  			this.tableData[i].period = arr[i].customer.period
		  			this.tableData[i].activeflag = arr[i].customer.activeflag
		  			this.tableData[i].customerid = arr[i].customer.customerid
		  		}
		  	})
		  },
		  handleEnter(row){
		    let id = row.id
		    let param = {loginname:row.loginname , password:row.password}
		    let indexPage = this.$router.resolve({ 
		          name: 'controlsystem'
		    })  
		    this.$confirm('是否进入新风系统?', '提示', {
		             confirmButtonText: '确定',
		             cancelButtonText: '取消',
		             type: 'warning'
		           }).then(() => {
		           	 //根据用户跳转主界面
		           	 post('/login',JSON.stringify(param)).then(res=>{
		           	 	if(res.success){
							window.open(indexPage.href, '_blank');
		           	 	}else{
							this.$message.error(res.msg);
		           	 	}
		           	 })

		             
		           }).catch(() => {
		             this.$message({
		               type: 'info',
		               message: '已取消'
		             });          
		           });
		  },
		  handleDelete(row){
		    this.$confirm('确定删除 '+row.username+'吗?','提示',{
		    	confirmButtonText:'确定',
		    	cancelButtonText:'取消',
		    	type:'warning'
		    }).then(()=>{
		    	get('/user/delete/'+row.userid).then(()=>{
		    		this.$message('用户删除成功')
		    		this.query()
		    	})
		    })
		  },
		  handleEnable(row){
		  	let param = {"customerid":row.customerid,"activeflag":row.activeflag==1?2:1}
		  	post('/customer/alter',param).then((data)=>{
		  		this.$message('用户激活状态变更成功')
		  		this.query()
		  	}).catch(err=>{
		  		console.log(err)
		  	})
		  },
		  handleUpdate(row){
		  	this.userUI = true
		  	this.form.userid = row.userid
		  	this.form.username = row.username
		  	this.form.loginname = row.loginname
		  	this.form.password = row.password
		  	this.form.telephone = row.telephone
		  	this.form.period = row.period
		  },
		  submitForm(formName){
		  	let date = JSON.stringify(this.form.period)
		  	let param = (this.form)
		  	param.period = date.substring(1,11)
		  	param.usertype = 2//商业管理用户
		  	param.activeflag=1//激活
		  	this.$refs[formName].validate((valid)=>{
		  		if(valid){
		  			post('/user/save',JSON.stringify(param)).then((res)=>{
		  				this.$message({
  				          message: '操作成功！',
  				          type: 'success'
  				        });
		  			})
		  			this.userUI=false
		  			this.$refs['form'].resetFields();
		  			this.query()
		  		}else{
		  			this.$message.error('错了哦');
		  			return false
		  		}
		  	})
		  }
		}
	}
</script>
<style scoped>
	
</style>