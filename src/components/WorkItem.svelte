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
        coords.set({ x: e.clientX, y: e.clientY })
    };

    const startVideo = () => {
        getVideo().autoplay = true;
    }
    const endVideoHover = () => {
        const video = getVideo();
        video.autoplay = false;
        video.currentTime = 0;
    };
</script>

<a
    href={project.url}
    on:mousemove={mouseMoveHandler}
    on:mouseenter={videoId ? startVideo : () => null}
    on:mouseleave={videoId ? endVideoHover : () => null}
>
    <li class='grid'>
        {#each [title, keywords, year] as text}
            <div>
                <span class='underlined animated-underline'>{text}</span>
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
        padding: 30px 0;
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

    .grid:hover .underlined.animated-underline:after {
        width: 100%;
        background-color: var(--white);
    }

    a {
        transition: filter 0.1s;
    }
</style>