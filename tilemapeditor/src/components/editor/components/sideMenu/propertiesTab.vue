<script setup lang="js">
import {ref} from "vue";
import ProjectSingleton from "@/models/projectSingleton";

let maps = ref(ProjectSingleton.getInstance().projectList);
let selectedMap = ref(ProjectSingleton.getInstance().selectedProject);

const newProperties = () => {
  let inputName = document.getElementById("floatingName").value;

  if(inputName != ''){
    maps.value.at(selectedMap.value).name = inputName
  }
}

</script>

<template>
    <div>
      <form v-if="maps.at(selectedMap) != null">

        <div class="form-floating my-3 mx-2">
          <input type="text" class="form-control" id="floatingName" placeholder="name" :value="maps.at(selectedMap).name">
          <label for="floatingName">Name</label>
        </div>

        <div>
          <div class="row mb-2">
            <div class="col mx-0">
              <div class="form-floating mb-1  mx-2">
                <input type="number" class="form-control" id="floatingHeight" placeholder="height" :value=maps.at(selectedMap).height readonly>
                <label for="floatingHeight">Height</label>
              </div>
            </div>
            <div class="col mx-0">
              <div class="form-floating mb-1  mx-2">
                <input type="number" class="form-control" id="floatingWidth" placeholder="width"  :value=maps.at(selectedMap).width readonly>
                <label for="floatingWidth">Width</label>
              </div>
            </div>
          </div>
        </div>

        <div class="form-floating my-3 mx-2">
          <input type="text" class="form-control" id="floatingLayers" placeholder="name" :value="maps.at(selectedMap).layers.length" readonly>
          <label for="floatingLayers">Layers number</label>
        </div>

        <button type="button" class="btn btn-primary" @click="newProperties">Save</button>
      </form>
    </div>
</template>

<script lang="js">
export default {}
</script>