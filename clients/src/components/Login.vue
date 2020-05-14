<template>
<div class="row">
    {{message}}
    <div class="col s10 m6 l4  offset-l4 offset-s1 offset-m3">
        <form @submit.prevent="SignIn"> 
                     <div class="card">
            <div class="card-action  white-text">
                <h3 class="center light-blue-text  ">
                    <i class="fa fa-sign-in"></i> Login</h3>
            </div>
            <div class="card-content">
                <div class="form-field">
                    <label for="userName">Username</label>
                     <input type="text"
                     placeholder="userName" 
                     v-model="userName" id="username">

                </div> <br>
                <div class="form-field">
                    <label for="email">Email</label>
                     <input type="email"
                     placeholder="email"
                      v-model="email" id="email">

                </div> <br>
                <div class="form-field">
                    <label for="password">Password</label>
                     <input type="password"
                     placeholder="password"
                      v-model="password" id="password">

                </div> <br>
                
                <div class="form-field">
                  <button class="btn-large light-blue waves-effects waves-dark"
                  style="width:100%;" 
                  type="submit">Login</button>

                </div> <br>
                            <div>
                                 Don't have  an Account <router-link to=/register>
            sign Up
        </router-link>
                            </div>
                        
            </div>
        </div>
      
        </form>
       
    </div>
   
</div>


</template>
<script>
import axios from 'axios'
import {mapActions} from 'vuex'
import Api from '../../config/Api'
export default {
    data(){
        return{
            userName:'',
            email:'',
            password:'',
            message:''
            

        }
    },
    methods:{
        ...mapActions(['signIn']),
        SignIn(){
            let userInfo={
                userName:this.userName,
                password:this.password,
                email:this.email,
            }
this.signIn(userInfo)
.then(res=>{
    if (res.data.success) {
        this.$router.push('/order')
        this.message='your have been logged in'
    }
}).catch(error=>{
    console.log(error)
})

       
        }}
}
</script>