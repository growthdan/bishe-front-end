<template>
<h1>用户编辑页面</h1>
<el-form
    label-width="auto"
    :model="nuser"
    style="max-width: 600px"
  >
    <el-form-item label="昵称">
      <el-input v-model="nuser.nickname" />
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model="nuser.email" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="nuser.password" />
    </el-form-item>
  </el-form>
  <el-button type="primary" @click="submit(nuser)" plain>提交</el-button>
</template>
<script setup lang="ts">
import type { User } from '@/datasource/Types';
import { useStore } from '@/store/index'
import { ElLoading } from 'element-plus' 
import { reactive, ref } from 'vue'
const store = useStore()
 let newuser : User = {};
 const nuser = reactive({
  username: '',
  password: '',
  nickname: '',
  role: '',
  email: ''
})
const user   = window.sessionStorage.getItem("user")
  if ( user ) {  
  newuser = JSON.parse(user);  
  console.log(newuser)
} else {  
  console.log('No object found in sessionStorage');  
}
nuser.username =  newuser.username as string
nuser.password = newuser.password as string
nuser.email = newuser.email as string
nuser.role = newuser.role as string
nuser.nickname = newuser.nickname as string

const submit = async (user:User)=>{

    const loading =  ElLoading.service({
        lock:true,
        text:"登陆中...",
        background: 'rgba(0, 0, 0, 0.7)',
      })
      //设置超时
      setTimeout(() => {
     loading.close()
    }, 10000)
 await store.submitUser(user)
 loading.close();
}
</script>