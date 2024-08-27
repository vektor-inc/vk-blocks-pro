/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';
import { chevronUp, chevronDown } from '@wordpress/icons';

export const MoverButton = ({ index, variationState, setVariationState }) => {
	const swap = (offset) => {
		const newItems = [...variationState];
		[newItems[index], newItems[index + offset]] = [
			newItems[index + offset],
			newItems[index],
		];
		setVariationState(newItems);
	};

	const buttonStyle = {
		paddingLeft: '6px',
		paddingRight: '6px',
		height: '24px',
		minWidth: '0!important',
		width: '100%',
	};

	return (
		<div className="move-button-container">
			<Button
				className="mover-button is-up-button"
				icon={chevronUp}
				disabled={index === 0}
				onClick={() => swap(-1)}
				style={buttonStyle}
			/>
			<Button
				className="mover-button is-down-button"
				icon={chevronDown}
				disabled={index === variationState.length - 1}
				onClick={() => swap(1)}
				style={buttonStyle}
			/>
		</div>
	);
};
