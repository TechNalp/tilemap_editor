<template>
   <div class="d-flex flex-row h-100 w-100">
      <canvasComponent />
      <sideMenu />
   </div>
</template>


<script lang="ts">

    import canvasComponent from '@/components/editor/components/canvasComponent.vue'
    import sideMenu from '@/components/editor/components/sideMenu/sideMenuComponent.vue'

    export default {
        components:{
            canvasComponent,
            sideMenu,
        }
    }
</script>