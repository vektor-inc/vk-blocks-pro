
const vkFaq2Container = document.getElementsByClassName('vk_faq-accordion-on');
let vkFaq2Q;
let vkFaq2A;
let vkFaq2AH = [];

let toggleLoop = (i) => {

    vkFaq2AH[i] = vkFaq2Container[i].querySelector('.vk_faq_content').clientHeight;
    vkFaq2Container[i].querySelector('.vk_faq_content').style.height = '0px';


    vkFaq2Container[i].querySelector('.vk_faq_title').addEventListener('click', () => {
        vkFaq2A = vkFaq2Container[i].querySelector('.vk_faq_content');
        if (vkFaq2A.style.height !== '0px') {
            vkFaq2A.style.height = '0px';
        } else {
            vkFaq2A.style.height = vkFaq2AH[i] + 'px';
        }

    }, false);

};

for (let i = 0; i < vkFaq2Container.length; i++) {
	toggleLoop(i);
}
