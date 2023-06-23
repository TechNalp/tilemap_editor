<script setup lang="js">

import BusEvent from "@/models/BusEvent";
import ProjectSingleton from "@/models/projectSingleton";
import Tilemap from "@/models/tilemap";
import {ref} from "vue";


let gridInterval = null;

let canvas;
let canvas_ctx;

let grid;
let grid_ctx;

let draw_grid = true;

let selected_cell_x = ref(-1);
let selected_cell_y = ref(-1);

let canvas_container;

let editor;

let cell_count = {w: 0, h: 0};
let tile_size = {w: 0, h: 0};

let grid_color = "#ddd";

let zoom;
let zoom_step;
let zoom_max;
let zoom_min;

let canvas_width;
let canvas_height;

let m_pos;

let getCellSize = () => {
    return {w: canvas_width / cell_count.w, h: canvas_height / cell_count.h};
}

let getCellSizeAtZoom = () => {
    return {w: getCellSize().w * zoom, h: getCellSize().h * zoom};
}

let drawGrid = () => {

    grid_ctx.clearRect(0, 0, canvas_width, canvas_height);

    if (!draw_grid) {
        return;
    }

    grid_ctx.beginPath();
    grid_ctx.strokeStyle = grid_color;
    grid_ctx.lineWidth = 1;
    for (let x = 0; x <= canvas_width; x += getCellSize().w) {
        grid_ctx.moveTo(x, 0);
        grid_ctx.lineTo(x, canvas_height);
    }
    for (let y = 0; y <= canvas_height; y += getCellSize().h) {
        grid_ctx.moveTo(0, y);
        grid_ctx.lineTo(canvas_width, y);
    }
    grid_ctx.stroke();
}

let drawLayers = (layers) => {
    if (layers == null) {
        return;
    }
    canvas_ctx.clearRect(0, 0, canvas_width, canvas_height);
    for (let i = 0; i < layers.length; i++) {
        let layer = layers[i].layer;
        for (let x = 0; x < cell_count.w; x++) {
            for (let y = 0; y < cell_count.h; y++) {

                let tileId = layer[y][x];

                if (tileId == null) {
                    continue;
                }

                let tile = Tilemap.tileSets.value[0][tileId];
                if (tile != null) {
                    let img = new Image();
                    img.src = tile;
                    canvas_ctx.drawImage(img, x * tile_size.w, y * tile_size.h, tile_size.w, tile_size.h);
                }
            }
        }
    }
}

let move_canvas = (e) => {
    const dx = m_pos.x - e.x;
    const dy = m_pos.y - e.y;
    m_pos = {x: e.x, y: e.y};

    let new_left = parseInt(getComputedStyle(canvas_container, '').left) - dx;
    let new_top = parseInt(getComputedStyle(canvas_container, '').top) - dy;

    canvas_container.style.left = new_left + "px";
    canvas_container.style.top = new_top + "px";

}

let zoom_canvas = (e) => {
    if (e.deltaY < 0) {
        zoom += zoom_step;
    } else {
        zoom -= zoom_step;
    }
    if (zoom > zoom_max) {
        zoom = zoom_max;
    }
    if (zoom < zoom_min) {
        zoom = zoom_min;
    }
    canvas_container.style.transform = "scale(" + zoom + ")";
}

const loadProject = (project) => {

    if (project == null) {
        console.log("Project is null");
        return;
    }

    canvas = document.getElementById("canvas");
    canvas_ctx = canvas.getContext("2d");
    canvas_ctx.imageSmoothingEnabled = false;

    grid = document.getElementById("grid");
    grid_ctx = grid.getContext("2d");
    grid_ctx.imageSmoothingEnabled = false;

    canvas_container = document.getElementById("canvas-container");

    editor = document.getElementById("editor");

    cell_count = {w: project.width, h: project.height};
    tile_size = {w: project.cellSize, h: project.cellSize};

    // Change canvas size
    canvas.width = cell_count.w * tile_size.w;
    canvas.height = cell_count.h * tile_size.h;

    grid.width = cell_count.w * tile_size.w;
    grid.height = cell_count.h * tile_size.h;

    canvas_container.style.width = canvas.width + "px";
    canvas_container.style.height = canvas.height + "px";
    canvas_container.style.maxHeight = canvas.height + "px";
    canvas_container.style.maxWidth = canvas.width + "px";
    canvas_container.style.minHeight = canvas.height + "px";
    canvas_container.style.minWidth = canvas.width + "px";

    grid_color = "#ddd";

    zoom = 1;
    zoom_step = 0.1;
    zoom_max = cell_count.w / 2;
    zoom_min = 0.1;

    canvas_container.style.transform = "scale(" + zoom + ")";

    canvas_width = canvas.width;
    canvas_height = canvas.height;

    canvas_container.style.left = (editor.clientWidth - canvas_width) / 2 + "px";
    canvas_container.style.top = (editor.clientHeight - canvas_height) / 2 + "px";

    canvas_container.addEventListener("mousedown", function (e) {
        if (e.button === 1) {
            m_pos = {x: e.x, y: e.y};
            document.addEventListener("mousemove", move_canvas, false);
        }
    }, false);

    document.addEventListener("mouseup", function () {
        document.removeEventListener("mousemove", move_canvas, false);
    }, false);

    canvas_container.addEventListener("wheel", zoom_canvas, false);


    let mouse_is_over_grid = false;
    let mouse_is_clicked = false;
    let mouse_button = null;
    let mouse_position = {x: 0, y: 0};

    clearInterval(gridInterval);

    gridInterval = setInterval(() => {

        drawGrid();
        if (mouse_is_over_grid) {
            let rect = grid.getBoundingClientRect();
            let x = mouse_position.x - rect.left;
            let y = mouse_position.y - rect.top;

            x = Math.floor(x / getCellSizeAtZoom().w) * getCellSize().w;
            y = Math.floor(y / getCellSizeAtZoom().h) * getCellSize().h;

            selected_cell_x.value = Math.floor(x / getCellSizeAtZoom().w);
            selected_cell_y.value = Math.floor(y / getCellSizeAtZoom().h);

            grid_ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
            grid_ctx.fillRect(x, y, getCellSize().w, getCellSize().h);

            if (mouse_button === 2) {
                grid_ctx.fillStyle = "rgba(255, 0, 0, 0.2)"
                grid_ctx.fillRect(x, y, getCellSize().w, getCellSize().h);
            } else {

                let tileId = Tilemap.selectedTile.value;

                let tile = null;

                if (tileId !== null) {
                    tile = Tilemap.tileSets.value[0][tileId];
                    if (tile) {
                        let img = new Image();
                        img.src = tile;

                        grid_ctx.drawImage(
                            img,
                            x,
                            y,
                        );
                    }
                }
            }
        } else {
            selected_cell_x.value = -1;
            selected_cell_y.value = -1;
        }

        if (mouse_is_clicked) {

            let rect = canvas.getBoundingClientRect();
            let x = mouse_position.x - rect.left;
            let y = mouse_position.y - rect.top;

            x = Math.floor(x / getCellSizeAtZoom().w);
            y = Math.floor(y / getCellSizeAtZoom().h);

            let layerId = project.selectedLayer.value;

            // return if out of bounds
            if (x < 0 || x >= project.width || y < 0 || y >= project.height) {
                return;
            }

            if (mouse_button === 0) {
                project.layers.value[layerId].layer[y][x] = Tilemap.selectedTile.value;
                drawLayers(project.layers.value);
            } else if (mouse_button === 2) {
                project.layers.value[layerId].layer[y][x] = null;
                drawLayers(project.layers.value);
            }
        }

    }, 50);

    grid.onmouseover = (e) => {
        mouse_is_over_grid = true;
    }

    grid.onmouseout = (e) => {
        mouse_is_over_grid = false;
    }

    editor.onmousemove = (e) => {
        mouse_position = {x: e.clientX, y: e.clientY};
    }

    canvas_container.onmousedown = (e) => {
        mouse_button = e.button;
        mouse_is_clicked = true;
    }

    canvas_container.onmouseup = (e) => {
        mouse_button = null;
        mouse_is_clicked = false;
    }

    canvas_container.oncontextmenu = (e) => {
        e.preventDefault();
    }

    drawLayers(project.layers.value);
    drawGrid();
};

BusEvent.getInstance().on('loadProjectCanvas', (project) => {
    loadProject(project);
});

let show = ProjectSingleton.getInstance().selectedProject;

</script>

<template>
    <div id="canvas-component" v-bind:class="['h-100', (show !== null ? 'd-flex' : 'd-none')]">
        <div id="canvas-tools" class="d-flex flex-row-reverse w-100">
            <div class="btn-group" role="group" aria-label="">
                <input type="checkbox" class="btn-check" id="grid-show" v-bind:checked="draw_grid" autocomplete="off" @click="draw_grid=!draw_grid" >
                <label class="btn btn-outline-info" for="grid-show">Grid</label>
            </div>
            <div class="me-3 text-info mt-auto mb-auto">
                X : {{ selected_cell_x === -1 ? '?' : selected_cell_x }} /
                Y : {{ selected_cell_y === -1 ? '?' : selected_cell_y }}
            </div>
        </div>

        <div id="canvas-holder" class="w-100 h-100 overflow-hidden">
            <div id="canvas-container" class="">
                <canvas id="canvas" width="500" height="500" class="bg-white"></canvas>
                <canvas id="grid" width="500" height="500"></canvas>
            </div>
        </div>
    </div>
</template>

<style scoped>

#canvas-component {
    position: relative;
    flex: 1 1 auto;
}

#canvas-holder {
    position: relative;
    width: 100%;
    height: 100%;
    max-height: inherit;
    max-width: inherit;
}

#canvas-container {
    position: relative;
    width: 500px;
    height: 500px;
    cursor: pointer;
}

#canvas {
    image-rendering: pixelated;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
}

#grid {
    image-rendering: pixelated;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
}

#canvas-tools {
    position: absolute;
    top: 0;
    left: 0;
    padding: 12px;
    z-index: 100;
}
</style>