<script>
    import Dialog, { Title as DialogTitle, Content, Actions, InitialFocus } from '@smui/dialog';
    import Button, { Label } from '@smui/button';
    import TextField, { HelperLine } from '@smui/textfield';

    import { createList } from '$lib/database.mjs';
    import { showSnackbar } from '$lib/SnackBarManager.svelte';
    import { todoLists } from '$lib/state.mjs';

    let listName = "";

    $: invalid = listName.length === 0;

    async function submit() {
        try {
            let newTodoListsState = await createList(listName);
            todoLists.set(newTodoListsState);

            showSnackbar(`La liste ${listName} a été créée !`);
        } catch(e) {
            showSnackbar(`Une erreur est survenue.`);
        }
}
</script>

<Dialog open on:SMUIDialog:closed>
    <DialogTitle>Créer liste {listName}</DialogTitle>
    <Content>
        <TextField bind:value={listName} label="Nom" {invalid} input$maxlength={20}>
            <HelperLine slot="helper">{listName.length}/20</HelperLine>
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