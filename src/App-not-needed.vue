<template>
  <div class="container-fluid">
    <sidebar></sidebar>
    <sites></sites>
  </div>
</template>

<script>
  import Sites from './components/SitesDraggable'
  import draggable from 'vuedraggable'
  import Layouts from './components/Layouts'
  import Sidebar from './components/Sidebar'

  export default {
    name: 'app',
    components: {
      Sites,
      draggable,
      Sidebar,
      Layouts
    }
  }
</script>

<style lang="scss">
  @import "./assets/variables.scss";
  .container-fluid {
    padding: 0;
  }

  html,
  body {
    min-height: 100%;
  }
</style>
