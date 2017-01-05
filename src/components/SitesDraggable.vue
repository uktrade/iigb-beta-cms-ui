<template>
  <div>
    <div class="col-md-4 dit-cms-pages__index" style="padding-top: 25px">
      <a href="/pages/layouts/new"><i class="fa fa-plus-circle dit-cms-pages__add-page"></i></a>
      <template v-for="(site, index) in sites">
        <div @click="defaultSite = index">
          <div class="site">
            <span class="fa fa-sitemap fa-lg"></span>
            {{site.name}} {{site.country}}
          </div>

          <div v-if='treeData && site.code === sites[defaultSite].code' class="row">
            <ul class="dit-cms-pages__files container-list drag">
              <Draggable :list="treeData">
                <TreeElement v-for="list in treeData"
                             :english="english"
                             v-bind:list="list"
                             @new-details="updateTree($event)"/>
                <!--<p>{{treeData}}</p>-->
              </Draggable>
            </ul>
          </div>
        </div>
      </template>
    </div>
    <metadata v-if="treeDataDetails" :model="treeDataDetails"
              :content="inputEditor"></metadata>
  </div>
</template>

<script>
  import Draggable from 'vuedraggable'
  import TreeElement from './TreeElement'
  import Metadata from './Metadata'

  const structureURL = 'https://raw.githubusercontent.com/uktrade/iigb-beta-structure/master/structure/'
  const contentURL = 'https://raw.githubusercontent.com/uktrade/iigb-beta-content/master/content/'

  export default {
    name: 'sites',
    components: {
      Draggable,
      TreeElement,
      Metadata
    },
    data: function () {
      return {
        sites: [{code: 'zh_CN', name: 'Chinese', country: 'China'}, {code: 'en_IN', name: 'English', country: 'India'}, {code: 'en_INT', name: 'English', country: 'International'}, {code: 'en_US', name: 'English', country: 'United States'}, {code: 'de_DE', name: 'German', country: 'Germany'}],
        defaultSite: 3,
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
      defaultSite: 'fetchStructure',
    },
    methods: {
      fetchStructure: function () {
        const xhr = new XMLHttpRequest()
        const self = this
        xhr.open('GET', structureURL + self.sites[self.defaultSite].code + '.json')
        xhr.onload = function () {
          const structure = JSON.parse(xhr.responseText)
          self.treeData = structure.pages[0].children
          self.treeDataDetails = structure.pages[0]
          self.english = structure.globalData.locale.language === 'en'
//          console.log(self.treeDataDetails)
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
      overflow-y: scroll;
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
  .site {
    margin-bottom: 8px;
    font-size: 20px;
    font-weight: 500;

    span {
      margin-right: 6px;
    }
  }
  .glyphicon {
    margin-right: 8px;
  }
</style>
