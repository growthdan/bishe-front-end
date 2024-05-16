<template>
    <el-page-header :icon="null">
      <template #content>
        <div class="flex items-center">
          <el-avatar
            :size="32"
            class="mr-3"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
          <span class="text-large font-600 mr-3"> {{ newuser.nickname }} </span>
          <span class="text-sm mr-2" style="color: var(--el-text-color-regular)" id="title">
            基于SVC的指定歌手翻唱系统
          </span>
          <el-tag id="tag">{{  newuser.role }}</el-tag>
        </div>
      </template>
      <template #extra>
        <div class="flex items-center">
          <el-button>Home</el-button>
          <el-popconfirm
    width="220"
    confirm-button-text="确定"
    cancel-button-text="不，取消"
    :icon="InfoFilled"
    icon-color="#626AEF"
    title="确定注销?"
    @confirm = "store.logout"
  >
    <template #reference>
      <el-button type="primary" class="ml-2" >注销</el-button>
    </template>
  </el-popconfirm>
        </div>
      </template>
    </el-page-header>
  </template>
<script setup lang="ts">
   import {useStore} from '@/store/index' 
   import { InfoFilled } from '@element-plus/icons-vue' 
   import type { User } from '@/datasource/Types';
   import  {ADMIN} from '@/datasource/UserType'

   let newuser : User = {};

  const store = useStore();
  const user   = window.sessionStorage.getItem("user")
  if ( user ) {  
  newuser = JSON.parse(user);  
  console.log(newuser)
} else {  
  console.log('No object found in sessionStorage');  
}
   store.user.username = newuser.username
if(newuser.role === ADMIN ){
  store.roleflag = false
}
</script>
  <style scoped>
  #tag{
    position: relative;
     right: 12vw;
  }
 #title{
   left: 32vw;
   position: relative;
   border: 0px solid red;
 }
</style>