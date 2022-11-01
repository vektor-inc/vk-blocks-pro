/**
 * WordPress dependencies
 */
import { BlockIcon } from '@wordpress/block-editor';
import { CheckboxControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

export default function BlockType(props) {
	const { blockType } = props;
	const [isChecked, setIsChecked] = useState(false);

	return (
		<li key={blockType.name} className="blocks-category__block">
			<CheckboxControl
				checked={isChecked}
				onChange={(checked) => setIsChecked(checked)}
				label={
					<span>
						{blockType.title}
						{blockType.icon && <BlockIcon icon={blockType.icon} />}
					</span>
				}
			/>
		</li>
	);
}
