<template>
    <div id="editor" class="d-flex flex-column w-100">
        <tabsMenu/>
        <tabsContent/>
    </div>
</template>


<script lang="ts">
    //import tabsMenu from '@/components/editor/components/tabsMenu.vue'
    import tabsContent from '@/components/editor/components/tabsContent.vue'

    export default {
        
        components: {
            //tabsMenu,
            tabsContent,
        }

    }
</script>

<style>
    #editor {
        flex: 1 1 auto;
        flex-flow: column;
    }
</style>