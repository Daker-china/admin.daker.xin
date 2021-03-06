import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routers length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'routers-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '仪表盘', icon: 'iconfont icon-home', noCache: true }
    }]
  },

  {
    path: '',
    meta: { title: '文章管理', icon: 'iconfont icon-mark' },
    component: Layout,
    children: [
      {
        path: 'article/list',
        name: 'articleList',
        component: () => import('@/views/article/list'),
        meta: { title: '所有文章', icon: 'iconfont icon-article' }
      },
      {
        path: 'category',
        name: 'Category',
        component: () => import('@/views/category/index'),
        meta: { title: '分类目录', icon: 'iconfont icon-folder' }
      },
      {
        path: 'article',
        name: 'article',
        component: () => import('@/views/article/index'),
        meta: { title: '发布文章', icon: 'iconfont icon-edit' }
      },
      {
        path: 'tag',
        name: 'Tag',
        component: () => import('@/views/tag/index'),
        meta: { title: '文章标签', icon: 'iconfont icon-tag' }
      }
    ]
  },

  {
    path: '',
    component: Layout,
    children: [
      {
        path: 'site',
        name: 'site',
        component: () => import('@/views/site/index'),
        meta: { title: '站点设置', icon: 'iconfont icon-setting' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

