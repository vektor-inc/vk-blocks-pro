import { ReactComponent as Icon } from './icon.svg';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { PanelBody, BaseControl, SelectControl } = wp.components;
const { InspectorControls } = wp.blockEditor;
const ServerSideRender = wp.serverSideRender;
const React = wp.element

registerBlockType( 'vk-blocks/page-content', {
	title: __('Page Content','vk-blocks' ),
	icon: <Icon />,
	category: "vk-blocks-cat",
	attributes: {
		TargetPost: {
			type: "number",
			default: -1,
		},
	},


	edit: ( props ) => {
		const { attributes, setAttributes } = props;

		const {
			TargetPost,
		} = attributes;

		let editContent;
		if ( TargetPost === -1 ) {
			editContent = <div className="alert alert-warning text-center">{ __( 'Because no post is selected, The block Will not render', 'vk-blocks' ) }</div>;
		} else {
			editContent = <ServerSideRender
				block="vk-blocks/page-content"
				attributes={ props.attributes }
			/>
		}
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
						title={ __( 'Page Setting', 'vk-blocks' ) }
						initialOpen={ true }
					>
						<BaseControl
							id={ 'vb-call-01' }
						>
							<SelectControl
								label={ __( 'Select Page', 'vk-blocks' ) }
								value={ TargetPost }
								options={ vk_blocks_page_list }
								onChange={ value => setAttributes({ TargetPost: parseInt(value, 10) }) }
							/>
						</BaseControl>
					</PanelBody>
				</InspectorControls>
				{ editContent }
			</Fragment>
		)
	},
	save: () => null
});
