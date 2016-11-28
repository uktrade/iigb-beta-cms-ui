<template>
  <div>
    <div>
      <label for="page-title" class="">
        Page title
      </label>
      <input id="page-title" type="text" v-model="model.pageTitle">
      <label for="page-url" class="">
        URL segment
      </label>
      <input id="page-url" type="text" v-model="model.url">
      <label for="page-layout" class="">
        Layout
      </label>
      <input id="page-layout" type="text" v-model="model.layout">
    </div>
    <div>
      <!--this will come from layout?-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'page',
  props: {
    model: Object
  },
  data: function () {
    return {
      //
    }
  },
  computed: {
    //
  },
  methods: {
    edit: function () {
      //
    },
    delete: function () {
      //
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
