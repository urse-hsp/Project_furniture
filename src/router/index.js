import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/home.vue';
import AllProducts from '@/components/allProducts.vue';
import Stroll from '@/components/stroll.vue';
import ShoppingTrolley from '@/components/shoppingTrolley.vue';
import Account from '@/components/my.vue';
import Deploy from '@/components/deploy.vue';
import GoodsDate from '@/components/goodsDate.vue';
import Introduce from "../components/introduce";
import Classify from "../components/classify";
import Login from "../components/login";
import Register from "../components/register";
import Member from "../components/member";
import Inner from "../components/inner";
import JoinIn from "../components/joinIn";
import MyOrder from "../components/myOrder";
import Win from "../subassembly/win";


Vue.use(Router);

const router =  new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta:{
        title:"LifeVC丽芙家居"
      }
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta:{
        title:"LifeVC丽芙家居"
      }
    },
    {
      path: '/allProducts',
      name: 'AllProducts',
      component: AllProducts,
      meta:{
        title:"全部商品"
      }
    },
    {
      path: '/stroll',
      name: 'Stroll',
      component: Stroll,
      meta:{
        title:"闲逛"
      }
    },
    {
      path: '/shoppingTrolley',
      name: 'ShoppingTrolley',
      component: ShoppingTrolley,
      meta:{
        title:"购物车"
      }
    },
    {
      path: '/my',
      name: 'my',
      component: Account,
      meta:{
        title:"账户中心"
      }
    },
    {
      path: '/deploy',
      name: 'Deploy',
      component: Deploy,
      meta:{
        title:"设置"
      }
    },
    {
      path: '/goodsDate/:goodsId',
      name: 'GoodsDate',
      component: GoodsDate,
      meta:{
        title:"商品详情"
      }
    },
    {
      path: '/introduce',
      name: 'Introduce',
      component: Introduce,
      meta:{
        title:"了解LifeVC"
      }
    },
    {
      path: '/classify/:goodsindex/:ID',
      name: 'Classify',
      component: Classify,
      meta:{
        title:"分类"
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta:{
        title:"登录"
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta:{
        title:"注册"
      }
    },
    {
      path: '/member',
      name: 'Member',
      component: Member,
      meta:{
        title:"会员等级"
      }
    },
    {
      path: '/inner/:id',
      name: 'Inner',
      component: Inner,
      meta:{
        title:"详情"
      }
    },
    {
      path: '/JoinIn',
      name: 'JoinIn',
      component: JoinIn,
      meta:{
        title:"加盟"
      }
    },
    {
      path: '/myOrder',
      name: 'MyOrder',
      component: MyOrder,
      meta:{
        title:"我的订单"
      }
    },
    {
      path: '/win',
      name: 'Win',
      component: Win,
      meta:{
        title:"???"
      }
    }
  ]
});

router.beforeEach((to,from,next)=>{
  document.title = to.meta.title;
  window.scrollTo(0, 0);
  next();
});

export default router
