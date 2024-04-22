import {
    InnerBlocks,
    useBlockProps,
    InspectorControls,
} from '@wordpress/block-editor';
import { useEffect, useState } from '@wordpress/element';
import { PanelBody, SelectControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function AccordionEdit(props) {
	const { attributes, setAttributes, clientId } = props;
	const { containerClass, initialState, initialStateMobile, initialStateTablet, initialStateDesktop, isDeviceSpecific } = attributes;
	
	// 状態管理オプションの表示を切り替えるためのトグル
    const [userIsDeviceSpecific, setUserIsDeviceSpecific] = useState(isDeviceSpecific);

	// トグルの状態を更新する関数
    const toggleDeviceSpecific = () => {
        setUserIsDeviceSpecific(!userIsDeviceSpecific);
        setAttributes({ isDeviceSpecific: !userIsDeviceSpecific });
    };

	// コンソールエラー回避のため useEffect を使用（実行タイミングの問題）
	useEffect(() => {
		// containerClass 互換設定
		if (containerClass === undefined) {
			setAttributes({ containerClass: `vk_accordion-container` });
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
					label={__('Set initial state per device', 'vk-blocks-pro')}
                    checked={isDeviceSpecific}
                    onChange={toggleDeviceSpecific}
				/>
				{isDeviceSpecific ? (
					<>
						<SelectControl
					label={__('Mobile', 'vk-blocks-pro')}
							value={initialStateMobile || initialState}
							options={[
								{ label: 'Open', value: 'open' },
								{ label: 'Close', value: 'close' }
							]}
							onChange={(value) => setAttributes({ initialStateMobile: value })}
						/>
						<SelectControl
					label={__('Tablet', 'vk-blocks-pro')}
							value={initialStateTablet || initialState}
							options={[
								{ label: 'Open', value: 'open' },
								{ label: 'Close', value: 'close' }
							]}
							onChange={(value) => setAttributes({ initialStateTablet: value })}
						/>
						<SelectControl
					label={__('PC', 'vk-blocks-pro')}
							value={initialStateDesktop || initialState}
							options={[
								{ label: 'Open', value: 'open' },
								{ label: 'Close', value: 'close' }
							]}
							onChange={(value) => setAttributes({ initialStateDesktop: value })}
						/>
					</>
				) : (
					<SelectControl
					label={__('Default Initial State', 'vk-blocks-pro')}
						value={initialState}
						options={[
							{ label: 'Open', value: 'open' },
							{ label: 'Close', value: 'close' }
						]}
						onChange={(value) => setAttributes({ initialState: value })}
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
