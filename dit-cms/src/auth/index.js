// src/auth/index.js

// import {
//   router
// } from '../index'

// URL and endpoint constants
const API_URL = 'http://localhost:3001/'
const LOGIN_URL = 'https://github.com/login/oauth/authorize'
const CLIENT_ID = '14e4bbb060c1924d9d78' //TODO move to server
const CALLBACK_URI = 'http://localhost:8080/callback' //TODO move to server
  // const SIGNUP_URL = API_URL + 'users/'
export default {

  // User object will let us check authentication status
  user: {
    authenticated: false
  },

  // Send a request to the login URL and save the returned JWT
  // login(context, redirect) {
  //   context.$http.get(LOGIN_URL, (data) => {
  //     console.log(data)
  //     localStorage.setItem('id_token', data.id_token)

  //     this.user.authenticated = true

  //     // Redirect to a specified route
  //     if (redirect) {
  //       router.go(redirect)
  //     }

  //   }).error((err) => {
  //     context.error = err
  //   })
  // },
  // 
  // 
  login() {
    window.location = LOGIN_URL + '?client_id=' + CLIENT_ID + '&redirect_uri=' + CALLBACK_URI;
  },

  authenticate(context, code) {
    console.log("renn")
    console.log(context)
    context.$http
      .get('http://iigb-beta-cms-gatekeeper.herokuapp.com/authenticate/' + code).then((data) => {
          console.log(data);
        },
        (data) => {

        })
  },

  signup(context, creds, redirect) {
    context.$http.post(SIGNUP_URL, creds, (data) => {
      localStorage.setItem('id_token', data.id_token)

      this.user.authenticated = true

      if (redirect) {
        router.go(redirect)
      }

    }).error((err) => {
      context.error = err
    })
  },

  // To log out, we just need to remove the token
  logout() {
    localStorage.removeItem('id_token')
    this.user.authenticated = false
  },

  checkAuth() {
    var jwt = localStorage.getItem('id_token')
    if (jwt) {
      this.user.authenticated = true
    } else {
      this.user.authenticated = false
    }
  },

  // The object to be passed as a header for authenticated requests
  getAuthHeader() {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('id_token')
    }
  }
}
