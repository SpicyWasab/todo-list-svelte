<script>
    import Button, { Label } from '@smui/button';

    import { page } from "$app/stores";
    import { goto } from '$app/navigation';
    import { showSnackbar } from "$lib/SnackBarManager.svelte";

    const listName = $page.params['unknownList'];

    showSnackbar(`La liste ${listName} n'existe pas.`)
</script>

<div class="center-items">
    <Button variant="outlined">
        <Label on:click={() => goto('/actives')}>Voir toutes les listes</Label>
    </Button>
</div>