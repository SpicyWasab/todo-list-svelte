<script>
    import Card, { PrimaryAction, Content } from '@smui/card';
    import LayoutGrid, { Cell } from '@smui/layout-grid';
    
    import Fab, { Icon } from '@smui/fab';

    import { currentList, todoLists } from '$lib/state.mjs';

    import { fade } from 'svelte/transition';

    function openList(list) {
        // changeActivity('default:list');
        currentList.set(list);
    }
</script>

{#if $todoLists.length === 0}

    <div class="container">
        <p>
            Il n'y a aucune liste pour le moment. <br>
            Essayez d'en créer une !
        </p>
    </div>

    <style>
        .container {
            height: 100%;
            display: grid;
            place-items: center;
        }
    </style>

{:else}
<!---->
    <LayoutGrid>
        {#each ($todoLists) as list, index (list.id)}
            <Cell span={2}>
                <div in:fade={{delay: 400 + 100*index}} class="container">
                    <Card variant="outlined" on:click={() => openList(list)}>
                        <PrimaryAction>
                            <Content>
                                <h3>{list.name}</h3>
                                
                                <ul>
                                    {#each list.todos.slice(0, 2) as task}
                                        <li>{task.name}</li>
                                    {/each}
                                </ul>
                            </Content>
                        </PrimaryAction>
                    </Card>
                </div>
            </Cell>
        {/each}
    </LayoutGrid>

{/if}

<div in:fade={{ delay: 400, duration: 150 }} class="float" >
    <Fab color="secondary" touch on:click={() => { }}>
        <Icon class="material-icons">add</Icon>
    </Fab>
</div>

<style>
    .float {
        position: fixed;
        bottom: 32px;
        right: 32px;
        height: 64px;
        width: 64px;
    }
</style>