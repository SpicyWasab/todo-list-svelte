<script>
    import { base } from '$app/paths';

    import Dialog, { Title as DialogTitle, Content, Actions, InitialFocus } from '@smui/dialog';
    import Button, { Label } from '@smui/button';
    import { Text } from '@smui/list';

    import { db, deleteCategory } from '$lib/db';
    import { showSnackbar } from '$lib/SnackBarManager.svelte';
    
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    
    export let category;

    async function submit() {
        try {
            await deleteCategory(category);

            if($page.params.category === category) goto(`${base}/categories/actives`);

            showSnackbar(`La catégorie ${category} a été supprimée !`);
        } catch(e) {
            console.error(e);
            showSnackbar(`Une erreur est survenue.`);
        }
    }
</script>

<Dialog open on:SMUIDialog:closed>
    <DialogTitle>Supprimer</DialogTitle>
    <Content>
        <Text>Supprimer la catégorie {category} ?</Text>
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