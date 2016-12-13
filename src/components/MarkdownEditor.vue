<template>
  <div id="editor">
    <textarea v-model="input"></textarea>
    <!--<div>{{ input | marked }}</div>-->
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
              metadata = jsyaml.safeLoad(frontmatter);

            } catch (err) {
              console.log('ERROR encoding YAML');
              console.log(err);
            }

            return '';
          }),
          metadata: metadata
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css">
  html, body, #editor {
    margin: 0;
    height: 480px;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    color: #333;
  }

  textarea, #editor div {
    display: inline-block;
    width: 49%;
    height: 100%;
    vertical-align: top;
    box-sizing: border-box;
    padding: 0 20px;
  }

  textarea {
    border: none;
    border-right: 1px solid #ccc;
    resize: none;
    outline: none;
    background-color: #f6f6f6;
    font-size: 14px;
    font-family: 'Monaco', courier, monospace;
    padding: 20px;
  }

  code {
    color: #f66;
  }

  table {
    margin-bottom: 20px;
  }

  table th {
    padding: 6px 13px;
    border: 1px solid #ddd;
  }

  table td {
    padding: 6px 13px;
    border: 1px solid #ddd;
  }

  table tr {
    background-color: #fff;
    border-top: 1px solid #ccc;
  }

  table td div {
    width: 100% !important;
    padding: 0 !important;
  }
</style>
