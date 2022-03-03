const accordion = document.querySelectorAll(
	//  vk_accordion-containerはvk_accordionになったが互換性のために残しておく
	'.vk_accordion, .vk_accordion-container'
);
let accordionTarget;
let accordionToggle;

const accordionToggleLoop = ( i ) => {
	if (
		accordion[ i ]
			.querySelector( '.vk_accordion-toggle' )
			.classList.contains( 'vk_accordion-toggle-open' )
	) {
		accordion[ i ]
			.querySelector( '.vk_accordion-target' )
			.classList.add( 'vk_accordion-target-open' );
	}

	if (
		accordion[ i ]
			.querySelector( '.vk_accordion-toggle' )
			.classList.contains( 'vk_accordion-toggle-close' )
	) {
		accordion[ i ]
			.querySelector( '.vk_accordion-target' )
			.classList.add( 'vk_accordion-target-close' );
	}

	accordion[ i ].querySelector( '.vk_accordion-toggle' ).addEventListener(
		'click',
		() => {
			accordionToggle = accordion[ i ].querySelector(
				'.vk_accordion-toggle'
			);
			accordionTarget = accordion[ i ].querySelector(
				'.vk_accordion-target'
			);
			if (
				accordionToggle.classList.contains(
					'vk_accordion-toggle-close'
				)
			) {
				accordionToggle.classList.remove( 'vk_accordion-toggle-close' );
				accordionToggle.classList.add( 'vk_accordion-toggle-open' );
				accordionTarget.classList.remove( 'vk_accordion-target-close' );
				accordionTarget.classList.add( 'vk_accordion-target-open' );
			} else {
				accordionToggle.classList.remove( 'vk_accordion-toggle-open' );
				accordionToggle.classList.add( 'vk_accordion-toggle-close' );
				accordionTarget.classList.remove( 'vk_accordion-target-open' );
				accordionTarget.classList.add( 'vk_accordion-target-close' );
			}
		},
		false
	);
};

for ( let i = 0; i < accordion.length; i++ ) {
	accordionToggleLoop( i );
}
