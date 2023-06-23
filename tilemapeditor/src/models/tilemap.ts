import {Ref, ref} from "vue";

export default class Tilemap {
    id : number | null = null;
    name : string;
    width : number;
    height : number;
    cellSize : number;
    static tileSets : Ref<any[]> = ref([]);
    static selectedTile : Ref<number | null> = ref(null);
    layers : Ref<any[]> = ref([]);
    constructor(id : number, name : string, width : number, height : number) {
        this.id = id;
        this.name = name;
        this.width = width;
        this.height = height;
        this.cellSize = 16;

        this.newLayer("Layer 1");
    }

    newLayer(name : string) {
        this.layers.value.push({id : this.layers.value.length, name : name, layer : [], visible : true});
        for(let h = 0; h < this.height; h++) {
            this.layers.value[this.layers.value.length - 1].layer.push([]);
            for(let w = 0; w < this.width; w++) {
                this.layers.value[this.layers.value.length - 1].layer[h].push(null);
            }
        }
    }

    export() {
        let json = {
            'name' : this.name,
            'width' : this.width,
            'height' : this.height,
            'cellSize' : this.cellSize,
            'layers' : this.layers
        }

        return JSON.stringify(json);
    }

    importFromJSON(json : string) {
        const parsedJSON = JSON.parse(json);
    
        try {
            this.name = parsedJSON.name;
            this.width = parsedJSON.width;
            this.height = parsedJSON.height;
            this.cellSize = parsedJSON.cellSize;
            this.layers.value = parsedJSON.layers;
        } catch(e) {
            console.log("import impossible");
        }
        
      }
}

