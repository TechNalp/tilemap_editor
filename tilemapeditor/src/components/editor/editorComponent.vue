<template>
    <div class="d-flex flex-column w-100 flex-fill">
    <tabsMenu v-bind:mapsProps="tileMaps" v-bind:selectedMapProps="selectedMap" class="d-flex flex-row w-100"/>
    <tabsContent class="col-auto"/>
    </div>
    
    <CreationMapModal v-bind:shown="showCreationModal" @cancel="closeModal()" @ok="createTileMap"></CreationMapModal>
</template>


<script lang="ts">
    //import tabsMenu from '@/components/editor/components/tabsMenu.vue'
    import tabsContent from '@/components/editor/components/tabsContent.vue'
    import Tilemap from '@/models/tilemap'
    import CreationMapModal from '@/components/CreationModal.vue'
    import { defineComponent } from 'vue'

    export default defineComponent({
        
        components: {
            //tabsMenu,
            tabsContent,
            CreationMapModal,
        },

        data() {
            return {
            showCreationModal : true,
            tileMaps : [] as any,
            selectedMap : null as unknown as Tilemap,
            }
        },

        methods : {
            closeModal() {
            this.showCreationModal = false;
            },

            createTileMap(payload : any) {
            this.selectedMap = new Tilemap(payload.name, payload.width, payload.height, payload.size);
            this.tileMaps.push(this.selectedMap); 
            this.closeModal();
            console.log(this.selectedMap)
            console.log(this.tileMaps);
            }
        }

    });
</script>