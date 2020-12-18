import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { PanelBody, BaseControl, SelectControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { ServerSideRender } from '@wordpress/server-side-render';

export default function edit( props )  {
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
}
