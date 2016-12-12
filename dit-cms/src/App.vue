<template>
  <div>
    <sites></sites>
    <!--<layouts></layouts>-->
  </div>
</template>

<script>
  import Sites from './components/SitesDraggable'
  import TreeDraggable from './components/TreeDraggable'
  import draggable from 'vuedraggable'
  import Page from './components/Page'
  import Layouts from './components/Layouts'

  const apiURL = 'https://raw.githubusercontent.com/uktrade/iigb-beta-structure/master/structure/'

  export default {
    name: 'app',
    components: {
      Sites,
      TreeDraggable,
      draggable,
      Page,
      Layouts
    }
  }
</script>

<style>
</style>
