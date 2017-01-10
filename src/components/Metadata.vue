<template>
  <div class="col-md-6 dit-cms-pages__inputs">
    <div>
      <div class="form-group">
        <Layouts :defaultValue="model.layout"></Layouts>
      </div>
      <div class="form-group">
        <label for="page-title" class="">
          Page title
        </label>
        <br>
        <input id="page-title" class="form-control single-input" type="text" v-model="model.data.pageTitle">
      </div>
      <div class="form-group">
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
               class="form-control single-input"
               type="text"
               v-model="model.path">
      </div>
      <!--todo: check if it's convenient to create another component out of this-->
      <template v-for="(field, key) in fieldsList">
        <!--ignore global-->
        <template v-if="field['global']">
        </template>
        <template v-else>
          <div class="form-group">
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
                      <input id="key"
                             class="form-control"
                             type="text"
                             v-model="some[name]">
                    </template>
                  </template>
                  <button class="btn btn-success"
                          @click="loadContent(some['content'])">Edit
                  </button>
                </div>
              </Draggable>
            </div>
            <template v-else>
              <template v-if="model['data'][key]">
                <input
                  id="key"
                  class="form-control single-input"
                  type="text"
                  v-model="model['data'][key]['content']">
                <button class="btn btn-success"
                        @click="loadContent(model['data'][key]['content'])">Edit
                </button>
              </template>
            </template>
          </div>
        </template>
      </template>
      <!-- use the modal component, pass in the prop -->
      <modal v-if="showModal">
        <h3 slot="header">{{contentUrl}}</h3>
        <div slot="footer">
          <button class="btn btn-success modal-default-button"
                  @click="updateContent(contentUrl, contentUpdated)">Save</button>
          <button class="btn btn-danger modal-default-button" @click="showModal = false">
            Cancel
          </button>
        </div>

        <Editor slot="body"
                :content="inputEditor"
                @updated="contentUpdated = $event"></Editor>
      </modal>
    </div>
  </div>
</template>

<script>
  import nunjucks from 'nunjucks'
  import tags from 'iigb-cms-tags'
  import github from '../github';
  import Draggable from 'vuedraggable'
  import Editor from './MarkdownEditor'
  import Layouts from './Layouts'
  import Modal from './Modal'

  const apiURL = "https://raw.githubusercontent.com/uktrade/iigb-beta-website/develop/src/templates"

  export default {
    name: 'metadata',
    components: {
      Draggable,
      Editor,
      Layouts,
      Modal
    },
    props: {
      model: Object,
    },
    data: function () {
      return {
        contentUpdated: null,
        contentUrl: null,
        fieldsList: null,
        showModal: false
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
//        get data from session storage if present
        if (sessionStorage.getItem(path)) {
          this.fieldsList = JSON.parse(sessionStorage.getItem(path))
        }
        else {
          const env = new nunjucks.Environment(new nunjucks.WebLoader(apiURL))
          env.addFilter('date', function (content, language) {
            return '';
          });
          env.addGlobal('now', function () {
            return new Date();
          });
          const layout = env.render(path)
          const fields = tags.parse(layout)
          this.fieldsList = fields
          sessionStorage.setItem(path, JSON.stringify(fields))
        }
      },
      loadContent: function (path) {
        const self = this
        return github.loadContent(path)
          .then(function(data) {
            self.inputEditor = data;
            self.showModal = true
            self.contentUrl = path
            self.status = '';
          })
          .catch(function(err) {
            console.error(err);
          });
      },
      updateContent: function (contentUrl, contentUpdated) {
        console.log(contentUrl)
        console.log(contentUpdated)
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
      padding-left: 28px;
      overflow-y: scroll;
    }
  }

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
    margin-right: 15%;
    background-color: $invalid-input;
    border-radius: 4px;

    input {
      display: block;
      width: 100%;
      height: 40px;
      margin-bottom: 12px;
    }

    &__group {
      padding: 10px 5px;
      margin-bottom: 20px;
      border-bottom: 1px solid black;
      background-color: #767676;
      border-radius: 4px;
    }
  }

  .dit-fake-input {
    width: 85%;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.83;
    color: #555;
    background-color: $invalid-input;
    background-image: none;
    border: 1px solid $modal-editor-border;
    border-radius: 4px;
  }

  .single-input {
    width: 85%;
    margin-bottom: 12px;
  }
</style>
