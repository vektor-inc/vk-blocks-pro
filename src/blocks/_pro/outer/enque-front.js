window.addEventListener('load', function () {

    let outerList = document.querySelectorAll('.vk_outer.has-text-color');

    outerList.forEach( el => {
        const st = el.style.borderStyle;
        el.style.borderStyle = 'solid';
        el.style.borderColor = window.getComputedStyle(el, '').color; 
        el.style.borderStyle = st;
    });

});