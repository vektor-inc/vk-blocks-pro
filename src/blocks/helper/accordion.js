
const vkFaq2Container = document.getElementsByClassName('vk_faq-accordion-on');
let vkFaq2Q;
let vkFaq2A;

let toggleLoop = (i) => {

    vkFaq2Container[i].querySelector('.vk_faq_content').style.display = 'none';


    vkFaq2Container[i].querySelector('.vk_faq_title').addEventListener('click', () => {
        vkFaq2A = vkFaq2Container[i].querySelector('.vk_faq_content');
        if (vkFaq2A.style.display !== 'none') {
            vkFaq2A.style.display = 'none';
        } else {
			vkFaq2A.style.display = 'block';
        }

    }, false);

};

for (let i = 0; i < vkFaq2Container.length; i++) {
	toggleLoop(i);
}
