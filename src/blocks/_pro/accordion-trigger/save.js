import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import ReactHtmlParser from 'react-html-parser';

export default function save(props) {
	const { attributes } = props;
	let { fontAwesomeIconBefore, fontAwesomeIconColor } = attributes;

	let iconBefore = '';
	if (fontAwesomeIconBefore) {
		//for recovering block
		fontAwesomeIconColor = fontAwesomeIconColor
			? fontAwesomeIconColor
			: '#000000';

		//add inline css
		const faIconFragmentBefore = fontAwesomeIconBefore.split('<i');
		faIconFragmentBefore[0] =
			faIconFragmentBefore[0] +
			`<i style="color:${fontAwesomeIconColor};" `;
		iconBefore = faIconFragmentBefore.join('');
	}

	const blockProps = useBlockProps.save({
		className: `vk_accordion-trigger`,
	});

	return (
		<div {...blockProps}>
			{ReactHtmlParser(iconBefore)}
			<InnerBlocks.Content />
			<span
				className={`vk_accordion-toggle vk_accordion-toggle-close`}
			></span>
		</div>
	);
}
