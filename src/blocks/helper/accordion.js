const accordionContainer = document.getElementsByClassName('vk_accordion-container');
let accordionTarget;
let accordionToggle;


const accordionToggleLoop = (i) => {

	if ( accordionContainer[i].querySelector('.vk_accordion-toggle').classList.contains( 'vk_accordion-toggle-open' ) ) {
		accordionContainer[i].querySelector('.vk_accordion-target').classList.add("vk_accordion-target-open");
	}

	if ( accordionContainer[i].querySelector('.vk_accordion-toggle').classList.contains( 'vk_accordion-toggle-close' ) ) {
		accordionContainer[i].querySelector('.vk_accordion-target').classList.add("vk_accordion-target-close");
	}

    accordionContainer[i].querySelector('.vk_accordion-toggle').addEventListener('click', () => {
		accordionToggle = accordionContainer[i].querySelector('.vk_accordion-toggle');
		accordionTarget = accordionContainer[i].querySelector('.vk_accordion-target');
        if (accordionToggle.classList.contains( 'vk_accordion-toggle-close' )) {
			accordionToggle.classList.remove('vk_accordion-toggle-close');
			accordionToggle.classList.add('vk_accordion-toggle-open');
			accordionTarget.classList.remove('vk_accordion-target-close');
			accordionTarget.classList.add('vk_accordion-target-open');

        } else {
			accordionToggle.classList.remove('vk_accordion-toggle-open');
			accordionToggle.classList.add('vk_accordion-toggle-close');
			accordionTarget.classList.remove('vk_accordion-target-open');
			accordionTarget.classList.add('vk_accordion-target-close');
        }

    }, false);

};

for (let i = 0; i < accordionContainer.length; i++) {
	accordionToggleLoop(i);
}
