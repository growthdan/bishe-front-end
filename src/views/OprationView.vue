<template>
<div>
    <h2>核心功能操作简介</h2>
    <el-steps style="max-width: 600px" :active="active" finish-status="success">
    <el-step title="Step 1" />
    <el-step title="Step 2" />
    <el-step title="Step 3" />
    <el-step title="Step 4" />
    <el-step title="Step 5" />
  </el-steps>
   <div v-if="active === 0">  
      <!-- 第一步的内容 -->  
      <h2>这是第一步的内容</h2> 
      <p>观看效果展示，观看完成后可以点击按钮开启自己的翻唱之旅！！！</p> 
      <img  src="@/assets/教程0.png" alt="加载失败" style="width: 90%; height: 90%;">
    </div>  

    <div v-if="active === 1">  
      <!-- 第二步的内容 -->  
      <h2>这是第二步的内容</h2> 
      <p>打开翻唱页面后，选择本地翻唱，这样才能加载存储在服务器中的模型。</p> 
      <img  src="@/assets/教程1.png" alt="加载失败" style="width: 100%; height: 100%;">
    </div>  

    <div v-if="active === 2">  
      <!-- 第三步的内容 -->  
      <h2>这是第三步的内容</h2> 
      <p>进入本地翻唱后，需要先刷新一下本地模型列表，然后选择想要的歌手，并将模型加载。</p> 
      <img  src="@/assets/教程2.png" alt="加载失败" style="width: 90%; height: 90%;">
    </div>  

    <div v-if="active === 3">  
      <!-- 第四步的内容 -->  
      <h2>这是第四步的内容</h2> 
      <p>加载好模型后，需要先调整好需要的参数，用户若是看不懂只需要选择需要的输出格式即可。</p> 
      <img  src="@/assets/教程4.png" alt="加载失败" style="width: 90%; height: 90%;">
    </div>  

    <div v-if="active === 4">  
      <!-- 第五步的内容 -->  
      <h2>这是第五步的内容</h2> 
      <p>调整好参数后，上传需要翻唱的歌曲，然后点击翻唱即可。翻唱完成后可以试听和取出结果。</p> 
      <img  src="@/assets/教程3.png" alt="加载失败" style="width: 90%; height: 90%;">
    </div> 
    
    <div v-if="active === 5">  
      <!-- 完成 -->  
      <h2>完成！！！</h2> 
    </div> 
  <el-button style="margin-top: 12px" :disabled="active==0" @click="back">Back step</el-button>
  <el-button style="margin-top: 12px" @click="next">Next step</el-button>
</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const active = ref(0)
const back = () => {
    active.value--
}
const next = () => {
  if (active.value++ > 4) active.value = 0
}
</script>