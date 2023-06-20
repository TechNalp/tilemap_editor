<template>
  <div id="tab-content" class="d-flex flex-row w-100">
    <canvasComponent />
    <sideMenu />
  </div>
</template>


<script lang="ts">

    import canvasComponent from '@/components/editor/components/canvasComponent.vue'
    import SideMenu from '@/components/editor/components/sideMenu/sideMenuComponent.vue'

    export default {
        components:{
          canvasComponent,
          SideMenu,
        }
    }
</script>

<style>
    #tab-content {
        flex: 1 1 auto;
        flex-flow: row;
    }
</style>