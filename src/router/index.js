import Vue from 'vue'
import Router from 'vue-router'
import Postlists from '../components/Postlists'
import Article from '../components/Article'
import Userinfo from '../components/Userinfo'
import Slidebar from '../components/Slidebar'


Vue.use(Router)

export default new Router({
  routes: [
   {
     name:'root',
     path:'/',
     components:{
       main:Postlists
     }
   },
   {
     name:'post_article',
     path:'/article/:id&author=:name',
     components:{
       main:Article,
       slidebar:Slidebar
     }
   },
   {
     name:'user_info',
     path:'/user/:name',
     components:{
       main:Userinfo
     }
   }
  ]
})
