<template>
  <div class="dit-cms-pages__form">
    <div class="form-group col-md-12">
      <label for="page-title" class="">
        Page title
      </label>
      <input id="page-title" class="form-control" type="text" v-model="model.data.pageTitle">
    </div>
    <div class="form-group col-md-12">
      <label for="page-url">
        URL segment
      </label>
      <br>
      <div v-if="model.path"
            class="fake-input">
        {{model.path}}
      </div>
      <input v-else
             id="page-url"
             class="form-control"
             type="text"
             v-model="model.path">
    </div>
    <div class="form-group col-md-12">
      <Layouts :defaultValue="model.layout"></Layouts>
    </div>
  </div>
  <!--     <div>
        will this come from layout?
      </div>
    </div> -->
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
<style lang="scss">
  .fake-input {
    width: 60%;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.83;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
</style>
