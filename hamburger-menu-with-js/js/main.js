const demo = document.querySelector('.demo');

// document.querySelector('.demo').addEventListener('click', () => {
demo.addEventListener('click', () => {
    document.querySelector('nav').classList.toggle('show-nav');

    // const nav = document.querySelector('nav');
    // nav.classList.toggle('show-nav');

    // if (nav.classList.contains('show-nav')) {
    //     document.querySelector('nav').classList.remove('show-nav');
    // } else {
    //     document.querySelector('nav').classList.add('show-nav');
    // }
}); 