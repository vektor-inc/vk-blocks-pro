import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	InspectorControls,
	BlockAlignmentToolbar,
	BlockControls,
	ColorPalette,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	RangeControl,
	ToggleControl,
	BaseControl,
	__experimentalBoxControl as BoxControl, // eslint-disable-line @wordpress/no-unsafe-wp-apis
} from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';

export default function NewTextSave(props) {
	//	const blockProps = useBlockProps();
	const { attributes, setAttributes } = props;
	const { content } = props.attributes;
	const blockProps = useBlockProps.save();

	return <RichText.Content {...blockProps} tagName="span" value={content} />;
}
