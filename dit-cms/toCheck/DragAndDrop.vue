<template lang="html">
  <li v-dnd-draggable
      @click="toggle"
      :dnd-draggable="item"
      :dnd-index="index"
      :dnd-disable-if="disable"
      dnd-selected="selectedEvent"
      v-bind:class="{'selected': selected === item, 'has-container': item.children}"
      :dnd-data="list">
    <div class="panel panel-vue padding" v-if="item.children">
      <div class="panel-heading">
        <h3 class="panel-title">{{item.pageTitle}} <span v-if="isFolder">[{{open ? '-' : '+'}}]</span></h3>
      </div>
      <div class="panel-body">
        <ul v-dnd-list
            v-show="open" v-if="isFolder"
            :dnd-list="item.children"
            :dnd-disable-if="disable"
            :dnd-external-sources="true">
          <list v-for="col in item.children" :item="col" :list="item.children" :index="$index" :selected.sync="selected" :disable.sync="disable"></list>
        </ul>
      </div>
    </div>
    <p v-else>
      {{item.pageTitle}}
    </p>
  </li>
</template>

<script>
let treeDetails = null

export default {
  name: 'list',
  props: ['item', 'list', 'index', 'selected', 'disable', 'english'],
  data: function () {
    return {
      open: false
    }
  },
  methods: {
    selectedEvent(item){
      this.selected = item;
    },
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
    return this.data.pageTitle &&
      this.data.pageTitle.length
  },
  isEnglish: function () {
    return this.english
  }
},
};
</script>

<style lang="css">
</style>
