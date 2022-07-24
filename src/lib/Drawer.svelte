<script context="module">
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
    import List, { Item, Text, Separator, Graphic } from '@smui/list';
    
    import { page } from '$app/stores'; 
    import { databaseStarted } from './state.mjs';

    let currentActivity = undefined;
    let disabled = false;

    $: {
        closeDrawer(); // if navigating while drawer is opened, then we should probably close it :)
        currentActivity = $page.url.pathname;
    }

    $: if($databaseStarted) {
        disabled = false;
    } else {
        disabled = true;
    }
</script>

<Drawer bind:disabled variant="modal" bind:open={$open}>
    <Header>
        <Title>Todo List</Title>
        <Subtitle>Powered by Svelte.</Subtitle>
    </Header>
    <Content>
        <List>
            <Item href="/actives" activated={currentActivity === '/actives'}>
                <Graphic class="material-icons">checklist</Graphic>
                <Text>Actifs</Text>
            </Item>
            <Item href="archive" activated={currentActivity === '/archive'}>
                <Graphic class="material-icons">archive</Graphic>
                <Text>Archivés</Text>
            </Item>
            <Separator/>
        </List>
    </Content>
</Drawer>

<Scrim/>