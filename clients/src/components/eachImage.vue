<template>
    <div>

                <div class="row">
                            <div class="col xl5 l5 m5 s12 offset-xl1 offset-l1 offset-m1">
                                <div class="card-image">
                                     <img :src="imageUrl" class="responsive-img" alt="">
                            </div>
                                </div>
                            <div class="col xl5 l5 m5 s12 offset-xl1 offset-l1 offset-m1">
                    <form @submit.prevent="editImage">

                        <div class="card">
                            
                            <div class="form-field">
                                <label for="imagePrice">Price</label>
                                <input type="text" placeholder="Price" v-model="imagePrice">
                            </div> <br>
                            <div class="form-field">
                                <label for="imageName">Name</label>
                                <input type="text" placeholder="Name" v-model="imageName">
                            </div> <br>
                            <!-- <div class="form-field">
                                <label for="imageCategory">Category</label>
                                <input type="text" placeholder="Category" v-model="imageCategory">
                            </div> <br> -->
                            <div class="form-field">
                                <label for="imagePrice">Description</label>
                                <input type="text" placeholder="Description" v-model="imageDescription">
                            </div> <br>
                            <!-- <div class="form-field"> -->
                               
                                    <label for="Categories">Categories</label>
<!-- <input type="text" v-model='country' class="form-control"> -->
                            <div class="input-field">
        <select v-model="imageCategory" name="status">
          
            <option value="football">football</option>
            <option value="wears">wears</option>
            <option value="kids">Unpublished</option>
            <option value="accessories">accessories</option>
            <option value="electronics">shoe</option>
            <option value="electronics">electronics</option>
       
        </select>
      </div>
                            <!-- </div> -->
                            <div class="center form-field">

                                                    <button class="btn waves-effect waves-light"> save</button>
                                                                                                        </div> <br>
                        
                            
                        </div>
                    </form>

                    </div>
                    
                </div>

    </div>
</template>


<script>

import Api from '../../config/Api'
import M from 'materialize-css'
// import $ from 'jquery'


export default {
    props:['id'],
    data(){
        return{
            cat:'',
                imageUrl:'',
                imagePrice:'',
                imageName:'',
                imageCategory:'cat',
                imageDescription:''
        }
    },
    methods:{
        editImage(){

           let imageDetails={
                 name:this.imageName,
                 category:this.imageCategory,
                 description:this.imageDescription,
                 price:this.imagePrice,
            }
            Api().put(`/admin/editUploadedFile/${this.id}`,imageDetails )
                .then(res=>{
                    if(res.data.success){

                    }
            this.$router.push({name:'AllImages'})

                })

        },

    },
//    mounted(){
//     $(document).ready(function() {
//     $('select').material_select();
// });
// },

    created(){
         CKEDITOR.replace( 'body' ,{
         plugins:'wysiwygarea,toolbar,basicstyles,link'
     });
        
        Api().get(`/admin/getUploadedFile/${this.id}`)
        .then(res=>{
            if(res.data.success) {
                   this.imagePrice = res.data.image.price
                   this.imageCategory = res.data.image.category
                   this.imageDescription = res.data.image.description
                   this.imageName = res.data.image.name
                   this.imageUrl = res.data.image.url
            }
        }),
        Api().get(`/admin/getCategories`)
        .then(res=>{
            if (res.data.success) {
                    this.cat= res.data.cat
                    console.log(res.data.cat)
            }
        })

    }
}
</script>

<style scoped>

</style>