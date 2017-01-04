<!-- src/components/Sidebar.vue -->

<template>
  <div>
    <div class="col-md-2 dit-sidebar__wrapper">
      <ul class="dit-sidebar__nav">
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
      <div class="dit-sidebar__logout">
        <a href @click="logout()">Logout</a>
      </div>
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

  .dit-sidebar {
    &__wrapper {
       height: 1200px;
       background-color: $darkgrey;
    }

    &__nav {
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
        }
      }
    }

    &__logout {
      line-height: 40px;
      display: block;
      height: 100px;
      width: 16.6%;
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

    &__nav {
      li a {
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

      > .sidebar-brand {
        height: 65px;
        font-size: 18px;
        line-height: 60px;

        a {
          color: #999999;

          &:hover {
             color: #fff;
             background: none;
          }
        }
      }
    }

    @media (max-width: 1600px) {

    /*&__wrapper {*/
      /*width: $sidebarWidthMD;*/
    /*}*/
    /*&__nav {*/
       /*width: $sidebarWidthMD;*/
     /*}*/
    /*&__logout {*/
       /*width: $sidebarWidthMD;*/
     /*}*/
    }


    @media (max-width: 1400px) {

    /*&__wrapper {*/
      /*display: none;*/
    /*}*/
    /*&__nav {*/
       /*display: none;*/
     /*}*/
    /*&__logout {*/
       /*display: none;*/
     /*}*/
    /*}*/
    }
  }
</style>
