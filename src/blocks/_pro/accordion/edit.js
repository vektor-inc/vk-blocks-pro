import {
    InnerBlocks,
    useBlockProps,
    InspectorControls,
} from '@wordpress/block-editor';
import { useEffect, useState } from '@wordpress/element';
import { PanelBody, SelectControl, ToggleControl } from '@wordpress/components';

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
			<PanelBody title="Accordion Settings">
				<ToggleControl
					label="Set initial state per device"
                    checked={isDeviceSpecific}
                    onChange={toggleDeviceSpecific}
				/>
				{isDeviceSpecific ? (
					<>
						<SelectControl
							label="Mobile Initial State"
							value={initialStateMobile || initialState}
							options={[
								{ label: 'Open', value: 'open' },
								{ label: 'Closed', value: 'closed' }
							]}
							onChange={(value) => setAttributes({ initialStateMobile: value })}
						/>
						<SelectControl
							label="Tablet Initial State"
							value={initialStateTablet || initialState}
							options={[
								{ label: 'Open', value: 'open' },
								{ label: 'Closed', value: 'closed' }
							]}
							onChange={(value) => setAttributes({ initialStateTablet: value })}
						/>
						<SelectControl
							label="Desktop Initial State"
							value={initialStateDesktop || initialState}
							options={[
								{ label: 'Open', value: 'open' },
								{ label: 'Closed', value: 'closed' }
							]}
							onChange={(value) => setAttributes({ initialStateDesktop: value })}
						/>
					</>
				) : (
					<SelectControl
						label="Default Initial State"
						value={initialState}
						options={[
							{ label: 'Open', value: 'open' },
							{ label: 'Closed', value: 'closed' }
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
