export const vIntersection = {
    mounted(el, binding) {
        const options = binding.value.options || {};
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                binding.value.handler(entries, observer, true);
            }
        }, options);
        observer.observe(el);
    },
    unmounted(el, binding) {
        if (el._intersectionObserver) {
            el._intersectionObserver.disconnect();
        }
    }
};