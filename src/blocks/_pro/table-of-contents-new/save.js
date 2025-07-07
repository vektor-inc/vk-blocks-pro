import { useBlockProps } from '@wordpress/block-editor';
import parse from 'html-react-parser';
import { __ } from '@wordpress/i18n';

export default function save(props) {
	const { attributes, clientId } = props;
	const {
		style,
		open,
		renderHtml,
		useCustomLevels,
		customHeadingLevels,
		excludedHeadings,
	} = attributes;

	// より確実にユニークなIDを生成
	// clientIdの短縮版（ハイフンを除去して最後8文字）を使用
	const shortClientId = clientId
		? clientId.replace(/-/g, '').slice(-8)
		: Math.random().toString(36).substr(2, 8);
	const uniqueId = `toc-${shortClientId}`;
	const checkboxId = `chck-${uniqueId}`;
	const labelId = `vk-tab-label-${uniqueId}`;

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
