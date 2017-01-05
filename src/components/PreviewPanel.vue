<template>
  <div v-if="image" class="panel panel-default preview">
    <div class="panel-body">
      <div class="preview-heading">
        {{selected}}
      </div>
      <div class="preview-image">
         <img class="img img-fluid" :src="image" />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PreviewPanel',
    props: ['selected','image'],
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

  @import "../assets/variables.scss";

  .preview {
    width: 95%;
    height: 100%;
    border: 1px solid $black;
    background-color: $grey;
    margin: 0;

    &-heading {
      margin: 12px;
    }

    &-image {
      margin: 30px 55px;
    }
  }

  .img {
    margin: 0 auto;
  }

</style>
