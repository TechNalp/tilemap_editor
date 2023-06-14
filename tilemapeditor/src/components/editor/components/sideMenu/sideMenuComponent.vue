<template>
    <tileSetTab />
    <layoutTab />
    <propertiesTab />
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