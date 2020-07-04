<template>
    <div>
        <div>
            <input type="text" v-model="taskNameRef" />
            <button @click="addTask">Add</button>
        </div>
        <div>
            <input type="text" v-model="searchTextRef" />Search
        </div>
        <div class="task-list-wrapper">
            <ul>
                <h4>DOING</h4>
                <li v-for="(task, index) in doingTasks" :key="index">
                    <input type="checkbox" :checked="task.status" disabled/>
                    <label>{{ task.name }}</label>
                    <button @click="toggleTask(task, true)">toggle</button>
                </li>
            </ul>
            <ul>
                <h4>COMPLETED</h4>
                <li v-for="(task, index) in completedTasks" :key="index">
                    <input type="checkbox" :checked="task.status" disabled/>
                    <label>{{ task.name }}</label>
                    <button @click="toggleTask(task, false)">toggle</button>
                </li>
            </ul>
        </div>
    </div>
</template>
<script lang="ts">
    import { computed, watch, ref, isRef, Ref } from 'vue';

    interface Task {
        name: string,
        status: boolean
    }

    const useTaskList = () => {
        const tasksRef = ref<Task[]>([] as Task[]);

        const toggleTask = (task: Task, status: boolean) => {
            const index = tasksRef.value.indexOf(task);
            tasksRef.value.splice(index, 1, { ...task, status: status });
        };

        return {
            tasksRef,
            toggleTask,
        };
    };

    const useAddingTask = (tasksRef: Ref<Task[]>) => {
        const taskNameRef = ref<string>('');

        const addTask = () => {
            tasksRef.value.push({
                name: taskNameRef.value,
                status: false,
            });
            taskNameRef.value = '';
        }

        return {
            taskNameRef,
            addTask,
        };
    };

    const useFilter = (tasks: Ref<Task[]>) => {
        const tasksRef: Ref<Task[]> = ref(tasks);

        const doingTasks = computed(():Task[] => tasksRef.value.filter(t => !t.status))
        const completedTasks = computed((): Task[] => tasksRef.value.filter(t => t.status))

        return {
            doingTasks,
            completedTasks,
        };
    };

    const useSearcher = (tasks: Task[] = []) => {
        const searchTextRef = ref<string>('');
        const tasksRef = ref<Task[]>(tasks);

        const search = computed((): Task[] => tasksRef.value.filter(t => t.name.includes(searchTextRef.value)))

        return {
            searchTextRef,
            search,
        };
    };

    export default {
        setup() {
            const { tasksRef, toggleTask } = useTaskList();
            const { taskNameRef, addTask } = useAddingTask(tasksRef);
            const { searchTextRef, search } = useSearcher(tasksRef.value);
            const { doingTasks, completedTasks } = useFilter(search);

            watch([doingTasks, completedTasks], () => {
                console.log('doingTasks: ', doingTasks.value);
                console.log('completedTasks: ', completedTasks.value);
            })

            return {
                // Mutable state
                tasksRef,
                taskNameRef,
                searchTextRef,
                // Functions
                addTask,
                toggleTask,
                // Computed
                doingTasks,
                completedTasks,
            }
        }
    }
</script>

<!--<script lang="ts">-->
<!--    import {reactive, computed, defineComponent, toRefs, ref, isRef, watch, Ref} from 'vue';-->

<!--    interface MyTodo {-->
<!--        taskName: string,-->
<!--        searchText: string,-->
<!--        tasks: Task[]-->
<!--    }-->

<!--    interface Task {-->
<!--        name: string,-->
<!--        status: boolean-->
<!--    }-->

<!--    const useTaskList = () => {-->
<!--        const tasksRef = ref<Task[]>([]);-->

<!--        const toggleTask = (task: Task, status: boolean) => {-->
<!--            tasksRef.value.splice(tasksRef.value.indexOf(task), 1, { ...task, status: status });-->
<!--        };-->

<!--        return {-->
<!--            tasksRef,-->
<!--            toggleTask,-->
<!--        };-->
<!--    }-->

<!--    const useAddingTask = (tasksRef: Ref<Task[]>) => {-->
<!--        const taskNameRef = ref<string>('');-->

<!--        const addTask = () => {-->
<!--            tasksRef.value.push({-->
<!--                name: taskNameRef.value,-->
<!--                status: false,-->
<!--            });-->
<!--            taskNameRef.value = '';-->
<!--        }-->

<!--        return {-->
<!--            taskNameRef,-->
<!--            addTask,-->
<!--        };-->
<!--    };-->

<!--    const useFilter = (tasks: Task[]) => {-->
<!--        const doingTasks = computed(() => tasks.filter(t => !t.status))-->
<!--        const completedTasks = computed(() => tasks.filter(t => t.status))-->

<!--        return {-->
<!--            doingTasks,-->
<!--            completedTasks,-->
<!--        };-->
<!--    };-->

<!--    const useSearcher = (tasks: Task[]) => {-->
<!--        const searchTextRef = ref<string>('');-->
<!--        const tasksRefs = ref(tasks);-->

<!--        const search = computed((): Task[] => {-->
<!--            console.log(tasksRefs)-->
<!--            return tasksRefs.value.filter(t => t.name.includes(searchTextRef.value))-->
<!--        })-->

<!--        return {-->
<!--            searchTextRef,-->
<!--            search,-->
<!--        };-->
<!--    };-->

<!--    export default defineComponent({-->
<!--        setup() {-->

<!--            const { tasksRef, toggleTask } = useTaskList();-->
<!--            const { taskNameRef, addTask } = useAddingTask(tasksRef);-->
<!--            const { searchTextRef, search } = useSearcher(tasksRef.value);-->
<!--            const { doingTasks, completedTasks } = useFilter(search.value);-->

<!--            watch([doingTasks, completedTasks, tasksRef], () => {-->
<!--                console.log('doingTasks: ', doingTasks.value);-->
<!--                console.log('completedTasks: ', completedTasks.value)-->
<!--            })-->

<!--            return {-->
<!--                // Mutable state-->
<!--                tasksRef,-->
<!--                taskNameRef,-->
<!--                searchTextRef,-->
<!--                // Functions-->
<!--                addTask,-->
<!--                toggleTask,-->
<!--                // Computed-->
<!--                doingTasks,-->
<!--                completedTasks,-->
<!--            }-->
<!--        }-->
<!--    })-->
<!--</script>-->
<style scoped>
    .task-list-wrapper {
        display: flex;
        justify-content: center;
    }
</style>
