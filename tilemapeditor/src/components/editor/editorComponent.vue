<template>
    <div id="editorComponent" class="row h-100 w-100 mx-0">

      <tabsMenu/> <!-- onglet -->

      <tabsContent /> <!-- contenu de l'onglet -->

    </div>
    
</template>


<script lang="ts">
    import tabsMenu from '@/components/editor/components/tabsMenu.vue'
    import tabsContent from '@/components/editor/components/tabsContent.vue'

    export default {
        
        components: {
            tabsMenu,
            tabsContent,
        }
    }
</script>