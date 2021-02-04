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
import { DisplayItemsControl } from '../select-post-list/node_modules/@vkblocks/components/display-items-control';
import { ColumnLayoutControl } from '../select-post-list/node_modules/@vkblocks/components/column-layout-control';

export default function PostListEdit(props) {
	const { attributes, setAttributes, name } = props;

	const {
		numberPosts,
		postUrl01,
		postUrl02,
		postUrl03,
		postUrl04,
		postUrl05,
		postUrl06,
		postUrl07,
		postUrl08,
		postUrl09,
		postUrl10,
		postUrl11,
		postUrl12,
	} = attributes;
	attributes.name = name;

	let urlInput = '';
	if (numberPosts >= 1) {
		urlInput = (
			<TextControl
				label={__('Internal Post URL', 'vk-Blocks') + '01'}
				value={postUrl01}
				onChange={(v) => setAttributes({ postUrl01: v })}
				type="string"
			/>
		);
	}
	if (numberPosts >= 2) {
		urlInput += (
			<TextControl
				label={__('Internal Post URL', 'vk-Blocks') + '02'}
				value={postUrl02}
				onChange={(v) => setAttributes({ postUrl02: v })}
				type="string"
			/>
		);
	}
	if (numberPosts >= 3) {
		urlInput += (
			<TextControl
				label={__('Internal Post URL', 'vk-Blocks') + '03'}
				value={postUrl03}
				onChange={(v) => setAttributes({ postUrl03: v })}
				type="string"
			/>
		);
	}
	if (numberPosts >= 4) {
		urlInput += (
			<TextControl
				label={__('Internal Post URL', 'vk-Blocks') + '04'}
				value={postUrl04}
				onChange={(v) => setAttributes({ postUrl04: v })}
				type="string"
			/>
		);
	}
	if (numberPosts >= 5) {
		urlInput += (
			<TextControl
				label={__('Internal Post URL', 'vk-Blocks') + '05'}
				value={postUrl05}
				onChange={(v) => setAttributes({ postUrl05: v })}
				type="string"
			/>
		);
	}
	if (numberPosts >= 6) {
		urlInput += (
			<TextControl
				label={__('Internal Post URL', 'vk-Blocks') + '06'}
				value={postUrl06}
				onChange={(v) => setAttributes({ postUrl06: v })}
				type="string"
			/>
		);
	}
	if (numberPosts >= 7) {
		urlInput += (
			<TextControl
				label={__('Internal Post URL', 'vk-Blocks') + '07'}
				value={postUrl07}
				onChange={(v) => setAttributes({ postUrl07: v })}
				type="string"
			/>
		);
	}
	if (numberPosts >= 8) {
		urlInput += (
			<TextControl
				label={__('Internal Post URL', 'vk-Blocks') + '08'}
				value={postUrl08}
				onChange={(v) => setAttributes({ postUrl08: v })}
				type="string"
			/>
		);
	}
	if (numberPosts >= 9) {
		urlInput += (
			<TextControl
				label={__('Internal Post URL', 'vk-Blocks') + '09'}
				value={postUrl09}
				onChange={(v) => setAttributes({ postUrl09: v })}
				type="string"
			/>
		);
	}
	if (numberPosts >= 10) {
		urlInput += (
			<TextControl
				label={__('Internal Post URL', 'vk-Blocks') + '10'}
				value={postUrl10}
				onChange={(v) => setAttributes({ postUrl10: v })}
				type="string"
			/>
		);
	}
	if (numberPosts >= 11) {
		urlInput += (
			<TextControl
				label={__('Internal Post URL', 'vk-Blocks') + '11'}
				value={postUrl11}
				onChange={(v) => setAttributes({ postUrl11: v })}
				type="string"
			/>
		);
	}
	if (numberPosts >= 12) {
		urlInput += (
			<TextControl
				label={__('Internal Post URL', 'vk-Blocks') + '12'}
				value={postUrl12}
				onChange={(v) => setAttributes({ postUrl12: v })}
				type="string"
			/>
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
			<div {...blockProps}>
				<ServerSideRender
					block="vk-blocks/select-post-list"
					attributes={attributes}
				/>
			</div>
		</>
	);
}
