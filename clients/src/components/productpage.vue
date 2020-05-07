<template>
    <div class="row">

<div class="row ">
    <div class="col s10 m6  l4">
        <div class=" card-image  s12">
            <img   class=' padding materialboxed img-responsive responsive-img'
             width="" 
              :src="image.url"
              alt=""></div>
    </div>
    <div class="col  padding l5">
                <h6>
        3 In 1 3A Super Fast Charging Cable Uslion Magnetic Charging Cable For Android IPhone Universal Charger Line Phone Accessories

                </h6>
                    <span>
1 Review
                    </span>
                    <span>
15 orders
                    </span>

<div class="divider "></div>
<div class="padding container row">
<span class="padding">
    <strong>${{image.price *qty}} </strong>
    </span> <br><span  class='padding' style="text-decoration:line-through;">${{image.price * 1.5 * qty }}</span><br>
    
     <span class="light-blue padding">
        -${{(image.price-(image.price /1.5))/image.price *100}}
     </span>

</div>
<div class="row">
    <div>
        <h6>shipped From:</h6>
    </div>
    <div class="row padding">
        <span class="btn white black-text">nigeria </span>
        <span class="btn white black-text">nigeria </span>
        <span class="btn white black-text">nigeria </span>
        <span class="btn white black-text">nigeria </span>
        <span class="btn white black-text">nigeria </span>
    </div>
</div>
<div class="row">
    <h6>Color:
        
    </h6>
    <div class="row">
        <div class="col l2">
            <div class="card">
                <div class="card-title">
            <img   class='materialboxed img-responsive responsive-img'
             width="110" 
              :src="image.url"
             
              alt="">
              

                </div>
            </div>
        </div>
       <div class="col l2">
            <div class="card">
                <div class="card-title">
            <img   class='materialboxed img-responsive responsive-img'
             width="110" :src="image.url"
             
              alt="">
              

                </div>
            </div>
        </div>
       <div class="col l2">
            <div class="card">
                <div class="card-title">
            <img   class='materialboxed img-responsive responsive-img'
             width="110" :src="image.url"
             
              alt="">
              

                </div>
            </div>
        </div>
       <div class="col l2">
            <div class="card">
                <div class="card-title">
            <img   class='materialboxed img-responsive responsive-img'
             width="110" :src="image.url"
             
              alt="">
              

                </div>
            </div>
        </div>
       <div class="col l2">
            <div class="card">
                <div class="card-title">
            <img   class='materialboxed img-responsive responsive-img'
             width="110" :src="image.url"
             
              alt="">
              

                </div>
            </div>
        </div>
       
    </div>
    <div class="divider "></div>
    <div class="row">
        <h6 class="qty">
        Quantity:
        </h6>
        <div class="l2  description col">
                      <div>
                          <br>
                            <span>
                          <i class="material-icons" @click="increase(qty)">add</i> 
                          
                                <strong>
                                    {{qty}}
                                </strong>

                          <i class="material-icons" @click="remove(qty)">remove</i> 
                            </span>
                      </div>
                  </div>
    </div>
    <div class="row">
        <h5 class="container">
            please select the country you want to ship it to <br>
        <div class="btn red " @click="addToCart">Add To Cart</div>
        <router-link to="/order" class="btn orange">
            By now
        </router-link>
        
        </h5>

    </div>
</div>
    </div>
    <div class="hide-on-med-and-down col l2">
        <h5>
        Recomended for you
    
    </h5>
            <div class="col l12">
            <div class="card">
                <div class="card-title">
            <img   class='materialboxed img-responsive responsive-img'
             width="220" src="http://res.cloudinary.com/ajibade/image/upload/v1588688372/files/r57caixhud0icpittxic.jpg"

              alt="">
                </div>
            </div>
        </div>
        <div class="col l12">
            <div class="card">
                <div class="card-title">
            <img   class='materialboxed img-responsive responsive-img'
             width="220" src="http://res.cloudinary.com/ajibade/image/upload/v1588688375/files/e9thva9iyjkw5doxqt5s.jpg"

              alt="">
                </div>
            </div>
        </div>
        <div class="col l12">
            <div class="card">
                <div class="card-title">
            <img   class='materialboxed img-responsive responsive-img'
             width="220"
             height="200"
              src="http://res.cloudinary.com/ajibade/image/upload/v1588688726/files/xtwqnwoealoktgcowhsk.jpg"

              alt="">
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
    props:['id'],
    data(){
        return{
image:'',
qty:'1'
        }
    },
    created(){
  Api().get(`/admin/getUploadedFile/${this.id}`).then(res=>{
    if(res.data.success) {
      this.image=res.data.image

    }
  })
},

methods:{
    addToCart(){
      let productDetail = {
          price : this.image.price,
          qty : this.qty,
      }
Api().post(`/users/order/${this.id}`,productDetail).then(res=>{
    if(res.data.success) {
      this.image=res.data.image

    }
  })

    },
    increase(id){
       id++
       this.qty = id++
        
    },
    remove(id){
        if(id>1) {
            id--

            this.qty = id

        }else{
        //   id--
       this.qty = id
        
        }
   
    }
}
}
</script>
<style scoped>
.description{
    margin-top:20px;
}
.padding{
    margin: 10px;
    margin-left: 10px;
}
.img{
    width:300px;
    height: 400px;
}
.qty{
    padding-left: 10px;
}
</style>