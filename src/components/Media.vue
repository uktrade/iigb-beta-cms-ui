<template>
  <div class="row">
  <div class="dit-cms-selection__bar">
  <ul class="list-group list-group-horizontal col-md-2 col-md-pull-2">
    <li>
      Upload
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
  <td><a href="">image.jpeg<a></td>
  <td>3/11/16  9.15AM</td>
  </tr>  
  <tr>
  <td><a href="">video.avi<a></td>
  <td>3/11/16  9.15AM</td>
  </tr>  
  <tr>
  <td><a href="">web.avi<a></td>
  <td>3/11/16  9.15AM</td>
  </tr>
</table>  
</div>
<div class="col-md-3">
<div class="col-md-8 col-md-push-3">
<p class="preview-heading">Preview</p>
<div class="panel panel-default dit-cms-content__preview">
<div class="panel-body">  
</div>
</div>
</div>
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
<style scoped lang="scss">

@import "../assets/variables.scss";

.dit-cms-selection{
    &__strip{
        background-color: $whitesmoke;
        min-height: 80px;
        margin-bottom: 50px;
    }
    &__select{
        margin-left: 40px;
        font-size: 16px;
    }
    &__bar{
        background-color: $whitesmoke;
        height: 40px;
        margin-top: 7%;

    ul{ display: -webkit-inline-box;
        float: right;
        list-style: none;
        // margin-right: 100px;
        li{
        margin-right: 120px;
        padding: 10px 0px;
        }
        }
        @media (max-width: 1600px) {
        margin-top: 9%; 
        ul{ 
        // margin-right: 130px;
        li{
        margin-right: 60px;
        }
        } 
    } 
    }    
}

.dit-cms-content{
    &__table{
    margin-top:30px;
    table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
    }
    th{
    border-bottom: 2px solid #dddddd;
    }
    td, th {
    text-align: left;
    padding: 8px;
    }  
}
    &__preview{
    // margin-left: 80px;
    height: 280px;
    width: 280px;
    border: 1px solid $black;
    background-color: $grey;
    margin: 0px 0px;

    .preview-heading{
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 50px;
    }    
    }
}

.preview-heading{
  margin-top: 32px;
}

.btn-content-edit{
    position: absolute;
    bottom: 0px;
    left: 170px;
}

.btn-content-delete{
    position: absolute;
    bottom: 0px;
    left: 270px;
}
</style>
