<template>
  <div id="editor">
    <textarea v-model="input" @change="$emit('updated', input)"></textarea>
    <div>
      <table>
        <thead>
        <tr>
          <th v-for="(value, title) in extractYaml.metadata">{{title}}</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td v-for="(value, title) in extractYaml.metadata">
            <div>{{value}}</div>
          </td>
        </tr>
        </tbody>
      </table>
      <article v-html="compiledMarkdown"></article>
    </div>
  </div>
</template>

<script>
  const marked = require('marked')
  const jsyaml = require('js-yaml')

  export default {
    name: 'Editor',
    props: ['content'],
    data: function () {
      return {
        input: this.content,
      }
    },
    methods: {
      console(some) {
        console.log(some)
      }
    },
    computed: {
      compiledMarkdown: function () {
        return marked(this.extractYaml.content, {sanitize: true})
      },

      extractYaml: function () {
        let metadata = {}
        return {
          content: this.input.replace(/^(---\n)((.|\n)*?)---\n?/, function (match, dashes, frontmatter) {
            try {
              metadata = jsyaml.safeLoad(frontmatter)

            } catch (err) {
              console.log('ERROR encoding YAML')
              console.log(err)
            }

            return ''
          }),
          metadata: metadata
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../assets/variables.scss";

  html, body, #editor {
    margin: 0;
    height: 460px;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    font-size: 15px;
    color: #333;
  }

  textarea, #editor div {
    display: inline-block;
    width: 55%;
    height: 100%;
    vertical-align: top;
    box-sizing: border-box;
    padding: 0 20px;
  }

  #editor div {
    display: inline-block;
    width: 44%;
    height: 100%;
    vertical-align: top;
    box-sizing: border-box;
    padding: 0 20px;
    overflow: scroll;
  }

  textarea {
    border: none;
    border-right: 1px solid $modal-editor-border;
    resize: none;
    outline: none;
    background-color: $modal-editor-background;
    font-size: 14px;
    font-family: 'Monaco', courier, monospace;
    padding: 20px;
  }

  table {
    margin-bottom: 20px;

    & th {
      padding: 6px 13px;
      border: 1px solid $modal-editor-border;
    }

    & td {
      padding: 6px 13px;
      border: 1px solid $modal-editor-border;
    }

    & tr {
      background-color: $white;
      border-top: 1px solid $modal-editor-border;
    }

    & td div {
      width: 100% !important;
      padding: 0 !important;
    }
  }
</style>
