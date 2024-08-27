const vkFaq2Container = document.getElementsByClassName('vk_faq-accordion');
let vkFaq2A;

const FAQ2ToggleLoop = (i) => {
	if (vkFaq2Container[i].classList.contains('vk_faq-accordion-open')) {
		vkFaq2Container[i]
			.querySelector('.vk_faq_content')
			.classList.add('vk_faq_content-accordion-open');
	}

	if (vkFaq2Container[i].classList.contains('vk_faq-accordion-close')) {
		vkFaq2Container[i]
			.querySelector('.vk_faq_content')
			.classList.add('vk_faq_content-accordion-close');
	}

	vkFaq2Container[i].querySelector('.vk_faq_title').addEventListener(
		'click',
		() => {
			vkFaq2A = vkFaq2Container[i].querySelector('.vk_faq_content');
			if (
				vkFaq2Container[i].classList.contains('vk_faq-accordion-open')
			) {
				vkFaq2Container[i].classList.remove('vk_faq-accordion-open');
				vkFaq2Container[i].classList.add('vk_faq-accordion-close');

				vkFaq2A.classList.remove('vk_faq_content-accordion-open');
				vkFaq2A.classList.add('vk_faq_content-accordion-close');
			} else if (
				vkFaq2Container[i].classList.contains('vk_faq-accordion-close')
			) {
				vkFaq2Container[i].classList.remove('vk_faq-accordion-close');
				vkFaq2Container[i].classList.add('vk_faq-accordion-open');

				vkFaq2A.classList.remove('vk_faq_content-accordion-close');
				vkFaq2A.classList.add('vk_faq_content-accordion-open');
			}
		},
		false
	);
};

for (let i = 0; i < vkFaq2Container.length; i++) {
	FAQ2ToggleLoop(i);
}
