<template>
  <div class="row">
    <div v-if="newPage" class="col-md-12">
      <p class="dit-selection-select">Select page template</p>
      <div class="row">
        <template v-for="layout in layouts">
          <template v-if="layout.type === 'file'">
            <div class="col-md-3 dit-layout-boxes">
              {{ layout.name }}
            </div>
          </template>
        </template>
      </div>
    </div>
    <div class="col-md-6">
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
    </div>
  </div>
</template>

<script>
  const apiURL = "https://api.github.com/repos/uktrade/iigb-beta-website/contents/src/templates"

  export default {
    name: 'layouts',
    props: ['defaultValue', 'newPage'],
//    props: ['defaultValue'],
    data () {
      return {
        layouts: null,
//        newPage: false
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
        const xhr = new XMLHttpRequest()
        let self = this
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
     margin-top: 50px;
  /*min-height: 80px;*/
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
     margin-left: 5%;
     margin-top: 10px;
   }
  }
</style>
