import Vue from 'vue'
import VueRouter from 'vue-router'
import auth from './auth/'
import Login from './components/Login'
import Labels from './components/Labels'
import Logging from './components/Logging'
import Content from './components/Content'
import Media from './components/Media'
import Sites from './components/SitesDraggable';
import Sidebar from './components/Sidebar';

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
		components: {
		  default: Sidebar,
      content: Sites
    }
	}, {
		path: '/pages/layouts/new',
		name: 'layouts',
    components: {
      default: Sidebar,
      content: Sites
    }
	}, {
		path: '/content',
		name: 'content',
		components: {
      default: Sidebar,
      content: Content
    }
	}, {
		path: '/media',
		name: 'media',
		components: {
      default: Sidebar,
		  content: Media
    }
	}, {
		path: '/labels',
		name: 'labels',
		components: {
      default: Sidebar,
		  content: Labels
    }
	}]
})

if (process.env.NODE_ENV != "development") {
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
}

export const globalBus = new Vue()

new Vue({
	router,
	template: `
    <div id="app">
      <router-view class="view"></router-view>
      <router-view class="view" name="content"></router-view>
    </div>
  `
}).$mount('#app')
