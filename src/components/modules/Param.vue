<template>
	<div>
		<el-form :model="paramForm" :rules="rules" ref="paramForm" label-width="180px" size="mini">
			<el-row>
			<el-col :span="12">
			<el-form-item label="管道静压预设值通道1" prop="pressure1">
				<el-select v-model="paramForm.pressure1" placeholder="请选择" style="width:160px"> 
			     <el-option label="740" value="740"></el-option>
			     <el-option label="750" value="750"></el-option>
			     <el-option label="771" value="771"></el-option>
			    </el-select> (pa)
			</el-form-item>
			</el-col>
			<el-col :span="12">
			<el-form-item label="管道1设定压差" prop="diff1">
				<el-input v-model="paramForm.diff1" style="width:160px"></el-input> (pa)
			</el-form-item>
			</el-col>
			</el-row>
			<el-row>
			<el-col :span="12">
			<el-form-item label="管道静压预设值通道2" prop="pressure2">
				<el-select v-model="paramForm.pressure2" placeholder="请选择" style="width:160px"> 
			     <el-option label="740" value="750"></el-option>
			     <el-option label="750" value="772"></el-option>
			     <el-option label="771" value="774"></el-option>
			    </el-select> (pa)
			</el-form-item>
			</el-col>
			<el-col :span="12">
			<el-form-item label="管道2设定压差" prop="diff2">
				<el-input v-model="paramForm.diff2" style="width:160px"></el-input> (pa)
			</el-form-item>
			</el-col>
			</el-row>
			<el-row>
			<el-col :span="12">
			<el-form-item label="告警总开关" prop="warn">
			   <el-radio-group v-model="paramForm.warn">
			     <el-radio label="开启"></el-radio>
			     <el-radio label="关闭"></el-radio>
			   </el-radio-group>
			</el-form-item>
			</el-col>
			</el-row>
			<el-col :span="12">
			<el-form-item label="管道1压差告警开关" prop="warn1">
				<el-radio-group v-model="paramForm.warn1">
			     <el-radio label="开启"></el-radio>
			     <el-radio label="关闭"></el-radio>
			    </el-radio-group>
			</el-form-item>
			</el-col>
			<el-col :span="12">
			<el-form-item label="管道2压差告警开关" prop="warn2">
				<el-radio-group v-model="paramForm.warn2">
			     <el-radio label="开启"></el-radio>
			     <el-radio label="关闭"></el-radio>
			    </el-radio-group>
			</el-form-item>
			</el-col>
			<el-col :span="12">
			<el-form-item label="管道1压差低告警阀值" prop="lowWarn1">
				<el-input v-model="paramForm.lowWarn1" style="width:160px"></el-input> (pa)
			</el-form-item>
			</el-col>
			<el-col :span="12">
			<el-form-item label="管道1压差高告警阀值" prop="highWarn1">
				<el-input v-model="paramForm.highWarn1" style="width:160px"></el-input> (pa)
			</el-form-item>
			</el-col>
			<el-col :span="12">
			<el-form-item label="管道2压差低告警阀值" prop="lowWarn2">
				<el-input v-model="paramForm.lowWarn2" style="width:160px"></el-input> (pa)
			</el-form-item>
			</el-col>
			<el-col :span="12">
			<el-form-item label="管道2压差高告警阀值" prop="highWarn2">
				<el-input v-model="paramForm.highWarn2" style="width:160px"></el-input> (pa)
			</el-form-item>
			</el-col>
			<el-col :span="12">
			<el-form-item label="继电器1" prop="control1">
				<el-radio-group v-model="paramForm.control1">
			     <el-radio label="开启"></el-radio>
			     <el-radio label="关闭"></el-radio>
			    </el-radio-group>
			</el-form-item>
			</el-col>
			<el-col :span="12">
			<el-form-item label="继电器2" prop="control2">
				<el-radio-group v-model="paramForm.control2">
			     <el-radio label="开启"></el-radio>
			     <el-radio label="关闭"></el-radio>
			    </el-radio-group>
			</el-form-item>
			</el-col>
		</el-form>
		<span slot="footer" class="dialog-footer">
		   <el-button @click="handlerClose(0)">取 消</el-button>
		   <el-button type="primary" @click="handlerClose(1)">确 定</el-button>
		</span>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				paramForm:{
					pressure1:'',
					pressure2:''
				},
				rules:{
					pressure1:[{required:true,trigger:'blur'}],
					pressure2:[{required:true,trigger:'blur'}]
				},
			}
		},
		// props:{
		// 	paramModal: Boolean,
		// 	default: false
		// },
		methods:{
			//子组件触发父组件事件
			handlerClose(e){
				this.$emit('childFn',e)
			}
		}
	}
</script>

<style scoped=""></style>