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

	// blockIdを使ってユニークIDを生成
	// 編集画面でuseEffectにより必ずblockIdが設定されるため、フォールバックは不要
	const uniqueId = blockId || 'fallback-id';
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
