export const smoothScroll = (duration) => {
    const intervalTime = 16;
    const end = 0;
    const distance = -window.pageYOffset;
    const increment = distance / (duration / intervalTime);
    let stopAnimation;

    const animateScroll = () => {
        window.scrollBy(0, increment);
        stopAnimation();
    };

    if (increment >= 0) {
        stopAnimation = () => {
            const offset = window.pageYOffset;
            if ((offset >= (end - increment)) || ((window.innerHeight + offset) >= document.body.offsetHeight)) {
                clearInterval(interval);
            }
        };
    } else {
        stopAnimation = () => {
            const offset = window.pageYOffset;
            if (offset <= end) {
                clearInterval(interval);
            }
        };
    }

    const interval = setInterval(animateScroll, intervalTime);
}