import {computed, Ref} from 'vue';
import Task from "../types/Task";

export default (tasksRef: Ref<Task[]>) => {
    const doingTasks = computed((): Task[] => tasksRef.value.filter(t => !t.status))
    const completedTasks = computed((): Task[] => tasksRef.value.filter(t => t.status))
    return {
        doingTasks,
        completedTasks
    }
}