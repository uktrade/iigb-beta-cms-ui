<template>
  <div>
    <div class="row">
      <div class="col-md-4 dit-cms-pages__index">
      <i class="glyphicon glyphicon-plus-sign dit-cms-pages__add-page"></i>
        <h1>Sites</h1>
        <template v-for="branch in branches">
          <div>
            <input type="radio"
                   :id="branch"
                   :value="branch"
                   name="branch"
                   v-model="currentBranch">
            <label :for="branch">{{ branch }}</label>

            <div v-if='treeData && branch === currentBranch' class="row">
              <ul class="dit-cms-pages__files container-list drag">
                <template v-for="list in treeData">
                  <TreeDraggable :list="list"
                                 :english="english"
                                 @new-details="updateTree($event)">
                  </TreeDraggable>
                </template>
              </ul>
            </div>
          </div>
        </template>
      </div>
      <div class="col-md-6 dit-cms-pages__inputs">
        <page v-if="treeDataDetails" :model="treeDataDetails">
        </page>

        <button id="show-modal" @click="fetchContent(treeDataDetails.data.pageHeader.content)">Edit</button>
        <!-- use the modal component, pass in the prop -->
        <modal v-if="showModal"
               @close="showModal = false"
               :value="treeDataDetails"
               :model="inputEditor">
          <!--{{console(inputEditor)}}-->
          <!--
     you can use custom content here to overwrite
     default content... markdown maybe???
   -->
          <h3 slot="header">{{treeDataDetails.data.pageHeader.content}}</h3>
          <Editor slot="body" :content="inputEditor.content"></Editor>
        </modal>
      </div>
    </div>
</template>

<script>
  import TreeDraggable from './TreeDraggable'
  import Page from './Page'
  import Modal from './Modal'
  import Editor from './MarkdownEditor'

  const structureURL = 'https://raw.githubusercontent.com/uktrade/iigb-beta-structure/master/structure/'
  const contentURL = 'https://raw.githubusercontent.com/uktrade/iigb-beta-content/master/content/'

  export default {
    name: 'sites',
    components: {
      TreeDraggable,
      Page,
      Modal,
      Editor
    },
    data: function () {
      return {
        branches: ['de_DE', 'en_IN', 'en_INT', 'en_US', 'zh_CN'],
        currentBranch: 'en_US',
        treeData: null,
        treeDataDetails: null,
        english: true,
        disable: false,
        selected: null,
        showModal: false,
        inputEditor: null
      }
    },

    created: function () {
      this.fetchStructure()
    },

    watch: {
      currentBranch: 'fetchStructure',
//      inputEditor: 'fetchContent'
    },

    methods: {
      fetchStructure: function () {
        const xhr = new XMLHttpRequest()
        const self = this
        xhr.open('GET', structureURL + self.currentBranch + '.json')
        xhr.onload = function () {
          const structure = JSON.parse(xhr.responseText)
          self.treeData = structure.pages[0].children
          self.treeDataDetails = structure.pages[0]
          self.english = structure.globalData.locale.language === 'en'
          //console.log(self.treeData)
        }
        xhr.send()
      },
      fetchContent: function (url) {
        const xhr = new XMLHttpRequest()
        const self = this
        xhr.open('GET', contentURL + url)
        xhr.onload = function () {
          const content = xhr.responseText
          self.inputEditor = {content: content}
          self.showModal = true
//          console.log(content)
        }
        xhr.send()
      },
      updateTree: function (model) {
        this.treeDataDetails = model
      },
      console(some) {
        console.log(some)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css">

</style>
