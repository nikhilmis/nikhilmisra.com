<script lang="ts">
    let isBioExpanded = false;

    const expandedBioStyle = (isBioExpanded: boolean) =>
        `max-height: ${isBioExpanded ? '500px' : 0}; opacity: ${isBioExpanded ? 1 : 0}`;

    const expandBioHandler = () => {
        isBioExpanded = !isBioExpanded;
    };
</script>

<header class="grid">
    <div class="bio">
        <slot name="bio" />
        <div class="expanded-bio" style={expandedBioStyle(isBioExpanded)}>
            <slot name="expanded-bio" />
        </div>
        <button
            class="animated-underline"
            aria-expanded={isBioExpanded}
            on:click={expandBioHandler}
        >
            {isBioExpanded ? '(Hide information...)' : '(...More Information)'}
        </button>
    </div>
    <div class="expanded-bio about" style={expandedBioStyle(isBioExpanded)}>
        <slot name="about" />
    </div>
    <div class="links">
        <slot name="links" />
    </div>
</header>

<style>
    :global(.grid) {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 100px;
    }

    header {
        --expand-transition: 0.25s cubic-bezier(0.36, 0, 0.66, -0.56);
    }

    header button {
        margin-top: 35px;
        cursor: pointer;
    }

    .expanded-bio {
        overflow: hidden;
        transition: max-height var(--expand-transition), opacity var(--expand-transition);
    }

    @media only screen and (min-width: 1000px) {
        :global(.grid > *:last-child) {
            text-align: right;
        }
    }

    @media only screen and (min-width: 0px) and (max-width: 1000px) {
        :global(.grid) {
            gap: 0;
        }

        header button {
            margin-bottom: 25px;
        }

        header.grid {
            grid-template-columns: 1fr;
        }

        .about {
            display: none;
        }

        .links {
            margin-bottom: 0;
        }
    }
</style>
