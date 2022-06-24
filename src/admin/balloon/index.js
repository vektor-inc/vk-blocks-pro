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
import { SaveButton } from '@vkblocks/admin/save-button';
import noImage from '@vkblocks/admin/balloon/images/no-image.png';
import { AdminContext } from '@vkblocks/admin/index';
/*globals vkBlocksObject */

export default function AdminBalloon() {
	const {
		vkBlocksOption,
		setVkBlocksOption,
		vkBlocksBalloonMeta,
		setVkBlocksBalloonMeta,
	} = useContext(AdminContext);
	const vkBlocksImageNumber = vkBlocksObject.imageNumber;

	return (
		<>
			<section>
				<h3 id="balloon-setting">
					{__('Balloon Setting', 'vk-blocks')}
				</h3>
				<h4 id="balloon-border-width-setting">
					{__('Balloon Border Width Setting', 'vk-blocks')}
				</h4>
				<SelectControl
					className="vk_admin_selectControl"
					name="vk_blocks_options[balloon_border_width]"
					value={vkBlocksOption.balloon_border_width}
					onChange={(newValue) => {
						setVkBlocksOption({
							...vkBlocksOption,
							balloon_border_width: newValue,
						});
					}}
					options={[
						{
							label: __('1px', 'vk-blocks'),
							value: 1,
						},
						{
							label: __('2px', 'vk-blocks'),
							value: 2,
						},
						{
							label: __('3px', 'vk-blocks'),
							value: 3,
						},
						{
							label: __('4px', 'vk-blocks'),
							value: 4,
						},
					]}
				/>
			</section>
			<SaveButton
				vkBlocksOption={vkBlocksOption}
				vkBlocksBalloonMeta={vkBlocksBalloonMeta}
			/>
			<h4 id="balloon-image-setting">
				{__('Balloon Image Setting', 'vk-blocks')}
			</h4>
			<p>
				{__(
					'You can register frequently used icon images for speech bubble blocks.',
					'vk-blocks'
				)}
				{__(
					'If you change image or name that please click Save Changes button.',
					'vk-blocks'
				)}
			</p>
			<ul className="balloonIconList">
				{(() => {
					const items = [];
					for (let i = 1; i <= vkBlocksImageNumber; i++) {
						items.push(
							<li key={i}>
								<MediaUpload
									label={__('image', 'vk-blocks')}
									onSelect={(newValue) => {
										setVkBlocksBalloonMeta({
											...vkBlocksBalloonMeta,
											default_icons: {
												...vkBlocksBalloonMeta.default_icons,
												[i]: {
													...vkBlocksBalloonMeta
														.default_icons[i],
													src: newValue.url,
												},
											},
										});
									}}
									type="image"
									allowedTypes={['image']}
									value={
										!vkBlocksBalloonMeta.default_icons[i]
											.src &&
										vkBlocksBalloonMeta.default_icons[i].src
									}
									render={({ open }) => (
										<>
											{!vkBlocksBalloonMeta.default_icons[
												i
											].src ? (
												<>
													<div className="balloonIconList_iconFrame">
														<div
															style={{
																width: '100px',
																height: '100px',
																objectFit:
																	'cover',
															}}
														>
															<img
																className="balloonIconList_iconFrame_src"
																src={noImage}
																alt=""
															/>
														</div>
													</div>
													<Button
														onClick={open}
														className="button button-block button-set"
													>
														{__(
															'Select',
															'vk-blocks'
														)}
													</Button>
													<Button
														className="button button-block button-delete"
														onClick={() => {
															setVkBlocksBalloonMeta(
																{
																	...vkBlocksBalloonMeta,
																	default_icons:
																		{
																			...vkBlocksBalloonMeta.default_icons,
																			[i]: {
																				...vkBlocksBalloonMeta
																					.default_icons[
																					i
																				],
																				src: '',
																			},
																		},
																}
															);
														}}
													>
														{__(
															'Delete',
															'vk-blocks'
														)}
													</Button>
												</>
											) : (
												<>
													<div className="balloonIconList_iconFrame">
														<div
															style={{
																width: '100px',
																height: '100px',
																objectFit:
																	'cover',
															}}
														>
															<img
																className="balloonIconList_iconFrame_src"
																src={
																	vkBlocksBalloonMeta
																		.default_icons[
																		i
																	].src ===
																		'' ||
																	vkBlocksBalloonMeta
																		.default_icons[
																		i
																	].src ===
																		undefined
																		? noImage
																		: vkBlocksBalloonMeta
																				.default_icons[
																				i
																		  ].src
																}
																alt=""
															/>
														</div>
													</div>
													<Button
														onClick={open}
														className="button button-block button-set"
													>
														{__(
															'Select',
															'vk-blocks'
														)}
													</Button>
													<Button
														className="button button-block button-delete"
														onClick={() => {
															setVkBlocksBalloonMeta(
																{
																	...vkBlocksBalloonMeta,
																	default_icons:
																		{
																			...vkBlocksBalloonMeta.default_icons,
																			[i]: {
																				...vkBlocksBalloonMeta
																					.default_icons[
																					i
																				],
																				src: '',
																			},
																		},
																}
															);
														}}
													>
														{__(
															'Delete',
															'vk-blocks'
														)}
													</Button>
												</>
											)}
										</>
									)}
								/>
								<label
									htmlFor="icon_title"
									className="balloonIconList_nameLabel"
								>
									{__('Balloon Image Name', 'vk-blocks')}
								</label>
								<TextControl
									className="balloonIconList_name_input"
									name={`vk_blocks_balloon_meta[default_icons][${i}][name]`}
									onChange={(newValue) => {
										setVkBlocksBalloonMeta({
											...vkBlocksBalloonMeta,
											default_icons: {
												...vkBlocksBalloonMeta.default_icons,
												[i]: {
													...vkBlocksBalloonMeta
														.default_icons[i],
													name: newValue,
												},
											},
										});
									}}
									value={
										vkBlocksBalloonMeta.default_icons[i]
											.name === ''
											? ''
											: vkBlocksBalloonMeta.default_icons[
													i
											  ].name
									}
								/>
							</li>
						);
					}
					return items;
				})()}
			</ul>
			<SaveButton
				vkBlocksOption={vkBlocksOption}
				vkBlocksBalloonMeta={vkBlocksBalloonMeta}
			/>
		</>
	);
}
