import ReactHtmlParser from 'react-html-parser';
import { vkbBlockEditor } from "./../_helper/depModules";
const { __ } = wp.i18n;
const { RichText } = vkbBlockEditor;

export const VKBButton =( props )=>{
	const { attributes, setAttributes, __for } = props
	const {buttonColorCustom,buttonColor,buttonType,buttonAlign,buttonSize,buttonUrl,buttonTarget,fontAwesomeIconBefore,fontAwesomeIconAfter,subCaption,content } = attributes
	let aClass = '';
	let aStyle = {};
	let iconBefore = '';
	let iconAfter = '';

	aStyle = null;
	aClass = `vk_button_link`;

	if (buttonType == '0' || buttonType == null || buttonType == '1') {
		aClass = `${aClass} btn`;
	} else {
		aClass = `${aClass} vk_button_link-type-text`;
	}

	// 塗り
	if (buttonType == '0' || buttonType === null) {

		// 規定カラーの場合
		if (buttonColorCustom == 'undefined' || buttonColorCustom == undefined || buttonColorCustom === null) {

			aClass = `${aClass} btn-${buttonColor}`;
			aStyle = null;

			// カスタムカラーの場合
		} else {
			aStyle = {
				backgroundColor: `${buttonColorCustom}`,
				border: `1px solid ${buttonColorCustom}`,
				color: `#fff`,
			};
		}
		// 塗りなし
	} else if (buttonType === '1') {
		// 規定カラーの場合
		if (buttonColorCustom == 'undefined' || buttonColorCustom == undefined || buttonColorCustom === null) {
			aClass = `${aClass} btn-outline-${buttonColor}`;
			aStyle = null;
			// カスタムカラーの場合
		} else {
			aStyle = {
				backgroundColor: 'transparent',
				border: `1px solid ${buttonColorCustom}`,
				color: `${buttonColorCustom}`,
			};
		}
		// テキストのみ
	} else if (buttonType === '2') {
		// 規定カラーの場合
		if (buttonColorCustom == 'undefined' || buttonColorCustom == undefined || buttonColorCustom === null) {
			aClass = `${aClass} btn-outline-${buttonColor}`;
			aStyle = null;
			// カスタムカラーの場合
		} else {
			aStyle = {
				color: `${buttonColorCustom}`,
			};
		}
	}

	aClass = `${aClass} btn-${buttonSize}`;

	if (buttonAlign === 'block') {
		aClass = `${aClass} btn-block`;
	}

	//過去バージョンをリカバリーした時にiconを正常に表示する
	if( fontAwesomeIconBefore && !fontAwesomeIconBefore.match(/<i/)){
		fontAwesomeIconBefore = `<i class="${fontAwesomeIconBefore}"></i>`
	}
	if( fontAwesomeIconAfter && !fontAwesomeIconAfter.match(/<i/)){
		fontAwesomeIconAfter = `<i class="${fontAwesomeIconAfter}"></i>`
	}

	if (fontAwesomeIconBefore) {

		fontAwesomeIconBefore = fontAwesomeIconBefore.replace( / fas/g , "fas" )

		//add class and inline css
		const faIconFragmentBefore= fontAwesomeIconBefore.split(' ');
		faIconFragmentBefore[1] = ' ' + faIconFragmentBefore[1] + ` vk_button_link_before `
		iconBefore = faIconFragmentBefore.join('')
	}
	if (fontAwesomeIconAfter) {

		fontAwesomeIconAfter = fontAwesomeIconAfter.replace( / fas/g , "fas" )

		//add class and inline css
		const faIconFragmentAfter = fontAwesomeIconAfter.split(' ');
		faIconFragmentAfter[1] = ' ' + faIconFragmentAfter[1] + ` vk_button_link_after `
		iconAfter = faIconFragmentAfter.join('')
	}


	if("edit" === __for){
		return (
			<a
				style={ aStyle }
				className={ aClass }
				role={ 'button' }
				aria-pressed={ true }
				target={ buttonTarget ? '_blank' : null }
				rel={ 'noopener noreferrer' }
			>
				{ ReactHtmlParser(iconBefore) }
				<RichText
					tagName="span"
					className={ 'vk_button_link_txt' }
					onChange={ (value) => setAttributes({ content: value }) }
					value={ content }
					placeholder={ __('Input text', 'vk-blocks') }
					allowedFormats={ ['bold', 'italic', 'strikethrough'] }
					isSelected={ true }
				/>
				{ ReactHtmlParser(iconAfter) }
				{ /*サブキャプションが入力された時のみ表示*/ }
				{ subCaption && <p className={ 'vk_button_link_subCaption' }>{ subCaption }</p> }
			</a>
		);
	}else{
		return (
			<a
				href={ buttonUrl }
				style={ aStyle }
				className={ aClass }
				role={ 'button' }
				aria-pressed={ true }
				target={ buttonTarget ? '_blank' : null }
				rel={ 'noopener noreferrer' }
			>
				{ ReactHtmlParser(iconBefore) }
				<RichText.Content
					tagName="span"
					className={ 'vk_button_link_txt' }
					value={ content }
				/>
				{ ReactHtmlParser(iconAfter) }
				{ /*サブキャプションが入力された時のみ表示*/ }
				{ subCaption && <p className={ 'vk_button_link_subCaption' }>{ subCaption }</p> }
			</a>
		);
	}
}
