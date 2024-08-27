import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	BaseControl,
	SelectControl,
	CheckboxControl,
} from '@wordpress/components';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { withSelect, useSelect } from '@wordpress/data';
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
	const options = [{ label: __('Current page', 'vk-blocks-pro'), value: -1 }];

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

	const currentPostId = useSelect((select) => {
		return select('core/editor').getCurrentPostId();
	}, []);

	let editContent;
	let childPages;
	let hasChildPage = false;
	let showAlert = false;

	if (selectId && pages) {
		// 親に指定したのが現在のページ（selectId === -1）かどうか
		if (selectId === -1) {
			// 現在のページが親に指定されている場合は、現在のページのID（currentPostId）を親に持つページの配列を作成
			childPages = pages.filter((page) => page.parent === currentPostId);
		} else {
			// それ以外のページが親に指定されている場合は、指定されたページのIDを親に持つページの配列を作成
			childPages = pages.filter((page) => page.parent === selectId);
		}
		// childPagesが存在するかどうか
		hasChildPage = childPages.length > 0;

		// selfignoreにチェックが入っている場合
		if (selfIgnore) {
			// childPagesの中で現在のページを除いたページの配列（その他の子ページ）を作成
			const otherChildPages = childPages.filter(
				(page) => page.id !== currentPostId
			);
			// その他の子ページが存在しないかどうか
			showAlert = otherChildPages.length === 0;
		}
	}

	if (hasChildPage && !showAlert) {
		editContent = (
			<ServerSideRender
				block="vk-blocks/child-page"
				attributes={attributes}
			/>
		);
	} else {
		editContent = (
			<div className="alert alert-warning text-center">
				{__('There are no applicable child pages.', 'vk-blocks-pro')}
				<br />
				{__(
					'Check your settings from the settings sidebar.',
					'vk-blocks-pro'
				)}
			</div>
		);
	}

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('Display conditions', 'vk-blocks-pro')}
					initialOpen={false}
				>
					<BaseControl
						label={__('Parent', 'vk-blocks-pro')}
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
							label={__('Ignore this post', 'vk-blocks-pro')}
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
