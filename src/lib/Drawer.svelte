<script context="module">
    import { base } from '$app/paths';

    import { writable } from 'svelte/store';
    
    const open = writable(false);

    export function openDrawer() {
        open.set(true);
    }

    export function closeDrawer() {
        open.set(false);
    }
</script>

<script>
    import Drawer, { Content, Scrim, Header, Title, Subtitle } from '@smui/drawer';
    import List, { Item, Text, Separator, Graphic, Subheader, Meta } from '@smui/list';
    import IconButton, { Icon } from '@smui/icon-button';

    import CreateCategoryButton from '$lib/CreateCategoryButton.svelte';
    
    import { navigating, page } from '$app/stores'; 

    import { db } from '$lib/db';
    import { showDialog } from '$lib/DialogManager.svelte';
    import { goto } from '$app/navigation';
    
    let disabled = false;

    $: category = $page.params.category;

    $: if($navigating) {
        // if navigating while drawer is opened, then we should probably close it :)
        closeDrawer();
    }
</script>

<Drawer bind:disabled variant="modal" bind:open={$open}>
    <Header>
        <Title>Todo List</Title>
        <Subtitle>Made by Wasab'</Subtitle>
    </Header>
    <Content>
        <List>
            <Item href="{base}/categories/actives" activated={category === 'actives'}>
                <Graphic class="material-icons">checklist</Graphic>
                <Text>Actives</Text>
            </Item>
            <Item href="{base}/categories/archive" activated={category === 'archive'}>
                <Graphic class="material-icons">archive</Graphic>
                <Text>Archivées</Text>
            </Item>
        </List>
        <Separator />
        <List>
            <Subheader>Catégories</Subheader>
            {#each db.tables as table}
                {#key $open}
                    {#if !['actives', 'archive'].includes(table.name)}
                        <Item on:click={() => goto(`${base}/categories/${(encodeURI(table.name))}`)} activated={category === table.name}>
                            <Graphic class="material-icons">label</Graphic>
                            <Text>{table.name}</Text>
                            <Meta>
                                <IconButton on:click={e => { e.stopPropagation() ; showDialog('delete-category', { category: table.name }) }} ripple={false} class="material-icons">
                                    delete
                                </IconButton>
                            </Meta>
                        </Item>
                    {/if}
                {/key}
            {/each}
            <Item ripple={false}>
                <CreateCategoryButton />
            </Item>
        </List>
    </Content>
</Drawer>

<Scrim/>