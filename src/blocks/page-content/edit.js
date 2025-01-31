import { __ } from '@wordpress/i18n';
import { PanelBody, BaseControl, SelectControl } from '@wordpress/components';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import ServerSideRender from '@wordpress/server-side-render';
import { usePosts } from '@vkblocks/utils/hooks';

const getPageLabel = (page) => {
	let label = page.title.rendered;
	if (page.status === 'private') {
		label += ` (${__('Hidden', 'vk-blocks-pro')})`;
	}
	if (page.password) {
		label += ` (${__('Password Protected', 'vk-blocks-pro')})`;
	}
	return label;
};

const getPagesSelect = (pages, currentTargetPost) => {
	const defaultSelect = [
		{
			label: __('Unspecified', 'vk-blocks-pro'),
			value: -1,
		},
	];

	// 選択リストから非公開・パスワード保護のページを除外する（現在選択中のページは除く）
	const availablePages = pages.filter(
		(page) =>
			(page.status === 'publish' && !page.password) ||
			page.id === currentTargetPost
	);

	// 利用可能なページから選択オプションを作成する
	const pagesSelect = availablePages.map((page) => ({
		label:
			page.status === 'private' || page.password
				? getPageLabel(page)
				: page.title.rendered,
		value: page.id,
	}));

	return defaultSelect.concat(pagesSelect);
};

export default function PageContentEdit({ attributes, setAttributes }) {
	const { TargetPost } = attributes;

	const pages = usePosts(
		{ slug: 'page' },
		{ per_page: -1, status: 'private,publish' }
	);

	const pagesSelect = getPagesSelect(pages, TargetPost);

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
					</BaseControl>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>{editContent}</div>
		</>
	);
}
