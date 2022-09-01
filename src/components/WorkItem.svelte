<script lang="ts">
    interface Frontmatter {
        title: string;
        keywords: string;
        year: string;
        url: string;
    }

    import { writable } from 'svelte/store';
    
    export let project: Frontmatter;
    const isVideo = false;
    const videoId = '';

    let coords = writable({ x: 0, y: 0 });
    let videoIsPlaying = false;
    const mouseMoveHandler = (e: any) => coords.set({ x: e.clientX, y: e.clientY });
    const position = (x: number, y: number) => `top: ${y}px; left: ${x}px`;
    const stopVideo = () => videoIsPlaying = false;
    const endVideoHover = () => {
        stopVideo();
        const video: HTMLVideoElement = document.querySelector(`#${videoId}`) as HTMLVideoElement;
        if (video) video.currentTime = 0;
    };

	const { title, keywords, year } = project;
	const content = [title, keywords, year];
</script>

<a
    href={project.url}
    on:mousemove={mouseMoveHandler}
    on:mouseenter={stopVideo}
    on:mouseleave={endVideoHover}
>
    <li class="grid">
        {#each content as text}
            <div>
                <span class="underlined animated-underline">{text}</span>
            </div>
        {/each}
    </li>
	
    <div style={position($coords.x, $coords.y)}>
        <slot />
    </div>
</a>