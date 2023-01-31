<script lang="ts">
    import { writable } from 'svelte/store';

    interface Frontmatter {
        title: string;
        keywords: string;
        year: string;
        url: string;
        videoId?: string;
    }
    
    export let project: Frontmatter;
    const { title, keywords, year, videoId } = project;

    const getVideo = () => document.querySelector(`#${videoId}`) as HTMLVideoElement;
    const position = (x: number, y: number) => `top: ${y}px; left: ${x}px`;

    let coords = writable({ x: 0, y: 0 });
    const mouseMoveHandler = (e: any) => {
        coords.set({ x: e.clientX, y: e.clientY });
    };

    const toggleHover = () => document.querySelector('.work')?.classList.toggle('hover')

    const onMouseEnter = () => {
        toggleHover();

        if (getVideo()) {
            getVideo().autoplay = true;
        }
    }

    const onMouseLeave = () => {
        toggleHover();

        if (getVideo()) {
            getVideo().autoplay = false;
            getVideo().currentTime = 0;
        }
    }
</script>

<a
    href={project.url}
    on:mousemove={mouseMoveHandler}
    on:mouseenter={onMouseEnter}
    on:mouseleave={onMouseLeave}
>
    <li class='grid'>
        {#each [title, keywords, year] as text}
            <div>
                <span>{text}</span>
            </div>
        {/each}
    </li>
	
    <div class='preview' style={position($coords.x, $coords.y)}>
        <slot />
    </div>
</a>

<style>
    a {
        display: block;
        margin: 25px 0;
        padding: 15px 0;
        position: relative;
    }

    a .preview {
        width: 1100px;
        position: absolute;
        opacity: 0;
        z-index: -1;
        transition: opacity 300ms;
        transform: translate(-50%, -100%);
        pointer-events: none;
    }

    a:hover .preview {
        opacity: 0.6;
    }

    /* .grid:hover .underlined.animated-underline:after {
        width: 100%;
        background-color: var(--white);
    } */
</style>