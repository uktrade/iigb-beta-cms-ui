<template>
  <div class="row">
    <p class="dit-content__breadcrumb"><a href="">INVEST</a> > de_DE</p>
    <div class="dit-selection__bar">
      <ul class="list-group list-group-horizontal col-md-4 col-md-pull-1">
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
    <div class="col-md-4 col-md-offset-1 dit-content__table">
      <table>
        <th>Name</th>
        <th>Modified</th>
        <tr>
          <td><a href="">test1.md</a></td>
          <td>3/11/16 9.15AM</td>
        </tr>
        <tr>
          <td><a href="">test2.md</a></td>
          <td>3/11/16 9.15AM</td>
        </tr>
        <tr>
          <td><a href="">test3.md</a></td>
          <td>3/11/16 9.15AM</td>
        </tr>
      </table>
    </div>
    <div class="col-md-1">
      <div class="col-md-8 col-md-push-5 panel panel-default dit-content__preview">
        <div class="panel-body">
          <p class="preview-heading">This is the title of the file</p>
          <p class="preview-description">Description goes here.</p>
        </div>
      </div>
      <a href="" class="btn btn-success btn-content-edit">Edit</a>
      <a href="" class="btn btn-danger btn-content-delete">Delete</a>
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

  .dit-selection {

    &__bar {
      background-color: $whitesmoke;
      height: 40px;
      ul {
        display: -webkit-inline-box;
        float: right;
        list-style: none;
        margin-right: 100px;

        li {
          margin-right: 120px;
          padding: 10px 0px;
        }
      }
    }
  }

  .dit-content {

    &__table {
      margin-top: 30px;

      table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
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
      /*margin-left: 80px;*/
      height: 280px;
      width: 280px;
      border: 1px solid $black;
      background-color: $grey;
      margin: 40px 0px 50px 0px;

      .preview-heading {
        font-weight: bold;
        font-size: 16px;
        margin-bottom: 50px;
      }
    }

    &__breadcrumb {
      font-size: x-large;
      padding-top: 80px;
      margin-left: 340px;
      position: relative;
    }
  }

  .btn-content-edit {
    position: absolute;
    bottom: 0px;
    left: 120px;

    @media (max-width: 1600px) {
      left: 120px;
    }
  }

  .btn-content-delete {
    position: absolute;
    bottom: 0px;
    left: 230px;

    @media (max-width: 1600px) {
      left: 220px;
    }
  }
</style>
