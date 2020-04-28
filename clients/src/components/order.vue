<template>
    <div>
<div class="row">
    <div class="col  m12  l8">
    <div class="row">
        <div class="col m12 s12 l12">
            <div class=" padding  card ">
            <div class=" ">
                <h4>Shopping Cart (22)</h4>

            </div>
             
                 <!-- <form > -->
         <div class="">
      <p>
        <input type="checkbox"  v-model='buy1' class="container filled-in" id="filled-in-box">
        <label for="filled-in-box">Select All</label>
      </p>
    </div>
                 <!-- </form> -->

        </div>
        </div>
        <div class="col  m12 l12">
            <div class="card padding">
                    <ul>
            <li>
                    
    <span>
               
        <input type="checkbox" v-model='buy' class="container filled-in" id="filled-in-boxa">
        <label for="filled-in-boxa">Kord technology store</label>
      
    </span>
    <!-- <span class='center' >
       
                <i class="material-icons">message</i> Message
    </span> -->
    <span class='right' >
            <a class="blue-text" href="">Get coupon</a>
              


    </span>
            </li>
            <li>
            </li>
        </ul> 
     
              <div class="divider"></div>
            <!-- </div>.. -->
            <div class="row">
                  <div class="col s3 m3  l3">
                      <div class="padding" >
               <img   class='materialboxed img-responsive responsive-img'
             width=""
             :src='require("../../public/f7c18fd8-4b92-42df-9fe1-96734de0c8d7.jpg")'>
                      </div>
                  </div>
                  <div class="l7 m7 s7 description col">
                      <div class="">
                        <ul>
                          <li>description of product</li>

                            <li>US $26.72 </li>
                            <li class="linethrough">
                                US $37.64
                            </li>-29%
                            <li>
                          Shipping: US $10.11 via Singapore Post Estimated Delivery Time:22-43 Days>
                            </li>
                        </ul>
                      </div>
                  </div>
                  <div class="l2  description col">
                      <i class="material-icons ">delete</i>
                      <div>
                          <br>
                            <span>
                          <i class="material-icons">add</i> 4 <i class="material-icons">remove</i> 
                            </span>
                      </div>
                  </div>
              </div>
              <div class="row">
                  <button class="blur btn right ">buy from this seller</button>
              </div>
        </div>
    </div>
        
        </div>

    </div>
    
    <div class="col s12">
        <div class=" col m6 s6 l4">
        <div class="   padding card">

            <div class="card-image">

                <img class='materialboxed img-responsive responsive-img'
      height="654"

        
  :src='require("../../public/saved/bata1.png")'>
            </div>
            
            <div class="card-content">
                <h5 class="center">order summary</h5>
                shoe <span class="right">$ 30.83</span>
                <br>
                Subtotal <span class="right">$ 30.83</span>
                <br> 
                <strong>Total</strong><span class="right">$ 30.83</span> <br>
                    <div class="row">

                <h4 class="btn center-align col l4  s4 m4  blue waves-effect">Buy (1)</h4>
                <h4 class="btn center-align col l4  s4 m4  blue waves-effect">Buy (1)</h4>
                <h4 class="btn center-align col l4  s4 m4  blue waves-effect">Buy (1)</h4>

                    </div>
            </div>
           
        </div>
        

    </div>
     <div class="col  m6 s6 l4">
        <div class="   padding card">

            <div class="card-image">

                <img class='materialboxed img-responsive responsive-img'
      height="654"

        
  :src='require("../../public/saved/bata1.png")'>
            </div>
            
            <div class="card-content">
                <h5 class="center">order summary</h5>
                shoe <span class="right">$ 30.83</span>
                <br>
                Subtotal <span class="right">$ 30.83</span>
                <br> 
                <strong>Total</strong><span class="right">$ 30.83</span> <br>
                    <div class="row">

                <h4 class="btn center-align col l4 offset-m4 offset-l4 offset-s4 s4 m4  blue waves-effect">Buy (1)</h4>

                    </div>
            </div>
           
        </div>
        

    </div>
    </div>
</div>
<!-- <div>
   <ul class="collection with-header">
        <li class="collection-header center"><h4>LIST OF GOODS AVAILABLE IN NIGERIA</h4></li>
        <li class="collection-item">RICE</li>
        <li class="collection-item">Alvin</li>
        <li class="collection-item">Alvin</li>
        <li class="collection-item">Alvin</li>
      </ul>
    </div> -->

    </div>
</template>
<script>
export default {
    data(){
        return{
        buy:true,
        buy1:true,
        }

    }
}
</script>
<style scoped>
.padding{
    padding:20px;

}
    .description
{
    margin-top:20px;
}
.linethrough{
    text-decoration: line-through;
}
.static{
    position: fixed;
}
</style>