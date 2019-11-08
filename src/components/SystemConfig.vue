<template>
	<div>
	<el-tabs type="border-card">
	  <el-tab-pane label="楼栋/房屋">
	  	<el-tabs type="border-card">
	  		<el-tab-pane label="楼栋">
	  			<div>
		  			<span style="text-align:center;font-size:24px;">楼栋维护</span>
		  			<div style="float:right;margin-bottom:10px">
			  			<el-button type="primary"  size="small" @click="fresh(1)">刷新</el-button>
			  			<el-button type="primary"  size="small" @click="openModal(1)">添加楼栋</el-button>
			  		</div>
			  			<el-table
		  			    :data="buildData"
		  			    border
		  			    style="width: 100%">
		  			    <el-table-column
		  			      prop="houseroomid"
		  			      label="编号">
		  			    </el-table-column>
		  			    <el-table-column
		  			      prop="hsname"
		  			      label="楼栋名称">
		  			    </el-table-column>
		  			    <el-table-column
		  			      prop="address"
		  			      label="地址">
		  			    </el-table-column>
		  			    <el-table-column
		  			      label="操作" width="400">
		  			      <template slot-scope="scope">
		  			          <el-button @click="handleUpdate(scope.row,1)" type="primary" size="small">修改</el-button>
		  			          <el-button @click="handleDelete(scope.row,1)" type="danger" size="small">删除</el-button>
		  			      </template>
		  			    </el-table-column>
		  			</el-table>
	  			</div>
	  		</el-tab-pane>
	  		<el-tab-pane label="房屋">
	  			<div>
		  			<span style="text-align:center;font-size:24px;">房屋维护</span>
		  			<div style="float:right;margin-bottom:10px">
			  			<el-button type="primary"  size="small" @click="fresh(2)">刷新</el-button>
			  			<el-button type="primary"  size="small" @click="openModal(2)">添加房间</el-button>
		  			</div>
		  			<el-table
		  			    :data="roomData"
		  			    border
		  			    style="width: 100%" row-key="houseroomid" default-expand-all :tree-props="{children:'children',hasChildren:'hasChildren'}">
		  			    <el-table-column
		  			      prop="houseroomid"
		  			      label="编号" sortable>
		  			    </el-table-column>
		  			    <el-table-column
		  			      prop="belong"
		  			      label="所属楼栋" sortable>
		  			    </el-table-column>
		  			    <el-table-column
		  			      prop="hsname"
		  			      label="房间名称">
		  			    </el-table-column>
		  			    <el-table-column
		  			      label="操作" width="400">
		  			      <template slot-scope="scope">
		  			      <div v-if="scope.row.type==2">
		  			          <el-button @click="handleUpdate(scope.row,2)" type="primary" size="small">修改</el-button>
		  			          <el-button @click="handleDelete(scope.row,2)" type="danger" size="small">删除</el-button>
		  			      </div>
		  			      </template>
		  			    </el-table-column>
		  			</el-table>
	  			</div>
	  		</el-tab-pane>
	  	</el-tabs>
	  </el-tab-pane>
	  <el-tab-pane label="通风系统">
		<div>
			<span style="text-align:center;font-size:24px;">通风系统维护</span>
			<div style="float:right;margin-bottom:10px">
  			<el-button type="primary"  size="small" @click="fresh(3)">刷新</el-button>
  			<el-button type="primary"  size="small" @click="openModal(3)">添加通风系统</el-button>
  		</div>
  			<el-table
			    :data="pipeData"
			    border
			    style="width: 100%">
			    <el-table-column
			      prop="basesystemid"
			      label="编号">
			    </el-table-column>
			    <el-table-column
			      prop="basename"
			      label="系统名称">
			    </el-table-column>
			    <el-table-column
			      prop="type"
			      label="类型" :formatter="fmtType">
			    </el-table-column>
			    <el-table-column
			      label="操作" width="400">
			      <template slot-scope="scope">
			          <el-button @click="handleUpdate(scope.row,3)" type="primary" size="small">修改</el-button>
			          <el-button @click="handleDelete(scope.row,3)" type="danger" size="small">删除</el-button>
			      </template>
			    </el-table-column>
			</el-table>
		</div>
	  </el-tab-pane>
	  <el-tab-pane label="设备">
		<div>
			<span style="text-align:center;font-size:24px;">设备维护</span>
			<div style="float:right;margin-bottom:10px">
  			<el-button type="primary"  size="small" @click="fresh(4)">刷新</el-button>
  			<el-button type="primary"  size="small" @click="openModal(4)">添加设备</el-button>
  		</div>
  			<el-table
			    :data="deviceData"
			    border
			    style="width: 100%">
			    <el-table-column
			      prop="aircontaierid"
			      label="编号">
			    </el-table-column>
			    <el-table-column
			      prop="status"
			      label="状态" :formatter="fmtStatus">
			    </el-table-column>
			    <el-table-column
			      prop="containername"
			      label="设备名称">
			    </el-table-column>
			    <el-table-column
			      prop="type"
			      label="设备类型" :formatter="fmtDevice">
			    </el-table-column>
			    <el-table-column
			      prop="address"
			      label="设备编号">
			    </el-table-column>
			    <el-table-column
			      label="操作" width="400">
			      <template slot-scope="scope">
			          <el-button @click="handleUpdate(scope.row,4)" type="primary" size="small">修改</el-button>
			          <el-button @click="handleDelete(scope.row,4)" type="danger" size="small">删除</el-button>
			      </template>
			    </el-table-column>
			</el-table>
		</div>
	  </el-tab-pane>
	</el-tabs>
	<!--添加楼栋弹窗-->
	<el-dialog title="添加楼栋" :visible.sync="buildUI">
		<el-form :model="buildForm" :rules="buildRules" ref="buildForm">
			<el-input v-model="buildForm.houseroomid" type="hidden"></el-input>
			<el-form-item label="楼栋名称" :label-width="formLabelWidth" prop="hsname">
				<el-input v-model="buildForm.hsname" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="地址" :label-width="formLabelWidth" prop="address">
				<el-input v-model="buildForm.address" autocomplete="off"></el-input>
			</el-form-item>
		</el-form>
		<div class="dialog-footer" slot="footer">
			<el-button @click="buildUI=false">取消</el-button>
			<el-button type="primary" @click="submitBuildForm('buildForm')">确定</el-button>
		</div>
	</el-dialog>
	<!--添加房间弹窗-->
	<el-dialog title="添加房间" :visible.sync="roomUI">
		<el-form :model="roomForm" :rules="buildRules" ref="roomForm">
			<el-input v-model="roomForm.houseroomid" type="hidden"></el-input>
			<el-form-item label="所属楼栋" :label-width="formLabelWidth" prop="parentid">
				<el-select v-model="roomForm.parentid" placeholder="请选择" style="float:left">
				    <el-option
				      v-for="item in options"
				      :key="item.houseroomid"
				      :label="item.hsname"
				      :value="item.houseroomid">
				    </el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="房间名称" :label-width="formLabelWidth" prop="hsname">
				<el-input v-model="roomForm.hsname" autocomplete="off"></el-input>
			</el-form-item>
		</el-form>
		<div class="dialog-footer" slot="footer">
			<el-button @click="roomUI=false">取消</el-button>
			<el-button type="primary" @click="submitRoomForm('roomForm')">确定</el-button>
		</div>
	</el-dialog>
	<!--添加通风系统弹窗-->
	<el-dialog title="添加通风系统" :visible.sync="pipeUI">
		<el-form :model="pipeForm" :rules="pipeRules" ref="pipeForm">
			<el-input v-model="pipeForm.basesystemid" type="hidden"></el-input>
			<el-form-item label="系统类型" :label-width="formLabelWidth" prop="type">
				<el-radio-group v-model="pipeForm.type">
				  <el-radio :label="1">新风系统</el-radio>
				  <el-radio :label="2">排风系统</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="系统名称" :label-width="formLabelWidth" prop="basename">
				<el-input v-model="pipeForm.basename" autocomplete="off"></el-input>
			</el-form-item>
		</el-form>
		<div class="dialog-footer" slot="footer">
			<el-button @click="pipeUI=false">取消</el-button>
			<el-button type="primary" @click="submitForm('pipeForm')">确定</el-button>
		</div>
	</el-dialog>
	<!--添加设备弹窗-->
	<el-dialog title="添加设备" :visible.sync="deviceUI">
		<el-form :model="deviceForm" :rules="deviceRules" ref="deviceForm">
			<el-input v-model="deviceForm.aircontaierid" type="hidden"></el-input>
			<el-form-item label="设备类型" :label-width="formLabelWidth" prop="type">
				<el-radio-group v-model="deviceForm.type">
				  <el-radio :label="0">通风柜</el-radio>
				  <el-radio :label="1">房间压差</el-radio>
				  <el-radio :label="2">管道静压</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="设备名称" :label-width="formLabelWidth" prop="containername">
				<el-input v-model="deviceForm.containername" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="设备编号" :label-width="formLabelWidth" prop="address">
				<el-input v-model="deviceForm.address" autocomplete="off"></el-input>
			</el-form-item>
		</el-form>
		<div class="dialog-footer" slot="footer">
			<el-button @click="deviceUI=false">取消</el-button>
			<el-button type="primary" @click="submitForm('deviceForm')">确定</el-button>
		</div>
	</el-dialog>
	</div>
</template>

<script>
import {get,post} from '@/router/axios-cfg'
	export default{
		data(){
			return{
				user:{},
				deviceUI:false,
				deviceForm:{
					type:'',
					containername:'',
					address:''
				},
				pipeUI:false,
				pipeForm:{
					type:'',
					basename:''
				},
				roomUI:false,
				roomForm:{
					parentid:null,
					hsname:''
				},
				options: [],
				buildUI:false,
				formLabelWidth:'120px',
				buildForm:{
					hsname:'',
					address:'',
					// customerid:this.user.customer.customerid
				},
				deviceRules:{
					type: [{ required: true, message: '请选择设备类型', trigger: 'blur' }],
					containername:[{required:true,message:'请输入设备名称',trigger:blur}],
					address:[{required:true,message:'请输入设备编号',trigger:blur}],
				},
				pipeRules:{
					type: [{ required: true, message: '请选择系统类型', trigger: 'blur' }],
					basename:[{required:true,message:'请输入系统名称',trigger:blur}],
				},
				buildRules:{
					hsname:[{required:true,message:'请输入名称',trigger:blur}],
					parentid: [{required: true, message: '请选择所属楼栋', trigger: 'blur'}],
				},
				pipeData:[],
				deviceData:[],
				buildData:[],
				roomData:[]
			}
		},
		created(){
			this.query(1)
			this.query(2)
			this.query(3)
			this.query(4)
		    get('/current').then(res=>{
  				this.user = res.data
			})

		},
		methods:{
			openModal(type){
				switch(type){
					case 1:
						this.buildUI = true;this.buildForm = {};break
					case 2:
						this.roomUI = true;this.roomForm = {};break
					case 3:
						this.pipeUI = true;this.pipeForm = {};break
					case 4:
						this.deviceUI = true;this.deviceForm = {};break
				}
			},
			fresh(type){
				this.query(type)
			},
			async query(type){
				if(type==3){
					await get('/bs/query').then(res=>{
						this.pipeData = res.data
					})
				}else if(type==4){
					await get('/ac/query').then(res=>{
						this.deviceData = res.data
					})
				}else{
					//初始化所属楼栋
					if(type==2){
						await get('/hs/query/1').then(res=>{
							this.options = res.data
						})
					}
					await get('/hs/query/'+type).then(res=>{
						if(type==1){
							this.buildData = res.data
						}
						else if(type==2){
							this.roomData =res.data
						}
					})
				}

			},
			submitBuildForm(formName){
				let param = (this.buildForm)
				param.type = 1
				param.customerid = this.user.customer.customerid
				this.$refs[formName].validate((valid)=>{
			  		if(valid){
						post('/hs/save',JSON.stringify(param)).then((res)=>{
		  				this.$message({
  				          message: '操作成功！',
  				          type: 'success'
  				        });
		  			})
		  			this.buildUI=false
		  			this.$refs[formName].resetFields();
		  			this.buildForm = {}
			  		}else{
						this.$message.error('错了哦');
			  			return false
			  		}
			  		this.query(1)
				})
			},
			handleUpdate(row,type){
				if(type==1){//楼栋
					this.buildUI = true
					this.buildForm.houseroomid = row.houseroomid
					this.buildForm.hsname = row.hsname
					this.buildForm.address = row.address
				}else if(type==2){
					this.roomUI = true
					this.roomForm.houseroomid = row.houseroomid
					this.roomForm.hsname = row.hsname
					this.roomForm.parentid = row.parentid
				}else if(type ==3){
					this.pipeUI = true
					this.pipeForm.basesystemid = row.basesystemid
					this.pipeForm.basename = row.basename
					this.pipeForm.type = row.type
				}else if(type==4){
					this.deviceUI = true
					this.deviceForm.aircontaierid = row.aircontaierid
					this.deviceForm.address = row.address
					this.deviceForm.containername = row.containername
					this.deviceForm.type = row.type
				}
			},
			handleDelete(row,type){
				let message = ''
				let url = ''
				if(type==1||type==2){
					message = '确定删除 '+row.hsname+'吗?'
					url = '/hs/delete/'+row.houseroomid
				}else if(type==3){
					message = '确定删除 '+row.basename+'吗?'
					url = '/bs/delete/'+row.basesystemid
				}else if(type==4){
					message = '确定删除 '+row.containername+'吗?'
					url = '/ac/delete/'+row.aircontaierid
				}

				this.$confirm(message,'提示',{
			    	confirmButtonText:'确定',
			    	cancelButtonText:'取消',
			    	type:'warning'
			    }).then(()=>{
			    	get(url).then(()=>{
			    		this.$message('删除成功！')
			    		this.query(type)
		    		})
			    })
			},
			submitRoomForm(formName){
				let param = (this.roomForm)
				param.type = 2
				param.customerid = this.user.customer.customerid
				this.$refs[formName].validate((valid)=>{
			  		if(valid){
						post('/hs/save',JSON.stringify(param)).then((res)=>{
		  				this.$message({
  				          message: '操作成功！',
  				          type: 'success'
  				        });
  				        this.query(2)
		  			})
		  			this.roomUI=false
		  			this.$refs[formName].resetFields();
			  		}else{
						this.$message.error('错了哦');
			  			return false
			  		}
			  		this.query(2)
				})
			},
			submitForm(formName){
				let param = this.pipeForm
				param.customerid = this.user.customer.customerid
				let deviceParam = this.deviceForm
				deviceParam.customerid = this.user.customer.customerid
				deviceParam.status = 0
				let url = ''
				let params = {}
				if(formName == 'pipeForm'){
					url = '/bs/save'
					params = JSON.stringify(param)
				}else{
					url = '/ac/save'
					params = JSON.stringify(deviceParam)
				}
				// params.customerid = this.user.customer.customerid
				this.$refs[formName].validate((valid)=>{
					if(valid){
						post(url,params).then((res)=>{
							this.$message({message:'操作成功',type:'success'})
							this.query(3)
							this.query(4)
						})
						this.pipeUI=false
						this.deviceUI=false
						this.pipeForm = {}
						this.deviceForm = {}
						this.$refs[formName].resetFields();
					}else{
						this.$message.error('错了哦')
						return false
					}
					this.query(3)
					this.query(4)
				})
			},
			fmtType(row,column,cellValue,index){
		  	return cellValue==1?<el-tag type="success">新风系统</el-tag>:<el-tag type="danger">排风系统</el-tag>
		    },
		    fmtStatus(row,column,cellValue,index){
		    	//机柜状态(0 设备正常 1 设备故障 2 离线状态)
		    	switch(cellValue){
		    		case 0:
						return <el-tag type="success">设备正常</el-tag>
						break
					case 1:
						return <el-tag type="danger">设备故障</el-tag>
						break
					case 2:
						return <el-tag type="warning">离线状态</el-tag>
						break
		    	}
		    },
		    fmtDevice(row,column,cellValue,index){
		    	//机柜类型(0.通风柜风速控制器 1.房间压差控制器 2.管道静压控制器)
		    	switch(cellValue){
		    		case 0:
						return <el-tag type="success">通风柜</el-tag>
						break
					case 1:
						return <el-tag type="info">房间压差</el-tag>
						break
					case 2:
						return <el-tag>管道静压</el-tag>
						break
		    	}
		    }
		}
	}
</script>

<style scoped>
	
</style>