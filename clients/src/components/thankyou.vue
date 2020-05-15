<template>
  <div class=" row text-center">
    <h3>

      <p class="green lighten=text col l10 m10 s10 offset-s1 offset-m1 offset-l1 offset-xl1 xl10">
          You will recieve an Email  soon, Thank you !</p>
    </h3>
    <br>
     <div class="row">
         <div class="col">
             <router-link   to=/>
         Back to home
    </router-link>
         </div>
     </div>
      
      <!-- <router-link tag="a" :to="{name: 'home'}" class="btn btn-outline-primary">Back to Web site</router-link> -->
  </div>
</template>

<script>
export default {
    computed: {
        email() {
            return this.$store.getters.getCharge.email;
        }
    }
}
</script>

<style>

</style>
