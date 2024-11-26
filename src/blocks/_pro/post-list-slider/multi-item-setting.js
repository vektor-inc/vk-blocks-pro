import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	BaseControl,
	TextControl,
	RadioControl,
	ToggleControl,
} from '@wordpress/components';

export const MultiItemSetting = (props) => {
	const { attributes, setAttributes } = props;
	const {
		slidesPerGroup,
		slidesPerViewMobile,
		slidesPerViewTablet,
		slidesPerViewPC,
		loop,
		effect,
		numberPosts,
		centeredSlides,
	} = attributes;

	let demicalPointAlert = '';
	if (slidesPerGroup === 'one-by-one') {
		demicalPointAlert = (
			<p className="font-size-11px">
				{__(
					'If you specifying a numbers with decimals such as 1.5, Please set "Centering the active slide"',
					'vk-blocks-pro'
				)}
			</p>
		);
	} else if (slidesPerGroup === 'slides-per-view') {
		demicalPointAlert = (
			<p>
				{__(
					'The decimal point can be set for the display number only when the display is switched one by one.',
					'vk-blocks-pro'
				)}
			</p>
		);
	}

	// １スライドあたりの表示枚数がスライダーの総枚数の約数出なかったときに表示するアラート
	const slidesPerViewAlert = (
		<div className="text-danger font-size-11px">
			{__(
				'Enter a value as an integer divisor of the number of items to retrieve.',
				'vk-blocks-pro'
			)}
		</div>
	);

	// 上記アラートを表示するか否かのモバイル時の処理
	let slidesPerViewMobileAlert = '';
	if (
		numberPosts % parseInt(slidesPerViewMobile) !== 0 &&
		slidesPerGroup === 'slides-per-view'
	) {
		slidesPerViewMobileAlert = slidesPerViewAlert;
	}

	// 上記アラートを表示するか否かのタブレット時の処理
	let slidesPerViewTabletAlert = '';
	if (
		numberPosts % parseInt(slidesPerViewTablet) !== 0 &&
		slidesPerGroup === 'slides-per-view'
	) {
		slidesPerViewTabletAlert = slidesPerViewAlert;
	}

	// 上記アラートを表示するか否かの PC 時の処理
	let slidesPerViewPCAlert = '';
	if (
		numberPosts % parseInt(slidesPerViewPC) !== 0 &&
		slidesPerGroup === 'slides-per-view'
	) {
		slidesPerViewPCAlert = slidesPerViewAlert;
	}

	// ループに関するアラート
	let sloderPerViewLoopAlert = '';
	if (slidesPerGroup === 'slides-per-view') {
		sloderPerViewLoopAlert = (
			<div className="alert alert-danger font-size-11px">
				{__(
					'If you want to loop slides, the number of posts must be greater than or equal to twice the number of posts you want to display per view.',
					'vk-blocks-pro'
				)}
			</div>
		);
	} else if (centeredSlides) {
		sloderPerViewLoopAlert = (
			<div className="alert alert-danger font-size-11px">
				{__(
					'If you want to loop slides, the number of posts must be greater than or equal to the number of posts you want to display per view + 2.',
					'vk-blocks-pro'
				)}
			</div>
		);
	} else {
		sloderPerViewLoopAlert = (
			<div className="alert alert-danger font-size-11px">
				{__(
					'If you want to loop slides, the number of posts must be greater than or equal to the number of posts you want to display per view + 1.',
					'vk-blocks-pro'
				)}
			</div>
		);
	}

	/* ループ時のアラート */
	// モバイル
	let slidesPerViewMobileLoopAlert = '';
	// タブレット
	let slidesPerViewTabletLoopAlert = '';
	// PC
	let slidesPerViewPCLoopAlert = '';
	if (!!loop) {
		if (
			(slidesPerGroup === 'slides-per-view' &&
				numberPosts / slidesPerViewMobile < 2) ||
			(slidesPerGroup === 'one-by-one' &&
				numberPosts - (slidesPerViewMobile + 1) < 0)
		) {
			slidesPerViewMobileLoopAlert = sloderPerViewLoopAlert;
		}
		if (
			(slidesPerGroup === 'slides-per-view' &&
				numberPosts / slidesPerViewTablet < 2) ||
			(slidesPerGroup === 'one-by-one' &&
				numberPosts - (slidesPerViewTablet + 1) < 0)
		) {
			slidesPerViewTabletLoopAlert = sloderPerViewLoopAlert;
		}

		if (
			(slidesPerGroup === 'slides-per-view' &&
				numberPosts / slidesPerViewPC < 2) ||
			(slidesPerGroup === 'one-by-one' &&
				numberPosts - (slidesPerViewPC + 1) < 0)
		) {
			slidesPerViewPCLoopAlert = sloderPerViewLoopAlert;
		}
	}
	// 複数枚表示設定
	let multiItemSetting = '';
	if (effect !== 'fade') {
		multiItemSetting = (
			<PanelBody
				title={__('Multi-item Display Setting', 'vk-blocks-pro')}
				initialOpen={false}
			>
				<BaseControl
					label={__(
						'Number of Items to display per view',
						'vk-blocks-pro'
					)}
					id={`vk_slider-MultiItem`}
				>
					<p className="font-size-11px">
						{__(
							'Enter divisors for the number of posts for each display size.',
							'vk-blocks-pro'
						)}
						{__(
							'If the number is not divisible, the sliding behaviour will be unnatural',
							'vk-blocks-pro'
						)}
					</p>
					{demicalPointAlert}
					<TextControl
						type={'number'}
						label={__('PC', 'vk-blocks-pro')}
						value={slidesPerViewPC}
						onChange={(value) => {
							if (Number(value) === NaN || Number(value) < 1) {
								setAttributes({
									slidesPerViewPC: 1,
								});
							} else if (slidesPerGroup === 'slides-per-view') {
								setAttributes({
									slidesPerViewPC: parseInt(
										Number(value),
										10
									),
								});
							} else {
								setAttributes({
									slidesPerViewPC: parseFloat(Number(value)),
								});
							}
						}}
						min={1}
						step={slidesPerGroup === 'slides-per-view' ? 1 : 0.1}
					/>
					{slidesPerViewPCAlert}
					{slidesPerViewPCLoopAlert}
					<TextControl
						type={'number'}
						label={__('Tablet', 'vk-blocks-pro')}
						value={slidesPerViewTablet}
						onChange={(value) => {
							if (Number(value) === NaN || Number(value) < 1) {
								setAttributes({
									slidesPerViewTablet: 1,
								});
							} else if (slidesPerGroup === 'slides-per-view') {
								setAttributes({
									slidesPerViewTablet: parseInt(
										Number(value),
										10
									),
								});
							} else {
								setAttributes({
									slidesPerViewTablet: parseFloat(
										Number(value)
									),
								});
							}
						}}
						min={1}
						step={slidesPerGroup === 'slides-per-view' ? 1 : 0.1}
					/>
					{slidesPerViewTabletAlert}
					{slidesPerViewTabletLoopAlert}
					<TextControl
						type={'number'}
						label={__('Mobile', 'vk-blocks-pro')}
						value={slidesPerViewMobile}
						onChange={(value) => {
							if (Number(value) === NaN || Number(value) < 1) {
								setAttributes({
									slidesPerViewMobile: 1,
								});
							} else if (slidesPerGroup === 'slides-per-view') {
								setAttributes({
									slidesPerViewMobile: parseInt(
										Number(value),
										10
									),
								});
							} else {
								setAttributes({
									slidesPerViewMobile: parseFloat(
										Number(value)
									),
								});
							}
						}}
						min={1}
						step={slidesPerGroup === 'slides-per-view' ? 1 : 0.1}
					/>
					{slidesPerViewMobileAlert}
					{slidesPerViewMobileLoopAlert}
				</BaseControl>
				<BaseControl
					label={__(
						'Number of posts to change in a transition',
						'vk-blocks-pro'
					)}
					id={`vk_slider-slidesPerGroup`}
				>
					<RadioControl
						selected={slidesPerGroup}
						className={'vk-radioControl'}
						options={[
							{
								label: __('One by One', 'vk-blocks-pro'),
								value: 'one-by-one',
							},
							{
								label: __(
									'Same as the number of posts to display',
									'vk-blocks-pro'
								),
								value: 'slides-per-view',
							},
						]}
						onChange={(value) =>
							setAttributes({
								slidesPerGroup: value,
							})
						}
					/>
				</BaseControl>
				<BaseControl id={`vk_slider-slidesPerGroup`}>
					<ToggleControl
						label={__(
							'Centering the active slide',
							'vk-blocks-pro'
						)}
						className={'mb-1'}
						checked={centeredSlides} //eslint-disable-line camelcase
						onChange={(checked) =>
							setAttributes({ centeredSlides: checked })
						}
						help={__(
							'If you specify the center, you can display posts that are cut off on the left and right.',
							'vk-blocks-pro'
						)}
					/>
				</BaseControl>
			</PanelBody>
		);
	}
	return multiItemSetting;
};
