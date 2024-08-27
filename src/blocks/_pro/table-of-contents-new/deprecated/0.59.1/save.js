import classNames from 'classnames';
import parse from 'html-react-parser';
import { __ } from '@wordpress/i18n';

export default function save(props) {
	const { className, attributes } = props;
	const { style, open, renderHtml } = attributes;
	return (
		<div
			className={classNames(
				className,
				'vk_tableOfContents',
				`vk_tableOfContents-style-${style}`,
				'tabs'
			)}
		>
			<div className="tab">
				<div className={'vk_tableOfContents_title'}>
					{__('Table of Contents', 'vk-blocks-pro')}
				</div>
				<input type="checkbox" id="chck1" />
				<label
					className={`tab-label vk_tableOfContents_openCloseBtn button_status button_status-${open}`}
					htmlFor="chck1"
				></label>
				<ul className={`vk_tableOfContents_list tab_content-${open}`}>
					{parse(renderHtml)}
				</ul>
			</div>
		</div>
	);
}
