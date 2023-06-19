<template>

  <div class="">

    <ul class="nav nav-tabs" id="myTab" role="tablist">

      <li class="nav-item" role="presentation">
        <button class="nav-link active" id="tileset-tab" data-bs-toggle="tab" data-bs-target="#tileset-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">TileSet</button>
      </li>

      <li class="nav-item" role="presentation">
        <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#layout-tab-pane" type="button" role="tab" aria-controls="layout-tab-pane" aria-selected="false">Layouts</button>
      </li>

      <li class="nav-item" role="presentation">
        <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#properties-tab-pane" type="button" role="tab" aria-controls="properties-tab-pane" aria-selected="false">Properties</button>
      </li>

    </ul>

    <div class="tab-content" id="myTabContent">

      <div class="tab-pane fade show active" id="tileset-tab-pane" role="tabpanel" aria-labelledby="tilset-tab" tabindex="0">
        <tileSetTab />
      </div>

      <div class="tab-pane fade" id="layout-tab-pane" role="tabpanel" aria-labelledby="layout-tab" tabindex="0">
        <layoutTab />
      </div>

      <div class="tab-pane fade" id="properties-tab-pane" role="tabpanel" aria-labelledby="properties-tab" tabindex="0">
        <properties-tab/>
      </div>

    </div>
  </div>

</template>



<script lang="ts">
    import tileSetTab from '@/components/editor/components/sideMenu/tileSetTab.vue'
    import layoutTab from '@/components/editor/components/sideMenu/layoutTab.vue'
    import propertiesTab from '@/components/editor/components/sideMenu/propertiesTab.vue'

    export default {
        components:{
          tileSetTab,
          layoutTab,
          propertiesTab
        }
    }
</script>