<template>
  <div class="row">
    <p class="dit-content__breadcrumb"><a href="">INVEST</a></p>
    <div class="dit-selection__bar">
      <ul class="list-group list-group-horizontal col-md-4 col-md-pull-1">
        <li v-if="showModal == false">
        <button class="btn btn-primary btn-content" @click="createContent()">
          Create
        </button> 
        </li>
        <li>
          Browse
        </li>
        <li v-if="selected">
        <button class="btn btn-primary btn-content" @click="openModal()">
          Edit
        </button> 
        </li>
        <li v-if="selected">
        <button class="btn btn-danger btn-content" @click="openDeleteModal()">
          Delete
        </button> 
        </li>
      </ul>
    </div>
    <div class="col-md-4 dit-content__table">
      <table>
        <th>Name</th>
        <th>Modified</th>
        <tr>
          <td v-if="currentPath != contentRoot"
              @click="goUp()">
            <i class="fa fa-level-up fa-lg"></i>
            ..
          </td>
        </tr>
        <tr v-for="item in items">
          <td v-bind:class="[item.type == 'dir' ? 'is-folder ' : '']"
              @click="toggle(item)">
            <span
              :class="[item.type == 'dir' ? 'fa fa-folder-o' : 'fa fa-file-o']"></span>
            {{item.name}}
          </td>
          <td>TBC</td>
        </tr>
      </table>
    </div>
    <div class="col-md-5">
        <p class="preview-heading">Preview</p>
        <PreviewPanel :selected="selected"
                      :content="inputEditor">
        </PreviewPanel>
    </div>
      <modal v-if="showModal"
             @close="showModal = false">
        <h3 slot="header">{{selected}}</h3>
        <Editor slot="body"
                :content="inputEditor.content"
                :disabled="disabled"
                @updated="contentUpdated = $event"
                @disabled="disabled = $event"
                ></Editor>
        <div slot="footer">
          <button class="btn btn-success modal-default-button" :disabled="disabled"
                  @click="updateContent((currentPath + '/' + selected), contentUpdated)">Save</button>
          <button class="btn btn-danger modal-default-button" @click="showModal = false">
            Close
          </button>
        </div>
      </modal>
      <modal v-if="showDeleteModal"
           @close="showDeleteModal = false"
           :modalSize="modalSize">

      <h3 slot="header">Delete {{selected}}?</h3>
      <div slot="body" class="dit-media__file-upload">
        <div class="row">
          <div class="col-md-12">
            <p class="filename">Are you sure you want to delete {{selected}}?
            <p>
          </div>
        </div>
      </div>
      <div slot="footer">
        <button class="btn btn-primary modal-default-button">
          Delete this file
        </button>
        <button class="btn btn-danger modal-default-button" @click="closeDeleteModal()">
          Cancel
        </button>
      </div>
    </modal>
    </div> 
</template>

<script>
  import PreviewPanel from './PreviewPanel'
  import Modal from './Modal'
  import github from '../github';
  import Editor from './MarkdownEditor'

  const contentPath = 'content/beta';

  export default {
    name: 'content',
    components: {
      PreviewPanel,
      Modal,
      Editor
    },
    data: function () {
      return {
        contentRoot: contentPath,
        currentPath: contentPath,
        items: null,
        modalSize: "modal-container-sm",
        selected: '',
        errorMsg: '',
        filename: '',
        inputEditor: null,
        showModal: false,
        showDeleteModal: false,
        disabled: true,
        contentUpdated: null,
      }
    },
    created: function () {
      this.loadList(contentPath)
    },
    methods: {
      load(path) {
        return github
        .loadMedia(path);
      },
      loadList(path){
          var self = this;
          return github.loadContent(path)
          .then(function(list){
            self.items = list;
            return list;
          });
      },
      toggle: function (item) {
        var self = this;
        this.image = '';
        if (item.type === 'dir') {
          this.loadList(item.path)
            .then(function(){
              self.currentPath =  item.path;
            });
        } else {
          this.selected = item.name;
          console.log(item);
          this.fetchContent(item.path);
        }
      },
      goUp: function () {
        this.image = '';
        var currentURLParams = this.currentPath.lastIndexOf("/");
        this.currentPath = this.currentPath.substring(0, (currentURLParams))
        this.loadList(this.currentPath);
      },
      openModal: function () {
        this.showModal = true;
      },
      openDeleteModal: function () {
        this.showDeleteModal = true;
      },
      closeModal: function () {
        this.showModal = false;
        this.image = '';
        this.filename = '';
        this.selected = '';
        this.errorMsg = '';
      },      
      closeDeleteModal: function () {
        this.showDeleteModal = false;
        this.selected = '';
        this.errorMsg = '';
      },
      showErrorMsg: function () {
        this.errorMsg = "Please select a valid image or video file.";
      },
      fetchContent: function (path) {
        const self = this
          const content = github.loadContent(path);
        return github.loadContent(path)
          .then(function(list){
            const content = list;
            self.inputEditor = {content: content}
          });
      },
      // edit: function () {
      // },
      // delete: function () {
      //   //
      // },
      createContent: function () {
        this.showModal = true;
        this.inputEditor = {content: ''};
        this.selected = 'new content file';
      },
      updateContent: function (currentPath, contentUpdated) {
        console.log(currentPath)
        console.log(contentUpdated)
        this.disabled = true
//        return github.updateContent(currentPath, contentUpdated)
//          .then(function(){
//            this.disabled = true
//          })
//          .catch(function(){
//            console.log('save failed to complete')
//          });
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

  .dit-selection {

    &__bar {
      background-color: $whitesmoke;
      height: 40px;
      ul {
        display: -webkit-inline-box;
        float: right;
        list-style: none;
        margin-right: 100px;

        li {
          margin-right: 120px;
          padding: 10px 0px;
        }
      }
    }
  }

  .dit-content {

    &__table {
      margin-top: 30px;

      table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
      }

      th {
        border-bottom: 2px solid #dddddd;
      }

      td, th {
        text-align: left;
        cursor: pointer;
        padding: 8px;
      }
    }

    &__preview {
      /*margin-left: 80px;*/
      height: 280px;
      width: 280px;
      border: 1px solid $black;
      background-color: $grey;
      margin: 40px 0px 50px 0px;

      .preview-heading {
        font-weight: bold;
        font-size: 16px;
        margin-bottom: 50px;
      }
    }

    &__breadcrumb {
      font-size: x-large;
      padding-top: 80px;
      margin-left: 380px;
      position: relative;
    }
  }

  .btn-content {
    padding: 2px;
    margin-bottom: 3px;
  }
</style>
