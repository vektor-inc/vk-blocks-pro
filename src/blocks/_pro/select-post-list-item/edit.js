// import WordPress Scripts
import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps, BlockControls, __experimentalLinkControl as LinkControl } from '@wordpress/block-editor';
import ServerSideRender from '@wordpress/server-side-render';
import { TextControl, PanelBody, ToolbarGroup, ToolbarButton, Dropdown, Button } from '@wordpress/components';
import { link, linkOff } from '@wordpress/icons';

export default function SelectPostListItemEdit(props) {
	const { attributes, setAttributes } = props;
	const url = attributes.url;
	const opensInNewTab = attributes.opensInNewTab;
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
						position="bottom right"
						renderToggle={({ isOpen, onToggle }) => {
							const setURL = () => {
								if (isOpen && url.length) {
									// linkOff
									setAttributes({ url: '' });
									setAttributes({ opensInNewTab: false });
								}
								onToggle();
							};

							return (
								<ToolbarButton
									aria-expanded={isOpen}
									aria-haspopup="true"									icon={url.length && isOpen ? linkOff : link}
									isActive={url.length && isOpen ? true : false}
									label={__('Input Internal Post URL', 'vk-blocks')}
									onClick={setURL}
								/>
							);
						}}
						renderContent={(isOpen) =>
							<LinkControl
								url={url}
								opensInNewTab={opensInNewTab}
								value={attributes}
								onChange={(v) => {
									if (v.url) {
										if (v.url.indexOf(homeUrl) !== -1) {
											setAttributes({ url: v.url });
										} else {
											setAttributes({ url: '' });
											v.url = '';
										}
									}

									if (!v.opensInNewTab || !v.url.length) {
										v.opensInNewTab = false;
									}
									setAttributes({ opensInNewTab: v.opensInNewTab });
									// close したい
								}}
							/>
						}
					/>
				</ToolbarGroup>
			</BlockControls>
			<InspectorControls>
				<PanelBody
					title={__('Select Post List Item Setting', 'vk-blocks')}
					initialOpen={true}
				>
					<TextControl
						label={__('Input Internal Post URL', 'vk-blocks')}
						value={url}
						type="string"
						onChange={(v) => {
							if (v.indexOf(homeUrl) !== -1) {
								setAttributes({ url: v });
							} else {
								setAttributes({ url: '' });
							}
						}}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>{editContent}</div>
		</>
	);
}
