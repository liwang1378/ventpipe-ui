<template>
	<div>
		<el-breadcrumb separator-class="el-icon-arrow-right" >
		    <el-breadcrumb-item :to="{ path: '/cs' }">首页</el-breadcrumb-item>
		    <el-breadcrumb-item v-for="(item,index) in breadcrumb" :key="index">{{item.name}}</el-breadcrumb-item>
		</el-breadcrumb>
		<el-row type="flex" class="row-bg" justify="center" style="margin-top:10px">
		  <el-col :span="8"><div class="grid-content left">
		  	<el-row>
		  	  <el-col :span="12"><div class="grid-content bold">机柜类型</div></el-col>
			  <el-col :span="12"><div class="grid-content">房间压差控制器</div></el-col>
		  	</el-row>
		  	<el-row>
		  	  <el-col :span="12"><div class="grid-content bold">机柜编号</div></el-col>
			  <el-col :span="12"><div class="grid-content">A0003</div></el-col>
		  	</el-row>
		  	<el-row>
		  	  <el-col :span="12"><div class="grid-content bold">机柜名称</div></el-col>
			  <el-col :span="12"><div class="grid-content">房间压差控制器</div></el-col>
		  	</el-row>
		  	<el-row>
		  	  <el-col :span="12"><div class="grid-content bold">开机状态</div></el-col>
			  <el-col :span="12"><div class="grid-content">开机在线</div></el-col>
		  	</el-row>
		  	<el-row>
		  	  <el-col :span="12"><div class="grid-content bold">协议版本</div></el-col>
			  <el-col :span="12"><div class="grid-content">V1.2 2019-9-15</div></el-col>
		  	</el-row>
		  	<el-row>
		  	  <el-col :span="12"><div class="grid-content bold">连接状态</div></el-col>
			  <el-col :span="12"><div class="grid-content">未连接</div></el-col>
		  	</el-row>
		  	<el-row>
		  	  <el-col :span="12"><div class="grid-content bold">机柜量程</div></el-col>
			  <el-col :span="12"><div class="grid-content">0.25pa</div></el-col>
		  	</el-row>
		  	<el-row>
		  	  <el-col :span="12"><div class="grid-content bold">压差方向</div></el-col>
			  <el-col :span="12"><div class="grid-content">反</div></el-col>
		  	</el-row>
		  	<el-row>
		  	  <el-col :span="12"><div class="grid-content bold">设定压差</div></el-col>
			  <el-col :span="12"><div class="grid-content">13.0pa</div></el-col>
		  	</el-row>
		  	<el-row>
		  	  <el-col :span="12"><div class="grid-content bold">当前压差</div></el-col>
			  <el-col :span="12"><div class="grid-content">25.0pa</div></el-col>
		  	</el-row>
		  </div></el-col>
		  <el-col :span="8"><div class="grid-content">
		  	<el-image
		  	      style="width: 75%; height: 50%"
		  	      :src="url"
		  	      fit="fill"></el-image>
		  </div></el-col>
		  <el-col :span="8"><div class="grid-content right">
	  	  	<el-row>
	  	  	  <el-col :span="12"><div class="grid-content bold">告警总开关</div></el-col>
	  		  <el-col :span="12"><div class="grid-content">关闭</div></el-col>
	  	  	</el-row>
	  	  	<el-row>
	  	  	  <el-col :span="12"><div class="grid-content bold">压差告警开关</div></el-col>
	  		  <el-col :span="12"><div class="grid-content">关闭</div></el-col>
	  	  	</el-row>
	  	  	<el-row>
	  	  	  <el-col :span="12"><div class="grid-content bold">门开告警开关</div></el-col>
	  		  <el-col :span="12"><div class="grid-content">关闭</div></el-col>
	  	  	</el-row>
	  	  	<el-row>
	  	  	  <el-col :span="12"><div class="grid-content bold">压力过低告警阀值</div></el-col>
	  		  <el-col :span="12"><div class="grid-content">0pa</div></el-col>
	  	  	</el-row>
	  	  	<el-row>
	  	  	  <el-col :span="12"><div class="grid-content bold">压力过高告警阀值</div></el-col>
	  		  <el-col :span="12"><div class="grid-content">0pa</div></el-col>
	  	  	</el-row>
	  	  	<el-row>
	  	  	  <el-col :span="12"><div class="grid-content bold">门开状态</div></el-col>
	  		  <el-col :span="12"><div class="grid-content">关</div></el-col>
	  	  	</el-row>
	  	  	<el-row>
	  	  	  <el-col :span="12"><div class="grid-content bold">紧急升压状态</div></el-col>
	  		  <el-col :span="12"><div class="grid-content">已关闭</div></el-col>
	  	  	</el-row>
	  	  	<el-row>
	  	  	  <el-col :span="12"><div class="grid-content bold">继电器状态1</div></el-col>
	  		  <el-col :span="12"><div class="grid-content">关闭中</div></el-col>
	  	  	</el-row>
	  	  	<el-row>
	  	  	  <el-col :span="12"><div class="grid-content bold">继电器状态2</div></el-col>
	  		  <el-col :span="12"><div class="grid-content">关闭中</div></el-col>
	  	  	</el-row>
		  </div></el-col>
		</el-row>
	</div>
</template>

<script>
import {get,post} from '@/router/axios-cfg'
	export default{
		data(){
			return {
				url: require('@/assets/fumehoodsopenvalve.jpg'),
				breadcrumb:[]
			}
		},
		created(){
		  let uuid = this.$route.query.uuid
		  get('/building/createNavigator/'+uuid).then(res=>{
		    this.breadcrumb = res.data
		  })
		}
	}
</script>

<style scoped>
	.bold{font-weight: bolder}
	.left,.right{
		margin-top: 50px;
	}
	.el-row {
	    margin-bottom: 10px;
	    &:last-child {
	      margin-bottom: 0;
	    }
	  }
	  .el-col {
	    border-radius: 4px;
	  }
	  .grid-content {
	    border-radius: 4px;
	    min-height: 24px;
	  }
	  .row-bg {
	    padding: 10px 0;
	    background-color: #f9fafc;
	  }
</style>