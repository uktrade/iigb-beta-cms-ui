// src/auth/index.js
var Cookies = require('js-cookie');

// URL and endpoint constants
const LOGIN_URL = 'https://github.com/login/oauth/authorize'
const CLIENT_ID = '14e4bbb060c1924d9d78' //TODO move to server
const CALLBACK_URI = '/login' //TODO move to server
  // const SIGNUP_URL = API_URL + 'users/'
export default {

  // User object will let us check authentication status
  user: {
    authenticated: false
  },

  // user redirected to sign in via github
  login() {
    window.location = LOGIN_URL + '?client_id=' + CLIENT_ID;
  },

  // user's code is sent to our gatekeeper on github
  authenticate(context, code) {
    context.$http
      .get('https://iigb-beta-cms-gatekeeper.herokuapp.com/authenticate/' + code).then((data) => {

          if (data.body.token) {
            var token = data.body.token;
            Cookies.set('gh_token', token, {
              expires: 1
            });
          }
        },
        (data) => {
          console.log('error ' + data);
        })
  },

  // To log out, we just need to remove the token
  logout() {
    Cookies.remove('gh_token', {
      expires: 1
    });
    setTimeout(function() {
      window.location = "/login";
    }, 1000)
  },

  checkAuth() {
    if (Cookies.get('gh_token') != null) {
      return true;
    } else {
      return false;
    }
  },

  // The object to be passed as a header for authenticated requests
  getAuthHeader() {
    return {
      'Authorization': 'Bearer ' + Cookies.get('gh_token')
    }
  }
}
