<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col-sm-6 col-md-4 col-md-offset-4">
        <img src="../assets/img/spin.gif" class="animation">
          <h1>LOGGING YOU IN</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import auth from '../auth'

  const Vue = require('vue');
  const VueResource = require('vue-resource');
  Vue.use(VueResource);

  export default {
    data() {
      return {
        error: ''
      }
    },
    mounted() {
      let code = ''

      try {
        code = window.location.href.match(/\?code=(.*)/)[1];
        auth.authenticate(this, code);
        setTimeout(
          function(){
            if(auth.checkAuth() == true){
              location = '/pages'
            } else {
              location = '/login'
            }
          }
          ,2000)
      }catch(err){
        console.log(err);
        location = '/login'
      }
    },
    methods: {
    }
  }

</script>

<style scoped lang="scss">

.animation{
  height: 40px;
  width: 40px;
  margin-left: 35%;
}


</style>
