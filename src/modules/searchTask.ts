import {computed, Ref, ref} from 'vue';
import Task from "../types/Task";

export default (tasksRef: Ref<Task[]>) => {
    const searchTextRef = ref<string>('')
    const search = computed((): Task[] => tasksRef.value.filter(t => t.name.includes(searchTextRef.value)))
    // const search = tasksRef
    return {
        searchTextRef,
        search
    }
}