<template>
<div class="row">
   <!-- {{files}} -->

   <!-- div.row>div.col.xl6.l6.m6.s10.offset-1 -->


<div class='row'>
    <div v-for="(file,index) in files.images" :key='index.id'
     class="col xl3 m6 l4  s10 ">
        <div class="col s12 m12 l12 xl12">
            <div class="card-image">
    <img :src="file.url" class="responsive-img img-responsive" alt="">
</div>
<div  class='' v-if="file.name" >
  <span class='center'>
{{file.name}}

</span>
</div>

<!-- {{file.id}} -->
<div class="card-action">
<router-link  
            class="btn col light-blue s10 m10 l10 xl10 left waves-effects waves-light"
             :to="{name:'image', params:{id:file._id}}">
               <div>EDIT</div>
           </router-link>
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
    width: 270x ! important;
    height:  230px ! important;
}
</style>