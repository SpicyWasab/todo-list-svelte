<script context="module">
    import dialogs from './dialogs';
    import { writable } from 'svelte/store';
    
    const currentDialog = writable();

    export function showDialog(id) {
        const dialog = dialogs[id];
        currentDialog.set(dialog);
    }
</script>

<svelte:component this={$currentDialog} on:SMUIDialog:closed={() => currentDialog.set(undefined)}/>