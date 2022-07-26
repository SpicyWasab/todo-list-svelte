<script>
    import Dialog, { Title as DialogTitle, Content, Actions, InitialFocus } from '@smui/dialog';
    import List, { Item, Graphic, Text } from '@smui/list';
    import Radio from '@smui/radio';
    import Button, { Label } from '@smui/button';

    import { db } from '$lib/db';
    import { showSnackbar } from '$lib/SnackBarManager.svelte';
    
    import { page } from '$app/stores';

    export let list;

    const { category } = $page.params;

    let selection;

    $: console.log(selection);

    async function submit() {
        try {
            if (await db.table(selection).get(list.name) != undefined) return showSnackbar('Une liste du même nom se trouve déjà dans la catégorie.');

            await db.table(selection).add(list);

            await db
                .table(category)
                .delete(list.name);
            
            showSnackbar(`La liste ${list.name} a été déplacée !`);
        } catch(e) {
            console.error(e);
            showSnackbar(`Une erreur est survenue.`);
        }
    }
</script>

<Dialog open on:SMUIDialog:closed>
    <DialogTitle>Déplacer liste {list.name}</DialogTitle>
    <Content>
        <List radioList>
            {#each db.tables as { name }}
                {#if name != category}
                    <Item value={name}>
                        <Graphic>
                            <Radio bind:group={selection} value={name}/>
                        </Graphic>
                        <Text>
                            {name}
                        </Text>
                    </Item>
                {/if}
            {/each}
        </List>
    </Content>
    <Actions>
        <Button color="secondary" use={[InitialFocus]}>
            <Label>Annuler</Label>
        </Button>
        <Button variant="unelevated" on:click={submit} disabled={selection === undefined}>
            <Label>Déplacer</Label>
        </Button>
    </Actions>
</Dialog>