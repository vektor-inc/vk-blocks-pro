import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
//import { useEntityProp } from '@wordpress/core-data';
import ServerSideRender from '@wordpress/server-side-render';

import {
	PanelBody,
	__experimentalBoxControl as BoxControl, // eslint-disable-line @wordpress/no-unsafe-wp-apis
} from '@wordpress/components';
export default function SingleTermEdit(props) {
	const { attributes, setAttributes } = props;
	const { paddingValues } = attributes;
	const blockProps = useBlockProps();

	const units = [
		{
			value: 'px',
			label: 'px',
			default: 0,
		},
		{
			value: '%',
			label: '%',
			default: 0,
		},
		{
			value: 'vw',
			label: 'vw',
			default: 0,
		},
		{
			value: 'vh',
			label: 'vh',
			default: 0,
		},
	];
	const resetPaddingValues = {
		top: '0px',
		left: '0px',
		right: '0px',
		bottom: '0px',
	};

	return (
		<>
			<InspectorControls key="setting">
				<PanelBody title={__('Padding Setting', 'bf-click-counter')}>
					<BoxControl
						label={__('Padding', 'bf-click-counter')}
						values={paddingValues}
						onChange={(value) =>
							setAttributes({ paddingValues: value })
						} // 保存処理
						units={units}
						allowReset={true}
						resetValues={resetPaddingValues}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<ServerSideRender
					block="vk-blocks/post-single-term"
					attributes={attributes}
				/>
			</div>
		</>
	);
}
