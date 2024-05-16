<template>
<div class="">
   <h1>上传文件说明</h1>
   <p>上传文件主要包含三个文件，即：config.json、diffusion.yaml、G_*.pth，两个配置文件，一个主模型文件，请用户上传已经训练好可用的模型</p>
</div>
<div class="upload">
  <el-input
    v-model="store.filename"
    style="width: 240px"
    maxlength="10"
    placeholder="请输入歌手名字"
    show-word-limit
    type="text"
    min="1"
    id="name"
  />
 <el-upload
    class="upload-demo"
    drag
    :auto-upload="false" 
    :on-change="handleFileChange" 
    :file-list="fileList"  
    :show-file-list="true" 
    multiple
  >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      拖拽到此 或 <em>点击上传</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
        请上传zip文件
      </div>
    </template>
  </el-upload>
  <el-button type="primary" @click="uploadFiles" id="up">上传文档</el-button>
  <el-button type="warning" @click="reset" id="reset">重置</el-button>
</div>
</template>
<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'
import  {useStore}  from '@/store/index'
import { ref} from 'vue';
import { ElLoading } from 'element-plus' 
const store = useStore()
let num = 0
const fileList = ref<File[]>([]); 
const uploadFiles = async ()=>{
     if(num<3)
     {alert("请检查文件数目!")}
     else{
      const loading =  ElLoading.service({
        lock:true,
        text:"登陆中...",
        background: 'rgba(0, 0, 0, 0.7)',
      })
      //设置超时
      setTimeout(() => {
     loading.close()
    }, 10000)
       await store.toUpload()
        loading.close();
     }
}
const reset = ()=>{
  store.filelist = [];
  alert("重置成功！")
}
const handleFileChange = (file:File,fileList:File[]) =>{
  store.filelist = [];
  // console.log(file); // 打印当前选择的文件对象  
  //     console.log(fileList); // 打印所有已选择的文件对象列表  
  fileList.forEach((f) =>store.addFile(f)); 
  num++
} 
</script>

<style scoped>
#up{
  position: relative;
  top: 10vh;
}
#reset{
  position: relative;
  top: 10vh;
}
#name{
  position: relative;
}
.upload-demo{
  position: relative;
  top: 4vh;
}
</style>