<script>
    import { onMount } from 'svelte';

    onMount(() => {
        const blurNonSelection = () => {
            document.body.classList.remove('blur');
            const shadowRoot = document.querySelector('mechanical-ragger')?.shadowRoot;

            if (!shadowRoot) {
                return undefined;
            }

            shadowRoot.childNodes.forEach((child) => child.classList.remove('blur'));

            let text = '';
            let selection = window.getSelection();
            if (selection) {
                text = window.getSelection().toString();
            } else if (document.selection && document.selection.type != 'Control') {
                text = document.selection.createRange().text;
            }

            if (text.length > 0) {
                document.body.classList.add('blur');
                shadowRoot.childNodes.forEach((child) => child.classList.add('blur'));
            }
        };

        document.addEventListener('selectionchange', function () {
            blurNonSelection();
        });
    });
</script>