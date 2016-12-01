<template>
  <div>
    <div>
      <label for="page-title" class="">
        Page title
      </label>
      <input id="page-title" type="text" v-model="model.data.pageTitle">
      <label for="page-url" class="">
        URL segment
      </label>
      <span v-if="model.data.path" style="border: .1px solid #ddd; padding: 3px 1px 1px; margin-right: 4px; font: 11px sans-serif">
        {{model.path}}
      </span>
      <input v-else id="page-url" type="text" v-model="model.path">
      <label for="page-layout" class="">
        Layout
      </label>
      <input id="page-layout" type="text" v-model="model.layout">
    </div>
    <div>
      <!--will this come from layout?-->
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
