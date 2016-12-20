<template>
	<div class="col-md-6 pull-col-md-2 dit-cms-pages__inputs">
  <div>
        <page v-if="model" :model="model">
        </page>

        <button id="show-modal"
                class="btn btn-success"
                @click="fetchContent(model.data.pageHeader.content)">Edit</button>
        <!-- use the modal component, pass in the prop -->
        <modal v-if="showModal"
               @close="showModal = false">
          <!--{{console(inputEditor)}}-->
          <!--
     you can use custom content here to overwrite
     default content... markdown maybe???
   -->
          <h3 slot="header">{{model.data.pageHeader.content}}</h3>
          <Editor slot="body" :content="inputEditor.content"></Editor>
        </modal>
      </div>
      </div>
</template>

<script>
  import Page from './Page'
  import Modal from './Modal'
  import Editor from './MarkdownEditor'

  const contentURL = 'https://raw.githubusercontent.com/uktrade/iigb-beta-content/master/content/'

  export default {
    name: 'metadata',
    components: {
      Page,
      Modal,
      Editor
    },
    props: ['model', 'content'],
    data: function () {
      return {
        showModal: false,
      }
    },

    created: function () {
      //
    },

    methods: {
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
    &__inputs{
      background-color: $white;
      height: 1200px;
      overflow-x: scroll;
    }
  }
</style>
