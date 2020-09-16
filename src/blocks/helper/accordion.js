
const accordionContainer = document.getElementsByClassName('vk_accordion-container');
let accordionTarget;
let accordionToggle;


const accordionToggleLoop = (i) => {

    accordionContainer[i].querySelector('.vk_accordion-target').style.display = 'none';


    accordionContainer[i].querySelector('.vk_accordion-toggle').addEventListener('click', () => {
		accordionTarget = accordionContainer[i].querySelector('.vk_accordion-target');
		accordionToggle = accordionContainer[i].querySelector('.vk_accordion-toggle');
        if (accordionTarget.style.display !== 'none') {
			accordionTarget.style.display = 'none';
			accordionToggle.classList.remove('vk_accordion-toggle-close');
			accordionToggle.classList.add('vk_accordion-toggle-open');
        } else {
			accordionTarget.style.display = 'block';
			accordionToggle.classList.add('vk_accordion-toggle-close');
			accordionToggle.classList.remove('vk_accordion-toggle-open');
        }

    }, false);

};

for (let i = 0; i < accordionContainer.length; i++) {
	accordionToggleLoop(i);
}
