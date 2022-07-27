<script>
    import { base } from '$app/paths';

    import Button, { Label } from '@smui/button';

    import { page } from "$app/stores";
    import { goto } from '$app/navigation';
    import { showSnackbar } from "$lib/SnackBarManager.svelte";

    const { unknownList, category } = $page.params;

    showSnackbar(`La liste ${unknownList} n'existe pas.`)
</script>

<div class="center-items">
    <Button variant="outlined">
        <Label on:click={() => goto(`${base}/categories/${category}`)}>Voir la catégorie {category}</Label>
    </Button>
</div>