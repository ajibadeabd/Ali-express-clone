<template>
    <div>
<div class="row">
    <div class="col  m12  l8">
    <div class="row">
        <div class="col m12 s12 l12">
            <div class=" padding  card ">
            <div class=" ">
                <h4>Shopping Cart ({{cartNumber}})</h4>

            </div>
             
                 <!-- <form > -->
         <!-- <div class="">
      <p>
        <input type="checkbox"  v-model='buy' class="container filled-in" id="filled-in-box">
        <label for="filled-in-box">Select All</label>
      </p>
    </div> -->
                 <!-- </form> -->

        </div>
        </div>
        <!-- <div v-for="(final,index) in finalProduct.items" 
                :key='index'>
                {{final.item.name}} <span class="right">${{final.totalPrice}}</span>
                <br>
                    
                </div> -->
                <div v-for="(final,index) in finalProduct.items" 
                :key='index' class="col  m12 l12">
<div class="card padding">
        <ul>
<li>{{final.length}}
        
<span>
   
<!-- <input type="checkbox" class="container filled-in" @click='placeOrder(order._id)' :id="final.id"> -->
<label :for="final.id">Kord technology store</label>

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
      <div class="col s7 m5  l3">
          <div class="padding" >
   <img   class='materialboxed img-responsive responsive-img'
 width=""
 :src='final.item.image'>
          </div>
      </div>
      <div class="l7 m7 s7 description col">
          <div class="">
            <ul>
              <li>description of product</li>

               price:<span>{{final.price}} </span> <br>
              Total price:<span>{{final.totalPrice}} </span> 

                <li class="linethrough">
                    {{final.price  * 1.5}}
                </li>-29%
                <li>
              Shipping: US $10.11 via Singapore Post Estimated Delivery Time:22-43 Days>
                </li>
            </ul>
          </div>
      </div>
      <div class="l2  description col">
          <i class="material-icons " @click="deleteOrder(final.id,final.totalPrice)">delete</i>
          
          <div>
              <br>
                <span>
              <i class="material-icons" @click='increase(final.id)'>
                  add</i>{{final.qty}}
                  <i  class="material-icons"  @click='remove(final.id)' >remove</i> 
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
    
    <div class="col   m12 s12 l4">
        <div class="  padding card">
            <div class="card-content">
                <h5 class="center">order summary</h5>
                <div v-for="(final,index) in finalProduct.items" 
                :key='index'>
                {{final.item.name}} <span class="right">${{final.totalPrice}}</span>
                <br>
                    
                </div>
               
               
                <strong>Total</strong><span class="right">$ {{finalProduct.overAllPrice}}</span> <br>
                    <div class="row">

                <h4 class="btn center-align col l4 offset-m4 offset-l4 offset-s4 s4 m4  blue wa
                ves-effect">Buy (1)</h4>

                    </div>
            </div>
           
        </div>

    </div>
</div>

    </div>
</template>
<script>
import Api from '../../config/Api'
export default {
    data(){
        return{
        buy:true,
        orders:'',
        cartNumber:'',
        message:'',
        finalProduct:'',

        }

    },
    created(){
        Api().get(`/users/order`).then(res=>{
    if(res.data.success) {
        this.orders=res.data.products
        // this.cartNumber=res.data.cart
    }
   
  }),
  
       Api().get('/users/allOrder').then(res=>{
                if(res.data.product) {
                    this.finalProduct=res.data.product
                    this.cartNumber=res.data.length
                    console.log(res.data.product.items)
                
                }
              
            
                    })

    },
    methods:{     
        deleteOrder(order_id,tp){
            let total={totalPrice:tp}
              Api().delete(`/users/order/${order_id}`,total).then(res=>{
    if(res.data.success) {
          this.orders=res.data.products
        this.cartNumber=res.data.cart
        this.cartNumber=this.cartNumber

    }
  })
        },
//         placeOrder(order_id){
//             if (document.getElementById(`${order_id}`).checked) {
//                              Api().get(`/users/orderToCart/${order_id}`).then(res=>{
//                 if(res.data.success) {
//                     this.finalProduct=res.data.product
//                 }
            
//             })
//             }else{
//                            Api().get(`/users/deleteFromCart/${order_id}`).then(res=>{
//                 if(res.data.success) {
//                     this.finalProduct=res.data.product
//                 }
            
//             })
//             }
           
            
//         },
//         increase(order,id){
//             order.qty++
//            let check= document.getElementById(`${id}`).checked
//             let data = {
//                 qty:order.qty,
//                 totalPrice:order.price*order.qty,
//                 check:check,
//                 status:'inc'

//             }
//             this.updateOrder(id,data)
//         },
//         remove(order,id){
//            let check= document.getElementById(`${id}`).checked

//             if (order.qty<=1){
//                  let data = {
//                 totalPrice:order.price*order.qty,
//                 qty:order.qty,
//                 status:'dec'

//             }
//             // this.updateOrder(id,data)

//             }else{
//                 order.qty--
//             let data = {
//                 totalPrice:order.price*order.qty,
//                 qty:order.qty,
//                 check:check,
//                 status:'dec'



//             }
//             this.updateOrder(id,data)

//             }
            
//         },
//         // /orderUpdate/:id
//        updateOrder(order_id,data){
//               Api().put(`/users/orderUpdate/${order_id}`,data).then(res=>{
//     if(res.data.success) {
//           this.orders=res.data.products
//         this.cartNumber=res.data.cart
//         this.cartNumber=this.cartNumber

//     }
//   })
//         },
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