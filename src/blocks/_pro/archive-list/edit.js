import { __ } from '@wordpress/i18n';
import { VKBArchiveList } from './component';
import {
	PanelBody,
	BaseControl,
	TextControl,
	CheckboxControl,
	RangeControl,
	ButtonGroup,
	Button,
	SelectControl,
} from '@wordpress/components';
import {
	useBlockProps,
	InspectorControls,
} from '@wordpress/block-editor';


export default function IconEdit(props) {
	const { attributes, setAttributes } = props;
	let {
		title,
	} = attributes;

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
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<VKBArchiveList
					lbTitle={title}
				/>
			</div>
		</>
	);
}
