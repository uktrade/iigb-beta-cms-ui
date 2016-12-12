<template>
  <div id="editor">
    <textarea :value="content" @input="update"></textarea>
    <div v-html="compiledMarkdown"></div>
  </div>
</template>

<script>
  const _ = require('lodash')
  const marked = require('marked')

  export default {
    name: 'Editor',
    props: ['content'],
    data: function () {
      return {
        // input: this.content
      }
    },
    methods: {
      console(some) {
        console.log(some)
      },
      update: _.debounce(function (e) {
        this.content = e.target.value
      }, 300)
    },
    computed: {
      compiledMarkdown: function () {
        return marked(this.content, { sanitize: true })
      },
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
</style>
