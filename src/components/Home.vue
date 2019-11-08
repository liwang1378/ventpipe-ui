<template>
  <el-container style="height: 600px; border: 1px solid #eee">
    <el-header style="text-align: right; font-size: 12px">
      <b style="float:left">
        <i class="el-icon-office-building"></i>&nbsp;智能通风控制系统
      </b>
      <span><b>{{user.username}},您好！&nbsp;</b></span>
      <el-dropdown>
        <span class="el-dropdown-link">
          系统设置<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item divided><router-link to='/password'>修改密码</router-link></el-dropdown-item>
          <el-dropdown-item divided><span @click="logout">退出登录</span></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <router-link to='/cs'><b><i class="el-icon-s-home">首页</i></b></router-link>
    </el-header>
    <el-container>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {get,post} from '@/router/axios-cfg'
export default {
  name: 'home',
  data () {
    return {
      user:{}
    }
  },
  methods:{
    logout(){
      get('/logout').then(res=>{
        this.$message('退出成功！')
        this.$router.push('/')
      })
    }
  },
  created(){
    get('/current').then(res=>{
      this.user = res.data
    })
  },
  
}
</script>

<style scoped>
.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .el-dropdown-link {
    cursor: pointer;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
