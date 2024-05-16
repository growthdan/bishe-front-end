<template >
  <div class="a">
    <div class="login">
      <div class="le">
    <img id="im1" src="../assets/麦克.png">
     </div>
   <div class="ri">
      <div class="head">
        <el-icon size="40px" color="rgb(151, 231, 58)" id="h"><Pear /></el-icon>
        <h2>登录界面</h2>
    </div>
    
    <el-form
      ref="account"
      :model="store.user"
      status-icon
      label-width="120px"
      class="demo-ruleForm"
    >
    
      <el-form-item label="" prop="username" id="ff1">
        <el-icon size="30px" id="in"><User /></el-icon>
        <el-input v-model="store.user.username"  placeholder="用户名"/>
      </el-form-item>
      <el-form-item label="" prop="pass" id="ff" >
        <el-icon size="30px" id="in"><Lock /></el-icon>
        <el-input v-model="store.user.password" type="password" autocomplete="off" placeholder="密码" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login" class="bbbb1">登录</el-button
        >
        <el-button type="success"  @click="regit" class="bbbb2">注册</el-button>
      </el-form-item>
    </el-form>
    <div id="repass">
    <el-text class="mx-1" type="primary"><a href="#"> ?忘记密码  </a></el-text>
  </div>
  <div id="tiaoyue">
    <p>登录即表示同意平台<a href="https://homewh.chaoxing.com/agree/privacyPolicy?appId=900001" target="_blank">《隐私政策》</a>和<a href="https://homewh.chaoxing.com/agree/userAgreement?appId=900001" target="_blank">《用户协议》</a></p>
  </div>
  </div>
  </div>

    <!--隐藏表单-->
    <el-drawer
    v-model="drawer"
    title="注册表单"
    :direction="direction"
    :before-close="handleClose"
    class="ddd"
  >
    <span>hi here</span>
    <!--注册表单-->
    <el-form :model="newuser" label-width="auto" style="max-width: 600px">
    <el-form-item label="userName" class="yuansu">
      <el-input v-model="newuser.username"  placeholder="用户名" clearable />
    </el-form-item>
    <el-form-item label="user-role" class="yuansu">
      <el-select
        v-model="newuser.role"
        placeholder="role"
        id="roleS"
        clearable
      >
        <el-option label="user" :value="usertype.user" />
        <el-option label="admin" :value="usertype.admin" />
      </el-select>
    </el-form-item>
    <el-form-item label="user-password" class="yuansu">
      <el-input v-model="newuser.password"  placeholder="密码" clearable />
    </el-form-item>
    <el-form-item label="nickname" class="yuansu">
      <el-input v-model="newuser.nickname"  placeholder="昵称" clearable />
    </el-form-item>
    <el-form-item label="email" class="yuansu">
      <el-input v-model="newuser.email"  placeholder="邮箱" clearable />
    </el-form-item>
    <el-form-item class="yuansu" >
      <el-button type="primary" id="rebutton" @click="register" plain>注册</el-button>
    </el-form-item>
  </el-form>
  </el-drawer>
</div>
  </template>
  
  <script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import { useStore } from '@/store/index'
  import  { ElMessage,ElMessageBox } from "element-plus"
  import  {USER,ADMIN} from '@/datasource/UserType'
  import { ElLoading } from 'element-plus' 
  const usertype = {
     user: USER,
     admin: ADMIN
  }
  const newuser = reactive({
  username: '',
  password: '',
  nickname: '',
  role: '',
  email: ''
})

  const store =  useStore();
  const login = async () => {
   
    const loading =  ElLoading.service({
        lock:true,
        text:"登陆中...",
        background: 'rgba(0, 0, 0, 0.7)',
      })
      //设置超时
      setTimeout(() => {
     loading.close()
    }, 10000)
      
    await store.login();
      //关闭加载页面
      loading.close();
      // user.loginSelectByUsername();
  }

  const register = async () => {
     store.user.username = newuser.username;
     store.user.password = newuser.password;
     store.user.role = newuser.role;
     store.user.email = newuser.email;
     store.user.nickname = newuser.nickname;
     //加载动画
     const load =  ElLoading.service({
        lock:true,
        text:"注册中...",
        background: 'rgba(0, 0, 0, 0.7)',
      })

 //设置超时
 setTimeout(() => {
     load.close()
    }, 8000)
   await store.register();

    //关闭加载动画
     load.close();
  }

  const regit = () => {
    drawer.value = true;
  }

const drawer = ref(false)
const direction = ref('rtl')
const handleClose = (done: () => void) => {
  ElMessageBox.confirm('想要关闭注册表单？')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}
  </script>

  
  <style  scoped>
  #rebutton{
     position: absolute;
     width: 50px;
     top: auto;
     right: 1vw;
  }
  .yuansu{
    padding: 10px;
    margin: 5px;
  }
  #tiaoyue{
    right:10vw ;
    top: 40vh;
    width: 20vw;
    position: absolute;
    border: 0px solid red;
  }
  #repass{
     width: 5vw;
     right: -65%;
     top: 22%;
     position: relative;
     border: 0px solid red;
  }
  .bbbb1{
     width: 5vw;
     position: absolute;
     top: 5vh;
     right: 10vw;
  }
  .bbbb2{
     width: 5vw;
     position: absolute;
     top: 5vh;
     right: 4vw;
  }
.ddd{
  display: flex;
  background-color: rgba(255, 255, 255,0.7);
  }
.login{ 
  flex-grow: 1; /* 放大比例，默认值为0 */  
  flex-shrink: 1; /* 缩小比例，默认值为1 */  
  flex-basis: auto; /* 项目的初始大小，默认为auto */  
    position: fixed;
    top: 10vh;
    left: 45vh;
    width: 50vw;
    height: 53vh;
    padding-top: 0px;
    background-color: rgba(255, 255, 255,0.7);
    border-radius: 10px;
}
#ff{
  display: flex;
  
}
#ff1{
  display: flex;
  margin-bottom: 0;
}
.demo-ruleForm{
   width: 70%;
}
#in{
  display: inline-block;
  margin-left: 10%;
  position: relative;
  right: 30%;
  top: 45%;
}
.head{
  display: flex;
  margin-left: 25%;
  margin-top: 5%;
}
h2{
  margin: 0;
  margin-top: 1%;
}
.le{
  margin: 0;
  padding: 0;
  display: inline-block;
}

.ri{
  margin: 0;
  padding: 0;
  display: inline-block;
  position: fixed;
  top: 13vh;
  width: 35%;
  height: 40%;
}
#im1{
  width: 40vh;
  height: 53vh;
  margin: 0;
  padding: 0;
  border-radius: 10px;
}
*{
  padding: 0;
  margin: 0;
}
.a{
   display: flex;
   height: 100vh;
   width: 100vw;
    justify-content: space-between;  
    align-items: center;  
   background-color: rgb(213, 231, 235);
   background-size:cover;
}
</style>