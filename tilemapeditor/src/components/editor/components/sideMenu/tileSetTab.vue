<script setup lang="js">

import {createCanvas, loadImage} from 'canvas';
import {ref} from "vue";
import pathDefaultTileSet from '@/assets/tileset_default/sheet.png'
import Tilemap from '@/models/tilemap'
import ProjectSingleton from "@/models/projectSingleton";

let tileSelect = null;
let tilsetVide = 'Aucun tileset importé'
let backgroundColor= ref("#000000")
let rougeBack = ref(0)
let vertBack = ref(0)
let bleuBack = ref(0)
let tilesDefault = ref([])
let tilesSet1=ref([])
let tilesSet2=ref([])
let tilesSet3=ref([])
const fileInput = ref(null);

//appelé au clique du bouton import
const cliqueImport = () => {

  var selectColor = document.getElementById("back").value
  backgroundColor.value=selectColor
  hexToRgb(selectColor)

  const file = fileInput.value.files[0];
  if (file) {
    var imageUrl = URL.createObjectURL(file);
    traitementImage(imageUrl)
  }
}

// Convertir une couleur hexadécimale en RGB
const hexToRgb = (hex) => {
  // Enlever le # du début si présent
  hex = hex.replace("#", "");

  // Extraire les composantes RGB
  rougeBack = parseInt(hex.substring(0, 2), 16);
  vertBack = parseInt(hex.substring(2, 4), 16);
  bleuBack = parseInt(hex.substring(4, 6), 16);
}

const supprimerTileSet = (indice) =>{
  switch (indice) {
    case 1:
      tilesSet1.value = []
      break;
    case 2:
      tilesSet2.value = []
      break;
    case 3:
      tilesSet3.value = []
      break;
  }
}

//parse l'image pour créer les tuiles
const traitementImage = async (imageUrl) => {

  const image = await loadImage(imageUrl);
  const tileWidth = 16;
  const tileHeight = 16;

  const canvas = createCanvas(image.width, image.height);
  const context = canvas.getContext('2d');
  context.drawImage(image, 0, 0);

  var nextTileSet =-1;
  if(tilesDefault.value.length === 0){
    nextTileSet=0
  }else if(tilesSet1.value.length === 0){
    nextTileSet=1
  }else if(tilesSet2.value.length === 0){
    nextTileSet=2
  }else if(tilesSet3.value.length === 0){
    nextTileSet=3
  }

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
        var rouge = rougeBack.value;
        var vert = vertBack.value ;
        var bleu = bleuBack.value;

        if(rougeBack.value == null)
          rouge = rougeBack
        if(vertBack.value == null)
          vert = vertBack
        if(bleuBack.value == null)
          bleu = bleuBack

        var couleurCourante = await detectBackgroundColor(tileDataURL);
      } catch (error) {
        console.error(error);
      }

      if (couleurCourante[0] != rouge && couleurCourante[1] != vert && couleurCourante[2] != bleu) {
        switch (nextTileSet) {
          case 0:
            tilesDefault.value.push(tileDataURL)
            break;
          case 1:
            tilesSet1.value.push(tileDataURL)
            break;
          case 2:
            tilesSet2.value.push(tileDataURL)
            break;
          case 3:
            tilesSet3.value.push(tileDataURL)
            break;
        }
      }
    }
  }
    Tilemap.tileSets.value.push(tilesDefault.value);
}

//gère la bordure au clique d'une tuile
const choixTile = (id) => {

  if(tileSelect != null){
    var imga = document.getElementById(tileSelect)
    imga.style.border= 'none'
  }
  var img = document.getElementById(id);
  img.style.border = '2px dashed red';
  tileSelect=id;

  Tilemap.selectedTile.value = id;

}

//détecte la couleur de fond d'une image
const detectBackgroundColor = async (imageUrl) => {
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

      const backgroundColor = [r, g, b];
      resolve(backgroundColor);
    };

    img.onerror = (error) => {
      reject(error);
    };
  });
}

const imageUrl = pathDefaultTileSet;
traitementImage(imageUrl);


</script>
<template>

  <div>
    <div class="input-group my-2">
      <input type="file" class="form-control" ref="fileInput" id="inputfile" accept=".png, .jpg, .jpeg">
    </div>
  </div>

  <div>
    <div class="row mb-2">
      <div class="col mx-0">
        <label class="text-secondary" for="head">Background color</label>
      </div>
      <div class="col mx-0">
      <input type="color" id="back" name="backcolor" :value="backgroundColor">
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
            <span class="mx-1 badge text-bg-secondary">{{tilesDefault.length}}</span>
          </button>
        </h2>

        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="defaultTileset" data-bs-parent="#accordionTileSet">
          <div class="d-flex flex-wrap" style="overflow: auto;height: 400px">

            <div v-for="(tile, index) in tilesDefault" :key="index" class="col-3 col-md-2 mb-4">
              <img :id="index" :src="tile" width="25" height="25" @click="choixTile(index)" class="tile"/>
            </div>

          </div>
        </div>
      </div>

      <div class="accordion-item">
        <h2 class="accordion-header" id="Tileset1">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            <svg v-on:click=supprimerTileSet(1) xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" class="me-2" :style="{ fill: '#FFFFFF' }">
              <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/>
            </svg>
            TileSet 1
            <span class="mx-1 badge text-bg-secondary">{{tilesSet1.length}}</span>
          </button>
        </h2>

        <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="Tileset1" data-bs-parent="#accordionTileSet">
          <div v-if="tilesSet1.length === 0">
            <p class="my-2">{{tilsetVide}}</p>
          </div>
          <div v-else class="d-flex flex-wrap" style="overflow: auto;height: 400px">
            <div v-for="(tile, index) in tilesSet1" :key="index" class="col-3 col-md-2 mb-4">
              <img :id="'1'+index" :src="tile" width="25" height="25" @click="choixTile('1'+index)" class="tile"/>
            </div>
          </div>
        </div>
      </div>

      <div class="accordion-item">
        <h2 class="accordion-header" id="Tileset2">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
            <svg v-on:click=supprimerTileSet(2) xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" class="me-2" :style="{ fill: '#FFFFFF' }">
              <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/>
            </svg>TileSet 2
            <span class="mx-1 badge text-bg-secondary">{{tilesSet2.length}}</span>
          </button>
        </h2>
        <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="Tileset2" data-bs-parent="#accordionTileSet">
          <div v-if="tilesSet2.length === 0">
            <p class="my-2">{{tilsetVide}}</p>
          </div>
          <div v-else class="d-flex flex-wrap" style="overflow: auto;height: 400px">
            <div v-for="(tile, index) in tilesSet2" :key="index" class="col-3 col-md-2 mb-4">
              <img :id="'2'+index" :src="tile" width="25" height="25" @click="choixTile('2'+index)" class="tile"/>
            </div>
          </div>
        </div>
      </div>

      <div class="accordion-item">
        <h2 class="accordion-header" id="Tileset3">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
            <svg v-on:click=supprimerTileSet(3) xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" class="me-2" :style="{ fill: '#FFFFFF' }">
              <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/>
            </svg>
            TileSet 3
            <span class="mx-1 badge text-bg-secondary">{{tilesSet3.length}}</span>
          </button>
        </h2>
        <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="Tileset3" data-bs-parent="#accordionTileSet">
          <div v-if="tilesSet3.length === 0">
            <p class="my-2">{{tilsetVide}}</p>
          </div>
          <div v-else class="d-flex flex-wrap" style="overflow: auto;height: 400px">
            <div v-for="(tile, index) in tilesSet3" :key="index" class="col-3 col-md-2 mb-4">
              <img :id="'3'+index" :src="tile" width="25" height="25" @click="choixTile('3'+index)" class="tile"/>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>

</template>

<script lang="js">
export default {}
</script>

<style>
  .tile {
    cursor: pointer;
  }
</style>