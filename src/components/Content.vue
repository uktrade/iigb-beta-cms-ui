<template>
  <div class="row">
  <div class="dit-cms-selection__bar">
  <ul class="list-group list-group-horizontal">
    <li>
      Created
    </li>
    <li>
      Browse
    </li>
    <li>
      Edit
    </li>    
    <li>
      Delete
    </li>
  </ul>
</div>
<div class="col-md-5 col-md-offset-2 dit-cms-content__table">
<table>
  <th>Name</th><th>Modified</th>
  <tr>
  <td><a href="">test1.md<a></td>
  <td>3/11/16  9.15AM</td>
  </tr>  
  <tr>
  <td><a href="">test2.md<a></td>
  <td>3/11/16  9.15AM</td>
  </tr>  
  <tr>
  <td><a href="">test3.md<a></td>
  <td>3/11/16  9.15AM</td>
  </tr>
</table>  
</div>
<div class="col-md-3">
<div class="col-md-12 panel panel-default dit-cms-content__preview">
<div class="panel-body">
<p class="preview-heading">This is the title of the file</p>  
<p class="preview-description">Description goes here.</p>  
</div>
</div>
<a href="" class="btn btn-primary btn-content-edit">Edit</a>
<a href="" class="btn btn-danger btn-content-delete">Delete</a>
</div>
</template>

<script>
  export default {
    name: 'content',
    data: function () {
      return {
        //
      }
    },
    computed: {
      //
    },
    methods: {
      edit: function () {
        //
      },
      delete: function () {
        //
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
