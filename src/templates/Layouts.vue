<template>
  <div class="container-fluid dit-cms-pages__container">
    <sidebar></sidebar>
    <sites></sites>
  </div>
</template>

<script>
  import Sites from '../components/SitesDraggable'
  import Sidebar from '../components/Sidebar'

  const apiURL = 'https://raw.githubusercontent.com/uktrade/iigb-beta-structure/master/structure/'

  export default {
    name: 'layout',
    components: {
      Sites,
      Sidebar
    }
  }
</script>

<style lang="scss">
</style>
