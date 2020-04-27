<template>
  <div id="app">
    <Navbar/>

    <router-view class="h"/>
    <Footer />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import m from 'materialize-css'

export default {
  name: 'App',
  data(){
    return{

    }
  },
  components:{
    Navbar,
    Footer
    }
    ,
    mounted(){
    m.AutoInit()

  }
}
</script>

<style scoped>
.h{

    min-height: 100vh;
}
</style>
