<template>

  <div>
    <div class="input-group my-3">
      <input type="file" class="form-control" ref="fileInput"  id="inputfile" accept=".png, .jpg, .jpeg">
    </div>
  </div>

  <div>
    <div class="row mb-2">
      <div class="col mx-0">
        <input type="number" class="form-control" placeholder="R" aria-label="R"  min="0" max="255" v-model="rougeBack">
      </div>
      <div class="col mx-0">
        <input type="number" class="form-control" placeholder="G" aria-label="G" min="0" max="255" v-model="vertBack">
      </div>
      <div class="col mx-0">
        <input type="number" class="form-control" placeholder="B" aria-label="B"   min="0" max="255" v-model="bleuBack">
      </div>
    </div>

    <div class="row mb-2">
      <div class="col mx-0">
          <button type="button" class="btn btn-dark" id="boutonID" @click="cliqueImport">Import</button>
      </div>
    </div>
  </div>

  <div>
      <div class="accordion" id="accordionTileSet">
        <div class="accordion-item">

          <h2 class="accordion-header" id="defaultTileset">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              Default tileset
            </button>
          </h2>

          <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="defaultTileset" data-bs-parent="#accordionTileSet">

            <div class="d-flex flex-wrap" style="overflow: auto;height: 400px">
              <div v-for="(tile, index) in tilesDefault" :key="index" class="col-3 col-md-2 mb-4">
                <img :src="tile" alt="Tile" width="25" height="25"/>
              </div>
            </div>

          </div>
        </div>

        <div class="accordion-item">
          <h2 class="accordion-header" id="headingTwo">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              Accordion Item #2
            </button>
          </h2>
          <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
            </div>
          </div>
        </div>
      </div>
    </div>

</template>

<script>
import { createCanvas, loadImage } from 'canvas';

export default {
  mounted() {
    const imageUrl = this.pathDefaultTileSet
    this.traitementImage(imageUrl)

  },
  data() {
    return {
      pathDefaultTileSet: require('@/assets/tileset_default/sheet.png'),
      rougeBack :0,
      vertBack :0,
      bleuBack :0,
      tilesDefault: [],
    };
  },
  methods: {
    //appelé au clique du bouton import
    cliqueImport(){
      if(this.$refs.fileInput.files[0] == null){
        alert("Choisir un fichier")
      }else{
        const file = this.$refs.fileInput.files[0];
        var imageUrl = URL.createObjectURL(file);
        this.traitementImage(imageUrl)

      }

    },
    //parse l'image pour créer les tuiles
    async traitementImage(imageUrl) {

      const image = await loadImage(imageUrl);
      const tileWidth = 16;
      const tileHeight = 16;

      const canvas = createCanvas(image.width, image.height);
      const context = canvas.getContext('2d');
      context.drawImage(image, 0, 0);

      for (let y = 0; y < image.height; y += tileHeight) {
        for (let x = 0; x < image.width; x += tileWidth) {
          const tileCanvas = createCanvas(tileWidth, tileHeight);
          const tileContext = tileCanvas.getContext('2d');
          tileContext.imageSmoothingEnabled = true;
          tileContext.drawImage(
              canvas,
              x,
              y,
              tileWidth,
              tileHeight,
              0,
              0,
              tileWidth,
              tileHeight
          );

          const tileDataURL = tileCanvas.toDataURL();

          try {
            var couleurCourante = await this.detectBackgroundColor(tileDataURL);
          } catch (error) {
            console.error(error);
          }

          if(couleurCourante[0] != this.rougeBack && couleurCourante[1] != this.vertBack && couleurCourante[2] != this.bleuBack){
            this.tilesDefault.push(tileDataURL);
          }
        }
      }
    },
    //détecte la couleur de fond d'une image
    async detectBackgroundColor(imageUrl) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = imageUrl;

        const canvas = createCanvas(img.width, img.height);
        const context = canvas.getContext('2d');

        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          context.drawImage(img, 0, 0, img.width, img.height);

          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          const pixelData = imageData.data;

          let r = 0;
          let g = 0;
          let b = 0;

          // Calculate the average RGB values
          for (let i = 0; i < pixelData.length; i += 4) {
            r += pixelData[i];
            g += pixelData[i + 1];
            b += pixelData[i + 2];
          }

          const totalPixels = pixelData.length / 4;
          r = Math.round(r / totalPixels);
          g = Math.round(g / totalPixels);
          b = Math.round(b / totalPixels);

          const backgroundColor = [r,g,b];
          resolve(backgroundColor);
        };

        img.onerror = (error) => {
          reject(error);
        };
      });
    },
  }
}
</script>