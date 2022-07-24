<script>
    import Dialog, { Title as DialogTitle, Content, Actions, InitialFocus } from '@smui/dialog';
    import Button, { Label } from '@smui/button';
    import TextField, { HelperLine } from '@smui/textfield';

    import { saveList } from '$lib/database.mjs';
    import { showSnackbar } from '$lib/SnackBarManager.svelte';
    import { todoLists } from '$lib/state.mjs';

    export let list = { };
    let listNewName = "";

    $: invalid = listNewName.length === 0;

    async function submit() {
        try {
            if(listNewName === list.name) return showSnackbar('Une liste ne peut pas être renommée avec le même nom.');
            if($todoLists[listNewName] != undefined) return showSnackbar('Une autre liste porte déjà ce nom.');

            list.name = listNewName;
            
            await saveList(list);

            todoLists.set($todoLists);

            showSnackbar(`La liste a été renommée !`);
        } catch(e) {
            showSnackbar(`Une erreur est survenue.`);
        }
}
</script>

<Dialog open on:SMUIDialog:closed>
    <DialogTitle>Renommer liste {list.name}</DialogTitle>
    <Content>
        <TextField bind:value={listNewName} label="Nom" {invalid} input$maxlength={20}>
            <HelperLine slot="helper">{listNewName.length}/20</HelperLine>
        </TextField>
    </Content>
    <Actions>
        <Button color="secondary">
            <Label>Annuler</Label>
        </Button>
        <Button disabled={invalid} variant="unelevated" defaultAction use={[InitialFocus]} on:click={submit}>
            <Label>Renomer</Label>
        </Button>
    </Actions>
</Dialog>