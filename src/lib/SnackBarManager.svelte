<script context="module">
    import { writable } from 'svelte/store';

    let snackbarText = writable();

    export function showSnackbar(text) {
        snackbarText.set(text);
    }
</script>

<script>
    import Kitchen from '@smui/snackbar/kitchen';

    let kitchen;

    $: if($snackbarText != undefined) {
        kitchen.push({ 
            label: $snackbarText,
            dismissButton: true,
            onClose: () => snackbarText.set(undefined)
         });
    }
</script>

<Kitchen bind:this={kitchen} dismiss$class="material-icons"/>