<template>
  <div>
    <label for="layouts" class="">
      Layout
    </label>
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
</template>

<script>
  const apiURL = "https://api.github.com/repos/uktrade/iigb-beta-website/contents/src/templates"

  export default {
    name: 'layouts',
    props: ['defaultValue'],
    data () {
      return {
        layouts: null
      }
    },
    created: function () {
      this.fetchData()
    },

    watch: {
      //currentBranch: 'fetchData'
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
<style scoped>
</style>
