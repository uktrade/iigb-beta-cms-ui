<template>
  <li>
    <p @click="toggle(list.data.pageTitle)"
       v-if="english"
       :class="{'is-folder': isFolder, 'is-active': isActive(list.data.pageTitle)}">
      <span :class="fileFolderIcon"> </span> {{list.data.pageTitle}}
    </p>
    <p v-else
       @click="toggle(list.data.pageTitle)"
       :class="{'is-folder': isFolder, 'is-active': isActive(list.data.pageTitle)}">
      <span :class="fileFolderIcon"> </span> {{list.data.pageTitle}} <span class="en-text">{{list.path}}</span>
    </p>
    <ul class="container-list"
        v-if="list.children"
        v-show="open">
      <div :list="list.children"
                 :english="english"
                 :options="{group:'all'}">
        <TreeElement v-for="list in list.children"
                     :english="english"
                     :active="active"
                     v-bind:list="list"
                     @new-details="updateTree($event)"/>
      </div>
    </ul>
  </li>
</template>

<script>
import Draggable from 'vuedraggable'
import { globalBus } from '../main.js'

export default {
  name: 'TreeElement',
  components: {Draggable},
  props: ['list', 'english', 'active'],
  data () {
    return {
      open: false,
    }
  },
  computed: {
    isFolder: function () {
      if (this.list && Array.isArray(this.list.children)) {
        return true
      } else {
        return false
      }
    },
    fileFolderIcon: function () {
      return {
        'fa fa-folder-open-o fa-lg': this.isFolder && this.open,
        'fa fa-folder-o fa-lg': this.isFolder && !this.open,
        'fa fa-file-code-o': !this.isFolder
      }
    },
    isEnglish: function () {
      return this.english
    }
  },
  methods: {
    toggle: function (item) {
      if (this.isFolder) {
        this.open = !this.open
      }
      this.$emit('new-details', this.list)
      globalBus.$emit('active', item)
    },
    updateTree: function (model) {
      this.$emit('new-details', model)
    },
    isActive(value) {
      return this.active === value
    },
    console(some) {
      console.log(some)
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../assets/variables.scss";

  span {
    margin-right: 6px;
  }

  .is-folder {
    font-size: 18px;
    font-weight: 700;
    line-height: 40px;
    margin: 8px 0;
  }

  .is-active {
    color: #000000;
    background-color: $active-background;
    padding-left: 8px;
  }

  .en-text {
    font-size: 12px;
    font-weight: 100;
  }

  ul.container-list
  ul.container-list > li {
    position: relative;
    min-height: 40px;
  }

  ul.container-list {
    padding-left: 30px;
  }


  ul.container-list li {
    background-color: $grey;
    color: $black;
    /*border-bottom: 1px solid #41B883;*/
    display: block;
    /*padding: 0 15px;*/
    line-height: 40px;
  }

  ul.container-list li p {
    margin: 0;
  }

  ul.container-list.selected.has-container {
    background-color: $white;
  }
</style>
