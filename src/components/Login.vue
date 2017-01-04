  <!-- src/components/Login.vue -->

  <template>
    <div class="container">
    <div class="row">
    <div class="col-sm-4">
      

    <div v-if="!authenticated">
      <h2>Log In</h2>
      </div>
      <div class="alert alert-danger" v-if="error">
        <p>{{ error }}</p>
      </div>
      <div v-if="!authenticated">
      <button class="btn btn-primary" @click="submit()">Login via Github</button>
      </div>
      <div v-if="authenticated">
      Logged In
      <br>
      <button class="btn btn-primary" @click="logout()">Logout</button>
      </div>
    </div>
    </div>
    </div>
  </template>

  <script>
  import auth from '../auth'

  var Vue = require('vue');
  var VueResource = require('vue-resource');
  Vue.use(VueResource);

  export default {
    data() {
      return {
        authenticated: auth.checkAuth(),
        error: ''
      }
    },
     mounted() {
      if (this.authenticated == false && window.location.href.match(/\?code=(.*)/)[1]){
        console.log("mounted");
        var code = window.location.href.match(/\?code=(.*)/)[1];
        this.authenticate(code);
      }
     },
    methods: {
      submit() {
        auth.login();
      },
      authenticate(code){
        auth.authenticate(this,code);
        setTimeout(
          function(){ if(auth.checkAuth() == true){
          location.reload()
          }}
          ,1000);
      },
      logout(){
        auth.logout();
        setTimeout(function(){location.reload()},500);
      }
    }
  }

  </script>
