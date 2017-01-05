import Vue from 'vue'
import VueRouter from 'vue-router'
import auth from './auth/'
import Login from './templates/Login'
import Labels from './templates/Labels'
import Logging from './templates/Logging'
import Pages from './templates/Pages'
import Layouts from './templates/Layouts'
import Content from './templates/Content'
import Media from './templates/Media'

Vue.use(VueRouter)

const router = new VueRouter({
	mode: 'history',
	base: __dirname,
	routes: [{
    path: '/',
    redirect: '/login'
    }, {
		path: '/login',
		name: 'login',
		component: Login
	}, {
		path: '/login/redirect',
		name: 'logging',
		component: Logging
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
		component: Labels
	}]
})

router.beforeEach((to, from, next) => {
	if (auth.checkAuth()) {
		next();
	} else {
		if (to.path != '/login' && to.path != '/login/redirect') {
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
