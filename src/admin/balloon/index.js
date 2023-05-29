/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { SelectControl, Button, TextControl } from '@wordpress/components';
import { useContext } from '@wordpress/element';
import { MediaUpload } from '@wordpress/media-utils';

/**
 * Internal dependencies
 */
import noImage from '@vkblocks/admin/balloon/images/no-image.png';
import { AdminContext } from '@vkblocks/admin/index';
import { AddButton } from '@vkblocks/admin/balloon/add-button';
import { DeleteButton } from '@vkblocks/admin/balloon/delete-button';
import { stripHTML } from '@vkblocks/utils/strip-html';

export default function AdminBalloon() {
	const { vkBlocksOption, setVkBlocksOption } = useContext(AdminContext);

	const onChange = (key, value, index) => {
		const newItems = vkBlocksOption.balloon_meta_lists;
		newItems[index] = {
			...vkBlocksOption.balloon_meta_lists[index],
			[key]: value,
		};
		setVkBlocksOption({
			...vkBlocksOption,
			balloon_meta_lists: [...newItems],
		});
	};

	return (
		<>
			<section>
				<h3 id="balloon-setting">
					{__('Balloon Setting', 'vk-blocks-pro')}
				</h3>
				<h4 id="balloon-border-width-setting">
					{__('Balloon Border Width Setting', 'vk-blocks-pro')}
				</h4>
				<SelectControl
					id="balloon-border-width-selector"
					className="vk_admin_selectControl"
					name="vk_blocks_options[balloon_border_width]"
					value={
						!!vkBlocksOption.balloon_border_width &&
						vkBlocksOption.balloon_border_width
					}
					onChange={(newValue) => {
						setVkBlocksOption({
							...vkBlocksOption,
							balloon_border_width: newValue,
						});
					}}
					options={[
						{
							label: __('1px', 'vk-blocks-pro'),
							value: 1,
						},
						{
							label: __('2px', 'vk-blocks-pro'),
							value: 2,
						},
						{
							label: __('3px', 'vk-blocks-pro'),
							value: 3,
						},
						{
							label: __('4px', 'vk-blocks-pro'),
							value: 4,
						},
					]}
				/>
				<h4 id="balloon-image-setting">
					{__('Balloon Image Setting', 'vk-blocks-pro')}
				</h4>
				<p>
					{__(
						'You can register frequently used icon images for speech bubble blocks.',
						'vk-blocks-pro'
					)}
				</p>
				<ul className="balloonIconList">
					{Object.keys(vkBlocksOption.balloon_meta_lists).map(
						(key, index) => {
							const balloonMetaListObj =
								vkBlocksOption.balloon_meta_lists[key];
							return (
								<li key={index}>
									<MediaUpload
										label={__('image', 'vk-blocks-pro')}
										onSelect={(newValue) => {
											onChange(
												'src',
												newValue.url,
												index
											);
										}}
										type="image"
										allowedTypes={['image']}
										value={
											!balloonMetaListObj.src &&
											balloonMetaListObj.src
										}
										render={({ open }) => (
											<>
												{!balloonMetaListObj.src ? (
													<>
														<div className="balloonIconList_iconFrame">
															<img
																className="balloonIconList_iconFrame_src"
																src={noImage}
																alt=""
															/>
															<Button
																onClick={open}
																className="button button-block button-select"
															>
																{__(
																	'Select',
																	'vk-blocks-pro'
																)}
															</Button>
														</div>
													</>
												) : (
													<>
														<div className="balloonIconList_iconFrame">
															<img
																id={`balloonIconList_iconFrame_src_${index}`}
																className="balloonIconList_iconFrame_src"
																src={
																	balloonMetaListObj.src
																}
																alt=""
															/>
															<Button
																className="button button-block button-delete"
																onClick={() => {
																	onChange(
																		'src',
																		'',
																		index
																	);
																}}
															>
																{__(
																	'Delete',
																	'vk-blocks-pro'
																)}
															</Button>
														</div>
													</>
												)}
											</>
										)}
									/>
									<label
										htmlFor="icon_title"
										className="balloonIconList_nameLabel"
									>
										{__(
											'Balloon Image Name',
											'vk-blocks-pro'
										)}
									</label>
									<TextControl
										id={`icon_title_${index}`}
										className="balloonIconList_name_input"
										name={`vk_blocks_balloon_meta[default_icons][${index}][name]`}
										onChange={(value) =>
											onChange(
												'name',
												stripHTML(value),
												index
											)
										}
										value={balloonMetaListObj.name ?? ''}
									/>
									<DeleteButton
										index={index}
										balloonMetaListObj={balloonMetaListObj}
									/>
								</li>
							);
						}
					)}
				</ul>
				<AddButton />
			</section>
		</>
	);
}
