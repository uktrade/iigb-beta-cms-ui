import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './templates/Login'
import Logging from './templates/Logging'
import Home from './templates/Home'
import Pages from './templates/Pages'
// import Pages from './App'
import Layouts from './templates/Layouts'
import Content from './templates/Content'
import Media from './templates/Media'
import auth from './auth/index.js'



Vue.use(VueRouter)

const router = new VueRouter({
	mode: 'history',
	base: __dirname,
	routes: [{
		path: '/login',
		name: 'login',
		component: Login
	}, {
		path: '/login/redirect',
		name: 'logging',
		component: Logging
	}, {
		path: '/home',
		name: 'home',
		component: Home
	}, {
		path: '/pages',
		name: 'pages',
		component: Pages
	}, {
		path: '/pages/layouts/new',
		name: 'layouts',
		component: Layouts
	}, {
		path: '/content',
		name: 'content',
		component: Content
	}, {
		path: '/media',
		name: 'media',
		component: Media
	}, {
		path: '/labels',
		name: 'labels',
		component: Home
	}]
})

router.beforeEach((to, from, next) => {
	console.log(to)
	console.log(from)
	if (auth.checkAuth()) {
		next();
	} else {
		if (to.path != '/login') {
			next('/login')
		}
		next()
	}
})


new Vue({
	router,
	template: `
    <div id="app">
      <router-view class="view"></router-view>
    </div>
  `
}).$mount('#app')
