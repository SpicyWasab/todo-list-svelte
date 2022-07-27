<script context="module">
  import { base } from '$app/paths';

  export async function load() {
    return {
      status: 301,
      redirect: `${base}/categories/actives`
    };
  }
</script>