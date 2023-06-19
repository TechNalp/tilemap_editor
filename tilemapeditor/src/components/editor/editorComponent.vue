<template>
    <div class="d-flex flex-column w-100 flex-fill">
    <tabsMenu class="d-flex flex-row w-100"/>
    <tabsContent class="col-auto"/>
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