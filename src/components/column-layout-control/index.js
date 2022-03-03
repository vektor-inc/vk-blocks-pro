import { __ } from '@wordpress/i18n';
import { PanelBody, BaseControl, SelectControl } from '@wordpress/components';
import { Component } from '@wordpress/element';
import { createHigherOrderComponent, compose } from '@wordpress/compose';
import { ColumnLayout } from '@vkblocks/components/column-layout';

export const setOptions = ( name ) => {
	const options = {
		'vk-blocks/card': [
			{
				value: 'card',
				label: __( 'Card', 'vk-blocks' ),
			},
			{
				value: 'card-noborder',
				label: __( 'Card (No border)', 'vk-blocks' ),
			},
			{
				value: 'card-imageRound',
				label: __( 'Card (Image Round)', 'vk-blocks' ),
			},
		],
		'vk-blocks/else': [
			{
				value: 'card',
				label: __( 'Card', 'vk-blocks' ),
			},
			{
				value: 'card-noborder',
				label: __( 'Card (No border)', 'vk-blocks' ),
			},
			{
				value: 'card-intext',
				label: __( 'Card (Intext)', 'vk-blocks' ),
			},
			{
				value: 'card-horizontal',
				label: __( 'Card (Horizontal)', 'vk-blocks' ),
			},
			{
				value: 'media',
				label: __( 'Media', 'vk-blocks' ),
			},
			{
				value: 'postListText',
				label: __( 'Text 1 Column', 'vk-blocks' ),
			},
		],
	};

	if ( name === 'vk-blocks/card' ) {
		return options[ name ];
	}
	return options[ 'vk-blocks/else' ];
};

const ColumnLayoutControlRaw = createHigherOrderComponent(
	( WrappedComponent ) =>
		class extends Component {
			render() {
				const { setAttributes, attributes } = this.props;
				const { layout, name } = attributes;
				return (
					<PanelBody
						title={ __( 'Display type and columns', 'vk-blocks' ) }
						initialOpen={ false }
					>
						<BaseControl
							label={ __( 'Display type', 'vk-blocks' ) }
							id={ 'vk_column-displayType' }
						>
							<SelectControl
								value={ layout }
								onChange={ ( value ) =>
									setAttributes( { layout: value } )
								}
								options={ setOptions( name ) }
							/>
						</BaseControl>
						<WrappedComponent { ...this.props } />
					</PanelBody>
				);
			}
		},
	'ColumnLayoutControlRaw'
);

export const ColumnLayoutControl = compose( ColumnLayoutControlRaw )(
	ColumnLayout
);
