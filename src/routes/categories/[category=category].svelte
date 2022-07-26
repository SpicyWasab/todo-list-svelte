<script>
    import ListCard from '$lib/ListCard.svelte';
    import LayoutGrid, { Cell } from '@smui/layout-grid';

    import Fab, { Icon } from '@smui/fab';

    import { showDialog } from '$lib/DialogManager.svelte'

    import { fade } from 'svelte/transition';

    import { page } from '$app/stores';

    import { db } from '$lib/db';
    import { liveQuery } from 'dexie';

    $: category = $page.params.category;

    $: lists = liveQuery(() =>
            db.table(category).toArray()
    );
</script>


{#key category}

    {#if $lists != undefined}

        {#if $lists.length === 0}

            <div class="center-items" transition:fade={{ duration: 200 }}>
                <div>
                    <div class="icon material-icons">playlist_add_check</div>
                    <p>
                        Il n'y a aucune liste pour le moment. <br>
                        Essayez d'en créer une !
                    </p>
                </div>
            </div>

        {:else}

            <LayoutGrid>
                {#each $lists.reverse() as list, index (list.name)}
                    <Cell span={2}>
                        <div in:fade={{delay: 400 + 100*index}} class="container">
                            <ListCard {list} {category} />
                        </div>
                    </Cell>
                {/each}
            </LayoutGrid>

        {/if}

    {/if}

    <div in:fade={{ delay: 400, duration: 150 }} class="fab" >
        <Fab color="secondary" touch on:click={() => showDialog('create-list')}>
            <Icon class="material-icons">add</Icon>
        </Fab>
    </div>

{/key}