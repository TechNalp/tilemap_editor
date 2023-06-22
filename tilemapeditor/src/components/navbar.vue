<script setup lang="ts">
import PopupLogin from "@/components/login/login_popup.vue";
import EventBus from "@/models/BusEvent";

const openCreateModal = () => {
  EventBus.getInstance().emit("openCreateModal", []);
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid mx-5">
      <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <a class="nav-link" @click="openCreateModal"
              >Fichier
              <span class="visually-hidden">(current)</span>
            </a>
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
