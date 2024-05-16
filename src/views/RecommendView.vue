<template>
 <el-form
    ref="ruleFormRef"
    style="max-width: 600px"
    :model="store.recommend"
    :rules="rules"
    label-width="auto"
    class="demo-ruleForm"
    :size="formSize"
    status-icon
  >
    <el-form-item label="歌手名字" prop="singer_name">
      <el-input v-model="store.recommend.singer_name" />
    </el-form-item>
    
    <el-form-item label="推荐理由" prop="recommend_reason">
      <el-input v-model="store.recommend.recommend_reason" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="recommend">
       推荐
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
import type {Recommend} from "@/datasource/Types"
import { useStore } from '@/store/index'
import { ElLoading } from 'element-plus'

const store = useStore()
const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()


const rules = reactive<FormRules<Recommend>>({
  singer_name: [
    { required: true, message: '请输入歌手名字，此是必选项', trigger: 'blur' },
    { min: 1, max: 10, message: '长度应该是 1 到 10 ', trigger: 'blur' },
  ],
  recommend_reason: [
    { required: true, message: '请填写推荐理由', trigger: 'blur' },
    { min: 1, max: 50, message: '长度应该是 1 到 50 ', trigger: 'blur' },
  ],
})

const recommend = async () => {
   
   const loading =  ElLoading.service({
       lock:true,
       text:"提交中...",
       background: 'rgba(0, 0, 0, 0.7)',
     })
     //设置超时
     setTimeout(() => {
    loading.close()
   }, 10000)
     
   await store.toRecommend();
     //关闭加载页面
     loading.close();
 }

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

</script>