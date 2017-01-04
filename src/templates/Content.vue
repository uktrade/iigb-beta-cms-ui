<template>
  <div class="container-fluid">
    <sidebar></sidebar>
    <contentpage></contentpage>
  </div>
</template>

<script>
  import Contentpage from '../components/Content'
  import Sidebar from '../components/Sidebar'

  export default {
    name: 'content',
    components: {
      Sidebar,
      Contentpage
    }
  }
</script>

<style scoped lang="scss">
</style>
