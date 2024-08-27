import { __ } from '@wordpress/i18n';
import { PanelBody, BaseControl } from '@wordpress/components';
import { AlignControl } from '@vkblocks/components/align-control';
import { capitalize } from '@vkblocks/utils/capitalize';
import { fixBrokenUnicode } from '@vkblocks/utils/depModules';

export const CardAlignControls = (props) => {
	const { attributes } = props;
	const schema = JSON.parse(fixBrokenUnicode(attributes.activeControl));
	const createAlignControl = (label, index) => {
		props = {
			...props,
			...{
				initial: schema[label],
			},
			...{
				component: label,
			},
		};
		return (
			<BaseControl
				key={index}
				label={__(`${capitalize(label)}`, 'vk-blocks-pro')} // eslint-disable-line @wordpress/i18n-no-variables
				id={'vk_card-align'}
			>
				<AlignControl schema={schema} {...props} />
			</BaseControl>
		);
	};

	const alignControls = ['title', 'text', 'button'].map(createAlignControl);
	return (
		<PanelBody title={__('Align', 'vk-blocks-pro')} initialOpen={false}>
			{alignControls}
		</PanelBody>
	);
};
