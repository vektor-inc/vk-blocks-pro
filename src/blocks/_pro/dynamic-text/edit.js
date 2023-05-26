import classnames from 'classnames';

// import WordPress Scripts
import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	SelectControl,
	BaseControl,
	CheckboxControl,
} from '@wordpress/components';
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
			label={__('HTML element', 'vk-blocks')}
			value={tagName}
			options={[
				{
					value: 'div',
					label: __('div (default)', 'vk-blocks'),
				},
				{
					value: 'h1',
					label: __('h1', 'vk-blocks'),
				},
				{
					value: 'h2',
					label: __('h2', 'vk-blocks'),
				},
				{
					value: 'h3',
					label: __('h3', 'vk-blocks'),
				},
				{
					value: 'h4',
					label: __('h4', 'vk-blocks'),
				},
				{
					value: 'h5',
					label: __('h5', 'vk-blocks'),
				},
				{
					value: 'h6',
					label: __('h6', 'vk-blocks'),
				},
				{
					value: 'p',
					label: __('p', 'vk-blocks'),
				},
				{
					value: 'span',
					label: __('span', 'vk-blocks'),
				},
			]}
			onChange={onSelectTagName}
		/>
	);
}

export default function DynamicTextEdit(props) {
	const { attributes, setAttributes } = props;
	const {
		textAlign,
		displayElement,
		tagName: TagName = '',
		ancestorPageDisplayOption,
	} = attributes;
	attributes.ancestorPageDisplayOption = ancestorPageDisplayOption;

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
				'vk-blocks'
			)}
		</div>
	);
	if (displayElement === 'post-type' && !postType) {
		editContent = <TagName>{__('Post Type Name', 'vk-blocks')}</TagName>;
	} else if (displayElement === 'ancestor-page' && !parentPageId) {
		editContent = (
			<TagName>{__('Ancestor Page Title ', 'vk-blocks')}</TagName>
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
					title={__('Display element settings', 'vk-blocks')}
					initialOpen={false}
				>
					<BaseControl>
						<SelectControl
							label={__('Display element', 'vk-blocks')}
							value={displayElement}
							onChange={(value) =>
								setAttributes({ displayElement: value })
							}
							className="mb-0"
							options={[
								{
									value: 'please-select',
									label: __('Please Select', 'vk-blocks'),
								},
								{
									value: 'post-type',
									label: __(
										'Post type name of the page being viewed',
										'vk-blocks'
									),
								},
								{
									value: 'ancestor-page',
									label: __(
										'Page name in the ancestor hierarchy of the displayed page',
										'vk-blocks'
									),
								},
								// {
								// 	value: 'custom-field',
								// 	label: __('カスタムフィールド', 'vk-blocks'),
								// },
							]}
						/>
					</BaseControl>
					<BaseControl>
						<CheckboxControl
							label={__(
								'Hide page on Ancector Page',
								'vk-blocks'
							)}
							checked={ancestorPageDisplayOption}
							onChange={(v) =>
								setAttributes({ ancestorPageDisplayOption: v })
							}
						/>
						{ancestorPageDisplayOption && (
							<div className="alert alert-warning mt-0 mb-4">
								{__(
									'This block will not display on pages other than pages that have a parent hierarchy.',
									'vk-blocks'
								)}
							</div>
						)}
					</BaseControl>
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
