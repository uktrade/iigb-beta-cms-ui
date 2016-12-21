<template>
  <div class="row">
    <div class="dit-selection__bar">
      <ul class="list-group list-group-horizontal col-md-2 col-md-pull-2">
        <li>
          <button @click="openModal()">Upload</button>         
          <modal v-if="showModal"
               @close="showModal = false"
               :modalSize="modalSize">

          <h3 slot="header">File upload</h3>
          <div slot="body" class="dit-media__file-upload">
          <div class="row">
            <div class="col-md-5">
            <button class="upload-btn">Choose file</button>
            </div>
            <div class="col-md-6">
            <p class="filename">{{filename}}<p>
            <p class="filename has-error">{{errorMsg}}<p>
            </div>
          </div>
          <input type="file" class="hidden-upload-btn" @change="onFileChange">
          </div>

          <div  slot="footer">    
            <button class="btn btn-primary modal-default-button" @click="uploadFile()">
            Upload File
            </button>
            <button class="btn btn-danger modal-default-button" @click="closeModal()">
            Cancel
            </button>
          </div>

        </modal>
        </li>
        <li>
          Delete
        </li>
      </ul>
    </div>
      <div class="col-md-4 col-md-offset-1 dit-media__table">
        <table>
        <th>Name</th>
        <th>Modified</th>
          <tr v-for="item in items">
            <td v-bind:class="[item.type == 'dir' ? 'is-folder ' : '']" @click="toggle(item)">
            <span :class="[item.type == 'dir' ? 'glyphicon glyphicon-folder-close' : 'glyphicon glyphicon-file']"> </span> {{item.name}}
            </td>
            <td>TBC</td>
          </tr>
        </table>
        <i class="glyphicon glyphicon-step-backward" v-if="this.mediaURL != (this.contentURL + 'media/')" @click="goUp()"></i>
      </div>

    <div class="col-md-3">
      <div class="col-md-8 col-md-push-3">
        <p class="preview-heading">Preview</p>
        <PreviewPanel :selected="selected"
                      :image="image">
        </PreviewPanel>
      </div>
    </div>
</template>

<script>
  import PreviewPanel from './PreviewPanel'
  import Modal from './Modal'

   export default {
    name: 'media',
    components: {
      PreviewPanel,
      Modal
    },
    data: function () {
      return {
        mediaURL: 'https://api.github.com/repos/uktrade/iigb-beta-content/contents/media/',
        contentURL: 'https://api.github.com/repos/uktrade/iigb-beta-content/contents/',
        items: null,
        treeData: null,
        treeDataDetails: null,
        modalSize: "modal-container-sm",
        disable: false,
        selected: '',
        errorMsg: '',
        image: '',
        filename: '',
        inputEditor: null,
        showModal: false,
      }
    },
    created: function () {
      this.fetchStructure()
    },
    watch: {
      currentBranch: 'fetchStructure',
    },
    methods: {
      fetchStructure: function () {
        const xhr = new XMLHttpRequest()
        const self = this
        xhr.open('GET', self.mediaURL)
        xhr.onload = function () {
          const structure = JSON.parse(xhr.responseText)
          self.items = structure;
        }
        xhr.send()
      },
      fetchFile: function (item) {
        //TODO check if a video.        
        this.image = item.download_url;
      },
      toggle: function (item) {
          this.image = '';
        if (item.type == 'dir') {
          this.mediaURL = this.contentURL + item.path;
          this.fetchStructure();
        } else {
          this.selected = item.name;
          this.fetchFile(item);
        }
      },
      goUp: function(){
        console.log(this.contentURL)
        console.log(this.mediaURL)
        var currentPath = this.mediaURL;
        var currentURLParams = currentPath.lastIndexOf("/");
        var futurePath = currentPath.substring(0, (currentURLParams))
        this.mediaURL = futurePath;
        this.fetchStructure();
      },
      updateView: function () {
        console.log(file);
        self.selected = file.name;
      },
      openModal: function() {
        this.showModal = true;
      },
      closeModal: function() {
        this.showModal = false;
        this.image = '';
        this.filename = '';
        this.selected = '';
        this.errorMsg = '';
      },
      onFileChange(e) {
      this.errorMsg = '';
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createImage(files[0]);
    },
    createImage(file) {

    if (/image/.test(file.type)) {

      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result;
        console.log(file.type)
        this.filename = file.name;
        this.selected = file.name;
      };
      reader.readAsDataURL(file);
    }else if(/video/.test(file.type)){

    }else{
      this.showErrorMsg();
    }
    },
    removeImage: function () {
      self.image = '';
      self.filename = '';
    },
    showErrorMsg: function(){
      this.errorMsg = "Please select a valid image or video file.";
      console.log('here');
      // setTimeout(function(){
      //  self.errorMsg = '';
      // }, 2000)
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
      margin-top: 7%;

      ul {
        display: -webkit-inline-box;
        float: right;
        list-style: none;
        /*margin-right: 100 px;*/

        li {
          margin-right: 120px;
          padding: 10px 0;
        }
      }
      @media (max-width: 1600px) {
        margin-top: 9%;
        ul {
          /*margin-right: 130 px;*/

          li {
            margin-right: 60px;
          }
        }
      }
    }
  }

  .dit-media {

    &__table {
    margin-top: 30px;

      table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;

        tr:hover{
        cursor: pointer !important;
      }
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
      /*margin-left: 80 px;*/
      height: 280px;
      width: 280px;
      border: 1px solid $black;
      background-color: $grey;
      margin: 0;

      .preview-heading {
        font-weight: bold;
        font-size: 16px;
        margin-bottom: 50px;
      }
    }

    &__file-upload{
    height: 60px;
    border: 1px solid black;

    .upload-btn{
      margin: 20px;
    }    
    .filename{
    position: absolute;
    top: 20px;
    left: 0px;
    }

    .has-error{
      color: red;
    }

    .hidden-upload-btn{
    position: absolute;
    top: 38px;
    left: 40px;
    opacity: 0;
    }
    }
  }

  .preview-heading {
    margin-top: 12px;
  }

  .is-folder {
    font-size: 18px;
    font-weight: 700;
    line-height: 40px;
    margin: 8px 0;
  }
  
  .modal-container{
    width: 30%;
    height: 300px;
  }

</style>
