<template>
	<div>
    <el-dialog title="参数配置" :visible.sync="modalFlag" width="50%">
      <ParamModal @childFn="closeModal"/>
    </el-dialog>
  <el-breadcrumb separator-class="el-icon-arrow-right" >
      <el-breadcrumb-item :to="{ path: '/cs' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item,index) in breadcrumb" :key="index">{{item.name}}</el-breadcrumb-item>
  </el-breadcrumb>
	<el-card class="box-card" style="margin-top:10px;">
	  <div slot="header" class="clearfix">
	    <span>一号新风系统</span>
	    <el-button style="padding: 5px" type="danger" @click="closeWind1">关闭</el-button>
	  </div>
  	  <div>
  		<el-row type="flex" class="row-bg">
  		  <el-col><div class="grid-content bg-purple">管道静压控制器</div></el-col>
  		</el-row>
  		<el-row type="flex" class="row-bg">
  		  <el-col :span="6"><div class="grid-content bg-purple">设备编号</div></el-col>
	      <el-col :span="6"><div class="grid-content bg-purple-light">004</div></el-col>
	      <el-col :span="6"><div class="grid-content bg-purple">连接状态</div></el-col>
	      <el-col :span="6"><div class="grid-content bg-purple">未连接</div></el-col>
  		</el-row>
  		<el-row type="flex" class="row-bg">
  		  <el-col :span="6"><div class="grid-content bg-purple">管道1设定压差</div></el-col>
	      <el-col :span="6"><div class="grid-content bg-purple-light">004</div></el-col>
	      <el-col :span="6"><div class="grid-content bg-purple">连接状态</div></el-col>
	      <el-col :span="6"><div class="grid-content bg-purple">未连接</div></el-col>
  		</el-row>
  		<el-row type="flex" class="row-bg">
  		  <el-col :span="6"><div class="grid-content bg-purple">管道1当前压差</div></el-col>
	      <el-col :span="6"><div class="grid-content bg-purple-light">004</div></el-col>
	      <el-col :span="6"><div class="grid-content bg-purple">连接状态</div></el-col>
	      <el-col :span="6"><div class="grid-content bg-purple">未连接</div></el-col>
  		</el-row>
  		
  		<el-row type="flex" class="row-bg">
  		  <el-col :span="4"><div class="grid-content bg-purple">
  		  	<el-button type="primary" @click="send">一键升压1</el-button>
  		  </div></el-col>
	      <el-col :span="4"><div class="grid-content bg-purple-light">
	      	<el-button type="info" @click="send">关机1</el-button>
	      </div></el-col>
	      <el-col :span="4"><div class="grid-content bg-purple">
	      	<el-button type="warning" @click="send">一键升压2</el-button>
	      </div></el-col>
	      <el-col :span="4"><div class="grid-content bg-purple">
	      	<el-button type="danger" @click="send">关机2</el-button>
	      </div></el-col>
	      <el-col :span="4"><div class="grid-content bg-purple">
	      	<el-button type="success" @click="modalFlag=true">参数设置</el-button>
	      </div></el-col>
  		</el-row>
  	</div>
  	<!--房间-->
    <el-card class="box-card" style="margin-top:10px;background-color:pink">
  	<div slot="header" class="clearfix" >
	    <span>101</span>
	    <el-button style="padding: 5px " type="danger" @click="closeRoom">关闭</el-button>
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
  		  <el-col :span="6"><div class="grid-content bg-purple">管道1当前压差</div></el-col>
		      <el-col :span="6"><div class="grid-content bg-purple-light">004</div></el-col>
		      <el-col :span="6"><div class="grid-content bg-purple">连接状态</div></el-col>
		      <el-col :span="6"><div class="grid-content bg-purple">未连接</div></el-col>
  		</el-row>
  		
  		<el-row type="flex" class="row-bg">
  		  <el-col :span="4"><div class="grid-content bg-purple">
  		  	<el-button type="primary" @click="send">一键升压1</el-button>
  		  </div></el-col>
		      <el-col :span="4"><div class="grid-content bg-purple-light">
		      	<el-button type="info" @click="send">关机1</el-button>
		      </div></el-col>
		      <el-col :span="4"><div class="grid-content bg-purple">
		      	<el-button type="warning" @click="send">一键升压2</el-button>
		      </div></el-col>
		      <el-col :span="4"><div class="grid-content bg-purple">
		      	<el-button type="danger" @click="send">关机2</el-button>
		      </div></el-col>
		      <el-col :span="4"><div class="grid-content bg-purple">
		      	<el-button type="success" @click="modalFlag=true">参数设置</el-button>
		      </div></el-col>
  		</el-row>
  	</div>
  	</el-card>
	</el-card>
	</div>
</template>

<script>
import {get,post} from '@/router/axios-cfg'
import ParamModal from './modules/Param'
	export default{
		data(){
			return {
        modalFlag:false,
        breadcrumb:[]
			}
		},
    components:{
      ParamModal
    },
    created(){
      let uuid = this.$route.query.uuid
      get('/building/createNavigator/'+uuid).then(res=>{
        this.breadcrumb = res.data
      })
    },
    methods:{
      closeModal(e){
        let type = e==0?'warning':'success'
        let msg = e==0?'参数配置取消':'参数配置成功'
        this.$message({message:msg , type: type});
        this.modalFlag = false
      },
      closeWind1(){
        this.$message({message: '恭喜! 新风系统指令发送成功',type: 'success'});
      },
      closeRoom(){
        this.$message({message: '恭喜! 房间指令发送成功',type: 'success'});
      },
      send(){
        this.$message({message: '恭喜! 命令发送成功',type: 'success'});
      },
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