import Vue from 'vue'
import App from './App'
import vueDragAndDropList from './vue-drag-and-drop-list';

Vue.use(vueDragAndDropList);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
