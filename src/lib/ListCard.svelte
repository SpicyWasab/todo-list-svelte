<script>
    import Card, { PrimaryAction, Content, Actions, ActionIcons } from '@smui/card';
    import IconButton from '@smui/icon-button';
    import Menu from '@smui/menu';
    import List, { Item, Separator, Text } from '@smui/list';
    import Checkbox from '@smui/checkbox';

    import { showDialog } from '$lib/DialogManager.svelte'
    import { goto } from '$app/navigation';

    export let list;

    let menu;
</script>

<Card variant="outlined" class="card">
    <Actions>
        <h3>{list.name}</h3>
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
        <List checkList ripple>
            {#each list.todos.slice(0, 3) as { name, done }}
                <Item disabled ripple={false}>
                        <Checkbox disabled checked={done}/>
                        <span class:done>{name}</span>
                </Item>
            {:else}
                <Item disabled ripple={false}>Aucune tâche</Item>
            {/each}
        </List>
    </PrimaryAction>
</Card>

<style>
    h3 {
        margin-left: 1rem;
        text-overflow: ellipsis;
        width: 80%;
        overflow-x: hidden;
        white-space: nowrap;
    }
</style>