<template>
  <table>
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
          <input name="query" v-model="entry[1]['label'][key]">
        </template>

        <template v-if="entry[1]['options']">
          <template v-for="(item,index) in entry[1]['options'][key]">
            <input name="query" v-model="entry[1]['options'][key][index]">
          </template>
        </template>

        <template v-else>
          <input name="query" v-model="entry[1][key]">
        </template>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    name: 'labels',
    props: {
      data: Object,
      columns: Array,
      filterKey: String
    },
    data: function () {
      let sortOrders = {}
      this.columns.forEach(function (key) {
        sortOrders[key] = 1
      })
      return {
        sortKey: '',
        sortOrders: sortOrders
      }
    },
    computed: {
      filteredData: function () {
        let sortKey = this.sortKey
        let filterKey = this.filterKey && this.filterKey.toLowerCase()
        let order = this.sortOrders[sortKey] || 1
        let dataIn = this.data
        let data = [];
        for (let label in dataIn) {
          let obj1 = {'labels': label}
          let obj2 = dataIn[label]
          let newObj = Object.assign(obj1, obj2);
          data.push(newObj)
        }

        console.log(data)
        if (filterKey) {
          data = data.slice().filter(function (row) {
            return Object.keys(row).some(function (key) {
              return String(row[key]).toLowerCase().indexOf(filterKey) > -1
            })
          })
        }
        if (sortKey) {
          data = data.sort(function (a, b) {
            a = a[sortKey]
            b = b[sortKey]
            return (a === b ? 0 : a > b ? 1 : -1) * order
          })
        }
        return data
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
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../assets/variables.scss";

  table {
    border: 1px solid $modal-editor-border;
    border-radius: 3px;
    background-color: $white;
  }

  th {
    background-color: $grey;
    color: $black;
    /*cursor: pointer;*/
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  td {
    background-color: $modal-editor-background;
  }

  th, td {
    min-width: 120px;
    padding: 5px 10px;
  }

  th.active {
    color: $black;
  }

  th.active .arrow {
    opacity: 1;
  }

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
</style>
