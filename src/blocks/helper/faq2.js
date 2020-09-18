
const vkFaq2Container = document.getElementsByClassName('vk_faq-accordion');
let vkFaq2A;

const toggleLoop = (i) => {
	if ( vkFaq2Container[i].classList.contains( 'vk_faq-acc-open' ) ) {
		vkFaq2Container[i].querySelector('.vk_faq_content').classList.add("vk_faq-content-open");
	}

	if ( vkFaq2Container[i].classList.contains( 'vk_faq-acc-close' ) ) {
		vkFaq2Container[i].querySelector('.vk_faq_content').classList.add("vk_faq-content-close");
	}

    vkFaq2Container[i].querySelector('.vk_faq_title').addEventListener('click', () => {
        vkFaq2A = vkFaq2Container[i].querySelector('.vk_faq_content');
        if ( vkFaq2Container[i].classList.contains( 'vk_faq-acc-open' ) ) {

			vkFaq2Container[i].classList.remove( 'vk_faq-acc-open' );
			vkFaq2Container[i].classList.add( 'vk_faq-acc-close' );

			vkFaq2A.classList.remove( 'vk_faq-content-open' );
			vkFaq2A.classList.add( 'vk_faq-content-close' );

        } else if ( vkFaq2Container[i].classList.contains( 'vk_faq-acc-close' ) ) {

			vkFaq2Container[i].classList.remove( 'vk_faq-acc-close' );
			vkFaq2Container[i].classList.add( 'vk_faq-acc-open' );

			vkFaq2A.classList.remove( 'vk_faq-content-close' );
			vkFaq2A.classList.add( 'vk_faq-content-open' );

        }

    }, false);

};

for (let i = 0; i < vkFaq2Container.length; i++) {
	toggleLoop(i);
}
