<template id="body">
    <!-- 布局容器 -->
    <div class="common-layout">
    <el-container>
      <el-header> 
        <Head id="head">
        </Head>
      </el-header>
      <el-container id="con">
        <el-aside  id="aside">
            <Side>

            </Side>
        </el-aside>
        <el-main>
         <RouterView></RouterView>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script  lang="ts" setup>

</script>
<style scoped>
#aside{
    width: 12vw; 
    border: 0px solid red;
    border-right: 1px solid rgb(230, 236, 236);
}
#head{
   width: 97vw;
   border-bottom: 1px solid rgb(84, 162, 231);
}
#con{
    height: 92vh;
    width: 98vw;
    border: 0px solid red;
}

</style>