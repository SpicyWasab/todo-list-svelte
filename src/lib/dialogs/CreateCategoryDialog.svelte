<script>
    import Dialog, { Title as DialogTitle, Content, Actions, InitialFocus } from '@smui/dialog';
    import Button, { Label } from '@smui/button';
    import TextField, { HelperLine } from '@smui/textfield';

    import { showSnackbar } from '$lib/SnackBarManager.svelte';
    import { db, createCategory } from '$lib/db';
    import { page } from '$app/stores';

    let categoryName = "";

    $: invalid = categoryName.length === 0;

    async function submit() {
        try {
            if(db.tables.some(table => table.name === categoryName)) return showSnackbar('Une autre catégorie porte déjà ce nom.');
            await createCategory(categoryName);

            showSnackbar(`La catégorie ${categoryName} a été créée !`);
        } catch(e) {
            console.error(e);
            showSnackbar(`Une erreur est survenue.`);
        }
}
</script>

<Dialog open on:SMUIDialog:closed>
    <DialogTitle>Créer catégorie {categoryName}</DialogTitle>
    <Content>
        <TextField bind:value={categoryName} label="Nom" {invalid} input$maxlength={20}>
            <HelperLine slot="helper">{categoryName.length}/20</HelperLine>
        </TextField>
    </Content>
    <Actions>
        <Button color="secondary">
            <Label>Annuler</Label>
        </Button>
        <Button disabled={invalid} variant="unelevated" defaultAction use={[InitialFocus]} on:click={submit}>
            <Label>Créer</Label>
        </Button>
    </Actions>
</Dialog>