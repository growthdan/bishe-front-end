<template>
<div>
    <h1>模型训练</h1>
    <el-steps style="max-width: 600px" :active="active" finish-status="success">
    <el-step title="Step 1" />
    <el-step title="Step 2" />
    <el-step title="Step 3" />
    <el-step title="Step 4" />
    <el-step title="Step 5" />
  </el-steps>

  <div v-if="active === 0">  
      <!-- 第一步的内容 -->  
      <h2>页面介绍</h2> 
      <p>本页面主要用来展示本作者如何训练的模型，以及训练模型的步骤和用到的工具等，用来提示其他管理员如何训练模型。</p> 
      <h2>第一步</h2> 
      <p>需要到<a href="https://github.com/svc-develop-team/so-vits-svc">SVC官网</a>克隆一个原始的SVC项目，以及根据项目中的requirements文档安装相关依赖，最终根据终端指令pip list查询出已安装的依赖，并对比文档检查依赖是否安装完成。</p> 
      <img  src="@/assets/依赖.png" alt="加载失败" style="width: 80%; height: 80%;">
    </div> 


    <div v-if="active === 1">  
      <!-- 第二步的内容 -->  
      <h2>第二步</h2> 
      <p>需要获取数据集。即：</p>
      <lu>
        <li>首先，需要获取想要的歌手的大量歌曲，一般在10首以上即可。</li>
        <li>其次，处理音频。及使用 UVR5 将背景音乐去掉，使音频变为仅有人声的音频，其中选取5_Hp模型，并勾选仅人声即可。
          <img  src="@/assets/去背景音乐.png" alt="加载失败" style="width: 50%; height: 50%;">
        </li>
        <li>然后，利用 AU 将音频出没有人声的部分剪去，使人声密集，这样会使切片后的音频都具有人声。顺便可以进行一下响度匹配。 
          <img  src="@/assets/AU截图.png" alt="加载失败" style="width: 50%; height: 50%;">
        </li>
        <li>最后，利用 slicer-gui 将处理好的音频进行切片，使其变为7至8秒的小段，这样的数据最好要在300条以上。 
          <img  src="@/assets/slicer示意图.png" alt="加载失败" style="width: 60%; height: 60%;">
        </li>
        <li>
           本人处理好的数据集如下图所示：
           <img  src="@/assets/数据集示意图.png" alt="加载失败" style="width: 90%; height: 90%;">
        </li>
      </lu> 
    </div> 


    <div v-if="active === 2">  
      <!-- 第三步的内容 -->  
      <h2>第三步</h2> 
      <p>在处理好数据集以后，要配置整个项目，准备训练模型。</p> 
      <lu>
        <li>
          首先需要到<a href="https://ibm.ent.box.com/s/z1wgl1stco8ffooyatzdwsqn2psd9lrr">官网指定的地址</a>下载好 checkpoint_best_legacy_500.pt模型并放入到 pretrain 文件夹下
        </li>
        <li>
         然后到 <a href="https://huggingface.co/Sucial/so-vits-svc4.1-pretrain_model/blob/main/D_0.pth">Huggingface</a>  下载底层模型 D_0 和 G_0，并将其放入logs/44k/diffusion目录下即可。
        </li>
        <li>
         最后配置数据集。要到 dataset_raw 文件夹下，将处理好的数据集存放在以歌手命名的文件夹下，并编辑好 config.json 文件即可。编辑结构如下：
         <img  src="@/assets/数据集配置.png" alt="加载失败" style="width: 90%; height: 90%;">
        </li>
      </lu>
    </div> 

    <div v-if="active === 3">  
      <!-- 第三步的内容 -->  
      <h2>第三步</h2> 
      <p>需要编写一个批处理文件放入SVC项目的根目录下(.bat结尾的文件，用于执行指令)，方便每次启动项目并进行训练。编辑内容如下： </p>
      <p> @echo off</p>
      <p>:start</p>
      <p>python train.py -c configs/config.json -m 44k</p>
      <p>
       goto start</p>

       <img  src="@/assets/批处理文件示意图.png" alt="加载失败" style="width: 90%; height: 90%;">
    </div> 

    <div v-if="active === 4">  
      <!-- 第三步的内容 -->  
      <h2>第四步</h2> 
      <p>最终启动上一步编写好的批处理文件即可，每次训练会显示步数，每个模型训练到六万步左右效果会好。但要以实际翻唱效果为准。并且最终模型会以G_步数的形式存储，训练好后取出模型文件和相关配置文件即可。模型存储方式如下图: </p>
      
       <img  src="@/assets/模型文件.png" alt="加载失败" style="width: 90%; height: 90%;">
    </div> 

    <div v-if="active === 5">  
      <h2>完成训练！！！</h2>
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
<style scoped>
li{
  font-size: 30px;
}
</style>