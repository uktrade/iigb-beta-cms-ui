import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import Login from './templates/Login'
import Home from './templates/Home'
import Pages from './App'
import Layouts from './templates/Layouts'

Vue.use(VueRouter)

const Foo = {
	template: '<div>This is Foo</div>'
}
const Bar = {
	template: '<div>This is Bar {{ $route.params.id }}</div>'
}

const router = new VueRouter({
	mode: 'history',
	base: __dirname,
	routes: [{
		path: '/login',
		name: 'login',
		component: Login
	}, {
		path: '/home',
		name: 'home',
		component: Home
	}, {
		path: '/pages',
		name: 'pages',
		component: Pages
	}, , {
		path: '/pages/layouts/new',
		name: 'layouts',
		component: Layouts
	}, {
		path: '/content',
		name: 'content',
		component: Foo
	}, {
		path: '/media',
		name: 'media',
		component: Bar
	}]
})

new Vue({
	router,
	template: `
    <div id="app">
      <router-view class="view"></router-view>
    </div>
  `
}).$mount('#app')
