<script context="module">
    import { closeDrawer } from '$lib/Drawer.svelte';
    
    import dialogs from '$lib/dialogs';
    import { writable } from 'svelte/store';
    
    const currentDialog = writable();
    
    const dialogProps = writable({ });

    export function showDialog(id, props) {
        const dialog = dialogs[id];
        dialogProps.set(props);
        closeDrawer();
        currentDialog.set(dialog);
    }
</script>

<svelte:component this={$currentDialog} on:SMUIDialog:closed={() => currentDialog.set(undefined)}  {...$dialogProps}/>