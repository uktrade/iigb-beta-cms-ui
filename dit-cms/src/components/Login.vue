  <!-- src/components/Login.vue -->

  <template>
    <div class="row">
    <div class="col-sm-4">
      <h2>Log In</h2>
      <div class="alert alert-danger" v-if="error">
        <p>{{ error }}</p>
      </div>
      <button class="btn btn-primary" @click="submit()">Login via Github</button>
      <button class="btn btn-primary" @click="authenticate()">Authenticate via Gatekeeper</button>
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
        // We need to initialize the component with any
        // properties that will be used in it
        // credentials: {
        //   username: '',
        //   password: ''
        // },
        error: ''
      }
    },
    methods: {
      submit() {
        console.log(this, window.location.pathname)
        // var credentials = {
        //   username: this.credentials.username,
        //   password: this.credentials.password
        // }
        // We need to pass the component's this context
        // to properly make use of http in the auth service
        auth.login()
      },
      authenticate(){
      
      if (window.location.href.match(/\?code=(.*)/) && window.location.href.match(/\?code=(.*)/)[1]){
      var code = window.location.href.match(/\?code=(.*)/)[1];
      console.log("here");
      auth.authenticate(this,code)
    }
    }
    }

  }
  </script>
