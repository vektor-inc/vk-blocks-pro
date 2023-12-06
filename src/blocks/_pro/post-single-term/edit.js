import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
//import { useEntityProp } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';

import { PanelBody, ToggleControl } from '@wordpress/components';
export default function SingleTermEdit(props) {
	const { attributes, setAttributes, context } = props;
	const { hasLink } = attributes;

	const { postId } = context;
	const termColorInfo = useSelect((select) => {
		return select('vk-blocks/term-color').getTermColorInfoByPost(postId);
	}, []);

	const blockProps = useBlockProps({
		className: 'vk_singleTerm',
		style: { backgroundColor: termColorInfo?.color ?? '#999999' },
	});

	const label = termColorInfo && (
		<>
			{hasLink ? (
				<a
					href={termColorInfo.term_url}
					className="vk_singleTerm-inner"
				>
					{termColorInfo.term_name}
				</a>
			) : (
				<span className="vk_singleTerm-inner">
					{termColorInfo.term_name}
				</span>
			)}
		</>
	);

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Setting', 'vk-blocks-pro')}>
					<ToggleControl
						label={__('Add Link to Taxonomy Page', 'vk-blocks-pro')}
						checked={hasLink}
						onChange={(checked) =>
							setAttributes({ hasLink: checked })
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>{label}</div>
		</>
	);
}
