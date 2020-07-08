<template>
    <div>
        <button @click="countUp()">count up</button>
        <button @click="countUpEmit()">count up2</button>
    </div>

</template>

<script lang="ts">
    import { PropType, defineComponent , SetupContext} from 'vue';
    import NumAddInterface from "../types/NumAddInterface";

    interface Props {
        handleAddNum: NumAddInterface;
    }

    export default defineComponent({
        props: {
            handleAddNum: {
                type: Function as PropType<NumAddInterface>,
                required: true
            }
        },
        setup(props: Props, context: SetupContext) {
            const countUp = () => {
                props.handleAddNum(1)
            }

            const countUpEmit = () => {
                context.emit('count_up', 1)
            }

            return {
                countUp,
                countUpEmit,
            }
        }
    })
</script>

<style scoped>

</style>