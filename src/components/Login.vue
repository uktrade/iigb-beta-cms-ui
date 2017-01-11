<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col-sm-6 col-md-4 col-md-offset-4">
          <div class="account-wall">
            <img class="profile-img"
                 src="../assets/img/logo.png"
                 alt="">
            <div class="button-wrap">
              <button @click="submit()" class="btn btn-lg btn-primary btn-block social-signin">
                Sign in via Github
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import auth from '../auth/index.js'

  const Vue = require('vue');
  const VueResource = require('vue-resource');
  Vue.use(VueResource);

  export default {
    data() {
      return {
        authenticated: auth.checkAuth(),
        error: ''
      }
    },
    methods: {
      submit() {
        auth.login();
      },
      authenticate(code){
        auth.authenticate(this, code);
        setTimeout(
          function(){ if(auth.checkAuth() == true){
          location.reload()
          }
        }
        ,1000);
      },
      logout(){
        auth.logout();
        setTimeout(function(){location.reload()},500);
      }
    }
  }

  </script>

<style scoped lang="scss">

  .account-wall {
    margin-top: 140px;
    padding: 40px 0px 20px 0px;
    background-color: #f7f7f7;
    border: 0.1px solid black;
  }

  .profile-img {
    width: 250px;
    height: 120px;
    margin: 0px 40px;
    display: block;
  }

  .social-signin {
    background-image: url("../assets/img/github.svg");
    background-size: 28px;
    background-repeat: no-repeat;
    background-position-x: 20px;
    background-position-y: 8px;
  }

  .button-wrap {
    padding: 24px 40px 0;
  }
</style>
