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
    <template v-for="(field, key) in fieldsList">
      <div class="dit-form-group col-md-12">
        <label for="key">
          <template v-if="field['label']">
            {{field['label']}}
          </template>
          <template v-else>
            {{key}}
          </template>
        </label>
        <br>
        <div v-if="field['multiple']" class="dit-form-nested">
          <div v-for="(some, idx) in model['data'][key]"
               class="dit-form-nested__group">
            <template v-for="(item, name) in field['fields']">
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
          </div>
        </div>
        <input v-else
               id="key"
               class="form-control"
               type="text"
               v-model="model['data'][key]['content']">
      </div>
    </template>
  </div>
</template>

<script>
  import Layouts from './Layouts'
  import nunjucks from 'nunjucks'
  import tags from 'iigb-cms-tags'

  const apiURL = "https://raw.githubusercontent.com/uktrade/iigb-beta-website/develop/src/templates"

  export default {
    name: 'page',
    components: {
      Layouts
    },
    props: {
      model: Object,
    },
    data: function () {
      return {
        fieldsList: null,
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
        nunjucks.configure(apiURL)
        const layout = nunjucks.render(path)
        const fields = tags.parse(layout)
        this.fieldsList = fields
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
      background-color: #545454;
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
