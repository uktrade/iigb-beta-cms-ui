<template>
  <div>
    <h1>Sites</h1>
    <template v-for="branch in branches">
      <div>
        <input type="radio"
               :id="branch"
               :value="branch"
               name="branch"
               v-model="currentBranch">
        <label :for="branch">{{ branch }}</label>
        <ul v-if='treeData && branch === currentBranch'>
          <tree class="tree"
                :english="english"
                :model="treeData">
          </tree>
        </ul>
      </div>
    </template>
    <p>(You can double click on an item to turn it into a page.)</p>
  </div>
</template>

<script>
import Tree from './Tree'

var apiURL = 'https://raw.githubusercontent.com/uktrade/iigb-beta-structure/master/structure/'

export default {
  name: 'sites',
  components: {
    Tree
  },
  data: function () {
    return {
      branches: ['de_DE', 'en_IN', 'en_INT', 'en_US', 'zh_CN'],
      currentBranch: 'en_US',
      treeData: null,
      english: true
    }
  },

  created: function () {
    this.fetchData()
  },

  watch: {
    currentBranch: 'fetchData'
  },

  methods: {
    fetchData: function () {
      var xhr = new XMLHttpRequest()
      var self = this
      xhr.open('GET', apiURL + self.currentBranch + '.json')
      xhr.onload = function () {
        var structure = JSON.parse(xhr.responseText)
        self.treeData = structure.pages[0]
        self.english = structure.sharedMeta.locale.language === 'en'
        // console.log(self.treeData)
      }
      xhr.send()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
