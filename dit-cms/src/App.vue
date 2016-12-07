<template>
  <div>
    <sites></sites>
    <!--<layouts></layouts>-->
  </div>
</template>

<script>
//import Sites from './components/SitesDnD'
import TreeDraggable from './components/TreeDraggable'
import Sites from './components/SitesDraggable'
import Layouts from './components/Layouts'
import Page from './components/Page'
import draggable from 'vuedraggable'

const apiURL = 'https://raw.githubusercontent.com/uktrade/iigb-beta-structure/master/structure/'

export default {
  name: 'app',
  components: {
    Sites,
    Layouts,
    Page,
    draggable,
    TreeDraggable
  }
}
</script>

<style>
</style>
