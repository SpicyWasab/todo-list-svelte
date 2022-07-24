<script>
    import Dialog, { Title as DialogTitle, Content, Actions, InitialFocus } from '@smui/dialog';
    import Button, { Label } from '@smui/button';
    import TextField, { HelperLine } from '@smui/textfield';

    import { archiveList } from '$lib/database.mjs';
    import { currentList } from '$lib/state.mjs';
    import { showSnackbar } from '$lib/SnackBarManager.svelte';

    let taskName = "";

    $: invalid = taskName.length === 0;

    async function submit() {
        try {
            currentList.update(list => {
                list.todos.push({ name: taskName, done: false });
                return list;
            });

            await saveList($currentList);

            showSnackbar(`La tâche ${taskName} a été ajoutée !`);
        } catch(e) {
            console.error(e);
            showSnackbar(`Une erreur est survenue.`);
        }
    }
</script>

<Dialog open on:SMUIDialog:closed>
    <DialogTitle>Ajouter une tâche</DialogTitle>
    <Content>
        <TextField bind:value={taskName} label="Nom" {invalid} input$maxlength={50}>
            <HelperLine slot="helper">{taskName.length}/50</HelperLine>
        </TextField>
    </Content>
    <Actions>
        <Button color="secondary">
            <Label>Annuler</Label>
        </Button>
        <Button disabled={invalid} variant="unelevated" defaultAction use={[InitialFocus]} on:click={submit}>
            <Label>Ajouter</Label>
        </Button>
    </Actions>
</Dialog>