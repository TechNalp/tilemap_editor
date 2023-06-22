
export default class BusEvent {

    static instanceSingleton : BusEvent | null;

    events : any = {};

    private constructor() {
        return;
    }

    static getInstance (){
        if(!BusEvent.instanceSingleton){
            BusEvent.instanceSingleton = new BusEvent();
        }
        return BusEvent.instanceSingleton;
    }

    on(event : string, callback : any) {
        if(!this.events[event]) {
            this.events[event] = callback;
        } else {
            console.error(`Event "${event}" already exists`);
        }
    }

    emit(event : string, args : any) {
        if(this.events[event]) {
            this.events[event](...args);
        } else {
            console.error(`Event "${event}" doesn't exists`);
        }
    }

    removeEvent(event : string) {
        if(this.events[event]) {
            delete this.events[event];
        }
    }
}