<template>
  <ol class="breadcrumb">
    <li v-for="(item, index) in list" class="breadcrumb-item" :class="{active: isLast(index)}">
      <span v-if="isLast(index)">{{list[index].name}}</span>
      <a @click="$emit('breadcrumb', list[index].path)" v-else>{{list[index].name}}</a>
    </li>
  </ol>
</template>

<script>
  export default {
    name: 'Breadcrumb',
    props: ['path'],
    data () {
      return {
        list: [],   // [{path: parent, name: parent} {path: parent/child, name: child}]
      }
    },
    created () {
      this.createBreadcrumb()
    },
    watch: {
      path: function (val) {
        this.createBreadcrumb()
      }
    },
    methods: {
      createBreadcrumb () {
        let list = []
        let listElms = this.path.split('/')
        let pathHelper = []
        for (let i=0; i<listElms.length; i++) {
          pathHelper.push(listElms[i])
          let newPath = pathHelper.join('/')
          list.push({path: newPath, name: listElms[i]})
        }
        return this.list = list
      },
      isLast (index) {
        return index === this.list.length - 1
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/variables.scss";

  a {
    cursor: pointer;

    &:hover {
      border-bottom: 1px solid $black;
    }
  }

  .breadcrumb {
    background-color: $white;
  }
</style>
