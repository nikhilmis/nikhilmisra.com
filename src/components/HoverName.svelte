<script lang="ts">
    export let invert: boolean = false;
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

<a
    on:mousemove={mouseMoveHandler}
    on:mouseenter={onMouseEnter}
    on:mouseleave={onMouseLeave}
    class="name"
    href="/"
    >Nikhil Misra
</a>
<img
    class={`hover-image${hovering ? ' hover' : ''}${invert ? ' invert' : ''}`}
    style={position($coords.x, $coords.y)}
    src="/nikhil.jpg"
    alt="Me"
/>

<style>
  .name {
      display: inline-block;
  }

  .hover-image {
      opacity: 0;
      position: absolute;
      z-index: -1;
  }

  .hover-image.hover {
      opacity: 1;
  }

  .hover-image.invert {
    filter: invert(1);
  }
</style>