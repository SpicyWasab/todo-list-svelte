<script>
    import Dialog, { Title as DialogTitle, Content, Actions, InitialFocus } from '@smui/dialog';
    import Button, { Label } from '@smui/button';
    import TextField, { HelperLine } from '@smui/textfield';

    import { showSnackbar } from '$lib/SnackBarManager.svelte';
    import { db, createCategory } from '$lib/db';

    let categoryName = "";

    const maxLength = 20;

    $: categoryName = categoryName.slice(0, maxLength);

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
        <TextField bind:value={categoryName} label="Nom" {invalid} input$maxlength={maxLength}>
            <HelperLine slot="helper">{categoryName.length}/{maxLength}</HelperLine>
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