<template>
    <div id="lui" class="row h-100 px-0 mx-0">

      <div class="col-8">
        <canvasComponent />
      </div>

      <div id="content" class="col-4 pe-2" >
      <SideMenuComponent/>
    </div>

    </div>
</template>


<script lang="ts">

    import canvasComponent from '@/components/editor/components/canvasComponent.vue'
    import SideMenuComponent from '@/components/editor/components/sideMenu/sideMenuComponent.vue'

    export default {
        components:{
          canvasComponent,
          SideMenuComponent,
        }
    }
</script>