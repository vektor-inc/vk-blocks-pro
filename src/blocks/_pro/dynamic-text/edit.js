import classnames from 'classnames';

// import WordPress Scripts
import { __ } from '@wordpress/i18n';
import { PanelBody, SelectControl } from '@wordpress/components';
import {
	useBlockProps,
	AlignmentControl,
	BlockControls,
	InspectorControls,
} from '@wordpress/block-editor';
import ServerSideRender from '@wordpress/server-side-render';

/**
 * Render Select controls for the Dynamic text block.
 *
 * @param {Object}   props                 Component props.
 * @param {string}   props.tagName         The HTML tag name.
 * @param {Function} props.onSelectTagName onChange function for the SelectControl.
 *
 * @return {JSX.Element}                The select control group for HTML tag name.
 */
function DynamicTextEditControls({ tagName, onSelectTagName }) {
	return (
		<SelectControl
			__nextHasNoMarginBottom
			label={__('HTML element', 'vk-blocks-pro')}
			value={tagName}
			options={[
				{
					value: 'div',
					label: __('div (default)', 'vk-blocks-pro'),
				},
				{
					value: 'h1',
					label: __('h1', 'vk-blocks-pro'),
				},
				{
					value: 'h2',
					label: __('h2', 'vk-blocks-pro'),
				},
				{
					value: 'h3',
					label: __('h3', 'vk-blocks-pro'),
				},
				{
					value: 'h4',
					label: __('h4', 'vk-blocks-pro'),
				},
				{
					value: 'h5',
					label: __('h5', 'vk-blocks-pro'),
				},
				{
					value: 'h6',
					label: __('h6', 'vk-blocks-pro'),
				},
				{
					value: 'p',
					label: __('p', 'vk-blocks-pro'),
				},
				{
					value: 'span',
					label: __('span', 'vk-blocks-pro'),
				},
			]}
			onChange={onSelectTagName}
		/>
	);
}

export default function DynamicTextEdit(props) {
	const { attributes, setAttributes } = props;
	const { textAlign, displayElement, tagName: TagName = '' } = attributes;

	// Hooks.
	const blockProps = useBlockProps({
		className: classnames({
			[`has-text-align-${textAlign}`]: textAlign,
		}),
	});

	const postType = wp.data.select('core/editor').getCurrentPostType();
	const parentPageId = wp.data
		.select('core/editor')
		.getEditedPostAttribute('parent');

	let editContent;
	const editAlertContent = (
		<div className="alert alert-warning text-center">
			{__(
				'This block will not render because no visible element is selected.',
				'vk-blocks-pro'
			)}
		</div>
	);
	if (displayElement === 'post-type' && !postType) {
		editContent = (
			<TagName>{__('Post Type Name', 'vk-blocks-pro')}</TagName>
		);
	} else if (displayElement === 'ancestor-page' && !parentPageId) {
		editContent = (
			<TagName>{__('Ancestor Page Title', 'vk-blocks-pro')}</TagName>
		);
	} else if (displayElement === 'please-select') {
		editContent = editAlertContent;
	} else {
		editContent = (
			<ServerSideRender
				block="vk-blocks/dynamic-text"
				attributes={attributes}
			/>
		);
	}

	return (
		<>
			<BlockControls group="block">
				<AlignmentControl
					value={textAlign}
					onChange={(nextAlign) => {
						setAttributes({ textAlign: nextAlign });
					}}
				/>
			</BlockControls>
			<InspectorControls>
				<PanelBody
					title={__('Display element settings', 'vk-blocks-pro')}
				>
					<SelectControl
						label={__('Display element', 'vk-blocks-pro')}
						value={displayElement}
						onChange={(value) =>
							setAttributes({ displayElement: value })
						}
						className="mb-0"
						options={[
							{
								value: 'please-select',
								label: __('Please Select', 'vk-blocks-pro'),
							},
							{
								value: 'post-type',
								label: __(
									'Post type name of the page being viewed',
									'vk-blocks-pro'
								),
							},
							{
								value: 'ancestor-page',
								label: __(
									'Page name in the ancestor hierarchy of the displayed page',
									'vk-blocks-pro'
								),
							},
							// {
							// 	value: 'custom-field',
							// 	label: __('カスタムフィールド', 'vk-blocks-pro'),
							// },
						]}
					/>
					{displayElement === 'ancestor-page' && (
						<div className="alert alert-warning mt-0 mb-4">
							{__(
								'This block will not display on pages other than pages that have a parent hierarchy.',
								'vk-blocks-pro'
							)}
						</div>
					)}
					<DynamicTextEditControls
						tagName={TagName}
						onSelectTagName={(value) =>
							setAttributes({ tagName: value })
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>{editContent}</div>
		</>
	);
}
