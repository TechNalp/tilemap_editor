<script setup lang="ts">

import ProjectSingleton from "@/models/projectSingleton";

</script>

<template>
    <div class="tab-content d-flex flex-row w-100">
        <canvasComponent projectId="{{ProjectSingleton.getInstance().selectedProject}}"/>
        <sideMenu projectId="{{ProjectSingleton.getInstance().selectedProject}}"/>
    </div>
</template>


<script lang="ts">

import canvasComponent from '@/components/editor/components/canvasComponent.vue'
import sideMenu from '@/components/editor/components/sideMenu/sideMenuComponent.vue'


export default {
    components: {
        canvasComponent,
        sideMenu
    }
};

</script>

<style>
.tab-content {
    flex: 1 1 auto;
    flex-flow: row;
}
</style>