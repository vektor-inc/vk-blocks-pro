import { __ } from '@wordpress/i18n';
import { PanelBody, SelectControl } from '@wordpress/components';
import {
	InspectorControls,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';

export default function AlertEdit( { attributes, setAttributes } ) {
	const { style, content } = attributes;

	const blockProps = useBlockProps( {
		className: `alert alert-${ style }`,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Style Settings', 'vk-blocks' ) }>
					<SelectControl
						value={ style }
						onChange={ ( value ) =>
							setAttributes( { style: value } )
						}
						options={ [
							{
								label: __( 'Success', 'vk-blocks' ),
								value: 'success',
							},
							{ label: __( 'Info', 'vk-blocks' ), value: 'info' },
							{
								label: __( 'Warning', 'vk-blocks' ),
								value: 'warning',
							},
							{
								label: __( 'Danger', 'vk-blocks' ),
								value: 'danger',
							},
						] }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<RichText
					tagName="p"
					onChange={ ( value ) =>
						setAttributes( { content: value } )
					}
					value={ content }
				/>
			</div>
		</>
	);
}
