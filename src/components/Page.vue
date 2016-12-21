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
<style lang="scss">

@import "../assets/variables.scss";

.dit-cms-pages{
    &__container{
        background-color: $grey;
        min-height: 100%;
    }

    &__index{
        margin-left: 200px;
        height: 1200px;
        background-color: $grey;
    }

    &__files{
        & li{
        background-color: $grey !important;
        }
    }
    &__inputs{
        background-color: $white;
        height: 1200px;
    }
    &__form{
        margin-top:60px;

        input{
        display: block;
        width: 60%;
        height: 40px;
        }

        .form-group{
        margin-bottom: 40px;
        }

    }
    &__add-page{
        position: absolute;
        right: 0;
        margin-right: 20px;
        font-size: 30px;
        margin-top: 20px;
        color: white;
    }
}
</style>
