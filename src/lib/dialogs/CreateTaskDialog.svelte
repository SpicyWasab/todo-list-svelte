<script>
    import Dialog, { Title as DialogTitle, Content, Actions, InitialFocus } from '@smui/dialog';
    import Button, { Label } from '@smui/button';
    import TextField, { HelperLine } from '@smui/textfield';

    import { showSnackbar } from '$lib/SnackBarManager.svelte';

    import { db } from '$lib/db';

    export let category;
    export let currentList;

    let taskName = "";
    
    const maxLength = 50;

    $: taskName = taskName.slice(0, maxLength);

    $: invalid = taskName.length === 0;

    async function submit() {
        try {
            if($currentList.tasks.some(task => task.name === taskName)) return showSnackbar('Une tâche de cette liste porte déjà ce nom.');

            $currentList.tasks.push({ name: taskName, done: false });
            await db.table(category).put($currentList);

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
        <TextField bind:value={taskName} label="Nom" {invalid} input$maxlength={{maxLength}}>
            <HelperLine slot="helper">{taskName.length}/{maxLength}</HelperLine>
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