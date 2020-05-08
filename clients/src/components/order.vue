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
         <div class="">
      <p>
        <input type="checkbox"  v-model='buy' class="container filled-in" id="filled-in-box">
        <label for="filled-in-box">Select All</label>
      </p>
    </div>
                 <!-- </form> -->

        </div>
        </div>
        <div v-for="(order,index) in orders" :key='index' class="col  m12 l12">
            <div class="card padding">
                    <ul>
            <li>
                    
    <span>
               
        <input type="checkbox" class="container filled-in" :id="order._id">
        <label :for="order._id">Kord technology store</label>
      
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
             :src='order.image'>
                      </div>
                  </div>
                  <div class="l7 m7 s7 description col">
                      <div class="">
                        <ul>
                          <li>description of product</li>

                           price:<span>{{order.price}} </span> <br>
                          Total price:<span>{{order.totalPrice}} </span> 

                            <li class="linethrough">
                                {{order.price  * 1.5}}
                            </li>-29%
                            <li>
                          Shipping: US $10.11 via Singapore Post Estimated Delivery Time:22-43 Days>
                            </li>
                        </ul>
                      </div>
                  </div>
                  <div class="l2  description col">
                      <i class="material-icons " @click="deleteOrder(order._id)">delete</i>
                      <div>
                          <br>
                            <span>
                          <i class="material-icons" @click='increase(order,order._id)'>
                              add</i>{{order.qty}}
                              <i  class="material-icons"  @click='remove(order,order._id)' >remove</i> 
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
    
    <div class="col  m12 s12 l4">
        <div class="   padding card">
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
        allProductPrice:'',

        }

    },
    created(){
        Api().get(`/users/order`).then(res=>{
    if(res.data.success) {
        this.orders=res.data.products
        this.cartNumber=res.data.cart

    }
  })
    },
    methods:{     
        deleteOrder(order_id){
              Api().delete(`/users/order/${order_id}`).then(res=>{
    if(res.data.success) {
          this.orders=res.data.products
        this.cartNumber=res.data.cart
        this.cartNumber=this.cartNumber

    }
  })
        },
        placeOrder(){
            
        },
        increase(order,id){
            order.qty++
            let data = {
                qty:order.qty,
                totalPrice:order.price*order.qty
            }
            this.updateOrder(id,data)
        },
        remove(order,id){
            if (order.qty<=1){
                 let data = {
                totalPrice:order.price*order.qty,
                qty:order.qty
            }
            this.updateOrder(id,data)

            }else{
                order.qty--
            let data = {
                totalPrice:order.price*order.qty,
                qty:order.qty
            }
            this.updateOrder(id,data)

            }
            
        },
        // /orderUpdate/:id
       updateOrder(order_id,data){
              Api().put(`/users/orderUpdate/${order_id}`,data).then(res=>{
    if(res.data.success) {
          this.orders=res.data.products
        this.cartNumber=res.data.cart
        this.cartNumber=this.cartNumber

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