<template>
  <div>
    <div class="col-md-4 dit-cms-pages__index">
      <a href="/pages/layouts/new"><i class="glyphicon glyphicon-plus-sign dit-cms-pages__add-page"></i></a>
      <h1>Sites</h1>
      <template v-for="branch in branches">
        <div>
          <input type="radio"
                 :id="branch.code"
                 :value="branch"
                 name="branch.code"
                 v-model="currentBranch">
          <label :for="branch">{{branch.name}} {{branch.country}}</label>

          <div v-if='treeData && branch.code === currentBranch.code' class="row">
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
    <metadata :model="treeDataDetails"
              :content="inputEditor"></metadata>
  </div>
</template>

<script>
  import TreeDraggable from './TreeDraggable'
  import Page from './Page'
  import Modal from './Modal'
  import Editor from './MarkdownEditor'
  import Metadata from './Metadata'

  const structureURL = 'https://raw.githubusercontent.com/uktrade/iigb-beta-structure/master/structure/'
  const contentURL = 'https://raw.githubusercontent.com/uktrade/iigb-beta-content/master/content/'

  export default {
    name: 'sites',
    components: {
      TreeDraggable,
      Page,
      Modal,
      Editor,
      Metadata
    },
    data: function () {
      return {
        branches: [{code: 'zh_CN', name: 'Chinese', country: 'China'}, {
          code: 'en_IN',
          name: 'English',
          country: 'India'
        }, {code: 'en_INT', name: 'English', country: 'International'}, {
          code: 'en_US',
          name: 'English',
          country: 'United States'
        }, {code: 'de_DE', name: 'German', country: 'Germany'}],
        currentBranch: {code: 'en_US', name: 'English', country: 'United States'},
        treeData: null,
        treeDataDetails: null,
        english: true,
        disable: false,
        selected: null,
        inputEditor: null
      }
    },
    created: function () {
      this.fetchStructure()
    },
    watch: {
      currentBranch: 'fetchStructure',
    },
    methods: {
      fetchStructure: function () {
        const xhr = new XMLHttpRequest()
        const self = this
        xhr.open('GET', structureURL + self.currentBranch.code + '.json')
        xhr.onload = function () {
          const structure = JSON.parse(xhr.responseText)
          self.treeData = structure.pages[0].children
          self.treeDataDetails = structure.pages[0]
          self.english = structure.globalData.locale.language === 'en'
//          console.log(self.treeData)
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
<style scoped lang="scss">
  @import "../assets/variables.scss";

  .dit-cms-pages{

    &__index{
      /*margin-left: 200px;*/
      height: 1200px;
      background-color: $grey;
      overflow-x: scroll;
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
