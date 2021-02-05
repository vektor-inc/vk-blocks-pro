// import WordPress Scripts
import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import ServerSideRender from '@wordpress/server-side-render';

import { TextControl, PanelBody } from '@wordpress/components';

export default function SelectPostListItemEdit(props) {
	const { attributes, setAttributes } = props;
	const { url } = attributes;
	const blockProps = useBlockProps();

	let editContent = '';
	if (url !== '') {
		editContent = (
			<ServerSideRender
				block="vk-blocks/select-post-list-item"
				attributes={attributes}
			/>
		);
	} else {
		editContent = (
			<div className="alert alert-warning text-center">
				{__(
					'Because no post is selected, The block Will not render',
					'vk-blocks'
				)}
			</div>
		);
	}

	const homeUrl = vk_blocks_home_url; //eslint-disable-line no-undef,camelcase

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('Select Post List Item Setting', 'vk-blocks')}
					initialOpen={false}
				>
					<TextControl
						label={__('Internal Post URL', 'vk-blocks')}
						value={url}
						type="string"
						onChange={(v) => {
							if (v.indexOf(homeUrl) !== -1) {
								setAttributes({ url: v });
							} else {
								setAttributes({ url: '' });
							}
						}}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>{editContent}</div>
		</>
	);
}
