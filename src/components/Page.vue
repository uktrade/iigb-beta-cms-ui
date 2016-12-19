<template>
  <div class="dit-form">
    <div class="dit-form-group col-md-12">
      <Layouts :defaultValue="model.layout"></Layouts>
    </div>
    <div class="dit-form-group col-md-12">
      <label for="page-title" class="">
        Page title
      </label>
      <input id="page-title" class="form-control" type="text" v-model="model.data.pageTitle">
    </div>
    <div class="dit-form-group col-md-12">
      <label for="page-url">
        URL segment
      </label>
      <br>
      <div v-if="model.path"
           class="dit-fake-input">
        {{model.path}}
      </div>
      <input v-else
             id="page-url"
             class="form-control"
             type="text"
             v-model="model.path">
    </div>
  </div>
</template>

<script>
  import Layouts from './Layouts'

  export default {
    name: 'page',
    components: {
      Layouts
    },
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
<style scoped lang="scss">
  @import "../assets/variables.scss";

  .dit-form {
    margin-top: 60px;
  }

  .dit-form-group {
    margin-bottom: 40px;

    input {
      display: block;
      width: 60%;
      height: 40px;
    }
  }

  .dit-fake-input {
    width: 60%;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.83;
    color: #555;
    background-color: $invalid-input;
    background-image: none;
    border: 1px solid $modal-editor-border;
    border-radius: 4px;
  }
</style>
