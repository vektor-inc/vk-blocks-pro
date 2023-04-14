/**
 * WordPress dependencies
 */
import { CheckboxControl } from '@wordpress/components';

export default function BlockStyleChecklist({
	blockStyleTypes,
	value,
	onItemChange,
}) {
	return (
		<ul className="block-manager__checklist">
			{blockStyleTypes.map((blockStyleType) => (
				<li
					key={blockStyleType.name}
					className="block-manager__checklist-item"
				>
					<CheckboxControl
						__nextHasNoMarginBottom
						label={blockStyleType.label}
						checked={value.includes(blockStyleType.name)}
						onChange={(...args) =>
							onItemChange(blockStyleType.name, ...args)
						}
					/>
				</li>
			))}
		</ul>
	);
}
