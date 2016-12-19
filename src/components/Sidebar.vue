  <!-- src/components/Sidebar.vue -->

  <template>
        <div class="dit-cms-sidebar__wrapper">
            <ul class="dit-cms-sidebar__nav">
                <li>
                    <a v-bind:class="{ active: isPages }" href="/Pages">Pages</a>
                </li>
                <li>
                    <a v-bind:class="{ active: isContent }" href="/Content">Content</a>
                </li>
                <li>
                    <a v-bind:class="{ active: isMedia }" href="/Media">Media</a>
                </li>
            </ul>
            <div class="dit-cms-sidebar__logout">
              <a href="#">Logout</a>
            </div>
        </div>


  </template>

  <script>
  

  export default {
    data() {
      return {
        isPages: false,
        isContent: false,
        isMedia: false,
        error: ''
      }
    },
     mounted() {
      console.log(this.$route.name)
      if (this.$route.name == 'pages' || this.$route.name == 'layouts'){
        this.isPages = true;
      }else if (this.$route.name == 'content'){
        this.isContent = true;
      }else if (this.$route.name == 'media'){
        this.isMedia = true;
      }
     
     },
    methods: {

      },
      logout(){
      
      }
    }
  

  </script>

  <style lang="scss">

  @import "../assets/variables.scss";

  .dit-cms-sidebar {
    &__wrapper {
        z-index: 1000;
        position: fixed;
        left: $sidebarWidthLG;
        width: $sidebarWidthLG;
        height: 100%;
        margin-left: -180px;
        background-color: $darkgrey;
        /*overflow-y: auto;*/
        /*-webkit-transition: all 0.5s ease;
        -moz-transition: all 0.5s ease;
        -o-transition: all 0.5s ease;
        transition: all 0.5s ease;*/
    }
    &__nav {
        position: absolute;
        top: 0;
        width: 180px;
        margin: 0;
        padding: 0;
        list-style: none;
        li {
            line-height: 40px;
            background: $black;
            a {
                display: block;
                text-decoration: none;
                border: 1px solid $darkgrey;
                border-width: 1px 0px;
                height: 100px;
                text-align: center;
                padding: 30px;
                font-size: 20px;
                color: $white;
                &.active {
                background-color: $grey;
                color: $black;
                }
            }
        }
    }
    &__logout {
        line-height: 40px;
        display: block;
        height: 100px;
        text-align: center;
        padding: 30px;
        font-size: 20px;
        color: #fff;
        background-color: darkred;
        position: fixed;
        bottom: 0;
        width: $sidebarWidthLG;
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
            &:active,
            &:focus {
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

    &__wrapper {
        width: $sidebarWidthMD;
    }
    &__nav {
        width: $sidebarWidthMD;
    }
    &__logout {
        width: $sidebarWidthMD;
    }   
}  

    
    @media (max-width: 1400px) {

    &__wrapper {
        display: none;
    }
    &__nav {
        display: none;
    }
    &__logout {
        display: none;
    }   
}
}
    
</style>
