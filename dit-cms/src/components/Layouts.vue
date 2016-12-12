<template>
  <div>
      <label for="layouts" class="">
        Layouts
      </label>
      <select name="" class="" id="layouts">
        <option value="0-potential-layout" disabled selected>
          Please select one
        </option>
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
        console.log(self.layouts)
      }
      xhr.send()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
