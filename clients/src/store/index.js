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
        msg:'',
        error:null
    },
    getters: {
        isLoggedIn: state=>!!state.token ,
          authState: state =>state.status,
          user:state =>state.user
       },
    actions: {
        async signIn({commit},user) {
            commit('auth_request');
            let res= await Api().post('/users/signIn',user)
            if(res.data.success){
                const token = res.data.token;
                const user = res.data.user;
                localStorage.setItem('token',token);
                axios.defaults.headers.common["Authorization"] = token;
                commit("auth_success",token,user)
                    }
                    return res
        },
        async signUp({commit},user) {
            commit('register_request');
            let res= await Api().post('/users/signUp',
            user)
       if (res.data.success !== undefined) {
           commit('register_success')
            
       }
       return res
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
        register_request(state){
            state.status = 'loading'
        },
        register_success(state){
            state.status = 'success'
        },
        auth_request(state){
            state.status = 'loading'
        },
        auth_success(state,token,user){
            state.user = user
            state.status = 'success'
            state.token = token
        },
        signOut(state){

            state.error=null
            state.status=""
            state.token=""
            state.user=""
        }
    },
   
    
    

});