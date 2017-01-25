<template>
  <div class="col-md-10 top">
    <form class="form-group" id="search">
      <div class="row">
        <div class="col-md-1">
          Search
        </div>
        <div class="col-md-3">
          <input class="form-control" name="query" v-model="filterKey">
        </div>
        <div class="offset-md-2 col-md-2">
        Add language
        </div>
        <div class="col-md-3">
          <input class="form-control" name="query" v-model="language" placeholder="language code_COUNTRY CODE">
        </div>
        <button class="btn btn-primary" @click="addLanguage()">Add</button>
      </div>
    </form>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
        <tr>
          <th>
            Label
          </th>
          <th v-for="key in columns">
            {{ key }}
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(entry, key) in filteredData">
          <td>
            {{entry[0]}}
          </td>
          <td v-for="key in columns">
            <template v-if="entry[1]['label']">
              <input class="form-control" name="query" v-model="entry[1]['label'][key]">
            </template>

            <template v-if="entry[1]['options']">
              <template v-for="(item,index) in entry[1]['options'][key]">
                <input class="form-control" name="query" v-model="entry[1]['options'][key][index]">
              </template>
            </template>

            <template v-else>
              <input class="form-control" name="query" v-model="entry[1][key]">
            </template>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

  const jsyaml = require('js-yaml')

  const labelsURL = 'https://raw.githubusercontent.com/uktrade/iigb-beta-content/master/content/_labels/labels.md'

  export default {
    name: 'labels',
    data: function () {
      let sortOrders = {}
      return {
        sortKey: '',
        sortOrders: sortOrders,
        labels: {},
        columns: [],
        filterKey: '',
        language: '',
      }
    },
    created: function() {
      if (sessionStorage.getItem('labels')) {
        this.columns = JSON.parse(sessionStorage.getItem('columns'))
        this.labels = JSON.parse(sessionStorage.getItem('labels'))
      } else {
        const xhr = new XMLHttpRequest()
        const self = this
        let metadata = {}
        xhr.open('GET', labelsURL)
        xhr.onload = function () {
          xhr.responseText.replace(/^(---\n)((.|\n)*?)---\n?/, function (match, dashes, frontmatter) {
            try {
              metadata = jsyaml.safeLoad(frontmatter)
            } catch (err) {
              console.log('ERROR encoding YAML')
              console.log(err)
            }
            return ''
          }),
          self.labels = Object.assign({}, self.labels, metadata)
          for (let prop in metadata.contact) {
            let i = Object.keys(metadata.contact).indexOf(prop)
            if (Object.prototype.hasOwnProperty.call(metadata.contact, prop)) {
              self.columns.splice(i, 1, prop)
            }
          }
          self.columns.forEach(function (key) {
            self.sortOrders[key] = 1
          })
        }
        xhr.send()
      }
    },
    computed: {
      filteredData: function () {
        const sortKey = this.sortKey
        const filterKey = this.filterKey && this.filterKey.toLowerCase()
        const order = this.sortOrders[sortKey] || 1
        const data = this.labels
        let sortable = [];
        for (let label in data)
          sortable.push([label, data[label]])
        if (filterKey) {
          sortable = sortable.slice().filter(function (row) {
            return Object.keys(row).some(function (key) {
              return String(row[key]).toLowerCase().indexOf(filterKey) > -1
            })
          })
        }
        if (sortKey) {
          sortable = sortable.sort(function (a, b) {
            a = a[sortKey]
            b = b[sortKey]
            return (a === b ? 0 : a > b ? 1 : -1) * order
          })
        }
        return sortable
      }
    },
    methods: {
      addLanguage: function () {
        for (let prop in this.labels) {
          if (this.labels[prop].hasOwnProperty('label')){
            this.labels[prop]['label'] = Object.assign({}, this.labels[prop]['label'], this.labels[prop]['label'][this.language] = "")
            this.labels[prop]['options'] = Object.assign({}, this.labels[prop]['options'], this.labels[prop]['options'][this.language] = this.labels[prop]['options']['en_US'])
          } else {
            this.labels[prop] = Object.assign({}, this.labels[prop], this.labels[prop][this.language] = "")
          }
        }
        this.columns = []
        for (let prop in this.labels.contact) {
          if (Object.prototype.hasOwnProperty.call(this.labels.contact, prop)) {
            this.columns.push(prop)
          }
        }
//        todo: save in github instead of sessionStorage
        sessionStorage.setItem('columns', JSON.stringify(this.columns))
        sessionStorage.setItem('labels', JSON.stringify(this.labels))
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
  .arrow {
    display: inline-block;
    vertical-align: middle;
    width: 0;
    height: 0;
    margin-left: 5px;
    opacity: 0.66;
  }

  .arrow.asc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid $black;
  }

  .arrow.dsc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid $black;
  }

  .top {
    margin-top: 12px;
  }
</style>
