<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col-sm-6 col-md-4 col-md-offset-4">
          <div class="account-wall">
            <img class="profile-img"
                 src="../assets/img/logo.png"
                 alt="">
            <form class="form-signin">
              <a @click="submit()" class="btn btn-lg btn-primary btn-block social-signin" type="submit"> Sign in via
                Github</a>
            </form>
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
        auth.authenticate(this,code);
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

  /* FORM STYLES */

  .form-signin {
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
  }

  .form-signin .form-signin-heading, .form-signin .checkbox {
    margin-bottom: 10px;
  }

  .form-signin .checkbox {
    font-weight: normal;
  }

  .form-signin .form-control {
    position: relative;
    font-size: 16px;
    height: auto;
    padding: 10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .form-signin .form-control:focus {
    z-index: 2;
  }

  .form-signin input[type="text"] {
    margin-bottom: -1px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  .account-wall {
    margin-top: 140px;
    padding: 40px 0px 20px 0px;
    background-color: #f7f7f7;
    border: 0.1px solid black;
  }

  .login-title {
    color: #555;
    font-size: 18px;
    font-weight: 400;
    display: block;
  }

  .profile-img {
    width: 250px;
    height: 120px;
    margin: 0px 40px;
    display: block;
  }

  .need-help {
    margin-top: 10px;
  }

  .new-account {
    display: block;
    margin-top: 10px;
  }

  .social-signin {
    background-image: url("../assets/img/github.svg");
    background-size: 28px;
    background-repeat: no-repeat;
    background-position-x: 20px;
    background-position-y: 8px;
  }
</style>
