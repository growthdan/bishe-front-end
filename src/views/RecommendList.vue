<template>
<div>
    <h1>用户的推荐列表</h1>
     <el-table :data="store.recommends" style="width: 100%">
    <el-table-column prop="user_name" label="推荐人" width="100" />
    <el-table-column prop="singer_name" label="推荐歌手" width="100" />
    <el-table-column prop="recommend_reason" label="推荐原因" width="300" />
    <el-table-column prop="complete" label="进度" width="100"/>
    <!-- 其他列... -->  
    <el-table-column  
        label="操作"  
        width="200"  
      >  
        <template #default="scope">  
          <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>  
        </template>  
      </el-table-column>  
  </el-table>
  <el-pagination  
      background  
      layout="prev, pager, next"  
      :current-page="currentPage"  
      :page-size="pageSize"  
      :total="store.totle"  
      @current-change="handlePageChange"  
    ></el-pagination>  
</div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useStore } from "@/store/index";
import type {Recommend} from "@/datasource/Types"
import {ref} from 'vue'

const store = useStore()



// 响应式数据  
const currentPage = ref(1);  
const pageSize = ref(5);  
// 处理页码变化  
const handlePageChange = (newPage: number) => {  
  currentPage.value = newPage;  
  store.selectRe(currentPage.value,5) 
};  

onMounted(()=>{
    store.seleNum()
  const storedArrayString = sessionStorage.getItem('myArray');  
  if (storedArrayString) {  
  // 将字符串转换回数组  
  const recommends: Recommend[] = JSON.parse(storedArrayString) as Recommend[];  
    
  // 现在你可以使用myArray了，它包含你之前存储的数组项  
  console.log("长度:"+recommends.length); // 输出: ['item1', 'item2', 'item3']  
  store.recommends = recommends
} else {  
  console.log('未找到存储的数组');  
}
    store.selectRe(1,5);
})

const handleDelete = (data:Recommend)=>{

}
</script>