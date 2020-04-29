<template>
<div class="row">
    <div class="red">
        {{message}}
    </div>
    <div class="col s10 m6 l4  offset-l4 offset-s1 offset-m3">
        <form @submit.prevent="sendFile" enctype="multipart/form-data" > 
                     <div class="card">
            <div class="card-action  white-text">
                <h3 class="center light-blue-text  ">
                  <i class="fa fa-upload"></i>upload File</h3>
            </div>
            <div class="card-content">
                <div class="form-field">
                    <label for="file">Image</label>
                     <input
                     multiple
                      type="file"
                            ref="files"
                     @change="selectFile"
                            
                            >

                </div> <br>            
                
                
                <div class="form-field">
                  <button class="btn-large
                   light-blue waves-effects waves-dark"
                  style="width:100%;" 
                  type="submit">
                   <i class="fa fa-upload">
                       </i> upload</button>

                </div> <br>

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
    name:'simpleupload',

    data(){
        return{
         files:'',
         message:'',
         error:false
            

        }
    },
    methods:{
        selectFile(){
           this.files = this.$refs.files.files[0]
               this.message=""
               this.error=false

        },
           sendFile(){
               console.log(this.file.name)
                   const formData = new FormData()
                formData.append('file',this.file)
                try{
           Api().post('/admin/uploadFile',formData)
           .then(res=>{
               console.log(res)
               this.file='';
               this.message="file has been uploaded"
                    this.error=false

           })

                }catch(err){
                    console.log(err)
                    this.message="something went wrong"
                    this.error=true
                }

        }
        // ...mapActions(['signIn']),
     }
}
</script>