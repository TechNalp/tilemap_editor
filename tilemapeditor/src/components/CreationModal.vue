<script setup>
    import {ref} from 'vue';
    import {defineProps} from 'vue';
    import {defineEmits} from 'vue';
    const props = defineProps(['shown']);
    const emit = defineEmits(['cancel', 'ok']);

    let name = ref("");
    let width = ref(20);
    let height = ref(20);

    const cancel = () => {
        emit('cancel');
    };

    const ok = () => {
        if (name && width && height) {
            emit('ok', { name: name.value, width: width.value, height: height.value });
        }
    }

</script>

<template>
    <div v-if="props.shown">
        <div class="overlay"></div>
        <div class="modal-block">
            <div class="card" style="width: 30rem; display : block;" id="creationModal">
                <div class="card-header text-center text-white">
                    Create a new map
                </div>
                <div class="card-body">

                    <form action="">
                        <div class="input-group input-group-sm mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text text-white" id="inputGroup-sizing-sm">Name</span>
                            </div>
                            <input type="text" class="form-control" aria-label="Small"
                                aria-describedby="inputGroup-sizing-sm" required v-model="name">
                        </div>

                        <div class="form-row" style="display: grid; grid-template-columns: 1fr 10px 1fr ;">
                            <div class="input-group input-group-sm col-md-4 mb-3" style="grid-column: 1/1;">
                                <div class="input-group-prepend">
                                    <span class="input-group-text text-white" id="inputGroup-sizing-sm">Width</span>
                                </div>
                                <input type="number" class="form-control" aria-label="Small"
                                    aria-describedby="inputGroup-sizing-sm" required v-model="width">
                            </div>

                            <div class="input-group input-group-sm col-md-4 mb-3" style="grid-column: 3/3;">
                                <div class="input-group-prepend">
                                    <span class="input-group-text text-white" id="inputGroup-sizing-sm">Height</span>
                                </div>
                                <input type="number" class="form-control" aria-label="Small"
                                    aria-describedby="inputGroup-sizing-sm" required v-model="height">
                            </div>

                            
                        </div>

                        <div style="text-align: right;">
                            <button type="reset" class="btn btn-secondary btn-sm" @click="cancel()">Cancel</button>
                            <button type="submit" class="btn btn-primary btn-sm" @click="ok()"
                                style="margin-left: 5px;">OK</button>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    </div>
</template>

<style>
.overlay {
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}

.modal-block {
    position: absolute;
    background-color: #1e2f33;
    top: 100px;
    left: calc(50% - (30rem / 2));
}
</style>