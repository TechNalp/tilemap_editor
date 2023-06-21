<script setup lang="ts">
    import ProjectSingleton from '@/models/projectSingleton';
    import Tilemap from '@/models/tilemap';
    let maps = ProjectSingleton.getInstance().projectList;
    let selecedMap = ProjectSingleton.getInstance().selectedProject;

    const changeTab = (itemMap : Tilemap) => {
        selecedMap.value = maps.value.findIndex(map => map == itemMap);
    };

    const deleteMap = (itemMap : Tilemap) => {
        maps.value = maps.value.filter(map => map != itemMap);
        if(selecedMap.value)
        if (itemMap == maps.value.at(selecedMap.value)) {
            selecedMap.value = 0;
        }
    };

    const isMapSelected = (mapItem : Tilemap) => {
        if(selecedMap.value != null)
        return mapItem == maps.value.at(selecedMap.value);

        return false;
    }
</script>

<template>
    <ul class="nav nav-tabs">
        <li class="nav-item tab-bar" v-for="(map, index) in maps" v-bind:key="index">
            <div v-bind:class="{ 'nav-link active': isMapSelected(map), 'nav-link': !isMapSelected(map) }">
                <span aria-current="page" class="tab-head" v-on:click="changeTab(map)">{{ map.name }}</span>
                <span class="delete-icon" v-on:click="deleteMap(map)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-x" style="background-color: rgba(255, 0, 0, 0.651); margin-left: 5px;"
                        viewBox="0 0 16 16">
                        <path
                            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg></span>
            </div>
        </li>
    </ul>
</template>
  

<style>
.tab-head {
    cursor: default;
}
</style>
