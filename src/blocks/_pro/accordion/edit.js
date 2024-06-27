import {
	InnerBlocks,
	useBlockProps,
	InspectorControls,
} from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import {
	PanelBody,
	SelectControl,
	ToggleControl,
} from '@wordpress/compsonents';
import { __ } from '@wordpress/i18n';

export default function AccordionEdit(props) {
	const { attributes, setAttributes, clientId } = props;
	const {
		containerClass,
		initialState,
		initialStateMobile,
		initialStateTablet,
		initialStateDesktop,
		isDeviceSpecific,
	} = attributes;

	// トグルの状態を更新
	const toggleDeviceSpecific = () => {
		const newIsDeviceSpecific = !isDeviceSpecific;
		setAttributes({
			isDeviceSpecific: newIsDeviceSpecific,
		});

		if (newIsDeviceSpecific) {
			// デバイス固有の設定がONになった場合、前回の値が未定義ならデフォルト状態を設定
			setAttributes({
				isDeviceSpecific: newIsDeviceSpecific,
				initialStateMobile: initialStateMobile || initialState,
				initialStateTablet: initialStateTablet || initialState,
				initialStateDesktop: initialStateDesktop || initialState,
			});
		} else {
			// デバイス固有の設定がOFFになった場合、全デバイスの初期状態を共通のinitialStateに統一
			setAttributes({
				isDeviceSpecific: newIsDeviceSpecific,
				initialStateMobile: initialState,
				initialStateTablet: initialState,
				initialStateDesktop: initialState,
			});
		}
	};

	// コンソールエラー回避のため useEffect を使用（実行タイミングの問題）
	useEffect(() => {
		// containerClass 互換設定
		if (containerClass === undefined) {
			setAttributes({ containerClass: `vk_accordion-container` });
		}
		// isDeviceSpecific 互換設定
		if (isDeviceSpecific === undefined) {
			setAttributes({ isDeviceSpecific: false });
		}
		// initialState 互換設定
		if (initialState === undefined) {
			setAttributes({ initialState: 'close' });
		}
		// initialStateMobile 互換設定
		if (initialStateMobile === undefined) {
			setAttributes({ initialStateMobile: '' });
		}
		// initialStateTablet 互換設定
		if (initialStateTablet === undefined) {
			setAttributes({ initialStateTablet: '' });
		}
		// initialStateDesktop 互換設定
		if (initialStateDesktop === undefined) {
			setAttributes({ initialStateDesktop: '' });
		}
	}, [clientId]);

	// blocksProps を予め定義
	const blockProps = useBlockProps({
		className: `${containerClass}`,
	});

	const ALLOWED_BLOCKS = [
		'vk-blocks/accordion-trigger',
		'vk-blocks/accordion-target',
	];

	const TEMPLATE = [
		['vk-blocks/accordion-trigger'],
		['vk-blocks/accordion-target'],
	];

	return (
		<div {...blockProps}>
			<InspectorControls>
				<PanelBody title={__('Accordion Setting', 'vk-blocks-pro')}>
					<ToggleControl
						label={__(
							'Set initial state per device',
							'vk-blocks-pro'
						)}
						checked={isDeviceSpecific}
						onChange={toggleDeviceSpecific}
					/>
					{isDeviceSpecific ? (
						<>
							<SelectControl
								label={__('Mobile', 'vk-blocks-pro')}
								value={initialStateMobile || initialState}
								options={[
									{
										label: __('Close', 'vk-blocks-pro'),
										value: 'close',
									},
									{
										label: __('Open', 'vk-blocks-pro'),
										value: 'open',
									},
								]}
								onChange={(value) =>
									setAttributes({ initialStateMobile: value })
								}
							/>
							<SelectControl
								label={__('Tablet', 'vk-blocks-pro')}
								value={initialStateTablet || initialState}
								options={[
									{
										label: __('Close', 'vk-blocks-pro'),
										value: 'close',
									},
									{
										label: __('Open', 'vk-blocks-pro'),
										value: 'open',
									},
								]}
								onChange={(value) =>
									setAttributes({ initialStateTablet: value })
								}
							/>
							<SelectControl
								label={__('PC', 'vk-blocks-pro')}
								value={initialStateDesktop || initialState}
								options={[
									{
										label: __('Close', 'vk-blocks-pro'),
										value: 'close',
									},
									{
										label: __('Open', 'vk-blocks-pro'),
										value: 'open',
									},
								]}
								onChange={(value) =>
									setAttributes({
										initialStateDesktop: value,
									})
								}
							/>
						</>
					) : (
						<SelectControl
							label={__('Default Initial State', 'vk-blocks-pro')}
							value={initialState}
							options={[
								{
									label: __('Close', 'vk-blocks-pro'),
									value: 'close',
								},
								{
									label: __('Open', 'vk-blocks-pro'),
									value: 'open',
								},
							]}
							onChange={(value) =>
								setAttributes({ initialState: value })
							}
						/>
					)}
				</PanelBody>
			</InspectorControls>
			<InnerBlocks
				allowedBlocks={ALLOWED_BLOCKS}
				template={TEMPLATE}
				templateLock="all"
			/>
		</div>
	);
}
