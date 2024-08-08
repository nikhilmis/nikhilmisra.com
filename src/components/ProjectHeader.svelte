<script lang="ts">
    import { writable } from 'svelte/store';

    const position = (x: number, y: number) => `top: ${y}px; left: ${x - 25}px`;

    let coords = writable({ x: 0, y: 0 });
    const mouseMoveHandler = (e: any) => {
        coords.set({ x: e.clientX, y: e.clientY - e.target.offsetTop });
    };

    let hovering = false;

    const onMouseEnter = () => {
        hovering = true;
    };

    const onMouseLeave = () => {
        hovering = false;
    };
</script>

<header>
    <a
        on:mousemove={mouseMoveHandler}
        on:mouseenter={onMouseEnter}
        on:mouseleave={onMouseLeave}
        class="title"
        href="/"
        >Nikhil Misra
    </a>
    <div class="spacer"></div>
</header>
<img
    class={`hover-image${hovering ? ' hover' : ''}`}
    style={position($coords.x, $coords.y)}
    src="/favicon.png"
    alt="Me"
/>

<style>
    header {
      display: flex;
    }

    .title {
        display: block;
        padding: 25px;
        flex-basis: 1;
    }

    .spacer {
      flex-basis: 10;
    }

    .hover-image {
        opacity: 0;
        position: absolute;
    }

    .hover-image.hover {
        opacity: 1;
    }
</style>
