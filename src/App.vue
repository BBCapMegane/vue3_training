<template>
    <div>
        <div>
            <input type="text" v-model="state.taskName"/>
            <button @click="addTask">Add</button>
        </div>
        <div>
            <input type="text" v-model="state.searchText"/>Search
        </div>
        <div class="task-list-wrapper">
            <ul>
                <h4>all</h4>
                <li v-for="(task, index) in searchedTasks" :key="index">
                    <input type="checkbox" :checked="task.status" disabled/>
                    <label>{{ task.name }}</label>
                    <button @click="toggleTask(task, true)">toggle</button>
                </li>
            </ul>
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
    import {reactive, computed, defineComponent, toRefs} from 'vue';

    interface MyTodo {
        taskName: string,
        searchText: string,
        tasks: Task[]
    }

    interface Task {
        name: string,
        status: boolean
    }

    export default defineComponent({
        setup() {

            const state = reactive<MyTodo>({
                taskName: "",
                searchText: "",
                tasks: [] as Task[],
            });

            const searchedTasks = computed((): Task[]=> state.tasks.filter(t => t.name.includes(state.searchText)))
            const doingTasks = computed((): Task[] =>  searchedTasks.value.filter(t => !t.status))
            const completedTasks = computed((): Task[] =>  searchedTasks.value.filter(t => t.status))

            const addTask = () => {
                state.tasks.push({
                    name: state.taskName,
                    status: false,
                });
                state.taskName = '';
            }

            const toggleTask = (task: Task, status: boolean) => {
                const index = state.tasks.indexOf(task);
                state.tasks.splice(index, 1, {...task, status: status});
            }

            return {
                //data
                state,

                //computed
                searchedTasks,
                doingTasks,
                completedTasks,

                //function
                addTask,
                toggleTask
            }
        }
    })
</script>
<style scoped>
    .task-list-wrapper {
        display: flex;
        justify-content: center;
    }
</style>
