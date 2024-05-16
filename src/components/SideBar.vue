<template>
    <el-row class="tac">
    <el-col  id="clo">
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        router="true"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><icon-menu /></el-icon>
            <span>系统核心</span>
          </template>
          <el-menu-item-group title="简介">
            <el-menu-item index="/home/index" >平台简介</el-menu-item>
            <el-menu-item index="/home/opin" v-if="!show()" >操作简介</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="核心">
            <el-menu-item index="/home/core" >效果展示与翻唱</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title>模型新增</template>
            <el-menu-item index="/home/recommend">歌手推荐</el-menu-item>
            <el-menu-item index="/home/upload" v-if="show()">上传模型</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="/home/relist"  v-if="!show()">
          <el-icon><icon-menu /></el-icon>
          <span>处理中的推荐</span>
        </el-menu-item>
        <el-menu-item index="/home/relist2" v-if="show()">
          <el-icon><document /></el-icon>
          <span>推荐管理</span>
        </el-menu-item>
        <el-menu-item index="/home/train" v-if="show()">
          <el-icon><document /></el-icon>
          <span>模型训练</span>
        </el-menu-item>
        <el-menu-item index="/home/userv">
          <el-icon><setting /></el-icon>
          <span>用户管理</span>
        </el-menu-item>
      </el-menu>
    </el-col>
</el-row>
</template>
<script setup  lang="ts">
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import {ADMIN,USER} from '@/datasource/UserType'
import { useStore } from '@/store/index'

const store = useStore()
const show = ()=>{
  return ADMIN===window.sessionStorage.getItem("role");
}

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

</script>
<style scoped>
.tac{
  width: 100%;
}
#clo{
    right: 100%;
}
</style>
