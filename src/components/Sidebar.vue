<!-- src/components/Sidebar.vue -->

<template>
  <div class="dit-cms-sidebar__wrapper">
    <ul class="dit-cms-sidebar__nav">
      <li>
        <a :class="{ active: isPages }" href="/Pages">Pages</a>
      </li>
      <li>
        <a :class="{ active: isContent }" href="/Content">Content</a>
      </li>
      <li>
        <a :class="{ active: isMedia }" href="/Media">Media</a>
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
      if (this.$route.name == 'pages' || this.$route.name == 'layouts') {
        this.isPages = true;
      } else if (this.$route.name == 'content') {
        this.isContent = true;
      } else if (this.$route.name == 'media') {
        this.isMedia = true;
      }

    },
    methods: {},
    logout(){
      //
    }
  }
</script>
