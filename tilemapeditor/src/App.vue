<script setup lang="ts">

</script>

<template>
    <div class="d-flex flex-column h-100">
        <navbar/>
        <editor/>
    </div>

  <CreationMapModal v-bind:shown="showCreationModal" @cancel="closeModal()" @ok="createTileMap"></CreationMapModal>
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

    createTileMap(payload : any) {
      this.tileMap = new Tilemap(payload.name, payload.width, payload.height, payload.size);
      this.closeModal();
    }
  }
});

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
</style>
