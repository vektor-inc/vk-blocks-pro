export const getContainerClass = (layout) => {
	let layoutClass;
	if (layout === 'right') {
		layoutClass = 'Right';
	} else {
		layoutClass = 'Left';
	}
	return `vk_prContent vk_prContent-layout-image${layoutClass}`;
};

export const getButtonClass = (buttonColorCustom) => {
	let btnClass = 'vk_button';
	if (buttonColorCustom) {
		btnClass = `${btnClass} vk_button-color-custom`;
	}
	return btnClass;
};

export const getLinkClass = (buttonColorCustom, buttonType) => {
	let linkClass = 'btn btn-block vk_button_link vk_prContent_colTxt_btn';

	if (buttonColorCustom) {
		linkClass = `${linkClass} btn-primary`;
		// カスタムカラーじゃない場合
	} else if (!buttonColorCustom) {
		// 塗り
		if (buttonType === '0') {
			linkClass = `${linkClass} btn-${buttonColor}`;
			// 塗りなし
		} else if (buttonType === '1') {
			linkClass = `${linkClass} btn-outline-${buttonColor}`;
		}
	}

	return linkClass;
};

export const getLinkStyle = (buttonColorCustom, buttonType) => {
	let linkStyle = null;

	// 塗り
	if (buttonType === '0') {
		linkStyle = {
			backgroundColor: buttonColorCustom,
			border: `1px solid ${buttonColorCustom}`,
		};
		// 塗りなし
	} else if (buttonType === '1') {
		linkStyle = {
			backgroundColor: 'transparent',
			border: '1px solid ' + buttonColorCustom,
			color: buttonColorCustom,
		};
	}

	return linkStyle;
};

export const getFontawesomeIcon = (
	fontAwesomeIconBefore,
	fontAwesomeIconAfter
) => {
	let iconBefore = '';
	let faIconFragmentBefore;
	let iconAfter = '';
	let faIconFragmentAfter;

	//過去バージョンをリカバリーした時にiconを正常に表示する
	if (fontAwesomeIconBefore && !fontAwesomeIconBefore.match(/<i/)) {
		fontAwesomeIconBefore = `<i class="${fontAwesomeIconBefore}"></i>`;
	}
	if (fontAwesomeIconAfter && !fontAwesomeIconAfter.match(/<i/)) {
		fontAwesomeIconAfter = `<i class="${fontAwesomeIconAfter}"></i>`;
	}

	if (fontAwesomeIconBefore) {
		//add class and inline css
		faIconFragmentBefore = fontAwesomeIconBefore.split(' ');
		faIconFragmentBefore[1] =
			' ' + faIconFragmentBefore[1] + ` vk_button_link_before `;
		iconBefore = faIconFragmentBefore.join('');
	}
	if (fontAwesomeIconAfter) {
		//add class and inline css
		faIconFragmentAfter = fontAwesomeIconAfter.split(' ');
		faIconFragmentAfter[1] =
			' ' + faIconFragmentAfter[1] + ` vk_button_link_after `;
		iconAfter = faIconFragmentAfter.join('');
	}

	return {
		iconBefore: iconBefore,
		iconAfter: iconAfter,
	};
};
