<template>
    <div class="row h-100">
    <tabsMenu class="col"/>
    <tabsContent class="col-auto bg-warning"/>
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