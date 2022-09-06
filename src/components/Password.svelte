<script>
    let password = '';

    const hash = (s) =>
        s.split('').reduce((a, b) => {
            a = (a << 5) - a + b.charCodeAt(0);
            return a & a;
        }, 0);

    $: console.log(password, hash(password))
</script>

{#if hash(password) === 1217359147}
    <slot />
{:else}
    <h1 class="passwordPageHeader">Nikhil Misra</h1>
    <form>
        <input
            bind:value={password}
            id="password"
            type="password"
        />
    </form>
{/if}

<style>
    form {
        position: fixed;
        width: 100%;
        top: 40%;
        text-align: center;
    }

    input {
        outline: white solid 1px;
        padding: 25px;
        font-size: 25px;
    }

    .passwordPageHeader {
        width: 100%;
        text-align: left;
        margin: 25px 0 0 25px;
    }
</style>