<script>
    import Button from '@smui/button';
    import { showDialog } from '$lib/DialogManager.svelte';
</script>

<Button variant="raised" color="secondary" style="width: 100%;" on:click={() => showDialog('create-category')}>
    Créer
</Button>