import { defineStore } from 'pinia'
import axios from '@/axios';
import type { User,Recommend } from '@/datasource/Types';
import router from '@/router';
import { ADMIN, USER } from '@/datasource/UserType';

export  const useStore = defineStore('useStore', {
   state:()=>({
    user: {} as User ,//用户信息
    token:'' as string,//token
    message: '' as string,//后端返回信息    
    exception: '' as string,//异常信息
    flag:false,//登录标识
    recommend:{} as Recommend,//注册时用到的推荐
    roleflag:true,//权限标识
    filename:"",//上传文件的名字
    filelist:[] as File[],//上传文件
    recommends:[] as Recommend[],//用户推荐列表
    role:"",//存储角色
    res:[] as Recommend[],//临时接收推荐列表
    totle:0 as Number,//总页数
 }),
   actions:{
    //更改进度
    async changeComplete(id:number){
        try {
           const resp = await axios.get('recommend/change',{params:{id:id}})
           this.message = resp.data.message
           alert(this.message)
        } catch {
            // 
        }
    },
    //删除推荐
    async deleteRecommend(id:number){
       try {
           const resp = await axios.delete('recommend/delete',{params:{id:id}})
          this.message = resp.data.message
          alert(this.message)
       } catch {
           // 
       }
   },
    //查询推荐页数
    async seleNum(){
        if(window.sessionStorage.getItem("role") === ADMIN){
            try {
                const resp = await axios.get('recommend/findNum1')
               this.totle = resp.data.data
               this.message = resp.data.message
               console.log(this.message)
               
            } catch {
                // 
            }
        }
        else if(window.sessionStorage.getItem("role") === USER){
            try {
                const resp = await axios.get('recommend/findNum2',{params:{
                   username:this.user.username
                }})
                this.totle = resp.data.data
               this.message = resp.data.message
               console.log(this.message)
               
            } catch {
                // 
            }
        }
    },
    //查询推荐
    async selectRe(current:number,size:number){
        if(window.sessionStorage.getItem("role") === ADMIN)
        {
            try {
                const resp = await axios.get('recommend/findAll',{params:{
                    current:current,
                    size:size
                }})
                this.recommends = resp.data.data
               window.sessionStorage.setItem("recommends",JSON.stringify(this.recommends))
               this.message = resp.data.message
               console.log(this.message)
               
            } catch {
                // 
            }
       }
       else if(window.sessionStorage.getItem("role") === USER){
        try {
            const resp = await axios.get('recommend/findRecommend',{params:{
                username:this.user.username,
                current:current,
                size:size
            }})
            this.recommends=resp.data.data
           window.sessionStorage.setItem("recommends",JSON.stringify(this.recommends))
           this.message = resp.data.message
           console.log(this.message)
           console.log("列表长度："+this.recommends.length)
        } catch {
            // 
        }
       }
       

    },
    //添加文件
    addFile(file: File) {  
        this.filelist.push(file);  
      },  
    //上传文件
    async toUpload(){
      const formData = new FormData(); 
       this.filelist.forEach((file) => {  
         console.log(file);
        formData.append('files',file.raw);  
      });  
          formData.append("filename",this.filename)
          console.log(formData.get("files"))
        try {
            const resp = await axios({
               method:'post',
               data: formData,
               url:'core/upload',
               headers: {  
                'Content-Type': 'multipart/form-data'  
            }  
           })
           this.message = resp.data.message
           alert(this.message)
        } catch {
            // 
        }
    },
    //推荐歌手
    async toRecommend(){
         this.recommend.user_name = this.user.username
        try {
            const resp = await axios({
               method:'post',
               data:this.recommend,
               url:'recommend/insert'
           })
           this.message = resp.data.message
           alert(this.message)
        } catch {
            // 
        }
    },
    //登录
    async login() {
        try {
            const resp = await axios({
               method:'post',
               data:this.user,
               url:'user/login'
           })
           this.flag = resp.data.flag;
           this.message = resp.data.message
           alert(this.message)
           if(this.flag == true)
           {
           this.token = resp.data.data.token
           this.user.role = resp.data.data.role;
           this.role=resp.data.data.role;
           this.user.nickname = resp.data.data.nickname;
         }
        } catch {
            // 
            alert(this.message)
        }
         window.sessionStorage.setItem("token",this.token)
         window.sessionStorage.setItem("user",JSON.stringify(this.user))
         window.sessionStorage.setItem("role",this.role)
         console.log(window.sessionStorage.getItem('token'))
         router.push('/home')
    },
     //注册
     async register() {
        try {
            console.log("请求前");
            console.log(this.user);
        const resp = await axios({
                method:'post',
                data:this.user,
                url:'user/register'
            })
            console.log(resp.data.message)
            this.message = resp.data.message;
            alert(this.message)
        } catch {
            // 
        }
    },
      //登出
      logout(){
        this.token = ''
        window.sessionStorage.removeItem("token")
        window.sessionStorage.removeItem("user")
        window.sessionStorage.removeItem("totle")
        window.sessionStorage.removeItem("role")
        router.push('/login')
     },
     //启动WebUI
     async startCore(){
        console.log(this.token)
        console.log(window.sessionStorage.getItem('token'))
        console.log("启动WebUI")
        const resp = await axios({
            method:'get',
            data:this.user,
            url:'core/index'
        })
        console.log("启动WebUI成功")
     }

}
})