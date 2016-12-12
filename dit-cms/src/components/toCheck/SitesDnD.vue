<template>
  <div>
    <h1>Sites</h1>
    <template v-for="branch in branches" class="col-md-5">
      <div>
        <input type="radio"
               :id="branch"
               :value="branch"
               name="branch"
               v-model="currentBranch">
        <label :for="branch">{{ branch }}</label>
        <!--<ul v-if='treeData && branch === currentBranch'>-->
          <!--<tree class="tree"-->
                <!--:english="english"-->
                <!--:model="treeData"-->
                <!--@new-details="updateTree($event)">-->
          <!--</tree>-->
        <!--</ul>-->
        <div v-if='treeData && branch === currentBranch' v-for="list in treeData" class="row">
          <ul class="panel-body container-list col-md-5"
              v-dnd-list='{dndList: list,
                           dndInserted: "inserted",
                           dndEffectAllowed: "move",
                           dndDisableIf: false,
                           dndExternalSources: true}'>
            <list v-if="item.data" v-for="(item, index) in list" :item="item" :list="list" :index="index" :disable.sync="disable">
            </list>
          </ul>
        </div>
      </div>
    </template>
    <p>(You can double click on an item to turn it into a page.)</p>
    <div>
      <page v-if="treeDataDetails" :model="treeDataDetails">
      </page>
    </div>
  </div>
</template>

<script>
import Tree from './Tree'
import Page from '../Page'
import List from './List'

const apiURL = 'https://raw.githubusercontent.com/uktrade/iigb-beta-structure/master/structure/'

export default {
  name: 'sites',
  components: {
    Tree,
    Page,
    List
  },
  data: function () {
    return {
      branches: ['de_DE', 'en_IN', 'en_INT', 'en_US', 'zh_CN'],
      currentBranch: 'en_US',
      treeData: null,
      treeDataDetails: null,
      english: true,
      disable: false,
      selected: null
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
        self.treeData = structure
        self.treeDataDetails = structure.pages[0]
        self.english = structure.globalData.locale.language === 'en'
        console.log(self.english)
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
  /**
  SitesDnD
 * For the correct positioning of the placeholder element, the dnd-list and
 * it's children must have position: relative
 */
  ul.container-list
  ul.container-list > li {
    position: relative;
    min-height: 40px;
  }
  /**
   * The container-list should always have a min-height,
   * otherwise you can't drop to it once it's empty
   */
  ul.container-list {
    padding-left: 0px;
  }
  /**
   * The dndDraggingSource class will be applied to
   * the source element of a drag operation. It makes
   * sense to hide it to give the user the feeling
   * that he's actually moving it.
   */
  ul.container-list.dndDragging {
    opacity: 0.7;
  }
  ul.container-list.dndDraggingSource {
    display: none;
  }
  /**
   * An element with .dndPlaceholder class will be
   * added to the container-list while the user is dragging
   * over it.
   */
  ul.container-list.dndPlaceholder {
    display: block;
    background-color: #eee;
    min-height: 41px;
  }
  /**
   * The container-lists's child elements currently MUST have
   * position: relative. Otherwise we can not determine
   * whether the mouse pointer is in the upper or lower
   * half of the element we are dragging over. In other
   * browsers we can use event.offsetY for this.
   */
  ul.container-list li {
    background-color: #fff;
    color: #35495E;
    border-bottom: 1px solid #41B883;
    display: block;
    padding: 0 15px;
    line-height: 40px;
  }
  ul.container-list li p {
    margin: 0;
  }
  ul.container-list li:last-child {
    border-bottom: none;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
  }
  /**
   * Show selected elements in green
   */
  ul.container-list.selected {
    background-color: #dff0d8;
    color: #3c763d;
  }
  ul.container-list.selected.has-container {
    background-color: #fff;
  }
  ul.container-list.selected.has-container .panel-body,
  ul.container-list.selected.has-container .panel-body li {
    background-color: #dff0d8;
    color: #3c763d;
  }
</style>
