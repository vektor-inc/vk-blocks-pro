import { generateHeightCss } from '../0.49.7/utils';

/**
 * スライダーブロックの外側の要素のClassを取得。
 *
 * @param {*} el
 */
const getContainerClass = (el) => {
	if (!el.hasOwnProperty('props')) {
		return;
	}

	let containerClass = '';
	if (el.props.hasOwnProperty('className')) {
		containerClass = el.props.className;

		//WP5.6でBlockEditorのデータ構造が変更。
	} else if (el.props.hasOwnProperty('blockProps')) {
		containerClass = el.props.blockProps.className;
	}

	return containerClass;
};

export default function SliderHook( {el,attributes}) {
	const {
		clientId,
	} = attributes;
	const cssSelector = `.vk_slider_${clientId},`;
	const cssTag = generateHeightCss(attributes, cssSelector);
	const containerClass = getContainerClass(el);
	return (
		<div className={containerClass}>
			{el}
			<style type="text/css">{cssTag}</style>
		</div>
	);
}
