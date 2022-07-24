<script>
    import Card, { PrimaryAction, Content, Actions, ActionIcons } from '@smui/card';
    import IconButton from '@smui/icon-button';
    import Menu from '@smui/menu';
    import List, { Item, Separator, Text } from '@smui/list';
    
    import { showDialog } from '$lib/DialogManager.svelte'
import { goto } from '$app/navigation';

    export let list;

    let menu;
</script>

<Card variant="outlined" class="card">
    <Actions>
        <ActionIcons>
            <IconButton class="material-icons" on:click={() => menu.setOpen(true)}>
                more_vert
            </IconButton>
            <Menu fullWidth={true} bind:this={menu} class="menu">
                <List>
                    <Item on:SMUI:action={() => showDialog('rename-list', { list })}>
                        <Text>Renommer</Text>
                    </Item>
                    <Item>
                        <Text>Déplacer</Text>
                    </Item>
                    <Item on:SMUI:action={() => showDialog('archive-list', { list })}>
                        <Text>Archiver</Text>
                    </Item>
                    <Separator />
                    <Item on:SMUI:action={() => showDialog('delete-list', { list })}>
                        <Text>Supprimer</Text>
                    </Item>
                </List>
            </Menu>
        </ActionIcons>
    </Actions>
    <PrimaryAction on:click={() => goto(`/list/${list.name}`)}>
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

<style>
    .card {
        z-index: 0;
    }

    .menu {
        z-index: 20 !important;
    }
</style>