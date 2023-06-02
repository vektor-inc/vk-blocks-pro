// import WordPress Scripts
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	BlockControls,
	URLInput,
} from '@wordpress/block-editor';
import ServerSideRender from '@wordpress/server-side-render';

import {
	ToolbarGroup,
	ToolbarButton,
	Dropdown,
	Button,
} from '@wordpress/components';
import { link, linkOff, keyboardReturn } from '@wordpress/icons';

export default function SelectPostListItemEdit(props) {
	const { attributes, setAttributes } = props;
	const url = attributes.url;
	const blockProps = useBlockProps();

	let editContent = '';
	if (url !== '') {
		editContent = (
			<ServerSideRender
				block="vk-blocks/select-post-list-item"
				attributes={attributes}
			/>
		);
	} else {
		editContent = (
			<div className="alert alert-warning text-center">
				{__(
					'Because no post is selected, The block Will not render',
					'vk-blocks-pro'
				)}
			</div>
		);
	}

	const homeUrl = vk_blocks_params.home_url; //eslint-disable-line no-undef,camelcase

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<Dropdown
						renderToggle={({ isOpen, onToggle }) => {
							const setLink = () => {
								if (isOpen && url !== '') {
									// linkOff
									setAttributes({ url: '' });
								}
								onToggle();
							};
							return (
								<ToolbarButton
									aria-expanded={isOpen}
									icon={url !== '' && isOpen ? linkOff : link}
									isActive={
										url !== '' && isOpen ? true : false
									}
									label={
										url !== '' && isOpen
											? __('Unlink')
											: __(
													'Input Internal Post URL',
													'vk-blocks-pro'
											  )
									}
									onClick={setLink}
								/>
							);
						}}
						renderContent={(params) => {
							return (
								<form
									className="block-editor-url-popover__link-editor"
									onSubmit={() => {
										if (url.indexOf(homeUrl) === -1) {
											setAttributes({ url: '' });
										}
										params.onClose();
									}}
								>
									<div className="block-editor-url-input">
										<URLInput
											__nextHasNoMarginBottom
											value={url}
											onChange={(v, post) => {
												setAttributes({ url: v });
												if (post && post.title) {
													// select post
													params.onClose();
												}
											}}
										/>
									</div>
									<Button
										icon={keyboardReturn}
										label={__('Submit')}
										type="submit"
									/>
								</form>
							);
						}}
					/>
				</ToolbarGroup>
			</BlockControls>
			<div {...blockProps}>{editContent}</div>
		</>
	);
}
