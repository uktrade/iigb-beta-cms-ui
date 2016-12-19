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
<style lang="scss">
  @import "../assets/variables.scss";

  .dit-cms-pages{
  &__container{
     background-color: $grey;
     min-height: 100%;
   }

  &__index{
     margin-left: 200px;
     height: 1200px;
     background-color: $grey;
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
  &__form{
     margin-top:60px;

  input{
    display: block;
    width: 60%;
    height: 40px;
  }

  .form-group{
    margin-bottom: 40px;
  }

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
