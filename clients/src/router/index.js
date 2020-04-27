import Vue from 'vue'
import Router from 'vue-router'
import order from '@/components/order'
import home from '@/components/home'
import productpage from '@/components/productpage'
import small from '@/components/smallScreen'
import fullProduct from '@/components/fullProduct'
import Login from '@/components/Login'
import Register from '@/components/Register'
import dashboard from '@/components/dashboard'
import store from '../store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/order',
      name: 'order',
      component: order,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta:{
        requiresGuest:true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta:{
        requiresGuest:true
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: dashboard,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/productpage',
      name: 'productPage',
      component: productpage,
      //  meta:{
      //   requiresAuth:true
      // }
    },
    {
      path: '/small',
      name: 'small',
      component: small
    },
    {
      path: '/product',
      name: 'product',
      component: fullProduct
    }
  ],
  mode:'history',
})





router.beforeEach((to,from,next)=>{
  if(to.matched.some(record=>record.meta.requiresAuth)){
if(!store.getters.isLoggedIn){
    next("/login")

}else{
    next();
}
}else if(to.matched.some(record=>record.meta.requiresGuest)){
if(store.getters.isLoggedIn){
    next("/order")

}else{
    next();
}
}else{
next()
}

});


export default router;
