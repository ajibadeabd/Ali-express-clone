<template>
    <div>
<div class="main row">
    <div class="row card">
        <div class="card-image">
            <img src="../../public/first.jpg" class='materialboxed top img-responsive responsive-img' alt="">
        </div>
<!-- tabs -->
         <div class="row">
    <div class="col s12">
      <ul class="tabs">
        <li class="tab col s3"><a >Phone & Accessories</a></li>
        <li class="tab col s3"><a class="active" >Wears</a></li>
        <li class="tab col s3 "><a>Men shoes</a></li>
        <li class="tab col s3"><a >Fashion</a></li>
      </ul>
    </div>
    <!-- <div id="test1" class="col s12">Test 1</div>
    <div id="test2" class="col s12">Test 2</div>
    <div id="test3" class="col s12">Test 3</div>
    <div id="test4" class="col s12">Test 4</div> -->
  </div>
       
        
        
        <div class="row main">
          <div v-for="(image,index) in images" :key='index' class="col s6 m4 l3">

        <div class="   padding card">
            <div class="card-image">
                <img class='materialboxed img-responsive responsive-img'
      height="650"
   :src='image.url'>
            </div>
             <div class="card-content">
                 <div class="center row">
                <h4 class="btn  col white black-text  center-align s5 m5 l5  waves-effect">
                ${{image.price}}</h4>
                  <h4 class="btn  col white black-text  center-align s5 m5 l5  waves-effect">
                  <strike>  ${{image.price *1.5}}</strike></h4>
                 <router-link 
                   :to="{name:'productpage', params:{id:image._id}}">

                <h4 class="btn  col   center-align s10 m10 l10 blue waves-effect">buy</h4>

                  </router-link>

                   <!-- <router-link to="/order">
                <h4 class="btn  col   center-align s5 m5 l5 blue waves-effect">
                     Buy now
                </h4>
            
        </router-link> -->
                    </div>
            </div>
        </div>
    </div>
  
        </div>
    </div>
</div>
    </div>
</template>
<script>
import Api from '../../config/Api'
import m from 'materialize-css'

export default {
    data(){
        return{
images:''
        }
       
    },
          created(){
  Api().get('/admin/getUploadedFile').then(res=>{
    if(res.data.success) {
      this.images=res.data.images

    }
  })
},
   
}
</script>
<style scoped>
.main{
    background-color: rgb(255, 148, 123);
    background-position: 50% 0%;
}
.hh{
    min-height:50px ;
    margin: .1%;
    padding-top: 15px;
}
img{
  width: 420px ! important;
  height: 230px ! important;
}
.mm{
   width: 490px ! important;
  height: 730px ! important;
}
.mmm{
   height: 230px ! important;
  width: 900px ! important;
}

  .npm{
    padding: 0px ! important;
    margin: 0px ! important;
  }
 .smallImg{
   width: 70px ! important;
   height: 70px ! important;
   margin-top: 10px ! important;
 }
.smallPhone{
  width: 150px ! important ;
  height: 150px ! important ;

  
}
.top{
  width: 1900px ! important ;
  height: 300px ! important ;

  
}
</style>