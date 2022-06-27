import { __ } from '@wordpress/i18n';
import { VKBArchiveList } from './component';
import { PanelBody, TextControl, SelectControl } from '@wordpress/components';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';

export default function IconEdit(props) {
	const { attributes, setAttributes } = props;
	const { title, postType, archiveType, displayDesign } = attributes;

	const blockProps = useBlockProps({
		className: `vk_archive_list`,
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Archive List Setting', 'vk-blocks')}>
					<TextControl
						label={__('Title', 'vk-blocks')}
						value={title}
						onChange={(value) => setAttributes({ title: value })}
					/>
					<SelectControl
						label={__('Post Type', 'vk-blocks')}
						value={postType}
						onChange={(value) => setAttributes({ postType: value })}
						options={[
							{
								value: 'post',
								label: __('Post', 'vk-blocks'),
							},
						]}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<VKBArchiveList
					lbTitle={title}
					lbPostType={postType}
					lbArchiveType={archiveType}
					lbDisplayDesigne={displayDesign}
				/>
			</div>
		</>
	);
}
