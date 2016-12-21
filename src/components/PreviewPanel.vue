<template>
	    <div class="panel panel-default dit-media__preview">
          <div class="panel-body">
          {{selected}}

          <div class="preview-image">
              <img :src="image" />
          </div>
          </div>
        </div>
</template>

<script>
  let treeDetails = null

  export default {
    name: 'PreviewPanel',
    components: {
    },
    props: ['selected','image'],
    data: function () {
      return {
      }
    },
    methods: {
    },
    computed: {
      getType: function () {
      }
    }
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

  @import "../assets/variables.scss";

  .dit-media {

    &__preview {
      /*margin-left: 80 px;*/
      height: 280px;
      width: 280px;
      border: 1px solid $black;
      background-color: $grey;
      margin: 0;

      .preview-heading {
        font-weight: bold;
        font-size: 16px;
        margin-bottom: 50px;
      }

      .preview-image {
        margin-top: 30px;

      img{
        max-height: 220px;
        max-width: 300px;
      }
        width: 100px;
        height: 200px;
      }
    }
  }

  .preview-heading {
    margin-top: 12px;
  }
</style>
