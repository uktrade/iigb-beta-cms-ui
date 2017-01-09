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
        <button class="btn btn-primary" @click="addLanguage">Add</button>
      </div>
    </form>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
        <tr>
          <th>
            Label
          </th>
          <!--<th v-for="key in columns"-->
              <!--@click="sortBy(key)"-->
              <!--:class="{ active: sortKey == key }">-->
            <!--{{ key | capitalize }}-->
            <!--<span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">-->
            <!--</span>-->
          <!--</th>-->
          <th v-for="key in columns">
            {{ key | capitalize }}
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

//  const labelsURL = 'https://raw.githubusercontent.com/uktrade/iigb-beta-content/master/content/labels.json'
  const labelsURL = 'https://raw.githubusercontent.com/uktrade/iigb-beta-content/feature/labels/content/_labels/labels.json'

  export default {
    name: 'labels',
    data: function () {
      let sortOrders = {}
      return {
        sortKey: '',
        sortOrders: sortOrders,
        labels: Object,
        columns: [],
        filterKey: '',
        language: '',
        newLabels: {}
      }
    },
    beforeCreate: function() {
        const xhr = new XMLHttpRequest()
        const self = this
        xhr.open('GET', labelsURL)
        xhr.onload = function () {
          const response = xhr.responseText
          self.labels = JSON.parse(response)
          for (let prop in self.labels.reasons) {
            if (Object.prototype.hasOwnProperty.call(self.labels.reasons, prop)) {
              self.columns.push(prop)
            }
          }
        }
        xhr.send()
    },
    created: function() {
      this.columns.forEach(function (key) {
        sortOrders[key] = 1
      })
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
//      console.log(sortable)
        return sortable
      }
    },
    filters: {
      capitalize: function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1)
      }
    },
    methods: {
      sortBy: function (key) {
        this.sortKey = key
        this.sortOrders[key] = this.sortOrders[key] * -1
      },
      fetchLabels: function () {
        const xhr = new XMLHttpRequest()
        const self = this
        xhr.open('GET', labelsURL)
        xhr.onload = function () {
          const response = xhr.responseText
          self.labels = response
//          console.log(response.reasons)
          for (key in response.reasons) {
            this.columns.push(key)
          }
        }
        xhr.send()
      },
      addLanguage: function () {
        for (prop in this.labels) {
          if (this.labels[prop].label){
            this.$set(this.labels, this.labels[prop]['label'][this.language], "")
            this.$set(this.labels, this.labels[prop]['options'][this.language], [])
          } else {
            this.$set(this.labels, this.labels[prop][this.language], "")
          }
        }
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
