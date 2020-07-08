<template>
    <div>
        <p>{{ count }}</p>
        <child-button
                :handle-add-num="numAdd"
                @count_up="numAdd"
        />

    </div>
</template>

<script lang="ts">
    import {defineComponent, ref} from 'vue';
    import childButton from "./childButton.vue";
    import NumAddInterface from "../types/NumAddInterface";

    export default defineComponent({
        components: {
            childButton
        },
        setup() {

            const count = ref<number>(0)

            const numAdd: NumAddInterface = (num: number) => {
                return count.value += num
            }

            return {
                //data
                count,

                //function
                numAdd
            }
        }
    })
</script>

<style scoped>

</style>