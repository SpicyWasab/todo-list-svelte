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
            await db
                .table(category)
                .delete(list.name);
            
            showSnackbar(`La liste ${list.name} a été supprimée !`);
        } catch(e) {
            console.error(e);
            showSnackbar(`Une erreur est survenue.`);
        }
    }
</script>

<Dialog open on:SMUIDialog:closed>
    <DialogTitle>Supprimer</DialogTitle>
    <Content>
        <Text>Supprimer la liste {list.name} ?</Text>
    </Content>
    <Actions>
        <Button color="secondary" use={[InitialFocus]}>
            <Label>Annuler</Label>
        </Button>
        <Button variant="unelevated" on:click={submit}>
            <Label>Supprimer</Label>
        </Button>
    </Actions>
</Dialog>