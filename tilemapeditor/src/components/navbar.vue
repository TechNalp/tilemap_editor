<script setup lang="ts">
import PopupLogin from "@/components/login/login_popup.vue";
import EventBus from "@/models/BusEvent";
import ProjectSingleton from '@/models/projectSingleton';
import {ref} from 'vue'

let showFileMenu = ref(false);

const showFichierMenu = () => {
  showFileMenu.value = true;
}

const closeFichierMenu = () => {
  showFileMenu.value = false;
}

const openCreateModal = () => {
  EventBus.getInstance().emit("openCreateModal", []);
}

const exportJSON = () => {

  let selectedMap = ProjectSingleton.getInstance().selectedProject.value;
  let maps = ProjectSingleton.getInstance().projectList.value;

  if(selectedMap) {
    let map = maps.at(selectedMap);
    let json = map?.export();
    let name = "ExportedData.json";
    if(map?.name) {
      name = map.name + ".json";
    } 

    if (json) {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(json));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", name);
      document.body.appendChild(downloadAnchorNode); // Ajoute le nœud au corps du document
      downloadAnchorNode.click(); // Simule le clic sur le lien de téléchargement
      downloadAnchorNode.remove(); // Supprime le nœud du corps du document une fois le téléchargement terminé
    }
  }
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid mx-5">
      <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav me-auto">
          <li class="nav-item" @mouseover="showFichierMenu()" @mouseleave="closeFichierMenu()">
            <a class="nav-link"
              >Fichier
              <span class="visually-hidden">(current)</span>
            </a>
            <div v-if="showFileMenu">
              <a @click="openCreateModal" >New Map</a>
              <br>
              <a @click="exportJSON">Export</a>
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link">Edition</a>
          </li>
          <li class="nav-item">
            <a class="nav-link">Documentation</a>
          </li>
          <li class="nav-item">
            <a class="nav-link">A propos</a>
          </li>
        </ul>
        <button class="btn btn-secondary my-2 my-sm-0" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Login
        </button>
      </div>
    </div>
  </nav>
  <PopupLogin></PopupLogin>
</template>

<style>
a {
  cursor: pointer;
}
</style>
