<script>
  console.log('testeee');

    import { db } from '$lib/db';
    import TopAppBar from '$lib/TopAppBar.svelte';
    import Drawer from '$lib/Drawer.svelte';
    import SnackBarManager from '$lib/SnackBarManager.svelte';
    import DialogManager from '$lib/DialogManager.svelte';

    import CircularProgress from "@smui/circular-progress";
    
    import Banner, { Label, Icon } from "@smui/banner";
    
    import Button from "@smui/button";
    
    import { browser } from '$app/env';

    console.log('layout');

    let initPromise = startDatabase();

    async function startDatabase() {
      console.log('layout:startDB');
      if(!browser) return;
      if(db.isOpen()) return;

      console.log('dbWasntStarted');

      try {
        await db.open();
      } catch(e) {
        console.error(e);
      }
    }
</script>

<svelte:head>
  <meta name="theme-color" content="#ff3e00">
  <meta name="theme-color" content="#ff3e00" media="(prefers-color-scheme: dark)">
</svelte:head>

<Drawer />
<TopAppBar />

{#await initPromise}

  <div class="center-items">
    <CircularProgress style="width: 48px; height: 48px;" indeterminate />
  </div>

{:then}

  <main>
    <slot>
        <!-- App main-->
    </slot>
  </main>

{:catch error}

  <Banner open mobileStacked centered>
    <Icon slot="icon" class="material-icons">error</Icon>
    <Label slot="label">
      Une erreur est survenue lors de l'ouverture de la base de données locale.
    </Label>
    <svelte:fragment slot="actions">
      <Button on:click={() => (initPromise = startDatabase())}>Réessayer</Button>
    </svelte:fragment>
  </Banner>

{/await}

<SnackBarManager />
<DialogManager />