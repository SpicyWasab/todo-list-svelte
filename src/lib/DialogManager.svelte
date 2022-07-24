<script context="module">
    import dialogs from './dialogs';
    import { writable } from 'svelte/store';
    
    const currentDialog = writable();
    
    const dialogProps = writable({ });

    export function showDialog(id, props) {
        console.log('testttt');
        const dialog = dialogs[id];
        console.log('tetstttttt')
        console.log(props);
        dialogProps.set(props);
        currentDialog.set(dialog);
    }
</script>

<svelte:component this={$currentDialog} on:SMUIDialog:closed={() => currentDialog.set(undefined)}  {...$dialogProps}/>