<template>
  <div class="container-fluid dit-cms-pages__container">
    <sidebar></sidebar>
    <labels></labels>
  </div>
</template>

<script>
  import Sidebar from '../components/Sidebar'
  import Labels from '../components/Labels'

  export default {
    name: 'main',
    components: {
      Sidebar,
      Labels
    }
  }
</script>

<style lang="scss">
</style>
