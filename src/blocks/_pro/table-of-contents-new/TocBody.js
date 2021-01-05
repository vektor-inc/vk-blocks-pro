import classNames from 'classnames';
import ReactHtmlParser from 'react-html-parser';
const { __ } = wp.i18n;

const TocBody = (props) => {
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
					{__('Table of Contents', 'vk-blocks')}
				</div>
				<input type="checkbox" id="chck1" />
				<label
					className={`tab-label vk_tableOfContents_openCloseBtn button_status button_status-${open}`}
					htmlFor="chck1"
				/>
				<ul className={`vk_tableOfContents_list tab_content-${open}`}>
					{ReactHtmlParser(renderHtml)}
				</ul>
			</div>
		</div>
	);
};

export default TocBody;
