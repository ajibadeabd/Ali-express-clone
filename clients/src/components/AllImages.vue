<template>
<div class="row">
   <!-- {{files}} -->

   <!-- div.row>div.col.xl6.l6.m6.s10.offset-1 -->


<div class='row'>
    <div v-for="(file,index) in files.images" :keys='file.id'
     class="col xl3 m10 l4  s10 offset-m1">
        <div class="">
            <div class="card-image">
    <img :src="file.url" alt="">
</div>

        </div>

    </div>
</div>


</div>


</template>
<script>
import axios from 'axios'
import {mapActions} from 'vuex'
import Api from '../../config/Api'
export default {
    name:'simpleupload',

    data(){
        return{
         files:'',
         
            

        }
    },
    methods:{
        selectFile(){
           const files = this.$refs.files.files;
           this.files = [...this.files,...files]
               this.message=""
               this.error=false

        },
           
     },
     created(){
Api().get('/admin/getUploadedFile')
.then(res=>{
    this.files=res.data
})
     }
}
</script>

<style scoped>
img{
    width: 230px ! important;
    height:  230px ! important;
}
</style>