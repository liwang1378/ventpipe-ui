import axios from 'axios'
import qs from 'qs'
import sf from 'string-format'
import router from '../router'
import {Loading, Message} from 'element-ui'

const axiosInstance = axios.create({
	baseURL: 'http://127.0.0.1:8085/',
	// baseURL:'http://47.96.150.125:8080',
	timeout: 3000,
	withCredentials:true,
	headers: {'Access-Control-Allow-Origin':'*','Content-Type': 'application/json'}
})

//（添加请求拦截器）
axiosInstance.interceptors.request.use((config)=>{
	return config
},(error)=>{
	Message.error({
	    message: '错误的传参',
	    onClose: function () {
	      let flag = router.currentRoute.path
	      if(flag !='/')
	      	router.push('/');
	    }
	})
	console.log('错误的传参')
	return Promise.reject(error)
})
//返回状态判断（添加响应拦截器）
axiosInstance.interceptors.response.use((res)=>{
	if(res.data.success){
		return Promise.resolve(res.data)
	}else{
		Message.error({
		    message: res.data.msg,
		    onClose: function () {
		      let flag = router.currentRoute.path
		      if(res.data.code==5000 || res.data.code==5006){
		          if(flag !='/')
			      	router.push({name: 'Login'});
		  	  }
		    }
		  })
		return Promise.resolve(res.data)
	}
	
},(error)=>{
	Message.error({
	    message: '网络异常',
	    onClose: function () {
	      let flag = router.currentRoute.path
	      if(flag !='/')
	      	router.push({name: 'Login'});
	    }
	})
	console.log('网络异常')
	return Promise.reject(error)
})

export const get = (url,params,pathVariable=null) =>  axiosInstance.get(sf(url, pathVariable), params)
export const post = (url,params,pathVariable=null) => axiosInstance.post(sf(url, pathVariable), params)