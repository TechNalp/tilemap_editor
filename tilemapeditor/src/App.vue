<script setup lang="ts">

</script>

<template class="no-select">
    <div id="ws" class="d-flex flex-column h-100">
        <navbar/>
        <editor/>
    </div>

    <CreationMapModal v-bind:shown="showCreationModal" @cancel="closeModal()" @ok="createTileMap()"></CreationMapModal>
</template>


<script lang="ts">

import navbar from '@/components/navbar.vue'
import editor from '@/components/editor/editorComponent.vue'
import CreationMapModal from '@/components/CreationModal.vue'
import {defineComponent} from 'vue';
import Tilemap from '@/models/tilemap'

export default defineComponent({

    components: {
        navbar,
        editor,
        CreationMapModal
    },

    data() {
        return {
            showCreationModal: true,
            tileMap: null as any,
        }
    },

    methods: {
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

#ws {
    flex-flow: column;
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
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
}

</style>
