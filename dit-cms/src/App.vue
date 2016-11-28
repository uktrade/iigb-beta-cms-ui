<template>
  <div>
    <sites></sites>
    <!--<layouts></layouts>-->
  </div>
</template>

<script>
import Sites from './components/Sites'
import Layouts from './components/Layouts'
import Page from './components/Page'

const apiURL = 'https://raw.githubusercontent.com/uktrade/iigb-beta-structure/master/structure/'

export default {
  name: 'app',
  components: {
    Sites,
    Layouts,
    Page
  }
}
</script>

<style>
</style>
