<template>
  <div class="container-fluid">
    <sidebar></sidebar>
    <mediapage></mediapage>
  </div>
</template>

<script>
  import Mediapage from '../components/Media'
  import Sidebar from '../components/Sidebar'

  export default {
    name: 'media',
    components: {
      Sidebar,
      Mediapage
    }
  }
</script>

<style scoped lang="scss">
</style>
