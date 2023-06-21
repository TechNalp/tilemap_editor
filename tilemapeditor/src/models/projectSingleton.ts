import Tilemap from "@/models/tilemap";

export default class ProjectSingleton {
    static instanceSingleton : ProjectSingleton | null;
    projectList : Tilemap[] = [];
    selectedProject : number | null = null;

    private constructor() {
        return;
    }

    static getInstance (){
        if(!ProjectSingleton.instanceSingleton){
            ProjectSingleton.instanceSingleton = new ProjectSingleton();
        }
        return ProjectSingleton.instanceSingleton;
    }
}