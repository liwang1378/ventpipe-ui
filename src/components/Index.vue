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
          <el-dropdown-item><router-link to='/role'>角色管理</router-link></el-dropdown-item>
          <el-dropdown-item><router-link to='/cmd'>报错列表</router-link></el-dropdown-item>
          <el-dropdown-item><router-link to='/user'>用户管理</router-link></el-dropdown-item>
          <el-dropdown-item><router-link to='/config'>基础数据</router-link></el-dropdown-item>
          <el-dropdown-item divided><router-link to='/password'>修改密码</router-link></el-dropdown-item>
          <el-dropdown-item divided><span @click="logout">退出登录</span></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <router-link to='/cs'><b><i class="el-icon-s-home">首页</i></b></router-link>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-row type="flex" style="margin-bottom:5px;font-size:16px;cursor:pointer;">
           <el-col :span="6"><i class="el-icon-circle-plus-outline" @click="add"></i></el-col>
           <el-col :span="6"><i class="el-icon-remove-outline" @click="deleteNode"></i></el-col>
           <el-col :span="6"><i class="el-icon-edit-outline" @click="edit"></i></el-col>
           <el-col :span="6"><i class="el-icon-refresh" @click="fresh"></i></el-col>
        </el-row>
        <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
        <el-tree highlight-current class="filter-tree" :data="treeData" :props="defaultProps" default-expand-all :filter-node-method="filterNode" ref="tree" 
        @node-click="handleNodeClick"></el-tree>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
    <el-dialog title="添加楼栋" :visible.sync="buildUI">
      <el-form :model="form" :rules="rules" ref="form">
        <el-input v-model="form.uuid" type="hidden"></el-input>
        <el-form-item label="添加楼栋" :label-width="formLabelWidth" prop="code">
          <el-select v-model="form.code" placeholder="请选择" value-key="houseroomid">
              <el-option
                v-for="(item,index) in buildingData"
                :key="item.houseroomid"
                :label="item.hsname"
                :value="{houseroomid:item.houseroomid,hsname:item.hsname}">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="选择位置" :label-width="formLabelWidth" prop="orderseq">
          <el-select v-model="form.orderseq" placeholder="请选择">
              <el-option
                v-for="item in buildingData"
                :key="item.houseroomid"
                :label="item.hsname"
                :value="item.houseroomid">
              </el-option>
            </el-select>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="buildUI=false">取消</el-button>
        <el-button type="primary" @click="submitForm('form')">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加新风/排风系统" :visible.sync="ventUI">
      <el-form :model="ventForm" :rules="ventRules" ref="ventForm">
      <el-row type="flex">
        <el-col :span="12">
          <el-form-item label="系统类型" :label-width="formLabelWidth" prop="type">
            <el-select v-model="ventForm.type" placeholder="请选择" value-key="value" @change="handlerType">
                <el-option
                  v-for="(item,index) in ventType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
          </el-form-item>
          </el-col><el-col :span="12">
          <el-form-item label="选择位置" :label-width="formLabelWidth" prop="orderseq">
            <el-select v-model="ventForm.orderseq" placeholder="请选择">
                <el-option label="--默认最上--" :value="0"></el-option>
                <el-option
                  v-for="item in positionData"
                  :key="item.uuid"
                  :label="item.name"
                  :value="item.uuid">
                </el-option>
              </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" v-if="isSelect">
        <el-col :span="12"><div>
          <el-form-item label="选择系统" :label-width="formLabelWidth" prop="code">
            <el-select v-model="ventForm.code" placeholder="请选择" value-key="basesystemid">
                <el-option
                  v-for="(item,index) in sysData"
                  :key="item.basesystemid"
                  :label="item.basename"
                  :value="{basesystemid:item.basesystemid,basename:item.basename}">
                </el-option>
              </el-select>
          </el-form-item>
        </div></el-col>
      </el-row>
      <el-input v-model="ventForm.uuid" type="hidden"></el-input>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="ventUI=false">取消</el-button>
        <el-button type="primary" @click="submitForm('ventForm')">确定</el-button>
      </div>
    </el-dialog>
    <!--编辑-->
    <el-dialog title="编辑" :visible.sync="editUI">
      <el-form :model="editForm" :rules="editRules" ref="editForm">
        <el-input v-model="editForm.uuid" type="hidden"></el-input>
        <el-form-item label="选择位置" :label-width="formLabelWidth" prop="orderseq">
          <el-select v-model="editForm.orderseq" placeholder="请选择">
              <el-option label="--默认最上--" :value="0"></el-option>
              <el-option
                v-for="item in editData"
                :key="item.uuid"
                :label="item.name"
                :value="item.uuid">
              </el-option>
            </el-select>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="editUI=false">取消</el-button>
        <el-button type="primary" @click="submitForm('editForm')">确定</el-button>
      </div>
    </el-dialog>
    <!--添加控制器-->
    <el-dialog title="添加控制器" :visible.sync="windUI">
      <el-form :model="windForm" :rules="windRules" ref="windForm">
      <el-row type="flex">
        <el-col :span="12">
          <el-form-item label="选择类型" :label-width="formLabelWidth" prop="type">
            <el-select v-model="windForm.type" placeholder="请选择" value-key="value" @change="handlerWindType">
                <el-option
                  v-for="(item,index) in windType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
          </el-form-item>
          </el-col><el-col :span="12">
          <el-form-item label="选择位置" :label-width="formLabelWidth" prop="orderseq">
            <el-select v-model="windForm.orderseq" placeholder="请选择">
                <el-option label="--默认最上--" :value="0"></el-option>
                <el-option
                  v-for="item in positionData"
                  :key="item.uuid"
                  :label="item.name"
                  :value="item.uuid">
                </el-option>
              </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" v-if="isWindSelect">
        <el-col :span="12"><div>
          <el-form-item :label="windSystemLabel" :label-width="formLabelWidth" prop="code">
            <el-select v-model="windForm.code" placeholder="请选择" value-key="code">
                <el-option
                  v-for="(item,index) in windData"
                  :key="item.id"
                  :label="item.name"
                  :value="{code:item.id,name:item.name}">
                </el-option>
              </el-select>
          </el-form-item>
        </div></el-col>
      </el-row>
      <el-input v-model="windForm.uuid" type="hidden"></el-input>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="windUI=false">取消</el-button>
        <el-button type="primary" @click="submitForm('windForm')">确定</el-button>
      </div>
    </el-dialog>
    <!--添加机柜-->
    <el-dialog title="添加机柜" :visible.sync="deviceUI">
      <el-form :model="deviceForm" :rules="deviceRules" ref="deviceForm">
      <el-row type="flex">
        <el-col :span="12">
          <el-form-item label="机柜类型" :label-width="formLabelWidth" prop="type">
            <el-select v-model="deviceForm.type" placeholder="请选择" value-key="value" @change="handlerDeviceType">
                <el-option
                  v-for="(item,index) in deviceType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
          </el-form-item>
          </el-col><el-col :span="12">
          <el-form-item label="选择位置" :label-width="formLabelWidth" prop="orderseq">
            <el-select v-model="deviceForm.orderseq" placeholder="请选择">
                <el-option label="--默认最上--" :value="0"></el-option>
                <el-option
                  v-for="item in positionData"
                  :key="item.uuid"
                  :label="item.name"
                  :value="item.uuid">
                </el-option>
              </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" v-if="isDeviceSelect">
        <el-col :span="12"><div>
          <el-form-item label="选择机柜" :label-width="formLabelWidth" prop="code">
            <el-select v-model="deviceForm.code" placeholder="请选择" value-key="id">
                <el-option
                  v-for="(item,index) in deviceData"
                  :key="item.id"
                  :label="item.name"
                  :value="{code:item.id,name:item.name}">
                </el-option>
              </el-select>
          </el-form-item>
        </div></el-col>
      </el-row>
      <el-input v-model="deviceForm.uuid" type="hidden"></el-input>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="deviceUI=false">取消</el-button>
        <el-button type="primary" @click="submitForm('deviceForm')">确定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import {get,post} from '@/router/axios-cfg'
export default {
  watch: {
    filterText(val){
      this.$refs.tree.filter(val)
    },
    $route(now,old){//watch监测路由变化
      // console.log(now)
      // console.log(old)
    }
  },
  name: 'index',
  data () {
    return {
      user:{},
      deviceUI:false,
      deviceData:[],
      deviceForm:{
        type:'',
        orderseq:'',
        code:''
      },

      windData:[],
      windForm:{
        type:'',
        orderseq:'',
        code:''
      },
      windSystemLabel:'',
      windType:[],
      windUI:false,

      editData:[],
      editForm:{
        orderseq:''
      },
      editUI:false,
      isSelect:false,
      isWindSelect:false,
      isDeviceSelect:false,
      deviceType:[{value:'0',label:'通风柜'},{value:'1',label:'房间压差控制器'}],
      ventType:[{value:'wind1',label:'新风系统'},{value:'wind2',label:'排风系统'}],
      windType:[{value:'cup',label:'管道压差控制器'},{value:'room',label:'房间'}],
      ventUI:false,
      positionData:[],
      sysData:[],
      ventForm:{
        type:'',
        code:'',
        orderseq:''
      },
      buildingData:[],
      editRules:{
        orderseq:[{required:true,message:'请选择位置',trigger:'change'}]
      },
      rules:{
          code:[{required:true,message:'请选择楼栋',trigger:'change'}],
          orderseq:[{required:true,message:'请选择位置',trigger:'change'}]
      },
      ventRules:{
          type:[{required:true,message:'请选择系统类型',trigger:'change'}],
          code:[{required:true,message:'请选择系统',trigger:'change'}],
          orderseq:[{required:true,message:'请选择位置',trigger:'change'}]
      },
      windRules:{
          type:[{required:true,message:'请选择类型',trigger:'change'}],
          code:[{required:true,message:'请选择',trigger:'change'}],
          orderseq:[{required:true,message:'请选择位置',trigger:'change'}]
      },
      deviceRules:{
          type:[{required:true,message:'请选择机柜类型',trigger:'change'}],
          code:[{required:true,message:'请选择机柜',trigger:'change'}],
          orderseq:[{required:true,message:'请选择位置',trigger:'change'}]
      },
      form:{
        code:'',
        orderseq:''
      },
      buildUI:false,
      options:[],
      formLabelWidth:'120px',
      //root: 顶级 house: 楼栋 wind1 新风 wind2 排风 room 房间  cup 设备
      currentNode:{},
      msg: 'Welcome to Your Vue.js App',
      filterText:'',
      treeData:[],
      defaultProps:{
        children:'children',
        label:'name',
        type:'type',
        uuid:'uuid',
      }
    }
  },
  methods:{
    logout(){
      get('/logout').then(res=>{
        this.$message('退出成功！')
        this.$router.push('/')
      })
    },
    handlerType(value){
      this.isSelect = true
      //选择位置下拉框,根据parentuuid,查询所有(新/排风)子节点
      get('/building/queryByPid/'+this.ventForm.parentuuid).then(res=>{
        this.positionData = res.data
      })
      //选择系统
      let type = value=='wind1'?1:2
      this.ventForm.type = value
      get('/bs/query/'+type).then(res=>{
        this.sysData = res.data
      })
    },
    handlerWindType(value){
      get('/building/queryByPid/'+this.currentNode.uuid).then(res=>{
        this.positionData = res.data
      })
      this.windData = []
      let pid = this.currentNode.parentuuid
      let uuid = ''
      let url = ''
      this.isWindSelect = true
      if(value == 'room'){
        this.windSystemLabel = '选择房间'
        //获取上级节点
        get('/building/queryById/'+pid).then(res=>{
          let uuid = res.data.code
          url = '/hs/queryByPid/'+ uuid
          get(url).then(res=>{
            // this.windData = res.data
            let arr = res.data
            for(var i=0;i<arr.length;i++){
              let item = {id:arr[i].houseroomid,name:arr[i].hsname}
              this.windData.push(item)
            }
          })
        })
      }
      else{
        this.windSystemLabel = '选择机柜'
        get('/ac/queryByType/2').then(res=>{
          let arr = res.data
          for(var i=0;i<arr.length;i++){
            let item = {id:arr[i].aircontaierid,name:arr[i].containername}
            this.windData.push(item)
          }
        })
      }
    },
    handlerDeviceType(value){
      get('/building/queryByPid/'+this.currentNode.uuid).then(res=>{
        this.positionData = res.data
      })
      this.deviceData = []
      this.isDeviceSelect = true
      get('/ac/queryByType/'+value).then(res=>{
        let arr = res.data
        for(var i=0;i<arr.length;i++){
          let item = {id:arr[i].aircontaierid,name:arr[i].containername}
          this.deviceData.push(item)
        }
      })
      if(value==0){//通风柜
        
      }else{

      }
    },
    query(){
      get('/hs/query/1').then(res=>{
        this.buildingData = res.data
      })
      //树形侧边导航栏
      let customerid = this.user.customer.customerid
      get('/building/treeList/'+customerid).then(res=>{
        this.treeData = res.data
      })
    },
    submitForm(formName){
        // let param = (this.form)
        let param = this.$refs[formName].model
        let params = {}
        let url = ''
        params.customerid = this.user.customer.customerid
        //楼栋
        if(formName=='form'){
          params.type= 'house'
          params.parentuuid = this.currentNode.uuid
          params.code = param.code.houseroomid
          params.name = param.code.hsname
          params.orderseq = param.orderseq
        }else if(formName=='ventForm'){
          // 基础系统,关联查询
          params.type = param.type
          params.parentuuid = param.parentuuid
          params.code = param.code.basesystemid
          params.name = param.code.basename
          params.orderseq = param.orderseq
        }else if(formName == 'editForm'){
          params.uuid = this.currentNode.uuid
          params.orderseq = param.orderseq
        }else if(formName == 'windForm' || formName == 'deviceForm'){
          if(param.type==0||param.type==1){
            params.type = 'cup'
          }else{
            params.type=param.type
          }
          
          params.orderseq = param.orderseq
          params.name = param.code.name
          params.code = param.code.code
          params.parentuuid = this.currentNode.uuid
        }
        this.$refs[formName].validate((valid)=>{
          if(valid){
            post('/building/save',JSON.stringify(params)).then((res)=>{
              if(res.success){
                this.$message({
                      message: '操作成功！',
                      type: 'success'
                    });
                this.query()
              }else{
                this.$message.error(params.name + ' - 此节点已存在,请重新添加!');
              }
            })
            this.buildUI=false
            this.ventUI = false
            this.editUI = false
            this.windUI = false
            this.deviceUI = false
            this.currentNode={}
            this.$refs[formName].resetFields();
            this.query()
          }else{
            this.$message.error('错了哦');
            return false
          }
        })
      },
    add(){
      if(this.currentNode.type==null){
        this.$message.error('请选择添加对象');
      }else if(this.currentNode.type == 'root'){
        this.buildUI = true
        this.form.customerid = this.user.customer.customerid
      }else if(this.currentNode.type == 'house'){//楼栋
        this.ventUI = true
        this.ventForm.parentuuid = this.currentNode.uuid
        this.ventForm.customerid = this.user.customer.customerid
      }else if(this.currentNode.type.indexOf('wind') != -1){//新|排风系统
        this.windUI = true
        this.windForm.parentuuid = this.currentNode.uuid
        this.windForm.customerid = this.user.customer.customerid
      }else if(this.currentNode.type=='room'){
        this.deviceUI = true
        this.deviceForm.parentuuid = this.currentNode.uuid
        this.deviceForm.customerid = this.user.customer.customerid
      }else{
        this.$message.error('当前设备节点不可添加');
      }
    },
    deleteNode(){
      let uuid = this.currentNode.uuid
      let name = this.currentNode.name
      if(this.currentNode.type=='root'){
        this.$message.error('不允许删除根对象');
      }else if(this.currentNode.type==null){
        this.$message.error('请选择删除对象');
      }else{
        let msg ='确定要删除吗？ (删除将失去当前节点及它下面子节点的所有数据...请慎重考虑！！！'
        this.$confirm(msg, '提示', {
         confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          get('/building/delete/'+uuid).then((res)=>{
            if(res.success){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.currentNode={}
              this.query()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
    },
    edit(){
      let uuid = this.currentNode.uuid
      let name = this.currentNode.name
      let type = this.currentNode.type
      let url = '/building/queryByType'
      let param = {type:type}
      if(this.currentNode.type=='root'){
        this.$message.error('不允许编辑根对象');
      }else if(this.currentNode.type==null){
        this.$message.error('请选择编辑对象');
      }else{
        this.editUI = true
        post(url,JSON.stringify(param)).then(res=>{
          this.editData = res.data
        })
      }
    },
    fresh(){
      this.query()
      this.$message('刷新成功');
    },
    filterNode(value,data){
      if(!value) 
        return true
      return data.name.indexOf(value)!==-1
    },
    handleNodeClick(data) {
      let name = '',url=''
      let param = {}
      switch(data.type){
        case 'root':
          url='/cs';name='controlsystem';break
        case 'house':
          url='/build';name='building';break
        case 'wind1':
          url='/wind1';name = '新风';break
        case 'wind2':
          url='/wind2';name = '排风';break
        case 'room':
          url='/room';name = '房间';break
        case 'cup':
          url='/device';name = '设备';break
      }
      this.currentNode = data
      let flag = this.$route.path
      let uuid = (this.$route.query.uuid)
      if(uuid != data.uuid){//排除自身节点的路由事件
        //查询参数,path配对的是query
        this.$router.push({ path: url , query:{uuid:data.uuid}})
      }
    }
  },
  created(){
    get('/current').then(res=>{
      this.user = res.data
      this.query()
    })
  }
}
</script>

<style scoped>
.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    text-align: center;
    margin: 10px;
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
