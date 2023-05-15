import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	BaseControl,
	SelectControl,
	CheckboxControl,
} from '@wordpress/components';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { withSelect } from '@wordpress/data';
import ServerSideRender from '@wordpress/server-side-render';
import { DisplayItemsControl } from '@vkblocks/components/display-items-control';
import { ColumnLayoutControl } from '@vkblocks/components/column-layout-control';

export default withSelect((select) => {
	return {
		pages: select('core').getEntityRecords('postType', 'page', {
			_embed: true,
			per_page: -1,
		}),
	};
})((props) => {
	const { setAttributes, attributes, pages, name } = props;
	const { selectId, selfIgnore } = attributes;
	attributes.name = name;

	// Choice of This Page.
	const options = [{ label: __('Current page', 'vk-blocks'), value: -1 }];

	// Make choice list of pages
	if (pages !== undefined && pages !== null) {
		const l = pages.length;
		const parents = [];
		let i = 0;
		for (i = 0; i < l; i++) {
			if (pages[i].parent !== 0) {
				parents.push(pages[i].parent);
			}
		}
		for (i = 0; i < l; i++) {
			if (parents.includes(pages[i].id)) {
				options.push({
					label: pages[i].title.rendered,
					value: pages[i].id,
				});
			}
		}
	}

	// Remove choice of the page
	/*
	const currentPostId = select("core/editor").getCurrentPostId();
	if(currentPostId){
		options = options.filter(option => option.value !== currentPostId)
	}
	*/

	const blockProps = useBlockProps();

	let editContent;
	let hasChildPage;

	if (selectId && pages) {
		hasChildPage = pages.some((page) => page.parent === selectId);
	}

	if (hasChildPage) {
		editContent = (
			<ServerSideRender
				block="vk-blocks/child-page"
				attributes={attributes}
			/>
		);
	} else {
		editContent = (
			<div className="alert alert-warning text-center">
				{__('There are no Page.', 'vk-blocks')}
			</div>
		);
	}

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('Display conditions', 'vk-blocks')}
					initialOpen={false}
				>
					<BaseControl
						label={__('Parent', 'vk-blocks')}
						id={`vk_childPage-parent`}
					>
						<SelectControl
							value={selectId}
							onChange={(value) =>
								setAttributes({
									selectId: parseInt(value, 10),
								})
							}
							options={options}
						/>
					</BaseControl>
					<BaseControl id={`vk_childPage-ignoreThisPost`}>
						<CheckboxControl
							label={__('Ignore this post', 'vk-blocks')}
							checked={selfIgnore}
							onChange={(v) => setAttributes({ selfIgnore: v })}
						/>
					</BaseControl>
				</PanelBody>
				<ColumnLayoutControl {...props} />
				<DisplayItemsControl {...props} />
			</InspectorControls>
			<div {...blockProps}>{editContent}</div>
		</>
	);
});
