<!-- src/components/Sidebar.vue -->

<template>
  <div class="col-md-2 sidebar-wrapper">
    <div class="sidebar">
      <ul class="sidebar-nav">
        <router-link to="/pages" tag="li" active-class="active">Markets</router-link>
        <router-link to="/content" tag="li" active-class="active">Content</router-link>
        <router-link to="/media" tag="li" active-class="active">Media</router-link>
        <router-link to="/labels" tag="li" active-class="active">Labels</router-link>
      </ul>
    </div>
    <div>
      <a class="sidebar-logout"
         @click="logout()">Logout</a>
    </div>
  </div>
</template>

<script>
  import auth from '../auth'

  export default {
    data() {
      return {
        error: ''
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
    width: 16.63%;
    position: fixed;
    margin-left: -29px;

    &-wrapper {
      height: 1200px;
      background-color: $darkgrey;
    }

    &-logout {
      display: block;
      cursor: pointer;
      line-height: 40px;
      height: 100px;
      width: 16.65%;
      text-align: center;
      padding: 30px;
      margin-left: -15px;
      font-size: 20px;
      color: #fff !important;
      background-color: $logout;
      position: fixed;
      bottom: 0;
    }

  &-nav {
      width: 100%;
      padding: 0;
      list-style: none;

      li {
        line-height: 40px;
        margin: 0 -15px;
        display: block;
        border: 1px solid $darkgrey;
        height: 100px;
        text-align: center;
        padding: 30px;
        color: $white;
        font-size: 20px;
        background-color: #222;

        &.active {
           background-color: $grey;
           color: $black;
           border: 0;
        }

        &:hover {
          text-decoration: none;
          color: $white;
          background: rgba(255, 255, 255, 0.2);
          cursor: pointer !important;
        }

        &:active, &:focus {
          text-decoration: none;
        }
      }
    }
  }
</style>
