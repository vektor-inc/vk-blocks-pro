// import WordPress Scripts
import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	BaseControl,
	SelectControl,
	TextControl,
} from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';

// Load VK Blocks Compornents
import { DisplayItemsControl } from '@vkblocks/components/display-items-control';
import { ColumnLayoutControl } from '@vkblocks/components/column-layout-control';

export default function PostListEdit(props) {
	const { attributes, setAttributes } = props;

	const {
		numberPosts,
		postUrl1,
		postUrl2,
		postUrl3,
		postUrl4,
		postUrl5,
		postUrl6,
		postUrl7,
		postUrl8,
		postUrl9,
		postUrl10,
		postUrl11,
		postUrl12,
	} = attributes;

	let urlInput = '';
	const homeUrl = vk_blocks_site_url; // eslint-disable-line camelcase,no-undef
	if (numberPosts >= 1) {
		urlInput = (
			<TextControl
				label={__('Internal Post URL', 'vk-Blocks') + '01'}
				value={postUrl1}
				onChange={(v) => {
					if (v.indexOf(homeUrl) !== -1) {
						setAttributes({ postUrl1: v });
					} else {
						setAttributes({ postUrl1: '' });
					}
				}}
				type="string"
			/>
		);
	}
	if (numberPosts >= 2) {
		urlInput += (
			<TextControl
				label={__('Internal Post URL', 'vk-Blocks') + '02'}
				value={postUrl2}
				onChange={(v) => {
					if (v.indexOf(homeUrl) !== -1) {
						setAttributes({ postUrl2: v });
					} else {
						setAttributes({ postUrl2: '' });
					}
				}}
				type="string"
			/>
		);
	}
	if (numberPosts >= 3) {
		urlInput += (
			<TextControl
				label={__('Internal Post URL', 'vk-Blocks') + '03'}
				value={postUrl3}
				onChange={(v) => {
					if (v.indexOf(homeUrl) !== -1) {
						setAttributes({ postUrl3: v });
					} else {
						setAttributes({ postUrl3: '' });
					}
				}}
				type="string"
			/>
		);
	}
	if (numberPosts >= 4) {
		urlInput += (
			<TextControl
				label={__('Internal Post URL', 'vk-Blocks') + '04'}
				value={postUrl4}
				onChange={(v) => {
					if (v.indexOf(homeUrl) !== -1) {
						setAttributes({ postUrl4: v });
					} else {
						setAttributes({ postUrl4: '' });
					}
				}}
				type="string"
			/>
		);
	}
	if (numberPosts >= 5) {
		urlInput += (
			<TextControl
				label={__('Internal Post URL', 'vk-Blocks') + '05'}
				value={postUrl5}
				onChange={(v) => {
					if (v.indexOf(homeUrl) !== -1) {
						setAttributes({ postUrl5: v });
					} else {
						setAttributes({ postUrl5: '' });
					}
				}}
				type="string"
			/>
		);
	}
	if (numberPosts >= 6) {
		urlInput += (
			<TextControl
				label={__('Internal Post URL', 'vk-Blocks') + '06'}
				value={postUrl6}
				onChange={(v) => {
					if (v.indexOf(homeUrl) !== -1) {
						setAttributes({ postUrl6: v });
					} else {
						setAttributes({ postUrl6: '' });
					}
				}}
				type="string"
			/>
		);
	}
	if (numberPosts >= 7) {
		urlInput += (
			<TextControl
				label={__('Internal Post URL', 'vk-Blocks') + '07'}
				value={postUrl7}
				onChange={(v) => {
					if (v.indexOf(homeUrl) !== -1) {
						setAttributes({ postUrl7: v });
					} else {
						setAttributes({ postUrl7: '' });
					}
				}}
				type="string"
			/>
		);
	}
	if (numberPosts >= 8) {
		urlInput += (
			<TextControl
				label={__('Internal Post URL', 'vk-Blocks') + '08'}
				value={postUrl8}
				onChange={(v) => {
					if (v.indexOf(homeUrl) !== -1) {
						setAttributes({ postUrl8: v });
					} else {
						setAttributes({ postUrl8: '' });
					}
				}}
				type="string"
			/>
		);
	}
	if (numberPosts >= 9) {
		urlInput += (
			<TextControl
				label={__('Internal Post URL', 'vk-Blocks') + '09'}
				value={postUrl9}
				onChange={(v) => {
					if (v.indexOf(homeUrl) !== -1) {
						setAttributes({ postUrl9: v });
					} else {
						setAttributes({ postUrl9: '' });
					}
				}}
				type="string"
			/>
		);
	}
	if (numberPosts >= 10) {
		urlInput += (
			<TextControl
				label={__('Internal Post URL', 'vk-Blocks') + '10'}
				value={postUrl10}
				onChange={(v) => {
					if (v.indexOf(homeUrl) !== -1) {
						setAttributes({ postUrl10: v });
					} else {
						setAttributes({ postUrl10: '' });
					}
				}}
				type="string"
			/>
		);
	}
	if (numberPosts >= 11) {
		urlInput += (
			<TextControl
				label={__('Internal Post URL', 'vk-Blocks') + '11'}
				value={postUrl11}
				onChange={(v) => {
					if (v.indexOf(homeUrl) !== -1) {
						setAttributes({ postUrl11: v });
					} else {
						setAttributes({ postUrl11: '' });
					}
				}}
				type="string"
			/>
		);
	}
	if (numberPosts >= 12) {
		urlInput += (
			<TextControl
				label={__('Internal Post URL', 'vk-Blocks') + '12'}
				value={postUrl12}
				onChange={(v) => {
					if (v.indexOf(homeUrl) !== -1) {
						setAttributes({ postUrl12: v });
					} else {
						setAttributes({ postUrl12: '' });
					}
				}}
				type="string"
			/>
		);
	}

	let editContent = '';
	if (
		postUrl1 !== '' ||
		postUrl2 !== '' ||
		postUrl3 !== '' ||
		postUrl4 !== '' ||
		postUrl5 !== '' ||
		postUrl6 !== '' ||
		postUrl7 !== '' ||
		postUrl8 !== '' ||
		postUrl9 !== '' ||
		postUrl10 !== '' ||
		postUrl11 !== '' ||
		postUrl12 !== ''
	) {
		editContent = (
			<ServerSideRender
				block="vk-blocks/select-post-list"
				attributes={attributes}
			/>
		);
	} else {
		editContent = (
			<div className="alert alert-warning text-center">
				{__(
					'Because no post is selected, The block Will not render',
					'vk-blocks'
				)}
			</div>
		);
	}

	const blockProps = useBlockProps();

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('Display conditions', 'vk-blocks')}
					initialOpen={false}
				>
					<BaseControl
						label={__('number of posts', 'vk-blocks')}
						id={`vk_postList-numberPosts`}
					>
						<SelectControl
							value={numberPosts}
							onChange={(v) =>
								setAttributes({ numberPosts: parseInt(v, 10) })
							}
							options={[
								{
									value: '1',
									label: '1',
								},
								{
									value: '2',
									label: '2',
								},
								{
									value: '3',
									label: '3',
								},
								{
									value: '4',
									label: '4',
								},
								{
									value: '5',
									label: '5',
								},
								{
									value: '6',
									label: '6',
								},
								{
									value: '7',
									label: '7',
								},
								{
									value: '8',
									label: '8',
								},
								{
									value: '9',
									label: '9',
								},
								{
									value: '10',
									label: '10',
								},
								{
									value: '11',
									label: '11',
								},
								{
									value: '12',
									label: '12',
								},
							]}
						/>
					</BaseControl>
					<BaseControl
						label={__('Post Urls', 'vk-blocks')}
						id={`vk_postList-postUrl`}
					>
						{urlInput}
					</BaseControl>
				</PanelBody>
				<ColumnLayoutControl {...props} />
				<DisplayItemsControl {...props} />
			</InspectorControls>
			<div {...blockProps}>{editContent}</div>
		</>
	);
}
