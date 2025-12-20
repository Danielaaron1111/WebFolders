const myModal = document.querySelector('.overlay');

window.addEventListener('load', function () {
    setTimeout(function open() {
        myModal.style.display = 'block';
    }, 1000);
});

// document.getElementById('close').addEventListener('click', function () {
//     myModal.style.display = "none";
// });

const cloeBtn = document.querySelector('#close');

cloeBtn.addEventListener('click', function () {
    myModal.style.display = "none";
});

window.onclick = function(event) {
    if (event.target === myModal) {
        myModal.style.display = "none";
    }
}
