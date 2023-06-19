<script setup lang="js">
window.addEventListener('load', () => {
    const BORDER_SIZE = 6;
    const right_panel = document.getElementById("side-menu");

    let m_pos;

    function resize_right(e) {
        const dx = m_pos - e.x;
        m_pos = e.x;
        right_panel.style.width = (parseInt(getComputedStyle(right_panel, '').width) + dx) + "px";
    }

    right_panel.addEventListener("mousedown", function (e) {
        if (e.offsetX < BORDER_SIZE) {
            m_pos = e.x;
            document.addEventListener("mousemove", resize_right, false);
        }
    }, false);


    document.addEventListener("mouseup", function () {
        document.removeEventListener("mousemove", resize_right, false);

    }, false);
}, false);
</script>

<template>
    <div id="side-menu" class="position-relative d-flex flex-column h-100">
        <div id="side-menu-drag" class="position-absolute bg-dark"></div>
        <tileSetTab />
        <layoutTab />
        <propertiesTab />
    </div>
</template>

<script lang="js">
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

<style scoped>
#side-menu {
    flex: 0 1 auto;
    width: 200px;
    min-width: 200px;
    max-width: 500px;
}

#side-menu-drag {
    width: 6px;
    height: 100%;
    background-color: #000;
    left: 0;
    cursor: ew-resize;
}
</style>