<script>
    import Dialog, { Title as DialogTitle, Content, Actions, InitialFocus } from '@smui/dialog';
    import Button, { Label } from '@smui/button';
    import TextField, { HelperLine } from '@smui/textfield';

    import { showSnackbar } from '$lib/SnackBarManager.svelte';
    import { page } from '$app/stores';
    import { db } from '$lib/db';

    export let list;

    const {category} = $page.params;

    let listNewName = "";

    const maxLength = 20;

    $: listNewName = listNewName.slice(0, maxLength);

    $: invalid = listNewName.length === 0;

    async function submit() {
        try {
            if(listNewName === list.name) return showSnackbar('Une liste ne peut pas être renommée avec le même nom.');
            if(await db.table(category).get(listNewName) != undefined) return showSnackbar('Une autre liste porte déjà ce nom.');
            
            db.table(category).update(list.name, { name: listNewName });

            showSnackbar(`La liste a été renommée !`);
        } catch(e) {
            showSnackbar(`Une erreur est survenue.`);
        }
}
</script>

<Dialog open on:SMUIDialog:closed>
    <DialogTitle>Renommer liste {list.name}</DialogTitle>
    <Content>
        <TextField bind:value={listNewName} label="Nom" {invalid} input$maxlength={maxLength}>
            <HelperLine slot="helper">{listNewName.length}/{maxLength}</HelperLine>
        </TextField>
    </Content>
    <Actions>
        <Button color="secondary">
            <Label>Annuler</Label>
        </Button>
        <Button disabled={invalid} variant="unelevated" defaultAction use={[InitialFocus]} on:click={submit}>
            <Label>Renommer</Label>
        </Button>
    </Actions>
</Dialog>