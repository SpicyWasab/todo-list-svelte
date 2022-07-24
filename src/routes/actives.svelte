<script>
    import ListCard from '$lib/ListCard.svelte';
    import LayoutGrid, { Cell } from '@smui/layout-grid';
    
    import Fab, { Icon } from '@smui/fab';
    
    import { todoLists } from '$lib/state.mjs';
    import { showDialog } from '$lib/DialogManager.svelte'
    
    import { fade } from 'svelte/transition';
</script>


{#if Object.values($todoLists).length === 0}

    <div class="center-items">
        <p>
            Il n'y a aucune liste pour le moment. <br>
            Essayez d'en créer une !
        </p>
    </div>

{:else}

    <LayoutGrid>
        {#each (Object.values($todoLists)) as list, index (list.id)}
            <Cell span={2}>
                <div in:fade={{delay: 400 + 100*index}} class="container">
                    <ListCard {list} />
                </div>
            </Cell>
        {/each}
    </LayoutGrid>

{/if}

<div in:fade={{ delay: 400, duration: 150 }} class="fab" >
    <Fab color="secondary" touch on:click={() => showDialog('create-list')}>
        <Icon class="material-icons">add</Icon>
    </Fab>
</div>