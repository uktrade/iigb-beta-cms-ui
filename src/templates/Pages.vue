<template>
  <div class="container-fluid">
    <sidebar></sidebar>
    <sites></sites>
  </div>
</template>

<script>
  import Sites from '../components/SitesDraggable';
  import Sidebar from '../components/Sidebar';

  export default {
    name: 'app',
    components: {
      Sites,
      Sidebar
    }
  }
</script>

<style lang="scss">
  @import "../assets/variables.scss";
  .container-fluid {
    padding: 0;
  }

  html,
  body {
    min-height: 100%;
  }
</style>
