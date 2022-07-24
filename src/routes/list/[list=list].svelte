<script>
    import Accordion from '@smui-extra/accordion';
    import TaskCategory from '$lib/TaskCategory.svelte'
    import Fab, { Icon } from '@smui/fab';
    
    import { crossfade, fade, fly } from 'svelte/transition';

    import { showDialog } from '$lib/DialogManager.svelte';
    import { showSnackbar } from '$lib/SnackBarManager.svelte';

    import { todoLists, currentList, databaseStarted } from '$lib/state.mjs';
    import { page } from '$app/stores';

    import { saveList } from '$lib/database.mjs';

    const [ send, receive ] = crossfade({
        fallback: fade
    });
    
    currentList.set($todoLists[$page.params['list']]);

    $: categories = [
        {
            name: 'À faire',
            todos: $currentList?.todos.filter(task => !task.done)
        },
        {
            name: 'Terminées',
            todos: $currentList?.todos.filter(task => task.done)
        }
    ]

    async function taskChecked(name) {
        currentList.update(list => {
            let task = list.todos.find(task => task.name === name);
            task.done = !task.done;

            return list;
        });

        await saveList($currentList);
    }

    async function clickedDelete(name) {
        currentList.update(list => {
            const taskIndex = $currentList.todos.findIndex(task => task.name === name);
            list.todos.splice(taskIndex, 1);

            return list;
        })
        
        await saveList($currentList);
        showSnackbar('Tâche supprimée !');
    }
</script>

<div in:fly={{ x: 2000 }} out:fly={{ x: 2000 }} class="activity-wrapper">
    {#each categories as category}
        <Accordion>
            <TaskCategory {...category} {taskChecked} {clickedDelete} {receive} {send}/>
        </Accordion>
    {/each}
</div>


<div in:fade={{ delay: 400, duration: 150 }} class="fab" >
    <Fab color="secondary" touch on:click={() => showDialog('create-task')}>
        <Icon class="material-icons">add_task</Icon>
    </Fab>
</div>

<style>
    .done-task-text {
        text-decoration: line-through;
        opacity: .5;
    }
</style>