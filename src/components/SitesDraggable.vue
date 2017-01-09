<template>
  <div class="row">
    <div class="col-md-4 dit-cms-pages__index" style="padding-top: 25px">
      <a href="/pages/layouts/new"><i class="fa fa-plus-circle dit-cms-pages__add-page"></i></a>
        <template v-if="status==='ready'">
            <template v-for="(site, index) in sites">
                <div v-if="site.status==='loading'">Loading...</div>
                <div v-else @click="defaultSite = index">
                  <div class="site">
                    <span class="fa fa-sitemap fa-lg"></span>
                    {{site.content.globalData.locale.countryName}}
                    ({{site.content.globalData.locale.language}})
                  </div>

                  <div v-if='site.name === sites[defaultSite].name' class="row">
                    <!-- :disabled="!site.changed"  -->
                    <input
                      class="save"
                      @click="update(site)"
                      type="button"
                      value="Save">
                    </input>
                    {{site.status}}
                    <ul class="dit-cms-pages__files container-list drag">
                      <Draggable :list="site.content.pages">
                        <TreeElement v-for="list in site.content.pages"
                                     :english="english"
                                     v-bind:list="list"
                                     @new-details="updateTree($event)"/>
                      </Draggable>
                    </ul>
                  </div>
                </div>
              </template>
        </template>
        <div v-else>{{status}}</div>
  </div>
  <metadata v-if="treeDataDetails" :model="treeDataDetails" :content="inputEditor"></metadata>
</div>
</template>

<script>
  import Draggable from 'vuedraggable';
  import TreeElement from './TreeElement';
  import Metadata from './Metadata';
  import github from '../github';

  export default {
    name: 'sites',
    components: {
      Draggable,
      TreeElement,
      Metadata
    },
    data: function () {
      return {
        status: 'loading',
        sites: [],
        defaultSite: 3,
        treeDataDetails: null,
        english: true,
        disable: false,
        selected: null,
        inputEditor: null
      }
    },
    created: function() {
      this.reload();
    },
    methods: {
      reload: function() {
        var self = this;
        self.status = 'loading';
        self.sites=[]; //clear list
        return github.loadSites()
          .then(function(files) {
            for(var i in files) {
              var site = files[i];
              self.sites.push(site);
              self.loadSite(site)
                .then(function(){
                  self.refresh();
                });
            }
            self.status = 'ready';
          })
          .catch(function(err) {
            console.error(err);
            self.status = 'failed';
          });
      },
      //refhresh view
      refresh: function() {
        //to set trigger update on element status
        //see: https://vuejs.org/v2/guide/list.html#Caveats
        this.sites.splice(this.sites.length);
      },
      loadSite: function(site) {
        site.status = 'loading';
        return github.loadSite(site.path)
          .then(function(data) {
            site.content = data;
            site.status = '';
          })
          .catch(function(err) {
            console.error(err);
            site.status = 'failed';
          });
      },
      update: function(site) {
        site.status='saving...';
        this.refresh();
        var self = this;
        return github.update(site)
          .then(function(){
            site.status='saved';
            self.refresh();
          })
          .catch(function(){
            site.status='failed'
            self.refresh();
          });
      },
      updateTree: function(model) {
        this.treeDataDetails = model
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
  .dit-cms-pages {
    &__index {
      /*margin-left: 200px;*/
      height: 1200px;
      background-color: $grey;
      overflow-y: scroll;
    }

    &__files {
      & li{
        background-color: $grey !important;
      }
    }

    &__inputs {
      background-color: $white;
      height: 1200px;
    }

    &__add-page {
      position: absolute;
      right: 0;
      margin-right: 20px;
      font-size: 30px;
      margin-top: 20px;
      color: white;
    }
  }

  .site {
    margin-bottom: 8px;
    font-size: 20px;
    font-weight: 500;

    span {
      margin-right: 6px;
    }
  }

  .glyphicon {
    margin-right: 8px;
  }

  .save {
    margin-left:40px;
    margin-bottom: 15px;
  }

</style>
