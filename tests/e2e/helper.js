import {
	clickBlockToolbarButton,
	getAllBlocks,
	selectBlockByClientId,
	getPageError,
	searchForBlock,
} from '@wordpress/e2e-test-utils';

export const selectBlockByName = async ( name ) => {
	await selectBlockByClientId(
		( await getAllBlocks() ).find( ( block ) => block.name === name ).clientId
	);
};

export const selectOptionIsAvailable = async ( selectLabel, optionValue ) => {
	const [ optionEl ] = await page.$x( `//label[@class="components-base-control__label"][contains(text(),"${ selectLabel }")]/following-sibling::select[@class="components-select-control__input"]/option[@value="${ optionValue }"]` );
	return !! optionEl;
};

export const clickElementByText = async ( elementExpression, text ) => {
	const [ element ] = await page.$x( `//${ elementExpression }[contains(text(),"${ text }")]` );
	await element.click();
};

export const selectOption = async ( label, value ) => {
	const [ selectEl ] = await page.$x( `//label[@class="components-base-control__label"][contains(text(),"${ label }")]/following-sibling::select[@class="components-select-control__input"]` );
	const selectId = await page.evaluate(
		( el ) => el.id,
		selectEl
	);
	await page.select( `#${ selectId }`, value );
};

export const openSidebarPanelWithTitle = async ( title ) => {
	// Check if sidebar panel exists
	await page.waitForXPath( `//div[contains(@class,"edit-post-sidebar")]//button[@class="components-button components-panel__body-toggle"][contains(text(),"${ title }")]` );

	// Only open panel if it's not expanded already (aria-expanded check)
	const [ panel ] = await page.$x(
		`//div[contains(@class,"edit-post-sidebar")]//button[@class="components-button components-panel__body-toggle"][@aria-expanded="false"][contains(text(),"${ title }")]`
	);
	if ( panel ) {
		await panel.click();
	}
};

export const getInputValueByLabel = async ( label ) => {
	return await page.$eval(
		`input[aria-label="${ label }"]`,
		( input ) => input.value,
	);
};

export const getRichTextValueByLabel = async ( label ) => {
	return await page.$eval(
		`[aria-label="${ label }"].block-editor-rich-text__editable`,
		( richText ) => richText.textContent,
	);
};

export const getCheckboxValueByLabel = async ( label ) => {
	const [ inputEl ] = await page.$x( `//label[@class="components-checkbox-control__label"][contains(text(),"${ label }")]/preceding-sibling::span[@class="components-checkbox-control__input-container"]/input` );
	return await page.evaluate(
		( el ) => el.checked,
		inputEl
	);
};

export const getSelectedValueBySelectLabel = async ( label ) => {
	const [ selectEl ] = await page.$x( `//label[@class="components-base-control__label"][contains(text(),"${ label }")]/following-sibling::select[@class="components-select-control__input"]` );
	return await page.evaluate(
		( el ) => el.value,
		selectEl
	);
};

export const toolbarOptionIsActive = async ( toolbarLabel, buttonText ) => {
	await clickBlockToolbarButton( toolbarLabel ); // Open toolbar
	const isActive = ( await page.$x( `//button[contains(text(),"${ buttonText }") and contains(@class,"is-active")]` ) ).length === 1;
	await page.keyboard.press( 'Escape' ); // Close toolbar
	return isActive;
};

/**
 * Check the page for block errors
 *
 * @param {string} blockName blockName the block to check for
 * e.g 'core/image' or 'coblocks/accordion'.
 */
export const checkForBlockErrors = async ( blockName ) => {
	expect( await page.$( `.block-editor-warning` ) ).toBeNull();
	expect( await page.$( `[data-type="${blockName}"]` ) ).not.toBeNull();
	expect( await getPageError() ).toBeNull();
};

/**
 * Retrieves the document container by css class and checks to make sure the document's active element is within it
 */
async function waitForInserterCloseAndContentFocus() {
	await page.waitForFunction( () =>
		document.body
			.querySelector( '.block-editor-block-list__layout' )
			.contains( document.activeElement )
	);
}

/**
 * 複数の同名ブロックがあった場合、グローバルインサーターに表示された順に、指定したいブロックをindexで指定できる。
 *
 * @param {string} searchTerm The text to search the inserter for.
 */
export async function insertBlockByIndex( searchTerm, index=0 ) {
	await searchForBlock( searchTerm );
	const insertButton = (
		await page.$x( `//button//span[contains(text(), '${ searchTerm }')]` )
	 )[ index ];
	await insertButton.click();
	// We should wait until the inserter closes and the focus moves to the content.
	await waitForInserterCloseAndContentFocus();
}
