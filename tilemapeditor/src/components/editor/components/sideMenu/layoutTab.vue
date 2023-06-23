<script setup lang="js">

import {ref} from "vue";
import BusEvent from "@/models/BusEvent";

let project = null;
let layers = ref([]);
let selectedLayer = ref(null);

let loadProject = (_project) => {
    project = _project;
    layers.value = _project.layers.value;
    selectedLayer.value = _project.layers.value[0].id;
}

let selectLayer = (id) => {
    selectedLayer.value = id;
    project.selectedLayer.value = id;
}

BusEvent.getInstance().on('loadProjectLayers', (project) => {
    loadProject(project);
});

</script>

<template>
    <div class="list-group">
        <template v-for="layer in layers">
            <a v-bind:class="['list-group-item list-group-item-action', (selectedLayer === layer.id ? 'active' : '')]" @click="selectLayer(layer.id)">{{layer.name}}</a>
        </template>
    </div>
</template>