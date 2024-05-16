<script setup lang="ts">
import { ref, onMounted } from 'vue'

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
<template>
<div>
    <h2>原唱周杰伦</h2>
    <div>  
    <audio ref="audioRef" controls>  
      <source src="@/assets/周杰伦.wav" type="audio/mpeg">  
      您的浏览器不支持 audio 元素。  
    </audio>  
  </div>  
</div>
</template>