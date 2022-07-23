<script>
    import TopAppBar from '$lib/TopAppBar.svelte';
    import Drawer from '$lib/Drawer.svelte';
    import SnackBarManager from '$lib/SnackBarManager.svelte';

    import CircularProgress from "@smui/circular-progress";
    
    import Banner, { Label, Icon } from "@smui/banner";
    
    import Button from "@smui/button";

    import { goto } from "$app/navigation";

    import { todoLists, databaseStarted } from '$lib/state';
    
    import { init } from '$lib/database.mjs';
    
    let initPromise = init()
        .then(todos => {
            todoLists.set(todos);
            databaseStarted.set(true);
            goto('actives').catch(console.error);
        });
</script>

<Drawer />
<TopAppBar />

{#await initPromise}

  <div class="center-items">
    <CircularProgress style="width: 48px; height: 48px;" indeterminate />
  </div>

{:then}

<slot>
    <!-- App main-->
</slot>

{:catch error}

  <Banner open mobileStacked centered>
    <Icon slot="icon" class="material-icons">error</Icon>
    <Label slot="label">
      Une erreur est survenue lors de l'ouverture de la base de données locale.
    </Label>
    <svelte:fragment slot="actions">
      <Button on:click={() => (initPromise = init())}>Réessayer</Button>
    </svelte:fragment>
  </Banner>

{/await}

<SnackBarManager />