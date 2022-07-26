<script>
    import { Content, Header, Panel } from '@smui-extra/accordion';
    import List, { Item, Graphic, Text, Meta } from '@smui/list';
    import Checkbox from '@smui/checkbox';
    import IconButton, { Icon } from '@smui/icon-button';
    
    import { fade, crossfade } from 'svelte/transition';
    import { flip } from 'svelte/animate';

    let panelOpen = true;

    export let name;
    export let tasks;
    export let taskChecked;
    export let clickedDelete;
    export let send;
    export let receive;
</script>

<Panel bind:open={panelOpen}>   
    <Header>
        <Text>{name}</Text>
        <IconButton slot="icon" toggle pressed={panelOpen}>
            <Icon class="material-icons" on>expand_less</Icon>
            <Icon class="material-icons">expand_more</Icon>
        </IconButton>
    </Header>
    <Content>
        <List checkList>
            {#each tasks as { name, done } (name)}
                <div in:receive={{key: name}} out:send={{key: name}} animate:flip>
                    <Item on:SMUI:action={() => taskChecked(name)}>
                        <Graphic>
                            <Checkbox checked={done}/>
                        </Graphic>
                        <Text><span class:done>{name}</span></Text>
                        <Meta>
                            <IconButton class="material-icons" on:click={e => {e.stopPropagation(); clickedDelete(name)}}>delete</IconButton>
                        </Meta>
                    </Item>
                </div>
            {:else}
                <Item>
                    <Text><span in:fade>Aucune tâche</span></Text>
                </Item>
            {/each}
        </List>
    </Content>
</Panel>