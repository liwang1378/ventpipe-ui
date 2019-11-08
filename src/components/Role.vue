<template>
	<el-row>
	  <el-col :span="12">
	  <div class="grid-content">
		<span style="text-align:center;font-size:24px;">角色管理</span>
		<div style="float:right;margin-bottom:10px">
  			<el-button type="primary"  size="small" @click="fresh()">刷新</el-button>
  			<el-button type="primary"  size="small" @click="roleModal()">添加角色</el-button>
  		</div>
	  	<el-table :data="tableData" style="width:100%" :default-sort="{prop:'roleid',order:'descending'}">
	  		<el-table-column prop="roleid" label="编号" sortable ></el-table-column>
	  		<el-table-column prop="rolename" label="角色名称" sortable></el-table-column>
	  		<el-table-column
		      label="操作" width="400">
		      <template slot-scope="scope">
		          <el-button @click="handleUpdate(scope.row)" type="primary" size="small">修改</el-button>
		          <el-button @click="handlePerm(scope.row)" type="primary" size="small">权限</el-button>
		          <el-button @click="handleDelete(scope.row)" type="danger" size="small">删除</el-button>
		      </template>
		    </el-table-column>
	  	</el-table>
	  </div></el-col>
	  <el-col :span="12">
		  <div class="grid-content" style="margin-left:10px;padding:0px;background-color: #fcf8e3;" v-if="flag">
		  	<el-tree
		  	  :data="roleTreeData"
		  	  show-checkbox
		  	  default-expand-all
		  	  node-key="uuid"
		  	  ref="tree"
		  	  highlight-current
		  	  :props="defaultProps">
		  	</el-tree>
		  	<div style="margin:10px auto;">
			  	<el-button type="primary" @click="save">确定</el-button>
	  			<el-button type="info" @click="cancel">取消</el-button>
	  		</div>
		  </div>
	  </el-col>
	  <el-dialog title="添加角色" :visible.sync="roleUI">
	  	<el-form :model="roleForm" :rules="roleRules" ref="roleForm">
	  		<el-input v-model="roleForm.roleid" type="hidden"></el-input>
	  		<el-form-item label="角色名称" :label-width="formLabelWidth" prop="rolename">
	  			<el-input v-model="roleForm.rolename" autocomplete="off"></el-input>
	  		</el-form-item>
	  	</el-form>
	  	<div class="dialog-footer" slot="footer">
	  		<el-button @click="roleUI=false">取消</el-button>
	  		<el-button type="primary" @click="submitRoleForm('roleForm')">确定</el-button>
	  	</div>
	  </el-dialog>
	</el-row>
</template>

<script>
import {get,post} from '@/router/axios-cfg'
	export default{
		data(){
			return{
				user:{},
				roleid:'',
				flag:false,
				roleTreeData:[],
				defaultProps: {
		         children: 'children',
		         label: 'name',
		         uuid:'uuid'
		        },
				roleRules:{
					rolename: [{ required: true, message: '请填写角色名称', trigger: 'blur' }]
				},
				roleUI:false,
				tableData:[],
				roleForm:{
					rolename:''
				},
				formLabelWidth:'120px',
			}
		},
		created(){
			get('/current').then(res=>{
			      this.user = res.data
			      this.fresh()
    		})
		},
		methods:{
			roleModal(){
				this.roleUI = true
				this.roleForm = {}
			},
			save(){
				let checkedArr = this.$refs.tree.getCheckedNodes()
				let param = []
				for(var i=0;i<checkedArr.length;i++){
					let item = {roleid:this.roleid,uuid:checkedArr[i].uuid}
					param.push(item)
				}
				post('/rp/save',JSON.stringify(param)).then(res=>{
					if(res.success){
						this.$message('操作成功！')
						this.flag= false
					}else{
						this.$message.error('错了哦')
					}
				})
			},
			cancel(){
				this.roleTreeData = []
				this.flag = false
			},
			async fresh(){
				let customerid = this.user.customer.customerid
				await get('/role/query/'+customerid).then(res=>{
						this.tableData = res.data
					})
				await get('/building/treeList/'+customerid).then(res=>{
					this.roleTreeData = res.data
				})
			},
			handleUpdate(row){
				this.roleUI = true
				this.roleForm.roleid = row.roleid
				this.roleForm.rolename = row.rolename
			},
			handleDelete(row){
				this.$confirm('确定删除 '+row.rolename+'吗?','提示',{
			    	confirmButtonText:'确定',
			    	cancelButtonText:'取消',
			    	type:'warning'
			    }).then(()=>{
			    	get('/role/delete/'+row.roleid).then(()=>{
			    		this.$message('删除成功！')
			    		this.fresh()
		    		})
			    }).catch((err)=>{
			    	console.log(err)
			    })
			},
			submitRoleForm(formName){
				let param = (this.roleForm)
				param.customerid = this.user.customer.customerid
				this.$refs[formName].validate((valid)=>{
			  		if(valid){
						post('/role/save',JSON.stringify(param)).then((res)=>{
		  				this.$message({
  				          message: '操作成功！',
  				          type: 'success'
  				        });
		  			})
		  				this.roleUI=false
		  				this.$refs[formName].resetFields();
		  				this.fresh()
			  		}else{
						this.$message.error('错了哦');
			  			return false
			  		}
			  		this.fresh()
				})
			},
			handlePerm(row){
				this.flag = true
				this.fresh()
				this.roleid = row.roleid
				let item = []
				get('/rp/queryByRoleid/'+row.roleid).then(res=>{
					let arr = res.data
					for(var i=0;i<arr.length;i++){
						item.push(arr[i].uuid)
					}
					this.$refs.tree.setCheckedKeys(item);
				})
			}
		}
	}
</script>

<style scoped>
  .grid-content {
    border-radius: 4px;
    min-height: 360px;
  }
</style>