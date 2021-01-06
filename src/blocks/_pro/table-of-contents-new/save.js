import { useBlockProps } from '@wordpress/block-editor';
import ReactHtmlParser from 'react-html-parser';
import { __ } from '@wordpress/i18n';

export default function save(props) {
	const { attributes } = props;
	const { style, open, renderHtml } = attributes;
	const blockProps = useBlockProps.save({
		className: `vk_tableOfContents vk_tableOfContents-style-${style} tabs`,
	});

	return (
		<div {...blockProps}>
			<div className="tab">
				<div className={'vk_tableOfContents_title'}>
					{__('Table of Contents', 'vk-blocks')}
				</div>

				<label
					className={`tab-label vk_tableOfContents_openCloseBtn button_status button_status-${open}`}
					htmlFor="chck1"
				>
					<input type="checkbox" id="chck1" />
				</label>
				<ul className={`vk_tableOfContents_list tab_content-${open}`}>
					{ReactHtmlParser(renderHtml)}
				</ul>
			</div>
		</div>
	);
}
