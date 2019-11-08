<template>
	<div>
		<div style="margin-bottom:10px;">
			<span style="text-align:center;font-size:24px;">报错列表</span>
			<div style="float:right;">
				<el-button type="primary"  size="small" @click="fresh()">刷新</el-button>
			</div>
		</div>
		<el-table :data="tableData" style="width:100%" :default-sort="{prop:'cmd_datetime',order:'descending'}">
			<el-table-column prop="cmdid" label="序号" sortable></el-table-column>
			<el-table-column prop="cmd_datetime" label="时间" sortable></el-table-column>
			<el-table-column prop="address" label="设备编号" sortable></el-table-column>
			<el-table-column prop="type" label="设备类型" sortable :formatter="fmtType"></el-table-column>
			<el-table-column prop="containername" label="设备名称" sortable></el-table-column>
			<el-table-column prop="cmd_cat" label="命令" :formatter="fmtCmd" width="400"></el-table-column>
			<el-table-column prop="responsecode" label="原因" :formatter="fmtCode"></el-table-column>
		</el-table>
		<div class="block">
		    <el-pagination
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page="currentPage"
		      :page-sizes="[5,10, 20, 50, 100]"
		      :page-size="size"
		      layout="total, sizes, prev, pager, next, jumper"
		      :total="total">
		    </el-pagination>
		</div>
	</div>
</template>

<script>
import {get,post} from '@/router/axios-cfg'
	export default{
		data(){
			return {
				user:{},
				tableData: [],
				currentPage:0,
				total:0,
				size:10
			}
		},
		created(){
			get('/current').then(res=>{
			      this.user = res.data
			      this.query(0,10)
    		})
			
		},
		methods:{
			fresh(){
				this.query(this.currentPage,this.size)
			},
			query(currentPage,size){
				this.tableData = []
				let customerid = this.user.customer.customerid
				let param = {'page': currentPage,'size': size,'customerid': customerid}
				
				post('/command/query',param).then((res)=>{
					let arr = res.data
					let array = arr.dataList
					for(let i=0;i<array.length;i++){
						let data = {
							cmdid : array[i].cmdid, 
							cmd_datetime : array[i].cmd_datetime,
							address : array[i].address,
							type : array[i].type,
							containername : array[i].containername,
							cmd_cat : array[i].cmd_cat,
							cmd_subcat: array[i].cmd_subcat,
							responsecode : array[i].responsecode
						}
		  				this.tableData.push(data)
		  			}
					this.total = arr.total
				}).catch(err=>{
		  			console.log(err)
		  		})
			},
			handleSizeChange(val) {
		        this.size = val
		        this.query(this.currentPage,val)
		    },
		    handleCurrentChange(val) {
		        this.query(val-1,this.size)
		    },
			fmtType(row,column,cellValue){
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
			},
			fmtCmd(row,column,cellValue){
				let ordertype = ''
				switch(row.cmd_cat){
					case 3:
						switch(row.cmd_subcat){  //判断其小类,判断某种操作
							case 33: 
								ordertype = "风速控制(模式，常规风速，节能风速)";
								break;
							case 34:
								ordertype = "压差控制(压差方向，预设值选定)";break;
							case 35:
								ordertype = "压差控制(通道1、通道2，预设值选定)";break;
							case 80:
								ordertype = "告警开关";break;
							case 81:
								ordertype = "通风柜告警参数设置";break;
							case 82:
								ordertype = "房间压差告警参数设置";break;
							case 83:
								ordertype = "管道静压告警参数设置";break;
							default: break;
						}
						break;
					case 4:
						switch(row.cmd_subcat){  //判断其小类    判断出做了某种操作
							case 0:
								ordertype = "开关机操作";
								break;
							case 1: 
								ordertype = "紧急排风操作";
								break;
							case 2: 
								ordertype = "控制继电器操作";
								break;
							default: break;
						}
						break;
					default: break;
				}
				return ordertype
			},
			fmtCode(row,column,cellValue){
				let responsecode = ''
				switch (row.responsecode){
					case "0":	
						responsecode = "操作成功";
						break;
					case "1":	
						responsecode = "当前设备不支持改AFN";
						break;
					case "2":	
						responsecode = "当前设备不支持改FN";
						break;
					case "3":	
						responsecode = "数据域格式错误";
						break;
					case "4":	
						responsecode = "存储失败";
						break;
					case "5":	
						responsecode = "无权限";
						break;
					case "6":	
						responsecode = "忙（保留）";
						break;
					default: break;
				}
				return responsecode
			}
		}
	}
</script>

<style scoped>
	.block{
		float:right;
		margin-top: 10px;
	}
</style>