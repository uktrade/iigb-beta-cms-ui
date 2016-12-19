<template>
  <div class="col-md-6">
    <div class="row">
      <div class="dit-selection-strip">
        <label for="layouts" class="">
          Layout
        </label>
        <br>
        <select name="" class="" id="layouts">
          <template v-if="defaultValue">
            <option value="defaultValue" disabled selected>
              {{defaultValue}}
            </option>
          </template>
          <template v-else>
            <option value="0-potential-layout" disabled selected>
              Please select one
            </option>
          </template>
          <template v-for="layout in layouts">
            <option v-if="layout.type === 'file'" :value="layout.name">
              {{ layout.name }}
            </option>
          </template>
        </select>
      </div>
      <div v-if="newPage">
        <p class="dit-selection-select">Select page template</p>
        <template v-for="layout in layouts">
          <div class="col-md-2 col-xs-4 layout-boxes">
            <template v-if="defaultValue">
              {{ layout.name }}
            </template>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  const apiURL = "https://api.github.com/repos/uktrade/iigb-beta-website/contents/src/templates"

  export default {
    name: 'layouts',
    props: ['defaultValue', 'newPage'],
    data () {
      return {
        layouts: null
      }
    },
    created: function () {
      this.fetchData()
    },

    watch: {
      //
    },

    methods: {
      fetchData: function () {
        var xhr = new XMLHttpRequest()
        var self = this
        xhr.open('GET', apiURL)
        xhr.onload = function () {
          self.layouts = JSON.parse(xhr.responseText)
        }
        xhr.send()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../assets/variables.scss";

  .dit-selection {
   &-strip {
     background-color: $whitesmoke;
     /*min-height: 80px;*/
     /*margin-bottom: 50px;*/
     select {
       height: 40px;
       width: 100%;
     }
   }

   &-select {
     margin-left: 40px;
     font-size: 16px;
   }
  }

  .dit-layout {
    &-dropdown {
      padding-top: 30px;
      padding-left: 35%;
    }

    &-boxes {
      border: 1px solid grey;
      height: 160px;
      margin-left: 12%;
      margin-top: 30px;
    }
  }

</style>
