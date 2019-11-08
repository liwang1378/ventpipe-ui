<template>
	<div>
		<el-row type="flex" class="row-bg" justify="center">
		  <el-col :span="12"><div class="grid-content bg-purple">
		  	<el-table :data="tableData" style="width:100%" :default-sort="{prop:'date',order:'descending'}">
		  		<el-table-column prop="date" label="时间" sortable width="240"></el-table-column>
		  		<el-table-column prop="name" label="告警详情" sortable width="100"></el-table-column>
		  		<el-table-column prop="address" label="机柜位置" width="280" :formatter="formatter"></el-table-column>
		  		<el-table-column prop="detail" label="操作" width="80"></el-table-column>
		  	</el-table>
		  </div></el-col>
		  <el-col :span="12"><div class="grid-content bg-purple-light" style="margin-left:10px;padding:0px;background-color: #fcf8e3;">
		  	<el-collapse v-model="activeNames" @change="handleChange" style="background-color: #fcf8e3;">
		  		<el-collapse-item  name="1" >
		  		<template slot="title">
		  			<span style="color:blue;">设备运行状况</span>&nbsp;<i class="header-icon el-icon-info"></i>
		  		</template>
		  			<div id="main" style="width:100%;height:400px;"></div>
		  		</el-collapse-item>
		  		<el-collapse-item title="总系统状态" name="2">
		  			<div>
			  			<el-badge :value="15" class="item">
			  			  <el-button size="small">总控制器</el-button>
			  			</el-badge>
			  			<el-badge :value="12" class="item" type="primary">
			  			  <el-button size="small">正常系统</el-button>
			  			</el-badge>
			  			<el-badge :value="3" class="item" type="warning">
			  			  <el-button size="small">故障系统</el-button>
			  			</el-badge>
		  			</div>
		  			
		  		</el-collapse-item>
		  		<el-collapse-item title="总系统参数设置" name="3">
		  			<div>
		  				<el-row type="flex" class="row-bg" justify="space-around">
		  				  <el-col :span="6"><el-button class="item" type="primary" @click="wind1()">新风系统</el-button></el-col>
		  				  <el-col :span="6"><el-button class="item" type="success" @click="wind2()">排风系统</el-button></el-col>
		  				  <el-col :span="6"><el-button class="item" type="info" @click="vent()">通风柜</el-button></el-col>
		  				</el-row>
		  				<el-row type="flex" class="row-bg" justify="space-around">
		  				  <el-col :span="6"><el-button class="item" type="warning">其他信息</el-button></el-col>
		  				  <el-col :span="6"><el-button class="item" type="danger" @click="stop">一键停车</el-button></el-col>
		  				  <el-col :span="6"><el-button class="item" type="danger"@click="start">一键启动</el-button></el-col>
		  				</el-row>
		  			</div>
		  		</el-collapse-item>
		  	</el-collapse>
		  </div></el-col>
		</el-row>
		<!--弹窗-->		
		<el-dialog :title="modalTitle" :visible.sync="dialogVisible" :destroy-on-close="true">
			<el-row>
				<el-col :span="12">
					<el-form :model="form" size="mini">
						<el-form-item label="管道静压总开关" :label-width="formLabelWidth">
							<el-radio v-model="form.main" label="1">开启</el-radio>
							<el-radio v-model="form.main" label="2">关闭</el-radio>
						</el-form-item>
						<el-form-item label="管道1告警开关" :label-width="formLabelWidth">
							<el-radio v-model="form.switch1" label="1">开启</el-radio>
							<el-radio v-model="form.switch1" label="2">关闭</el-radio>
						</el-form-item>
						<el-form-item label="管道2告警开关" :label-width="formLabelWidth">
							<el-radio v-model="form.switch2" label="1">开启</el-radio>
							<el-radio v-model="form.switch2" label="2">关闭</el-radio>
						</el-form-item>
						<el-form-item label="管道1压力过低阀值" :label-width="formLabelWidth">
							<el-input v-model="form.pipe1Low" autocomplete="off" size="medium" style="width:100px;"></el-input>（pa）
						</el-form-item>
						<el-form-item label="管道1压力过高阀值" :label-width="formLabelWidth">
							<el-input v-model="form.pipe1High" autocomplete="off" size="medium" style="width:100px;"></el-input>（pa）
						</el-form-item>
						<el-form-item label="管道2压力过低阀值" :label-width="formLabelWidth">
							<el-input v-model="form.pipe2Low" autocomplete="off" size="medium" style="width:100px;"></el-input>（pa）
						</el-form-item>
						<el-form-item label="管道2压力过高阀值" :label-width="formLabelWidth">
							<el-input v-model="form.pipe2High" autocomplete="off" size="medium" style="width:100px;"></el-input>（pa）
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="12">
					<div class="grid-content" style="margin-left:10px;padding:0px;background-color: #fcf8e3;">
						<el-tree
						  :data="treeData"
						  show-checkbox
						  default-expand-all
						  node-key="uuid"
						  ref="tree"
						  highlight-current
						  :props="defaultProps">
						</el-tree>
					</div>
				</el-col>
			</el-row>
			<div slot="footer" class="dialog-footer">
			  <el-button @click="dialogVisible = false">取 消</el-button>
			  <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import echarts from "echarts";
import {get,post} from '@/router/axios-cfg'
	export default{
		data(){
			return{
				user:{},
				treeData:[],
				defaultProps: {
		         children: 'children',
		         label: 'name',
		         uuid:'uuid'
		        },
				formLabelWidth: '150px',
				form:{
					main:'',
					switch1:'',
					switch2:'',
					pipe1Low:'',
					pipe1High:'',
					pipe2Low:'',
					pipe2High:''
				},
				dialogVisible:false,
				modalTitle:'',
				activeNames: ['1','2','3'],
				tableData: [{
		          date: '2018年07月19日 05:30:48 星期一',
		          name: '设备告警',
		          address: '一号楼一号新风101-102通风柜',
		          detail: '详情操作'
		        },{
		          date: '2018年07月29日 14:30:48 星期三',
		          name: '设备故障',
		          address: '二号楼一号排风101-102通风柜',
		          detail: '详情操作'
		        },{
		          date: '2018年08月19日 13:30:48 星期四',
		          name: '设备告警',
		          address: '一号楼一号排风101-102通风柜',
		          detail: '详情操作'
		        },{
		          date: '2018年09月19日 23:30:48 星期五',
		          name: '设备故障',
		          address: '二号楼一号新风101-102通风柜',
		          detail: '详情操作'
		        },{
		          date: '2019年01月18日 20:30:48 星期六',
		          name: '设备告警',
		          address: '一号楼二号排风101-102通风柜',
		          detail: '详情操作'
		        },{
		          date: '2019年04月11日 00:30:48 星期二',
		          name: '设备故障',
		          address: '二号楼一号排风101-102通风柜',
		          detail: '详情操作'
		        },{
		          date: '2019年05月19日 06:30:48 星期四',
		          name: '设备告警',
		          address: '一号楼二号排风101-102通风柜',
		          detail: '详情操作'
		        },{
		          date: '2019年06月20日 05:30:48 星期一',
		          name: '设备故障',
		          address: '一号楼二号排风101-102通风柜',
		          detail: '详情操作'
		        },{
		          date: '2019年08月22日 15:30:48 星期四',
		          name: '设备中断',
		          address: '二号楼三号排风101-102通风柜',
		          detail: '详情操作'
		        },,{
		          date: '2019年08月24日 15:30:48 星期六',
		          name: '设备中断',
		          address: '二号楼三号排风101-102通风柜',
		          detail: '详情操作'
		        },,{
		          date: '2019年09月02日 15:30:48 星期三',
		          name: '设备中断',
		          address: '二号楼三号排风101-102通风柜',
		          detail: '详情操作'
		        },,{
		          date: '2019年10月12日 15:30:48 星期一',
		          name: '设备中断',
		          address: '二号楼三号排风101-102通风柜',
		          detail: '详情操作'
		        } ,,{
		          date: '2019年11月01日 15:30:48 星期四',
		          name: '设备中断',
		          address: '二号楼三号排风101-102通风柜',
		          detail: '详情操作'
		        },,{
		          date: '2019年11月02日 15:30:48 星期二',
		          name: '设备中断',
		          address: '二号楼三号排风101-102通风柜',
		          detail: '详情操作'
		        },,{
		          date: '2019年11月03日 15:30:48 星期天',
		          name: '设备中断',
		          address: '二号楼三号排风101-102通风柜',
		          detail: '详情操作'
		        }],
		        charts:'',
		        opinion:['管道静压控制器','房间压差控制器','通风柜'],
		        opinionData:[{value:5,name:'管道静压控制器'},{value:8,name:'房间压差控制器'},{value:4,name:'通风柜'}]
			}
		},
		methods:{
			start(){
				this.$confirm('一键启动所有系统, 是否继续?', '提示', {
				          confirmButtonText: '确定',
				          cancelButtonText: '取消',
				          type: 'warning'
				        }).then(() => {
				          this.$message({
				            type: 'success',
				            message: '启动成功!'
				          });
				        }).catch(() => {
				          this.$message({
				            type: 'info',
				            message: '已取消'
				          });          
				        });
			},
			stop(){
				this.$confirm('一键关闭所有系统, 是否继续?', '提示', {
				          confirmButtonText: '确定',
				          cancelButtonText: '取消',
				          type: 'warning'
				        }).then(() => {
				          this.$message({
				            type: 'success',
				            message: '关闭成功!'
				          });
				        }).catch(() => {
				          this.$message({
				            type: 'info',
				            message: '已取消'
				          });          
				        });
			},
			wind1(){
				this.dialogVisible = true
				this.modalTitle = '新风系统管道静压参数设置'
			},
			wind2(){
				this.dialogVisible = true
				this.modalTitle = '排风系统管道静压参数设置'
			},
			vent(){
				this.dialogVisible = true
				this.modalTitle = '通风柜系统管道静压参数设置'
			},
			formatter(row,column){
				return row.address
			},
			handleChange(val){
			},
			drawPie(id){
				this.charts = echarts.init(document.getElementById(id))
				this.charts.setOption({
					title:{
						text: '系统机柜类型总数',
						x:'center'
					},
					tooltip:{
						trigger:'item',
						formatter:"{a} <br>{b} : {c} ({d}%)"
					},
					legend:{
						orient:'vertical',
						x:'left',
						data:this.opinion
					},
					series:[{
						name:'机柜名称',
						type:'pie',
						radius:'55%',
						center:['40%','50%'],
						data:this.opinionData,
						itemStyle:{
							emphasis:{
								shadowBlur:10,
								shadowOffsetX:0,
								shadowColor:'rgba(0,0,0,0.5)'
							}
						}
					}]
					
				})
			},
			getTreeData(){
				let customerid = this.user.customer.customerid
				get('/building/treeList/'+customerid).then(res=>{
					this.treeData = res.data
				})
			}
		},
		created(){
			get('/current').then(res=>{
			      this.user = res.data
			      this.getTreeData()
    		})
		},
		mounted(){
			this.$nextTick(function(){
				this.drawPie('main')
			})
		}
	}
</script>

<style scoped>
	.item {
	  margin-top: 10px;
	  margin-right: 40px;
	}
	.grid-content {
	  border-radius: 4px;
	  min-height: 360px;
	}
	.el-row {
	    margin-bottom: 20px;
	    &:last-child {
	      margin-bottom: 0;
	    }
	  }
    .el-col {
    	border-radius: 4px;
    }
    .bg-purple-dark {
    	background: #99a9bf;
    }
    .bg-purple {
      background: #d3dce6;
    }
    .bg-purple-light {
      background: #e5e9f2;
    }
    .grid-content {
      border-radius: 4px;
      min-height: 500px;
    }
    .row-bg {
      padding: 0;
      background-color: #f9fafc;
    }
</style>