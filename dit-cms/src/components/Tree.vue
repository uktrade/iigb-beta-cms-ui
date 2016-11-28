<template>
  <li>
    <div :class="{bold: isFolder}"
         @click="toggle"
         @dblclick="changeType">
      <span v-if="isEnglish">{{model.pageTitle}}</span>
      <span v-else>{{model.pageTitle}} - {{model.url}}</span>
      <span v-if="isFolder">[{{open ? '-' : '+'}}]</span>
    </div>
    <ul v-show="open" v-if="isFolder">
      <tree class="tree"
            v-for="model in model.children"
            :model="model"
            :english="english"
            @new-details="updateTree($event)">
      </tree>
      <li class="add" @click="addChild">Add new page</li>
    </ul>
  </li>
</template>

<script>
let treeDetails = null

export default {
  name: 'tree',
  props: {
    model: Object,
    english: Boolean
  },
  data: function () {
    return {
      open: false
    }
  },
  computed: {
    isFolder: function () {
      return this.model.pageTitle &&
        this.model.pageTitle.length
    },
    isEnglish: function () {
      return this.english
    }
  },
  methods: {
    toggle: function () {
      if (this.isFolder) {
        this.open = !this.open
        // console.log(this.model)
        treeDetails = this.model
        this.$emit('new-details', this.model)
      }
    },
    updateTree: function () {
      this.$emit('new-details', treeDetails)
    },
    changeType: function () {
      if (!this.isFolder) {
        Vue.set(this.model, 'children', [])
        this.addChild()
        this.open = true
      }
    },
    addChild: function () {
      this.model.children.push({
        pageTitle: 'New page'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
