import { __, sprintf } from '@wordpress/i18n';
import { PanelBody, BaseControl } from '@wordpress/components';
import { AlignControl } from '../align-control';
import { capitalize } from '../../utils/capitalize';
import { fixBrokenUnicode } from '../../utils/depModules';

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
				// translators: %s is align.
				label={sprintf(__('Align %s', 'vk-blocks'), capitalize(label))}
				id={'vk_card-align'}
			>
				<AlignControl schema={schema} {...props} />
			</BaseControl>
		);
	};

	const alignControls = ['title', 'text', 'button'].map(createAlignControl);
	return (
		<PanelBody title={__('Align', 'vk-blocks')} initialOpen={false}>
			{alignControls}
		</PanelBody>
	);
};
