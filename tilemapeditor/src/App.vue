
<template>
  <div class="vh-100 position-relative">

    <navbar/>

    <div id="containerApp" class="position-relative bottom-0" >
      <editor />
    </div>

</div>
  
</template>



<script lang="ts">
  import navbar from '@/components/navbar.vue'
  import editor from '@/components/editor/editorComponent.vue'
  
  export default {
  components: {
    navbar,
    editor,
  }
}
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
</style>
