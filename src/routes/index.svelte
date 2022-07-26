<script context="module">
    export async function load() {
      console.log('test');
      
      return {
        status: 301,
        redirect: '/categories/actives'
      };
    }
  </script>