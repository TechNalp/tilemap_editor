export default class Tilemap {
    name : string;
    width : number;
    height : number;
    size : number;
    layers : any[] = [];
    selected = false;
    constructor(name : string, width : number, height : number, size : number) {
        this.name = name;
        this.width = width;
        this.height = height;
        this.size = size;
        this.newCalc("layer 1");
    }

    newCalc(name : string) {
        this.layers.push({id : this.layers.length, name : name, calc : [], visible : true});
        for(let h = 0; h < this.height; h++) {
            this.layers[this.layers.length - 1].calc.push([]);
            for(let w = 0; w < this.width; w++) {
                this.layers[this.layers.length - 1].calc[h].push(0);
            }
        }
    }
}

