<script context="module">
    
</script>

<script>
    import Accordion from '@smui-extra/accordion';
    import TaskCategory from '$lib/TaskCategory.svelte'
    import Fab, { Icon } from '@smui/fab';
    
    import { crossfade, fade, fly } from 'svelte/transition';

    import { showDialog } from '$lib/DialogManager.svelte';
    import { showSnackbar } from '$lib/SnackBarManager.svelte';

    import { db } from '$lib/db';
    import { liveQuery } from 'dexie';

    import { page } from '$app/stores';

    const [ send, receive ] = crossfade({
        fallback: fade
    });

    const { category, list } = $page.params;

    const currentList = liveQuery(async () => {
            return await db
                .table(category)
                .get(list);
        }
    );

    $: categories = [
        {
            name: 'À faire',
            tasks: $currentList?.tasks.filter(task => !task.done)
        },
        {
            name: 'Terminées',
            tasks: $currentList?.tasks.filter(task => task.done)
        }
    ]

    async function taskChecked(name) {
        let task = $currentList.tasks.find(task => task.name === name);
        task.done = !task.done;

        await db.table(category).put($currentList);
    }

    async function clickedDelete(name) {
        const taskIndex = $currentList.tasks.findIndex(task => task.name === name);
        $currentList.tasks.splice(taskIndex, 1);
        
        await db.table(category).put($currentList);
        showSnackbar('Tâche supprimée !');
    }
</script>

{#if $currentList != undefined}
    <div in:fly={{ x: 2000 }} out:fly={{ x: 2000 }} class="activity-wrapper">
        {#each categories as category}
            <Accordion>
                <TaskCategory {...category} {taskChecked} {clickedDelete} {receive} {send}/>
            </Accordion>
        {/each}
    </div>


    <div in:fade={{ delay: 400, duration: 150 }} class="fab" >
        <Fab color="secondary" touch on:click={() => showDialog('create-task', { category, currentList } )}>
            <Icon class="material-icons">add_task</Icon>
        </Fab>
    </div>
{/if}