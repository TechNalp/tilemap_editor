<script setup lang="ts">
    import Tilemap from '@/models/tilemap';
    import ProjectSingleton from '@/models/projectSingleton';
    import BusEvent from '@/models/BusEvent';
    import { ref } from 'vue';

    let showCreationModal = ref(true);
    let tileMaps = ProjectSingleton.getInstance().projectList;
    let selectedMap = ProjectSingleton.getInstance().selectedProject;

    const openModal = () => {
        showCreationModal.value = true;
    }

    const closeModal = () => {
        showCreationModal.value = false;
    };

    const createTileMap = (payload : any) => {
        let map = new Tilemap(tileMaps.value.length, payload.name, payload.width, payload.height);
        tileMaps.value.push(map);
        selectedMap.value = tileMaps.value.findIndex(el => el == map);

        BusEvent.getInstance().emit("loadProjectCanvas", [map]);

        console.log(selectedMap)
        closeModal();
    };

    BusEvent.getInstance().on("openCreateModal", openModal);
</script>

<template>
    <div id="editor" class="d-flex flex-column w-100">
        <tabsMenu />
        <tabsContent />
    </div>

    <CreationMapModal v-bind:shown="showCreationModal" @cancel="closeModal()" @ok="createTileMap"></CreationMapModal>
</template>

<script lang="ts">

    import tabsMenu from '@/components/editor/components/tabsMenu.vue'
    import tabsContent from '@/components/editor/components/tabsContent.vue'
    import CreationMapModal from '@/components/CreationModal.vue'
    export default {
        
        components: {
            tabsMenu,
            tabsContent,
            CreationMapModal,
        }

    };
</script>

<style>
    #editor {
        flex: 1 1 auto;
        flex-flow: column;
    }
</style>