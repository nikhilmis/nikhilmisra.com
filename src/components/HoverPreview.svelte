<script lang="ts">
    import { writable } from 'svelte/store';

    export let project: {
        title: string;
        keywords: string;
        year: string;
        slug: string;
        isVideo: boolean;
    };
    const { title, keywords, year, slug, isVideo } = project;

    const getVideo = () => document.getElementById(slug) as HTMLVideoElement;
    const position = (x: number, y: number) => `top: ${y}px; left: ${x}px`;

    let coords = writable({ x: 0, y: 0 });
    const mouseMoveHandler = (e: any) => {
        coords.set({ x: e.clientX, y: e.clientY - e.target.offsetTop });
    };

    const toggleHover = () => document.querySelector('.work')?.classList.toggle('hover');

    const onMouseEnter = () => {
        toggleHover();

        if (isVideo) {
            getVideo().play();
        }
    };

    const onMouseLeave = () => {
        toggleHover();

        if (isVideo) {
            getVideo().pause();
            getVideo().currentTime = 0;
        }
    };
</script>

<a
    href={`/work/${slug}`}
    on:mousemove={mouseMoveHandler}
    on:mouseenter={onMouseEnter}
    on:mouseleave={onMouseLeave}
>
    <li class="grid">
        {#each [title, keywords, year] as text}
            <div>
                <span>{text}</span>
            </div>
        {/each}
    </li>

    <div class="preview" style={position($coords.x, $coords.y)}>
        <slot />
    </div>
</a>

<style>
    a {
        display: block;
        margin: 25px 0;
        padding: 15px 0;
        position: relative;
        overflow: hidden;
    }

    a .preview {
      display: none;
    }

    a:hover {
      overflow: visible;
    }

    a:hover .preview {
        opacity: 0.6;
    }

    div,
    span,
    li {
        pointer-events: none;
    }

    @media only screen and (min-width: 600px) {
      a .preview {
        display: block;
        width: 1100px;
        position: absolute;
        opacity: 0;
        z-index: -1;
        transform: translate(-50%, -50%);
        pointer-events: none;
    }
    }
</style>
