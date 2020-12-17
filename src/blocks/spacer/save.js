import classnames from 'classnames';
import { useBlockProps } from '@wordpress/block-editor';

import Spacers from './spacers';

export default function save({ attributes }) {
	const { spaceType, unit, pc, tablet, mobile } = attributes;

	<div {...useBlockProps.save({ className: classnames('vk_spacer') })}>
		<Spacers
			type={spaceType}
			pcSize={pc}
			tabletSize={tablet}
			mobileSize={mobile}
			unit={unit}
		/>
	</div>;
}
