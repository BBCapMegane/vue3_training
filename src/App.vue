<template>
    <div>
        <div>
            <input type="text" v-model="taskNameRef" />
            <button @click="addTask(taskNameRef)">Add</button>
        </div>
        <div>
            <input type="text" v-model="searchTextRef" />Search
        </div>
<!--        <parent-component/>-->
        <div class="task-list-wrapper">
            <ul>
                <h4>DOING</h4>
                <li v-for="(task, index) in doingTasks" :key="index">
                    <input type="checkbox" :checked="task.status" disabled/>
                    <label>{{ task.name }}</label>
                    <button @click="toggleTask(task, true)">done</button>
                </li>
            </ul>
            <ul>
                <h4>COMPLETED</h4>
                <li v-for="(task, index) in completedTasks" :key="index">
                    <input type="checkbox" :checked="task.status" disabled/>
                    <label>{{ task.name }}</label>
                    <button @click="toggleTask(task, false)">revert</button>
                </li>
            </ul>
        </div>
    </div>
</template>
<script lang="ts">
    import { watch, ref } from 'vue';
    import parentComponent from "./components/parentComponent.vue"
    import AddTask from "./modules/addTask"
    import FilterTask from "./modules/filterTask";
    import SearchTask from "./modules/searchTask";
    import TaskList from "./modules/taskList";


    export default {
        components: {
            parentComponent
        },
        setup() {
            const taskNameRef = ref<string>('');
            const { tasksRef, toggleTask } = TaskList();
            const { addTask } = AddTask(tasksRef);
            const { searchTextRef, search } = SearchTask(tasksRef);
            const { doingTasks, completedTasks } = FilterTask(search);
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

<style scoped>
    .task-list-wrapper {
        display: flex;
        justify-content: center;
    }
</style>
