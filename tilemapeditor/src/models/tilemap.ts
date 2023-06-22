import {Ref, ref} from "vue";

export default class Tilemap {
    id : number | null = null;
    name : string;
    width : number;
    height : number;
    cellSize : number;
    tileSets : Ref<any[]> = ref([]);
    selectedTile : Ref<number | null> = ref(null);
    layers : Ref<any[]> = ref([]);
    constructor(name : string, width : number, height : number, size : number) {
        this.name = name;
        this.width = width;
        this.height = height;
        this.cellSize = size;

        this.newLayer("Layer 1");
    }

    newLayer(name : string) {
        this.layers.value.push({id : this.layers.value.length, name : name, layer : [], visible : true});
        for(let h = 0; h < this.height; h++) {
            this.layers.value[this.layers.value.length - 1].layer.push([]);
            for(let w = 0; w < this.width; w++) {
                this.layers.value[this.layers.value.length - 1].layer[h].push(0);
            }
        }
    }
}

