<script>
    import Dialog, { Title as DialogTitle, Content, Actions, InitialFocus } from '@smui/dialog';
    import Button, { Label } from '@smui/button';
    import { Text } from '@smui/list';

    import { deleteList } from '$lib/database.mjs';
    import { showSnackbar } from '$lib/SnackBarManager.svelte';
    import { todoLists } from '$lib/state.mjs';

    export let list;

    async function submit() {
        try {
            // TODO: to update with ... update ? xD
            let newTodoListsState = await deleteList(list.id);
            todoLists.set(newTodoListsState);

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