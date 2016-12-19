<template>
  <div class="dit-cms-pages__form">
    <div class="form-group col-md-12">
      <label for="page-title" class="">
        Page title
      </label>
      <input id="page-title" class="form-control" type="text" v-model="model.data.pageTitle">
    </div>
    <div class="form-group col-md-12">
      <label for="page-url" class="">
        URL segment
      </label>
      <span v-if="model.path"
            style="border: .1px solid #ddd; padding: 4px 1px; margin-right: 4px; font: 14px sans-serif">
        {{model.path}}
      </span>
      <input v-else id="page-url" class="form-control" type="text" v-model="model.path">
      </div>
    <div class="form-group col-md-12">
      <label for="page-layout" class="">
        Layout
      </label>
      <input id="page-layout" class="form-control" type="text" v-model="model.layout">
    </div>
    </div>
<!--     <div>
      will this come from layout?
    </div>
  </div> -->
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
