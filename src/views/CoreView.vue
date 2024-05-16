<template>
<div>
   <h1>效果展示</h1>
    <AudioPlay1></AudioPlay1>

    <AudioPlay2></AudioPlay2>
    <el-button class="bu" type="primary" @click="start">开启我的翻唱之旅</el-button>
</div>
</template>
<script setup lang="ts">
import { useStore } from '@/store/index'
import { ElLoading } from 'element-plus' 
import { ref, onMounted } from 'vue';  
import  AudioPlay1   from '@/components/AudioView1.vue'
import  AudioPlay2   from '@/components/AudioView2.vue'
const store = useStore();
const start = async ()=>{
  const loading =  ElLoading.service({
        lock:true,
        text:"启动中...",
        background: 'rgba(0, 0, 0, 0.7)',
      })
      //设置超时
      setTimeout(() => {
     loading.close()
    }, 30000)
    await store.startCore();
      //关闭加载页面
      loading.close();
  }

//copy
// 响应式状态  
const audioRef = ref<HTMLAudioElement | null>(null);  
const audioSrc = ref(''); // 替换为你的音频文件路径  
const isPlaying = ref(false);  
  
// 播放音频  
const playAudio = () => {  
  if (audioRef.value) {  
    audioRef.value.play().then(() => {  
      isPlaying.value = true;  
    }).catch(error => {  
      console.error('播放失败:', error);  
    });  
  }  
};  
  
// 暂停音频  
const pauseAudio = () => {  
  if (audioRef.value && audioRef.value.paused === false) {  
    audioRef.value.pause();  
    isPlaying.value = false;  
  }  
};  
  
// 确保在 DOM 挂载后音频元素是可用的  
onMounted(() => {  
  // 在这里你可以添加其他初始化代码，例如检查音频是否已加载完成等。  
});  
</script>
<style scoped>
.bu{
  position: absolute;
  top: 45vh;
}
</style>