<template lang="html">
  <li v-dnd-draggable="{dndDraggable: item,
                       dndIndex: index,
                       dndDisableIf: false,
                       dndSelected: 'selectedEvent',
                       dndData: list}"
      @click="toggle"
      :class="{hasContainer: item.children}">
    <div class="panel panel-vue padding" v-if="item.children">
      <div class="panel-heading">
        <h3 class="panel-title">{{item.data.pageTitle}} <span v-if="isFolder">[{{open ? '-' : '+'}}]</span></h3>
      </div>
      <div class="panel-body">
        <ul class="container-list" v-dnd-list="{
          dndList: item.children,
          dndDisableIf: disable,
          dndExternalSources: true
        }"
            v-show="open" v-if="isFolder">
          <list v-for="(col, index) in item.children" :item="col" :list="item.children" :index="index"  :disable.sync="disable"></list>
        </ul>
      </div>
    </div>
    <p v-else>
      {{item.data.pageTitle}}
    </p>
  </li>
</template>

<script>
let treeDetails = null

export default {
  name: 'list',
  props: ['item', 'list', 'index', 'disable', 'english'],
  data: function () {
    return {
      open: false,
      selected: false
    }
  },
  methods: {
    toggle: function () {
      if (this.isFolder) {
        this.open = !this.open
        treeDetails = this.item
        this.$emit('new-details', this.model)
      }
    },
    updateTree: function () {
      this.$emit('new-details', treeDetails)
    },
  },
  computed: {
  isFolder: function () {
    if (this.item.children) {
      return true
    } else {
      return false
    }
  },
  isEnglish: function () {
    return this.english
  }
},
};
</script>

<style lang="css">

  /**
  DragAndDrop
 * For the correct positioning of the placeholder element, the dnd-list and
 * it's children must have position: relative
 */
  ul.container-list
  ul.container-list> li {
    position: relative;
    min-height: 40px;
  }
  /**
   * The dnd-list should always have a min-height,
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
   * added to the dnd-list while the user is dragging
   * over it.
   */
  ul.container-list.dndPlaceholder {
    display: block;
    background-color: #eee;
    min-height: 41px;
  }
  /**
   * The dnd-lists's child elements currently MUST have
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
  .selected {
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
