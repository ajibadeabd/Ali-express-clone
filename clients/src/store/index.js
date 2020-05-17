import Vuex from 'vuex'
import Vue from 'vue'
import router from '../router'
import axios from 'axios'
import Api from '../../config/Api'
// import Auth from '../wareHouse/auth'

Vue.use(Vuex)
export default new Vuex.Store({
    
    state: {
      token:localStorage.getItem('token') || '',
        user: {},
        status:'',
        success:null,
        error:null,
        admin:''
    },
    getters: {
        isLoggedIn: state=>!!state.token ,
          authState: state =>state.status,
          user: state =>state.user,
          admin: state =>state.admin,
          error: state=>state.error,
          success: state=>state.success
       },
    actions: {
        async signIn({commit},user) {
            // commit('auth_request');
           try{
            let res= await Api().post('/users/signIn',user)
            if(res.data.success){
                const token = res.data.token;
                const msg = res.data.msg;
                const user = res.data.user;
                localStorage.setItem('token',token);
                axios.defaults.headers.common["Authorization"] = token;
                commit("auth_success",token,user)
                    }
                    return res;
           }catch(err){
                commit('auth_error',err)
           }
        },
        async signUp({commit},user) {
            commit('register_request');
            try{
                let res= await Api().post('/users/signUp',
            user)
       if (res.data.success !== undefined) {
           commit('register_success',res)
            
       }
       return res;
            }catch(err){
           commit('register_error',err)

            }
            
        },
        async signOut({commit}){
            await localStorage.removeItem('token')
            commit('signOut')
            delete   axios.defaults.headers.common['Authorization']
            router.push('/login')
        return
        }
    },
    mutations:{
        order_success(state,item){
            state.success = ''
        },
        cart_success(state,item){
            state.success = ` ${item} has been added to cart`
        },
        register_request(state){
            state.status = 'loading'
        },
        register_success(state,res){
            state.status = 'success'
            state.error=null
          
            state.success = res.data.msg
        },
        auth_request(state){
            state.status = 'loading'
            state.error=null
            state.success=null

        },
        auth_success(state,token,user){
            state.user = user
            state.status = 'success'
            state.token = token
            state.success='you are now logged in'
            state.error=null
        },
        auth_error(state,err){
            state.error=err.response.data.msg
            state.success=null


        },
        register_error(state,err){
            state.error= err.response.data.msg
        },
        signOut(state){

            state.error=null
            state.status=""
            state.token=""
            state.user=""
        }
    },
   
    
    

});