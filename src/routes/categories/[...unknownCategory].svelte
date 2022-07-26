<script>
    import Button, { Label } from '@smui/button';

    import { page } from "$app/stores";
    import { goto } from '$app/navigation';
    import { showSnackbar } from "$lib/SnackBarManager.svelte";

    const { unknownCategory } = $page.params;

    showSnackbar(`La catégorie ${unknownCategory} n'existe pas.`)
</script>

<div class="center-items">
    <Button variant="outlined">
        <Label on:click={() => goto('/categories/actives')}>Retour à la catégorie Actives</Label>
    </Button>
</div>