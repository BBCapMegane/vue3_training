import { ref } from 'vue';
import Task from "../types/Task";

export default () => {
    const tasksRef = ref<Task[]>([] as Task[])

    const toggleTask = (task: Task, status: boolean) => {
        tasksRef.value.splice(tasksRef.value.indexOf(task),
            1, {...task, status: status})
    }

    return {
        tasksRef,
        toggleTask
    }
}