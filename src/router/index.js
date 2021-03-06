import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },

  // 商品管理
  {
    path: '/products',
    component: Layout,
    redirect: '/products/category',
    name: 'Products',
    meta: {
      title: '商品管理',
      icon: 'products'
    },
    children: [
      {
        path: 'category',
        component: () => import('@/views/products/category/index'),
        name: 'Category',
        meta: { title: '商品分类' }
      },
      {
        path: 'list',
        component: () => import('@/views/products/list/index'),
        name: 'ProductsList',
        meta: { title: '商品列表' }
      }
    ]
  },

  // 订单管理
  {
    path: '/orders',
    component: Layout,
    redirect: '/orders/list',
    name: 'Orders',
    alwaysShow: true,
    meta: {
      title: '订单管理',
      icon: 'orders'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/orders/list/index'),
        name: 'OrdersList',
        meta: { title: '订单列表' }
      }
    ]
  },

  // 订单管理
  {
    path: '/shipping',
    component: Layout,
    redirect: '/shipping/list',
    name: 'Shipping',
    alwaysShow: true,
    meta: {
      title: '运费管理',
      icon: 'shipping'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/shipping/list/index'),
        name: 'ShippingList',
        meta: { title: '运费列表' }
      }
    ]
  },

  // 会员管理
  {
    path: '/members',
    component: Layout,
    redirect: '/members/list',
    name: 'Members',
    alwaysShow: true,
    meta: {
      title: '会员管理',
      icon: 'member'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/members/list/index'),
        name: 'MembersList',
        meta: { title: '会员列表' }
      }
    ]
  },

  // 管理员管理
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/list',
    name: 'Admin',
    alwaysShow: true,
    meta: {
      title: '管理员管理',
      icon: 'user'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/admin/list/index'),
        name: 'AdminList',
        meta: { title: '管理员列表' }
      }
    ]
  },

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () =>
  //                 import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () =>
  //                 import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       name: 'Menu2',
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

export const asyncRoutes = [
  // {
  //   path: '/404',
  //   component: () => import('@/views/404'),
  //   hidden: true
  // }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
