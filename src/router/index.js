/*
 * @Description: 
 * @Version: 1.0
 * @Author: gruguy
 * @Date: 2021-11-02 13:21:56
 * @LastEditors: gruguy
 * @LastEditTime: 2021-11-30 11:06:22
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/Web/Discover'),
    redirect: '/index',
    children:[
      {
        name: 'index',
        path: '/index',
        component: () => import('@/views/Web/Discover/main')
      },
      {
        name: 'authorIndex',
        path: '/authorIndex/:id',
        component: () => import('@/views/Web/Discover/authorIndex')
      },
      {
        name: 'authorArticleDetail',
        path: '/authorArticleDetail/:id',
        component: () => import('@/views/Web/Discover/authorArticleDetail') 
      },
      {
        name: 'follow',
        path: '/follow',
        component: () => import('@/views/Web/Follow'),
        children: [
          {
            name: 'followArticleList',
            path: '/follow/:id',
            component: () => import('@/views/Web/Follow/articleList')
          }
        ]
      },
      {
        name: 'userCenter',
        path: '/u/:username',
        component: () => import('@/views/Web/User')
      },
      {
        name: 'userEdit',
        path: '/user/edit',
        component: () => import('@/views/Web/User/edit')
      },
      {
        name: 'subject',
        path: '/subject',
        component: () => import('@/views/Web/Subject')
      }
    ]
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/Home'),
    redirect: '/admin/users/personal',
    children: [
      {
        path: '/admin/users/personal',
        name: 'UserPersonal',
        component: () => import('@/views/User/personal.vue'),
        meta: {
          title: '个人中心'
        }
      },
      {
        path: '/admin/users/password',
        name: 'UserPassword',
        component: () => import('@/views/User/password.vue'),
        meta: {
          title: '修改密码'
        }
      },
      {
        path: '/admin/article',
        name: 'AdminArticle',
        component: () => import('@/views/Article'),
        meta: {
          title: '文章列表'
        }
      },
      {
        path: '/admin/article/add',
        name: 'ArticleAdd',
        component: () => import('@/views/Article/add.vue'),
        meta: {
          title: '发布文章'
        }
      },
      {
        path: '/admin/subject',
        name: 'AdminSubject',
        component: () => import('@/views/Subject'),
        meta: {
          title: '发布文章'
        }
      },
      {
        path: '/admin/article/update',
        name: 'ArticleUpdate',
        component: () => import('@/views/Article/update.vue'),
        meta: {
          title: '修改文章'
        }
      },
      {
        path: '/admin/comment',
        name: 'AdminComment',
        component: () => import('@/views/Comment'),
        meta: {
          title: '评论管理'
        }
      },
      {
        path: '/admin/fans',
        name: 'AdminFans',
        component: () => import('@/views/Fans'),
        meta: {
          title: '粉丝管理'
        }
      },
      {
        path: '/admin/star',
        name: 'AdminStar',
        component: () => import('@/views/Star'),
        meta: {
          title: '点赞管理'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login')
  },
  {
    path: '/reg',
    name: 'Reg',
    component: () => import('@/views/Register')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由拦截
router.beforeEach((to,from, next) => {
  // 判断是否是/admin 开头的路由，若是，检查 token
  console.log(to);
  if(to.path === '/login'){
    next()
  }else if(to.path.indexOf('/admin') > -1){
    const token = localStorage.getItem('token')
    if(!token){
      next({
        path:'/login',
        query: {redirect:to.path}
      })
    }else{
      next()
    }
  }else{
    next()
  }
})

export default router
