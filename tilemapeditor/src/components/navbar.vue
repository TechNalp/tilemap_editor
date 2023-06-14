<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <div class="collapse navbar-collapse" id="navbarColor01">
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <a class="nav-link">Fichier
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
    </div>
  </div>
</nav>
</template>



<script lang="ts">
import { Vue } from 'vue-class-component';


export default class navbar extends Vue{}

</script>


<style>

a{
    cursor: pointer;
}

</style>