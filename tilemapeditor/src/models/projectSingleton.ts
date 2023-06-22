import Tilemap from "@/models/tilemap";
import { ref } from "vue";
import { Ref } from "vue";

export default class ProjectSingleton {
    static instanceSingleton : ProjectSingleton | null;
    projectList : Ref<Tilemap[]> = ref([]);
    selectedProject : Ref<number | null> = ref(null);

    private constructor() {
        return;
    }

    static getInstance (){
        if(!ProjectSingleton.instanceSingleton){
            ProjectSingleton.instanceSingleton = new ProjectSingleton();
        }
        return ProjectSingleton.instanceSingleton;
    }

    addProject(tilemap : Tilemap) {
        this.projectList.value.push(tilemap);
        this.selectedProject.value = this.projectList.value.length - 1;
    }

    removeProject(index : number) {
        this.projectList.value.splice(index, 1);
        this.selectedProject.value = null;
    }
}