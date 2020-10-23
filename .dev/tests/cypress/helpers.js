/**
 * External dependencies.
 */
import { startCase } from 'lodash';

/**
 * Login to our test WordPress site
 */
export function loginToSite() {
	goTo( '/wp-admin/post-new.php?post_type=post' )
		.then( ( window ) => {
			if ( window.location.pathname === '/wp-login.php' ) {
				// WordPress has a wp_attempt_focus() function that fires 200ms after the wp-login.php page loads.
				// We need to wait a short time before trying to login.
				cy.wait( 250 );

				cy.get( '#user_login' ).type( Cypress.env( 'wpUsername' ) );
				cy.get( '#user_pass' ).type( Cypress.env( 'wpPassword' ) );
				cy.get( '#wp-submit' ).click();
			}
		} );

	cy.get( '.block-editor-page' ).should( 'exist' );
}

/**
 * Go to a specific URI.
 *
 * @param {string} path The URI path to go to.
 */
export function goTo( path = '/wp-admin' ) {
	cy.visit( 'http://localhost:8888' + path );
	// cy.visit( Cypress.env( 'testURL' ) + path );
	return cy.window();
}

/**
 * Disable Gutenberg Tips
 */
export function disableGutenbergFeatures() {
	cy.window().should( 'have.property', 'wp' );
	cy.window().then( ( win ) => {
		// Enable "Top Toolbar"
		if ( ! win.wp.data.select( 'core/edit-post' ).isFeatureActive( 'fixedToolbar' ) ) {
			win.wp.data.dispatch( 'core/edit-post' ).toggleFeature( 'fixedToolbar' );
		}

		if ( !! win.wp.data.select( 'core/nux' ) ) { // < GB 7.2 || < WP 5.4
			if ( ! win.wp.data.select( 'core/nux' ).areTipsEnabled() ) {
				return;
			}

			win.wp.data.dispatch( 'core/nux' ).disableTips();
			win.wp.data.dispatch( 'core/editor' ).disablePublishSidebar();
		} else { // GB 7.2 || WP 5.4
			if ( ! win.wp.data.select( 'core/edit-post' ).isFeatureActive( 'welcomeGuide' ) ) {
				return;
			}

			win.wp.data.dispatch( 'core/edit-post' ).toggleFeature( 'welcomeGuide' );
			win.wp.data.dispatch( 'core/editor' ).disablePublishSidebar();
		}
	} );
}

/**
 * From inside the WordPress editor open the CoBlocks Gutenberg editor panel
 *
 * @param {string} blockName The name to find in the block inserter
 * e.g 'core/image' or 'coblocks/accordion'.
 * @param {boolean} clearEditor Should clear editor of all blocks
 */
export function addBlockToPost( blockName, clearEditor = false ) {
	const blockCategory = blockName.split( '/' )[ 0 ] || false;
	const blockID = blockName.split( '/' )[ 1 ] || false;

	if ( ! blockCategory || ! blockID ) {
		return;
	}

	if ( clearEditor ) {
		clearBlocks();
	}

	cy.get( '.edit-post-header-toolbar' ).find( '.edit-post-header-toolbar__inserter-toggle' ).then( ( inserterButton ) => {
		if ( ! Cypress.$( inserterButton ).hasClass( 'is-pressed' ) ) {
			cy.get( inserterButton ).click();
		}
	} );

	cy.get( '.block-editor-inserter__search' ).find( 'input' ).clear();
	cy.get( '.block-editor-inserter__search' ).click().type(
		blockID.split( '-' )[ 0 ]
	);

	const targetClassName = ( blockCategory === 'core' ? '' : `-${ blockCategory }` ) + `-${ blockID }`;
	cy.get( '.block-editor-inserter__block-list .editor-block-list-item' + targetClassName ).first().click();

	// Make sure the block was added to our page
	cy.get( `[data-type="${ blockName }"]` ).should( 'exist' );
}

/**
 * From inside the WordPress editor open the CoBlocks Gutenberg editor panel
 */
export function savePage() {
	cy.get( '.edit-post-header__settings button.is-primary' ).click();

	cy.get( '.components-snackbar-list__notice-container', { timeout: 10000 } ).should( 'be.visible' );

	// Reload the page to ensure that we're not hitting any block errors
	cy.reload();
}

/**
 * Check the page for block errors
 *
 * @param {string} blockName blockName the block to check for
 * e.g 'core/image' or 'coblocks/accordion'.
 */

export function checkForBlockErrors( blockName ) {
	cy.get( '#editor' ).then( () => {
		disableGutenbergFeatures();

		cy.get( '.block-editor-warning' ).should( 'not.exist' );

		cy.get( `[data-type="${ blockName }"]` ).should( 'exist' );
	} );
}

/**
 * View the currently edited page on the front of site
 */
export function viewPage() {
	cy.get( 'button[aria-label="Settings"]' ).then( ( settingsButton ) => {
		if ( ! Cypress.$( settingsButton ).hasClass( 'is-pressed' ) && ! Cypress.$( settingsButton ).hasClass( 'is-toggled' ) ) {
			cy.get( settingsButton ).click();
		}
	} );

	cy.wait( 100 );

	openSettingsPanel( /permalink/i );

	cy.get( '.edit-post-post-link__link' ).then( ( pageLink ) => {
		const linkAddress = Cypress.$( pageLink ).attr( 'href' );
		cy.visit( linkAddress );
	} );
}

/**
 * Edit the currently viewed page
 */
export function editPage() {
	cy.get( '#wp-admin-bar-edit' )
		.click();
}

/**
 * Clear all blocks from the editor
 */
export function clearBlocks() {
	cy.window().should( 'have.property', 'wp' );
	cy.window().then( ( win ) => {
		win.wp.data.dispatch( 'core/block-editor' ).removeBlocks(
			win.wp.data.select( 'core/block-editor' ).getBlocks().map( ( block ) => block.clientId )
		);
	} );
}

/**
 * Attempts to retrieve the block name from the current spec file being run
 * eg: accordion.js => Accordion
 */
export function getBlockName() {
	const specFile = Cypress.spec.name,
		fileBase = capitalize( specFile.split( '/' ).pop().replace( '.cypress.js', '' ).replace( '-', ' ' ) ),
		blockName = fileBase.charAt( 0 ).toUpperCase() + fileBase.slice( 1 );

	return blockName;
}

/**
 * Attempts to retrieve the block slug from the current spec file being run
 * eg: accordion.js => accordion
 */
export function getBlockSlug() {
	const specFile = Cypress.spec.name,
		fileBase = ( specFile.split( '/' ).pop().replace( '.cypress.js', '' ) );

	return fileBase;
}

/**
 * Click on a style button within the style panel
 *
 * @param {string} style   Name of the style to apply
 */
export function setBlockStyle( style ) {
	openSettingsPanel( RegExp( 'styles', 'i' ) );

	cy.get( '.edit-post-sidebar [class*="editor-block-styles"]' )
		.contains( RegExp( style, 'i' ) )
		.click( { force: true } );
}

/**
 * Select the block using the Block navigation component.
 * Input parameter is the name of the block to select.
 *
 * @param {string} name The name of the block to select eg: highlight or click-to-tweet
 */
export function selectBlock( name ) {
	cy.get( '.edit-post-header__toolbar button[aria-label="Block navigation"]' ).click();
	cy.get( '.block-editor-block-navigation__container button' ).contains( startCase( name ) ).click();
}

/**
 * Set a value within the input box
 *
 * @param {string} panelName   Name of the panel to open
 * @param {string} settingName The name of the setting to search for
 * @param {string} value The value to type
 * @param {boolean} ignoreCase  Optional case sensitivity. Default will ignore case.
 */
export function setInputValue( panelName, settingName, value, ignoreCase = true ) {
	openSettingsPanel( ignoreCase ? RegExp( panelName, 'i' ) : panelName );

	cy.get( '.edit-post-sidebar' )
		.contains( ignoreCase ? RegExp( settingName, 'i' ) : settingName ).not( '.block-editor-block-card__description' )
		.then( ( $settingSection ) => {
			cy.get( Cypress.$( $settingSection ).parent() )
				.find( 'input[type="number"]' )
				.click()
				.type( `{selectall}${ value }` );
		} );
}

/**
 * Upload helper object. Contains image fixture spec and uploader function.
 * `helpers.upload.spec` Object containing image spec.
 * `helpers.upload.imageToBlock` Function performs upload action on specified block.
 */
export const upload = {
	spec: {
		fileName: '150x150.png',
		imageBase: '150x150',
		pathToFixtures: '../.dev/tests/cypress/fixtures/images/',
	},
	/**
	 * Upload image to input element.
	 *
	 * @param {string} blockName The name of the block that is upload target
	 * e.g 'core/image' or 'coblocks/accordion'.
	 */
	imageToBlock: ( blockName ) => {
		const { fileName, pathToFixtures } = upload.spec;
		cy.fixture( pathToFixtures + fileName ).then( ( fileContent ) => {
			cy.get( `[data-type="${ blockName }"]` )
				.find( 'input[type="file"]' )
				.first()
				.invoke( 'removeAttr', 'style' ) //makes element easier to interact with/accessible. Headless test fails without this.
				.upload(
					{ fileContent, fileName, mimeType: 'image/png' },
					{ force: true }
				);
		} );
	},
};

/**
 * Set a Color Setting value to a custom hex color
 *
 * @param {string} settingName The setting to update. background|text
 * @param {string} hexColor
 */
export function setColorSetting( settingName, hexColor ) {
	openSettingsPanel( /color settings/i );
	cy.get( '.components-base-control__field' )
		.contains( RegExp( settingName, 'i' ) )
		.then( ( $subColorPanel ) => {
			cy.get( Cypress.$( $subColorPanel ).closest( '.components-base-control' ) )
				.contains( /custom color/i )
				.click();
			cy.get( '.components-color-picker__inputs-field input[type="text"]' )
				.clear()
				.type( hexColor );
			cy.get( Cypress.$( $subColorPanel ).closest( '.components-base-control' ) )
				.contains( /custom color/i )
				.click();
		} );
}

/**
 * Open a certain settings panel in the right hand sidebar of the editor
 *
 * @param {string} panelText The panel label text to open. eg: Color Settings
 */
export function openSettingsPanel( panelText ) {
	cy.get( '.components-panel__body-title' )
		.contains( panelText )
		.then( ( $panelTop ) => {
			const $parentPanel = Cypress.$( $panelTop ).closest( 'div.components-panel__body' );
			if ( ! $parentPanel.hasClass( 'is-opened' ) ) {
				$panelTop.click();
			}
		} );
}

/**
 * Open a block heading controls located in block toolbar
 *
 * @param {number} headingLevel The button that should be located and clicked
 */
export function openHeadingToolbarAndSelect( headingLevel ) {
	cy.get( '.block-editor-block-toolbar' ).find( '.block-editor-block-toolbar__slot' ).first().find( 'button' ).each( ( button, index ) => {
		if ( index === 1 ) { // represents the second position in the toolbar
			cy.get( button ).click( { force: true } );
		}
	} );
	cy.get( '.components-popover__content' ).find( 'div[role="menu"]' ).find( 'button' ).contains( headingLevel ).click();
}

/**
 * Toggle an checkbox in the settings panel of the block editor
 *
 * @param {string} checkboxLabelText The checkbox label text. eg: Drop Cap
 */
export function toggleSettingCheckbox( checkboxLabelText ) {
	cy.get( '.components-toggle-control__label' )
		.contains( checkboxLabelText )
		.parent( '.components-base-control__field' )
		.find( '.components-form-toggle__input' )
		.click();
}

/**
 * Add custom classes to a block
 *
 * @param {string} classes Custom classe(s) to add to the block
 * @param {string} blockID The name of the block e.g. (accordion, alert, map)
 */
export function addCustomBlockClass( classes, blockID = '' ) {
	if ( ! blockID.length ) {
		blockID = getBlockSlug();
	}

	// Force click the target element so that we don't select any innerBlocks by mistake.
	cy.get( '.wp-block[data-type="vk-blocks/' + blockID + '"]' ).last().click( { force: true } );

	cy.get( '.block-editor-block-inspector__advanced' ).scrollIntoView().find( 'button' ).click();

	cy.get( 'div.edit-post-sidebar' )
		.contains( /Additional CSS/i )
		.next( 'input' )
		.then( ( $inputElem ) => {
			cy.get( $inputElem ).invoke( 'val' ).then( ( val ) => {
				if ( val.length > 0 ) {
					cy.get( $inputElem ).type( `{selectall}${ [ val, classes ].join( ' ' ) }` );
				} else {
					cy.get( $inputElem ).type( classes );
				}
			} );
		} );
}

/**
 * Press the Undo button in the header toolbar.
 */
export function doEditorUndo() {
	cy.get( '.editor-history__undo' ).click( { force: true } );
}

/**
 * Press the Redo button in the header toolbar.
 */
export function doEditorRedo() {
	cy.get( '.editor-history__redo' ).click();
}

/**
 * Open the Editor Settings panel.
 */
export function openEditorSettingsModal() {
	// Open "more" menu.
	cy.get( '.edit-post-more-menu button' ).click();
	cy.get( '.components-menu-item__button' ).contains( 'Editor settings' ).click();

	cy.get( '.components-modal__frame' ).contains( 'Editor settings' ).should( 'exist' );
}

/**
 * Turn off a setting from the Editor Settings panel.
 *
 * @param {string} settingName The label of the setting control.
 */
export function turnOffEditorSetting( settingName ) {
	cy.get( '.components-base-control' ).contains( settingName ).parent().find( 'input[type=checkbox]' )
		.then( ( element ) => {
			if ( element[ 0 ].checked ) {
				element.click();
			}
		} );

	cy.get( '.components-base-control' ).contains( settingName ).parent().find( 'input[type=checkbox]' ).should( 'not.be.checked' );
}

/**
 * Turn on a setting from the Editor Settings panel.
 *
 * @param {string} settingName The label of the setting control.
 */
export function turnOnEditorSetting( settingName ) {
	cy.get( '.components-base-control' ).contains( settingName ).parent().find( 'input[type=checkbox]' )
		.then( ( element ) => {
			if ( ! element[ 0 ].checked ) {
				element.click();
			}
		} );

	cy.get( '.components-base-control' ).contains( settingName ).parent().find( 'input[type=checkbox]' ).should( 'be.checked' );
}

/**
 * Helper method to convert a hex value to an RGB value
 *
 * @param {string} hex Hex string. eg: #55e7ff
 * @return {string} RGB string.
 */
export function hexToRGB( hex ) {
	let r = 0,
		g = 0,
		b = 0;

	// 3 digits
	if ( hex.length === 4 ) {
		r = '0x' + hex[ 1 ] + hex[ 1 ];
		g = '0x' + hex[ 2 ] + hex[ 2 ];
		b = '0x' + hex[ 3 ] + hex[ 3 ];
	// 6 digits
	} else if ( hex.length === 7 ) {
		r = '0x' + hex[ 1 ] + hex[ 2 ];
		g = '0x' + hex[ 3 ] + hex[ 4 ];
		b = '0x' + hex[ 5 ] + hex[ 6 ];
	}

	return 'rgb(' + +r + ', ' + +g + ', ' + +b + ')';
}

/**
 * Capitalize the first letter of each word in a string.
 * eg: hello world => Hello World
 *
 * @param {string} string The text to capitalize.
 *
 * @return {string} Altered string with capitalized letters.
 */
export function capitalize( string ) {
	return string.replace( /(?:^|\s)\S/g, function( a ) {
		return a.toUpperCase();
	} );
}
