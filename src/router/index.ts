import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
       path:"/",
       meta:{titlle:"登录"},
       redirect:'/login'
    },
    {
      name:"login",
      path:"/login",
      component:()=>import('@/views/LoginView.vue'),
    },
    {
      name:"home",
      path:"/home",
      component:()=>import('@/views/HomeView.vue'),
      redirect:'/home/index',
      children:[
        {
          name:'homepage',
          path:'index',
          component:()=>import('@/views/HomePage.vue')
        },
        {
          name:'oprationpage',
          path:'opin',
          component:()=>import('@/views/OprationView.vue')
        },
        {
          name:'corepage',
          path:'core',
          component:()=>import('@/views/CoreView.vue')
        },
        {
          name:'recommend',
          path:'recommend',
          component:()=>import('@/views/RecommendView.vue')
        },
        {
          name:'upload',
          path:'upload',
          component:()=>import('@/views/UpLoad.vue')
        },
        {
          name:'relist',
          path:'relist',
          component:()=>import('@/views/RecommendList.vue')
        },
        {
          name:'relist2',
          path:'relist2',
          component:()=>import('@/views/RecommendList2.vue')
        },
        {
          name:'userv',
          path:'userv',
          component:()=>import('@/views/UserView.vue')
        },
        {
          name:'train',
          path:'train',
          component:()=>import('@/views/TrainView.vue')
        },
      ]
    }
  ]
})

//守卫
router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    const token = window.sessionStorage.getItem("token")
    if (!token) {
      next()
      return;
    } else{
      next('/home');
    }
    next()
  }
  else{
    const token = window.sessionStorage.getItem("token")
    if (!token) {
      next('/login')
      return;
    } else{
      // 放行
      next();
    }
  }
})
export default router
