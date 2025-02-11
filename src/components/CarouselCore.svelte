<script lang="ts">
    import { writable } from 'svelte/store';

    export let numberOfImages: number;

    let carouselWidth = 0;
    let scrollLeft = 0;
    let currentImage = 0;
    let cursorIsNext = false;
    let carouselContainer: HTMLDivElement;
    let coords = writable({ x: 0 });

    coords.subscribe((value) => {
        cursorIsNext = value.x > carouselWidth / 2;
    });

    const mouseMoveHandler = (e: MouseEvent) => {
        coords.set({ x: e.clientX - carouselContainer.getBoundingClientRect().x });
    };

    const nextImage = () => {
        const currentImageIsLast = currentImage === numberOfImages - 1;

        if (currentImageIsLast) {
            scrollLeft = 0;
            currentImage = 0;
        } else {
            scrollLeft += carouselWidth;
            currentImage++;
        }

        scroll();
    };

    const prevImage = () => {
        const currentImageIsFirst = currentImage === 0;

        if (currentImageIsFirst) {
            const lastImageIndex = numberOfImages - 1;
            scrollLeft = lastImageIndex * carouselWidth;
            currentImage = lastImageIndex;
        } else {
            scrollLeft -= carouselWidth;
            currentImage -= 1;
        }

        scroll();
    };

    const scroll = () => {
        const imageContainer = document.querySelector('.images');

        if (!imageContainer) {
            return null;
        }

        imageContainer.scrollLeft = scrollLeft;
    };

    const goToImage = (image: number) => {
        currentImage = image;
        scrollLeft = image * carouselWidth;

        scroll();
    };
</script>

<div class="carousel" bind:this={carouselContainer}>
    <button
        class={cursorIsNext ? 'nextCursor' : 'prevCursor'}
        bind:clientWidth={carouselWidth}
        on:click={cursorIsNext ? nextImage : prevImage}
        on:mousemove={mouseMoveHandler}
    >
        <slot name="images" />
    </button>

    <div class="dots">
        {#each { length: numberOfImages } as _, i}
            <button
                on:click={() => goToImage(i)}
                class={`dotButton${i === currentImage ? ' selected' : ''}`}>
              <span class="dot">
            </button>
        {/each}
    </div>
</div>

<style>
    .dots {
        display: flex;
        gap: 10px;
        justify-content: center;
    }

    .dotButton {
      cursor: pointer;
      padding: 10px 5px;
    }

    .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: grey;
        display: block;
    }

    .selected .dot {
      background-color: black;
    }

    .carousel {
        margin: 0 auto;
    }

    .prevCursor {
        cursor: url('/prev.svg'), auto;
    }

    .nextCursor {
        cursor: url('/next.svg'), auto;
    }
</style>
