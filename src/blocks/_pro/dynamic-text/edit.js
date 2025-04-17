/* globals MutationObserver */
import classnames from 'classnames';

// import WordPress Scripts
import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	SelectControl,
	BaseControl,
	CheckboxControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import {
	useBlockProps,
	AlignmentControl,
	BlockControls,
	InspectorControls,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
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
	const {
		textAlign,
		displayElement,
		tagName: TagName = '',
		ancestorPageHiddenOption,
		parentPageHiddenOption,
		customFieldName,
		customFieldLinkText,
		userNamePrefixText,
		userNameSuffixText,
		userNameLoggedOutText,
		isLoginLink,
		fieldType,
		isLinkSet,
		isLinkTarget,
		isVertical,
		isUpright,
	} = attributes;
	attributes.ancestorPageHiddenOption = ancestorPageHiddenOption;
	attributes.parentPageHiddenOption = parentPageHiddenOption;
	attributes.isLinkSet = isLinkSet;
	attributes.isLinkTarget = isLinkTarget;
	attributes.isVertical = isVertical;
	attributes.isUpright = isUpright;
	attributes.customFieldLinkText = customFieldLinkText;

	// Hooks.
	const blockProps = useBlockProps({
		className: classnames({
			[`has-text-align-${textAlign}`]: textAlign,
			'is-vertical': isVertical,
			'is-upright': isUpright,
		}),
	});

	const { postType, parentPageId, currentUser, postSlug } = useSelect(
		(select) => {
			const { getCurrentPostType, getEditedPostAttribute } =
				select('core/editor');
			const { getCurrentUser } = select('core');

			return {
				postType: getCurrentPostType(),
				parentPageId: getEditedPostAttribute('parent'),
				currentUser: getCurrentUser(),
				postSlug: getEditedPostAttribute('slug'),
			};
		},
		[]
	);

	let editContent;
	const editAlertContent = (
		<div className="alert alert-warning text-center">
			{__(
				'Please select display element from the Setting sidebar.',
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
	} else if (displayElement === 'parent-page' && !parentPageId) {
		editContent = (
			<TagName>{__('Parent Page Title', 'vk-blocks-pro')}</TagName>
		);
	} else if (displayElement === 'user-name' && !currentUser) {
		editContent = (
			<TagName>
				{(userNamePrefixText ?? '') +
					currentUser.name +
					(userNameSuffixText ?? '')}
			</TagName>
		);
	} else if (displayElement === 'custom-field' && !postType) {
		editContent = (
			<TagName>
				{__('Custom field', 'vk-blocks-pro')} ({customFieldName})
			</TagName>
		);
	} else if (displayElement === 'user-name') {
		editContent = (
			<TagName>
				{(userNamePrefixText ?? '') +
					currentUser.name +
					(userNameSuffixText ?? '')}
			</TagName>
		);
	} else if (displayElement === 'custom-field' && !customFieldName) {
		editContent = (
			<div className="alert alert-warning text-center">
				{__(
					'This block is not rendered because no custom field name is specified.',
					'vk-blocks-pro'
				)}
			</div>
		);
	} else if (displayElement === 'post-slug' && !postSlug) {
		editContent = (
			<div className="alert alert-warning text-center">
				{__(
					'Set the slug and save the post to display it.',
					'vk-blocks-pro'
				)}
			</div>
		);
	} else if (displayElement === 'please-select') {
		editContent = editAlertContent;
	} else {
		editContent = (
			<ServerSideRender
				skipBlockSupportAttributes
				block="vk-blocks/dynamic-text"
				attributes={attributes}
			/>
		);
	}

	useEffect(() => {
		const iframe = document.querySelector(
			'.block-editor-iframe__container iframe'
		);
		const targetDocument = iframe?.contentWindow?.document || document;
		const disableLinks = () => {
			const links = targetDocument.querySelectorAll('.vk_dynamicText a');
			links.forEach((link) => {
				link.style.pointerEvents = 'none';
			});
		};

		const observer = new MutationObserver(disableLinks);
		const targetNode = targetDocument.querySelector('body');

		if (targetNode) {
			observer.observe(targetNode, { childList: true, subtree: true });
			disableLinks();
		}

		return () => observer.disconnect();
	}, [attributes]);

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
					initialOpen={true}
				>
					<BaseControl>
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
								{
									value: 'parent-page',
									label: __(
										'Page name in the parent hierarchy of the displayed page',
										'vk-blocks-pro'
									),
								},
								{
									value: 'user-name',
									label: __(
										'Current login user name',
										'vk-blocks-pro'
									),
								},
								{
									value: 'custom-field',
									label: __('Custom Field', 'vk-blocks-pro'),
								},
								{
									value: 'post-slug',
									label: __('Post Slug', 'vk-blocks-pro'),
								},
							]}
						/>
					</BaseControl>
					{displayElement === 'ancestor-page' && (
						<BaseControl>
							<CheckboxControl
								label={__(
									'Hide on Ancestor Hierarchy Pages',
									'vk-blocks-pro'
								)}
								checked={ancestorPageHiddenOption}
								onChange={(v) =>
									setAttributes({
										ancestorPageHiddenOption: v,
									})
								}
							/>
							{ancestorPageHiddenOption && (
								<div className="alert alert-warning mt-0 mb-4">
									{__(
										'This block is not displayed on pages without a parent page.',
										'vk-blocks-pro'
									)}
								</div>
							)}
						</BaseControl>
					)}
					{displayElement === 'parent-page' && (
						<BaseControl>
							<CheckboxControl
								label={__(
									'Hide on Parent Hierarchy Pages',
									'vk-blocks-pro'
								)}
								checked={parentPageHiddenOption}
								onChange={(v) =>
									setAttributes({
										parentPageHiddenOption: v,
									})
								}
							/>
							{parentPageHiddenOption && (
								<div className="alert alert-warning mt-0 mb-4">
									{__(
										'This block will not display on pages other than pages that have a parent hierarchy.',
										'vk-blocks-pro'
									)}
								</div>
							)}
						</BaseControl>
					)}
					{displayElement === 'user-name' && (
						<BaseControl>
							<TextControl
								label={__('Prefix Label', 'vk-blocks-pro')}
								value={userNamePrefixText}
								onChange={(value) =>
									setAttributes({ userNamePrefixText: value })
								}
							/>
							<TextControl
								label={__('Suffix Label', 'vk-blocks-pro')}
								value={userNameSuffixText}
								onChange={(value) =>
									setAttributes({ userNameSuffixText: value })
								}
							/>
							<TextControl
								label={__(
									'Text for Logged Out Users',
									'vk-blocks-pro'
								)}
								value={userNameLoggedOutText}
								onChange={(value) =>
									setAttributes({
										userNameLoggedOutText: value,
									})
								}
							/>
							<ToggleControl
								label={__(
									'Link to Login on Logout',
									'vk-blocks-pro'
								)}
								checked={isLoginLink}
								onChange={(checked) =>
									setAttributes({
										isLoginLink: checked,
									})
								}
							/>
						</BaseControl>
					)}
					{displayElement === 'custom-field' && (
						<BaseControl>
							<TextControl
								label={__('Custom Field Name', 'vk-blocks-pro')}
								value={customFieldName}
								onChange={(value) =>
									setAttributes({ customFieldName: value })
								}
							/>
							<SelectControl
								label={__('Field Type', 'vk-blocks-pro')}
								value={fieldType}
								onChange={(value) =>
									setAttributes({ fieldType: value })
								}
								className="mb-0"
								options={[
									{
										value: 'text',
										label: __('text', 'vk-blocks-pro'),
									},
									{
										value: 'textarea',
										label: __('textarea', 'vk-blocks-pro'),
									},
									{
										value: 'wysiwyg',
										label: __('wysiwyg', 'vk-blocks-pro'),
									},
									{
										value: 'url',
										label: __('URL', 'vk-blocks-pro'),
									},
								]}
							/>
							{fieldType === 'url' && (
								<>
									<ToggleControl
										label={__(
											'Setting up a link',
											'vk-blocks-pro'
										)}
										checked={isLinkSet}
										onChange={(checked) =>
											setAttributes({
												isLinkSet: checked,
											})
										}
									/>
									{isLinkSet && (
										<ToggleControl
											label={__(
												'Open link new tab.',
												'vk-blocks-pro'
											)}
											checked={isLinkTarget}
											onChange={(checked) =>
												setAttributes({
													isLinkTarget: checked,
												})
											}
										/>
									)}
								</>
							)}
							{fieldType === 'url' && isLinkSet && (
								<TextControl
									label={__('Link Text', 'vk-blocks-pro')}
									value={attributes.customFieldLinkText}
									onChange={(value) =>
										setAttributes({
											customFieldLinkText: value,
										})
									}
								/>
							)}
						</BaseControl>
					)}
					<DynamicTextEditControls
						tagName={TagName}
						onSelectTagName={(value) =>
							setAttributes({ tagName: value })
						}
					/>
					<BaseControl>
						<ToggleControl
							label="Vertical writing"
							checked={isVertical}
							onChange={(value) =>
								setAttributes({
									isVertical: value,
								})
							}
						/>
						{isVertical === true && (
							<>
								<ToggleControl
									label="upright text"
									checked={isUpright}
									onChange={(value) =>
										setAttributes({
											isUpright: value,
										})
									}
								/>
							</>
						)}
					</BaseControl>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>{editContent}</div>
		</>
	);
}
