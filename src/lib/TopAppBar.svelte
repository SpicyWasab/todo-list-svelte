<script>
    import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
    import IconButton from '@smui/icon-button';
    import { openDrawer } from '$lib/Drawer.svelte';
</script>

<TopAppBar style="position: static;">
    <Row>
        <Section>
            <IconButton class="material-icons" on:click={() => openDrawer()}>menu</IconButton>
            <Title>Todo List</Title>
        </Section>
    </Row>
</TopAppBar>