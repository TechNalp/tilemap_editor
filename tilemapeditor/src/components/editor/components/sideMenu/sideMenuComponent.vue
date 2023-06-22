<script setup lang="js">

import {defineProps} from "vue";

const props = defineProps(['projectId']);

console.log(props);

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

        <div class="h-100 w-100">
            <div class="mx-3">

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
        </div>

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
    min-width: 320px;
    max-width: 500px;
    overflow-y: scroll;
    overflow-x: hidden;
}

#side-menu-drag {
    width: 6px;
    height: 100%;
    background-color: #000;
    left: 0;
    cursor: ew-resize;
}
</style>