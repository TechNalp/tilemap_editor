<script setup lang="ts">

</script>

<template>
    <div class="d-flex flex-column h-100 no-select">
        <navbar/>
        <editor/>
    </div>
</template>


<script lang="ts">

import navbar from '@/components/navbar.vue'
import editor from '@/components/editor/editorComponent.vue'

export default {

    components: {
        navbar,
        editor
    },
};

</script>


<style lang="scss">

html, body {
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.no-select {
  user-select: none;
}
</style>
