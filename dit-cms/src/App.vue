<template>
  <div>
    <sites></sites>
    <!--<layouts></layouts>-->
  </div>
</template>

<script>
import Sites from './components/Sites'
import Layouts from './components/Layouts'

const apiURL = 'https://raw.githubusercontent.com/uktrade/iigb-beta-structure/master/structure/'

export default {
  name: 'app',
  components: {
    Sites,
    Layouts
  }
}
</script>

<style>
</style>
