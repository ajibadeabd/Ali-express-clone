<template>
<div>
   <!-- <div class="space row">
     <div class="col  s12 m6 l3 ">
       <div class="card h">
         <div class="card-content">

  
    
      <ul class="section table-of-contents">
        <li><a href="#introduction"><h5>My profile</h5></a></li>
        <li><a href="#introduction">My post</a></li>
        <li><a href="#introduction">Followers</a></li>
        <li><a href="#introduction">Following</a></li>
        <li><a href="#structure">Account settings</a></li>
        <li><a href="#initialization">Edit settings</a></li>
      </ul>

         </div>
       </div>
     </div>
<div class="col s12 m6 l9">
  <div class="card">
 <div class="row valign-wrapper">
            <div class="col s2">
              <img src="https://materializecss.com//images/yuna.jpg" alt="" class="circle responsive-img"> 
            </div>
            <div class="col s10">
              <span class="black-text">
                Ajibade  Abdullah {country.logo}
              </span> <br>
               <span class="black-text">
                 common say something
              </span> <br>
              <span class="col black-text">
                 
                   <span class="center">0</span> <br>
                   <span>Followers</span>
                 
              </span> 
              <span class=" col black-text">
                 
                   <span>0</span> <br>
                   <span>Following</span>
                 
              </span>
              
            </div>
          </div>
         
        
  </div>
</div>
   </div> -->
   <!-- <div class="row">
     <div class="col  s12 m6 l3">
       <div class="card">
         
           <ul class="section table-of-contents">
        <li><a href="#introduction"><h5>  My Cart express</h5></a></li>
           <li class="divider"></li>

        <li><a href="#introduction">Search Any where any Time</a></li>
           <li class="divider"></li>

        <li><a href="#introduction">Click to down load</a></li>
      
      </ul>
           
       </div>
     </div>
     <div class="col s12 m6 l9">
       <div class="card ">
        <div class="card-content">
          <h1>No post yet Add post soon on our App</h1>
        </div>
       </div>
     </div>
   </div> -->
    

      
    </div>
    
</template>
<script>
import Api from '../../config/Api' 
export default {
    data(){
        return {
            
        }
    },
    mounted(){
      document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.scrollspy');
    var instances = M.ScrollSpy.init(elems, options);
  });
    },
    created(){
       
    },
}
</script>
<style scoped>
.half{
background-image: url("https://upload.wikimedia.org/wikipedia/commons/3/35/Woman_selling_garri.jpg");
min-height: 1000px;
padding: 100px;
margin:5px 10px 20px 10px;
/* opacity:; */
}
.btn{
margin: 10px;
}
.searchInput{
  width: 40%;
}
.space{
margin:10px}
.h{
  /* min-height:%; */
  color: red;
}

</style>