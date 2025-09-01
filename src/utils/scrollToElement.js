export const scrollToElement = (e) => {
        const  idElement = e.currentTarget.dataset.href;
        const el = document.getElementById(idElement);
        el?.scrollIntoView({
            behavior: 'smooth'
        });
    }
