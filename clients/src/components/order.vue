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
                <div v-if="!finalProduct.items" class="row s12   m12 l12">
                    <div class="col s12 m12 l12 xl12">
                    <h3 class='center'>
                        No item in cart
                    </h3>

                    </div>
                </div>
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
          <i class="material-icons " @click="deleteOrder(final.id,final)">delete</i>
          
          <div>
              <br>
                <span>
              <i class="material-icons" @click='increase(final)'>
                  add</i>{{final.qty}}
                  <i  class="material-icons"  @click='remove(final)' >remove</i> 
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
        <div  v-if="finalProduct.items"  class="  padding card">
            <div class="card-content">
                <h5 class="center">order summary</h5>
                <div v-for="(final,index) in finalProduct.items" 
                :key='index'>
                {{final.item.name}} <span class="right">${{final.totalPrice}}</span>
                <br>
                    
                </div>
               
               
                <strong>Total</strong><span class="right">$ {{finalProduct.overAllPrice}}</span> <br>
                    <div class="row">
                        
                        <h4 
                        class=" center-align col l8 offset-m2 offset-l2 offset-xl2 offset-s2 s8 m8 waves-light  waves-effect">
                        <div  v-if="finalProduct.overAllPrice" class='input-field'>
                            <input type="email" placeholder="customer email" v-model="email"></div>
                        
                        </h4>

                <h4  v-if="finalProduct.overAllPrice && email" class=" center-align col l8 offset-m2 offset-l2 offset-xl2 offset-s2 s8 m8 waves-light  waves-effect">
                      <paystack
        :amount="amount*100"
        :email="email"
        :paystackkey="paystackkey"
        :reference="reference"
        :callback="callback"
        :close="close"
        :embed="false"
    >
       <i class="fas fa-money-bill-alt"></i>
       <i class="material-icons">money</i>
       Make Payment
    </paystack>
                      
                      
</h4>
            
                    </div>
            </div>
           
<div v-if="finalProduct.overAllPrice" class="center">
    For testing purpose <br>
    Card Number: 5060 6666 6666 6666 666 (Verve)
Expiry Date: any date in the future
CVV: 123
PIN: 1234
OTP: 123456
</div>
        

        </div>

    </div>
</div>
 

    </div>
</template>
<script>
import Api from '../../config/Api'
// import { StripeElements } from 'vue-stripe-checkout'
// import { paypal } from 'vue-paypal-checkout'
import paystack from 'vue-paystack';
// import PayPal from 'vue-paypal-checkout'
export default {
    data(){
        return{
            paystackkey: "pk_test_362c609bb144252cb169b991e539a4458663c06b", //paystack public key
          email: "", // Customer email
          amount:0, // in kobo,
        items:'',
        orders:'',
        cartNumber:'',
        message:'',
        finalProduct:'',
    //     loading: false,
    // amount: '',
    // publishableKey:'pk_test_TYooMQauvdEDq54NiTphI7jx', 
    // token: null,
    // charge: null,
    // description:'money'

        }

    },
    components:{
        // StripeElements,
        // PayPal
        paystack
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
                    this.amount= res.data.product.overAllPrice
                    console.log(res.data.product.items)
                
                }
              
            
                    })

    },
    computed: {
      reference(){
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
 
        for( let i=0; i < 10; i++ )
          text += possible.charAt(Math.floor(Math.random() * possible.length));
 
        return text;
      }
    },
    methods:{ 
        callback(response){
            
let responses={
    response:response,
    email:this.email
}

        // console.log(response)
         Api().post(`/users/order`,responses)
         .then(res=>{
            //  console.log(res)
            if(res.data.success &&  res.data.message){
                    console.log(res.data.message)
            }
            this.$router.push('/success')

         })
        
      },
      close: function(){
          console.log("Payment closed")
      },
       
        deleteOrder(order_id,tp){
            let total={
                totalPrice:tp.totalPrice,
                qty:tp.qty
                }
              Api().post(`/users/orderm/${order_id}`,total).then(res=>{
    if(res.data.success) {
                    this.finalProduct=res.data.product
    }
  })
        },
        increase(product){
            // product.qty++
            let data = {
                qty:product.qty,
                price:product.price,
                status:'inc'

            }
            this.updateOrder(product,data)
        },
        remove(product){

            if (product.qty<=1){
                console.log('order')

            
            // this.updateOrder(id,data)

            }else{
                // product.qty--
            let data = {
                qty:product.qty,
                price:product.price,
               
                status:'dec'



            }
            this.updateOrder(product,data)

            }
            
        },
//         // /orderUpdate/:id
       updateOrder(product,data){
              Api().put(`/users/orderUpdate/${product.id}`,data).then(res=>{
    if(res.data.success) {
         this.finalProduct=res.data.product
         this.items= res.data.product.items

    }
  })
        },
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