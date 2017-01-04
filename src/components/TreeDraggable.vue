<template lang="html">
  <draggable class="dragArea" :options="{group:'dragAll'}">
    <li>
      <div :list="list">
        <p @click="toggle"
           v-if="english"
           :class="{'is-folder': isFolder}">
          <span :class="fileFolderIcon"> </span> {{list.data.pageTitle}}
        </p>
        <p v-else
           @click="toggle"
           :class="{'is-folder': isFolder}">
          <span :class="fileFolderIcon"> </span> {{list.data.pageTitle}} <span
          style="font-size: 12px; font-weight: 100">{{list.path}}</span>
        </p>
        <ul class="container-list"
            v-show="open">
          <template v-for="list in list.children">
            <TreeDraggable :list="list"
                           :english="english"
                           @new-details="updateTree($event)">
            </TreeDraggable>
          </template>
        </ul>
      </div>
    </li>
  </draggable>
</template>

<script>
  import draggable from 'vuedraggable'

  let treeDetails = null

  export default {
    name: 'TreeDraggable',
    components: {
      draggable
    },
    props: ['list', 'english'],
    data: function () {
      return {
        open: false,
      }
    },
    methods: {
      toggle: function () {
        if (this.isFolder) {
          this.open = !this.open
          treeDetails = this.list
          this.$emit('new-details', treeDetails)
        } else {
          treeDetails = this.list
          this.$emit('new-details', treeDetails)
        }
      },
      updateTree: function () {
        this.$emit('new-details', treeDetails)
      },
      console(some) {
        console.log(some)
      }
    },
    computed: {
      isFolder: function () {
        if (this.list.children) {
          return true
        } else {
          return false
        }
      },
      isEnglish: function () {
        return this.english
      },
      fileFolderIcon: function () {
        return {
          'glyphicon glyphicon-folder-open': this.isFolder && this.open,
          'glyphicon glyphicon-folder-close': this.isFolder && !this.open,
          'glyphicon glyphicon-file': !this.isFolder
        }
      }
    },
  };

</script>

<style scoped lang="scss">
  @import "../assets/variables.scss";

  .is-folder {
    font-size: 18px;
    font-weight: 700;
    line-height: 40px;
    margin: 8px 0;
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
