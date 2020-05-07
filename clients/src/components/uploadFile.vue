<template>
<div class="row">
    <div class="lighten-3 container red">
        {{message}}
    </div>
    <div class="container">
        upload an image
    </div>
    <div class="col s12 m10 l4=8 offset-l1 offset-m1  ">
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
    <div class="col s12 m10 offset-m1 l2 ">
        
<div class="card">
<div class="card-content "   v-for="(file,index) in files" :key="index">

<div class="row">
                    {{index}}:       {{file.name}} 
                     <i @click.prevent="files.splice(index,1)"
                      class=" right red lighten-1 circle material-icons"> close
                               </i>    
                    </div>

</div>
   
</div>

    </div>
   
   <div >
         
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
           const files = this.$refs.files.files;
           this.files = [...this.files,...files]
               this.message=""
               this.error=false

        },
           sendFile(){
            //    console.log(this.file.name)
               for (let i=0; i<this.files.length; i++) {
                //    console.log(this.files[i].name)
              const formData = new FormData()
                formData.append('files',this.files[i])
            
                 
                try{
           Api().post('/admin/uploadFile',formData)
           .then(res=>{
            //    console.log(res)
               this.file='';
               this.message= res.data.message
                    this.error=false
                    // this.$router.push('/AllImages')

           })
           .catch(err=>{
                    // this.message=err.res.data.error
                    this.message="image was not uploaded successfully due to network"


           })

                }catch(err){
                    console.log(err)
                    this.error=true
                    // this.message=err.res.data.error

                    this.message="something went wrong"
                }}

        }
        // ...mapActions(['signIn']),
     }
}
</script>