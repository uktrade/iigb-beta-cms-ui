<template>
  <div>
    <div class="col-md-4 pages__index">
      <a href="/pages/layouts/new"><i class="fa fa-plus-circle pages__add-page"></i></a>
        <template v-if="status==='ready'">
          <template v-for="(site, index) in sites">
            <div v-if="site.status==='loading'">Loading...</div>
            <div v-else @click="defaultSite = index">
              <div class="site">
                <span class="fa fa-sitemap fa-lg"></span>
                {{site.content.globalData.locale.countryName}}
                ({{site.content.globalData.locale.language}})
              </div>

              <div v-if='site.name === sites[defaultSite].name'>
                <button class="btn btn-success pull-right"
                        :disabled="saveMetadataDisabled"
                        @click="update(site)">
                  <i class="fa fa-hdd-o"></i>
                  Save
                </button>
                <div v-if="site.status === 'failed'" :class="{'alert alert-danger': site.status === 'failed'}">{{site.status}}</div>
                <ul class="pages__files container-list drag">
                  <div :list="site.content.pages">
                    <TreeElement v-for="list in site.content.pages"
                                 :english="site.content.globalData.locale.language === 'en'"
                                 :active="active"
                                 v-bind:list="list"
                                 @new-details="updateTree($event)"/>
                  </div>
                </ul>
              </div>
            </div>
          </template>
        </template>
        <div v-else class="alert alert-danger">{{status}}</div>
  </div>
  <metadata v-if="treeDataDetails"
            :model="treeDataDetails"
            :content="inputEditor"
            @metadata-save-btn="saveMetadataDisabled = $event"></metadata>
</div>
</template>

<script>
  import Draggable from 'vuedraggable';
  import TreeElement from './TreeElement';
  import Metadata from './Metadata';
  import github from '../github';
  import { globalBus } from '../main.js'

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
        saveMetadataDisabled: true,
        selected: null,
        inputEditor: null,
        active: ''
      }
    },
    created: function() {
      this.reload();
    },
    mounted() {
      globalBus.$on('active', this.setActive)
  },
    methods: {
      reload: function() {
        let self = this;
        self.status = 'loading';
        self.sites=[]; //clear list
        return github.loadSites()
          .then(function(files) {
            for(let i in files) {
              let site = files[i];
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
        let self = this;
        return github.update(site)
          .then(function(){
            site.status = 'saved';
            self.saveMetadataDisabled = true
            self.refresh();
          })
          .catch(function(){
            site.status = 'failed'
            self.refresh();
          });
      },
      updateTree (model) {
        this.treeDataDetails = model
      },
      setActive (val) {
        this.active = val
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
  .pages {
    &__index {
      height: 1200px;
      background-color: $grey;
      overflow-y: scroll;
      padding-top: 28px;
    }

    &__files {
      /*& li{*/
        /*background-color: $grey !important;*/
      /*}*/
    }

    &__add-page {
      position: absolute;
      right: 0;
      margin-right: 20px;
      font-size: 30px;
      margin-top: -20px;
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
</style>
