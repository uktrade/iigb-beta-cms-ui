<template>
  <div class="container-fluid dit-cms-pages__container">
    <sidebar></sidebar>
  </div>
</template>

<script>
  import Sidebar from '../components/Sidebar'

  export default {
    name: 'main',
    components: {
      Sidebar
    }
  }
</script>

<style src="assets/main.scss" lang="scss">
</style>
