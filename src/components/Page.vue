<template>
  <div>
    <div class="dit-form-group col-md-12">
      <Layouts :defaultValue="model.layout"></Layouts>
    </div>
    <div class="dit-form-group col-md-12">
      <label for="page-title" class="">
        Page title
      </label>
      <input id="page-title" class="form-control" type="text" v-model="model.data.pageTitle">
    </div>
    <div class="dit-form-group col-md-12">
      <label for="page-url">
        URL segment
      </label>
      <br>
      <div v-if="model.path"
           class="dit-fake-input">
        {{model.path}}
      </div>
      <input v-else
             id="page-url"
             class="form-control"
             type="text"
             v-model="model.path">
    </div>
    <!--todo: check if it's convenient to create another component out of this-->
    <template v-for="(field, key) in fieldsList">
      <!--ignore global-->
      <template v-if="field['global']">
      </template>
      <template v-else>
        <div class="dit-form-group col-md-12">
          <label for="key">
            <template v-if="field['label']">
              {{field['label']}}
            </template>
            <!--to delete when label is mandatory-->
            <template v-else>
              {{key}}
            </template>
            <!--^^^^^^^^^-->
          </label>
          <br>
          <div v-if="field['multiple']" class="dit-form-nested">
            <Draggable :list="model['data'][key]" class="dragArea">
              <div v-for="(some, idx) in model['data'][key]"
                 class="dit-form-nested__group">
                <template v-for="(item, name) in field['fields']">
                  <template v-if="model['data'][key]">
                    <label for="key">
                      <template v-if="item['label']">
                        {{item['label']}}
                      </template>
                      <template v-else>
                        {{name}}
                      </template>
                    </label>
                  </template>
                  <input id="key"
                         class="form-control"
                         type="text"
                         v-model="some[name]">
                </template>
                <button id="show-modal"
                        class="btn btn-success"
                        @click="fetchContent(some['content'])">Edit</button>
                <!-- use the modal component, pass in the prop -->
                <modal v-if="showModal"
                       @close="showModal = false">
                  <h3 slot="header">{{contentUrl}}</h3>
                  <Editor slot="body" :content="inputEditor.content"></Editor>
                </modal>
              </div>
            </Draggable>
          </div>
          <template v-else>
            <template v-if="model['data'][key]">
              <input
                   id="key"
                   class="form-control"
                   type="text"
                   v-model="model['data'][key]['content']">
            </template>
          </template>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
  import Layouts from './Layouts'
  import nunjucks from 'nunjucks'
  import tags from 'iigb-cms-tags'
  import Draggable from 'vuedraggable'
  import Modal from './Modal'
  import Editor from './MarkdownEditor'

  const apiURL = "https://raw.githubusercontent.com/uktrade/iigb-beta-website/develop/src/templates"
  const contentURL = 'https://raw.githubusercontent.com/uktrade/iigb-beta-content/master/content/'

  export default {
    name: 'page',
    components: {
      Layouts,
      Draggable,
      Modal,
      Editor
    },
    props: {
      model: Object,
    },
    data: function () {
      return {
        fieldsList: null,
        showModal: false,
        contentUrl: null
      }
    },
    created: function () {
      this.getTemplateFields(this.model.layout)
    },
    watch: {
      model: function (val) {
        this.getTemplateFields(val.layout)
      }
    },
    methods: {
      getTemplateFields: function (path) {
        const env = new nunjucks.Environment(new nunjucks.WebLoader(apiURL))
        env.addFilter('date', function(content, language) {
          return '';
        });
        env.addGlobal('now', function() {
          return new Date();
        });
        const layout = env.render(path)
        const fields = tags.parse(layout)
        this.fieldsList = fields
      },
      fetchContent: function (url) {
        const xhr = new XMLHttpRequest()
        const self = this
        xhr.open('GET', contentURL + url)
        xhr.onload = function () {
          const content = xhr.responseText
          self.inputEditor = {content: content}
          self.showModal = true
          self.contentUrl = url
//          console.log(content)
        }
        xhr.send()
      },
      edit: function () {
        //
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

  .dit-form-group {
    margin-bottom: 40px;

    input {
      display: block;
      width: 60%;
      height: 40px;
    }
  }

  .dit-form-nested {
    padding: 10px;
    margin-right: 30%;
    background-color: $invalid-input;

    input {
      display: block;
      width: 100%;
      height: 40px;
    }

    &__group {
      padding: 10px 5px;
      margin-bottom: 20px;
      border-bottom: 1px solid black;
      background-color: #767676;
    }
  }

  .dit-fake-input {
    width: 60%;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.83;
    color: #555;
    background-color: $invalid-input;
    background-image: none;
    border: 1px solid $modal-editor-border;
    border-radius: 4px;
  }
</style>
