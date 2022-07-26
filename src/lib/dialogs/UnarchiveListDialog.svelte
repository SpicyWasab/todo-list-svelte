<script>
    import Dialog, { Title as DialogTitle, Content, Actions, InitialFocus } from '@smui/dialog';
    import Button, { Label } from '@smui/button';
    import { Text } from '@smui/list';

    import { db } from '$lib/db';
    import { showSnackbar } from '$lib/SnackBarManager.svelte';
    
    import { page } from '$app/stores';

    export let list;

    const { category } = $page.params;

    async function submit() {
        try {
            if (await db.table('actives').get(list.name) != undefined) return showSnackbar('Une liste du même nom se trouve déjà dans la catégorie Actives');

            await db.table('actives').add(list);

            await db
                .table('archive')
                .delete(list.name);
            
            showSnackbar(`La liste ${list.name} a été désarchivée !`);
        } catch(e) {
            console.error(e);
            showSnackbar(`Une erreur est survenue.`);
        }
    }
</script>

<Dialog open on:SMUIDialog:closed>
    <DialogTitle>Désarchiver</DialogTitle>
    <Content>
        <Text>Désarchiver la liste {list.name} ?</Text>
    </Content>
    <Actions>
        <Button color="secondary" use={[InitialFocus]}>
            <Label>Annuler</Label>
        </Button>
        <Button variant="unelevated" on:click={submit}>
            <Label>Désarchiver</Label>
        </Button>
    </Actions>
</Dialog>