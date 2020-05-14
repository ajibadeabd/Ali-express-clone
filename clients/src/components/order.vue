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

                <h4 class=" center-align col l8 offset-m2 offset-l2 offset-xl2 offset-s2 s8 m8 waves-light  waves-effect">
                       <PayPal
                       :amount="amount"
                       currency="USD"   blue
                        env="sandbox"
                       :client="credentials"
  
  >
</PayPal></h4>
            
                    </div>
            </div>
           
        </div>

    </div>
</div>
 <!-- <div class="row">
     <div class='col l6 m6 s6 offset-l3 offset-s3 offset-m3'>
                        <stripe-elements
      ref="elementsRef"
      :pk="'pk_test_TYooMQauvdEDq54NiTphI7jx'"
      :amount="finalProduct.overAllPrice"
      locale="eng"
      @token="tokenCreated"
      @loading="loading = $event"
    >
    </stripe-elements>
    <button @click="submit">Pay ${{finalProduct.overAllPrice}}</button>
              </div>
          </div>    -->
  <!-- <PayPal
  amount="10.00"
  currency="USD"
  :client="credentials"
  env="sandbox">
</PayPal> -->
  <div class="row">
      <div class="col s6 m6 l6 xl6">
          <!-- <PayPal
  :amount="amount"
  currency="USD"
  env="sandbox"
  :client="credentials"
  
  >
</PayPal> -->
      </div>
  </div>

    </div>
</template>
<script>
import Api from '../../config/Api'
// import { StripeElements } from 'vue-stripe-checkout'
// import { paypal } from 'vue-paypal-checkout'
import PayPal from 'vue-paypal-checkout'
export default {
    data(){
        return{
            credentials:{
                sandbox:'AQcHnnust9eEuaNZU_6B5btzQAspk2WgMzYqcajnGDYoeHPEtqR-4_H2GF02q_nAjBcDmWsuWK8tOtRK',
                production:'<>',
            },
        buy:true,
        items:'',
        orders:'',
        cartNumber:'',
        message:'',
        finalProduct:'',
    //     loading: false,
    amount: '',
    // publishableKey:'pk_test_TYooMQauvdEDq54NiTphI7jx', 
    // token: null,
    // charge: null,
    // description:'money'

        }

    },
    components:{
        // StripeElements,
        PayPal
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
                    this.amount= JSON.stringify(res.data.product.overAllPrice)
                    console.log(res.data.product.items)
                
                }
              
            
                    })

    },
    methods:{ 
    //       submit () {
    //   this.$refs.elementsRef.submit();
    // },
    // tokenCreated (token) {
    //   this.token = token;
    //   // for additional charge objects go to https://stripe.com/docs/api/charges/object
    //   this.charge = {
    //     source: token.id,
    //     amount: this.finalProduct.overAllPrice, // the amount you want to charge the customer in cents. $100 is 1000 (it is strongly recommended you use a product id and quantity and get calculate this on the backend to avoid people manipulating the cost)
    //     description: this.description // optional description that will show up on stripe when looking at payments
    //   }
    //   this.sendTokenToServer(this.charge);
    // },
    // sendTokenToServer (charge) {
    //     console.log(charge)
    //   // Send to charge to your backend server to be processed
    //   // Documentation here: https://stripe.com/docs/api/charges/create
  
    // },    
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
                 let data = {
                totalPrice:order.price*order.qty,
                qty:order.qty,
                status:'dec'

            }
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