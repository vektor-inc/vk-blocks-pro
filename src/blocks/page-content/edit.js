import { __ } from '@wordpress/i18n';
import { PanelBody, BaseControl, SelectControl } from '@wordpress/components';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import ServerSideRender from '@wordpress/server-side-render';
import { usePosts } from '@vkblocks/utils/hooks';

const getPagesSelect = (pages) => {
	const defaultSelect = [
		{
			label: __('Unspecified', 'vk-blocks-pro'),
			value: -1,
		},
	];
	const pagesSelect = pages.map((page) => {
		return {
			label: page.title.rendered,
			value: page.id,
		};
	});

	return defaultSelect.concat(pagesSelect);
};

export default function PageContentEdit({ attributes, setAttributes }) {
	const { TargetPost } = attributes;

	const pages = usePosts(
		{ slug: 'page' },
		{ per_page: -1, status: 'private,publish' }
	);

	const pagesSelect = getPagesSelect(pages);

	let editContent;
	if (TargetPost === -1) {
		editContent = (
			<div className="alert alert-warning text-center">
				{__(
					'Because no post is selected, The block Will not render',
					'vk-blocks-pro'
				)}
			</div>
		);
	} else {
		editContent = (
			<ServerSideRender
				block="vk-blocks/page-content"
				attributes={attributes}
			/>
		);
	}

	const blockProps = useBlockProps();

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('Page Setting', 'vk-blocks-pro')}
					initialOpen={true}
				>
					<BaseControl id={'vb-call-01'}>
						<SelectControl
							label={__('Select Page', 'vk-blocks-pro')}
							value={TargetPost}
							options={pagesSelect}
							onChange={(value) =>
								setAttributes({
									TargetPost: parseInt(value, 10),
								})
							}
						/>
						<p className="alert alert-danger">
							{__(
								'This block can display private content. Please note that this content will be public even if you set the original page to private.',
								'vk-blocks-pro'
							)}
						</p>
					</BaseControl>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>{editContent}</div>
		</>
	);
}
