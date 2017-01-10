<template>
  <div>
    <div class="dit-selection__bar">
      <ul class="list-group list-group-horizontal col-md-3">
        <li>
          <button class="btn btn-primary" @click="openModal()">Upload</button>
          <modal v-if="showModal"
                 @close="showModal = false"
                 :modalSize="modalSize">

            <h3 slot="header">File upload</h3>
            <div slot="body" class="dit-media__file-upload">
              <div class="row">
                <div class="col-md-6">
                  <button class="btn btn-secondary btn-upload">Choose file</button>
                </div>
                <div class="col-md-6">
                  <p class="filename">{{filename}}
                  <p>
                  <p class="filename has-error">{{errorMsg}}
                  <p>
                </div>
              </div>
              <input type="file" class="hidden-upload-btn" @change="onFileChange">
            </div>

            <div slot="footer">
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
          <button class="btn btn-danger" v-if="selected != ''">Delete</button>
        </li>
      </ul>
    </div>
    <div class="col-md-4 dit-media__table">
      <table>
        <th>Name</th>
        <th>Modified</th>
        <tr>
          <td v-if="currentPath != mediaRoot"
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

    <div class="col-md-6">
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
  import github from '../github';

  export default {
    name: 'media',
    components: {
      PreviewPanel,
      Modal
    },
    data: function () {
      return {
        mediaRoot: github.getMediaRoot(),
        currentPath: github.getMediaRoot(),
        items: null,
        modalSize: "modal-container-sm",
        selected: '',
        errorMsg: '',
        image: '',
        filename: '',
        showModal: false,
      }
    },
    created: function () {
      this.loadList()
    },
    methods: {
      load(path) {
        return github
        .loadMedia(path);
      },
      loadList(path){
          const self = this;
          return self.load(path)
          .then(function(list){
            self.items = list;
            return list;
          });
      },
      toggle: function (item) {
        const self = this;
        this.image = '';
        if (item.type === 'dir') {
          this.loadList(item.path)
            .then(function(){
              self.currentPath =  item.path;
            });
        } else {
          this.selected = item.name;
          this.image=item.download_url;
        }
      },
      goUp: function () {
        this.image = '';
        const currentURLParams = this.currentPath.lastIndexOf("/");
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
      onFileChange(e) {
        this.errorMsg = '';
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
          return;
        this.createImage(files[0]);
      },
      createImage(file) {
        if (/image/.test(file.type)) {
          const image = new Image();
          const reader = new FileReader();
          let vm = this;
          reader.onload = (e) => {
            vm.image = e.target.result;
            vm.filename = file.name;
            vm.selected=file.name;
            // vm.binaryString = vm.image.split(',')[1];

          };
          reader.readAsText(file);
        } else if (/video/.test(file.type)) {

        } else {
          this.showErrorMsg();
        }
      },
      uploadFile() {
        console.log(this.image);
        github.create(this.currentPath,this.filename,this.image)
          .then(function(){

          });

      },
      removeImage: function () {
        self.image = '';
        self.filename = '';
      },
      showErrorMsg: function () {
        this.errorMsg = "Please select a valid image or video file.";
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
       height: 60px;

        ul {
          display: -webkit-inline-box;
          float: right;
          list-style: none;

        li {
          padding: 10px 0;
        }
      }

      @media (max-width: 1600px) {
        ul {
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
    margin-top: 38px;
    font-weight: 700;
    font-size: 16px;
    margin-bottom: 10px;
  }

  .is-folder {
    font-size: 18px;
    font-weight: 700;
    line-height: 40px;
    margin: 8px 0;
  }

  .btn-upload {
    margin: 10px;
  }

  .fa {
    margin-right: 8px;
  }
</style>
