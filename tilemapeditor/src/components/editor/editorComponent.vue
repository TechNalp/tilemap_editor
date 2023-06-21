<script setup lang="ts">
    import Tilemap from '@/models/tilemap';
    import ProjectSingleton from '@/models/projectSingleton';
    import { ref } from 'vue';
    import { Ref } from 'vue';

    let showCreationModal = ref(true);
    let tileMaps = ProjectSingleton.getInstance().projectList.value;
    let selectedMap = ProjectSingleton.getInstance().selectedProject.value;

    const closeModal = () => {
        showCreationModal.value = false;
    };

    const createTileMap = (payload : any) => {
        let map = new Tilemap(payload.name, payload.width, payload.height, payload.size);
        tileMaps.push(map); 
        selectedMap = tileMaps.findIndex(el => el == map);
        closeModal();
    };
</script>

<template>
    <div class="d-flex flex-column w-100 flex-fill">
    <tabsMenu class="d-flex flex-row w-100"/>
    <tabsContent class="col-auto"/>
    </div>
    
    <CreationMapModal v-bind:shown="showCreationModal" @cancel="closeModal" @ok="createTileMap"></CreationMapModal>
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