<script setup lang="ts">

import BusEvent from "@/models/BusEvent";
import ProjectSingleton from "@/models/projectSingleton";
import { ref, Ref } from "vue";

let tabs: Ref<string[]> = ref([]);

const createTab = (id: number) => {
    console.log("create tab");
    tabs.value.push(
            `<div class="tab-content d-flex flex-row w-100">
                <canvasComponent projectId="${id}"/>
                <sideMenu projectId="${id}"/>
            </div>`
    );
}

BusEvent.getInstance().on('createTab', (id: number) => {
    createTab(id);
});

</script>

<template>

</template>


<script lang="ts">

import canvasComponent from '@/components/editor/components/canvasComponent.vue'
import SideMenu from '@/components/editor/components/sideMenu/sideMenuComponent.vue'


export default {
    components: {
        canvasComponent,
        SideMenu
    }
};

</script>

<style>
.tab-content {
    flex: 1 1 auto;
    flex-flow: row;
}
</style>