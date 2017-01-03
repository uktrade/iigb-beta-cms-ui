<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col-sm-6 col-md-4 col-md-offset-4">
          <h1>LOGGING YOU IN</h1>
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
      var code = window.location.href.match(/\?code=(.*)/)[1];
      auth.authenticate(this,code);
        setTimeout(
          function(){ if(auth.checkAuth() == true){
          location = '/pages'
          }}
          ,1000)
     },
    methods: {
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
    width: 96px;
    height: 96px;
    margin: 0 auto 10px;
    display: block;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
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
