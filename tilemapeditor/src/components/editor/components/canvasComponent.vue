<script setup lang="js">

window.addEventListener('load', () => {
    let canvas = document.getElementById("canvas");
    let canvas_ctx = canvas.getContext("2d");
    canvas_ctx.imageSmoothingEnabled = false;

    let grid = document.getElementById("grid");
    let grid_ctx = grid.getContext("2d");
    grid_ctx.imageSmoothingEnabled = false;

    let canvas_container = document.getElementById("canvas-container");

    let editor = document.getElementById("editor");

    let cell_count = {w: 10, h: 10};
    let tile_size = {w: 32, h: 32};

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

    let grid_color = "#ddd";

    let zoom = 1;
    let zoom_step = 0.1;
    let zoom_max = cell_count.w / 2;
    let zoom_min = 0.1;

    let canvas_width = canvas.width;
    let canvas_height = canvas.height;

    console.log(canvas_width + "px");
    console.log(canvas_height + "px");

    canvas_container.style.left = (editor.clientWidth - canvas_width) / 2 + "px";
    canvas_container.style.top = (editor.clientHeight - canvas_height) / 2 + "px";

    let getCellSize = () => {
        return {w: canvas_width / cell_count.w, h: canvas_height / cell_count.h};
    }

    let getCellSizeAtZoom = () => {
        return {w: getCellSize().w * zoom, h: getCellSize().h * zoom};
    }

    let drawGrid = () => {
        grid_ctx.clearRect(0, 0, canvas_width, canvas_height);
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

    drawGrid();

    let m_pos;

    function move_canvas(e) {
        const dx = m_pos.x - e.x;
        const dy = m_pos.y - e.y;
        m_pos = {x: e.x, y: e.y};

        let new_left = parseInt(getComputedStyle(canvas_container, '').left) - dx;
        let new_top = parseInt(getComputedStyle(canvas_container, '').top) - dy;

        canvas_container.style.left = new_left + "px";
        canvas_container.style.top = new_top + "px";

    }

    canvas_container.addEventListener("mousedown", function (e) {
        if (e.button === 1) {
            m_pos = {x: e.x, y: e.y};
            document.addEventListener("mousemove", move_canvas, false);
        }
    }, false);

    document.addEventListener("mouseup", function () {
        document.removeEventListener("mousemove", move_canvas, false);
    }, false);

    // Zoom canvas
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

    canvas_container.addEventListener("wheel", zoom_canvas, false);


    let mouse_is_over_grid = false;
    let mouse_position = {x: 0, y: 0};

    setInterval(() => {
        drawGrid();
        if (!mouse_is_over_grid) {
            return;
        }
        let rect = grid.getBoundingClientRect();
        let x = mouse_position.x - rect.left;
        let y = mouse_position.y - rect.top;

        x = Math.floor(x / getCellSizeAtZoom().w) * getCellSize().w;
        y = Math.floor(y / getCellSizeAtZoom().h) * getCellSize().h;

        grid_ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
        grid_ctx.fillRect(x, y, getCellSize().w, getCellSize().h);
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


}, false);
</script>

<template>
    <div id="canvas-component" class="d-flex h-100">
        <div id="canvas-holder" class="w-100 h-100 overflow-hidden">
            <div id="canvas-container" class="">
                <canvas id="canvas" width="500" height="500" class="bg-white"></canvas>
                <canvas id="grid" width="500" height="500"></canvas>
            </div>
        </div>
    </div>
</template>

<script lang="js">

export default {
    components: {}
}
</script>

<style scoped>

#canvas-component {
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
</style>