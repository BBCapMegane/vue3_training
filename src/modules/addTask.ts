import { Ref } from 'vue';
import Task from "../types/Task";

const defaultStatus: boolean = false

export default (tasksRef: Ref<Task[]>) => {
    const addTask = (taskName: string) => {
        tasksRef.value.push({
            name: taskName,
            status: defaultStatus,
        });
    }

    return {
        addTask,
    };
}