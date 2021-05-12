// import WordPress Scripts
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	BlockControls,
	__experimentalLinkControlSearchInput as LinkControlSearchInput, // eslint-disable-line @wordpress/no-unsafe-wp-apis
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
					'vk-blocks'
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
													'vk-blocks'
											  )
									}
									onClick={setLink}
								/>
							);
						}}
						renderContent={(params) => {
							return (
								<div
									tabIndex={-1}
									className="block-editor-link-control"
								>
									<div className="block-editor-link-control__search-input-wrapper">
										<LinkControlSearchInput
											className="block-editor-link-control__search-input"
											placeholder={__(
												'Search or type url'
											)}
											allowDirectEntry={false}
											withURLSuggestion={false}
											withCreateSuggestion={false}
											value={url}
											onChange={(v) => {
												setAttributes({ url: v });
											}}
											onSelect={(v) => {
												if (v.url !== '') {
													if (
														v.url.indexOf(
															homeUrl
														) !== -1
													) {
														setAttributes({
															url: v.url,
														});
													} else {
														setAttributes({
															url: '',
														});
														v.url = '';
													}
												}
												params.onClose();
											}}
										>
											<div className="block-editor-link-control__search-actions">
												<Button
													type="submit"
													label={__('Submit')}
													icon={keyboardReturn}
													className="block-editor-link-control__search-submit"
												/>
											</div>
										</LinkControlSearchInput>
									</div>
								</div>
							);
						}}
					/>
				</ToolbarGroup>
			</BlockControls>
			<div {...blockProps}>{editContent}</div>
		</>
	);
}
