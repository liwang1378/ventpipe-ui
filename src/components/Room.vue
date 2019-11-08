<template>
	<div>
		<el-breadcrumb separator-class="el-icon-arrow-right" >
		    <el-breadcrumb-item :to="{ path: '/cs' }">首页</el-breadcrumb-item>
		    <el-breadcrumb-item v-for="(item,index) in breadcrumb" :key="index">{{item.name}}</el-breadcrumb-item>
		</el-breadcrumb>
	  	<!--房间-->
	    <el-card class="box-card" style="margin-top:10px;background-color:pink">
	  	<div slot="header" class="clearfix" >
		    <span>101</span>
		    <el-button style="padding: 5px " type="danger">关闭</el-button>
	  	</div>
	  	<div>
	  		<el-row type="flex" class="row-bg">
	  		  <el-col><div class="grid-content bg-purple">房间压差控制器</div></el-col>
	  		</el-row>
	  		<el-row type="flex" class="row-bg">
	  		  <el-col :span="6"><div class="grid-content bg-purple">设备编号</div></el-col>
			      <el-col :span="6"><div class="grid-content bg-purple-light">004</div></el-col>
			      <el-col :span="6"><div class="grid-content bg-purple">连接状态</div></el-col>
			      <el-col :span="6"><div class="grid-content bg-purple">未连接</div></el-col>
	  		</el-row>
	  		<el-row type="flex" class="row-bg">
	  		  <el-col :span="6"><div class="grid-content bg-purple">压差方向</div></el-col>
			      <el-col :span="6"><div class="grid-content bg-purple-light">负</div></el-col>
			      <el-col :span="6"><div class="grid-content bg-purple">门开状态</div></el-col>
			      <el-col :span="6"><div class="grid-content bg-purple">关闭</div></el-col>
	  		</el-row>
	  		<el-row type="flex" class="row-bg">
	  		  <el-col :span="6"><div class="grid-content bg-purple">设定压差</div></el-col>
			      <el-col :span="6"><div class="grid-content bg-purple-light">13.0pa</div></el-col>
			      <el-col :span="6"><div class="grid-content bg-purple">当前压差</div></el-col>
			      <el-col :span="6"><div class="grid-content bg-purple">25.0pa</div></el-col>
	  		</el-row>
	  		
	  		<el-row type="flex" class="row-bg">
	  		  <el-col :span="4"><div class="grid-content bg-purple">
	  		  	<el-button type="primary">一键升压</el-button>
	  		  </div></el-col>
			      <el-col :span="4"><div class="grid-content bg-purple-light">
			      	<el-button type="info">关机</el-button>
			      </div></el-col>
			      <el-col :span="4"><div class="grid-content bg-purple">
			      	<el-button type="success">参数设置</el-button>
			      </div></el-col>
	  		</el-row>
	  	</div>
	  	</el-card>
	</div>
</template>

<script>
import {get,post} from '@/router/axios-cfg'
	export default{
		data(){
			return {
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
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
  
}
.clearfix:after {
  clear: both
}

.el-row {
  margin-bottom: 5px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
}
.row-bg {
  padding: 10px 0;
}
</style>