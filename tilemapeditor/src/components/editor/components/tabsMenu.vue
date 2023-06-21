<template>
    <ul id="tabs-menu" class="nav nav-tabs d-flex flex-row w-100">
        <li class="nav-item tab-bar" v-for="(map, index) in maps" v-bind:key="index">
            <div v-bind:class="{ 'nav-link active': isMapSelected(map), 'nav-link': !isMapSelected(map) }">
                <span aria-current="page" class="tab-head" v-on:click="changeTab(map)">{{ map.name }}</span>
                <span class="delete-icon" v-on:click="deleteMap(map)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-x" style="background-color: rgba(255, 0, 0, 0.651); margin-left: 5px;"
                        viewBox="0 0 16 16">
                        <path
                            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg></span>
            </div>
        </li>
    </ul>
</template>

<script lang="js">
import { defineComponent } from 'vue'
export default defineComponent({
    props: {
        mapsProps: {
            type: Object,
            required: true
        },
        selectedMapProps: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            maps: this.mapsProps,
            selectedMap: this.selectedMapProps
        }
    },

    methods : {
        changeTab(itemMap) {
            this.selecedMap = this.maps.find(map => map == itemMap);
        },

        deleteMap(itemMap) {
            this.maps = this.maps.filter(map => map != itemMap);
            if (itemMap == this.selecedMap) {
                this.selecedMap = this.maps.at(0);
            }
            localStorage.setItem("maps", JSON.stringify(this.maps));
        },

        isMapSelected(mapItem) {
            console.log("true")
            return mapItem == this.selecedMap;
        }
    },

    watch: {
        mapsProps(newValue) {
            this.maps = newValue;
        },

        selectedMapProps(newValue) {
            this.selectedMap = newValue
        }
    }
})
</script>

<style>
.tab-head {
    cursor: default;
}

#tabs-menu {
    flex: 1 1 50px;
    max-height: 50px;
}
</style>