<template>
  <div class="container-fluid dit-cms-pages__container">
    <sidebar></sidebar>
    <sites></sites>
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
    name: 'layout',
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

<style lang="scss">
</style>
