<template>
  <div id="app">
    <!-- <body>  -->
  <Navbar/>
 <Error />
  <Success  />
    <router-view class="h"/>
    
    <Footer />
    <!-- </body> -->
  
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Success from './components/success.vue'
import Error from './components/error.vue'
import Footer from './components/Footer.vue'
import {mapGetters} from 'vuex'

import m from 'materialize-css'

export default {
  name: 'App',
  data(){
    return{

    }
  },
  computed:{
...mapGetters(["error","success"])
  },
  components:{
    Navbar,
    Footer,
    Error,
    Success

    }
    ,
    mounted(){
    m.AutoInit()
  //    $(document).ready(function(){
  //   $('select').formSelect();
  // });

  }
}
</script>

<style scoped>
.h{

    min-height: 100vh;
}
</style>
