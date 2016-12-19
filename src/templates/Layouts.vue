<template>
  <div class="container-fluid dit-cms-pages__container">
    <sidebar></sidebar>
    <sites></sites>
    <layouts></layouts>
  </div>
</template>

<script>
  import Sites from '../components/SitesDraggable'
  import TreeDraggable from '../components/TreeDraggable'
  import draggable from 'vuedraggable'
  import Page from '../components/Page'
  import Layouts from '../components/Layouts'
  import Sidebar from '../components/Sidebar'

  const apiURL = 'https://raw.githubusercontent.com/uktrade/iigb-beta-structure/master/structure/'

  export default {
    name: 'app',
    components: {
      Sites,
      TreeDraggable,
      draggable,
      Page,
      Sidebar,
      Layouts
    }
  }
</script>

<style src="assets/main.scss" lang="scss">
</style>
