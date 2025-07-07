import { useBlockProps } from '@wordpress/block-editor';
import parse from 'html-react-parser';
import { __ } from '@wordpress/i18n';

export default function save(props) {
	const { attributes } = props;
	const {
		style,
		open,
		renderHtml,
		useCustomLevels,
		customHeadingLevels,
		excludedHeadings,
		blockId,
	} = attributes;

	// blockIdが空の場合、renderHtmlから決定的な値を生成
	// 既存ブロックとの互換性を保つため
	let uniqueId = blockId;
	if (!uniqueId) {
		// ビット演算子を使わないハッシュ関数（ESLintのno-bitwiseルール対応）
		const hashCode = (str) => {
			let hash = 0;
			if (str.length === 0) return hash;
			for (let i = 0; i < str.length; i++) {
				const char = str.charCodeAt(i);
				hash = ((hash * 31) + char) % 2147483647;
			}
			return Math.abs(hash).toString(36);
		};
		
		// renderHtmlとその他の属性から決定的なIDを生成
		const hashInput = `${renderHtml || ''}-${style}-${open}-${JSON.stringify(customHeadingLevels)}-${JSON.stringify(excludedHeadings)}`;
		uniqueId = `legacy-${hashCode(hashInput)}`;
	}
	
	const checkboxId = `chck-toc-${uniqueId}`;
	const labelId = `vk-tab-label-toc-${uniqueId}`;

	const blockProps = useBlockProps.save({
		className: `vk_tableOfContents vk_tableOfContents-style-${style} tabs`,
		'data-use-custom-levels': useCustomLevels ? 'true' : 'false',
		'data-custom-levels': useCustomLevels
			? JSON.stringify(customHeadingLevels)
			: '',
		'data-toc-heading-levels': useCustomLevels
			? JSON.stringify(customHeadingLevels)
			: undefined,
		...(excludedHeadings?.length > 0 && {
			'data-excluded-headings': JSON.stringify(excludedHeadings),
		}),
	});
	/* eslint jsx-a11y/label-has-associated-control: 0 */
	return (
		<div {...blockProps}>
			<div className="tab">
				<div className={'vk_tableOfContents_title'}>
					{__('Table of Contents', 'vk-blocks-pro')}
				</div>
				<input type="checkbox" id={checkboxId} />
				<label
					className={`tab-label vk_tableOfContents_openCloseBtn button_status button_status-${open}`}
					htmlFor={checkboxId}
					id={labelId}
				>
					{'open' === open && <>CLOSE</>}
					{'open' !== open && <>OPEN</>}
				</label>
				<ul className={`vk_tableOfContents_list tab_content-${open}`}>
					{parse(renderHtml)}
				</ul>
			</div>
		</div>
	);
}
