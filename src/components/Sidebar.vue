<!-- src/components/Sidebar.vue -->

<template>
  <div class="col-md-2 sidebar-wrapper">
    <div class="sidebar">
      <ul class="sidebar-nav">
        <li>
          <a :class="{ active: isPages }" href="/Pages">Markets</a>
        </li>
        <li>
          <a :class="{ active: isContent }" href="/Content">Content</a>
        </li>
        <li>
          <a :class="{ active: isMedia }" href="/Media">Media</a>
        </li>
        <li>
          <a :class="{ active: isLabels }" href="/Labels">Labels</a>
        </li>
      </ul>
    </div>
    <div class="sidebar-logout">
      <a href @click="logout()">Logout</a>
    </div>
  </div>
</template>

<script>
  import auth from '../auth'

  export default {
    data() {
      return {
        isPages: false,
        isContent: false,
        isMedia: false,
        isLabels: false,
        error: ''
      }
    },
    mounted() {
//      console.log(this.$route.name)
      if (this.$route.name == 'pages' || this.$route.name == 'layouts') {
        this.isPages = true;
      } else if (this.$route.name == 'content') {
        this.isContent = true;
      } else if (this.$route.name == 'media') {
        this.isMedia = true;
      } else if (this.$route.name == 'labels') {
        this.isLabels = true;
      }

    },
    methods: {
      logout(){
      auth.logout()
    }
  },
  }
</script>

<style scoped lang="scss">
  @import "../assets/variables.scss";

  .sidebar {
    width: 16.64%;
    position: fixed;
    margin-left: -29px;

    &-wrapper {
      height: 1200px;
      background-color: $darkgrey;
    }

    &-logout {
       line-height: 40px;
       height: 100px;
       width: 16.65%;
       text-align: center;
       padding: 30px;
       margin-left: -15px;
       font-size: 20px;
       color: #fff;
       background-color: $logout;
       position: fixed;
       bottom: 0;

      a {
        color: #fff;
      }
    }

    &-nav {
      width: 100%;
      padding: 0;
      list-style: none;

      li {
        line-height: 40px;
        background: $black;
        margin: 0 -15px;

      a {
        display: block;
        text-decoration: none;
        border: 1px solid $darkgrey;
        height: 100px;
        text-align: center;
        padding: 30px;
        font-size: 20px;
        color: $white;
        background-color: #222;

          &.active {
             background-color: $grey;
             color: $black;
             border: 0;
          }

          &:hover {
            text-decoration: none;
            color: #fff;
            background: rgba(255, 255, 255, 0.2);
            cursor: pointer !important;
          }

          &:active, &:focus {
            text-decoration: none;
          }
        }
      }
    }
  }
</style>
