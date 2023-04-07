<script lang="ts">
    import { writable } from 'svelte/store';
    import { onMount } from 'svelte';
    import { imageAnchor } from '../utils/link-handling';

    export let images: number;
    export let uniqueTitle: string;
    export let selectedClass: string;

    const lastImage = images - 1;

    let currentImage = 0;
    let carouselWidth = 0;
    let cursorIsNext = false;
    let coords = writable({ x: 0 });

    coords.subscribe((value) => {
        cursorIsNext = value.x > carouselWidth / 2;
    });

    const mouseMoveHandler = (e: any) => coords.set({ x: e.clientX });

    const nextImage = () => {
        currentImage === lastImage ? (currentImage = 0) : (currentImage += 1);
    };

    const prevImage = () => {
        currentImage === 0 ? (currentImage = lastImage) : (currentImage -= 1);
    };

    const setSelectedAnchor = () => {
        const { hash } = window.location;
        const [title, imageNumber] = hash.split('-');

        if (!title.includes(uniqueTitle)) {
            return;
        }

        currentImage = parseFloat(imageNumber);

        const anchors = document.querySelectorAll(`a[href*="${title}"]`);

        anchors.forEach((a) => a.classList.remove(selectedClass));

        const selectedAnchors = document.querySelectorAll(`a[href="${hash}"]`);

        selectedAnchors.forEach((a) => {
            if (!a.classList.contains('clickLayer')) {
                a.classList.add(selectedClass);
            }
        });
    };

    onMount(async () => {
        window.addEventListener('hashchange', setSelectedAnchor);
    });
</script>

<div class="carousel">
    <a
        class={`clickLayer ${cursorIsNext ? 'nextCursor' : 'prevCursor'}`}
        href={imageAnchor(uniqueTitle, currentImage)}
        bind:clientWidth={carouselWidth}
        on:mousemove={mouseMoveHandler}
        on:click={cursorIsNext ? nextImage : prevImage}
    >
        <slot name="images" />
    </a>
    <slot name="anchors" />
</div>

<style>
    .carousel {
        max-width: 1366px;
        margin: 0 auto;
    }

    .clickLayer {
        display: block;
    }

    .prevCursor {
        cursor: url('/prev.svg'), auto;
    }

    .nextCursor {
        cursor: url('/next.svg'), auto;
    }
</style>
