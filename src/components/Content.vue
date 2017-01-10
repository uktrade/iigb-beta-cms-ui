<template>
  <div class="row">
    <p class="dit-content__breadcrumb"><a href="">INVEST</a></p>
    <div class="dit-selection__bar">
      <ul class="list-group list-group-horizontal col-md-4 col-md-pull-1">
        <li>
          Create
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
        <button class="btn btn-danger btn-content">
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
        <Editor slot="body" :content="inputEditor.content"></Editor>
      </modal>
    </div> 
</template>

<script>
  import PreviewPanel from './PreviewPanel'
  import Modal from './Modal'
  import github from '../github';
  import Editor from './MarkdownEditor'


  const contentURL = 'https://raw.githubusercontent.com/uktrade/iigb-beta-content/master/content/';

  export default {
    name: 'content',
    components: {
      PreviewPanel,
      Modal,
      Editor
    },
    data: function () {
      return {
        contentRoot: github.getContentRoot(),
        currentPath: github.getContentRoot(),
        items: null,
        modalSize: "modal-container-sm",
        selected: '',
        errorMsg: '',
        filename: '',
        contentURL: github.getContentUrl(),
        inputEditor: null,
        showModal: false,
      }
    },
    created: function () {
      this.loadList(github.getContentRoot())
    },
    methods: {
      load(path) {
        return github
        .loadMedia(path);
      },
      loadList(path){
          var self = this;
          return self.load(path)
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
          this.fetchContent(item.download_url);
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
      closeModal: function () {
        this.showModal = false;
        this.image = '';
        this.filename = '';
        this.selected = '';
        this.errorMsg = '';
      },
      showErrorMsg: function () {
        this.errorMsg = "Please select a valid image or video file.";
      },
      fetchContent: function (url) {
        const xhr = new XMLHttpRequest()
        const self = this
        xhr.open('GET', contentURL + url)
        xhr.onload = function () {
          const content = xhr.responseText
          self.inputEditor = {content: content}
          self.contentUrl = url
        }
        xhr.send()
      },
      edit: function () {
      },
      delete: function () {
        //
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
  }
</style>
