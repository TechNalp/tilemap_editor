
<template>
  <div class="vh-100 position-relative">
  <navbar/>
  <div class="position-relative bottom-0 bg-danger">
    <editor />
  </div>
</div>

<CreationMapModal v-bind:shown="showCreationModal" @cancel="closeModal()" @ok="createTileMap()"></CreationMapModal>
</template>



<script lang="ts">
  import navbar from '@/components/navbar.vue'
  import editor from '@/components/editor/editorComponent.vue'
  import CreationMapModal from '@/components/CreationModal.vue'
  import { defineComponent } from 'vue';
  import Tilemap from '@/models/tilemap'
  
  export default defineComponent({

  components: {
    navbar,
    editor,
    CreationMapModal
  },

  data() {
    return {
      showCreationModal : true,
      tileMap : null as any,
    }
  },

  methods : {
    closeModal() {
      this.showCreationModal = false;
    }, 

    createTileMap() {
      this.tileMap = new Tilemap("new map", 10, 10, 10);
      this.closeModal();
    }
  }
});
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
